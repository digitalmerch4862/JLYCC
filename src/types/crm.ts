export type Role = 'Admin' | 'Inner Core' | 'Joshua Gen' | 'Member';

export interface User {
  id: string;
  name: string;
  role: Role;
  leaderId?: string;
  email: string;
  phone: string;
}
