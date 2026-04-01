import { Toaster } from "@/components/ui/sonner";
import {
  Mail,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ────────────────────────────────────────────────────────────────────────────
// Types & Data
// ────────────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  hindiName: string;
  retailPrice: number;
  unit: string;
  category: string;
}

const CATEGORIES = [
  { id: "roots", label: "Roots & Tubers", hindiLabel: "जड़ें और कंद" },
  {
    id: "greens",
    label: "Fresh Leafy Greens",
    hindiLabel: "हरी पत्तेदार सब्जियां",
  },
  { id: "vegetables", label: "Vegetables", hindiLabel: "सब्जियां" },
];

const PRODUCTS: Product[] = [
  // Roots & Tubers
  {
    id: "aloo",
    name: "Aloo",
    hindiName: "आलू",
    retailPrice: 25,
    unit: "kg",
    category: "roots",
  },
  {
    id: "gajar",
    name: "Gajar",
    hindiName: "गाजर",
    retailPrice: 42,
    unit: "kg",
    category: "roots",
  },
  {
    id: "mooli",
    name: "Mooli",
    hindiName: "मूली",
    retailPrice: 30,
    unit: "kg",
    category: "roots",
  },
  {
    id: "arbi",
    name: "Arbi",
    hindiName: "अरबी",
    retailPrice: 70,
    unit: "kg",
    category: "roots",
  },
  {
    id: "chukandar",
    name: "Chukandar",
    hindiName: "चुकन्दर",
    retailPrice: 43,
    unit: "kg",
    category: "roots",
  },
  // Fresh Leafy Greens
  {
    id: "palak",
    name: "Palak",
    hindiName: "पालक",
    retailPrice: 32,
    unit: "kg",
    category: "greens",
  },
  {
    id: "methi",
    name: "Methi",
    hindiName: "मेथी",
    retailPrice: 45,
    unit: "kg",
    category: "greens",
  },
  {
    id: "bathua",
    name: "Bathua",
    hindiName: "बथुआ",
    retailPrice: 65,
    unit: "kg",
    category: "greens",
  },
  {
    id: "sarson",
    name: "Sarson ka Saag",
    hindiName: "सरसों का साग",
    retailPrice: 45,
    unit: "kg",
    category: "greens",
  },
  {
    id: "pudina",
    name: "Pudina",
    hindiName: "पुदीना",
    retailPrice: 75,
    unit: "kg",
    category: "greens",
  },
  {
    id: "dhaniya",
    name: "Dhaniya",
    hindiName: "धनिया",
    retailPrice: 45,
    unit: "unit",
    category: "greens",
  },
  // Vegetables
  {
    id: "baingan",
    name: "Baingan",
    hindiName: "बैंगन",
    retailPrice: 55,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "tamatar",
    name: "Tamatar",
    hindiName: "टमाटर",
    retailPrice: 42,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "pyaaz",
    name: "Pyaaz",
    hindiName: "प्याज़",
    retailPrice: 39,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "bhindi",
    name: "Bhindi",
    hindiName: "भिंडी",
    retailPrice: 85,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "lauki",
    name: "Lauki",
    hindiName: "लौकी",
    retailPrice: 43,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "tori",
    name: "Tori",
    hindiName: "तोरी",
    retailPrice: 59,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "karela",
    name: "Karela",
    hindiName: "करेला",
    retailPrice: 70,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "parwal",
    name: "Parwal",
    hindiName: "परवल",
    retailPrice: 75,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "mirch",
    name: "Mirch",
    hindiName: "मिर्च",
    retailPrice: 65,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "shimla",
    name: "Shimla Mirch",
    hindiName: "शिमला मिर्च",
    retailPrice: 56,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "lal-pili",
    name: "Lal Pili Shimla",
    hindiName: "लाल पीली शिमला",
    retailPrice: 160,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "adrak",
    name: "Adrak",
    hindiName: "अदरक",
    retailPrice: 101,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "lahsun",
    name: "Lahsun Chila",
    hindiName: "लहसुन छिला",
    retailPrice: 160,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "patta-gobhi",
    name: "Patta Gobhi",
    hindiName: "पत्ता गोभी",
    retailPrice: 16,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "phool-gobhi",
    name: "Phool Gobhi",
    hindiName: "फूल गोभी",
    retailPrice: 55,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    hindiName: "ब्रोकोली",
    retailPrice: 175,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "matar",
    name: "Matar Safal",
    hindiName: "मटर सफल",
    retailPrice: 75,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "sweet-corn",
    name: "Sweet Corn",
    hindiName: "स्वीट कॉर्न",
    retailPrice: 120,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "beans",
    name: "Beans",
    hindiName: "बीन्स",
    retailPrice: 70,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "kaddu",
    name: "Kaddu",
    hindiName: "कद्दू",
    retailPrice: 37,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "mushroom",
    name: "Mushroom",
    hindiName: "मशरूम",
    retailPrice: 195,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "sprouts",
    name: "Sprouts Daal",
    hindiName: "स्प्राउट्स दाल",
    retailPrice: 140,
    unit: "kg",
    category: "vegetables",
  },
  {
    id: "salad-patta",
    name: "Salad Patta",
    hindiName: "सलाद पत्ता",
    retailPrice: 40,
    unit: "kg",
    category: "vegetables",
  },
];

