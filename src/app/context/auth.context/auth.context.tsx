"use client";
import { User } from "@supabase/supabase-js";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  isInitialized: boolean;
  me: User | null;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  signUp: (email: string, password: string) => void;
};
const initialValue: AuthContextValue = {
  isLoggedIn: false,
  isInitialized: false,
  me: null,
  logIn: () => {},
  logOut: () => {},
  signUp: () => {},
};
const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isInitialized, setIsInitialized] =
    useState<AuthContextValue["isInitialized"]>(false);
  const [me, setMe] = useState<AuthContextValue["me"]>(null);
  const isLoggedIn = !!me;

  const logIn: AuthContextValue["logIn"] = async (email, password) => {
    console.log(email, password);
    // if (me) return alert("이미 로그인되어 있습니다.");
    if (!email || !password)
      return alert("이메일, 비밀번호를 모두 입력해주세요");

    // TODO 나중에 주소 변경해야함
    const response = await fetch("http://localhost:3000/api/auth/log-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const user = await response.json();
    setMe(user);
  };

  const logOut: AuthContextValue["logOut"] = async () => {
    if (!me) return alert("로그인하고 눌러주세요");

    await fetch("http://localhost:3000/api/auth/log-out", {
      method: "DELETE",
    });
    setMe(null);
  };

  const signUp: AuthContextValue["signUp"] = async (email, password) => {
    if (!email || !password)
      return alert("이메일, 비밀번호를 모두 입력해주세요");

    // TODO 나중에 주소 변경해야함
    const response = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const user = await response.json();
    setMe(user);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me").then(async (response) => {
      if (response.status === 200) {
        const {
          data: { user },
        } = await response.json();
        setMe(user);
      }
      setIsInitialized(true);
    });
  }, []);

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn,
    me,
    logIn,
    logOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
