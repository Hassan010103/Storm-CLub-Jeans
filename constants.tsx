import React from 'react';
import { Product, Testimonial, Feature } from './types';
import { ShieldCheck, TrendingUp, Truck, Package, DollarSign, Award } from 'lucide-react';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Rider Slim',
    category: 'Slim Fit',
    modelNo: 'SC-101',
    sizeRange: '28-36',
    fabric: '98% Cotton, 2% Elastane',
    price: '₹850',
    moq: '50 Pcs',
    image: 'https://picsum.photos/600/800?random=1'
  },
  {
    id: '2',
    name: 'Urban Destroyed',
    category: 'Ripped',
    modelNo: 'SC-204',
    sizeRange: '30-38',
    fabric: 'Premium Denim 12oz',
    price: '₹920',
    moq: '50 Pcs',
    image: 'https://picsum.photos/600/800?random=2'
  },
  {
    id: '3',
    name: 'Classic Indigo Regular',
    category: 'Regular Fit',
    modelNo: 'SC-305',
    sizeRange: '28-40',
    fabric: '100% Cotton Rigid',
    price: '₹780',
    moq: '100 Pcs',
    image: 'https://picsum.photos/600/800?random=3'
  },
  {
    id: '4',
    name: 'Flex Motion Stretch',
    category: 'Stretch',
    modelNo: 'SC-410',
    sizeRange: '28-36',
    fabric: '4-Way Stretch Blend',
    price: '₹890',
    moq: '50 Pcs',
    image: 'https://picsum.photos/600/800?random=4'
  },
  {
    id: '5',
    name: 'Vogue Dust Wash',
    category: 'Trend',
    modelNo: 'SC-550',
    sizeRange: '30-36',
    fabric: 'Cotton Poly Blend',
    price: '₹950',
    moq: '30 Pcs',
    image: 'https://picsum.photos/600/800?random=5'
  },
  {
    id: '6',
    name: 'Blackout Slim',
    category: 'Slim Fit',
    modelNo: 'SC-102',
    sizeRange: '28-34',
    fabric: 'Jet Black Stretch',
    price: '₹880',
    moq: '50 Pcs',
    image: 'https://picsum.photos/600/800?random=6'
  },
  {
    id: '7',
    name: 'Vintage Wash Straight',
    category: 'Regular Fit',
    modelNo: 'SC-308',
    sizeRange: '28-38',
    fabric: '100% Cotton',
    price: '₹820',
    moq: '60 Pcs',
    image: 'https://picsum.photos/600/800?random=7'
  },
  {
    id: '8',
    name: 'Ice Blue Skinny',
    category: 'Slim Fit',
    modelNo: 'SC-105',
    sizeRange: '28-34',
    fabric: 'High Stretch Denim',
    price: '₹860',
    moq: '50 Pcs',
    image: 'https://picsum.photos/600/800?random=8'
  },
  {
    id: '9',
    name: 'Rugged Biker Moto',
    category: 'Trend',
    modelNo: 'SC-555',
    sizeRange: '30-38',
    fabric: 'Heavyweight Denim',
    price: '₹1050',
    moq: '40 Pcs',
    image: 'https://picsum.photos/600/800?random=9'
  },
   {
    id: '10',
    name: 'Charcoal Fade',
    category: 'Stretch',
    modelNo: 'SC-415',
    sizeRange: '28-36',
    fabric: 'Cotton Elastane',
    price: '₹895',
    moq: '50 Pcs',
    image: 'https://picsum.photos/600/800?random=10'
  },
   {
    id: '11',
    name: 'Distressed Dad Fit',
    category: 'Ripped',
    modelNo: 'SC-210',
    sizeRange: '30-40',
    fabric: 'Rigid Denim',
    price: '₹940',
    moq: '50 Pcs',
    image: 'https://picsum.photos/600/800?random=11'
  },
   {
    id: '12',
    name: 'Raw Selvedge Look',
    category: 'Regular Fit',
    modelNo: 'SC-312',
    sizeRange: '28-42',
    fabric: 'Raw Indigo',
    price: '₹980',
    moq: '30 Pcs',
    image: 'https://picsum.photos/600/800?random=12'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Owner',
    company: 'Denim Hub, Mumbai',
    text: 'Storm Club Jeans has transformed my retail counter. The fit and finish are on par with international brands, but the wholesale rates allow me to keep a healthy margin. Highly recommended.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Amit Verma',
    role: 'Distributor',
    company: 'Verma Fashions, Punjab',
    text: 'I have been dealing with them for 3 years. Their dispatch speed from Karol Bagh is incredible. Never faced a stock shortage issue during festive seasons.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sneha Reddy',
    role: 'Buyer',
    company: 'Urban Trends, Bangalore',
    text: 'The quality of the fabric is what sets them apart. My customers love the stretch and comfort. The new ripped collection is a bestseller.',
    rating: 4,
  },
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Premium Denim Fabric',
    description: 'Sourced from the finest mills, ensuring durability and comfort.',
    icon: <ShieldCheck className="w-8 h-8 text-brand-accent" />,
  },
  {
    id: '2',
    title: 'Latest Trending Designs',
    description: 'Our design team in Delhi stays ahead of global fashion curves.',
    icon: <TrendingUp className="w-8 h-8 text-brand-accent" />,
  },
  {
    id: '3',
    title: 'Fast Dispatch',
    description: 'Dispatched within 24-48 hours from our Karol Bagh warehouse.',
    icon: <Truck className="w-8 h-8 text-brand-accent" />,
  },
  {
    id: '4',
    title: 'Bulk Order Friendly',
    description: 'Scalable manufacturing to handle orders from 50 to 5000 units.',
    icon: <Package className="w-8 h-8 text-brand-accent" />,
  },
  {
    id: '5',
    title: 'Competitive Rates',
    description: 'Direct manufacturer pricing maximizes your retail margins.',
    icon: <DollarSign className="w-8 h-8 text-brand-accent" />,
  },
  {
    id: '6',
    title: 'Reliable Supplier',
    description: 'Trusted by over 500+ retailers across India.',
    icon: <Award className="w-8 h-8 text-brand-accent" />,
  },
];