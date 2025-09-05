
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const TOKEN_KEY = 'letrum_access_token';
const USER_KEY = 'letrum_user';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
	(config) => {
		const token = Cookies.get(TOKEN_KEY);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			Cookies.remove(TOKEN_KEY);
			Cookies.remove(USER_KEY);
			if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

// Types
export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	phone?: string;
	avatar?: string;
	isActive: boolean;
	role: 'USER' | 'ADMIN' | 'STAFF';
	createdAt: string;
	updatedAt: string;
}

export interface AuthResponse {
	user: User;
	accessToken: string;
	message: string;
}

export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone?: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface ApiError {
	message: string;
	statusCode: number;
	error?: string;
}

// Auth API
export const authAPI = {
	register: async (data: RegisterData): Promise<AuthResponse> => {
		const response = await apiClient.post<AuthResponse>('/auth/register', data);
		if (response.data.accessToken) {
			Cookies.set(TOKEN_KEY, response.data.accessToken, { expires: 7 });
			Cookies.set(USER_KEY, JSON.stringify(response.data.user), { expires: 7 });
		}
		return response.data;
	},
	login: async (data: LoginData): Promise<AuthResponse> => {
		const response = await apiClient.post<AuthResponse>('/auth/login', data);
		if (response.data.accessToken) {
			Cookies.set(TOKEN_KEY, response.data.accessToken, { expires: 7 });
			Cookies.set(USER_KEY, JSON.stringify(response.data.user), { expires: 7 });
		}
		return response.data;
	},
	getProfile: async (): Promise<{ user: User; message: string }> => {
		const response = await apiClient.get('/auth/profile');
		return response.data;
	},
	logout: () => {
		Cookies.remove(TOKEN_KEY);
		Cookies.remove(USER_KEY);
		if (typeof window !== 'undefined') {
			window.location.href = '/login';
		}
	},
	getCurrentUser: (): User | null => {
		const userData = Cookies.get(USER_KEY);
		return userData ? JSON.parse(userData) : null;
	},
	isAuthenticated: (): boolean => {
		return !!Cookies.get(TOKEN_KEY);
	},
};

// Users API
export const usersAPI = {
	getAll: async (): Promise<User[]> => {
		const response = await apiClient.get('/users');
		return response.data;
	},
	getById: async (id: string): Promise<User> => {
		const response = await apiClient.get(`/users/${id}`);
		return response.data.user;
	},
	updateProfile: async (data: Partial<User>): Promise<User> => {
		const response = await apiClient.patch('/users/me', data);
		const updatedUser = response.data.user || response.data;
		Cookies.set(USER_KEY, JSON.stringify(updatedUser), { expires: 7 });
		return updatedUser;
	},
	update: async (id: string, data: Partial<User>): Promise<User> => {
		const response = await apiClient.patch(`/users/${id}`, data);
		return response.data.user || response.data;
	},
	delete: async (id: string): Promise<{ message: string }> => {
		const response = await apiClient.delete(`/users/${id}`);
		return response.data;
	},
	deactivate: async (id: string): Promise<{ message: string }> => {
		const response = await apiClient.patch(`/users/${id}/deactivate`);
		return response.data;
	},
	activate: async (id: string): Promise<{ message: string }> => {
		const response = await apiClient.patch(`/users/${id}/activate`);
		return response.data;
	},
};

// Tour types
export interface Tour {
	id: string;
	title: string;
	description: string;
	shortDesc: string;
	duration: string;
	price: number;
	images: string[];
	featuredImage: string;
	itinerary: { title: string; description: string }[];
	inclusions: string[];
	exclusions: string[];
	maxGuests: number;
	difficulty: string;
	category: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	averageRating?: number;
	reviews?: any[];
	_count?: {
		reviews: number;
	};
}

export interface Booking {
	id: string;
	userId: string;
	type: string;
	status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
	totalAmount: number;
	details: any;
	createdAt: string;
	updatedAt: string;
	tour?: Tour;
}

