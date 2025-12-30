import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import FadeIn from '../components/UI/FadeIn';
import { FEATURES, ROOMS, REVIEWS } from '../constants';
import { useContent } from '../contexts/ContentContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { content } = useContent();
  const { hero, features, rooms, reviews, location, cta } = content.home;

  // Helper to apply CMS styles
  const textStyle = (style: any) => ({
    fontSize: `${style.fontSize}px`,
    lineHeight: style.lineHeight,
    letterSpacing: `${style.letterSpacing}px`
  });

  return (
    <div className="w-full bg-brand-bg">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-gray-200">
        <div className="absolute inset-0">
          <img 
            src={hero.bgImageUrl} 
            alt="Solwave Poolvilla" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" /> {/* Lighter overlay for brighter feel */}
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <FadeIn>
            <h2 
              className="text-white font-medium mb-4 drop-shadow-md"
              style={textStyle(hero.ctaText.style)}
            >
              {hero.ctaText.text}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 
              className="font-bold text-white mb-6 drop-shadow-lg whitespace-pre-line"
              style={textStyle(hero.title.style)}
            >
              {hero.title.text}
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p 
              className="text-white/90 font-light mb-10 max-w-2xl mx-auto drop-shadow-md whitespace-pre-line"
              style={textStyle(hero.subtitle.style)}
            >
              {hero.subtitle.text}
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => navigate('/rooms')}
                className="px-8 py-4 border border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-brand-text transition-all duration-300 min-w-[180px]"
              >
                객실 보기
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-brand-accent text-white hover:bg-brand-accentHover transition-all duration-300 min-w-[180px] font-semibold shadow-lg shadow-brand-accent/20"
              >
                예약 문의하기
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Quick Booking Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-brand-surface shadow-lg hidden md:block z-30">
          <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center text-sm">
            <div className="flex gap-12">
              <div className="flex flex-col group cursor-pointer">
                <span className="text-brand-muted text-[10px] font-bold tracking-widest mb-1 group-hover:text-brand-accent transition-colors">체크인</span>
                <span className="text-brand-text text-lg">날짜 선택</span>
              </div>
              <div className="flex flex-col group cursor-pointer">
                <span className="text-brand-muted text-[10px] font-bold tracking-widest mb-1 group-hover:text-brand-accent transition-colors">체크아웃</span>
                <span className="text-brand-text text-lg">날짜 선택</span>
              </div>
              <div className="flex flex-col group cursor-pointer">
                <span className="text-brand-muted text-[10px] font-bold tracking-widest mb-1 group-hover:text-brand-accent transition-colors">인원</span>
                <span className="text-brand-text text-lg">인원 선택</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-brand-text text-white font-bold hover:bg-brand-accent transition-all duration-300"
            >
              객실 조회하기
            </button>
          </div>
        </div>
      </section>

      {/* Signature Points */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-brand-accent font-bold tracking-widest text-sm block mb-2">{features.title}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-text">{features.subtitle}</h2>
              <p className="text-brand-muted">솔웨이브에서만 경험할 수 있는 특별한 순간</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-brand-surface p-8 rounded-none border-b-2 border-transparent hover:border-brand-accent transition-all duration-300 group h-full hover:-translate-y-1">
                  <div className="w-12 h-12 flex items-center justify-center text-brand-text mb-6 group-hover:text-brand-accent transition-colors">
                    <feature.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-brand-text">{feature.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Room Preview */}
      <section className="py-24 bg-brand-surface relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-brand-text">{rooms.title}</h2>
              <p className="text-brand-muted">{rooms.subtitle}</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <button 
                onClick={() => navigate('/rooms')}
                className="hidden md:flex items-center space-x-2 text-brand-text hover:text-brand-accent transition-colors text-sm font-medium tracking-wide"
              >
                <span>전체 객실 보기</span>
                <ArrowRight size={16} />
              </button>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROOMS.map((room, index) => (
              <FadeIn key={room.id} delay={index * 0.2}>
                <div 
                  onClick={() => navigate('/rooms')}
                  className="group cursor-pointer bg-white pb-6 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden mb-6 aspect-[4/3] bg-gray-100">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <span className="px-6 py-2 bg-white/90 backdrop-blur text-brand-text text-sm font-medium">자세히 보기</span>
                    </div>
                  </div>
                  <div className="px-6">
                    <h3 className="text-2xl font-bold mb-2 text-brand-text group-hover:text-brand-accent transition-colors">{room.name}</h3>
                    <p className="text-brand-muted text-sm mb-4 line-clamp-1">{room.tagline}</p>
                    <div className="flex items-center space-x-4 text-xs text-brand-muted pt-4 border-t border-gray-100">
                      <span>{room.size}</span>
                      <span className="w-1 h-1 bg-brand-muted/30 rounded-full"/>
                      <span>{room.capacity}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold mb-4">{reviews.title}</h2>
               <p className="text-brand-muted">{reviews.subtitle}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, index) => (
              <FadeIn key={review.id} delay={index * 0.1}>
                <div className="bg-brand-surface p-8 rounded-xl relative hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-brand-accent/20">
                  <div className="flex text-brand-accent mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-brand-text/80 mb-8 leading-relaxed text-sm">"{review.content}"</p>
                  <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-4">
                    <span className="font-bold text-brand-text">{review.author}</span>
                    <span className="text-xs text-brand-muted">{review.date}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Location Summary */}
      <section className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">{location.title}</h2>
            <p className="text-brand-muted mb-10">{location.subtitle}</p>
            <div className="aspect-[21/9] w-full max-w-5xl mx-auto bg-gray-200 overflow-hidden relative group cursor-pointer shadow-2xl" onClick={() => navigate('/contact')}>
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" alt="Location" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"/>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="px-8 py-3 bg-white text-brand-text font-bold text-sm tracking-wide shadow-lg group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  지도 보기
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden bg-brand-text">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 relative z-10">
                <FadeIn>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight whitespace-pre-line">
                    {cta.title}
                  </h2>
                  <p className="text-white/60 mb-10 text-lg whitespace-pre-line">
                    {cta.subtitle}
                  </p>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="px-12 py-5 bg-white text-brand-text text-lg font-bold hover:bg-brand-accent hover:text-white transition-all shadow-xl"
                  >
                    지금 문의하기
                  </button>
                </FadeIn>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;