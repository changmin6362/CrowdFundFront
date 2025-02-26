interface DropdownProps {
  items: string[];
  isOpen: boolean;
  onSelect: (item: string) => void;
  selectedIndex: number;
  dropdownRef?: React.RefObject<HTMLUListElement>;
}

export default function Dropdown({
  items,
  isOpen,
  onSelect,
  selectedIndex,
  dropdownRef,
}: DropdownProps) {
  if (!isOpen || items.length === 0) return null;

  return (
    <ul
      ref={dropdownRef}
      role="listbox"
      className="absolute z-10 mt-1 max-h-60 w-full overflow-hidden rounded-md border bg-white shadow-lg"
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`cursor-pointer px-4 py-2 ${
            index === selectedIndex ? "bg-gray-100" : "hover:bg-gray-100"
          }`}
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
