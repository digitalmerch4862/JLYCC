import { User } from '../types/crm';

export const dummyUsers: User[] = [
  { id: '1', name: 'Alice Johnson', role: 'Admin', email: 'alice@example.com', phone: '123-456-7890' },
  { id: '2', name: 'Bob Smith', role: 'Leader', email: 'bob@example.com', phone: '234-567-8901' },
  { id: '3', name: 'Charlie Brown', role: 'Leader', email: 'charlie@example.com', phone: '345-678-9012' },
  { id: '4', name: 'David Davis', role: 'Member', leaderId: '2', email: 'david@example.com', phone: '456-789-0123' },
  { id: '5', name: 'Eve Evans', role: 'Member', leaderId: '2', email: 'eve@example.com', phone: '567-890-1234' },
  { id: '6', name: 'Frank Foster', role: 'Member', leaderId: '3', email: 'frank@example.com', phone: '678-901-2345' },
  { id: '7', name: 'Grace Green', role: 'Member', leaderId: '3', email: 'grace@example.com', phone: '789-012-3456' },
];
