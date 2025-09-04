
'use client';

import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { users } from '@/lib/data';
import type { User, UserRole } from '@/lib/types';

interface LoginResult {
  success: boolean;
  user?: User;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (username: string, password: string) => Promise<LoginResult>;
  verifyAdminCode: (userId: string, code: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'verificationCode'>) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  login: async () => ({ success: false }),
  verifyAdminCode: async () => false,
  signup: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (username: string, password: string): Promise<LoginResult> => {
    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      if (foundUser.role !== 'admin') {
        setUser(foundUser);
      }
      return { success: true, user: foundUser };
    }
    return { success: false };
  };

  const verifyAdminCode = async (userId: string, code: string): Promise<boolean> => {
    const foundUser = users.find(u => u.id === userId && u.verificationCode === code);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };
  
  const signup = async (userData: Omit<User, 'id' | 'verificationCode'>): Promise<boolean> => {
    const existingUser = users.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this username or email already exists.');
    }
    
    if (userData.role === 'admin' && userData.storeId) {
        const storeInUse = users.some(u => u.storeId === userData.storeId);
        if (storeInUse) {
            throw new Error('This store already has an administrator.');
        }
    }
    
    let verificationCode: string | undefined = undefined;
    if (userData.role === 'admin') {
        verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      ...userData,
      verificationCode,
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
      verifyAdminCode,
      signup,
      logout,
    }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export UserRole to be used in other components if needed without importing from types
export type { UserRole };
