import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const apiClient = axios.create({
  baseURL: API_URL
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("streleam_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setToken(token) {
  if (token) {
    localStorage.setItem("streleam_token", token);
  } else {
    localStorage.removeItem("streleam_token");
  }
}

export function getToken() {
  return localStorage.getItem("streleam_token");
}

export const api = {
  register: (payload) => apiClient.post("/auth/register", payload).then((res) => res.data),
  login: (payload) => apiClient.post("/auth/login", payload).then((res) => res.data),
  me: () => apiClient.get("/auth/me").then((res) => res.data),
  customers: () => apiClient.get("/customers").then((res) => res.data),
  createCustomer: (payload) => apiClient.post("/customers", payload).then((res) => res.data),
  vendors: () => apiClient.get("/vendors").then((res) => res.data),
  createVendor: (payload) => apiClient.post("/vendors", payload).then((res) => res.data),
  products: () => apiClient.get("/products").then((res) => res.data),
  createProduct: (payload) => apiClient.post("/products", payload).then((res) => res.data),
  inventory: () => apiClient.get("/inventory").then((res) => res.data),
  purchaseOrders: () => apiClient.get("/purchase-orders").then((res) => res.data),
  createPurchaseOrder: (payload) => apiClient.post("/purchase-orders", payload).then((res) => res.data),
  inwardPurchaseOrder: (id) => apiClient.post(`/purchase-orders/${id}/inward`).then((res) => res.data),
  createProduction: (payload) => apiClient.post("/production", payload).then((res) => res.data),
  customerOrders: () => apiClient.get("/customer-orders").then((res) => res.data),
  createCustomerOrder: (payload) => apiClient.post("/customer-orders", payload).then((res) => res.data),
  completeCustomerOrder: (id) => apiClient.post(`/customer-orders/${id}/complete`).then((res) => res.data),
  reports: {
    orders: () => apiClient.get("/reports/orders").then((res) => res.data),
    inventory: () => apiClient.get("/reports/inventory").then((res) => res.data),
    production: () => apiClient.get("/reports/production").then((res) => res.data)
  }
};
