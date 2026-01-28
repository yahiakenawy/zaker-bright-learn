// API Configuration and utilities for Zaker AI backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    console.error(`API Error [${endpoint}]:`, message);
    return { data: null, error: message };
  }
}

// Plan types
export interface Plan {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

export interface Tier {
  id: number;
  plan_id: number;
  name: string;
  monthly_price: string;
  yearly_price: string;
  features: string[];
  is_active: boolean;
}

export interface TenantCreate {
  name: string;
  domain: string;
  description?: string;
  logo_url?: string;
  phone: string;
  email: string;
  plan_id: number;
  tier_id: number;
  billing_cycle: 'monthly' | 'yearly';
  transaction_id: string;
}

export interface TenantResponse {
  id: number;
  name: string;
  domain: string;
  admin_email: string;
  admin_password: string;
  message: string;
}

// API functions
export async function getPlans(): Promise<ApiResponse<Plan[]>> {
  return fetchApi<Plan[]>('/plans/');
}

export async function getTiers(planId?: number): Promise<ApiResponse<Tier[]>> {
  const endpoint = planId ? `/tiers/?plan_id=${planId}` : '/tiers/';
  return fetchApi<Tier[]>(endpoint);
}

export async function createTenant(data: TenantCreate): Promise<ApiResponse<TenantResponse>> {
  return fetchApi<TenantResponse>('/tenants/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Fallback data when API is unavailable
export const fallbackPlans: Plan[] = [
  {
    id: 1,
    name: 'Teachers',
    description: 'Perfect for individual educators',
    is_active: true,
  },
  {
    id: 2,
    name: 'Schools',
    description: 'Comprehensive solution for institutions',
    is_active: true,
  },
];

export const fallbackTiers: Tier[] = [
  {
    id: 1,
    plan_id: 1,
    name: 'Basic',
    monthly_price: '900',
    yearly_price: '8640',
    features: [
      'Up to 500 papers/month',
      'Basic analytics',
      'Email support',
      'Arabic & English support',
    ],
    is_active: true,
  },
  {
    id: 2,
    plan_id: 1,
    name: 'Pro',
    monthly_price: '1500',
    yearly_price: '14400',
    features: [
      'Up to 1500 papers/month',
      'Advanced analytics',
      'Priority support',
      'All subjects',
      'Custom feedback templates',
    ],
    is_active: true,
  },
  {
    id: 3,
    plan_id: 2,
    name: 'Basic',
    monthly_price: '4000',
    yearly_price: '38400',
    features: [
      'Unlimited papers',
      'Up to 20 teachers',
      'Admin dashboard',
      'Basic analytics',
      'Email support',
    ],
    is_active: true,
  },
  {
    id: 4,
    plan_id: 2,
    name: 'Enterprise',
    monthly_price: '8000',
    yearly_price: '76800',
    features: [
      'Unlimited papers',
      'Unlimited teachers',
      'Advanced admin dashboard',
      'Full analytics suite',
      '24/7 priority support',
      'Custom integrations',
      'Dedicated account manager',
    ],
    is_active: true,
  },
];
