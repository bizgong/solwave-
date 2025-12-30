import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import FadeIn from '../components/UI/FadeIn';
import { ContactFormState } from '../types';
import { ROOMS } from '../constants';
import { useContent } from '../contexts/ContentContext';

const Contact: React.FC = () => {
  const location = useLocation();
  const { content } = useContent();
  const { contact } = content.global;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    contact: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    room: '',
    message: '',
    agreement: false
  });

  useEffect(() => {
    if (location.state && (location.state as any).selectedRoom) {
      setFormData(prev => ({ ...prev, room: (location.state as any).selectedRoom }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreement: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-brand-surface">
        <div className="text-center p-12 bg-white rounded-xl shadow-xl max-w-md mx-6">
          <CheckCircle className="w-16 h-16 text-brand-accent mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-brand-text">문의가 접수되었습니다.</h2>
          <p className="text-brand-muted mb-8 leading-relaxed">
            빠른 시일 내에 남겨주신 연락처로<br/>확인 후 안내 드리겠습니다.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="text-brand-accent hover:text-brand-accentHover font-semibold underline underline-offset-4"
          >
            추가 문의하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 w-full">
      <div className="relative h-[400px] w-full mb-12 overflow-hidden bg-gray-200">
        <img 
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070" 
            alt="Contact Hero" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-6 text-center text-white">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">예약 안내</h1>
                    <p className="text-white/90 text-lg">빠른 확인 후 신속하게 안내해 드립니다.</p>
                </FadeIn>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Form */}
          <div className="w-full lg:w-3/5">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8 flex items-center text-brand-text">
                예약 문의
                <span className="text-xs font-normal text-brand-muted ml-4">* 표시는 필수 입력 항목입니다.</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">이름 *</label>
                    <input 
                      type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">연락처 *</label>
                    <input 
                      type="tel" name="contact" required
                      value={formData.contact} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">체크인 *</label>
                    <input 
                      type="date" name="checkIn" required
                      value={formData.checkIn} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">체크아웃 *</label>
                    <input 
                      type="date" name="checkOut" required
                      value={formData.checkOut} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">객실 선택</label>
                    <select 
                      name="room" 
                      value={formData.room} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors appearance-none"
                    >
                      <option value="">객실을 선택해주세요</option>
                      {ROOMS.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">인원</label>
                    <select 
                      name="guests" 
                      value={formData.guests} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors appearance-none"
                    >
                      <option value="2">성인 2명</option>
                      <option value="3">성인 3명</option>
                      <option value="4">성인 4명</option>
                      <option value="5">성인 5명 이상</option>
                      <option value="family">가족 (성인2 + 아이2)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">문의 내용</label>
                  <textarea 
                    name="message" rows={4}
                    value={formData.message} onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                    placeholder="궁금하신 점이나 요청사항을 적어주세요."
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input 
                    type="checkbox" id="agreement" 
                    checked={formData.agreement} onChange={handleCheckboxChange}
                    className="w-5 h-5 rounded border-gray-300 bg-white text-brand-accent focus:ring-brand-accent"
                  />
                  <label htmlFor="agreement" className="text-sm text-brand-muted select-none cursor-pointer">
                    [필수] 개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-text text-white font-bold py-4 rounded-sm hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? '전송 중...' : '문의하기'}
                </button>
              </form>
            </FadeIn>
          </div>

          {/* Location Info */}
          <div className="w-full lg:w-2/5 space-y-8">
            <FadeIn delay={0.2}>
              <h2 className="text-2xl font-bold mb-8 text-brand-text">오시는 길</h2>
              <div className="aspect-square w-full bg-gray-100 rounded-xl flex items-center justify-center mb-8 relative group cursor-pointer overflow-hidden border border-gray-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144" alt="Map" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="p-4 bg-white/90 rounded-full shadow-lg">
                        <MapPin size={32} className="text-brand-accent" />
                    </div>
                    <span className="font-bold text-lg mt-3 bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm">SOLWAVE</span>
                 </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-brand-surface rounded-full text-brand-accent">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold mb-1 text-brand-text">주소</h3>
                        <p className="text-brand-muted text-sm leading-relaxed">{contact.address}<br/>(속초해수욕장 도보 3분)</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                     <div className="p-2 bg-brand-surface rounded-full text-brand-accent">
                        <Clock size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold mb-1 text-brand-text">체크인 / 체크아웃</h3>
                        <p className="text-brand-muted text-sm leading-relaxed">
                            체크인: 15:00<br/>
                            체크아웃: 11:00
                        </p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-brand-surface rounded-full text-brand-accent">
                        <Phone size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold mb-1 text-brand-text">고객센터</h3>
                        <p className="text-brand-accent font-bold text-xl">{contact.phone}</p>
                        <p className="text-brand-muted text-xs mt-1">상담시간: 09:00 - 21:00</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                     <div className="p-2 bg-brand-surface rounded-full text-brand-accent">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold mb-1 text-brand-text">주차 안내</h3>
                        <p className="text-brand-muted text-sm">객실당 1대 지정 주차 가능합니다.</p>
                    </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;