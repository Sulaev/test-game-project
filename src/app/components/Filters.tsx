import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
      <Select
        onValueChange={(value) =>
          onPlatformChange(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Все платформы" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все платформы</SelectItem>
          {platforms.map((platform) => (
            <SelectItem key={platform} value={platform}>
              {platform}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Сначала лучшие</SelectItem>
          <SelectItem value="asc">Сначала худшие</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
