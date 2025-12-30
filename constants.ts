import { Waves, Sunset, User, Wifi, Wind, Coffee, Droplets, MapPin, Anchor, Mountain } from 'lucide-react';
import { Room, Feature, Review } from './types';

export const NAV_LINKS = [
  { name: '홈', path: '/' },
  { name: '객실안내', path: '/rooms' },
  { name: '스페셜', path: '/experience' },
  { name: '예약안내', path: '/contact' },
];

export const ROOMS: Room[] = [
  {
    id: 'wave-suite',
    name: 'Wave Suite',
    slug: 'wave-suite',
    tagline: '커플을 위한 로맨틱 오션뷰 스위트',
    description: '화이트 톤의 모던한 인테리어와 탁 트인 바다 전망. 프라이빗한 풀에서 둘만의 로맨틱한 시간을 즐기세요.',
    price: '₩350,000 ~',
    capacity: '기준 2인 / 최대 3인',
    size: '25평형 (82m²)',
    features: ['오션뷰 테라스', '실내 자쿠지', '킹사이즈 침대', '고급 어메니티'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070'
    ]
  },
  {
    id: 'sunset-family',
    name: 'Sunset Family',
    slug: 'sunset-family',
    tagline: '온 가족이 함께 즐기는 화이트 비치 하우스',
    description: '넓은 거실과 이어지는 야외 수영장. 아이들이 뛰어놀기 좋은 쾌적한 공간과 따뜻한 우드 포인트 인테리어.',
    price: '₩550,000 ~',
    capacity: '기준 4인 / 최대 6인',
    size: '45평형 (148m²)',
    features: ['대형 온수풀', '개별 바비큐장', '침실 2개', '주방 시설 완비'],
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070'
    ]
  },
  {
    id: 'sky-kids',
    name: 'Sky Kids',
    slug: 'sky-kids',
    tagline: '아이들의 꿈이 자라나는 키즈 풀빌라',
    description: '안전을 생각한 설계와 다채로운 키즈 놀이시설. 바다가 보이는 넓은 놀이방에서 행복한 추억을 만드세요.',
    price: '₩600,000 ~',
    capacity: '기준 4인 / 최대 8인',
    size: '55평형 (181m²)',
    features: ['키즈 놀이방', '저상형 침대', '유아용품 구비', '안전 쿠션 시공'],
    image: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=2070&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1596178060810-7264e14e1471?q=80&w=2000',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2000'
    ]
  },
];

export const FEATURES: Feature[] = [
  { icon: Waves, title: '인피니티 풀', description: '속초 바다와 이어지는 듯한 인피니티 풀' },
  { icon: Sunset, title: '선셋 오션뷰', description: '화이트 테라스에서 감상하는 붉은 노을' },
  { icon: Wind, title: '프라이빗 바비큐', description: '바닷바람과 함께하는 프라이빗 다이닝' },
  { icon: Coffee, title: '프리미엄 어메니티', description: '특급 호텔 수준의 어메니티와 서비스' },
];

export const REVIEWS: Review[] = [
  { id: 1, author: '김**님', rating: 5, date: '2023.10.15', content: '사진보다 훨씬 예쁜 숙소였어요. 하얀 건물이 파란 수영장이랑 너무 잘 어울려서 인생샷 많이 건졌습니다.' },
  { id: 2, author: '이**님', rating: 5, date: '2023.11.02', content: '아이들과 함께 Sunset Family 룸 묵었는데, 수영장 물도 따뜻하고 숙소도 너무 청결해서 좋았습니다.' },
  { id: 3, author: '박**님', rating: 5, date: '2023.12.10', content: '속초 바다가 한눈에 보이는 뷰가 예술입니다. 침구도 푹신하고 직원분들도 친절하셨어요.' },
];

export const ATTRACTIONS = [
  { name: '속초해변', distance: '도보 3분', icon: Anchor },
  { name: '영금정', distance: '차량 10분', icon: Waves },
  { name: '설악산 케이블카', distance: '차량 20분', icon: Mountain },
  { name: '속초 중앙시장', distance: '차량 12분', icon: MapPin },
];