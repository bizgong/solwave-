import React from 'react';

export interface Room {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: string;
  capacity: string;
  size: string;
  features: string[];
  image: string;
  detailImages: string[];
}

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
  date: string;
}

export interface ContactFormState {
  name: string;
  contact: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  message: string;
  agreement: boolean;
}

// CMS Types
export interface TextStyle {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface TextContent {
  text: string;
  style: TextStyle;
}

export interface SectionHero {
  title: TextContent;
  subtitle: TextContent;
  ctaText: TextContent;
  bgImageUrl: string;
}

export interface SimpleSection {
  title: string;
  subtitle: string;
}

export interface GlobalSettings {
  contact: {
    phone: string;
    address: string;
    kakaoId: string;
  };
  bank: {
    name: string;
    account: string;
    holder: string;
  };
}

export interface HomeContent {
  hero: SectionHero;
  features: SimpleSection;
  rooms: SimpleSection;
  reviews: SimpleSection;
  location: SimpleSection;
  cta: SimpleSection;
}

export interface SiteContent {
  updatedAt: string;
  global: GlobalSettings;
  home: HomeContent;
}

export interface AdminAuth {
  adminId: string;
  passwordHash: string;
  updatedAt: string;
}