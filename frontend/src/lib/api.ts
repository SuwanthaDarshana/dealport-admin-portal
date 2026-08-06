import { AuthResponse, Category, PaginatedProducts, Product, Transaction, User } from '@/types';

const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, '');

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('dealport_token');
  }
  return null;
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dealport_token', token);
  }
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('dealport_token');
    localStorage.removeItem('dealport_user');
  }
}

export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('dealport_user');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function setStoredUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dealport_user', JSON.stringify(user));
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await res.json();
      errorMessage = Array.isArray(errorData.message)
        ? errorData.message.join(', ')
        : errorData.message || res.statusText;
    } catch {
      errorMessage = res.statusText;
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export const api = {
  // Auth
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const data = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(data.access_token);
    setStoredUser(data.user);
    return data;
  },

  getProfile: async (): Promise<User> => {
    return request<User>('/auth/me');
  },

  // Products
  getProducts: async (params: {
    search?: string;
    category?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<PaginatedProducts> => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category) query.append('category', params.category);
    if (params.status) query.append('status', params.status);
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());

    return request<PaginatedProducts>(`/products?${query.toString()}`);
  },

  getProduct: async (id: string): Promise<Product> => {
    return request<Product>(`/products/${id}`);
  },

  getBestSellingProducts: async (): Promise<Product[]> => {
    return request<Product[]>('/products/widgets/best-selling');
  },

  getTopRatedProducts: async (): Promise<Product[]> => {
    return request<Product[]>('/products/widgets/top-rated');
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    return request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    return request<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id: string): Promise<{ success: boolean }> => {
    return request<{ success: boolean }>(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    return request<Category[]>('/categories');
  },

  // Transactions
  getTransactions: async (): Promise<Transaction[]> => {
    return request<Transaction[]>('/transactions');
  },
};
