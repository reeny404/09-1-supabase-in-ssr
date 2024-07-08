"use client";

import { useState } from "react";
import { useAuth } from "../../context/auth.context/auth.context";

export default function Home() {
  const { me, logIn, logOut, signUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClickLogIn = async () => logIn(email, password);
  const handleClickLogOut = async () => logOut();
  const handleClickSignUp = async () => signUp(email, password);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <h1>현재 로그인한 유저는</h1>
      {me ? me.email + "입니다" : "없습니다"}

      <hr className="w-full my-10 border-black" />

      <input
        type="text"
        className="input"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleClickLogIn}>
        로그인하기
      </button>
      <hr className="w-full my-10 border-black" />

      <button className="button" onClick={handleClickLogOut}>
        로그아웃하기
      </button>
      <hr className="w-full my-10 border-black" />

      <input
        type="text"
        className="input"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleClickSignUp}>
        회원가입하기
      </button>
    </main>
  );
}
