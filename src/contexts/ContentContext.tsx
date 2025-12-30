import React, { createContext, useContext, useEffect, useState } from 'react';
import { SiteContent } from '../types';

const defaultContent: SiteContent = {
  updatedAt: new Date().toISOString(),
  global: {
    contact: {
      phone: "010-1234-5678",
      address: "강원도 속초시 해오름로 123번길",
      kakaoId: "solwave_official"
    },
    bank: {
      name: "신한은행",
      account: "110-123-456789",
      holder: "솔웨이브(홍길동)"
    }
  },
  home: {
    hero: {
      title: { 
        text: "솔웨이브\n풀빌라 & 리조트", 
        style: { fontSize: 60, lineHeight: 1.1, letterSpacing: 0 } 
      },
      subtitle: { 
        text: "파도와 하늘 사이, 당신만의 프라이빗한 휴식처.\n속초의 푸른 바다를 담은 화이트 하우스", 
        style: { fontSize: 18, lineHeight: 1.6, letterSpacing: 0 } 
      },
      ctaText: { 
        text: "속초 프라이빗 풀빌라", 
        style: { fontSize: 14, lineHeight: 1.5, letterSpacing: 3 } 
      },
      bgImageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop"
    },
    features: {
      title: "시그니처 포인트",
      subtitle: "솔웨이브에서만 경험할 수 있는 특별한 순간"
    },
    rooms: {
      title: "객실 안내",
      subtitle: "당신의 여행 스타일에 맞는 객실을 선택하세요"
    },
    reviews: {
      title: "이용 후기",
      subtitle: "솔웨이브를 다녀가신 분들의 소중한 이야기"
    },
    location: {
      title: "오시는 길",
      subtitle: "속초해변 도보 3분 · 속초 시내 10분 거리의 완벽한 접근성"
    },
    cta: {
      title: "가장 좋은 날짜는\n빠르게 마감됩니다.",
      subtitle: "지금 바로 솔웨이브에서 잊지 못할 추억을 예약하세요."
    }
  }
};

interface ContentContextType {
  content: SiteContent;
  refreshContent: () => Promise<void>;
  updateLocalContent: (newContent: SiteContent) => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  const refreshContent = async () => {
    try {
      // In production, fetch from raw GitHub URL or your API
      const res = await fetch('/.netlify/functions/cms?action=get-content');
      if (res.ok) {
        const data = await res.json();
        if (data.content) {
          // Merge with default to ensure new fields exist if remote is old
          setContent(prev => ({
            ...defaultContent,
            ...data.content,
            global: { ...defaultContent.global, ...data.content.global },
            home: { ...defaultContent.home, ...data.content.home }
          }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch content", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocalContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    refreshContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, refreshContent, updateLocalContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};