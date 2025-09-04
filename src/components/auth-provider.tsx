
'use client';

import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { users } from '@/lib/data';
import type { User, UserRole } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = users.find((u) => u.username === username);
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      return true;
    }
    return false;
  };
  
  const signup = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    const existingUser = users.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this username or email already exists.');
    }
    const newUser: User = {
      id: `user_${Date.now()}`,
      ...userData,
    };
    users.push(newUser); // In a real app, this would be an API call
    // Do not log the user in automatically after signup
    return true;
  };

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  const value = useMemo(() => ({
      user,
      role: user?.role || null,
      login,
      signup,
      logout,
    }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export UserRole to be used in other components if needed without importing from types
export type { UserRole };
