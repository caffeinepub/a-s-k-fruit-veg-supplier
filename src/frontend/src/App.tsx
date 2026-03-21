import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { Leaf, Menu, Phone, Star, Truck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  emoji: string;
  price: number;
  unit: string;
}

const PRODUCTS: Product[] = [
  { id: "aloo", name: "Aloo", emoji: "🥔", price: 15, unit: "kg" },
  { id: "onion", name: "Onion", emoji: "🧅", price: 26, unit: "kg" },
  { id: "tomato", name: "Tomato", emoji: "🍅", price: 28, unit: "kg" },
  { id: "carrot", name: "Carrot", emoji: "🥕", price: 28, unit: "kg" },
  { id: "ginger", name: "Ginger", emoji: "🫚", price: 80, unit: "kg" },
  { id: "lemon", name: "Lemon", emoji: "🍋", price: 80, unit: "kg" },
];

const WA_NUMBER = "918700722663";

function buildWhatsAppUrl(quantities: Record<string, number>): string | null {
  const items = PRODUCTS.filter((p) => quantities[p.id] > 0);
  if (items.length === 0) return null;

  const lines = items.map(
    (p) =>
      `- ${p.name}: ${quantities[p.id]} ${p.unit} (₹${quantities[p.id] * p.price})`,
  );
  const total = items.reduce((sum, p) => sum + quantities[p.id] * p.price, 0);
  const message = [
    "Hello A.S.K Fruit & Vegetable Supplier! I would like to order:",
    ...lines,
    `Total: ₹${total}`,
  ].join("\n");

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function totalItems(quantities: Record<string, number>): number {
  return Object.values(quantities).filter((v) => v > 0).length;
}

function totalCost(quantities: Record<string, number>): number {
  return PRODUCTS.reduce(
    (sum, p) => sum + (quantities[p.id] || 0) * p.price,
    0,
  );
}

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])),
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adjust = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.round((prev[id] + delta) * 10) / 10),
    }));
  };

  const handleOrder = () => {
    const url = buildWhatsAppUrl(quantities);
    if (!url) {
      toast.error("Please add at least one item to your order!");
      return;
    }
    window.open(url, "_blank");
  };

  const itemCount = totalItems(quantities);
  const orderTotal = totalCost(quantities);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Our Produce", href: "#products" },
    { label: "About Us", href: "#about" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-center" />

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-wide">
                <span className="text-cta">A.S.K</span>
                <span className="text-white ml-2 text-sm font-medium hidden sm:inline">
                  Fruit & Vegetable Supplier
                </span>
              </span>
              <span className="text-white/60 text-xs hidden sm:block">
                Farm Fresh. Delivered Daily.
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.whatsapp.button"
                className="flex items-center gap-2 bg-whatsapp text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Order Now
              </a>
            </nav>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen((o) => !o)}
              data-ocid="nav.menu.toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-brand-dark border-t border-white/10 overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-3 gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/80 hover:text-white text-sm font-medium py-1 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-16"
        style={{
          backgroundImage: `url('/assets/generated/hero-produce.dim_1400x700.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-dark/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-cta/20 text-cta border border-cta/30 px-4 py-1 rounded-full text-sm font-semibold mb-6 tracking-wider uppercase">
              🌿 Farm Fresh · Delivered Daily
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight mb-4 font-body">
              <span className="text-cta">A.S.K</span> Fruit &amp; Vegetable
              <span className="block text-white">Supplier</span>
            </h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed">
              Premium quality fruits &amp; vegetables sourced fresh from the
              farm — delivered right to your doorstep in Delhi NCR.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                data-ocid="hero.shop_now.button"
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                🛒 Shop Now
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.whatsapp.button"
                className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Chat with Us
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: "🌱", label: "100% Fresh" },
                { icon: "⚡", label: "Same Day Delivery" },
                { icon: "✅", label: "Quality Assured" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-white/90"
                >
                  <span className="text-xl">{stat.icon}</span>
                  <span className="text-sm font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-brand-mid text-sm font-bold uppercase tracking-widest">
              Fresh Today
            </span>
            <h2 className="text-4xl font-bold text-brand-dark uppercase mt-2">
              Our Bestsellers
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Hand-picked daily. Select your items and quantities below, then
              order via WhatsApp in one tap.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="products.list"
          >
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ProductCard
                  product={product}
                  quantity={quantities[product.id]}
                  onAdjust={(delta) => adjust(product.id, delta)}
                  index={i + 1}
                />
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35 }}
                className="mt-10 bg-brand-dark rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4"
                data-ocid="order.summary.panel"
              >
                <div>
                  <p className="text-sm text-white/60 uppercase tracking-wide">
                    Your Order
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {itemCount} item{itemCount !== 1 ? "s" : ""} ·{" "}
                    <span className="text-cta">₹{orderTotal}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOrder}
                  data-ocid="order.whatsapp.submit_button"
                  className="flex items-center gap-3 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  Order on WhatsApp
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-brand-mid text-sm font-bold uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-4xl font-bold text-brand-dark uppercase mt-2">
              About Us
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              A.S.K Fruit &amp; Vegetable Supplier has been providing Delhi NCR
              households and businesses with the freshest, highest-quality
              produce for years. We work directly with local farmers to bring
              you the best.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Farm Fresh",
                desc: "Every item is sourced directly from trusted local farms and arrives at your door the same day it's picked.",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Quality Assured",
                desc: "Our team hand-picks every vegetable and fruit to ensure you receive only the finest produce.",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Fast Delivery",
                desc: "Reliable doorstep delivery across Delhi NCR. Order before noon and get it the same day.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-brand-dark/10 flex items-center justify-center text-brand-mid">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="bg-brand-dark text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="text-2xl font-bold mb-2">
                <span className="text-cta">A.S.K</span> Fruit &amp; Veg
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Delhi NCR's most trusted source for fresh fruits and vegetables.
                Farm to door, every day.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4 text-white/80">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {["Home", "Our Produce", "About Us", "Contact Us"].map((l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                      data-ocid={`footer.${l.toLowerCase().replace(/ /g, "_")}.link`}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4 text-white/80">
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.whatsapp.button"
                  className="flex items-center gap-3 bg-whatsapp/20 hover:bg-whatsapp/30 px-4 py-3 rounded-xl transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
                  <div>
                    <p className="text-xs text-white/50">WhatsApp / Call</p>
                    <p className="text-white font-semibold text-sm">
                      +91 8700722663
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-3 px-4 py-3">
                  <Phone className="w-5 h-5 text-white/50" />
                  <div>
                    <p className="text-xs text-white/50">Delivery Area</p>
                    <p className="text-white font-semibold text-sm">
                      Delhi NCR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <span>
              © {new Date().getFullYear()} A.S.K Fruit &amp; Vegetable Supplier.
              All rights reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* ── STICKY WHATSAPP BUTTON ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4, type: "spring" }}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      >
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-brand-dark text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg"
            >
              ₹{orderTotal} · {itemCount} item{itemCount !== 1 ? "s" : ""}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={handleOrder}
          data-ocid="sticky.whatsapp.button"
          className="relative flex items-center gap-3 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold pl-5 pr-6 py-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm"
        >
          <WhatsAppIcon className="w-6 h-6" />
          <span className="hidden sm:inline">ORDER ON WHATSAPP</span>
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-cta text-white border-0 p-0 text-xs">
              {itemCount}
            </Badge>
          )}
        </button>
      </motion.div>
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  quantity,
  onAdjust,
  index,
}: {
  product: Product;
  quantity: number;
  onAdjust: (delta: number) => void;
  index: number;
}) {
  const subtotal = quantity * product.price;

  return (
    <div
      className={`bg-white rounded-2xl shadow-card border border-border p-6 flex flex-col items-center text-center gap-4 transition-all hover:shadow-lg hover:-translate-y-1 ${
        quantity > 0 ? "ring-2 ring-brand-mid" : ""
      }`}
      data-ocid={`products.item.${index}`}
    >
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-5xl">
        {product.emoji}
      </div>

      <div>
        <h3 className="text-lg font-bold text-brand-dark">{product.name}</h3>
        <p className="text-brand-mid font-bold text-xl mt-1">
          ₹{product.price}
          <span className="text-sm font-normal text-muted-foreground">
            /{product.unit}
          </span>
        </p>
      </div>

      {/* Quantity Selector */}
      <div
        className="flex items-center gap-3 bg-secondary rounded-full px-2 py-1"
        data-ocid={`products.qty.${index}`}
      >
        <button
          type="button"
          onClick={() => onAdjust(-0.5)}
          disabled={quantity <= 0}
          data-ocid={`products.minus.${index}`}
          className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center font-bold text-brand-dark hover:bg-brand-dark hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg leading-none"
          aria-label={`Decrease ${product.name} quantity`}
        >
          −
        </button>
        <span className="text-brand-dark font-bold text-base w-10 text-center">
          {quantity} kg
        </span>
        <button
          type="button"
          onClick={() => onAdjust(0.5)}
          data-ocid={`products.plus.${index}`}
          className="w-9 h-9 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold hover:bg-brand-mid transition-colors text-lg leading-none"
          aria-label={`Increase ${product.name} quantity`}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <AnimatePresence mode="wait">
        {quantity > 0 ? (
          <motion.div
            key="subtotal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <div className="bg-brand-dark text-white font-semibold text-sm rounded-xl py-2 px-4">
              Subtotal: ₹{subtotal}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <div className="text-muted-foreground text-xs">
              Tap + to add to order
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// WhatsApp SVG Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WhatsApp"
      role="img"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