// Tours API
export const toursAPI = {
	getAll: async (limit?: number, category?: string): Promise<Tour[]> => {
		const params = new URLSearchParams();
		if (limit) params.append('limit', limit.toString());
		if (category) params.append('category', category);
		
		const response = await apiClient.get(`/tours${params.toString() ? '?' + params.toString() : ''}`);
		return response.data;
	},
	
	search: async (params: {
		page?: number;
		limit?: number;
		search?: string;
		destination?: string;
		category?: string;
		maxPrice?: number;
		minPrice?: number;
		duration?: number;
		guests?: number;
		difficulty?: string;
		sortBy?: 'price_low' | 'price_high' | 'duration' | 'rating';
	}): Promise<Tour[]> => {
		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				searchParams.append(key, value.toString());
			}
		});
		const response = await apiClient.get(`/tours?${searchParams.toString()}`);
		return response.data;
	},
	
	getPopular: async (limit: number = 4): Promise<Tour[]> => {
		const response = await apiClient.get(`/tours/popular?limit=${limit}`);
		return response.data;
	},
	
	getById: async (id: string): Promise<Tour> => {
		const response = await apiClient.get(`/tours/${id}`);
		return response.data;
	},
	
	book: async (tourId: string, guests: number, startDate: string, notes?: string): Promise<Booking> => {
		const response = await apiClient.post('/tours/book', {
			tourId,
			guests,
			startDate,
			notes,
		});
		return response.data;
	},
	
	getMyBookings: async (): Promise<Booking[]> => {
		const response = await apiClient.get('/tours/bookings/my');
		return response.data;
	},
	
	createReview: async (tourId: string, rating: number, comment: string): Promise<any> => {
		const response = await apiClient.post(`/tours/${tourId}/reviews`, {
			rating,
			comment,
		});
		return response.data;
	},
};

// Bookings API
export const bookingsAPI = {
	getAll: async (): Promise<Booking[]> => {
		const response = await apiClient.get('/bookings');
		return response.data;
	},
	getById: async (id: string): Promise<Booking> => {
		const response = await apiClient.get(`/bookings/${id}`);
		return response.data;
	},
	cancel: async (id: string): Promise<{ message: string }> => {
		const response = await apiClient.patch(`/bookings/${id}/cancel`);
		return response.data;
	},
	updateStatus: async (id: string, status: string): Promise<Booking> => {
		const response = await apiClient.patch(`/bookings/${id}/status`, { status });
		return response.data;
	},
};

// Flight API Types
export interface Flight {
	id: string;
	airline: string;
	flightNumber: string;
	departure: {
		airport: string;
		city: string;
		country: string;
		time: string;
		date: string;
	};
	arrival: {
		airport: string;
		city: string;
		country: string;
		time: string;
		date: string;
	};
	price: number;
	currency: string;
	duration: string;
	stops: number;
	aircraft: string;
	availableSeats: number;
	bookingClass: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface FlightSearchParams {
	from: string;
	to: string;
	departDate: string;
	returnDate?: string;
	passengers: number;
	class: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
	tripType: 'ONE_WAY' | 'ROUND_TRIP';
}

export interface FlightBookingData {
	flightId: string;
	passengers: {
		firstName: string;
		lastName: string;
		email: string;
		phone?: string;
		dateOfBirth: string;
		passportNumber?: string;
	}[];
	totalAmount: number;
	specialRequests?: string;
}

// Flights API
export const flightsAPI = {
	search: async (params: FlightSearchParams): Promise<Flight[]> => {
		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				searchParams.append(key, value.toString());
			}
		});
		const response = await apiClient.get(`/flights/search?${searchParams.toString()}`);
		return response.data;
	},
	getAll: async (): Promise<Flight[]> => {
		const response = await apiClient.get('/flights');
		return response.data;
	},
	getById: async (id: string): Promise<Flight> => {
		const response = await apiClient.get(`/flights/${id}`);
		return response.data;
	},
	getPopularDestinations: async (): Promise<{ city: string; country: string; count: number }[]> => {
		const response = await apiClient.get('/flights/popular-destinations');
		return response.data;
	},
	book: async (data: FlightBookingData): Promise<Booking> => {
		const response = await apiClient.post('/flights/book', data);
		return response.data;
	},
};

