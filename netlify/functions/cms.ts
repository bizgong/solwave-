import { Octokit } from 'octokit';
import bcrypt from 'bcryptjs';
import { parse, serialize } from 'cookie';
import { Buffer } from 'buffer';

const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret';

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const headers = {
  'Content-Type': 'application/json',
};

// Helper: Get File from GitHub
async function getFile(path: string) {
  try {
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path,
      ref: GITHUB_BRANCH,
    });
    // @ts-ignore
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    // @ts-ignore
    return { content, sha: data.sha };
  } catch (e) {
    return null;
  }
}

// Helper: Create/Update File
// Fixed: Added isBase64 flag to prevent double-encoding images which corrupts them
async function putFile(path: string, content: string, message: string, sha?: string, isBase64: boolean = false) {
  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: GITHUB_OWNER!,
    repo: GITHUB_REPO!,
    path,
    message,
    content: isBase64 ? content : Buffer.from(content).toString('base64'),
    sha,
    branch: GITHUB_BRANCH,
  });
}

// Handler
export const handler = async (event: any) => {
  const action = event.queryStringParameters.action;
  const cookies = event.headers.cookie ? parse(event.headers.cookie) : {};
  const isAuthenticated = cookies.admin_session === SESSION_SECRET;

  try {
    // 1. Login
    if (action === 'login' && event.httpMethod === 'POST') {
      const { adminId, password } = JSON.parse(event.body);
      
      const authFile = await getFile('content/adminAuth.json');
      if (!authFile) return { statusCode: 500, body: JSON.stringify({ message: 'Auth config missing' }) };
      
      const authData = JSON.parse(authFile.content);
      
      if (adminId !== authData.adminId) {
        return { statusCode: 401, body: JSON.stringify({ message: 'Invalid Credentials' }) };
      }

      const match = await bcrypt.compare(password, authData.passwordHash);
      if (!match) {
        return { statusCode: 401, body: JSON.stringify({ message: 'Invalid Credentials' }) };
      }

      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Set-Cookie': serialize('admin_session', SESSION_SECRET, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 // 1 day
          })
        },
        body: JSON.stringify({ ok: true })
      };
    }

    // 2. Public Read Content
    if (action === 'get-content') {
      const file = await getFile('content/siteContent.json');
      if (!file) return { statusCode: 404, body: JSON.stringify({ message: 'Content not found' }) };
      return { statusCode: 200, headers, body: JSON.stringify({ content: JSON.parse(file.content) }) };
    }

    // --- PROTECTED ROUTES ---
    if (!isAuthenticated) return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized' }) };

    // 3. Logout
    if (action === 'logout') {
      return {
        statusCode: 200,
        headers: {
          'Set-Cookie': serialize('admin_session', '', { maxAge: -1, path: '/' })
        },
        body: JSON.stringify({ ok: true })
      };
    }

    // 4. Check Auth Status
    if (action === 'check-auth') {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    // 5. Save Content
    if (action === 'save-content' && event.httpMethod === 'POST') {
      const { contentJson } = JSON.parse(event.body);
      const file = await getFile('content/siteContent.json');
      contentJson.updatedAt = new Date().toISOString();
      
      await putFile(
        'content/siteContent.json', 
        JSON.stringify(contentJson, null, 2), 
        `Update site content (admin) - ${contentJson.updatedAt}`,
        file?.sha
      );
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    // 6. Upload Image
    if (action === 'upload-image' && event.httpMethod === 'POST') {
      const { image, sectionId, filename } = JSON.parse(event.body);
      // Remove data URL prefix (e.g., "data:image/webp;base64,")
      const base64Content = image.split(',')[1];
      const date = new Date();
      const path = `public/uploads/${date.getFullYear()}/${date.getMonth() + 1}/${sectionId}-${Date.now()}.webp`;
      
      // Fixed: Pass base64Content directly with isBase64=true
      await putFile(
        path,
        base64Content,
        `Upload image for ${sectionId}`,
        undefined,
        true 
      );

      // Use jsDelivr for instant CDN
      const cdnUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_OWNER}/${GITHUB_REPO}@${GITHUB_BRANCH}/${path}`;
      return { statusCode: 200, body: JSON.stringify({ ok: true, url: cdnUrl }) };
    }

    // 7. Update Credentials
    if (action === 'update-credentials' && event.httpMethod === 'POST') {
      const { currentPassword, newAdminId, newPassword } = JSON.parse(event.body);
      const file = await getFile('content/adminAuth.json');
      if (!file) return { statusCode: 500, body: 'Error' };
      
      const authData = JSON.parse(file.content);
      const match = await bcrypt.compare(currentPassword, authData.passwordHash);
      if (!match) return { statusCode: 403, body: JSON.stringify({ message: 'Wrong current password' }) };

      const newHash = await bcrypt.hash(newPassword, 10);
      authData.adminId = newAdminId;
      authData.passwordHash = newHash;
      authData.updatedAt = new Date().toISOString();

      await putFile(
        'content/adminAuth.json',
        JSON.stringify(authData, null, 2),
        'Update admin credentials',
        file.sha
      );

      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 404, body: 'Not Found' };
  } catch (error: any) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};