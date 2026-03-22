import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import {
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
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
}

const PRODUCTS: Product[] = [
  {
    id: "aloo",
    name: "Aloo",
    hindiName: "आलू",
    emoji: "🥔",
    retailPrice: 20,
    wholesalePrice: 18,
    unit: "kg",
  },
  {
    id: "tamatar",
    name: "Tamatar",
    hindiName: "टमाटर",
    emoji: "🍅",
    retailPrice: 32,
    wholesalePrice: 29,
    unit: "kg",
  },
  {
    id: "lehsun",
    name: "Lehsun",
    hindiName: "लहसुन",
    emoji: "🧄",
    retailPrice: 160,
    wholesalePrice: 150,
    unit: "kg",
  },
  {
    id: "pyaz",
    name: "Pyaz",
    hindiName: "प्याज़",
    emoji: "🧅",
    retailPrice: 30,
    wholesalePrice: 28,
    unit: "kg",
  },
  {
    id: "adrak",
    name: "Adrak",
    hindiName: "अदरक",
    emoji: "🫚",
    retailPrice: 100,
    wholesalePrice: 90,
    unit: "kg",
  },
  {
    id: "gajar",
    name: "Gajar",
    hindiName: "गाजर",
    emoji: "🥕",
    retailPrice: 30,
    wholesalePrice: 28,
    unit: "kg",
  },
  {
    id: "mooli",
    name: "Mooli",
    hindiName: "मूली",
    emoji: "🌿",
    retailPrice: 22,
    wholesalePrice: 20,
    unit: "kg",
  },
  {
    id: "chukandar",
    name: "Chukandar",
    hindiName: "चुकन्दर",
    emoji: "🫀",
    retailPrice: 35,
    wholesalePrice: 30,
    unit: "kg",
  },
  {
    id: "palak",
    name: "Palak",
    hindiName: "पालक",
    emoji: "🥬",
    retailPrice: 18,
    wholesalePrice: 15,
    unit: "kg",
  },
  {
    id: "pattagobhi",
    name: "Pattagobhi",
    hindiName: "पत्तागोभी",
    emoji: "🥦",
    retailPrice: 12,
    wholesalePrice: 10,
    unit: "kg",
  },
  {
    id: "phoolgobhi",
    name: "Phoolgobhi",
    hindiName: "फूलगोभी",
    emoji: "🥦",
    retailPrice: 100,
    wholesalePrice: 90,
    unit: "kg",
  },
  {
    id: "shimla-mirch",
    name: "Shimla Mirch",
    hindiName: "शिमला मिर्च",
    emoji: "🫑",
    retailPrice: 90,
    wholesalePrice: 80,
    unit: "kg",
  },
  {
    id: "baigan",
    name: "Baigan",
    hindiName: "बैंगन",
    emoji: "🍆",
    retailPrice: 45,
    wholesalePrice: 40,
    unit: "kg",
  },
  {
    id: "lauki",
    name: "Lauki",
    hindiName: "लौकी",
    emoji: "🥒",
    retailPrice: 45,
    wholesalePrice: 40,
    unit: "kg",
  },
  {
    id: "kaddu",
    name: "Kaddu",
    hindiName: "कद्दू",
    emoji: "🎃",
    retailPrice: 45,
    wholesalePrice: 40,
    unit: "kg",
  },
  {
    id: "kheera",
    name: "Kheera",
    hindiName: "खीरा",
    emoji: "🥒",
    retailPrice: 55,
    wholesalePrice: 50,
    unit: "kg",
  },
  {
    id: "beans",
    name: "Beans",
    hindiName: "बीन्स",
    emoji: "🫘",
    retailPrice: 90,
    wholesalePrice: 80,
    unit: "kg",
  },
  {
    id: "mushroom",
    name: "Mushroom",
    hindiName: "मशरूम",
    emoji: "🍄",
    retailPrice: 220,
    wholesalePrice: 200,
    unit: "kg",
  },
];

const WA_NUMBER = "918700722663";
const RATES_MESSAGE = "Hello A.S.K Team, I want to check today's fresh rates.";
const RATES_WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(RATES_MESSAGE)}`;

type OrderType = "retail" | "wholesale";

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
    name: "Adnan A.S.K",
    role: "Partner & Operations",
    hindiRole: "संचालन प्रमुख",
    initial: "A",
  },
  {
    name: "Sufiyan Qureshi",
    role: "Partner & Management",
    hindiRole: "प्रबंधन प्रमुख",
    initial: "S",
  },
  {
    name: "Shad A.S.K",
    role: "Partner & Finance",
    hindiRole: "वित्त प्रमुख",
    initial: "S",
  },
];

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])),
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("retail");

  const adjust = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.round((prev[id] + delta) * 10) / 10),
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

  const itemCount = totalItems(quantities);
  const orderTotal = totalCost(quantities, orderType);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Sabzi & Rates", href: "#products" },
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
            <nav className="hidden md:flex items-center gap-5">
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
                <span>Order Now</span>
                <span className="font-hindi text-xs opacity-80">
                  | अभी ऑर्डर करें
                </span>
              </a>
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
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.whatsapp.button"
                className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Order Now</span>
                <span className="font-hindi text-sm opacity-90">
                  | अभी ऑर्डर करें
                </span>
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
              Select items & quantity, then place your order on WhatsApp in one
              tap.
            </p>
          </motion.div>
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
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ProductCard
                  product={product}
                  quantity={quantities[product.id]}
                  onAdjust={(delta) => adjust(product.id, delta)}
                  index={i + 1}
                  orderType={orderType}
                />
              </motion.div>
            ))}
          </div>
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
                    Aapka Order | आपका ऑर्डर
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {itemCount} item{itemCount !== 1 ? "s" : ""} ·{" "}
                    <span className="text-cta">₹{orderTotal}</span>
                  </p>
                  <p className="text-xs text-white/50 mt-0.5 font-hindi">
                    {orderType === "retail" ? "रिटेल रेट" : "थोक रेट"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOrder}
                  data-ocid="order.whatsapp.submit_button"
                  className="flex items-center gap-3 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  <span>Order Now</span>
                  <span className="font-hindi text-sm opacity-90">
                    | अभी ऑर्डर करें
                  </span>
                </button>
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
            <h2 className="font-heading text-4xl font-black text-brand-dark uppercase mt-2">
              Meet the Partners
            </h2>
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
                  data-ocid={`leadership.partner.${i + 1}.whatsapp`}
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
                  "Home",
                  "Sabzi & Rates",
                  "Leadership",
                  "About Us",
                  "Sampark",
                ].map((l) => (
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
  index,
  orderType,
}: {
  product: Product;
  quantity: number;
  onAdjust: (delta: number) => void;
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
      {/* Rate Enquiry Button */}
      <a
        href={RATES_WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={`products.rate_enquiry.${index}`}
        className="flex items-center gap-1.5 bg-whatsapp/10 hover:bg-whatsapp/20 text-whatsapp border border-whatsapp/25 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
      >
        <WhatsAppIcon className="w-3 h-3" />
        Ask Rate | रेट पूछें
      </a>
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
