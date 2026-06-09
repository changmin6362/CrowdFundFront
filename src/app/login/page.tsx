"use client";

import { useLogin } from "@api/auth/login/useLogin";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const { request, setRequest, onSubmit, isLoading, error, response } = useLogin();
  
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Login Test</h1>
        <Link href={ROUTES.AUTH_TEST.SIGNUP} className="text-blue-600 hover:underline">
          Go to SignUp Test
        </Link>
      </div>

      {isLoading && (
        <div className="p-4 bg-blue-100 text-blue-700 rounded">Loading...</div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>
      )}

      <section className="p-6 border rounded-lg shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={request.email}
              onChange={(e) => setRequest({ ...request, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={request.password}
              onChange={(e) => setRequest({ ...request, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Login
          </button>
        </form>
      </section>

      {response && (
        <section className="p-6 bg-gray-50 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">API Result</h2>
          <pre className="bg-white p-4 border rounded overflow-auto max-h-96 text-sm">
            {JSON.stringify(response, null, 2)}
          </pre>
        </section>
      )}

      <div className="text-sm text-gray-500">
        <p>* 로그인 성공 시 `accessToken`은 localStorage에 자동으로 저장됩니다.</p>
        <p>* `useApiHandler`를 통해 로딩 상태와 에러 메시지가 관리됩니다.</p>
      </div>
    </div>
  );
}
