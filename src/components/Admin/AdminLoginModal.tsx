import React, { useState } from 'react';
import { X, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/.netlify/functions/cms?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, password })
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        navigate('/admin');
      } else {
        setError(data.message || '로그인 실패');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center">
            <Lock size={16} className="mr-2 text-brand-accent" />
            관리자 로그인
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">아이디</label>
            <input 
              type="text" 
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand-accent outline-none transition-colors"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">비밀번호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-brand-accent outline-none transition-colors"
            />
          </div>
          
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-text text-white py-2.5 rounded font-medium text-sm hover:bg-black transition-colors flex justify-center items-center"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;