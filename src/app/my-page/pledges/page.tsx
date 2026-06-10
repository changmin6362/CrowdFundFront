'use client';

import { useMyPledgeFetch } from '@api/pledge/my/fetch/useMyPledgeFetch';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function MyPledgesPage() {
  const { response, isLoading } = useMyPledgeFetch();
  const pledges = response?.data?.pledges || [];

  if (isLoading && !response) return <div className="p-8 text-center">후원 목록을 불러오는 중...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">내 후원 내역</h1>
        <Link href={ROUTES.MY_PAGE} className="text-blue-600 hover:underline">
          마이페이지로 돌아가기
        </Link>
      </div>

      {pledges.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-gray-50 text-gray-500">
          참여한 후원 내역이 없습니다.
        </div>
      ) : (
        <div className="grid gap-4">
          {pledges.map((pledge) => (
            <div key={pledge.pledgeId} className="p-6 border rounded-lg shadow-sm bg-white hover:border-blue-500 transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{pledge.projectTitle}</h2>
                  <p className="text-gray-600 text-sm">선택한 리워드: {pledge.rewardTitle}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    pledge.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                    pledge.status === 'REFUNDED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {pledge.status}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">{pledge.amount?.toLocaleString()}원</p>
                  <p className="text-xs text-gray-400">후원일: {pledge.pledgedAt ? new Date(pledge.pledgedAt).toLocaleDateString() : '-'}</p>
                </div>
                <Link 
                  href={ROUTES.MY_PAGE_PLEDGE_DETAIL(pledge.pledgeId || 0)}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black transition text-sm"
                >
                  상세 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
