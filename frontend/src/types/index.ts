export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  taxIncluded: boolean;
  stock: number;
  isUnlimitedStock: boolean;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'PENDING';
  status: 'PUBLISHED' | 'DRAFT';
  categoryId?: string;
  category?: Category;
  tags: string[];
  images: string[];
  colorSwatches?: string[];
  featured?: boolean;
  salesCount?: number;
  orderCount?: number;
  rating?: number;
  expirationStart?: string;
  expirationEnd?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Canceled';
  amount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface PaginatedProducts {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
