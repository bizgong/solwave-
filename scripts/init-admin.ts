import bcrypt from 'bcryptjs';
import { Octokit } from 'octokit';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';
import { exit } from 'process';

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

if (!GITHUB_TOKEN) {
  console.error('GITHUB_TOKEN is missing');
  exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function initAdmin() {
  const adminId = 'admin'; // Change if needed
  const password = 'password123'; // Change if needed
  
  const hash = await bcrypt.hash(password, 10);
  
  const content = JSON.stringify({
    adminId,
    passwordHash: hash,
    updatedAt: new Date().toISOString()
  }, null, 2);

  try {
    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path: 'content/adminAuth.json',
      message: 'Initialize admin credentials',
      content: Buffer.from(content).toString('base64'),
    });
    console.log('Admin credentials created successfully');
    console.log(`ID: ${adminId}`);
    console.log(`PW: ${password}`);
  } catch (e: any) {
    console.error('Failed to create admin file', e.message);
  }
}

initAdmin();