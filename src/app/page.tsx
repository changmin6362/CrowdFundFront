"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function Home() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8 text-center">
      <h1 className="text-3xl font-bold">useAuth Test Menu</h1>
      <div className="flex flex-col space-y-4">
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="p-4 border rounded-lg hover:bg-gray-50 text-xl font-medium"
        >
          Login Test Page
        </Link>
        <Link
          href={ROUTES.AUTH.SIGNUP}
          className="p-4 border rounded-lg hover:bg-gray-50 text-xl font-medium"
        >
          SignUp Test Page
        </Link>
        <Link
          href={ROUTES.MY_PAGE}
          className="p-4 border rounded-lg hover:bg-gray-50 text-xl font-medium"
        >
          MyPage Test Page
        </Link>
        <Link
          href={ROUTES.MY_PAGE_ADDRESS}
          className="p-4 border rounded-lg hover:bg-gray-50 text-xl font-medium"
        >
          Address Management Test Page
        </Link>
        <Link
          href={ROUTES.ADMIN.CATEGORY}
          className="p-4 border rounded-lg hover:bg-gray-50 text-xl font-medium"
        >
          Admin Category Test Page
        </Link>
        <Link
          href={ROUTES.ADMIN.PLEDGES}
          className="p-4 border rounded-lg hover:bg-gray-50 text-xl font-medium"
        >
          Admin Pledge Management Test Page
        </Link>
        <Link
          href={ROUTES.PROJECT.LIST}
          className="p-4 border rounded-lg hover:bg-gray-50 text-xl font-medium"
        >
          Project List Test Page
        </Link>
        <Link
          href={ROUTES.CREATOR.MY_PROJECTS}
          className="p-4 border rounded-lg hover:bg-gray-50 text-xl font-medium"
        >
          My Projects Test Page
        </Link>
      </div>
    </div>
  );
}
