import { Company } from "./company";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  company: Company;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Register {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}