// Car API Types
export interface Car {
	id: string;
	make: string;
	model: string;
	year: number;
	category: 'ECONOMY' | 'COMPACT' | 'INTERMEDIATE' | 'STANDARD' | 'FULL_SIZE' | 'PREMIUM' | 'LUXURY' | 'SUV' | '4WD';
	transmission: 'MANUAL' | 'AUTOMATIC';
	fuelType: 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC';
	seats: number;
	doors: number;
	airConditioning: boolean;
	features: string[];
	pricePerDay: number;
	currency: string;
	location: string;
	availability: boolean;
	images: string[];
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CarSearchParams {
	location: string;
	pickupDate: string;
	returnDate: string;
	category?: string;
	minPrice?: number;
	maxPrice?: number;
}

export interface CarBookingData {
	carId: string;
	pickupDate: string;
	returnDate: string;
	pickupLocation: string;
	returnLocation: string;
	totalAmount: number;
	driverDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		licenseNumber: string;
		age: number;
	};
	additionalOptions?: {
		gps?: boolean;
		childSeat?: boolean;
		additionalDriver?: boolean;
		insurance?: 'BASIC' | 'PREMIUM' | 'COMPREHENSIVE';
	};
}

// Cars API
export const carsAPI = {
	search: async (params: CarSearchParams): Promise<Car[]> => {
		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				searchParams.append(key, value.toString());
			}
		});
		const response = await apiClient.get(`/cars/search?${searchParams.toString()}`);
		return response.data;
	},
	getAll: async (): Promise<Car[]> => {
		const response = await apiClient.get('/cars');
		return response.data;
	},
	getById: async (id: string): Promise<Car> => {
		const response = await apiClient.get(`/cars/${id}`);
		return response.data;
	},
	getCategories: async (): Promise<string[]> => {
		const response = await apiClient.get('/cars/categories');
		return response.data;
	},
	getByLocation: async (location: string): Promise<Car[]> => {
		const response = await apiClient.get(`/cars/location/${location}`);
		return response.data;
	},
	book: async (data: CarBookingData): Promise<Booking> => {
		const response = await apiClient.post('/cars/book', data);
		return response.data;
	},
};

// Visa API Types
export interface VisaRequest {
	id: string;
	userId: string;
	destinationCountry: string;
	visaType: string;
	purpose: string;
	travelDate: string;
	returnDate: string;
	applicantDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		dateOfBirth: string;
		nationality: string;
		passportNumber: string;
		passportExpiry: string;
		occupation: string;
		address: string;
	};
	documents: {
		passport?: string;
		photo?: string;
		bankStatement?: string;
		employmentLetter?: string;
		hotelBooking?: string;
		flightBooking?: string;
		others?: string[];
	};
	status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ADDITIONAL_DOCS_REQUIRED';
	notes?: string;
	processingFee: number;
	visaFee: number;
	totalAmount: number;
	createdAt: string;
	updatedAt: string;
	user?: User;
}

export interface VisaApplicationData {
	destinationCountry: string;
	visaType: string;
	purpose: string;
	travelDate: string;
	returnDate: string;
	applicantDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		dateOfBirth: string;
		nationality: string;
		passportNumber: string;
		passportExpiry: string;
		occupation: string;
		address: string;
	};
}

