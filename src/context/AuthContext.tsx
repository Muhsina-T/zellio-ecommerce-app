import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types/User";

import {
  getCurrentUser,
  logout as logoutUser,
} from "../services/auth";


type AuthContextType = {
  user: User | null;
  logout: () => void;
  setUser: (user: User) => void;
};


export const AuthContext =
  createContext<AuthContextType | undefined>(undefined);



type Props = {
  children: ReactNode;
};



export default function AuthProvider({
  children,
}: Props) {


  const [user, setUser] = useState<User | null>(null);



  // Load user after refresh

  useEffect(() => {

    const currentUser = getCurrentUser();

    setUser(currentUser);

  }, []);



  function logout(){

    logoutUser();

    setUser(null);

  }



  return (

    <AuthContext.Provider
      value={{
        user,
        logout,
        setUser,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}