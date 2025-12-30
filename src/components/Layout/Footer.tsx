import React, { useState } from 'react';
import { Instagram, MapPin, Phone, Settings } from 'lucide-react';
import AdminLoginModal from '../Admin/AdminLoginModal';
import { useContent } from '../../contexts/ContentContext';

const Footer: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { content } = useContent();
  
  // Use safe defaults in case content is loading
  const contact = content?.global?.contact || { address: '강원도 속초시', phone: '010-0000-0000' };
  const bank = content?.global?.bank || { name: '은행', account: '000-0000-0000', holder: '예금주' };

  return (
    <>
      <footer className="bg-brand-surface py-16 border-t border-brand-bg pb-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold tracking-widest text-brand-text">
                  솔웨이브<span className="text-brand-accent">.</span>
                </h2>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                파도와 하늘 사이, 당신만의 프라이빗 리조트.<br/>
                솔웨이브 풀빌라에서 완벽한 휴식을 경험하세요.
              </p>
              
              {/* Social & Admin Icons Container */}
              <div className="flex items-center gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all duration-300 shadow-sm"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                
                {/* Admin Settings Button (gray Blue) */}
                <button 
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent text-black hover:bg-brand-accentHover transition-all duration-300 shadow-md transform hover:scale-105"
                  aria-label="Admin Login"
                  title="관리자 설정"
                >
                  <Settings size={18} />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-brand-text mb-6">고객센터</h3>
              <ul className="space-y-4 text-brand-muted text-sm">
                <li className="flex items-center space-x-3">
                  <MapPin size={16} className="text-brand-accent" />
                  <span>{contact.address}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={16} className="text-brand-accent" />
                  <span>{contact.phone}</span>
                </li>
                <li>
                  <span className="block text-xs text-brand-muted/60 mt-2">상담 가능 시간: 09:00 - 21:00</span>
                </li>
              </ul>
            </div>

            {/* Bank Info */}
            <div>
              <h3 className="text-lg font-semibold text-brand-text mb-6">계좌 안내</h3>
              <div className="text-brand-muted text-sm space-y-2">
                <p>{bank.name} {bank.account}</p>
                <p>예금주: {bank.holder}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-muted/50">
            <p>© 2024 솔웨이브 풀빌라. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-text">개인정보처리방침</a>
              <a href="#" className="hover:text-brand-text">이용약관</a>
            </div>
          </div>
        </div>
      </footer>
      <AdminLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default Footer;