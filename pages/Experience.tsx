import React from 'react';
import { Utensils, Flame, Ticket, Camera } from 'lucide-react';
import FadeIn from '../components/UI/FadeIn';
import { ATTRACTIONS } from '../constants';

const INSTAGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473116763249-563ff494d365?q=80&w=400&auto=format&fit=crop'
];

const Experience: React.FC = () => {
  return (
    <div className="pt-24 pb-12 w-full">
      {/* Hero */}
      <div className="relative h-[400px] w-full mb-12 overflow-hidden bg-gray-200">
        <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070" 
            alt="Experience Hero" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
             <div className="max-w-7xl mx-auto px-6 text-center text-white">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">스페셜 오퍼</h1>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    솔웨이브에서 누리는 특별한 즐거움과<br/>
                    속초의 아름다운 여행지를 소개합니다.
                    </p>
                </FadeIn>
             </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Facilities */}
        <section className="mb-24">
            <FadeIn>
                <h2 className="text-2xl font-bold mb-10 border-l-4 border-brand-accent pl-4 text-brand-text">부대시설</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FadeIn delay={0.1}>
                    <div className="relative group overflow-hidden rounded-lg aspect-[16/9] shadow-lg bg-gray-100">
                        <img src="https://images.unsplash.com/photo-1558036117-15db527e5669?q=80&w=2070" alt="BBQ" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                            <div className="flex items-center text-white mb-2">
                                <Utensils className="mr-2 text-brand-accent" />
                                <span className="font-bold tracking-widest">프라이빗 바비큐</span>
                            </div>
                            <p className="text-white/80 text-sm">전 객실 개별 테라스에서 즐기는 프라이빗 바비큐. 웨버 그릴과 숯 세트가 제공됩니다.</p>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <div className="relative group overflow-hidden rounded-lg aspect-[16/9] shadow-lg bg-gray-100">
                        <img src="https://images.unsplash.com/photo-1499382928514-46c5950348a2?q=80&w=2070" alt="Fire Pit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                            <div className="flex items-center text-white mb-2">
                                <Flame className="mr-2 text-brand-accent" />
                                <span className="font-bold tracking-widest">감성 불멍존</span>
                            </div>
                            <p className="text-white/80 text-sm">타닥타닥 타오르는 장작 소리와 함께하는 불멍 타임. 낭만적인 밤을 선물합니다.</p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>

        {/* Packages */}
        <section className="mb-24">
            <FadeIn>
                <h2 className="text-2xl font-bold mb-10 border-l-4 border-brand-accent pl-4 text-brand-text">스페셜 패키지</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FadeIn delay={0.1} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-accent/50 transition-all">
                    <h3 className="text-xl font-bold mb-2 text-brand-text">커플 선셋 패키지</h3>
                    <p className="text-brand-accent mb-4 text-sm font-medium">연인들을 위한 로맨틱 패키지</p>
                    <ul className="text-brand-muted text-sm space-y-2 mb-6">
                        <li>• 와인 1병 & 치즈 플래터</li>
                        <li>• 미온수풀 무료 제공</li>
                        <li>• 레이트 체크아웃 (12:00)</li>
                    </ul>
                    <div className="text-right">
                        <Ticket size={24} className="text-brand-accent ml-auto mb-2 opacity-50" />
                    </div>
                </FadeIn>
                <FadeIn delay={0.2} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-accent/50 transition-all">
                    <h3 className="text-xl font-bold mb-2 text-brand-text">패밀리 키즈 패키지</h3>
                    <p className="text-brand-accent mb-4 text-sm font-medium">아이들이 더 좋아하는</p>
                    <ul className="text-brand-muted text-sm space-y-2 mb-6">
                        <li>• 키즈 어메니티 & 장난감 대여</li>
                        <li>• 조식 바구니 무료</li>
                        <li>• 모래놀이 세트 증정</li>
                    </ul>
                    <div className="text-right">
                        <Ticket size={24} className="text-brand-accent ml-auto mb-2 opacity-50" />
                    </div>
                </FadeIn>
                <FadeIn delay={0.3} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-accent/50 transition-all">
                    <h3 className="text-xl font-bold mb-2 text-brand-text">주중 힐링 패키지</h3>
                    <p className="text-brand-accent mb-4 text-sm font-medium">여유로운 평일 연박 할인</p>
                    <ul className="text-brand-muted text-sm space-y-2 mb-6">
                        <li>• 2박 이상 예약 시 15% 할인</li>
                        <li>• 바비큐 숯/그릴 1회 무료</li>
                        <li>• 웰컴 드링크 제공</li>
                    </ul>
                    <div className="text-right">
                        <Ticket size={24} className="text-brand-accent ml-auto mb-2 opacity-50" />
                    </div>
                </FadeIn>
            </div>
        </section>

        {/* Attractions */}
        <section className="mb-24">
            <FadeIn>
                <h2 className="text-2xl font-bold mb-10 border-l-4 border-brand-accent pl-4 text-brand-text">주변 관광지</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ATTRACTIONS.map((spot, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                        <div className="bg-white border border-gray-100 p-6 rounded-xl flex items-center space-x-4 hover:shadow-lg hover:border-brand-accent/30 transition-all cursor-pointer group">
                            <div className="p-3 bg-brand-surface rounded-full text-brand-muted group-hover:text-brand-accent group-hover:bg-white transition-colors">
                                <spot.icon size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-text">{spot.name}</h3>
                                <p className="text-xs text-brand-muted mt-1">{spot.distance}</p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>

        {/* Instagram */}
        <section className="py-12 border-t border-gray-100 text-center">
            <FadeIn>
                <div className="flex justify-center items-center space-x-2 text-brand-muted mb-8">
                    <Camera size={20} />
                    <span className="font-medium">#솔웨이브풀빌라</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {INSTAGRAM_IMAGES.map((url, idx) => (
                        <div key={idx} className="aspect-square rounded-lg overflow-hidden relative group bg-gray-100">
                            <img src={url} alt="Instagram" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Camera className="text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </section>
      </div>
    </div>
  );
};

export default Experience;