const WA_NUMBER = "918700722663";

const PARTNERS = [
  {
    name: "Adnan A.S.K",
    role: "Managing Partner",
    hindiRole: "प्रबंध भागीदार",
    initial: "A",
    waNumber: "918527865856",
  },
  {
    name: "Sufiyan A.S.K",
    role: "Managing Partner",
    hindiRole: "प्रबंध भागीदार",
    initial: "S",
    waNumber: "918700722663",
  },
  {
    name: "Shad A.S.K",
    role: "Managing Partner",
    hindiRole: "प्रबंध भागीदार",
    initial: "S",
    waNumber: "919318404289",
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────
function buildWhatsAppUrl(
  quantities: Record<string, number>,
  customerName: string,
  unitTypes: Record<string, "Kg" | "Bag">,
): string | null {
  const items = PRODUCTS.filter((p) => quantities[p.id] > 0);
  if (items.length === 0) return null;
  const itemLines = items
    .map((p) => {
      const qty = quantities[p.id];
      const unit = unitTypes[p.id] || "Kg";
      return `- ${p.name}: ${qty} ${unit}`;
    })
    .join("\n");
  const nameLabel = customerName.trim() || "Not provided";
  const message = [
    "New Order for A.S.K:",
    itemLines,
    "-----------------------",
    `Customer Name: ${nameLabel}`,
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function totalItems(q: Record<string, number>) {
  return Object.values(q).filter((v) => v > 0).length;
}

// ────────────────────────────────────────────────────────────────────────────
// SVG Icons (line-art golden)
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// VVIP Featured Products
// ────────────────────────────────────────────────────────────────────────────
const FEATURED = [
  {
    id: "adrak",
    label: "Sahibabad Ginger",
    hindiName: "अदरक",
    price: 86,
    image: "/assets/generated/ginger-fresh.dim_400x400.png",
  },
  {
    id: "tamatar",
    label: "VVIP Tomatoes",
    hindiName: "टमाटर",
    price: 27,
    image: "/assets/generated/tomatoes-fresh.dim_400x400.png",
  },
  {
    id: "pyaaz",
    label: "Premium Onions",
    hindiName: "प्याज़",
    price: 24,
    image: "/assets/generated/onions-fresh.dim_400x400.png",
  },
];

// ────────────────────────────────────────────────────────────────────────────
// PWA Install Prompt
// ────────────────────────────────────────────────────────────────────────────
function InstallPrompt() {
  const deferredPrompt = useRef<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pwa-install-dismissed")) return;
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setShowBanner(true);
    };
    const handleAppInstalled = () => {
      setShowBanner(false);
      deferredPrompt.current = null;
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    if (outcome === "accepted") setShowBanner(false);
    deferredPrompt.current = null;
  };

  const handleDismiss = () => {
    sessionStorage.setItem("pwa-install-dismissed", "1");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-2.5 text-sm"
          style={{
            background: "#1a1400",
            borderBottom: "1px solid rgba(212,175,55,0.5)",
          }}
        >
          <span style={{ color: "#D4AF37" }}>📲 Install A.S.K VVIP App</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn-gold px-3 py-1 text-xs rounded"
              onClick={handleInstall}
            >
              Install
            </button>
            <button
              type="button"
              className="btn-gold-outline px-3 py-1 text-xs rounded"
              onClick={handleDismiss}
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Mandi Intelligence Section
// ────────────────────────────────────────────────────────────────────────────
function MandiIntelligence() {
  const particles = [0, 1, 2, 3, 4, 5, 6];
  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid rgba(212,175,55,0.35)",
        borderBottom: "1px solid rgba(212,175,55,0.35)",
      }}
    >
      {/* Background gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-widest mb-2 gold-glow shimmer-gold"
        >
          LIVE MANDI INTELLIGENCE
        </motion.h2>
        <p
          className="font-hindi text-sm mb-10"
          style={{ color: "rgba(212,175,55,0.65)" }}
        >
          Real-time supply data from Sahibabad Mandi
        </p>

        {/* Animated chart */}
        <div
          className="relative flex justify-center items-end mb-10"
          style={{ height: "160px" }}
        >
          {/* Particles */}
          {particles.map((i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${20 + i * 9}%`,
                bottom: `${10 + (i % 3) * 15}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${1.8 + i * 0.2}s`,
              }}
            />
          ))}
          {/* SVG trend arrow */}
          <svg
            role="img"
            aria-label="Live mandi intelligence trend chart"
            viewBox="0 0 320 140"
            width="320"
            height="140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            {/* Grid lines */}
            {[30, 60, 90, 120].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="320"
                y2={y}
                stroke="rgba(212,175,55,0.1)"
                strokeWidth="1"
              />
            ))}
            {/* Trend line */}
            <path
              d="M20 120 L80 95 L130 80 L180 55 L230 35 L280 15"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rise-path"
            />
            {/* Arrow head */}
            <path
              d="M268 8 L282 15 L272 27"
              stroke="#FFD700"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Data points */}
            {[
              [80, 95],
              [130, 80],
              [180, 55],
              [230, 35],
            ].map(([x, y]) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r="4"
                fill="#D4AF37"
                opacity="0.8"
              />
            ))}
          </svg>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="vvip-btn-pulse btn-gold px-10 py-4 text-lg font-black uppercase tracking-widest rounded-lg"
          data-ocid="mandi.vvip_status.button"
          onClick={() =>
            window.open(
              `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello A.S.K Team, I need VVIP Supply Status for today's Mandi rates.")}`,
              "_blank",
            )
          }
        >
          GET VVIP SUPPLY STATUS
        </motion.button>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Product Card
// ────────────────────────────────────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdjust: (delta: number) => void;
  onQuantityChange: (v: number) => void;
  unitType: "Kg" | "Bag";
  onUnitChange: (u: "Kg" | "Bag") => void;
  index: number;
}

function ProductCard({
  product,
  quantity,
  onAdjust,
  onQuantityChange,
  unitType,
  onUnitChange,
  index,
}: ProductCardProps) {
  const inCart = quantity > 0;
  return (
    <div
      className="gold-card p-4 flex flex-col gap-3 transition-all duration-200"
      data-ocid={`product.item.${index}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="font-heading font-bold text-base"
            style={{ color: "#D4AF37" }}
          >
            {product.name}
          </p>
          <p
            className="font-hindi text-xs mt-0.5"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            {product.hindiName}
          </p>
        </div>
        <div className="text-right">
          <p
            className="font-heading font-black text-lg"
            style={{ color: "#FFD700" }}
          >
            ₹{product.retailPrice}
          </p>
          <p className="text-xs" style={{ color: "rgba(212,175,55,0.55)" }}>
            per {product.unit}
          </p>
          <p
            className="text-xs mt-0.5 font-semibold"
            style={{ color: "#D4AF37" }}
          >
            Standard Delivery Price
          </p>
          <a
            href={`https://wa.me/918700722663?text=${encodeURIComponent(`Hi Sufiyan, I want the Wholesale VVIP Price for ${product.name} for my Banquet.`)}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold w-full py-1.5 text-xs font-black uppercase tracking-widest rounded text-center block mt-1"
            data-ocid={`product.whatsapp_vvip.${index}`}
          >
            📲 WHATSAPP VVIP RATE
          </a>
        </div>
      </div>

      {/* Unit toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={`px-3 py-1 text-xs font-bold rounded transition-all ${
            unitType === "Kg" ? "btn-gold" : "btn-gold-outline"
          }`}
          onClick={() => onUnitChange("Kg")}
          data-ocid={`product.kg_toggle.${index}`}
        >
          Kg
        </button>
        <button
          type="button"
          className={`px-3 py-1 text-xs font-bold rounded transition-all ${
            unitType === "Bag" ? "btn-gold" : "btn-gold-outline"
          }`}
          onClick={() => onUnitChange("Bag")}
          data-ocid={`product.bag_toggle.${index}`}
        >
          Bag
        </button>
      </div>

      {/* Quantity row */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn-gold-outline w-8 h-8 rounded font-black text-lg flex items-center justify-center"
          onClick={() => onAdjust(-1)}
          data-ocid={`product.qty_dec.${index}`}
        >
          −
        </button>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) =>
            onQuantityChange(Math.max(0, Number.parseInt(e.target.value) || 0))
          }
          className="w-14 text-center text-sm font-bold rounded px-2 py-1.5 focus:outline-none"
          style={{
            background: "#161006",
            border: "1px solid rgba(212,175,55,0.4)",
            color: "#D4AF37",
          }}
          data-ocid={`product.qty_input.${index}`}
        />
        <button
          type="button"
          className="btn-gold w-8 h-8 rounded font-black text-lg flex items-center justify-center"
          onClick={() => onAdjust(1)}
          data-ocid={`product.qty_inc.${index}`}
        >
          +
        </button>
        {inCart && (
          <span
            className="ml-auto text-xs font-bold px-2 py-1 rounded"
            style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
          >
            ✓ In Cart
          </span>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main App
// ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])),
  );
  const [unitTypes, setUnitTypes] = useState<Record<string, "Kg" | "Bag">>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, "Kg"])),
  );
  const [customerName, setCustomerName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adjust = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));
  };

  const handleGenerateOrder = () => {
    const url = buildWhatsAppUrl(quantities, customerName, unitTypes);
    if (!url) {
      toast.error("Please add at least one item to your cart!");
      return;
    }
    window.open(url, "_blank");
  };

  const handleClearCart = () => {
    setQuantities(Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])));
    toast.success("Cart cleared!");
  };

  const itemCount = totalItems(quantities);
  const cartItems = PRODUCTS.filter((p) => quantities[p.id] > 0);
  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hindiName.includes(searchQuery),
  );

  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "MANDI LIVE", href: "#mandi" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div className="min-h-screen marble-bg font-body">
      <Toaster position="top-center" />
      <InstallPrompt />

      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(10,10,10,0.97)",
          borderBottom: "1px solid rgba(212,175,55,0.3)",
        }}
      >
        {/* Logo row */}
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-2 flex flex-col items-center gap-2">
          <div className="relative flex flex-col items-center">
            {/* Golden aura behind logo */}
            <div
              className="absolute rounded-full"
              style={{
                width: "140px",
                height: "140px",
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.08) 60%, transparent 80%)",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
            <a
              href="/"
              style={{
                textDecoration: "none",
                border: "none",
                display: "block",
              }}
            >
              <img
                loading="lazy"
                src="/assets/uploads/IMG_2664-1.jpeg"
                alt="A.S.K VVIP Eagle Logo"
                className="logo-aura relative z-10"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                  display: "block",
                  boxShadow:
                    "0 0 24px 8px rgba(212,175,55,0.55), 0 0 48px 16px rgba(212,175,55,0.25)",
                  border: "2px solid rgba(212,175,55,0.5)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/IMG_2664.jpeg";
                }}
              />
            </a>
          </div>
          <div className="text-center">
            <h1
              className="font-heading font-black text-xl sm:text-2xl tracking-widest uppercase gold-glow"
              style={{ color: "#D4AF37" }}
            >
              A.S.K VVIP STANDARD SUPPLY
            </h1>
            <p
              className="text-xs tracking-widest uppercase mt-0.5"
              style={{ color: "rgba(212,175,55,0.6)" }}
            >
              Sahibabad, Ghaziabad &amp; Delhi NCR
            </p>
          </div>
        </div>

        {/* Nav row */}
        <div className="max-w-7xl mx-auto px-4 pb-3">
          <div className="flex items-center justify-between">
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-bold tracking-widest uppercase transition-all hover:text-white"
                  style={{ color: "rgba(212,175,55,0.8)" }}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/[^a-z]/g, "_")}.link`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                className="md:hidden p-2 btn-gold-outline rounded"
                onClick={() => setMobileMenuOpen((o) => !o)}
                data-ocid="nav.menu.toggle"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}
            >
              <nav
                className="flex flex-col px-4 py-3 gap-3"
                style={{ background: "#0A0A0A" }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-bold tracking-widest uppercase py-1 transition-all"
                    style={{ color: "rgba(212,175,55,0.8)" }}
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
        className="relative min-h-screen flex items-center justify-center pt-64 pb-20"
        style={{ background: "#0A0A0A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                border: "1px solid rgba(212,175,55,0.4)",
                color: "rgba(212,175,55,0.8)",
              }}
            >
              <MapPin className="w-3.5 h-3.5" />
              NCR's Largest Institutional Supply Partner
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6 gold-glow shimmer-gold leading-tight">
              A.S.K Fresh Supply: Building the Empire of Freshness
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
              style={{ color: "rgba(212,175,55,0.8)" }}
            >
              NCR&apos;s largest institutional supply partner sourcing directly
              from 3 major Mandis (Sahibabad SB-20, Azadpur, Gazipur). 20+
              dedicated delivery vehicles, 100% GST compliant, and serving the
              elite sectors of Hospitals, Aviation, and Education.
            </p>
            <p
              className="text-xs tracking-widest mb-8 uppercase"
              style={{ color: "rgba(212,175,55,0.45)" }}
            >
              All Fruits Available · Fresh Daily · GST Compliant
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.04 }}
                className="btn-gold px-8 py-3 text-sm font-black uppercase tracking-widest rounded-lg inline-block"
                data-ocid="hero.order_samples.button"
              >
                ORDER SAMPLES
              </motion.a>
              <motion.a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello A.S.K Team, I want to get today's fresh rates.")}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                className="btn-gold-outline px-8 py-3 text-sm font-black uppercase tracking-widest rounded-lg inline-block"
                data-ocid="hero.ask_rates.button"
              >
                ASK RATES
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VVIP FEATURED PRODUCTS ── */}
      <section
        id="featured"
        className="py-20"
        style={{ background: "#080808" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest mb-2 gold-glow"
              style={{ color: "#D4AF37" }}
            >
              VVIP FEATURED PRODUCTS
            </h2>
            <div
              className="w-24 h-px mx-auto"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FEATURED.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="gold-card p-8 flex flex-col items-center text-center gap-4"
                data-ocid={`featured.item.${i + 1}`}
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.1) 60%, transparent 80%)",
                    }}
                  />
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.label}
                    className="relative z-10 w-24 h-24 rounded-full object-cover"
                    style={{
                      boxShadow:
                        "0 0 20px 6px rgba(212,175,55,0.5), 0 0 40px 12px rgba(212,175,55,0.2)",
                      border: "2px solid rgba(212,175,55,0.6)",
                    }}
                  />
                </div>
                <div>
                  <h3
                    className="font-heading font-black text-xl uppercase tracking-wide"
                    style={{ color: "#D4AF37" }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="font-hindi text-sm mt-1"
                    style={{ color: "rgba(212,175,55,0.6)" }}
                  >
                    {item.hindiName}
                  </p>
                </div>
                <div>
                  <p
                    className="font-heading font-black text-2xl"
                    style={{ color: "#FFD700" }}
                  >
                    ₹{item.price}/kg
                  </p>
                  <p
                    className="text-xs mt-0.5 font-semibold"
                    style={{ color: "#D4AF37" }}
                  >
                    Standard Delivery Price
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-gold w-full py-2.5 text-sm font-black uppercase tracking-widest rounded"
                  data-ocid={`featured.order_now.${i + 1}`}
                  onClick={() => {
                    const msg = `Hello A.S.K Team, I want to order ${item.label} — please share partner pricing.`;
                    window.open(
                      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
                      "_blank",
                    );
                  }}
                >
                  ORDER NOW
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE MANDI INTELLIGENCE ── */}
      <div id="mandi">
        <MandiIntelligence />
      </div>

      {/* ── MAIN INVENTORY ── */}
      <section
        id="products"
        className="py-20"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2
              className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest mb-2 gold-glow"
              style={{ color: "#D4AF37" }}
            >
              FULL INVENTORY & RATES
            </h2>
            <p className="text-sm" style={{ color: "rgba(212,175,55,0.5)" }}>
              Today's Fresh Prices · Ghaziabad Mandi
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-10">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "rgba(212,175,55,0.6)" }}
            />
            <input
              type="text"
              placeholder="Search sabzi... e.g. Mushroom, Arbi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-lg focus:outline-none"
              style={{
                background: "#111",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
              }}
              data-ocid="inventory.search_input"
            />
          </div>

          {/* Category sections */}
          {searchQuery ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantities[product.id]}
                  onAdjust={(d) => adjust(product.id, d)}
                  onQuantityChange={(v) =>
                    setQuantities((prev) => ({ ...prev, [product.id]: v }))
                  }
                  unitType={unitTypes[product.id]}
                  onUnitChange={(u) =>
                    setUnitTypes((prev) => ({ ...prev, [product.id]: u }))
                  }
                  index={i + 1}
                />
              ))}
            </div>
          ) : (
            CATEGORIES.map((cat) => {
              const catProducts = filteredProducts.filter(
                (p) => p.category === cat.id,
              );
              if (catProducts.length === 0) return null;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-14"
                >
                  <div
                    className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-lg"
                    style={{
                      borderLeft: "3px solid #D4AF37",
                      background: "rgba(212,175,55,0.06)",
                    }}
                  >
                    <h3
                      className="font-heading text-lg font-black uppercase tracking-widest"
                      style={{ color: "#D4AF37" }}
                    >
                      {cat.label}
                    </h3>
                    <span
                      className="font-hindi text-sm"
                      style={{ color: "rgba(212,175,55,0.6)" }}
                    >
                      {cat.hindiLabel}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(212,175,55,0.4)" }}
                    >
                      ({catProducts.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {catProducts.map((product, i) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantity={quantities[product.id]}
                        onAdjust={(d) => adjust(product.id, d)}
                        onQuantityChange={(v) =>
                          setQuantities((prev) => ({
                            ...prev,
                            [product.id]: v,
                          }))
                        }
                        unitType={unitTypes[product.id]}
                        onUnitChange={(u) =>
                          setUnitTypes((prev) => ({ ...prev, [product.id]: u }))
                        }
                        index={i + 1}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })
          )}

          {/* Smart Cart */}
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                id="smart-cart"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                className="mt-16"
                data-ocid="smart_cart.panel"
              >
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(212,175,55,0.5)",
                    background: "#0D0D0D",
                  }}
                >
                  {/* Cart header */}
                  <div
                    className="flex items-center gap-3 px-6 py-4"
                    style={{
                      borderBottom: "1px solid rgba(212,175,55,0.25)",
                      background: "rgba(212,175,55,0.06)",
                    }}
                  >
                    <ShoppingCart
                      className="w-5 h-5"
                      style={{ color: "#D4AF37" }}
                    />
                    <h2
                      className="font-heading font-black uppercase tracking-widest text-xl"
                      style={{ color: "#D4AF37" }}
                    >
                      Smart Cart
                    </h2>
                    <span
                      className="ml-auto text-sm font-bold"
                      style={{ color: "rgba(212,175,55,0.7)" }}
                    >
                      {itemCount} item{itemCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Customer name */}
                  <div
                    className="px-6 py-4"
                    style={{ borderBottom: "1px solid rgba(212,175,55,0.15)" }}
                  >
                    <label
                      htmlFor="cname"
                      className="block text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: "rgba(212,175,55,0.7)" }}
                    >
                      Customer Name | ग्राहक का नाम
                    </label>
                    <input
                      id="cname"
                      type="text"
                      placeholder="Enter your name..."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full max-w-sm px-4 py-2.5 text-sm rounded focus:outline-none"
                      style={{
                        background: "#161006",
                        border: "1px solid rgba(212,175,55,0.4)",
                        color: "#D4AF37",
                      }}
                      data-ocid="smart_cart.customer_name.input"
                    />
                  </div>

                  {/* Cart rows */}
                  <div
                    className="divide-y"
                    style={{ borderColor: "rgba(212,175,55,0.1)" }}
                  >
                    {/* Table head */}
                    <div
                      className="grid grid-cols-12 gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest"
                      style={{
                        color: "rgba(212,175,55,0.6)",
                        background: "rgba(212,175,55,0.04)",
                      }}
                    >
                      <div className="col-span-1">#</div>
                      <div className="col-span-5">Item</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-2 text-right">Rate</div>
                      <div className="col-span-2 text-right">Amount</div>
                    </div>
                    {cartItems.map((product, i) => {
                      const qty = quantities[product.id];
                      const amount = qty * product.retailPrice;
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2, delay: i * 0.03 }}
                          className="grid grid-cols-12 gap-2 px-6 py-3 items-center"
                          data-ocid={`smart_cart.item.${i + 1}`}
                        >
                          <div className="col-span-1">
                            <span
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                              style={{
                                background: "rgba(212,175,55,0.15)",
                                color: "#D4AF37",
                              }}
                            >
                              {i + 1}
                            </span>
                          </div>
                          <div className="col-span-5">
                            <p
                              className="font-semibold text-sm"
                              style={{ color: "#D4AF37" }}
                            >
                              {product.name}
                            </p>
                            <p
                              className="font-hindi text-xs"
                              style={{ color: "rgba(212,175,55,0.5)" }}
                            >
                              {product.hindiName}
                            </p>
                          </div>
                          <div className="col-span-2 text-center">
                            <span
                              className="text-xs font-bold px-2 py-1 rounded"
                              style={{
                                background: "rgba(212,175,55,0.12)",
                                color: "#D4AF37",
                              }}
                            >
                              {qty} {unitTypes[product.id]}
                            </span>
                          </div>
                          <div
                            className="col-span-2 text-right text-sm"
                            style={{ color: "rgba(212,175,55,0.7)" }}
                          >
                            ₹{product.retailPrice}
                          </div>
                          <div
                            className="col-span-2 text-right font-bold text-sm"
                            style={{ color: "#FFD700" }}
                          >
                            ₹{amount}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Cart footer */}
                  <div
                    className="px-6 py-5 flex flex-wrap items-center gap-4"
                    style={{
                      borderTop: "1px solid rgba(212,175,55,0.25)",
                      background: "rgba(212,175,55,0.04)",
                    }}
                  >
                    <button
                      type="button"
                      className="btn-gold-outline px-4 py-2.5 text-sm font-bold rounded flex items-center gap-2"
                      onClick={handleClearCart}
                      data-ocid="smart_cart.clear.button"
                    >
                      <Trash2 className="w-4 h-4" /> Clear Cart
                    </button>
                    <button
                      type="button"
                      className="btn-gold px-8 py-2.5 text-sm font-black uppercase tracking-widest rounded ml-auto"
                      onClick={handleGenerateOrder}
                      data-ocid="smart_cart.send_order.button"
                    >
                      📲 Send Order to WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── FLOATING CART BUTTON ── */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.a
            href="#smart-cart"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-gold font-black text-sm uppercase tracking-widest"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #FFD700)",
              color: "#0A0A0A",
            }}
            data-ocid="floating_cart.button"
          >
            <ShoppingCart className="w-5 h-5" />
            View My Order ({itemCount})
          </motion.a>
        )}
      </AnimatePresence>

      {/* ── LEADERSHIP ── */}
      <section
        id="about"
        className="py-20"
        style={{
          background: "#080808",
          borderTop: "1px solid rgba(212,175,55,0.2)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex justify-center items-center gap-4 mb-3">
              <img
                loading="lazy"
                src="/assets/uploads/IMG_2664-1.jpeg"
                alt="Eagle Logo"
                className="w-10 h-10 rounded-full object-cover"
                style={{
                  boxShadow:
                    "0 0 18px rgba(212,175,55,0.55), 0 0 6px rgba(212,175,55,0.3)",
                  border: "2px solid rgba(212,175,55,0.5)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/IMG_2664.jpeg";
                }}
              />
              <h2
                className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest gold-glow"
                style={{ color: "#D4AF37" }}
              >
                Team A.S.K
              </h2>
              <img
                loading="lazy"
                src="/assets/uploads/IMG_2664-1.jpeg"
                alt="Eagle Logo"
                className="w-10 h-10 rounded-full object-cover"
                style={{
                  boxShadow:
                    "0 0 18px rgba(212,175,55,0.55), 0 0 6px rgba(212,175,55,0.3)",
                  border: "2px solid rgba(212,175,55,0.5)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/IMG_2664.jpeg";
                }}
              />
            </div>
            <p
              className="text-sm tracking-wide"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              Our Leadership | हमारी नेतृत्व टीम
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="gold-card p-8 text-center"
                data-ocid={`team.item.${i + 1}`}
              >
                <div className="relative mx-auto mb-4 w-20 h-20">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 80%)",
                    }}
                  />
                  <img
                    loading="lazy"
                    src="/assets/generated/team-vvip-placeholder.dim_200x200.png"
                    alt={partner.name}
                    className="relative z-10 w-20 h-20 rounded-full object-cover"
                    style={{
                      boxShadow:
                        "0 0 18px rgba(212,175,55,0.55), 0 0 6px rgba(212,175,55,0.3)",
                      border: "2px solid rgba(212,175,55,0.6)",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/uploads/IMG_2664-1.jpeg";
                    }}
                  />
                </div>
                <h3
                  className="font-heading font-black text-lg uppercase tracking-wide"
                  style={{ color: "#D4AF37" }}
                >
                  {partner.name}
                </h3>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "rgba(212,175,55,0.65)" }}
                >
                  {partner.role}
                </p>
                <p
                  className="font-hindi text-xs mt-0.5"
                  style={{ color: "rgba(212,175,55,0.45)" }}
                >
                  {partner.hindiRole}
                </p>
                <a
                  href={`https://wa.me/${partner.waNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded mt-5"
                  data-ocid={`team.whatsapp.${i + 1}`}
                >
                  💬 Connect on WhatsApp
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS / ABOUT ── */}
      <section
        id="process"
        className="py-16"
        style={{
          background: "#0A0A0A",
          borderTop: "1px solid rgba(212,175,55,0.15)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2
            className="font-heading text-3xl font-black uppercase tracking-widest mb-4 gold-glow"
            style={{ color: "#D4AF37" }}
          >
            OUR PROCESS
          </h2>
          <p
            className="text-sm mb-10"
            style={{ color: "rgba(212,175,55,0.5)" }}
          >
            Farm to Delivery · हमारी प्रक्रिया
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Mandi Procurement",
                desc: "Direct sourcing from Sahibabad Mandi at lowest possible rates every morning.",
              },
              {
                step: "02",
                title: "Quality Check",
                desc: "Each batch is hand-inspected for freshness before dispatch to partners.",
              },
              {
                step: "03",
                title: "VVIP Delivery",
                desc: "Same-day delivery to Ghaziabad, Noida & Delhi NCR on minimum order.",
              },
            ].map((item) => (
              <div key={item.step} className="gold-card p-8">
                <div className="font-heading font-black text-4xl mb-3 shimmer-gold">
                  {item.step}
                </div>
                <h3
                  className="font-heading font-bold text-base uppercase tracking-wider mb-2"
                  style={{ color: "#D4AF37" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(212,175,55,0.55)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-16"
        style={{
          background: "#080808",
          borderTop: "1px solid rgba(212,175,55,0.2)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2
            className="font-heading text-3xl font-black uppercase tracking-widest mb-8 gold-glow text-center"
            style={{ color: "#D4AF37" }}
          >
            CONTACT
          </h2>

          {/* Hardcoded Key Contacts */}
          <div
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              border: "1px solid rgba(212,175,55,0.25)",
              background: "#0d0d0d",
            }}
          >
            <div
              className="px-5 py-3"
              style={{
                background: "rgba(212,175,55,0.08)",
                borderBottom: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(212,175,55,0.7)" }}
              >
                Key Contacts
              </p>
            </div>
            {/* MD Sufiyan */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
            >
              <div>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "rgba(212,175,55,0.45)" }}
                >
                  MD — Strategy & Support
                </p>
                <p className="text-sm font-bold" style={{ color: "#D4AF37" }}>
                  Sufiyan A.S.K
                </p>
                <p
                  className="text-xs font-mono"
                  style={{ color: "rgba(212,175,55,0.55)" }}
                >
                  8700722663
                </p>
              </div>
              <a
                href="https://wa.me/918700722663"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide"
                style={{
                  background: "rgba(37,211,102,0.15)",
                  border: "1px solid rgba(37,211,102,0.4)",
                  color: "#25d366",
                }}
                data-ocid="contact.md.whatsapp"
              >
                💬 WhatsApp
              </a>
            </div>
            {/* CEO Adnan */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
            >
              <div>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "rgba(212,175,55,0.45)" }}
                >
                  CEO — Operations
                </p>
                <p className="text-sm font-bold" style={{ color: "#D4AF37" }}>
                  Adnan A.S.K
                </p>
                <p
                  className="text-xs font-mono"
                  style={{ color: "rgba(212,175,55,0.55)" }}
                >
                  8527865856
                </p>
              </div>
              <a
                href="tel:+918527865856"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide"
                style={{
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: "#D4AF37",
                }}
                data-ocid="contact.ceo.call"
              >
                📞 Direct Call
              </a>
            </div>
            {/* Finance Shad */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "rgba(212,175,55,0.45)" }}
                >
                  Finance — System Registry
                </p>
                <p className="text-sm font-bold" style={{ color: "#D4AF37" }}>
                  Shad A.S.K
                </p>
                <p
                  className="text-xs font-mono"
                  style={{ color: "rgba(212,175,55,0.55)" }}
                >
                  9318404289
                </p>
              </div>
              <a
                href="tel:+919318404289"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide"
                style={{
                  background: "rgba(167,139,250,0.12)",
                  border: "1px solid rgba(167,139,250,0.35)",
                  color: "#a78bfa",
                }}
                data-ocid="contact.finance.call"
              >
                🏦 Registry
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp flex items-center gap-3 px-7 py-3.5 rounded-lg font-bold text-sm justify-center"
              data-ocid="contact.whatsapp.button"
            >
              💬 WhatsApp Order
            </a>
            <a
              href="mailto:ask.global.exports.official@gmail.com"
              className="btn-gold-outline flex items-center gap-3 px-7 py-3.5 rounded-lg font-bold text-sm justify-center"
              data-ocid="contact.email.button"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 text-center"
        style={{
          background: "#060606",
          borderTop: "1px solid rgba(212,175,55,0.25)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <img
            loading="lazy"
            src="/assets/uploads/IMG_2664-1.jpeg"
            alt="A.S.K Eagle"
            className="w-12 h-12 rounded-full mx-auto mb-4 object-cover"
            style={{
              boxShadow:
                "0 0 20px rgba(212,175,55,0.6), 0 0 8px rgba(212,175,55,0.35)",
              border: "2px solid rgba(212,175,55,0.6)",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/IMG_2664.jpeg";
            }}
          />
          <p
            className="font-heading font-black text-lg uppercase tracking-widest mb-1"
            style={{ color: "#D4AF37" }}
          >
            A.S.K VVIP STANDARD SUPPLY
          </p>
          <div
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs mt-3"
            style={{ color: "rgba(212,175,55,0.55)" }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Shop no Sahibabad SB20,
              Ghaziabad
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />{" "}
              ask.global.exports.official@gmail.com
            </span>
          </div>
          <p
            className="text-sm font-bold mt-4 tracking-widest uppercase"
            style={{ color: "#D4AF37" }}
          >
            ✦ 3-Brothers Quality Guarantee ✦
          </p>
          <div
            className="w-32 h-px mx-auto my-5"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
            }}
          />
          <p className="text-xs" style={{ color: "rgba(212,175,55,0.35)" }}>
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "rgba(212,175,55,0.55)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
