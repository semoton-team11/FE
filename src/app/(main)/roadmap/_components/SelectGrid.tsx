"use client";

type SelectGridProps<T extends { id: string; name: string }> = {
  items: T[];
  selected: string | null;
  onSelect: (id: string) => void;
};

export default function SelectGrid<T extends { id: string; name: string }>({
  items,
  selected,
  onSelect,
}: SelectGridProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            selected === item.id
              ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
              : "border-border text-foreground hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
