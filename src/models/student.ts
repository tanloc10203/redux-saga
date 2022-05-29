export interface Student {
  id?: string;
  name: string;
  age: number;
  mark: number;
  city: string;
  gender: 'male' | 'female';
  createdAt?: number;
  updatedAt?: number;
}
