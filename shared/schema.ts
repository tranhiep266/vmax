import { pgTable, text, varchar, decimal, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(), // 'smartphones' | 'accessories' | 'repairs'
  brand: text("brand").notNull(),
  image: text("image").notNull(),
  storage: text("storage"), // For phones
  color: text("color"),
  inStock: boolean("in_stock").notNull().default(true),
  stockLevel: text("stock_level").notNull().default("in_stock"), // 'in_stock' | 'low_stock' | 'out_of_stock'
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull().default("0"),
  reviewCount: integer("review_count").notNull().default(0),
  features: text("features").array(), // Array of feature strings
  specifications: text("specifications"), // JSON string for detailed specs
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey(),
  productId: varchar("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  sessionId: text("session_id").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface CartSummary {
  items: CartItemWithProduct[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}
