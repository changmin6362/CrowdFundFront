'use client';

import { useAdminPledgeFetch } from '@api/pledge/admin/fetch/useAdminPledgeFetch';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useMemo } from 'react';

export default function AdminPledgesPage() {
  const fetchProps = useMemo(() => ({ limit: 20 }), []);
  const { response, pledges, isLoading, onLoadMore } = useAdminPledgeFetch(fetchProps);
  const hasNext = response?.data?.hasNext || false;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">시스템 전체 후원 관리</h1>
        <Link href={ROUTES.HOME} className="text-sm text-gray-500 hover:text-gray-700 transition">
          메인으로 돌아가기
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">후원자</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">일시</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading && pledges.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">데이터를 불러오는 중...</td>
                </tr>
              ) : pledges.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">후원 내역이 없습니다.</td>
                </tr>
              ) : (
                pledges.map((pledge) => (
                  <tr key={pledge.pledgeId} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{pledge.pledgeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{pledge.projectTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pledge.userName || `User #${pledge.userId}`}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-blue-600">{pledge.amount?.toLocaleString()}원</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        pledge.status === 'PAID' ? 'bg-green-100 text-green-800' :
                        pledge.status === 'REFUNDED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pledge.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pledge.createdAt ? new Date(pledge.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={ROUTES.ADMIN.PLEDGE_DETAIL(pledge.pledgeId || 0)} 
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        상세보기
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {hasNext && (
        <div className="mt-6 text-center">
          <button 
            onClick={() => onLoadMore()}
            disabled={isLoading}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            {isLoading ? '로딩 중...' : '더 보기'}
          </button>
        </div>
      )}
    </div>
  );
}
