import useGetDefaultItems from "@/api/pokemon/useGetDefaultItems";

export default function useDefaultData() {
  const { defaultItems, hasNextItems, appendNextDefaultItems } =
    useGetDefaultItems();

  return {
    defaultData: {
      items: defaultItems,
      hasNext: hasNextItems,
    },
    defaultActions: {
      appendNext: appendNextDefaultItems,
    },
  };
}
