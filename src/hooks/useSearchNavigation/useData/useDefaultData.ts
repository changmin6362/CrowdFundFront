import useGetDefaultItems from "@/api/useGetDefaultItems";

export default function useDefaultData() {
  const { defaultItems, hasNextItems, fetchNextDefaultItems } =
    useGetDefaultItems();

  return {
    defaultData: {
      items: defaultItems,
      hasNext: hasNextItems,
    },
    defaultActions: {
      fetchNext: fetchNextDefaultItems,
    },
  };
}
