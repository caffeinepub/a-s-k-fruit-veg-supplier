import { useEffect, useRef, useState } from "react";
import { AdminAnalyticsDashboard } from "./AdminAnalyticsDashboard";

// ─── Password Gate ────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "[Adnan ceo";
const SESSION_KEY = "ask_admin_auth";

// ─── Price Override Types ─────────────────────────────────────────────────────
interface PriceOverride {
  [id: string]: number;
}

const PRICE_OVERRIDE_KEY = "ask_price_overrides";

function loadOverrides(): PriceOverride {
  try {
    return JSON.parse(localStorage.getItem(PRICE_OVERRIDE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveOverrides(overrides: PriceOverride) {
  localStorage.setItem(PRICE_OVERRIDE_KEY, JSON.stringify(overrides));
}

// ─── Product list (mirrors App.tsx for price control) ────────────────────────
const ALL_PRODUCTS = [
  { id: "aloo", name: "Aloo / आलू", base: 25, unit: "kg" },
  { id: "gajar", name: "Gajar / गाजर", base: 42, unit: "kg" },
  { id: "mooli", name: "Mooli / मूली", base: 30, unit: "kg" },
  { id: "arbi", name: "Arbi / अरबी", base: 70, unit: "kg" },
  { id: "chukandar", name: "Chukandar / चुकन्दर", base: 43, unit: "kg" },
  { id: "palak", name: "Palak / पालक", base: 32, unit: "kg" },
  { id: "methi", name: "Methi / मेथी", base: 45, unit: "kg" },
  { id: "bathua", name: "Bathua / बथुआ", base: 65, unit: "kg" },
  { id: "sarson", name: "Sarson ka Saag / सरसों का साग", base: 45, unit: "kg" },
  { id: "pudina", name: "Pudina / पुदीना", base: 75, unit: "kg" },
  { id: "dhaniya", name: "Dhaniya / धनिया", base: 45, unit: "unit" },
  { id: "baingan", name: "Baingan / बैंगन", base: 55, unit: "kg" },
  { id: "tamatar", name: "Tamatar / टमाटर", base: 42, unit: "kg" },
  { id: "pyaaz", name: "Pyaaz / प्याज़", base: 39, unit: "kg" },
  { id: "bhindi", name: "Bhindi / भिंडी", base: 85, unit: "kg" },
  { id: "lauki", name: "Lauki / लौकी", base: 43, unit: "kg" },
  { id: "tori", name: "Tori / तोरी", base: 59, unit: "kg" },
  { id: "karela", name: "Karela / करेला", base: 70, unit: "kg" },
  { id: "parwal", name: "Parwal / परवल", base: 75, unit: "kg" },
  { id: "mirch", name: "Mirch / मिर्च", base: 65, unit: "kg" },
  { id: "shimla", name: "Shimla Mirch / शिमला मिर्च", base: 56, unit: "kg" },
  {
    id: "lal-pili",
    name: "Lal Pili Shimla / लाल पीली शिमला",
    base: 160,
    unit: "kg",
  },
  { id: "adrak", name: "Adrak / अदरक", base: 101, unit: "kg" },
  { id: "lahsun", name: "Lahsun Chila / लहसुन छिला", base: 160, unit: "kg" },
  { id: "patta-gobhi", name: "Patta Gobhi / पत्ता गोभी", base: 16, unit: "kg" },
  { id: "phool-gobhi", name: "Phool Gobhi / फूल गोभी", base: 55, unit: "kg" },
  { id: "broccoli", name: "Broccoli / ब्रोकोली", base: 175, unit: "kg" },
  { id: "matar", name: "Matar Safal / मटर सफल", base: 75, unit: "kg" },
  { id: "sweet-corn", name: "Sweet Corn / स्वीट कॉर्न", base: 120, unit: "kg" },
  { id: "beans", name: "Beans / बीन्स", base: 70, unit: "kg" },
  { id: "kaddu", name: "Kaddu / कद्दू", base: 37, unit: "kg" },
  { id: "mushroom", name: "Mushroom / मशरूम", base: 195, unit: "kg" },
  { id: "sprouts", name: "Sprouts Daal / स्प्राउट्स", base: 155, unit: "kg" },
  { id: "salad", name: "Salad Patta / सलाद पत्ता", base: 55, unit: "kg" },
];

// ─── Price Control Panel ──────────────────────────────────────────────────────
function PriceControlPanel() {
  const [overrides, setOverrides] = useState<PriceOverride>(loadOverrides);
  const [saved, setSaved] = useState(false);

  const handleChange = (id: string, val: string) => {
    const num = Number.parseInt(val, 10);
    if (Number.isNaN(num) || num < 0) return;
    setOverrides((prev) => ({ ...prev, [id]: num }));
    setSaved(false);
  };

  const handleReset = (id: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSaved(false);
  };

  const handleSaveAll = () => {
    saveOverrides(overrides);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetAll = () => {
    setOverrides({});
    saveOverrides({});
    setSaved(false);
  };

  return (
    <div style={{ padding: "24px 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2
          style={{
            color: "#D4AF37",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Price Control Panel
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={handleResetAll}
            style={{
              padding: "8px 16px",
              background: "rgba(212,175,55,0.1)",
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.4)",
              borderRadius: 6,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Reset All to Base
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            style={{
              padding: "8px 20px",
              background: saved ? "#2e7d32" : "#D4AF37",
              color: saved ? "#fff" : "#001840",
              border: "none",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
              transition: "background 0.3s",
            }}
          >
            {saved ? "✓ Saved!" : "Save All Prices"}
          </button>
        </div>
      </div>

      <p
        style={{
          color: "rgba(212,175,55,0.6)",
          fontSize: 12,
          marginBottom: 20,
        }}
      >
        Changes are saved locally and reflected on the main catalog immediately.
      </p>

      <div style={{ display: "grid", gap: 10 }}>
        {ALL_PRODUCTS.map((p) => {
          const current =
            overrides[p.id] !== undefined ? overrides[p.id] : p.base;
          const isModified =
            overrides[p.id] !== undefined && overrides[p.id] !== p.base;
          return (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: isModified
                  ? "rgba(212,175,55,0.08)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${isModified ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.12)"}`,
                borderRadius: 8,
                padding: "10px 14px",
                gap: 12,
              }}
            >
              <span
                style={{
                  color: isModified ? "#D4AF37" : "rgba(212,175,55,0.8)",
                  fontSize: 14,
                  flex: 1,
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                {p.name}
              </span>
              <span
                style={{
                  color: "rgba(212,175,55,0.4)",
                  fontSize: 12,
                  minWidth: 60,
                }}
              >
                Base: ₹{p.base}/{p.unit}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#D4AF37", fontSize: 14 }}>₹</span>
                <input
                  type="number"
                  min={0}
                  value={current}
                  onChange={(e) => handleChange(p.id, e.target.value)}
                  style={{
                    width: 72,
                    background: "rgba(0,24,71,0.8)",
                    border: "1px solid rgba(212,175,55,0.4)",
                    borderRadius: 6,
                    color: "#D4AF37",
                    padding: "6px 8px",
                    fontSize: 14,
                    textAlign: "right",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                />
                <span style={{ color: "rgba(212,175,55,0.5)", fontSize: 12 }}>
                  /{p.unit}
                </span>
              </div>
              {isModified && (
                <button
                  type="button"
                  onClick={() => handleReset(p.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(212,175,55,0.5)",
                    cursor: "pointer",
                    fontSize: 16,
                    padding: "0 2px",
                  }}
                  title="Reset to base price"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main AdminPanel Component ────────────────────────────────────────────────
export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1",
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"analytics" | "prices">(
    "analytics",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Access denied.");
      setPassword("");
      inputRef.current?.focus();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setPassword("");
    // Navigate away from admin hash
    window.location.hash = "";
  };

  // ── Password Gate ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000d1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Montserrat, sans-serif",
          padding: 24,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "linear-gradient(160deg, #001430 0%, #000d1a 100%)",
            border: "1px solid rgba(212,175,55,0.35)",
            borderRadius: 16,
            padding: "40px 32px",
            boxShadow: "0 0 60px rgba(212,175,55,0.08)",
            textAlign: "center",
          }}
        >
          {/* Eagle Logo */}
          <div style={{ marginBottom: 24 }}>
            <img
              src="/assets/uploads/IMG_2664-1.jpeg"
              alt="A.S.K VVIP Logo"
              width={90}
              height={90}
              style={{
                borderRadius: "50%",
                border: "2px solid rgba(212,175,55,0.6)",
                boxShadow: "0 0 24px rgba(212,175,55,0.5)",
                objectFit: "cover",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/generated/ask-logo.png";
              }}
            />
          </div>

          <div
            style={{
              color: "#D4AF37",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 1,
              marginBottom: 4,
            }}
          >
            A.S.K VVIP STANDARD SUPPLY
          </div>
          <div
            style={{
              color: "rgba(212,175,55,0.65)",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            SAHIBABAD, GHAZIABAD &amp; DELHI NCR
          </div>

          <div
            style={{
              background: "rgba(212,175,55,0.06)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: 10,
              padding: "24px 20px",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                color: "rgba(212,175,55,0.8)",
                fontSize: 13,
                marginBottom: 16,
                letterSpacing: 0.5,
              }}
            >
              RESTRICTED ACCESS — ADMIN ONLY
            </p>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter Admin Password"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(0,24,71,0.8)",
                border: `1px solid ${error ? "#e53935" : "rgba(212,175,55,0.4)"}`,
                borderRadius: 8,
                color: "#D4AF37",
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "Open Sans, sans-serif",
                marginBottom: 14,
              }}
            />
            {error && (
              <p
                style={{
                  color: "#ef5350",
                  fontSize: 13,
                  marginBottom: 14,
                  textAlign: "left",
                }}
              >
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: "13px",
                background: "linear-gradient(135deg, #D4AF37 0%, #b8942e 100%)",
                color: "#001840",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                letterSpacing: 1,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              UNLOCK DASHBOARD
            </button>
          </div>

          <p style={{ color: "rgba(212,175,55,0.3)", fontSize: 11 }}>
            This panel is private. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    );
  }

  // ── Authenticated Dashboard ────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000d1a",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          background: "rgba(0,24,71,0.98)",
          borderBottom: "1px solid rgba(212,175,55,0.3)",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/assets/uploads/IMG_2664-1.jpeg"
            alt="Logo"
            width={36}
            height={36}
            style={{
              borderRadius: "50%",
              border: "1px solid rgba(212,175,55,0.5)",
              boxShadow: "0 0 10px rgba(212,175,55,0.3)",
              objectFit: "cover",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/ask-logo.png";
            }}
          />
          <span style={{ color: "#D4AF37", fontWeight: 700, fontSize: 15 }}>
            A.S.K Admin Dashboard
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "rgba(212,175,55,0.7)",
            padding: "7px 16px",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(212,175,55,0.2)",
          background: "rgba(0,18,50,0.8)",
        }}
      >
        {(["analytics", "prices"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "14px 28px",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === tab
                  ? "2px solid #D4AF37"
                  : "2px solid transparent",
              color: activeTab === tab ? "#D4AF37" : "rgba(212,175,55,0.45)",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {tab === "analytics" ? "📊 Visitor Tracking" : "💰 Price Control"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {activeTab === "analytics" ? (
          <AdminAnalyticsDashboard />
        ) : (
          <PriceControlPanel />
        )}
      </div>
    </div>
  );
}
