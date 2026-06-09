"use client";

import { useState } from "react";
import { useAuth } from "@api/auth/useAuth";
import { SignUpRequest } from "@api/auth/types";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function SignUpPage() {
  const { signUp, isLoading, error } = useAuth();
  
  const [signUpData, setSignUpData] = useState<SignUpRequest>({
    email: "",
    password: "",
    nickname: "",
    name: "",
    phone: "",
  });

  const [result, setResult] = useState<any>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signUp(signUpData);
      setResult({ type: "SIGNUP SUCCESS", data: res });
    } catch (err: any) {
      setResult({ type: "SIGNUP ERROR", message: err.message });
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">SignUp Test</h1>
        <Link href={ROUTES.AUTH_TEST.LOGIN} className="text-blue-600 hover:underline">
          Go to Login Test
        </Link>
      </div>

      {isLoading && (
        <div className="p-4 bg-blue-100 text-blue-700 rounded">Loading...</div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>
      )}

      <section className="p-6 border rounded-lg shadow-sm">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={signUpData.email}
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={signUpData.password}
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nickname</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={signUpData.nickname}
              onChange={(e) => setSignUpData({ ...signUpData, nickname: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={signUpData.name}
              onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              placeholder="010-0000-0000"
              className="w-full p-2 border rounded"
              value={signUpData.phone}
              onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            Sign Up
          </button>
        </form>
      </section>

      {result && (
        <section className="p-6 bg-gray-50 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">API Result</h2>
          <pre className="bg-white p-4 border rounded overflow-auto max-h-96 text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}

      <div className="text-sm text-gray-500">
        <p>* `useApiHandler`를 통해 로딩 상태와 에러 메시지가 관리됩니다.</p>
      </div>
    </div>
  );
}
