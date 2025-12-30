import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Users, Maximize, Wind } from 'lucide-react';
import FadeIn from '../components/UI/FadeIn';
import { ROOMS } from '../constants';

const Rooms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-12 w-full">
      {/* Hero */}
      <div className="relative h-[400px] w-full mb-12 overflow-hidden bg-gray-200">
        <img 
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070" 
            alt="Rooms Hero" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-6 text-center text-white">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">객실 안내</h1>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    탁 트인 오션뷰와 프라이빗한 온수풀. <br/>
                    각기 다른 매력을 가진 솔웨이브의 3가지 객실 타입을 만나보세요.
                    </p>
                </FadeIn>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Comparison Table */}
        <FadeIn className="mb-24 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-brand-muted/20">
                <th className="py-4 px-4 text-brand-muted font-normal w-1/4">객실 타입</th>
                <th className="py-4 px-4 text-brand-muted font-normal w-1/4">크기 / 기준인원</th>
                <th className="py-4 px-4 text-brand-muted font-normal w-1/4">특징</th>
                <th className="py-4 px-4 text-brand-muted font-normal w-1/4">가격대</th>
              </tr>
            </thead>
            <tbody>
              {ROOMS.map((room) => (
                <tr key={room.id} className="border-b border-brand-muted/10 hover:bg-brand-surface/50 transition-colors">
                  <td className="py-6 px-4 font-bold text-lg">{room.name}</td>
                  <td className="py-6 px-4 text-brand-muted">
                    <div className="flex flex-col">
                      <span>{room.size}</span>
                      <span className="text-xs mt-1">{room.capacity}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-brand-muted text-sm">{room.features[0]}, {room.features[1]}</td>
                  <td className="py-6 px-4 font-medium text-brand-accent">{room.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

        {/* Room Details */}
        <div className="space-y-32">
          {ROOMS.map((room, index) => (
            <div key={room.id} id={room.id} className="scroll-mt-32">
              <FadeIn delay={0.2}>
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  
                  {/* Images */}
                  <div className="w-full lg:w-1/2 space-y-4">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {room.detailImages.map((img, idx) => (
                        <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                          <img src={img} alt="Detail" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{room.name}</h2>
                    <p className="text-brand-accent text-lg mb-6">{room.tagline}</p>
                    <p className="text-brand-muted leading-relaxed mb-8">{room.description}</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="flex items-center space-x-3 text-brand-text">
                        <Maximize className="text-brand-muted" size={20} />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-brand-text">
                        <Users className="text-brand-muted" size={20} />
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-brand-text">
                        <Wind className="text-brand-muted" size={20} />
                        <span>개별 테라스 & 바비큐</span>
                      </div>
                    </div>

                    <div className="bg-brand-surface p-6 rounded-xl mb-8">
                      <h4 className="font-semibold mb-4 text-sm text-brand-muted uppercase">시설 및 어메니티</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {room.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm text-brand-text/80">
                            <Check size={14} className="text-brand-accent mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate('/contact', { state: { selectedRoom: room.name } })}
                      className="w-full md:w-auto px-8 py-4 bg-brand-text text-brand-bg hover:bg-brand-accent hover:text-brand-bg transition-colors font-bold rounded-sm"
                    >
                      이 객실로 문의하기
                    </button>
                  </div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-32 pt-16 border-t border-brand-muted/10">
            <FadeIn>
                <h3 className="text-2xl font-bold mb-8">자주 묻는 질문</h3>
                <div className="space-y-6">
                    <div className="bg-brand-surface p-6 rounded-xl">
                        <h4 className="font-bold mb-2 text-brand-text">인원 추가 비용은 얼마인가요?</h4>
                        <p className="text-brand-muted text-sm">기준 인원 초과 시 1인당 30,000원의 추가 요금이 발생합니다. (12개월 미만 무료)</p>
                    </div>
                    <div className="bg-brand-surface p-6 rounded-xl">
                        <h4 className="font-bold mb-2 text-brand-text">미온수 수영장은 계속 이용 가능한가요?</h4>
                        <p className="text-brand-muted text-sm">네, 입실 시부터 밤 10시까지 따뜻한 온도가 유지됩니다. 아침 수영은 오전 8시부터 가능합니다.</p>
                    </div>
                </div>
            </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Rooms;