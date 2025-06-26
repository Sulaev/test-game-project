type Props = {
  platforms: string[];
  onPlatformChange: (platform: string) => void;
  onSortChange: (order: "asc" | "desc") => void;
};

export default function Filters({
  platforms,
  onPlatformChange,
  onSortChange,
}: Props) {
  return (
    <div className="flex justify-between items-center gap-4 py-4">
      <select
        onChange={(e) => onPlatformChange(e.target.value)}
        className="p-2 rounded"
      >
        <option value="">Все платформы</option>
        {platforms.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
        className="p-2 rounded"
      >
        <option value="desc">Сначала лучшие</option>
        <option value="asc">Сначала худшие</option>
      </select>
    </div>
  );
}
