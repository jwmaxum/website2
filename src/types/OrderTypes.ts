export interface CartItem {
  productId: string;
  code: string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  imageUrl: string;
  brand: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export type CourierCompany = 'CJ대한통운' | '로젠택배' | '한진택배';

export interface Order {
  id: string; // e.g. 'ORD-20260723-8821'
  orderType: 'member' | 'guest'; // 회원 / 비회원
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: '주문접수' | '배송중' | '배송완료' | '주문취소';
  courier?: CourierCompany;
  trackingNumber?: string;
  createdAt: string;
}

export const initialOrders: Order[] = [
  {
    id: 'ORD-20260723-8821',
    orderType: 'member',
    customerName: '김조선 님',
    customerEmail: 'joseon_vip@beauty.com',
    customerPhone: '010-1234-5678',
    shippingAddress: '서울특별시 강남구 테헤란로 521 조선미녀 타워 10층',
    items: [
      {
        productId: 'prd-1',
        productName: '맑은쌀선크림 (SPF 50+ PA++++)',
        price: 15300,
        quantity: 2,
        imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLtsVqrSDMr5Hp64St34s8zOuQMwoQkxb_mpUI1fs4_2dB2UmUWby6gENUgL-jXfMej03GSR4NqFXKFf0OBWAGI2wJEX3OrSBqoUAQ0S_GzTp6JR3QNdI56t1gi0j2IsgFHVIqQHpFrmBPRSExV_9yqYXUysdrMV6j46vU4JO4cESKH_0HUMLa1XhrvVZ1We1fVi1nB3DZyflXa7qWQ9AhYRsp9B-s9p6On59kcaVEus1ayOmxiUCE28C0c3',
      },
    ],
    totalAmount: 30600,
    status: '배송중',
    courier: 'CJ대한통운',
    trackingNumber: '6830-1928-3011',
    createdAt: '2026.07.23 10:15',
  },
  {
    id: 'ORD-20260722-4019',
    orderType: 'guest',
    customerName: '이비회원',
    customerEmail: 'guest_test@gmail.com',
    customerPhone: '010-9876-5432',
    shippingAddress: '경기도 성남시 분당구 판교역로 166',
    items: [
      {
        productId: 'prd-2',
        productName: '조선미녀 인삼 탄력 크림 60ml',
        price: 20400,
        quantity: 1,
        imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsTDIbMW4ORIttbx7LcQBhQqCx3rUQzDZ0rKkTJlESxSyUuepvECQSxUULhXCS4f8eXC7CQU5meNhFXxQdr1h9C_ivcvf5ngHZ3ygsQcf7vhSkmFUoWkmjXwZiXVW-Em_EcgJHqx2tAbXrzXneCVMxbRmehlH_19d_zScE8wQggEYpVLob70lv2GXaObDHGs1-VBNQ77JCsoI1ZQUWF02rRduDfDoGx2sjn-WrTEFk5h98TEj0t0r53bBPW',
      },
    ],
    totalAmount: 20400,
    status: '주문접수',
    courier: '로젠택배',
    trackingNumber: '9012-3341-8890',
    createdAt: '2026.07.22 16:40',
  },
];
