'use client';

import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'employee' | 'customer';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  role: 'customer',
  setRole: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<UserRole>('customer');
  const router = useRouter();

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const logout = () => {
    // In a real app, you'd clear tokens here
    router.push('/');
  };

  const value = useMemo(() => ({ role, setRole, logout }), [role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
