
export interface Customer {
  id: string;
  name: string;
  surname: string;
  idNumber: string;
  address: string;
  gender: string;
  contactNumber: string;
  image?: string; // Made optional since some records don't have it
  lastUpdated: string;
}

export interface Employee {
  id: string;
  name: string;
  surname: string;
  idNumber: string; // Changed to string to match the data
  address: string;
  gender: string;
  contactNumber: string;
  image?: string; // Made optional
  status?: "active" | "discontinued"; // Made optional
  lastUpdated: string;
}

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

export const customers: Customer[] = [
  {
    id: "1",
    name: "Sabelo",
    surname: "Miya",
    idNumber: "0211115868089",
    address: "84 Bekker Road, Midrand 4000",
    gender: "Male",
    contactNumber: "0782229877",
    lastUpdated: "18-14-2025",
  },
  {
    id: "2",
    name: "Thulani",
    surname: "Bango",
    idNumber: "9210115868082",
    address: "Durban",
    gender: "Male",
    contactNumber: "0735692597",
    lastUpdated: "18-14-2025",
  },
  {
    id: "3",
    name: "Banele",
    surname: "Mgwevu",
    idNumber: "9906055868082",
    address: "Cape Town",
    gender: "Male",
    contactNumber: "07334562597",
    lastUpdated: "18-14-2025",
    image: "/images/user-profile.png",
  },
  {
    id: "4",
    name: "Zolile",
    surname: "Nyambi",
    idNumber: "9406055868087",
    address: "Johannesburg",
    gender: "Female",
    contactNumber: "07334562222",
    lastUpdated: "18-14-2025",
    image: "/images/user-profile.png",
  },
];

export const employees: Employee[] = [
  {
    id: "1",
    name: "Zolile",
    surname: "Nyambi",
    idNumber: "9406055868087",
    address: "Johannesburg",
    gender: "Female",
    contactNumber: "07334562222",
    lastUpdated: "18-14-2025",
    image: "/images/user-profile.png",
    status: "active",
  },
  {
    id: "2",
    name: "Banele",
    surname: "Mgwevu",
    idNumber: "9906055868082",
    address: "Cape Town",
    gender: "Male",
    contactNumber: "07334562597",
    lastUpdated: "18-14-2025",
    image: "/images/user-profile.png",
    status: "active",
  },
  {
    id: "3",
    name: "Hlengiwe",
    surname: "Mgwevu",
    idNumber: "9906055868082",
    address: "Mpumalanga",
    gender: "Female", // Corrected gender
    contactNumber: "07334562597",
    lastUpdated: "18-14-2025",
    image: "/images/user-profile.png",
    status: "active",
  },
];

// Sample product data since it was referenced in your functions
export const products: Product[] = [
  {
    id: "p1",
    name: "Monogram Belt",
    description: "Classic belt in Monogram canvas with gold-tone buckle",
    price: 525,
    category: "Accessories",
    stock: 15,
    sales: 19,
    image: "/images/products/monogram-belt.jpg",
    status: "active",
    lastUpdated: "2025-03-12",
  },
  // Add more products as needed
];

export function getCustomersByCategory(category: string): Customer[] {
  // Changed function name to match data
  return customers.filter(
    (customer) => (customer as any).category === category
  );
}

export function getProductMetrics() {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const outOfStock = products.filter((product) => product.stock === 0).length;
  const averagePrice =
    products.reduce((sum, product) => sum + product.price, 0) / totalProducts;

  return {
    totalProducts,
    totalStock,
    totalSales,
    outOfStock,
    averagePrice,
  };
}
