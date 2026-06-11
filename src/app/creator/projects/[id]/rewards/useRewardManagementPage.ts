'use client';

import { useRouter } from 'next/navigation';
import { useRewardFetch } from '@api/reward/user/fetch/useRewardFetch';
import { useRewardCreate } from '@api/reward/creator/create/useRewardCreate';
import { useRewardUpdate } from '@api/reward/creator/update/useRewardUpdate';
import { useRewardUpdateStock } from '@api/reward/creator/update-stock/useRewardUpdateStock';
import { useRewardDelete } from '@api/reward/creator/delete/useRewardDelete';

export const useRewardManagementPage = (projectId: number) => {
  const router = useRouter();

  const { response: fetchResponse, isLoading: isFetchLoading, handleRefresh } = useRewardFetch(projectId);
  const rewards = fetchResponse?.data?.rewards || [];

  const { 
    request: createRequest, 
    isAdding,
    setIsAdding,
    handleInputChange: handleCreateInputChange,
    onFormSubmit: onCreateSubmit, 
    isLoading: isCreateLoading 
  } = useRewardCreate();

  const {
    request: updateRequest,
    editingRewardId,
    setEditingRewardId,
    startEdit,
    handleInputChange: handleUpdateInputChange,
    onFormSubmit: onUpdateSubmit,
    isLoading: isUpdateLoading
  } = useRewardUpdate();

  const {
    request: stockRequest,
    setRequest: setStockRequest,
    stockEditingId,
    setStockEditingId,
    startStockEdit,
    onFormSubmit: onStockSubmit,
    isLoading: isStockLoading
  } = useRewardUpdateStock();

  const { deleteReward, isLoading: isDeleteLoading } = useRewardDelete();

  return {
    rewards,
    isFetchLoading,
    handleRefresh,
    createRequest,
    isAdding,
    setIsAdding,
    handleCreateInputChange,
    onCreateSubmit,
    isCreateLoading,
    updateRequest,
    editingRewardId,
    setEditingRewardId,
    startEdit,
    handleUpdateInputChange,
    onUpdateSubmit,
    isUpdateLoading,
    stockRequest,
    setStockRequest,
    stockEditingId,
    setStockEditingId,
    startStockEdit,
    onStockSubmit,
    isStockLoading,
    deleteReward,
    isDeleteLoading,
    router
  };
};