// Visa API
export const visaAPI = {
	getAll: async (): Promise<VisaRequest[]> => {
		const response = await apiClient.get('/visa');
		return response.data;
	},
	getById: async (id: string): Promise<VisaRequest> => {
		const response = await apiClient.get(`/visa/${id}`);
		return response.data;
	},
	getMyRequests: async (): Promise<VisaRequest[]> => {
		const response = await apiClient.get('/visa/my-requests');
		return response.data;
	},
	apply: async (data: VisaApplicationData): Promise<VisaRequest> => {
		const response = await apiClient.post('/visa', data);
		return response.data;
	},
	updateStatus: async (id: string, status: string, notes?: string): Promise<VisaRequest> => {
		const response = await apiClient.put(`/visa/${id}/status`, { status, notes });
		return response.data;
	},
	uploadDocument: async (id: string, documentType: string, file: File): Promise<{ message: string; url: string }> => {
		const formData = new FormData();
		formData.append('document', file);
		formData.append('type', documentType);
		
		const response = await apiClient.post(`/visa/${id}/documents`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	},
};

// Product API Types
export interface Product {
	id: string;
	name: string;
	description: string;
	shortDescription: string;
	price: number;
	compareAtPrice?: number;
	currency: string;
	category: string;
	subCategory?: string;
	brand?: string;
	sku: string;
	stockQuantity: number;
	lowStockThreshold: number;
	weight?: number;
	dimensions?: {
		length: number;
		width: number;
		height: number;
	};
	images: string[];
	featuredImage: string;
	tags: string[];
	isActive: boolean;
	isFeatured: boolean;
	createdAt: string;
	updatedAt: string;
	rating?: number;
	reviewCount?: number;
}

export interface CartItem {
	productId: string;
	quantity: number;
	price: number;
	product?: Product;
}

export interface Order {
	id: string;
	userId: string;
	items: {
		productId: string;
		quantity: number;
		price: number;
		product: Product;
	}[];
	subtotal: number;
	tax: number;
	shipping: number;
	total: number;
	status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
	shippingAddress: {
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		state: string;
		country: string;
		postalCode: string;
		phone: string;
	};
	paymentMethod: string;
	paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
	trackingNumber?: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
	user?: User;
}

export interface CreateOrderData {
	items: CartItem[];
	shippingAddress: {
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		state: string;
		country: string;
		postalCode: string;
		phone: string;
	};
	paymentMethod: string;
	notes?: string;
}

// Products API
export const productsAPI = {
	getAll: async (params?: {
		category?: string;
		search?: string;
		minPrice?: number;
		maxPrice?: number;
		limit?: number;
		offset?: number;
		sort?: 'price' | 'name' | 'rating' | 'created';
		order?: 'asc' | 'desc';
	}): Promise<Product[]> => {
		const searchParams = new URLSearchParams();
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined) {
					searchParams.append(key, value.toString());
				}
			});
		}
		const response = await apiClient.get(`/products${searchParams.toString() ? '?' + searchParams.toString() : ''}`);
		return response.data;
	},
	getById: async (id: string): Promise<Product> => {
		const response = await apiClient.get(`/products/${id}`);
		return response.data;
	},
	getCategories: async (): Promise<string[]> => {
		const response = await apiClient.get('/products/categories');
		return response.data;
	},
	getFeatured: async (limit?: number): Promise<Product[]> => {
		const response = await apiClient.get(`/products/featured${limit ? `?limit=${limit}` : ''}`);
		return response.data;
	},
	createOrder: async (data: CreateOrderData): Promise<Order> => {
		const response = await apiClient.post('/products/orders', data);
		return response.data;
	},
	getMyOrders: async (): Promise<Order[]> => {
		const response = await apiClient.get('/products/orders/my');
		return response.data;
	},
	getOrderById: async (id: string): Promise<Order> => {
		const response = await apiClient.get(`/products/orders/${id}`);
		return response.data;
	},
	updateOrderStatus: async (id: string, status: string): Promise<Order> => {
		const response = await apiClient.patch(`/products/orders/${id}/status`, { status });
		return response.data;
	},
};

// Health check
export const healthAPI = {
	check: async (): Promise<{ status: string; message: string; timestamp: string }> => {
		const response = await apiClient.get('/health');
		return response.data;
	},
};

export default apiClient;

// --- Auth helper types and functions for pages ---
type RegisterUserInput = { name: string; email: string; password: string };
type LoginUserInput = { email: string; password: string };

export function registerUser(data: RegisterUserInput) {
	const [firstName, ...rest] = data.name.trim().split(' ');
	const lastName = rest.join(' ') || '';
	return authAPI.register({
		firstName,
		lastName,
		email: data.email,
		password: data.password,
	});
}

export function loginUser(data: LoginUserInput) {
	return authAPI.login(data);
}

export function logoutUser() {
	return authAPI.logout();
}
