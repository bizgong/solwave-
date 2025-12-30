import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, Layout, Settings, RefreshCw, Home as HomeIcon, Globe } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import ImageUploader from '../components/Admin/ImageUploader';
import { SiteContent, TextContent } from '../types';

const Admin: React.FC = () => {
  const { content, updateLocalContent, refreshContent } = useContent();
  const [activeTab, setActiveTab] = useState<'global' | 'home' | 'settings'>('home');
  const [isSaving, setIsSaving] = useState(false);
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const navigate = useNavigate();

  // Sync with context on load
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  // Auth check
  useEffect(() => {
    fetch('/.netlify/functions/cms?action=check-auth')
      .then(res => {
        if (!res.ok) navigate('/');
      });
  }, [navigate]);

  const handleUpdate = (path: string[], value: any) => {
    const newContent = JSON.parse(JSON.stringify(localContent));
    let target = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]];
    }
    target[path[path.length - 1]] = value;
    setLocalContent(newContent);
  };

  const handleTextStyleChange = (path: string[], field: 'text' | 'style', subField: string | null, value: any) => {
    const newContent = JSON.parse(JSON.stringify(localContent));
    let target = newContent;
    for (let i = 0; i < path.length; i++) {
      target = target[path[i]];
    }
    
    if (field === 'style' && subField) {
      target.style[subField] = Number(value);
    } else {
      target[field] = value;
    }
    
    setLocalContent(newContent);
  };

  const saveContent = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/.netlify/functions/cms?action=save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentJson: localContent })
      });
      if (res.ok) {
        alert('저장되었습니다. 사이트가 업데이트 되기까지 1~2분이 소요될 수 있습니다.');
        updateLocalContent(localContent);
      } else {
        alert('저장 실패');
      }
    } catch (e) {
      alert('오류 발생');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/.netlify/functions/cms?action=logout', { method: 'POST' });
    navigate('/');
  };

  // Credentials State
  const [credForm, setCredForm] = useState({ current: '', newId: '', newPw: '', confirm: '' });

  const updateCredentials = async () => {
    if (credForm.newPw !== credForm.confirm) return alert('새 비밀번호가 일치하지 않습니다.');
    if (!credForm.current) return alert('현재 비밀번호를 입력해주세요.');

    const res = await fetch('/.netlify/functions/cms?action=update-credentials', {
      method: 'POST',
      body: JSON.stringify({ 
        currentPassword: credForm.current, 
        newAdminId: credForm.newId, 
        newPassword: credForm.newPw 
      })
    });
    
    if (res.ok) {
      alert('변경되었습니다. 다시 로그인해주세요.');
      handleLogout();
    } else {
      alert('변경 실패. 현재 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">CMS Admin</h1>
          <span className="text-xs text-gray-400">Last updated: {new Date(localContent.updatedAt).toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => refreshContent()} className="p-2 text-gray-500 hover:bg-gray-100 rounded">
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={saveContent}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-brand-accent text-white rounded hover:bg-brand-accentHover disabled:opacity-50"
          >
            <Save size={18} />
            <span>{isSaving ? '저장 중...' : '저장 및 커밋'}</span>
          </button>
          <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <button 
            onClick={() => setActiveTab('global')}
            className={`flex items-center space-x-3 px-6 py-4 border-l-4 transition-colors ${activeTab === 'global' ? 'border-brand-accent bg-blue-50 text-brand-accent' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
          >
            <Globe size={20} />
            <span className="font-medium">기본 정보 설정</span>
          </button>
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center space-x-3 px-6 py-4 border-l-4 transition-colors ${activeTab === 'home' ? 'border-brand-accent bg-blue-50 text-brand-accent' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
          >
            <HomeIcon size={20} />
            <span className="font-medium">메인 페이지</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-3 px-6 py-4 border-l-4 transition-colors ${activeTab === 'settings' ? 'border-brand-accent bg-blue-50 text-brand-accent' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings size={20} />
            <span className="font-medium">관리자 설정</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {/* Global Settings Tab */}
          {activeTab === 'global' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold mb-6 border-b pb-2">업체 정보 (푸터/연락처 반영)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">대표 전화번호</label>
                    <input 
                      type="text" 
                      className="w-full border p-2 rounded" 
                      value={localContent.global.contact.phone}
                      onChange={(e) => handleUpdate(['global', 'contact', 'phone'], e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">주소</label>
                    <input 
                      type="text" 
                      className="w-full border p-2 rounded" 
                      value={localContent.global.contact.address}
                      onChange={(e) => handleUpdate(['global', 'contact', 'address'], e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold mb-6 border-b pb-2">계좌 정보</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">은행명</label>
                    <input 
                      type="text" 
                      className="w-full border p-2 rounded" 
                      value={localContent.global.bank.name}
                      onChange={(e) => handleUpdate(['global', 'bank', 'name'], e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">계좌번호</label>
                    <input 
                      type="text" 
                      className="w-full border p-2 rounded" 
                      value={localContent.global.bank.account}
                      onChange={(e) => handleUpdate(['global', 'bank', 'account'], e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">예금주</label>
                    <input 
                      type="text" 
                      className="w-full border p-2 rounded" 
                      value={localContent.global.bank.holder}
                      onChange={(e) => handleUpdate(['global', 'bank', 'holder'], e.target.value)}
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Home Page Content Tab */}
          {activeTab === 'home' && (
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Hero Section */}
              <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold mb-6 border-b pb-2 flex items-center text-brand-accent">
                  <Layout size={18} className="mr-2"/> 메인 히어로 섹션
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <EditorField 
                      label="메인 타이틀" 
                      content={localContent.home.hero.title} 
                      onChange={(f, sf, v) => handleTextStyleChange(['home', 'hero', 'title'], f, sf, v)} 
                    />
                    <EditorField 
                      label="서브 타이틀" 
                      content={localContent.home.hero.subtitle} 
                      onChange={(f, sf, v) => handleTextStyleChange(['home', 'hero', 'subtitle'], f, sf, v)} 
                      multiline
                    />
                    <EditorField 
                      label="CTA 텍스트" 
                      content={localContent.home.hero.ctaText} 
                      onChange={(f, sf, v) => handleTextStyleChange(['home', 'hero', 'ctaText'], f, sf, v)} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">배경 이미지</label>
                    <ImageUploader 
                      sectionId="hero" 
                      fieldKey="bgImageUrl" 
                      currentUrl={localContent.home.hero.bgImageUrl} 
                      onUploadComplete={(url) => handleUpdate(['home', 'hero', 'bgImageUrl'], url)}
                    />
                  </div>
                </div>
              </section>

              {/* Sections Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SimpleSectionEditor 
                  title="시그니처 포인트 섹션" 
                  data={localContent.home.features}
                  onUpdate={(key, val) => handleUpdate(['home', 'features', key], val)}
                />
                <SimpleSectionEditor 
                  title="객실 안내 섹션" 
                  data={localContent.home.rooms}
                  onUpdate={(key, val) => handleUpdate(['home', 'rooms', key], val)}
                />
                <SimpleSectionEditor 
                  title="이용 후기 섹션" 
                  data={localContent.home.reviews}
                  onUpdate={(key, val) => handleUpdate(['home', 'reviews', key], val)}
                />
                <SimpleSectionEditor 
                  title="오시는 길 섹션" 
                  data={localContent.home.location}
                  onUpdate={(key, val) => handleUpdate(['home', 'location', key], val)}
                />
              </div>

              <SimpleSectionEditor 
                  title="하단 예약 유도(CTA) 섹션" 
                  data={localContent.home.cta}
                  onUpdate={(key, val) => handleUpdate(['home', 'cta', key], val)}
                  fullWidth
                />
            </div>
          )}

          {/* Admin Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6">관리자 계정 변경</h2>
              <div className="space-y-4">
                <input 
                  type="password" placeholder="현재 비밀번호" 
                  className="w-full border p-2 rounded"
                  value={credForm.current} onChange={e => setCredForm({...credForm, current: e.target.value})}
                />
                <hr className="my-4"/>
                <input 
                  type="text" placeholder="새 관리자 ID" 
                  className="w-full border p-2 rounded"
                  value={credForm.newId} onChange={e => setCredForm({...credForm, newId: e.target.value})}
                />
                <input 
                  type="password" placeholder="새 비밀번호" 
                  className="w-full border p-2 rounded"
                  value={credForm.newPw} onChange={e => setCredForm({...credForm, newPw: e.target.value})}
                />
                <input 
                  type="password" placeholder="새 비밀번호 확인" 
                  className="w-full border p-2 rounded"
                  value={credForm.confirm} onChange={e => setCredForm({...credForm, confirm: e.target.value})}
                />
                <button onClick={updateCredentials} className="w-full bg-brand-text text-white py-3 rounded hover:bg-black">
                  변경사항 저장
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Helper Components
const EditorField = ({ label, content, onChange, multiline }: { 
  label: string, 
  content: TextContent, 
  onChange: (field: 'text' | 'style', subField: string | null, value: any) => void,
  multiline?: boolean
}) => (
  <div className="p-4 bg-gray-50 rounded border border-gray-100">
    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{label}</label>
    {multiline ? (
      <textarea 
        className="w-full border border-gray-300 rounded p-2 mb-3 text-sm" 
        rows={3}
        value={content.text}
        onChange={e => onChange('text', null, e.target.value)}
      />
    ) : (
      <input 
        type="text" 
        className="w-full border border-gray-300 rounded p-2 mb-3 text-sm"
        value={content.text}
        onChange={e => onChange('text', null, e.target.value)}
      />
    )}
    
    <div className="grid grid-cols-3 gap-2">
      <div>
        <label className="text-[10px] text-gray-400">Size</label>
        <input type="number" className="w-full border rounded p-1 text-xs" value={content.style.fontSize} onChange={e => onChange('style', 'fontSize', e.target.value)} />
      </div>
      <div>
        <label className="text-[10px] text-gray-400">LineHeight</label>
        <input type="number" step="0.1" className="w-full border rounded p-1 text-xs" value={content.style.lineHeight} onChange={e => onChange('style', 'lineHeight', e.target.value)} />
      </div>
      <div>
        <label className="text-[10px] text-gray-400">Spacing</label>
        <input type="number" step="0.5" className="w-full border rounded p-1 text-xs" value={content.style.letterSpacing} onChange={e => onChange('style', 'letterSpacing', e.target.value)} />
      </div>
    </div>
  </div>
);

const SimpleSectionEditor = ({ title, data, onUpdate, fullWidth }: { 
  title: string, 
  data: { title: string, subtitle: string }, 
  onUpdate: (key: string, val: string) => void,
  fullWidth?: boolean
}) => (
  <section className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${fullWidth ? 'col-span-1 md:col-span-2' : ''}`}>
    <h3 className="text-sm font-bold mb-4 text-gray-800">{title}</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">제목</label>
        <input 
          type="text" 
          className="w-full border border-gray-200 rounded p-2 text-sm"
          value={data.title}
          onChange={(e) => onUpdate('title', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">부제목 / 설명</label>
        <textarea 
          className="w-full border border-gray-200 rounded p-2 text-sm"
          rows={2}
          value={data.subtitle}
          onChange={(e) => onUpdate('subtitle', e.target.value)}
        />
      </div>
    </div>
  </section>
);

export default Admin;