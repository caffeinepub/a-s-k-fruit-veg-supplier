import { useActor } from "@/hooks/useActor";
import {
  BarChart2,
  CheckCircle2,
  Crown,
  Loader2,
  Lock,
  Package,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Order {
  id: bigint;
  clientName: string;
  itemsSummary: string;
  status: string;
  statusMessage: string;
  vehicleNumber: string;
  createdAt: bigint;
  updatedAt: bigint;
  isArchived: boolean;
}

const MD_USERNAME = "Chief_Sufiyan";
const MD_PASSWORD = "SUFIYAN@78";

function statusColor(status: string): string {
  switch (status) {
    case "Confirmed":
      return "#22c55e";
    case "Sourcing":
      return "#f59e0b";
    case "Out for Delivery":
      return "#60a5fa";
    case "Delivered":
      return "#6b7280";
    default:
      return "#9ca3af";
  }
}

function statusBg(status: string): string {
  switch (status) {
    case "Confirmed":
      return "rgba(34,197,94,0.12)";
    case "Sourcing":
      return "rgba(245,158,11,0.12)";
    case "Out for Delivery":
      return "rgba(59,130,246,0.12)";
    case "Delivered":
      return "rgba(107,114,128,0.12)";
    default:
      return "rgba(156,163,175,0.08)";
  }
}

function statusIcon(status: string) {
  switch (status) {
    case "Confirmed":
      return <CheckCircle2 className="w-4 h-4" />;
    case "Sourcing":
      return <Package className="w-4 h-4" />;
    case "Out for Delivery":
      return <Truck className="w-4 h-4" />;
    case "Delivered":
      return <CheckCircle2 className="w-4 h-4" />;
    default:
      return <Package className="w-4 h-4" />;
  }
}

function formatTs(ts: bigint): string {
  try {
    const d = new Date(Number(ts / 1_000_000n));
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

export default function MDDashboard() {
  const { actor } = useActor();

  // Auth
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Data
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [archivedOrders, setArchivedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check for stored session on mount
  useEffect(() => {
    const stored = localStorage.getItem("ask_md_session");
    if (stored === "1") {
      setLoggedIn(true);
    } else {
      localStorage.removeItem("ask_md_session");
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!actor) return;
    try {
      const [active, archived] = await Promise.all([
        actor.getActiveOrders(),
        actor.getArchivedOrders(),
      ]);
      setActiveOrders((active as Order[]).filter((o) => !o.isArchived));
      setArchivedOrders(archived as Order[]);
    } catch {
      // silent
    }
  }, [actor]);

  useEffect(() => {
    if (loggedIn && actor) {
      setLoading(true);
      fetchOrders().finally(() => setLoading(false));
      // Poll every 2s for strategic view
      pollRef.current = setInterval(fetchOrders, 2000);
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    }
  }, [loggedIn, actor, fetchOrders]);

  const handleLogin = () => {
    if (username !== MD_USERNAME || password !== MD_PASSWORD) {
      setAuthError("Access denied. Incorrect credentials.");
      return;
    }
    if (rememberMe) {
      localStorage.setItem("ask_md_session", "1");
    }
    setLoggedIn(true);
    setAuthError("");
    toast.success("SYSTEM READY & BRANDED", { duration: 4000 });
  };

  const handleLogout = () => {
    localStorage.removeItem("ask_md_session");
    setLoggedIn(false);
    setPassword("");
    setUsername("");
    setRememberMe(false);
    setActiveOrders([]);
    setArchivedOrders([]);
    if (pollRef.current) clearInterval(pollRef.current);
  };

  // Stats
  const totalActive = activeOrders.length;
  const totalDelivered = archivedOrders.length;
  const onTheWay = activeOrders.filter(
    (o) => o.status === "Out for Delivery",
  ).length;
  const sourcing = activeOrders.filter((o) => o.status === "Sourcing").length;

  // ── Login ────────────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <section
        id="md-dashboard"
        className="min-h-screen flex items-center justify-center px-4 py-16"
        style={{ background: "#08080e" }}
        data-ocid="md.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xs"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-20 h-20 rounded-full overflow-hidden mb-4"
              style={{
                boxShadow:
                  "0 0 32px rgba(212,175,55,0.65), 0 0 60px rgba(212,175,55,0.2)",
                border: "2px solid rgba(212,175,55,0.5)",
              }}
            >
              <img
                src="/assets/uploads/IMG_2664-1.jpeg"
                alt="A.S.K Eagle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-5 h-5" style={{ color: "#D4AF37" }} />
              <h1
                className="text-xl font-bold tracking-widest uppercase"
                style={{ color: "#D4AF37" }}
              >
                MD Strategic
              </h1>
            </div>
            <p
              className="text-xs tracking-wider uppercase"
              style={{ color: "rgba(212,175,55,0.55)" }}
            >
              A.S.K VVIP STANDARD SUPPLY
            </p>
            <p
              className="text-xs font-bold uppercase mt-1"
              style={{
                color: "#D4AF37",
                fontFamily: "serif",
                letterSpacing: "0.12em",
              }}
            >
              SAHIBABAD, GHAZIABAD &amp; DELHI NCR
            </p>
          </div>

          {/* Username */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            Username
          </p>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setAuthError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter username"
            data-ocid="md.username.input"
            className="w-full px-4 py-4 rounded-xl text-base font-mono mb-4 outline-none"
            style={{
              background: "rgba(212,175,55,0.07)",
              border: authError
                ? "1.5px solid #ef4444"
                : "1.5px solid rgba(212,175,55,0.35)",
              color: "#D4AF37",
            }}
          />

          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            Strategic Password
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setAuthError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter MD password"
            data-ocid="md.password.input"
            className="w-full px-4 py-4 rounded-xl text-base font-mono mb-4 outline-none"
            style={{
              background: "rgba(212,175,55,0.07)",
              border: authError
                ? "1.5px solid #ef4444"
                : "1.5px solid rgba(212,175,55,0.35)",
              color: "#D4AF37",
            }}
          />

          {/* Remember Me */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: "#D4AF37" }}
            />
            <label
              htmlFor="remember-me"
              className="text-sm"
              style={{ color: "rgba(212,175,55,0.75)" }}
            >
              Remember Me
            </label>
          </div>

          {authError && (
            <p
              className="text-red-400 text-sm mb-4 text-center"
              data-ocid="md.error_state"
            >
              {authError}
            </p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            data-ocid="md.submit_button"
            className="w-full py-4 rounded-xl font-bold text-base uppercase tracking-widest transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #8B6914 100%)",
              color: "#08080e",
            }}
          >
            ACCESS STRATEGIC PANEL
          </button>

          <p
            className="text-center text-xs mt-6"
            style={{ color: "rgba(212,175,55,0.25)" }}
          >
            For authorized MD access only
          </p>
        </motion.div>
      </section>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <section
      id="md-dashboard"
      className="min-h-screen px-4 py-6"
      style={{ background: "#08080e" }}
      data-ocid="md.panel"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div
          className="flex items-center justify-between mb-6 p-4 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(139,105,20,0.08) 100%)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{ boxShadow: "0 0 14px rgba(212,175,55,0.5)" }}
            >
              <img
                src="/assets/uploads/IMG_2664-1.jpeg"
                alt="Eagle"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1
                className="text-base font-bold uppercase tracking-widest"
                style={{ color: "#D4AF37" }}
              >
                A.S.K MD DASHBOARD
              </h1>
              <p className="text-xs" style={{ color: "rgba(212,175,55,0.55)" }}>
                Sufiyan A.S.K — Strategic Overview
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="md.close_button"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide"
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#ef4444",
            }}
          >
            <Lock className="w-3.5 h-3.5" /> Lock
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            label="Active Orders"
            value={String(totalActive)}
            icon={<Package className="w-5 h-5" />}
            color="#D4AF37"
            bg="rgba(212,175,55,0.1)"
          />
          <StatCard
            label="Delivered Total"
            value={String(totalDelivered)}
            icon={<CheckCircle2 className="w-5 h-5" />}
            color="#22c55e"
            bg="rgba(34,197,94,0.1)"
          />
          <StatCard
            label="On the Way"
            value={String(onTheWay)}
            icon={<Truck className="w-5 h-5" />}
            color="#60a5fa"
            bg="rgba(59,130,246,0.1)"
          />
          <StatCard
            label="Sourcing"
            value={String(sourcing)}
            icon={<BarChart2 className="w-5 h-5" />}
            color="#f59e0b"
            bg="rgba(245,158,11,0.1)"
          />
        </div>

        {/* Active Orders List */}
        <h2
          className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
          style={{ color: "rgba(212,175,55,0.8)" }}
        >
          <ShieldCheck className="w-4 h-4" />
          Live Orders
          <span
            className="ml-1 px-2 py-0.5 rounded-full text-xs"
            style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
          >
            {totalActive}
          </span>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
          >
            ● SYNCING
          </motion.span>
        </h2>

        {loading && (
          <div
            className="flex items-center justify-center py-12"
            data-ocid="md.loading_state"
          >
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#D4AF37" }}
            />
          </div>
        )}

        {!loading && activeOrders.length === 0 && (
          <div
            className="text-center py-12 rounded-2xl mb-5"
            style={{
              border: "1px dashed rgba(212,175,55,0.2)",
              color: "rgba(212,175,55,0.35)",
            }}
            data-ocid="md.order.empty_state"
          >
            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No active orders at this time.</p>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {activeOrders.map((order, idx) => (
              <motion.div
                key={String(order.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22 }}
                data-ocid={`md.order.item.${idx + 1}`}
                className="p-4 rounded-2xl"
                style={{
                  background: "#0d0d14",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#D4AF37" }}
                    >
                      {order.clientName}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(212,175,55,0.45)" }}
                    >
                      #{String(order.id)} · {formatTs(order.createdAt)}
                    </p>
                  </div>
                  <span
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase"
                    style={{
                      background: statusBg(order.status),
                      color: statusColor(order.status),
                      border: `1px solid ${statusColor(order.status)}44`,
                    }}
                  >
                    <span style={{ color: statusColor(order.status) }}>
                      {statusIcon(order.status)}
                    </span>
                    {order.status}
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "rgba(212,175,55,0.6)" }}
                >
                  {order.itemsSummary}
                </p>
                {order.vehicleNumber && (
                  <p
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "#60a5fa" }}
                  >
                    <Truck className="w-3 h-3" /> Vehicle: {order.vehicleNumber}
                  </p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contacts Block */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ background: "rgba(212,175,55,0.08)" }}
          >
            <Phone className="w-4 h-4" style={{ color: "#D4AF37" }} />
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "#D4AF37" }}
            >
              Key Contacts
            </span>
          </div>
          <div
            className="divide-y"
            style={{ borderColor: "rgba(212,175,55,0.1)" }}
          >
            {/* Sufiyan */}
            <ContactRow
              jobRole="MD — Strategy & Support"
              name="Sufiyan A.S.K"
              number="8700722663"
              type="whatsapp"
              href="https://wa.me/918700722663"
              btnLabel="WhatsApp"
              btnColor="#25d366"
              btnBg="rgba(37,211,102,0.15)"
              btnBorder="rgba(37,211,102,0.4)"
            />
            {/* Adnan */}
            <ContactRow
              jobRole="CEO — Operations"
              name="Adnan A.S.K"
              number="8527865856"
              type="call"
              href="tel:+918527865856"
              btnLabel="Call"
              btnColor="#D4AF37"
              btnBg="rgba(212,175,55,0.15)"
              btnBorder="rgba(212,175,55,0.4)"
            />
            {/* Shad */}
            <ContactRow
              jobRole="Finance — System Registry"
              name="Shad A.S.K"
              number="9318404289"
              type="call"
              href="tel:+919318404289"
              btnLabel="Registry"
              btnColor="#a78bfa"
              btnBg="rgba(167,139,250,0.12)"
              btnBorder="rgba(167,139,250,0.35)"
            />
          </div>
        </div>

        {/* Recent Delivered */}
        {archivedOrders.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              Recently Delivered ({archivedOrders.length})
            </h2>
            <div className="space-y-2">
              {archivedOrders.slice(0, 5).map((order, idx) => (
                <div
                  key={String(order.id)}
                  data-ocid={`md.archived.item.${idx + 1}`}
                  className="px-4 py-3 rounded-xl flex items-center justify-between"
                  style={{
                    background: "rgba(107,114,128,0.07)",
                    border: "1px solid rgba(107,114,128,0.15)",
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: "rgba(212,175,55,0.5)" }}
                  >
                    {order.clientName}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(107,114,128,0.7)" }}
                  >
                    {formatTs(order.updatedAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p
          className="text-center text-xs mt-10"
          style={{ color: "rgba(212,175,55,0.25)" }}
        >
          © {new Date().getFullYear()} A.S.K VVIP — MD Confidential Panel
        </p>
      </div>
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

function StatCard({ label, value, icon, color, bg }: StatCardProps) {
  return (
    <div
      className="p-4 rounded-2xl flex items-center gap-4"
      style={{ background: bg, border: `1px solid ${color}33` }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}22`, color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color }}>
          {value}
        </p>
        <p
          className="text-xs uppercase tracking-wide"
          style={{ color: `${color}99` }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

interface ContactRowProps {
  jobRole: string;
  name: string;
  number: string;
  type: "whatsapp" | "call";
  href: string;
  btnLabel: string;
  btnColor: string;
  btnBg: string;
  btnBorder: string;
}

function ContactRow({
  jobRole,
  name,
  number,
  href,
  btnLabel,
  btnColor,
  btnBg,
  btnBorder,
}: ContactRowProps) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{ background: "rgba(12,12,18,0.8)" }}
    >
      <div>
        <p
          className="text-xs uppercase tracking-widest mb-0.5"
          style={{ color: "rgba(212,175,55,0.5)" }}
        >
          {jobRole}
        </p>
        <p className="text-sm font-bold" style={{ color: "#D4AF37" }}>
          {name}
        </p>
        <p
          className="text-xs font-mono"
          style={{ color: "rgba(212,175,55,0.6)" }}
        >
          {number}
        </p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex-shrink-0"
        style={{
          background: btnBg,
          border: `1px solid ${btnBorder}`,
          color: btnColor,
        }}
      >
        {btnLabel}
      </a>
    </div>
  );
}
