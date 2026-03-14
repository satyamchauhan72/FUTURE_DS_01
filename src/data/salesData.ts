// Step 1: Generate a realistic sample sales dataset

const products = [
  { name: "Wireless Headphones", category: "Electronics" },
  { name: "Bluetooth Speaker", category: "Electronics" },
  { name: "USB-C Hub", category: "Electronics" },
  { name: "Laptop Stand", category: "Accessories" },
  { name: "Ergonomic Mouse", category: "Accessories" },
  { name: "Mechanical Keyboard", category: "Accessories" },
  { name: "Desk Lamp", category: "Office Supplies" },
  { name: "Notebook Set", category: "Office Supplies" },
  { name: "Webcam HD", category: "Electronics" },
  { name: "Monitor Arm", category: "Furniture" },
  { name: "Standing Desk Mat", category: "Furniture" },
  { name: "Cable Organizer", category: "Office Supplies" },
];

const regions = ["North", "South", "East", "West"];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export interface SalesRecord {
  orderId: string;
  date: string;
  month: string;
  productName: string;
  category: string;
  region: string;
  quantity: number;
  price: number;
  revenue: number;
}

function generateData(): SalesRecord[] {
  const data: SalesRecord[] = [];
  let seed = 42;

  for (let i = 1; i <= 500; i++) {
    const product = products[Math.floor(seededRandom(seed++) * products.length)];
    const region = regions[Math.floor(seededRandom(seed++) * regions.length)];
    const month = Math.floor(seededRandom(seed++) * 12);
    const day = Math.floor(seededRandom(seed++) * 28) + 1;
    const quantity = Math.floor(seededRandom(seed++) * 10) + 1;
    const price = Math.floor(seededRandom(seed++) * 150) + 20;
    const date = new Date(2024, month, day);

    data.push({
      orderId: `ORD-${String(i).padStart(4, "0")}`,
      date: date.toISOString().split("T")[0],
      month: date.toLocaleString("default", { month: "short", year: "numeric" }),
      productName: product.name,
      category: product.category,
      region,
      quantity,
      price,
      revenue: quantity * price,
    });
  }

  return data;
}

export const salesData = generateData();

// Step 2 & 3: Data analysis helpers

export function getKPIs(data: SalesRecord[]) {
  const totalRevenue = data.reduce((s, r) => s + r.revenue, 0);
  const totalOrders = data.length;
  const totalQuantity = data.reduce((s, r) => s + r.quantity, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  return { totalRevenue, totalOrders, totalQuantity, avgOrderValue };
}

export function getRevenueByMonth(data: SalesRecord[]) {
  const map = new Map<string, number>();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  months.forEach((m) => map.set(`${m} 2024`, 0));
  data.forEach((r) => map.set(r.month, (map.get(r.month) || 0) + r.revenue));
  return Array.from(map.entries()).map(([month, revenue]) => ({ month, revenue }));
}

export function getTopProducts(data: SalesRecord[], limit = 8) {
  const map = new Map<string, number>();
  data.forEach((r) => map.set(r.productName, (map.get(r.productName) || 0) + r.revenue));
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([product, revenue]) => ({ product, revenue }));
}

export function getCategoryBreakdown(data: SalesRecord[]) {
  const map = new Map<string, number>();
  data.forEach((r) => map.set(r.category, (map.get(r.category) || 0) + r.revenue));
  return Array.from(map.entries()).map(([category, revenue]) => ({ category, revenue }));
}

export function getRegionalSales(data: SalesRecord[]) {
  const map = new Map<string, number>();
  data.forEach((r) => map.set(r.region, (map.get(r.region) || 0) + r.revenue));
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([region, revenue]) => ({ region, revenue }));
}

export const allCategories = [...new Set(products.map((p) => p.category))];
export const allRegions = regions;
