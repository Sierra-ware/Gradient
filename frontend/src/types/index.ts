export type Role = 'user' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Photo {
  id: number;
  title: string;
  image_url: string;
  user: Pick<User, 'id' | 'name' | 'role'>;
  created_at: string;
}
