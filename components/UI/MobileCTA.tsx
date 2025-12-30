import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, CalendarDays } from 'lucide-react';

const MobileCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-brand-surface border-t border-brand-bg z-40 pb-safe">
      <div className="grid grid-cols-3 h-16">
        <a href="tel:010-1234-5678" className="flex flex-col items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-bg transition-colors">
          <Phone size={20} className="mb-1" />
          <span className="text-[10px]">전화문의</span>
        </a>
        <button className="flex flex-col items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-bg transition-colors border-l border-r border-brand-bg">
          <MessageCircle size={20} className="mb-1" />
          <span className="text-[10px]">카카오톡</span>
        </button>
        <button 
          onClick={() => navigate('/contact')}
          className="flex flex-col items-center justify-center bg-brand-accent text-brand-bg hover:bg-brand-accentHover transition-colors font-semibold"
        >
          <CalendarDays size={20} className="mb-1" />
          <span className="text-[10px]">실시간 예약</span>
        </button>
      </div>
    </div>
  );
};

export default MobileCTA;