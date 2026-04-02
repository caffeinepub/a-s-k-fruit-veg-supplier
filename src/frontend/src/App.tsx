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
        background: "#002366",
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
            background: "#001333",
            border: "1px solid rgba(212,175,55,0.4)",
            color: "#D4AF37",
            fontSize: "16px",
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
  const [formName, setFormName] = useState("");
  const [formOrg, setFormOrg] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [showRateCard, setShowRateCard] = useState(false);

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
          background: "rgba(0,24,71,0.98)",
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
                loading="eager"
                fetchPriority="high"
                width={120}
                height={120}
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
                style={{ background: "#002366" }}
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
        style={{
          backgroundImage:
            "url(/assets/generated/warehouse-hero.dim_1920x1080.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,35,102,0.82) 0%, rgba(0,18,48,0.90) 100%)",
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
              Delhi-NCR's Premier Institutional Partner
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6 gold-glow shimmer-gold leading-tight">
              A.S.K Fresh Supply: Delhi-NCR's Premier Partner for Elite Banquets
              & 5-Star Hotels.
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
              style={{ color: "rgba(212,175,55,0.8)" }}
            >
              Specializing in A-Grade (SB-20) Produce, Exotic Vegetables, and
              Imported Fruits with 24/7 Dedicated Logistics.
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

      {/* ── THE MD STANDARD ── */}
      <section
        id="md-standard"
        className="py-20"
        style={{
          background: "#001230",
          borderTop: "1px solid rgba(212,175,55,0.25)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span
              className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest rounded-full"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#D4AF37",
              }}
            >
              ★ THE MD STANDARD
            </span>
            <h2
              className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-widest gold-glow mb-4"
              style={{ color: "#D4AF37" }}
            >
              The MD Standard
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Three non-negotiable pillars that define every delivery we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "⭐",
                title: "SB-20 Sahibabad Quality",
                desc: "Hand-picked, A-Grade Produce only. Sourced directly from Sahibabad's premier SB-20 wholesale market at the peak of freshness.",
              },
              {
                icon: "🐆",
                title: "Cheetah Logistics",
                desc: "GPS-Tracked, Time-Bound Delivery across Greater Noida & NCR. Our fleet moves faster than the market, guaranteed.",
              },
              {
                icon: "🔒",
                title: "Price-Lock Guarantee",
                desc: "Monthly Fixed-Rate Contracts for Budget Stability. Lock in your rates — no surprise cost escalations, ever.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-2xl p-8 text-center flex flex-col items-center gap-5 group cursor-default"
                style={{
                  background: "rgba(0,48,128,0.4)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  boxShadow: "0 0 24px rgba(0,0,0,0.3)",
                  transition:
                    "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 8px 32px rgba(212,175,55,0.25)",
                  borderColor: "rgba(212,175,55,0.7)",
                }}
                data-ocid={`md_standard.item.${i + 1}`}
              >
                <div
                  className="text-5xl flex items-center justify-center w-20 h-20 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "2px solid rgba(212,175,55,0.35)",
                    boxShadow: "0 0 24px rgba(212,175,55,0.2)",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-heading text-xl font-black uppercase tracking-wide"
                  style={{ color: "#D4AF37" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VVIP FEATURED PRODUCTS ── */}
      <section
        id="featured"
        className="py-20"
        style={{ background: "#001847" }}
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
                    decoding="async"
                    width={96}
                    height={96}
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
        style={{ background: "#002366" }}
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
                    background: "#001a4d",
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
                        background: "#001333",
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

      {/* ── THE A.S.K EDGE ── */}
      <section
        id="ask-edge"
        className="py-20"
        style={{
          background: "#001540",
          borderTop: "1px solid rgba(212,175,55,0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest gold-glow mb-3"
              style={{ color: "#D4AF37" }}
            >
              The A.S.K Edge
            </h2>
            <p
              className="text-sm tracking-widest uppercase"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              Why Institutions Choose Us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🚛",
                title: "20+ Owned Fleet",
                desc: "Zero dependency on outside transport. We guarantee 5:00 AM delivery with our dedicated vehicles.",
              },
              {
                icon: "🏪",
                title: "Triple Mandi Sourcing",
                desc: "Direct procurement from Sahibabad (SB-20), Azadpur, and Gazipur to ensure the most competitive market rates.",
              },
              {
                icon: "📋",
                title: "Corporate Grade Transparency",
                desc: "100% GST invoicing and professional contract management for seamless audits.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-2xl p-8 text-center flex flex-col items-center gap-4"
                style={{
                  background: "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  boxShadow: "0 0 24px rgba(212,175,55,0.08)",
                }}
              >
                <div
                  className="text-5xl mb-2 flex items-center justify-center w-20 h-20 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    border: "2px solid rgba(212,175,55,0.3)",
                    boxShadow: "0 0 20px rgba(212,175,55,0.2)",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-lg font-bold uppercase tracking-wider"
                  style={{ color: "#D4AF37" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(212,175,55,0.7)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIP RATE CARD SECTION ── */}
      <section
        className="py-20"
        style={{
          background: "#001847",
          borderTop: "2px solid rgba(212,175,55,0.4)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span
              className="inline-block text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full mb-5"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.45)",
                color: "#D4AF37",
              }}
            >
              ★ FOR REGISTERED INSTITUTIONAL PARTNERS
            </span>
            <h2
              className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest gold-glow mb-4"
              style={{ color: "#D4AF37" }}
            >
              Exclusive B2B Pricing for Elite Venues
            </h2>
            <p
              className="text-base max-w-2xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Our VVIP rate structure is reserved for hotels, banquets,
              hospitals, and aviation kitchens. Click below to view the current
              rate card.
            </p>
            <motion.button
              type="button"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 40px rgba(212,175,55,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowRateCard(true)}
              className="inline-flex items-center gap-3 px-10 py-4 text-lg font-black uppercase tracking-widest rounded-xl"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                color: "#001847",
                boxShadow: "0 4px 24px rgba(212,175,55,0.35)",
              }}
              data-ocid="vip_rate_card.open_modal_button"
            >
              👁 View VVIP Rate Card
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── VIP RATE CARD MODAL ── */}
      <AnimatePresence>
        {showRateCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", zIndex: 9999 }}
            onClick={() => setShowRateCard(false)}
            data-ocid="vip_rate_card.modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
              style={{
                background: "#001847",
                border: "2px solid rgba(212,175,55,0.6)",
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  borderBottom: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <h3
                  className="font-heading text-xl font-black uppercase tracking-widest"
                  style={{ color: "#D4AF37" }}
                >
                  EXCLUSIVE B2B RATE CARD
                </h3>
                <button
                  type="button"
                  onClick={() => setShowRateCard(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-lg transition-all"
                  style={{
                    background: "rgba(212,175,55,0.12)",
                    border: "1px solid rgba(212,175,55,0.4)",
                    color: "#D4AF37",
                  }}
                  data-ocid="vip_rate_card.close_button"
                >
                  ✕
                </button>
              </div>
              {/* Rate Card Image */}
              <div className="p-0 overflow-auto" style={{ maxHeight: "60vh" }}>
                <img
                  src="/assets/generated/vip-rate-card.dim_800x600.jpg"
                  alt="A.S.K VVIP B2B Rate Card — Exclusive Pricing for Elite Institutional Partners"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain"
                />
              </div>
              {/* Modal Footer */}
              <div
                className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5"
                style={{
                  background: "rgba(212,175,55,0.06)",
                  borderTop: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                <p
                  className="text-sm text-center sm:text-left"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Contact Sufiyan A.S.K for personalized B2B rates.
                </p>
                <a
                  href="https://wa.me/918700722663?text=Hi%20Sufiyan%20A.S.K%2C%20I%20would%20like%20to%20discuss%20B2B%20pricing%20for%20my%20venue.%20Please%20share%20the%20VVIP%20Rate%20Card%20details."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-2.5 text-sm font-black uppercase tracking-wider rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
                    touchAction: "manipulation",
                  }}
                  data-ocid="vip_rate_card.whatsapp_button"
                >
                  💬 Get Personalized Rates
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTORS WE SERVE ── */}
      <section
        className="py-20"
        style={{
          background: "#001230",
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
            <h2
              className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest gold-glow mb-3"
              style={{ color: "#D4AF37" }}
            >
              Sectors We Serve
            </h2>
            <p
              className="text-sm tracking-wide"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              Trusted Supply Partner Across India's Most Demanding Industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🏥",
                title: "Hospitals & Healthcare",
                subtitle: "Sterile Standards. Daily Freshness.",
                desc: "Focused on sterile handling and daily fresh nutrition for medical-grade kitchen requirements.",
              },
              {
                icon: "✈️",
                title: "Aviation & Flight Kitchens",
                subtitle: "International Grading. Zero Compromise.",
                desc: "Meeting international grading standards for premium airlines and flight catering operations.",
              },
              {
                icon: "🎓",
                title: "Universities & Institutions",
                subtitle: "Bulk Supply. Consistent Quality.",
                desc: "Handling bulk daily essentials for large-scale mess operations across universities and institutions.",
              },
              {
                icon: "🍽️",
                title: "Cloud Kitchens & Banquets",
                subtitle: "Precision Delivery. High Volume.",
                desc: "Precision delivery for high-volume event catering and cloud kitchen operations.",
              },
            ].map((sector) => (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl p-6 flex gap-5 items-start"
                style={{
                  background: "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  boxShadow: "0 4px 24px rgba(212,175,55,0.08)",
                }}
              >
                <div
                  className="text-4xl flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    boxShadow: "0 0 14px rgba(212,175,55,0.2)",
                  }}
                >
                  {sector.icon}
                </div>
                <div>
                  <h3
                    className="font-heading text-lg font-bold uppercase tracking-wide mb-1"
                    style={{ color: "#D4AF37" }}
                  >
                    {sector.title}
                  </h3>
                  <p
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: "rgba(212,175,55,0.6)" }}
                  >
                    {sector.subtitle}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(212,175,55,0.75)" }}
                  >
                    {sector.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section
        className="py-20"
        style={{
          background: "#001230",
          borderTop: "1px solid rgba(212,175,55,0.2)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span
              className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest rounded-full"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#D4AF37",
              }}
            >
              ★ PORTFOLIO & AUTHORITY
            </span>
            <h2
              className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest gold-glow mb-3"
              style={{ color: "#D4AF37" }}
            >
              Trusted By NCR&apos;s Finest
            </h2>
            <p
              className="text-sm max-w-lg mx-auto"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Leading hospitality brands and institutions across the NCR region
              rely on A.S.K Fresh Supply for uninterrupted, premium-grade
              produce.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { name: "The Eastern", tagline: "Premium Hospitality" },
              { name: "Sandal Tree", tagline: "Fine Dining & Events" },
              { name: "Riva", tagline: "Luxury Catering" },
            ].map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-2xl p-10 text-center flex flex-col items-center gap-4"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(0,48,128,0.5) 0%, rgba(0,26,77,0.8) 100%)",
                  border: "1px solid rgba(212,175,55,0.45)",
                  boxShadow:
                    "0 0 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,175,55,0.15)",
                }}
                data-ocid={`clients.item.${i + 1}`}
              >
                <div
                  className="text-2xl flex items-center justify-center w-12 h-12 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    border: "1.5px solid rgba(212,175,55,0.5)",
                    color: "#D4AF37",
                  }}
                >
                  ★
                </div>
                <h3
                  className="font-heading text-2xl font-black tracking-wide"
                  style={{ color: "#D4AF37" }}
                >
                  {client.name}
                </h3>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    color: "rgba(212,175,55,0.8)",
                  }}
                >
                  {client.tagline}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY POLICY ── */}
      <section
        className="py-16"
        style={{
          background: "#001540",
          borderTop: "1px solid rgba(212,175,55,0.2)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-widest mb-6 gold-glow"
              style={{ color: "#D4AF37" }}
            >
              ✦ Quality Policy ✦
            </h2>
            <div
              className="rounded-xl p-8 sm:p-10"
              style={{
                background: "rgba(212,175,55,0.04)",
                border: "1px solid rgba(212,175,55,0.3)",
                boxShadow: "0 0 30px rgba(212,175,55,0.08)",
              }}
            >
              <p
                className="text-base sm:text-lg font-bold leading-relaxed"
                style={{ color: "#D4AF37" }}
              >
                Our Quality is Our Contract. We offer a 100% Replacement
                Guarantee—if the quality isn't up to mark, we replace it
                immediately, no questions asked. Our CEO Adnan personally
                supervises night-time procurement at the Mandi to ensure only
                'Grade-A' produce reaches your kitchen.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THE EXOTIC COLLECTION ── */}
      <section
        className="py-20 sm:py-28"
        style={{
          background: "linear-gradient(180deg, #001847 0%, #000d2e 100%)",
          borderTop: "2px solid rgba(212,175,55,0.4)",
          borderBottom: "2px solid rgba(212,175,55,0.4)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span
              className="inline-block px-5 py-2 mb-5 text-xs font-bold uppercase tracking-widest rounded-full"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.5)",
                color: "#D4AF37",
              }}
            >
              ✦ PREMIUM IMPORTED RANGE ✦
            </span>
            <h2
              className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-widest mb-4 gold-glow shimmer-gold"
              style={{ color: "#D4AF37" }}
            >
              The Exotic Collection
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(212,175,55,0.75)" }}
            >
              World-class produce sourced for Delhi-NCR's elite kitchens — every
              item hand-selected, triple-graded.
            </p>
            <p
              className="text-sm mt-2 uppercase tracking-widest"
              style={{ color: "rgba(212,175,55,0.45)" }}
            >
              विश्व के सर्वश्रेष्ठ खेतों से | Sourced from the World's Finest Farms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
            {[
              {
                name: "Broccoli",
                hindiName: "ब्रोकोली",
                price: "₹160/kg",
                img: "/assets/generated/exotic-broccoli-hq.dim_800x800.jpg",
              },
              {
                name: "Red & Yellow Bell Peppers",
                hindiName: "लाल व पीली शिमला",
                price: "₹160/kg",
                img: "/assets/generated/exotic-bell-peppers-hq.dim_800x800.jpg",
              },
              {
                name: "Asparagus",
                hindiName: "एस्परैगस",
                price: "On Request",
                img: "/assets/generated/exotic-asparagus-hq.dim_800x800.jpg",
              },
              {
                name: "Avocado",
                hindiName: "एवोकाडो",
                price: "On Request",
                img: "/assets/generated/exotic-avocado-hq.dim_800x800.jpg",
              },
              {
                name: "Dragon Fruit",
                hindiName: "ड्रैगन फ्रूट",
                price: "On Request",
                img: "/assets/generated/exotic-dragon-fruit-hq.dim_800x800.jpg",
              },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="rounded-2xl overflow-hidden flex flex-col group"
                style={{
                  background: "rgba(0,15,50,0.9)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.5), 0 0 0 0 rgba(212,175,55,0)",
                  transition: "box-shadow 0.3s ease",
                }}
                data-ocid={`exotic.item.${index + 1}`}
              >
                {/* Image container */}
                <div
                  className="overflow-hidden relative"
                  style={{ aspectRatio: "1/1" }}
                >
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 60%, rgba(0,10,40,0.8) 100%)",
                    }}
                  />
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                    style={{
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform =
                        "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform =
                        "scale(1)";
                    }}
                  />
                  {/* Golden glow overlay */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)",
                      transition: "opacity 0.4s ease",
                    }}
                  />
                </div>
                {/* Info */}
                <div className="flex flex-col items-center gap-2 px-4 py-5">
                  <p
                    className="font-heading font-black text-base sm:text-lg text-center uppercase tracking-wide"
                    style={{ color: "#D4AF37" }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="font-hindi text-xs"
                    style={{ color: "rgba(212,175,55,0.55)" }}
                  >
                    {item.hindiName}
                  </p>
                  <p
                    className="font-heading font-black text-base"
                    style={{ color: "#FFD700" }}
                  >
                    {item.price}
                  </p>
                  <span
                    className="text-xs uppercase tracking-wider text-center px-3 py-1.5 rounded-full mt-1"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.45)",
                      color: "#D4AF37",
                    }}
                  >
                    ✦ Hand-Picked & Triple-Graded
                  </span>
                  <a
                    href={`https://wa.me/918700722663?text=${encodeURIComponent(`Hi Sufiyan, I need ${item.name} for my establishment. Please share VVIP pricing.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold w-full py-2 text-xs font-black uppercase tracking-widest rounded-lg text-center mt-1"
                    data-ocid={`exotic.whatsapp.${index + 1}`}
                  >
                    📲 Get Quote
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR ELITE CLIENTS ── */}
      <section
        className="py-20 sm:py-24"
        style={{
          background: "#002366",
          borderTop: "2px solid rgba(212,175,55,0.4)",
          borderBottom: "1px solid rgba(212,175,55,0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span
              className="inline-block px-5 py-2 mb-5 text-xs font-bold uppercase tracking-widest rounded-full"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
              }}
            >
              ★ TRUSTED BY THE FINEST
            </span>
            <h2
              className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-widest mb-4 gold-glow shimmer-gold"
              style={{ color: "#D4AF37" }}
            >
              Our Elite Clients
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Trusted by Delhi-NCR's most prestigious establishments. Our
              standards are measured by the kitchens we serve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                name: "The Eastern",
                tagline: "Premium Banquet & Hospitality",
                desc: "Supplying A-Grade seasonal vegetables and exotic produce to The Eastern's world-class kitchen operations.",
                icon: "🏨",
                badge: "★ VVIP Partner",
              },
              {
                name: "Riva",
                tagline: "Fine Dining & Luxury Catering",
                desc: "A trusted supply chain partner for Riva's high-end culinary team, delivering freshness and consistency at every service.",
                icon: "🍽️",
                badge: "★ VVIP Partner",
              },
            ].map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 16px 48px rgba(212,175,55,0.25)",
                }}
                className="rounded-2xl p-8 flex flex-col gap-5 group cursor-default"
                style={{
                  background: "rgba(0,35,100,0.6)",
                  border: "1.5px solid rgba(212,175,55,0.5)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease",
                }}
                data-ocid={`elite_clients.item.${i + 1}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="text-4xl flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1.5px solid rgba(212,175,55,0.4)",
                      boxShadow: "0 0 20px rgba(212,175,55,0.2)",
                    }}
                  >
                    {client.icon}
                  </div>
                  <div>
                    <h3
                      className="font-heading text-2xl font-black uppercase tracking-wide"
                      style={{ color: "#FFD700" }}
                    >
                      {client.name}
                    </h3>
                    <p
                      className="text-sm font-semibold uppercase tracking-widest mt-0.5"
                      style={{ color: "rgba(212,175,55,0.7)" }}
                    >
                      {client.tagline}
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {client.desc}
                </p>
                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                    style={{
                      background: "rgba(212,175,55,0.15)",
                      border: "1px solid rgba(212,175,55,0.5)",
                      color: "#D4AF37",
                    }}
                  >
                    {client.badge}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(212,175,55,0.5)" }}
                  >
                    Delhi-NCR
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12 text-sm font-bold uppercase tracking-widest"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            Trusted by Giants — Serving premium venues like The Eastern and Riva
          </motion.p>
        </div>
      </section>

      {/* ── CLIENT SPOTLIGHT ── */}
      <section
        className="py-20"
        style={{
          background: "#001540",
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
            <span
              className="inline-block text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full mb-5"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
              }}
            >
              ★ REAL PARTNERSHIPS. REAL RESULTS.
            </span>
            <h2
              className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-widest gold-glow mb-4"
              style={{ color: "#D4AF37" }}
            >
              Client Spotlight
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Years of trust, consistency, and Grade-A freshness delivered to
              Delhi-NCR's finest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* The Eastern */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{
                y: -6,
                boxShadow: "0 16px 48px rgba(212,175,55,0.25)",
              }}
              className="rounded-2xl p-8 flex flex-col gap-5"
              style={{
                background: "rgba(0,35,100,0.6)",
                border: "1.5px solid rgba(212,175,55,0.5)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                transition: "all 0.3s ease",
              }}
              data-ocid="client_spotlight.item.1"
            >
              <div className="flex items-start gap-4">
                <div
                  className="text-4xl flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0"
                  style={{
                    background: "rgba(212,175,55,0.12)",
                    border: "1.5px solid rgba(212,175,55,0.4)",
                    boxShadow: "0 0 20px rgba(212,175,55,0.2)",
                  }}
                >
                  🏨
                </div>
                <div>
                  <h3
                    className="font-heading text-2xl font-black uppercase tracking-wide"
                    style={{ color: "#FFD700" }}
                  >
                    The Eastern
                  </h3>
                  <p
                    className="text-sm font-semibold uppercase tracking-widest mt-0.5"
                    style={{ color: "rgba(212,175,55,0.7)" }}
                  >
                    Premium Banquet | Noida, NCR
                  </p>
                </div>
              </div>
              <blockquote
                className="text-sm leading-relaxed italic border-l-2 pl-4"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  borderColor: "rgba(212,175,55,0.4)",
                }}
              >
                "A.S.K supplies us with consistent, Grade-A vegetables daily.
                Their 5 AM delivery means our kitchen starts on time, every
                time."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                {["500+ Kg / Day", "3+ Years", "Zero Missed Deliveries"].map(
                  (stat) => (
                    <span
                      key={stat}
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(212,175,55,0.12)",
                        border: "1px solid rgba(212,175,55,0.35)",
                        color: "#D4AF37",
                      }}
                    >
                      {stat}
                    </span>
                  ),
                )}
              </div>
              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    border: "1px solid rgba(212,175,55,0.5)",
                    color: "#D4AF37",
                  }}
                >
                  ★ Flagship Client
                </span>
              </div>
            </motion.div>

            {/* Riva */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{
                y: -6,
                boxShadow: "0 16px 48px rgba(212,175,55,0.25)",
              }}
              className="rounded-2xl p-8 flex flex-col gap-5"
              style={{
                background: "rgba(0,35,100,0.6)",
                border: "1.5px solid rgba(212,175,55,0.5)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                transition: "all 0.3s ease",
              }}
              data-ocid="client_spotlight.item.2"
            >
              <div className="flex items-start gap-4">
                <div
                  className="text-4xl flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0"
                  style={{
                    background: "rgba(212,175,55,0.12)",
                    border: "1.5px solid rgba(212,175,55,0.4)",
                    boxShadow: "0 0 20px rgba(212,175,55,0.2)",
                  }}
                >
                  🍽️
                </div>
                <div>
                  <h3
                    className="font-heading text-2xl font-black uppercase tracking-wide"
                    style={{ color: "#FFD700" }}
                  >
                    Riva
                  </h3>
                  <p
                    className="text-sm font-semibold uppercase tracking-widest mt-0.5"
                    style={{ color: "rgba(212,175,55,0.7)" }}
                  >
                    Fine Dining & Luxury Events | Delhi NCR
                  </p>
                </div>
              </div>
              <blockquote
                className="text-sm leading-relaxed italic border-l-2 pl-4"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  borderColor: "rgba(212,175,55,0.4)",
                }}
              >
                "The exotic produce from A.S.K has elevated our menu quality.
                SB-20 grading is something our chefs trust completely."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                {["200+ Kg / Day", "2+ Years", "100% SB-20 Grade"].map(
                  (stat) => (
                    <span
                      key={stat}
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(212,175,55,0.12)",
                        border: "1px solid rgba(212,175,55,0.35)",
                        color: "#D4AF37",
                      }}
                    >
                      {stat}
                    </span>
                  ),
                )}
              </div>
              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    border: "1px solid rgba(212,175,55,0.5)",
                    color: "#D4AF37",
                  }}
                >
                  ★ Luxury Partner
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section
        id="about"
        className="py-20"
        style={{
          background: "#001847",
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
                decoding="async"
                width={40}
                height={40}
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
                decoding="async"
                width={40}
                height={40}
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

          {/* Mandi Supply Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-full"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1.5px solid rgba(212,175,55,0.5)",
                color: "#D4AF37",
                boxShadow: "0 0 20px rgba(212,175,55,0.12)",
              }}
            >
              🌿 Direct Supply from Mandi with 3-Layer SB-20 Grading Standard
            </span>
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
                    decoding="async"
                    width={80}
                    height={80}
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
          background: "#002366",
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
          background: "#001847",
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
              background: "#001a4d",
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

          {/* ── INQUIRY FORM + ADDRESS ── */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Office Address Card */}
            <div
              className="rounded-2xl p-7 flex flex-col gap-4"
              style={{
                background:
                  "linear-gradient(145deg, rgba(0,48,128,0.45) 0%, rgba(0,26,77,0.8) 100%)",
                border: "1px solid rgba(212,175,55,0.35)",
              }}
            >
              <h3
                className="font-heading text-lg font-black uppercase tracking-widest"
                style={{ color: "#D4AF37" }}
              >
                📍 Our Office
              </h3>
              <div
                className="flex flex-col gap-3 text-sm"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <div className="flex gap-3">
                  <span style={{ color: "#D4AF37", flexShrink: 0 }}>🏢</span>
                  <span>
                    <span className="font-bold" style={{ color: "#D4AF37" }}>
                      Shahid Nagar Office
                    </span>
                    <br />
                    Shahid Nagar, Ghaziabad,
                    <br />
                    Uttar Pradesh – 201005
                  </span>
                </div>
                <div className="flex gap-3">
                  <span style={{ color: "#D4AF37", flexShrink: 0 }}>🏭</span>
                  <span>
                    <span className="font-bold" style={{ color: "#D4AF37" }}>
                      Mandi Operations
                    </span>
                    <br />
                    Shop No., Sahibabad SB-20,
                    <br />
                    Ghaziabad, UP
                  </span>
                </div>
                <div className="flex gap-3">
                  <span style={{ color: "#D4AF37", flexShrink: 0 }}>⏰</span>
                  <span>
                    <span className="font-bold" style={{ color: "#D4AF37" }}>
                      Operating Hours
                    </span>
                    <br />
                    Mon – Sun: 4:00 AM – 10:00 PM
                    <br />
                    <span
                      style={{
                        color: "rgba(212,175,55,0.6)",
                        fontSize: "0.75rem",
                      }}
                    >
                      24/7 WhatsApp Support Available
                    </span>
                  </span>
                </div>
                <div className="flex gap-3">
                  <span style={{ color: "#D4AF37", flexShrink: 0 }}>✉️</span>
                  <span>ask.global.exports.official@gmail.com</span>
                </div>
              </div>
              <div className="mt-2">
                <p
                  className="text-xs uppercase tracking-widest font-bold mb-2"
                  style={{ color: "rgba(212,175,55,0.55)" }}
                >
                  Coverage Area
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Ghaziabad",
                    "Delhi NCR",
                    "Noida",
                    "Greater Noida",
                    "Faridabad",
                    "Gurugram",
                  ].map((area) => (
                    <span
                      key={area}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(212,175,55,0.12)",
                        border: "1px solid rgba(212,175,55,0.3)",
                        color: "rgba(212,175,55,0.85)",
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div
              className="rounded-2xl p-7"
              style={{
                background:
                  "linear-gradient(145deg, rgba(0,48,128,0.45) 0%, rgba(0,26,77,0.8) 100%)",
                border: "1px solid rgba(212,175,55,0.35)",
              }}
            >
              <h3
                className="font-heading text-lg font-black uppercase tracking-widest mb-5"
                style={{ color: "#D4AF37" }}
              >
                📋 Send an Inquiry
              </h3>
              {formSent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="text-5xl">✅</div>
                  <p className="font-bold text-lg" style={{ color: "#D4AF37" }}>
                    Inquiry Sent via WhatsApp!
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    Our team will respond within 15 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSent(false);
                      setFormName("");
                      setFormOrg("");
                      setFormPhone("");
                      setFormMsg("");
                    }}
                    className="text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-lg"
                    style={{
                      background: "rgba(212,175,55,0.15)",
                      border: "1px solid rgba(212,175,55,0.4)",
                      color: "#D4AF37",
                    }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const msg = `Hi A.S.K Team! 🙏%0A%0A*New Inquiry from Website*%0A👤 Name: ${encodeURIComponent(formName)}%0A🏢 Organisation: ${encodeURIComponent(formOrg || "N/A")}%0A📞 Phone: ${encodeURIComponent(formPhone)}%0A%0A💬 Message:%0A${encodeURIComponent(formMsg)}%0A%0A— Sent from ask-fresh-supply website`;
                    window.open(
                      `https://wa.me/918700722663?text=${msg}`,
                      "_blank",
                    );
                    setFormSent(true);
                  }}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(0,20,64,0.7)",
                      border: "1px solid rgba(212,175,55,0.3)",
                      color: "#fff",
                      caretColor: "#D4AF37",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Hotel / Restaurant / Organisation"
                    value={formOrg}
                    onChange={(e) => setFormOrg(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(0,20,64,0.7)",
                      border: "1px solid rgba(212,175,55,0.3)",
                      color: "#fff",
                      caretColor: "#D4AF37",
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(0,20,64,0.7)",
                      border: "1px solid rgba(212,175,55,0.3)",
                      color: "#fff",
                      caretColor: "#D4AF37",
                    }}
                  />
                  <textarea
                    placeholder="Tell us your requirement (items, quantity, delivery schedule)..."
                    required
                    rows={4}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{
                      background: "rgba(0,20,64,0.7)",
                      border: "1px solid rgba(212,175,55,0.3)",
                      color: "#fff",
                      caretColor: "#D4AF37",
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 18px rgba(37,211,102,0.35)",
                    }}
                  >
                    💬 Send via WhatsApp
                  </button>
                  <p
                    className="text-xs text-center"
                    style={{ color: "rgba(212,175,55,0.45)" }}
                  >
                    Submitting opens WhatsApp with your message pre-filled.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUITY PARTNERSHIP ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          background: "#0d0d0d",
          borderTop: "2px solid rgba(212,175,55,0.3)",
          borderBottom: "2px solid rgba(212,175,55,0.3)",
        }}
        className="py-16 sm:py-20 px-4"
        data-ocid="equity_partnership.section"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Handshake Icon */}
          <div className="flex justify-center mb-6">
            <span
              style={{
                fontSize: "4rem",
                filter: "drop-shadow(0 0 12px rgba(212,175,55,0.7))",
                lineHeight: 1,
              }}
            >
              🤝
            </span>
          </div>

          {/* Section Title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide mb-4"
            style={{
              color: "#D4AF37",
              fontFamily: "Montserrat, sans-serif",
              textShadow: "0 0 30px rgba(212,175,55,0.35)",
            }}
          >
            A.S.K Equity Partnership – Growing Together
          </h2>
          <div
            style={{
              width: "80px",
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              margin: "0 auto 2.5rem",
            }}
          />

          {/* Premium Box */}
          <div
            className="mx-auto text-left rounded-2xl p-5 sm:p-8"
            style={{
              maxWidth: "800px",
              border: "2px solid #D4AF37",
              background: "rgba(212,175,55,0.05)",
              boxShadow:
                "0 0 40px rgba(212,175,55,0.1), inset 0 0 60px rgba(0,0,0,0.3)",
            }}
            data-ocid="equity_partnership.card"
          >
            {/* Box Heading */}
            <h3
              className="text-xl sm:text-2xl font-black mb-5 text-center"
              style={{
                color: "#D4AF37",
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              A.S.K Equity Partnership – Hamara Saajha Bhavishya
            </h3>

            {/* Body Text Paragraph 1 */}
            <p
              className="text-base sm:text-lg leading-relaxed break-words mb-5"
              style={{ color: "#e8e0cc", whiteSpace: "pre-line" }}
            >
              A.S.K Fresh Supply sirf aaj ka vendor nahi, kal ka ek bada{" "}
              <strong style={{ color: "#D4AF37" }}>Samrajya (Empire)</strong>{" "}
              hai. Hum apne saath judne wale Banquets ko sirf &apos;Grahak&apos;
              (Customer) nahi, balki{" "}
              <strong style={{ color: "#D4AF37" }}>
                &#39;Malik&#39; (Owner)
              </strong>{" "}
              banane mein yakeen rakhte hain.
            </p>

            {/* Body Text Paragraph 2 */}
            <p
              className="text-base sm:text-lg leading-relaxed break-words"
              style={{ color: "#e8e0cc", whiteSpace: "pre-line" }}
            >
              Humne apni company ka{" "}
              <strong style={{ color: "#D4AF37" }}>19% Equity Pool</strong> khas
              taur par apne un loyal Banquet Partners ke liye reserve rakha hai
              jo hamare vision mein shuruat se judenge. Jab A.S.K apne growth
              milestones par pahuchegi aur ek{" "}
              <strong style={{ color: "#D4AF37" }}>
                Public Limited Company
              </strong>{" "}
              banne ki taraf badhegi (chahe usme waqt lage, par maqsad pakka
              hai), tab ye 19% hissa hamare sabhi shuruati partners mein Barabar
              (Equally) baanta jayega.
            </p>
          </div>

          {/* Legal Commitment Clause */}
          <p
            className="mt-6 text-sm sm:text-base italic text-center px-2"
            style={{
              color: "rgba(212,175,55,0.8)",
              maxWidth: "700px",
              margin: "1.5rem auto 0",
            }}
            data-ocid="equity_partnership.panel"
          >
            &ldquo;We are fully committed to this vision and are ready to sign a
            Legal Agreement with our founding partners to ensure transparency
            and trust.&rdquo;
          </p>

          {/* CTA Button */}
          <div
            className="mt-8 flex justify-center"
            data-ocid="equity_partnership.primary_button"
          >
            <a
              href="https://wa.me/918700722663?text=Assalam%20Alaikum%20Sufiyan%20Bhai%2C%20I%20am%20interested%20in%20joining%20the%20A.S.K%20Equity%20Partnership%20Vision.%20Please%20share%20the%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm sm:text-base transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #f0cc55 50%, #D4AF37 100%)",
                color: "#000",
                boxShadow:
                  "0 4px 24px rgba(212,175,55,0.45), 0 0 0 2px rgba(212,175,55,0.2)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              🤝 Contact MD Sufiyan to Join the Vision
            </a>
          </div>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 text-center"
        style={{
          background: "#001540",
          borderTop: "1px solid rgba(212,175,55,0.25)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <img
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
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
          <p
            className="text-sm mt-2 tracking-wide"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            A.S.K Fresh Supply — Building the Future of Institutional Catering
            by 2036.
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
      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <a
        href="https://wa.me/918700722663?text=Hi%20A.S.K%20Team%2C%20I%20am%20from%20the%20Purchase%20Dept%20of%20%5BVenue%20Name%5D.%20Send%20me%20your%20Sample%20Catalog."
        target="_blank"
        rel="noreferrer"
        data-ocid="floating.whatsapp.cta"
        className="fixed flex items-center gap-3 z-[60] rounded-full font-black text-sm uppercase tracking-wider"
        style={{
          bottom: "24px",
          right: "20px",
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          color: "#fff",
          padding: "16px 26px",
          boxShadow:
            "0 8px 32px rgba(37,211,102,0.6), 0 4px 12px rgba(0,0,0,0.5), 0 0 0 4px rgba(37,211,102,0.2)",
          animation: "whatsapp-float 2.8s ease-in-out infinite",
          touchAction: "manipulation",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-label="WhatsApp"
          style={{ flexShrink: 0 }}
        >
          <title>WhatsApp</title>
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.773L0 32l8.49-2.006A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.782-1.853l-.485-.288-5.037 1.188 1.22-4.9-.317-.5A13.268 13.268 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.333-9.974c-.4-.2-2.366-1.168-2.733-1.301-.367-.133-.634-.2-.9.2-.267.4-1.034 1.301-1.267 1.568-.233.267-.467.3-.867.1-.4-.2-1.688-.622-3.216-1.984-1.188-1.059-1.99-2.368-2.223-2.768-.233-.4-.025-.616.175-.816.181-.181.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.966-.325-.779-.655-.673-.9-.686-.232-.013-.5-.013-.767-.013s-.7.1-1.067.5c-.367.4-1.4 1.367-1.4 3.334s1.433 3.867 1.633 4.133c.2.267 2.817 4.3 6.825 6.033.954.413 1.698.66 2.278.845.957.305 1.828.262 2.516.159.768-.114 2.366-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z" />
        </svg>
        <span className="hidden sm:inline">Get a Quote</span>
        <span className="sm:hidden">Quote</span>
      </a>
    </div>
  );
}
