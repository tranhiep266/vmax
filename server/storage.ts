import { type Product, type InsertProduct, type CartItem, type InsertCartItem, type CartItemWithProduct, type CartSummary } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  getCartSummary(sessionId: string): Promise<CartSummary>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product> = new Map();
  private cartItems: Map<string, CartItem> = new Map();

  constructor() {
    this.seedProducts();
  }

  private seedProducts() {
    const products: Product[] = [
      {
        id: "iphone-14-pro-max",
        name: "iPhone 14 Pro Max",
        description: "128GB, Space Black - Latest iOS device with advanced camera system",
        price: "1099.00",
        originalPrice: "1199.00",
        category: "smartphones",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        storage: "128GB",
        color: "Space Black",
        inStock: true,
        stockLevel: "in_stock",
        rating: "4.8",
        reviewCount: 128,
        features: ["A16 Bionic chip", "Pro camera system", "Always-On display", "Dynamic Island"],
        specifications: JSON.stringify({
          display: "6.7-inch Super Retina XDR",
          camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
          battery: "Up to 29 hours video playback",
          storage: "128GB"
        })
      },
      {
        id: "samsung-galaxy-s23-ultra",
        name: "Samsung Galaxy S23 Ultra",
        description: "256GB, Phantom Black - Premium Android device with S Pen",
        price: "999.00",
        originalPrice: null,
        category: "smartphones",
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        storage: "256GB",
        color: "Phantom Black",
        inStock: true,
        stockLevel: "in_stock",
        rating: "4.6",
        reviewCount: 89,
        features: ["Snapdragon 8 Gen 2", "200MP camera", "S Pen included", "120Hz display"],
        specifications: JSON.stringify({
          display: "6.8-inch Dynamic AMOLED 2X",
          camera: "200MP Main + 12MP Ultra Wide + 10MP Telephoto",
          battery: "5000mAh",
          storage: "256GB"
        })
      },
      {
        id: "google-pixel-7-pro",
        name: "Google Pixel 7 Pro",
        description: "128GB, Obsidian - Pure Android experience with AI photography",
        price: "699.00",
        originalPrice: null,
        category: "smartphones",
        brand: "Google",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        storage: "128GB",
        color: "Obsidian",
        inStock: true,
        stockLevel: "low_stock",
        rating: "4.5",
        reviewCount: 156,
        features: ["Google Tensor G2", "Magic Eraser", "Live Translate", "Pure Android"],
        specifications: JSON.stringify({
          display: "6.7-inch LTPO OLED",
          camera: "50MP Main + 12MP Ultra Wide + 48MP Telephoto",
          battery: "5000mAh",
          storage: "128GB"
        })
      },
      {
        id: "wireless-charging-pad",
        name: "Wireless Charging Pad",
        description: "Fast charging, Qi-compatible - Universal wireless charging solution",
        price: "49.00",
        originalPrice: "69.00",
        category: "accessories",
        brand: "TechHub",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        storage: null,
        color: "Black",
        inStock: true,
        stockLevel: "in_stock",
        rating: "4.9",
        reviewCount: 203,
        features: ["15W fast charging", "Qi-compatible", "LED indicator", "Non-slip surface"],
        specifications: JSON.stringify({
          power: "15W max",
          compatibility: "Qi-enabled devices",
          dimensions: "100mm x 100mm x 8mm",
          cable: "USB-C included"
        })
      },
      {
        id: "premium-phone-case",
        name: "Premium Phone Case",
        description: "Leather, Multiple Colors - Luxury protection for your device",
        price: "29.00",
        originalPrice: "39.00",
        category: "accessories",
        brand: "TechHub",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        storage: null,
        color: "Multiple",
        inStock: true,
        stockLevel: "in_stock",
        rating: "4.9",
        reviewCount: 342,
        features: ["Genuine leather", "Drop protection", "Precise cutouts", "Multiple colors"],
        specifications: JSON.stringify({
          material: "Genuine leather",
          protection: "Military-grade drop protection",
          compatibility: "Multiple models available",
          colors: "Black, Brown, Navy, Red"
        })
      },
      {
        id: "wireless-earbuds-pro",
        name: "Wireless Earbuds Pro",
        description: "Noise Cancelling, 30hrs Battery - Premium audio experience",
        price: "179.00",
        originalPrice: "219.00",
        category: "accessories",
        brand: "TechHub",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        storage: null,
        color: "White",
        inStock: true,
        stockLevel: "in_stock",
        rating: "4.4",
        reviewCount: 267,
        features: ["Active noise cancelling", "30-hour battery", "Wireless charging case", "IPX5 waterproof"],
        specifications: JSON.stringify({
          battery: "30 hours total (6h + 24h case)",
          driver: "10mm dynamic drivers",
          connectivity: "Bluetooth 5.2",
          features: "ANC, Transparency mode, Touch controls"
        })
      }
    ];

    products.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      originalPrice: insertProduct.originalPrice || null,
      storage: insertProduct.storage || null,
      color: insertProduct.color || null,
      specifications: insertProduct.specifications || null,
      features: insertProduct.features || [],
      inStock: insertProduct.inStock ?? true,
      stockLevel: insertProduct.stockLevel ?? "in_stock",
      rating: insertProduct.rating ?? "0",
      reviewCount: insertProduct.reviewCount ?? 0
    };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    const itemsWithProducts: CartItemWithProduct[] = [];
    
    for (const item of items) {
      const product = this.products.get(item.productId);
      if (product) {
        itemsWithProducts.push({ ...item, product });
      }
    }
    
    return itemsWithProducts;
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.productId === insertCartItem.productId && item.sessionId === insertCartItem.sessionId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += (insertCartItem.quantity ?? 1);
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Create new cart item
      const id = randomUUID();
      const cartItem: CartItem = { 
        ...insertCartItem, 
        id,
        quantity: insertCartItem.quantity ?? 1
      };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
    }
    return item;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    items.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  async getCartSummary(sessionId: string): Promise<CartSummary> {
    const items = await this.getCartItems(sessionId);
    const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      itemCount
    };
  }
}

export const storage = new MemStorage();
