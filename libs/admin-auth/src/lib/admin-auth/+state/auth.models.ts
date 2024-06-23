/**
 * Interface for the 'Auth' data
 */
export interface AuthEntity {
  id: string | number; // Primary ID
  name: string;
}


export interface LoginRequest {
  email: string,
  password: string
}

export interface LoginResponse {
  id:number,
  name: string,
  email: string,
  accessToken: string,
  refreshToken: string,
  role: string
}

export interface APIResponse<T> {
  statusCode: number,
  message: string,
  data: T
}