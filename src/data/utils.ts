
// Function to generate RRN (Reference Retrieval Number)
export const generateRRN = (): string => {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
};

// Function to generate masked card number
export const generateMaskedCard = (): string => {
  const prefix = Math.random() > 0.5 ? "4" : "5"; // Visa or Mastercard
  const visibleStart = prefix + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${visibleStart} **** **** ${Math.floor(1000 + Math.random() * 9000)}`;
};

// Generate random transaction count between 50 and 300
export const getRandomTransactionCount = (): number => {
  return Math.floor(Math.random() * (300 - 50 + 1)) + 50;
};
