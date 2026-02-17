import React from 'react';

export interface Product {
  id: string;
  name: string;
  category: 'Slim Fit' | 'Regular Fit' | 'Ripped' | 'Stretch' | 'Trend';
  modelNo: string;
  sizeRange: string;
  fabric: string;
  price: string;
  moq: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}