import { allProducts } from "./all-products-data"

export const uppersData = allProducts.filter((product) => product.type === "upper")
export const solesData = allProducts.filter((product) => product.type === "lower")

// Keep the existing color arrays as they are
export const shoeColors = [
  { name: "Green", value: "#16a34a" },
  { name: "Red", value: "#dc2626" },
  { name: "Beige", value: "#d2b48c" },
  { name: "Blue", value: "#2563eb" },
  { name: "Pink", value: "#ec4899" },
  { name: "White", value: "#ffffff" },
]

export const soleColors = [
  { name: "White", value: "#ffffff" },
  { name: "Brown", value: "#92400e" },
  { name: "Blue", value: "#2563eb" },
  { name: "Black", value: "#000000" },
  { name: "Yellow", value: "#eab308" },
]
