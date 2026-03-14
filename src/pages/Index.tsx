import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";
import { salesData, allRegions, allCategories, getKPIs, getRevenueByMonth, getTopProducts, getCategoryBreakdown, getRegionalSales } from "@/data/salesData";
import KpiCards from "@/components/KpiCards";
import RevenueLineChart from "@/components/RevenueLineChart";
import TopProductsChart from "@/components/TopProductsChart";
import RegionalSalesChart from "@/components/RegionalSalesChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import FilterSidebar from "@/components/FilterSidebar";
import InsightsReport from "@/components/InsightsReport";

export default function Index() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(allRegions);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(allCategories);

  const filteredData = useMemo(
    () => salesData.filter((r) => selectedRegions.includes(r.region) && selectedCategories.includes(r.category)),
    [selectedRegions, selectedCategories]
  );

  const kpis = useMemo(() => getKPIs(filteredData), [filteredData]);
  const revenueByMonth = useMemo(() => getRevenueByMonth(filteredData), [filteredData]);
  const topProducts = useMemo(() => getTopProducts(filteredData), [filteredData]);
  const categoryData = useMemo(() => getCategoryBreakdown(filteredData), [filteredData]);
  const regionalData = useMemo(() => getRegionalSales(filteredData), [filteredData]);

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  const toggleCategory = (c: string) =>
    setSelectedCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const reset = () => { setSelectedRegions(allRegions); setSelectedCategories(allCategories); };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">Business Sales Performance Analytics</h1>
            <p className="text-xs text-muted-foreground">Internship Project — 2024 Sales Data Dashboard</p>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-56 shrink-0 p-4 border-r border-border/60">
          <FilterSidebar
            regions={allRegions}
            categories={allCategories}
            selectedRegions={selectedRegions}
            selectedCategories={selectedCategories}
            onRegionToggle={toggleRegion}
            onCategoryToggle={toggleCategory}
            onReset={reset}
          />
        </aside>

        <main className="flex-1 p-4 md:p-6 space-y-6 max-w-[1200px]">
          <KpiCards {...kpis} />

          <Tabs defaultValue="dashboard">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="insights">Insights & Report</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4 mt-4">
              <RevenueLineChart data={revenueByMonth} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TopProductsChart data={topProducts} />
                <RegionalSalesChart data={regionalData} />
              </div>
              <CategoryPieChart data={categoryData} />
            </TabsContent>

            <TabsContent value="insights" className="mt-4">
              <InsightsReport data={filteredData} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
