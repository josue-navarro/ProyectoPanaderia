'use client';

import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'employee' | 'customer';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  logout: () => void;
  hasAccount: boolean;
  createAccount: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType>({
  role: 'customer',
  setRole: () => {},
  logout: () => {},
  hasAccount: false,
  createAccount: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<UserRole>('customer');
  const [hasAccount, setHasAccount] = useState(false);
  const router = useRouter();

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const createAccount = (newRole: UserRole) => {
    setRoleState(newRole);
    setHasAccount(true);
  };

  const logout = () => {
    // In a real app, you'd clear tokens here
    // We keep hasAccount true so the user can log back in
    router.push('/');
  };

  const value = useMemo(() => ({ role, setRole, logout, hasAccount, createAccount }), [role, hasAccount]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
