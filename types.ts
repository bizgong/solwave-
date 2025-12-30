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