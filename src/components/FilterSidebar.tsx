import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, RotateCcw } from "lucide-react";

interface Props {
  regions: string[];
  categories: string[];
  selectedRegions: string[];
  selectedCategories: string[];
  onRegionToggle: (r: string) => void;
  onCategoryToggle: (c: string) => void;
  onReset: () => void;
}

export default function FilterSidebar({ regions, categories, selectedRegions, selectedCategories, onRegionToggle, onCategoryToggle, onReset }: Props) {
  return (
    <Card className="border-border/60 h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-display flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" /> Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Region</p>
          <div className="space-y-2">
            {regions.map((r) => (
              <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={selectedRegions.includes(r)} onCheckedChange={() => onRegionToggle(r)} />
                {r}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Category</p>
          <div className="space-y-2">
            {categories.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={selectedCategories.includes(c)} onCheckedChange={() => onCategoryToggle(c)} />
                {c}
              </label>
            ))}
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={onReset}>
          <RotateCcw className="h-3 w-3 mr-1.5" /> Reset
        </Button>
      </CardContent>
    </Card>
  );
}
