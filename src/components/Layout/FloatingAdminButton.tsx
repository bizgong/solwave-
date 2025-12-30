import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import AdminLoginModal from '../Admin/AdminLoginModal';

const FloatingAdminButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 left-4 z-40 p-3 bg-white/10 hover:bg-white/90 text-brand-text/20 hover:text-brand-text backdrop-blur-sm rounded-full shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-200"
        title="관리자 로그인"
      >
        <Lock size={16} />
      </button>
      <AdminLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FloatingAdminButton;