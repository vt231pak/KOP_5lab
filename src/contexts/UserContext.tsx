import React from 'react';

export interface UserContextValue {
  userId: string | null;
}

export const UserContext = React.createContext<UserContextValue>({ userId: null });

export const UserProvider: React.FC<{ userId: string | null; children: React.ReactNode }> = ({ userId, children }) => {
  return <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>;
};

export default UserContext;
