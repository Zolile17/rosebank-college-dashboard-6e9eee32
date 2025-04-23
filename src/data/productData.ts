export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sales: number;
  image: string;
  status: "active" | "out_of_stock" | "discontinued";
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
  totalSales: number;
  image: string;
}

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Handbags",
    productCount: 24,
    totalSales: 125000,
    image: "/images/categories/handbags.jpg"
  },
  {
    id: "cat2",
    name: "Wallets",
    productCount: 18,
    totalSales: 45000,
    image: "/images/categories/wallets.jpg"
  },
  {
    id: "cat3",
    name: "Accessories",
    productCount: 32,
    totalSales: 75000,
    image: "/images/categories/accessories.jpg"
  },
  {
    id: "cat4",
    name: "Jewelry",
    productCount: 15,
    totalSales: 95000,
    image: "/images/categories/jewelry.jpg"
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Alma BB Handbag",
    description: "Classic handbag in Epi leather with gold-tone hardware",
    price: 1590,
    category: "Handbags",
    stock: 12,
    sales: 45,
    image: "/images/products/alma-bb.jpg",
    status: "active",
    lastUpdated: "2025-03-15"
  },
  {
    id: "p2",
    name: "Pochette Accessoires",
    description: "Compact handbag in Monogram canvas with leather trim",
    price: 750,
    category: "Handbags",
    stock: 0,
    sales: 28,
    image: "/images/products/pochette.jpg",
    status: "out_of_stock",
    lastUpdated: "2025-03-14"
  },
  {
    id: "p3",
    name: "Zippy Wallet",
    description: "Compact wallet in Monogram canvas with multiple card slots",
    price: 450,
    category: "Wallets",
    stock: 8,
    sales: 32,
    image: "/images/products/zippy-wallet.jpg",
    status: "active",
    lastUpdated: "2025-03-13"
  },
  {
    id: "p4",
    name: "Monogram Belt",
    description: "Classic belt in Monogram canvas with gold-tone buckle",
    price: 525,
    category: "Accessories",
    stock: 15,
    sales: 19,
    image: "/images/products/monogram-belt.jpg",
    status: "active",
    lastUpdated: "2025-03-12"
  },
  {
    id: "p5",
    name: "Dauphine Wallet",
    description: "Elegant wallet in Monogram canvas with gold-tone hardware",
    price: 750,
    category: "Wallets",
    stock: 5,
    sales: 24,
    image: "/images/products/dauphine-wallet.jpg",
    status: "active",
    lastUpdated: "2025-03-11"
  }
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getProductMetrics() {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const outOfStock = products.filter(product => product.stock === 0).length;
  const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / totalProducts;

  return {
    totalProducts,
    totalStock,
    totalSales,
    outOfStock,
    averagePrice
  };
} 