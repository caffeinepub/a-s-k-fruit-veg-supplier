import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import {
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  retailPrice: number;
  wholesalePrice: number;
  unit: string;
  category: string;
  hindiCategory: string;
}

const CATEGORIES = [
  {
    id: "roots",
    label: "Roots & Tubers",
    hindiLabel: "जड़ें और कंद",
    color: "bg-amber-100 border-amber-400 text-amber-800",
    dot: "bg-amber-500",
  },
  {
    id: "greens",
    label: "Fresh Leafy Greens",
    hindiLabel: "हरी पत्तेदार सब्जियां",
    color: "bg-emerald-100 border-emerald-400 text-emerald-800",
    dot: "bg-emerald-500",
  },
  {
    id: "vegetables",
    label: "Vegetables",
    hindiLabel: "सब्जियां",
    color: "bg-orange-100 border-orange-400 text-orange-800",
    dot: "bg-orange-500",
  },
];

const PRODUCTS: Product[] = [
  // Roots & Tubers
  {
    id: "aloo",
    name: "Aloo",
    hindiName: "आलू",
    emoji: "🥔",
    retailPrice: 10,
    wholesalePrice: 10,
    unit: "kg",
    category: "roots",
    hindiCategory: "जड़ें और कंद",
  },
  {
    id: "gajar",
    name: "Gajar",
    hindiName: "गाजर",
    emoji: "🥕",
    retailPrice: 27,
    wholesalePrice: 27,
    unit: "kg",
    category: "roots",
    hindiCategory: "जड़ें और कंद",
  },
  {
    id: "mooli",
    name: "Mooli",
    hindiName: "मूली",
    emoji: "🌿",
    retailPrice: 15,
    wholesalePrice: 15,
    unit: "kg",
    category: "roots",
    hindiCategory: "जड़ें और कंद",
  },
  {
    id: "arbi",
    name: "Arbi",
    hindiName: "अरबी",
    emoji: "🫚",
    retailPrice: 55,
    wholesalePrice: 55,
    unit: "kg",
    category: "roots",
    hindiCategory: "जड़ें और कंद",
  },
  {
    id: "chukandar",
    name: "Chukandar",
    hindiName: "चुकन्दर",
    emoji: "🫀",
    retailPrice: 28,
    wholesalePrice: 28,
    unit: "kg",
    category: "roots",
    hindiCategory: "जड़ें और कंद",
  },
  // Fresh Leafy Greens
  {
    id: "palak",
    name: "Palak",
    hindiName: "पालक",
    emoji: "🥬",
    retailPrice: 17,
    wholesalePrice: 17,
    unit: "kg",
    category: "greens",
    hindiCategory: "हरी पत्तेदार सब्जियां",
  },
  {
    id: "methi",
    name: "Methi",
    hindiName: "मेथी",
    emoji: "🌿",
    retailPrice: 30,
    wholesalePrice: 30,
    unit: "kg",
    category: "greens",
    hindiCategory: "हरी पत्तेदार सब्जियां",
  },
  {
    id: "bathua",
    name: "Bathua",
    hindiName: "बथुआ",
    emoji: "🍃",
    retailPrice: 50,
    wholesalePrice: 50,
    unit: "kg",
    category: "greens",
    hindiCategory: "हरी पत्तेदार सब्जियां",
  },
  {
    id: "sarson",
    name: "Sarson ka Saag",
    hindiName: "सरसों का साग",
    emoji: "🥦",
    retailPrice: 30,
    wholesalePrice: 30,
    unit: "kg",
    category: "greens",
    hindiCategory: "हरी पत्तेदार सब्जियां",
  },
  {
    id: "pudina",
    name: "Pudina",
    hindiName: "पुदीना",
    emoji: "🌱",
    retailPrice: 60,
    wholesalePrice: 60,
    unit: "kg",
    category: "greens",
    hindiCategory: "हरी पत्तेदार सब्जियां",
  },
  {
    id: "dhaniya",
    name: "Dhaniya",
    hindiName: "धनिया",
    emoji: "🌿",
    retailPrice: 30,
    wholesalePrice: 30,
    unit: "unit",
    category: "greens",
    hindiCategory: "हरी पत्तेदार सब्जियां",
  },
  // Vegetables
  {
    id: "baingan",
    name: "Baingan",
    hindiName: "बैंगन",
    emoji: "🍆",
    retailPrice: 40,
    wholesalePrice: 40,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "tamatar",
    name: "Tamatar",
    hindiName: "टमाटर",
    emoji: "🍅",
    retailPrice: 27,
    wholesalePrice: 27,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "pyaaz",
    name: "Pyaaz",
    hindiName: "प्याज़",
    emoji: "🧅",
    retailPrice: 24,
    wholesalePrice: 24,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "bhindi",
    name: "Bhindi",
    hindiName: "भिंडी",
    emoji: "🫛",
    retailPrice: 70,
    wholesalePrice: 70,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "lauki",
    name: "Lauki",
    hindiName: "लौकी",
    emoji: "🥒",
    retailPrice: 28,
    wholesalePrice: 28,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "tori",
    name: "Tori",
    hindiName: "तोरी",
    emoji: "🥬",
    retailPrice: 44,
    wholesalePrice: 44,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "karela",
    name: "Karela",
    hindiName: "करेला",
    emoji: "🥒",
    retailPrice: 55,
    wholesalePrice: 55,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "parwal",
    name: "Parwal",
    hindiName: "परवल",
    emoji: "🫑",
    retailPrice: 60,
    wholesalePrice: 60,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "mirch",
    name: "Mirch",
    hindiName: "मिर्च",
    emoji: "🌶️",
    retailPrice: 50,
    wholesalePrice: 50,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "shimla",
    name: "Shimla Mirch",
    hindiName: "शिमला मिर्च",
    emoji: "🫑",
    retailPrice: 56,
    wholesalePrice: 56,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "lal-pili",
    name: "Lal Pili Shimla",
    hindiName: "लाल पीली शिमला",
    emoji: "🌈",
    retailPrice: 160,
    wholesalePrice: 160,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "adrak",
    name: "Adrak",
    hindiName: "अदरक",
    emoji: "🫚",
    retailPrice: 86,
    wholesalePrice: 86,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "lahsun",
    name: "Lahsun Chila",
    hindiName: "लहसुन छिला",
    emoji: "🧄",
    retailPrice: 160,
    wholesalePrice: 160,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "patta-gobhi",
    name: "Patta Gobhi",
    hindiName: "पत्ता गोभी",
    emoji: "🥬",
    retailPrice: 16,
    wholesalePrice: 16,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "phool-gobhi",
    name: "Phool Gobhi",
    hindiName: "फूल गोभी",
    emoji: "🥦",
    retailPrice: 55,
    wholesalePrice: 55,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    hindiName: "ब्रोकोली",
    emoji: "🥦",
    retailPrice: 160,
    wholesalePrice: 160,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "matar",
    name: "Matar Safal",
    hindiName: "मटर सफल",
    emoji: "🫛",
    retailPrice: 75,
    wholesalePrice: 75,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "sweet-corn",
    name: "Sweet Corn",
    hindiName: "स्वीट कॉर्न",
    emoji: "🌽",
    retailPrice: 120,
    wholesalePrice: 120,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "beans",
    name: "Beans",
    hindiName: "बीन्स",
    emoji: "🫘",
    retailPrice: 55,
    wholesalePrice: 55,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "kaddu",
    name: "Kaddu",
    hindiName: "कद्दू",
    emoji: "🎃",
    retailPrice: 22,
    wholesalePrice: 22,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "mushroom",
    name: "Mushroom",
    hindiName: "मशरूम",
    emoji: "🍄",
    retailPrice: 180,
    wholesalePrice: 180,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "sprouts",
    name: "Sprouts Daal",
    hindiName: "स्प्राउट्स दाल",
    emoji: "🌱",
    retailPrice: 140,
    wholesalePrice: 140,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
  {
    id: "salad-patta",
    name: "Salad Patta",
    hindiName: "सलाद पत्ता",
    emoji: "🥗",
    retailPrice: 40,
    wholesalePrice: 40,
    unit: "kg",
    category: "vegetables",
    hindiCategory: "सब्जियां",
  },
];

const WA_NUMBER = "918700722663";
const RATES_MESSAGE = "Hello A.S.K Team, I want to check today's fresh rates.";
const RATES_WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(RATES_MESSAGE)}`;

type OrderType = "retail" | "wholesale";

function buildInvoiceWhatsAppUrl(
  quantities: Record<string, number>,
  _orderType: OrderType,
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

function buildWhatsAppUrl(
  quantities: Record<string, number>,
  orderType: OrderType,
): string | null {
  const items = PRODUCTS.filter((p) => quantities[p.id] > 0);
  if (items.length === 0) return null;
  const price = (p: Product) =>
    orderType === "retail" ? p.retailPrice : p.wholesalePrice;
  const lines = items.map(
    (p) =>
      `- ${p.name} (${p.hindiName}): ${quantities[p.id]} ${p.unit} @ ₹${price(p)}/kg = ₹${quantities[p.id] * price(p)}`,
  );
  const total = items.reduce((sum, p) => sum + quantities[p.id] * price(p), 0);
  const typeLabel = orderType === "retail" ? "Retail" : "Wholesale";
  const message = [
    `Namaste! A.S.K Fruit & Vegetables Supplier se ${typeLabel} order karna chahta/chahti hoon:`,
    ...lines,
    `Total: ₹${total}`,
    `Order Type: ${typeLabel}`,
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function totalItems(quantities: Record<string, number>): number {
  return Object.values(quantities).filter((v) => v > 0).length;
}

function totalCost(
  quantities: Record<string, number>,
  orderType: OrderType,
): number {
  return PRODUCTS.reduce(
    (sum, p) =>
      sum +
      (quantities[p.id] || 0) *
        (orderType === "retail" ? p.retailPrice : p.wholesalePrice),
    0,
  );
}

// ── PWA Install Prompt ──
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
    if (outcome === "accepted") {
      setShowBanner(false);
      deferredPrompt.current = null;
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem("pwa-install-dismissed", "1");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 260 }}
          className="fixed bottom-24 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-80"
          data-ocid="pwa.install.toast"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-green-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500 to-green-700" />
            <div className="flex items-center gap-3 p-4">
              <img
                src="/assets/uploads/IMG_2653-1-1.png"
                alt="A.S.K Logo"
                className="w-12 h-12 rounded-xl flex-shrink-0 shadow-sm object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 leading-tight">
                  Install Our App
                </p>
                <p className="font-hindi text-xs text-green-700 mt-0.5">
                  अपने फोन पर इंस्टॉल करें
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Quick access to fresh sabzi rates
                </p>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                data-ocid="pwa.install.close_button"
                className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Dismiss install prompt"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
            <div className="px-4 pb-4">
              <button
                type="button"
                onClick={handleInstall}
                data-ocid="pwa.install.primary_button"
                className="w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>📲</span>
                <span>Install App</span>
                <span className="font-hindi text-xs opacity-85">
                  | इंस्टॉल करें
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const PARTNERS = [
  {
    name: "Adnan",
    role: "Managing Partner",
    hindiRole: "प्रबंध भागीदार",
    initial: "A",
  },
  {
    name: "Sufiyan A.S.K",
    role: "Managing Partner",
    hindiRole: "प्रबंध भागीदार",
    initial: "S",
  },
  {
    name: "Shad A.S.K",
    role: "Managing Partner",
    hindiRole: "प्रबंध भागीदार",
    initial: "S",
  },
];

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])),
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("retail");
  const [unitTypes, setUnitTypes] = useState<Record<string, "Kg" | "Bag">>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, "Kg"])),
  );
  const [customerName, setCustomerName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const adjust = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  const handleOrder = () => {
    const url = buildWhatsAppUrl(quantities, orderType);
    if (!url) {
      toast.error("Please add at least one item to your order!");
      return;
    }
    window.open(url, "_blank");
  };

  const handleGenerateInvoice = () => {
    const url = buildInvoiceWhatsAppUrl(
      quantities,
      orderType,
      customerName,
      unitTypes,
    );
    if (!url) {
      toast.error("Please add at least one item to your cart!");
      return;
    }
    window.open(url, "_blank");
  };

  const handleClearCart = () => {
    setQuantities(Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])));
    toast.success("Cart cleared | कार्ट साफ हो गया");
  };

  const itemCount = totalItems(quantities);
  const orderTotal = totalCost(quantities, orderType);

  const cartItems = PRODUCTS.filter((p) => quantities[p.id] > 0);
  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hindiName.includes(searchQuery),
  );

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Sabzi & Rates", href: "#products" },
    { label: "Smart Cart 🛒", href: "#smart-cart" },
    { label: "Leadership", href: "#leadership" },
    { label: "About", href: "#about" },
    { label: "Sampark", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-center" />

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src="/assets/uploads/IMG_2653-1-1.png"
                alt="A.S.K Golden Eagle Logo"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-heading text-lg font-bold tracking-wide">
                  <span className="text-cta">A.S.K</span>
                  <span className="text-white ml-2 text-sm font-semibold hidden sm:inline">
                    Fruit & Vegetables Supplier
                  </span>
                </span>
                <span className="text-white/60 text-xs hidden sm:block font-hindi">
                  फल और सब्जी के थोक विक्रेता
                </span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
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
        <div className="absolute inset-0 bg-brand-dark/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-cta/20 text-cta border border-cta/30 px-4 py-1.5 rounded-full text-sm font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                Specialist in Ghaziabad & Delhi NCR Supply
              </span>
              <span className="inline-flex items-center bg-white/10 text-white/90 border border-white/20 px-4 py-1.5 rounded-full text-sm font-hindi">
                गाज़ियाबाद और दिल्ली एनसीआर सप्लाई
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-tight mb-2">
              <span className="text-cta">A.S.K</span>{" "}
              <span className="text-white">Fruit &</span>
            </h1>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase leading-tight mb-2">
              Vegetables Supplier
            </h2>
            <p className="font-hindi text-xl text-cta mb-6">
              फल और सब्जी के थोक विक्रेता
            </p>
            <p className="text-white/80 text-base sm:text-lg mb-3 leading-relaxed font-medium">
              Wholesale & Retail Supply | Ghaziabad & Delhi NCR
            </p>
            <p className="font-hindi text-white/70 text-base mb-8">
              थोक और रिटेल | ताज़ी सब्ज़ी, सीधे मंडी से
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-white text-brand-dark px-5 py-2 rounded-full text-sm font-bold shadow-sm">
                🥬 ताज़ी सब्ज़ी रोज़ाना
              </span>
              <span className="inline-flex items-center gap-2 bg-cta text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm">
                💰 Wholesale & Retail Rates
              </span>
              <span className="inline-flex items-center font-hindi bg-white/10 text-white border border-white/25 px-5 py-2 rounded-full text-sm">
                🚚 घर पर डिलीवरी
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                data-ocid="hero.shop_now.button"
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105 active:scale-95 font-heading"
              >
                🛒 Rates Dekho
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: "🏪", label: "Local Mandi Quality" },
                { icon: "⚡", label: "Same Day Delivery" },
                { icon: "📍", label: "Ghaziabad & Delhi NCR" },
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

      {/* ── ORDER TYPE SELECTOR ── */}
      <section className="bg-cta py-4 sticky top-16 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-bold text-sm font-hindi">
            आप कौन से दाम देखना चाहते हैं?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOrderType("retail")}
              data-ocid="order_type.retail.button"
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                orderType === "retail"
                  ? "bg-white text-brand-dark shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              🏠 Retail Rate
            </button>
            <button
              type="button"
              onClick={() => setOrderType("wholesale")}
              data-ocid="order_type.wholesale.button"
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                orderType === "wholesale"
                  ? "bg-white text-brand-dark shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              📦 Wholesale Rate
            </button>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-20 bg-mandi-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <span className="text-brand-mid text-sm font-bold uppercase tracking-widest">
              Aaj Ki Sabzi | आज की सब्ज़ी
            </span>
            <h2 className="font-heading text-4xl font-black text-brand-dark uppercase mt-2">
              Sabzi & Rates
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              Select items & quantity, then generate a professional invoice and
              send via WhatsApp.
            </p>
          </motion.div>
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sabzi... (e.g. Arbi, Mushroom)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-ocid="products.search_input"
                className="w-full pl-9 pr-4 py-2.5 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cta/30"
              />
            </div>
          </div>
          <div className="text-center mb-10">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                orderType === "retail"
                  ? "bg-cta/15 text-cta border border-cta/30"
                  : "bg-brand-mid/15 text-brand-mid border border-brand-mid/30"
              }`}
            >
              {orderType === "retail"
                ? "🏠 Retail Rates Showing"
                : "📦 Wholesale Rates Showing"}
            </span>
          </div>
          <div data-ocid="products.list" className="space-y-12">
            {searchQuery ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    >
                      <ProductCard
                        product={product}
                        quantity={quantities[product.id]}
                        onAdjust={(delta) => adjust(product.id, delta)}
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
                        orderType={orderType}
                      />
                    </motion.div>
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <div
                    className="text-center py-12 text-muted-foreground"
                    data-ocid="products.empty_state"
                  >
                    <p className="text-lg font-semibold">No items found</p>
                    <p className="font-hindi text-sm mt-1">कोई सब्ज़ी नहीं मिली</p>
                  </div>
                )}
              </div>
            ) : (
              CATEGORIES.map((cat) => {
                const catProducts = PRODUCTS.filter(
                  (p) => p.category === cat.id,
                );
                let globalIndex = PRODUCTS.indexOf(catProducts[0]);
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`inline-flex items-center gap-3 border-2 rounded-2xl px-5 py-2.5 mb-6 ${cat.color}`}
                    >
                      <span className={`w-3 h-3 rounded-full ${cat.dot}`} />
                      <h3 className="font-heading text-lg font-black uppercase tracking-wide">
                        {cat.label}
                      </h3>
                      <span className="font-hindi text-base font-semibold opacity-75">
                        {cat.hindiLabel}
                      </span>
                      <span className="text-xs font-bold opacity-60 ml-1">
                        ({catProducts.length} items)
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catProducts.map((product, i) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                          <ProductCard
                            product={product}
                            quantity={quantities[product.id]}
                            onAdjust={(delta) => adjust(product.id, delta)}
                            onQuantityChange={(v) =>
                              setQuantities((prev) => ({
                                ...prev,
                                [product.id]: v,
                              }))
                            }
                            unitType={unitTypes[product.id]}
                            onUnitChange={(u) =>
                              setUnitTypes((prev) => ({
                                ...prev,
                                [product.id]: u,
                              }))
                            }
                            index={globalIndex + i + 1}
                            orderType={orderType}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* ── SMART CART ── */}
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                id="smart-cart"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.4 }}
                className="mt-14"
                data-ocid="smart_cart.panel"
              >
                {/* Customer Name */}
                <div className="mb-4">
                  <label
                    htmlFor="customer-name-input"
                    className="block text-sm font-semibold text-brand-dark mb-1"
                  >
                    Customer Name | ग्राहक का नाम
                  </label>
                  <input
                    id="customer-name-input"
                    type="text"
                    placeholder="Enter your name..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    data-ocid="smart_cart.customer_name.input"
                    className="w-full max-w-sm border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cta/30"
                  />
                </div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-cta" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-black text-brand-dark uppercase leading-tight">
                      Smart Cart
                    </h2>
                    <p className="font-hindi text-sm text-brand-mid font-semibold">
                      स्मार्ट कार्ट 🛒
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        orderType === "retail"
                          ? "bg-cta/15 text-cta border border-cta/30"
                          : "bg-brand-mid/15 text-brand-mid border border-brand-mid/30"
                      }`}
                    >
                      {orderType === "retail" ? "🏠 Retail" : "📦 Wholesale"}
                    </span>
                  </div>
                </div>

                {/* Cart Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-brand-dark text-white">
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-5">Item | सब्ज़ी</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-2 text-right">Rate</div>
                      <div className="col-span-2 text-right">Amount</div>
                    </div>
                  </div>

                  {/* Cart Rows */}
                  <div className="divide-y divide-border">
                    {cartItems.map((product, i) => {
                      const rate =
                        orderType === "retail"
                          ? product.retailPrice
                          : product.wholesalePrice;
                      const qty = quantities[product.id];
                      const amount = qty * rate;
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2, delay: i * 0.04 }}
                          className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-secondary/50 transition-colors"
                          data-ocid={`smart_cart.item.${i + 1}`}
                        >
                          <div className="col-span-1 text-center">
                            <span className="w-6 h-6 rounded-full bg-cta/15 text-cta text-xs font-bold flex items-center justify-center">
                              {i + 1}
                            </span>
                          </div>
                          <div className="col-span-5">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{product.emoji}</span>
                              <div>
                                <p className="font-semibold text-brand-dark text-sm">
                                  {product.name}
                                </p>
                                <p className="font-hindi text-xs text-muted-foreground">
                                  {product.hindiName}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <span className="inline-block bg-secondary text-brand-dark text-xs font-bold px-2 py-1 rounded-lg">
                              {qty} {unitTypes[product.id]}
                            </span>
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="text-sm text-muted-foreground">
                              ₹{rate}/kg
                            </span>
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="font-bold text-cta text-sm">
                              ₹{amount}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Summary Row */}
                  <div className="bg-brand-dark/5 border-t-2 border-brand-dark/20 px-4 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Total Items
                          </p>
                          <p className="font-heading text-2xl font-black text-brand-dark">
                            {itemCount}
                          </p>
                        </div>
                        <div className="w-px h-10 bg-border" />
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Total Amount
                          </p>
                          <p className="font-heading text-2xl font-black text-cta">
                            ₹{orderTotal}
                          </p>
                        </div>
                        <div className="hidden sm:block">
                          <p className="font-hindi text-xs text-muted-foreground">
                            {orderType === "retail" ? "रिटेल रेट" : "थोक रेट"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  {/* Generate Invoice Button */}
                  <motion.button
                    type="button"
                    onClick={handleGenerateInvoice}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    data-ocid="smart_cart.generate_invoice.primary_button"
                    className="flex-1 flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold px-8 py-5 rounded-2xl text-base shadow-xl transition-colors"
                  >
                    <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
                    <div className="text-left">
                      <p className="font-heading text-base leading-tight">
                        Send Order to WhatsApp
                      </p>
                      <p className="font-hindi text-xs opacity-85 leading-tight">
                        ऑर्डर समरी बनाएं
                      </p>
                    </div>
                    <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-lg font-normal">
                      Invoice
                    </span>
                  </motion.button>

                  {/* Clear Cart Button */}
                  <motion.button
                    type="button"
                    onClick={handleClearCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    data-ocid="smart_cart.clear.delete_button"
                    className="flex items-center justify-center gap-2 bg-white border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-500 font-semibold px-6 py-5 rounded-2xl text-sm transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <div className="text-left">
                      <p className="leading-tight">Clear Cart</p>
                      <p className="font-hindi text-xs opacity-75 leading-tight">
                        कार्ट साफ करें
                      </p>
                    </div>
                  </motion.button>
                </div>

                {/* Invoice Preview Note */}
                <div className="mt-4 flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <span className="text-green-600 text-sm mt-0.5">📋</span>
                  <p className="text-xs text-green-700 leading-relaxed">
                    <span className="font-semibold">
                      Professional Invoice Format:
                    </span>{" "}
                    Your order summary will be sent as a formatted invoice
                    directly to WhatsApp with itemized list, quantities, rates,
                    and total amount.
                    <span className="font-hindi block mt-0.5">
                      आपका ऑर्डर एक प्रोफेशनल इनवॉइस के रूप में WhatsApp पर भेजा जाएगा।
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Old summary panel kept for legacy - replaced by smart cart above */}
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35 }}
                className="mt-6 bg-brand-dark/10 border border-brand-dark/20 rounded-2xl p-4 text-center"
              >
                <p className="text-brand-dark text-sm font-semibold">
                  👆 Scroll up to see your Smart Cart | ऊपर स्क्रॉल करके अपना स्मार्ट
                  कार्ट देखें
                </p>
                <a
                  href="#smart-cart"
                  data-ocid="order.view_cart.button"
                  className="inline-flex items-center gap-2 mt-2 bg-brand-dark text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-brand-mid transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  View Smart Cart
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section id="leadership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-brand-mid text-sm font-bold uppercase tracking-widest">
              Our Leadership
            </span>
            <div className="flex items-center justify-center gap-3 mt-2">
              <img
                src="/assets/uploads/IMG_2664-1.jpeg"
                alt="A.S.K Golden Eagle"
                className="w-10 h-10 rounded-full object-cover shadow"
              />
              <h2 className="font-heading text-4xl font-black text-brand-dark uppercase">
                Team A.S.K
              </h2>
              <img
                src="/assets/uploads/IMG_2664-1.jpeg"
                alt="A.S.K Golden Eagle"
                className="w-10 h-10 rounded-full object-cover shadow"
              />
            </div>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              A.S.K is led by a dedicated team of partners committed to
              delivering the freshest produce and the best service across
              Ghaziabad & Delhi NCR.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-card border border-border p-8 flex flex-col items-center text-center gap-4"
                data-ocid={`leadership.partner.${i + 1}`}
              >
                <div className="w-20 h-20 rounded-full bg-brand-dark flex items-center justify-center shadow-lg">
                  <span className="text-cta font-heading text-3xl font-black">
                    {partner.initial}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-dark">
                    {partner.name}
                  </h3>
                  <p className="text-cta font-semibold text-sm mt-1">
                    {partner.role}
                  </p>
                  <p className="font-hindi text-muted-foreground text-xs mt-1">
                    {partner.hindiRole}
                  </p>
                </div>
                <a
                  href={RATES_WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`leadership.partner.${i + 1}.button`}
                  className="flex items-center gap-2 bg-whatsapp/10 hover:bg-whatsapp/20 text-whatsapp border border-whatsapp/30 px-4 py-2 rounded-full text-xs font-semibold transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  Connect on WhatsApp
                </a>
              </motion.div>
            ))}
          </div>
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
              Hamare Baare Mein
            </span>
            <h2 className="font-heading text-4xl font-black text-brand-dark uppercase mt-2">
              About Us | हमारे बारे में
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              A.S.K Fruit & Vegetables Supplier is a trusted local wholesale and
              retail supplier of fresh fruits and vegetables — serving Ghaziabad
              and Delhi NCR. We source directly from the mandi to ensure the
              freshest produce at the best rates.
            </p>
            <p className="font-hindi text-brand-mid mt-2 text-sm">
              गाज़ियाबाद और दिल्ली एनसीआर में थोक और रिटेल सप्लाई
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Farm Fresh",
                hindi: "ताज़ा खेत से",
                desc: "Every item is sourced fresh from the mandi daily. Maximum freshness guaranteed on every order.",
              },
              {
                icon: <ShoppingBag className="w-8 h-8" />,
                title: "Retail & Wholesale",
                hindi: "रिटेल और थोक दोनों",
                desc: "Whether you need 1 kg for home or bulk for your shop — we have rates for everyone. No minimum order.",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Local Delivery",
                hindi: "गाज़ियाबाद और दिल्ली एनसीआर",
                desc: "Fast local delivery across Ghaziabad and Delhi NCR. Order on WhatsApp and we'll bring it to your door.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card flex flex-col items-center text-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-brand-dark/10 flex items-center justify-center text-brand-mid">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-dark">
                  {feature.title}
                </h3>
                <p className="font-hindi text-sm text-brand-mid font-medium">
                  {feature.hindi}
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
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
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="/assets/uploads/IMG_2653-1-1.png"
                  alt="A.S.K Golden Eagle"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="font-heading text-2xl font-bold">
                  <span className="text-cta">A.S.K</span>{" "}
                  <span className="text-white">Fruit & Veg</span>
                </div>
              </div>
              <p className="font-hindi text-white/50 text-xs mb-3">
                फल और सब्जी के थोक विक्रेता
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Local wholesale & retail supplier of fresh fruits and
                vegetables. Serving Ghaziabad & Delhi NCR with the freshest
                mandi produce.
              </p>
              <p className="font-hindi text-cta text-xs mt-2">
                गाज़ियाबाद और दिल्ली एनसीआर के विशेषज्ञ
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase tracking-wider text-sm mb-4 text-white/80">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Sabzi & Rates", href: "#products" },
                  { label: "Smart Cart 🛒", href: "#smart-cart" },
                  { label: "Leadership", href: "#leadership" },
                  { label: "About Us", href: "#about" },
                  { label: "Sampark", href: "#contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      data-ocid={`footer.${l.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase tracking-wider text-sm mb-4 text-white/80">
                Sampark Karein | संपर्क करें
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
                <div className="flex items-start gap-3 px-4 py-3">
                  <MapPin className="w-5 h-5 text-white/50 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/50">
                      Shop Address | दुकान का पता
                    </p>
                    <p className="text-white font-semibold text-sm">
                      Shop No. Sahibabad SB20
                    </p>
                    <p className="text-white/70 text-sm">Ghaziabad</p>
                  </div>
                </div>
                <a
                  href="mailto:ask.global.exports.official@gmail.com"
                  data-ocid="footer.email.link"
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <Mail className="w-5 h-5 text-white/50 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/50">Official Email</p>
                    <p className="text-white font-semibold text-xs break-all">
                      ask.global.exports.official@gmail.com
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-3 px-4 py-3">
                  <Phone className="w-5 h-5 text-white/50" />
                  <div>
                    <p className="text-xs text-white/50">
                      Service Area | सेवा क्षेत्र
                    </p>
                    <p className="text-white font-semibold text-sm">
                      Ghaziabad & Delhi NCR
                    </p>
                    <p className="font-hindi text-white/50 text-xs">
                      गाज़ियाबाद और दिल्ली एनसीआर
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <span>
              © {new Date().getFullYear()} A.S.K Fruit & Vegetables Supplier.
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
          <span className="hidden sm:flex items-center gap-1">
            <span>ORDER NOW</span>
            <span className="font-hindi text-xs opacity-80">| अभी ऑर्डर करें</span>
          </span>
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-cta text-white border-0 p-0 text-xs">
              {itemCount}
            </Badge>
          )}
        </button>
      </motion.div>

      {/* ── STICKY CART BUTTON ── */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <a
              href="#smart-cart"
              data-ocid="sticky_cart.view_order.button"
              className="flex items-center gap-3 bg-brand-dark text-white px-6 py-3.5 rounded-full shadow-2xl font-bold text-sm hover:bg-brand-mid transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-cta" />
              <span>View My Order</span>
              <span className="bg-cta text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PWA INSTALL PROMPT ── */}
      <InstallPrompt />
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  quantity,
  onAdjust,
  onQuantityChange,
  unitType,
  onUnitChange,
  index,
  orderType,
}: {
  product: Product;
  quantity: number;
  onAdjust: (delta: number) => void;
  onQuantityChange: (value: number) => void;
  unitType: "Kg" | "Bag";
  onUnitChange: (unit: "Kg" | "Bag") => void;
  index: number;
  orderType: OrderType;
}) {
  const activePrice =
    orderType === "retail" ? product.retailPrice : product.wholesalePrice;
  const subtotal = quantity * activePrice;

  return (
    <div
      className={`bg-white rounded-2xl shadow-card border border-border p-6 flex flex-col items-center text-center gap-4 transition-all hover:shadow-lg hover:-translate-y-1 ${
        quantity > 0 ? "ring-2 ring-cta" : ""
      }`}
      data-ocid={`products.item.${index}`}
    >
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-5xl">
        {product.emoji}
      </div>
      <div>
        <h3 className="font-heading text-lg font-bold text-brand-dark">
          {product.name}
        </h3>
        <p className="font-hindi text-xs text-muted-foreground">
          {product.hindiName}
        </p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="text-cta font-black text-2xl">
            ₹{activePrice}
            <span className="text-sm font-normal text-muted-foreground">
              /{product.unit}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            Retail: ₹{product.retailPrice}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            Wholesale: ₹{product.wholesalePrice}
          </span>
        </div>
      </div>
      <div
        className="w-full flex flex-col gap-2"
        data-ocid={`products.qty.${index}`}
      >
        {/* Number input row */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAdjust(-1)}
            disabled={quantity <= 0}
            data-ocid={`products.minus.${index}`}
            className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center font-bold text-brand-dark hover:bg-brand-dark hover:text-white disabled:opacity-40 transition-colors"
            aria-label={`Decrease ${product.name} quantity`}
          >
            −
          </button>
          <input
            type="number"
            min={0}
            value={quantity === 0 ? "" : quantity}
            onChange={(e) => {
              const val = Number.parseFloat(e.target.value);
              onQuantityChange(Number.isNaN(val) || val < 0 ? 0 : val);
            }}
            placeholder="0"
            data-ocid={`products.qty_input.${index}`}
            className="flex-1 text-center font-bold text-brand-dark border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cta/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => onAdjust(1)}
            data-ocid={`products.plus.${index}`}
            className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold hover:bg-brand-mid transition-colors"
            aria-label={`Increase ${product.name} quantity`}
          >
            +
          </button>
        </div>
        {/* Kg / Bag toggle */}
        <div className="flex items-center justify-center gap-1 bg-secondary rounded-full p-1">
          {(["Kg", "Bag"] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => onUnitChange(u)}
              data-ocid={`products.unit_toggle.${index}`}
              className={`flex-1 py-1 rounded-full text-xs font-bold transition-all ${
                unitType === u
                  ? "bg-brand-dark text-white shadow-sm"
                  : "text-muted-foreground hover:text-brand-dark"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
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
            <div className="bg-cta text-white font-semibold text-sm rounded-xl py-2 px-4">
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
            <div className="text-muted-foreground text-xs font-hindi">
              + दबाएं और ऑर्डर करें
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        data-ocid={`products.order.${index}`}
        onClick={() => {
          const qty = quantity > 0 ? quantity : 1;
          const unit = unitType;
          const msg = [
            "New Order for A.S.K:",
            `- ${product.name}: ${qty} ${unit} @ ₹${activePrice}/${product.unit}`,
            "-----------------------",
            "Customer Name: ",
          ].join("\n");
          window.open(
            `https://wa.me/918700722663?text=${encodeURIComponent(msg)}`,
            "_blank",
          );
        }}
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] active:scale-95 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-sm"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Order on WhatsApp
      </button>
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
