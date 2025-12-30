import React from 'react';
import { Instagram, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface py-16 border-t border-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold tracking-widest text-brand-text mb-6">
              솔웨이브<span className="text-brand-accent">.</span>
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed mb-4">
              파도와 하늘 사이, 당신만의 프라이빗 리조트.<br/>
              솔웨이브 풀빌라에서 완벽한 휴식을 경험하세요.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-brand-text mb-6">고객센터</h3>
            <ul className="space-y-4 text-brand-muted text-sm">
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-brand-accent" />
                <span>강원도 속초시 해오름로 123번길</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-brand-accent" />
                <span>010-1234-5678</span>
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
              <p>신한은행 110-123-456789</p>
              <p>예금주: 솔웨이브(홍길동)</p>
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
  );
};

export default Footer;