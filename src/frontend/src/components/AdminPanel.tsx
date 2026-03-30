import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  Lock,
  Package,
  ShieldCheck,
  Truck,
  X,
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

const ADMINS = [
  { name: "Adnan A.S.K", password: "ADNAN@786" },
  { name: "Shad A.S.K", password: "SHAD@786" },
];

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

function statusColor(status: string): string {
  switch (status) {
    case "Confirmed":
      return "#22c55e";
    case "Sourcing":
      return "#f59e0b";
    case "Out for Delivery":
      return "#3b82f6";
    case "Delivered":
      return "#6b7280";
    default:
      return "#9ca3af";
  }
}

function statusBg(status: string): string {
  switch (status) {
    case "Confirmed":
      return "rgba(34,197,94,0.15)";
    case "Sourcing":
      return "rgba(245,158,11,0.15)";
    case "Out for Delivery":
      return "rgba(59,130,246,0.15)";
    case "Delivered":
      return "rgba(107,114,128,0.15)";
    default:
      return "rgba(156,163,175,0.1)";
  }
}

interface DispatchState {
  orderId: bigint;
  vehicleNumber: string;
}

interface ConfirmDeliverState {
  orderId: bigint;
}

export default function AdminPanel() {
  const { actor } = useActor();

  // Auth state
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState("");

  // Orders state
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [archivedOrders, setArchivedOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [updatingOrder, setUpdatingOrder] = useState<bigint | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [showCreate, setShowCreate] = useState(true);

  // Create order
  const [clientName, setClientName] = useState("");
  const [itemsSummary, setItemsSummary] = useState("");
  const [creating, setCreating] = useState(false);

  // Dispatch modal
  const [dispatchState, setDispatchState] = useState<DispatchState | null>(
    null,
  );

  // Deliver confirmation
  const [deliverConfirm, setDeliverConfirm] =
    useState<ConfirmDeliverState | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchActiveOrders = useCallback(async () => {
    if (!actor) return;
    try {
      const orders = await actor.getActiveOrders();
      setActiveOrders(orders.filter((o: Order) => !o.isArchived));
    } catch {
      // silent
    }
  }, [actor]);

  const fetchArchivedOrders = useCallback(async () => {
    if (!actor) return;
    try {
      const orders = await actor.getArchivedOrders();
      setArchivedOrders(orders);
    } catch {
      // silent
    }
  }, [actor]);

  useEffect(() => {
    if (loggedIn && actor) {
      setLoadingOrders(true);
      fetchActiveOrders().finally(() => setLoadingOrders(false));
      pollRef.current = setInterval(fetchActiveOrders, 2000);
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    }
  }, [loggedIn, actor, fetchActiveOrders]);

  useEffect(() => {
    if (showArchived && loggedIn) fetchArchivedOrders();
  }, [showArchived, loggedIn, fetchArchivedOrders]);

  // Collapse create if orders exist
  useEffect(() => {
    if (activeOrders.length > 0) setShowCreate(false);
  }, [activeOrders.length]);

  const handleLogin = () => {
    if (!selectedAdmin) {
      setAuthError("Please select a user.");
      return;
    }
    const admin = ADMINS.find((a) => a.name === selectedAdmin);
    if (!admin || admin.password !== password) {
      setAuthError("Incorrect password. Please try again.");
      return;
    }
    setLoggedIn(true);
    setAdminName(admin.name);
    setAuthError("");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAdminName("");
    setSelectedAdmin(null);
    setPassword("");
    setActiveOrders([]);
    setArchivedOrders([]);
    if (pollRef.current) clearInterval(pollRef.current);
  };

  const handleCreateOrder = async () => {
    if (!actor || !clientName.trim() || !itemsSummary.trim()) {
      toast.error("Please fill in both Client Name and Items.");
      return;
    }
    setCreating(true);
    try {
      await actor.createOrder(clientName.trim(), itemsSummary.trim());
      toast.success("Order created successfully!");
      setClientName("");
      setItemsSummary("");
      setShowCreate(false);
      await fetchActiveOrders();
    } catch {
      toast.error("Failed to create order.");
    } finally {
      setCreating(false);
    }
  };

  const handleConfirm = async (id: bigint) => {
    if (!actor) return;
    setUpdatingOrder(id);
    try {
      await actor.confirmOrder(id);
      toast.success("Order confirmed!");
      await fetchActiveOrders();
    } catch {
      toast.error("Failed to confirm order.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const handleSourcing = async (id: bigint) => {
    if (!actor) return;
    setUpdatingOrder(id);
    try {
      await actor.startSourcing(id);
      toast.success("Sourcing started!");
      await fetchActiveOrders();
    } catch {
      toast.error("Failed to start sourcing.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const handleDispatchConfirm = async () => {
    if (!actor || !dispatchState) return;
    if (!dispatchState.vehicleNumber.trim()) {
      toast.error("Please enter a vehicle number.");
      return;
    }
    setUpdatingOrder(dispatchState.orderId);
    try {
      await actor.dispatchOrder(
        dispatchState.orderId,
        dispatchState.vehicleNumber.trim(),
      );
      toast.success("Order dispatched!");
      setDispatchState(null);
      await fetchActiveOrders();
    } catch {
      toast.error("Failed to dispatch order.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const handleDeliver = async (id: bigint) => {
    if (!actor) return;
    setUpdatingOrder(id);
    setDeliverConfirm(null);
    try {
      await actor.deliverOrder(id);
      toast.success("Order marked as Delivered and archived!");
      await fetchActiveOrders();
    } catch {
      toast.error("Failed to deliver order.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <section
        id="admin"
        className="min-h-screen flex items-center justify-center px-4 py-16"
        style={{ background: "#0a0a0a" }}
        data-ocid="admin.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-20 h-20 rounded-full overflow-hidden mb-4"
              style={{ boxShadow: "0 0 28px rgba(212,175,55,0.6)" }}
            >
              <img
                src="/assets/uploads/IMG_2664-1.jpeg"
                alt="A.S.K Eagle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5" style={{ color: "#D4AF37" }} />
              <h1
                className="text-xl font-bold tracking-widest uppercase"
                style={{ color: "#D4AF37" }}
              >
                Admin Access
              </h1>
            </div>
            <p
              className="text-xs tracking-wider"
              style={{ color: "rgba(212,175,55,0.6)" }}
            >
              A.S.K VVIP DASHBOARD
            </p>
          </div>

          {/* User Selection */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            Select User
          </p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {ADMINS.map((admin) => (
              <button
                type="button"
                key={admin.name}
                onClick={() => {
                  setSelectedAdmin(admin.name);
                  setAuthError("");
                }}
                data-ocid="admin.select.button"
                className="py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all"
                style={{
                  background:
                    selectedAdmin === admin.name
                      ? "rgba(212,175,55,0.2)"
                      : "rgba(212,175,55,0.05)",
                  border:
                    selectedAdmin === admin.name
                      ? "2px solid #D4AF37"
                      : "1px solid rgba(212,175,55,0.25)",
                  color:
                    selectedAdmin === admin.name
                      ? "#D4AF37"
                      : "rgba(212,175,55,0.6)",
                }}
              >
                {admin.name}
              </button>
            ))}
          </div>

          {/* Password */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            Password
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setAuthError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter your password"
            data-ocid="admin.password.input"
            className="w-full px-4 py-4 rounded-xl text-base font-mono mb-4 outline-none transition-all"
            style={{
              background: "rgba(212,175,55,0.07)",
              border: authError
                ? "1.5px solid #ef4444"
                : "1.5px solid rgba(212,175,55,0.35)",
              color: "#D4AF37",
            }}
          />

          {authError && (
            <p
              className="text-red-400 text-sm mb-4 text-center"
              data-ocid="admin.error_state"
            >
              {authError}
            </p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            data-ocid="admin.submit_button"
            className="w-full py-4 rounded-xl font-bold text-base uppercase tracking-widest transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #a08020 100%)",
              color: "#0a0a0a",
            }}
          >
            UNLOCK DASHBOARD
          </button>
        </motion.div>
      </section>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <section
      id="admin"
      className="min-h-screen px-4 py-6"
      style={{ background: "#0a0a0a" }}
      data-ocid="admin.panel"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div
          className="flex items-center justify-between mb-6 p-4 rounded-2xl"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        >
          <div>
            <h1
              className="text-lg font-bold uppercase tracking-widest"
              style={{ color: "#D4AF37" }}
            >
              A.S.K ORDER DASHBOARD
            </h1>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(212,175,55,0.6)" }}
            >
              Logged in as <span style={{ color: "#D4AF37" }}>{adminName}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="admin.close_button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.4)",
              color: "#ef4444",
            }}
          >
            <Lock className="w-4 h-4" /> Lock
          </button>
        </div>

        {/* Create Order */}
        <div
          className="mb-5 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(212,175,55,0.25)" }}
        >
          <button
            type="button"
            onClick={() => setShowCreate((v) => !v)}
            data-ocid="admin.create.toggle"
            className="w-full flex items-center justify-between px-5 py-4 font-bold uppercase tracking-widest text-sm"
            style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37" }}
          >
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4" /> New Order
            </span>
            {showCreate ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <AnimatePresence initial={false}>
            {showCreate && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ background: "rgba(12,12,12,1)" }}
              >
                <div className="p-5 space-y-3">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Client Name (e.g. The Eastern Address)"
                    data-ocid="admin.order.input"
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: "rgba(212,175,55,0.07)",
                      border: "1.5px solid rgba(212,175,55,0.3)",
                      color: "#D4AF37",
                    }}
                  />
                  <textarea
                    value={itemsSummary}
                    onChange={(e) => setItemsSummary(e.target.value)}
                    placeholder="Items Summary (e.g. 10kg Tomatoes, 5kg Onions)"
                    rows={3}
                    data-ocid="admin.order.textarea"
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{
                      background: "rgba(212,175,55,0.07)",
                      border: "1.5px solid rgba(212,175,55,0.3)",
                      color: "#D4AF37",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleCreateOrder}
                    disabled={creating}
                    data-ocid="admin.order.submit_button"
                    className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
                    style={{
                      background:
                        "linear-gradient(135deg, #D4AF37 0%, #a08020 100%)",
                      color: "#0a0a0a",
                    }}
                  >
                    {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                    CREATE ORDER
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Orders */}
        <h2
          className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
          style={{ color: "rgba(212,175,55,0.8)" }}
        >
          <Clock className="w-4 h-4" />
          Active Orders
          <span
            className="ml-1 px-2 py-0.5 rounded-full text-xs"
            style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
          >
            {activeOrders.length}
          </span>
        </h2>

        {loadingOrders && (
          <div
            className="flex items-center justify-center py-12"
            data-ocid="admin.loading_state"
          >
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#D4AF37" }}
            />
          </div>
        )}

        {!loadingOrders && activeOrders.length === 0 && (
          <div
            className="text-center py-12 rounded-2xl mb-5"
            style={{
              border: "1px dashed rgba(212,175,55,0.2)",
              color: "rgba(212,175,55,0.4)",
            }}
            data-ocid="admin.order.empty_state"
          >
            <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No active orders. Create one above.</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <AnimatePresence>
            {activeOrders.map((order, idx) => (
              <motion.div
                key={String(order.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                data-ocid={`admin.order.item.${idx + 1}`}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(212,175,55,0.25)",
                  background: "#0d0d0d",
                }}
              >
                {/* Card Header */}
                <div className="p-4 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3
                        className="text-base font-bold"
                        style={{ color: "#D4AF37" }}
                      >
                        {order.clientName}
                      </h3>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(212,175,55,0.55)" }}
                      >
                        #{String(order.id)} · {formatTs(order.createdAt)}
                      </p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={{
                        background: statusBg(order.status),
                        color: statusColor(order.status),
                        border: `1px solid ${statusColor(order.status)}33`,
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "rgba(212,175,55,0.75)" }}
                  >
                    {order.itemsSummary}
                  </p>
                  {order.statusMessage && (
                    <p
                      className="text-xs italic"
                      style={{ color: "rgba(212,175,55,0.5)" }}
                    >
                      {order.statusMessage}
                    </p>
                  )}
                  {order.vehicleNumber && (
                    <p
                      className="text-xs mt-1 flex items-center gap-1"
                      style={{ color: "#3b82f6" }}
                    >
                      <Truck className="w-3 h-3" /> Vehicle:{" "}
                      {order.vehicleNumber}
                    </p>
                  )}
                </div>

                {/* Dispatch inline panel */}
                <AnimatePresence>
                  {dispatchState?.orderId === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-3"
                      style={{
                        background: "rgba(59,130,246,0.08)",
                        borderTop: "1px solid rgba(59,130,246,0.25)",
                      }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-widest mt-3 mb-2"
                        style={{ color: "#3b82f6" }}
                      >
                        Enter Vehicle Number
                      </p>
                      <input
                        type="text"
                        value={dispatchState.vehicleNumber}
                        onChange={(e) =>
                          setDispatchState((d) =>
                            d ? { ...d, vehicleNumber: e.target.value } : d,
                          )
                        }
                        placeholder="e.g. DL-01-AB-1234"
                        data-ocid="admin.dispatch.input"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-3"
                        style={{
                          background: "rgba(59,130,246,0.1)",
                          border: "1.5px solid rgba(59,130,246,0.5)",
                          color: "#93c5fd",
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleDispatchConfirm}
                          disabled={updatingOrder === order.id}
                          data-ocid="admin.dispatch.confirm_button"
                          className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-1.5 disabled:opacity-60"
                          style={{
                            background: "rgba(59,130,246,0.8)",
                            color: "#fff",
                          }}
                        >
                          {updatingOrder === order.id && (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          )}
                          CONFIRM DISPATCH
                        </button>
                        <button
                          type="button"
                          onClick={() => setDispatchState(null)}
                          data-ocid="admin.dispatch.cancel_button"
                          className="px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-wide"
                          style={{
                            background: "rgba(156,163,175,0.15)",
                            color: "#9ca3af",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Deliver confirm */}
                <AnimatePresence>
                  {deliverConfirm?.orderId === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-3"
                      style={{
                        background: "rgba(34,197,94,0.06)",
                        borderTop: "1px solid rgba(34,197,94,0.2)",
                      }}
                    >
                      <p
                        className="text-sm font-bold mt-3 mb-3 text-center"
                        style={{ color: "#22c55e" }}
                      >
                        Mark as Delivered and archive?
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleDeliver(order.id)}
                          disabled={updatingOrder === order.id}
                          data-ocid="admin.deliver.confirm_button"
                          className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-1.5 disabled:opacity-60"
                          style={{
                            background: "rgba(34,197,94,0.8)",
                            color: "#fff",
                          }}
                        >
                          {updatingOrder === order.id && (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          )}
                          YES, DELIVERED
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliverConfirm(null)}
                          data-ocid="admin.deliver.cancel_button"
                          className="px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-wide"
                          style={{
                            background: "rgba(156,163,175,0.15)",
                            color: "#9ca3af",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons 2x2 */}
                <div
                  className="grid grid-cols-2 gap-0"
                  style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}
                >
                  {/* CONFIRM */}
                  <ActionButton
                    label="CONFIRM"
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    isActive={order.status === "Confirmed"}
                    isLoading={updatingOrder === order.id}
                    activeColor="#22c55e"
                    activeBg="rgba(34,197,94,0.15)"
                    position="tl"
                    dataOcid={`admin.confirm.button.${idx + 1}`}
                    onClick={() => handleConfirm(order.id)}
                  />
                  {/* SOURCING */}
                  <ActionButton
                    label="SOURCING"
                    icon={<Package className="w-5 h-5" />}
                    isActive={order.status === "Sourcing"}
                    isLoading={updatingOrder === order.id}
                    activeColor="#f59e0b"
                    activeBg="rgba(245,158,11,0.15)"
                    position="tr"
                    dataOcid={`admin.sourcing.button.${idx + 1}`}
                    onClick={() => handleSourcing(order.id)}
                  />
                  {/* DISPATCH */}
                  <ActionButton
                    label="DISPATCH"
                    icon={<Truck className="w-5 h-5" />}
                    isActive={order.status === "Out for Delivery"}
                    isLoading={updatingOrder === order.id}
                    activeColor="#3b82f6"
                    activeBg="rgba(59,130,246,0.15)"
                    position="bl"
                    dataOcid={`admin.dispatch.button.${idx + 1}`}
                    onClick={() =>
                      setDispatchState({ orderId: order.id, vehicleNumber: "" })
                    }
                  />
                  {/* DELIVERED */}
                  <ActionButton
                    label="DELIVERED"
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    isActive={false}
                    isLoading={updatingOrder === order.id}
                    activeColor="#6b7280"
                    activeBg="rgba(107,114,128,0.15)"
                    position="br"
                    dataOcid={`admin.deliver.button.${idx + 1}`}
                    onClick={() => setDeliverConfirm({ orderId: order.id })}
                    danger
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Archived Orders */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(212,175,55,0.15)" }}
        >
          <button
            type="button"
            onClick={() => setShowArchived((v) => !v)}
            data-ocid="admin.archived.toggle"
            className="w-full flex items-center justify-between px-5 py-4 font-bold uppercase tracking-widest text-sm"
            style={{
              background: "rgba(212,175,55,0.05)",
              color: "rgba(212,175,55,0.5)",
            }}
          >
            <span>DELIVERED / ARCHIVED</span>
            {showArchived ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <AnimatePresence initial={false}>
            {showArchived && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="p-4 space-y-3">
                  {archivedOrders.length === 0 && (
                    <p
                      className="text-center py-4 text-sm"
                      style={{ color: "rgba(212,175,55,0.3)" }}
                    >
                      No archived orders.
                    </p>
                  )}
                  {archivedOrders.map((order, idx) => (
                    <div
                      key={String(order.id)}
                      data-ocid={`admin.archived.item.${idx + 1}`}
                      className="p-3 rounded-xl"
                      style={{
                        background: "rgba(107,114,128,0.08)",
                        border: "1px solid rgba(107,114,128,0.2)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="font-bold text-sm"
                          style={{ color: "rgba(212,175,55,0.6)" }}
                        >
                          {order.clientName}
                        </span>
                        <span className="text-xs" style={{ color: "#6b7280" }}>
                          {formatTs(order.updatedAt)}
                        </span>
                      </div>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "rgba(212,175,55,0.4)" }}
                      >
                        {order.itemsSummary}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Caffeine footer */}
        <p
          className="text-center text-xs mt-8"
          style={{ color: "rgba(212,175,55,0.3)" }}
        >
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(212,175,55,0.5)" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </section>
  );
}

// ── ActionButton Component ──────────────────────────────────────────────────
interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  isLoading: boolean;
  activeColor: string;
  activeBg: string;
  position: "tl" | "tr" | "bl" | "br";
  dataOcid: string;
  onClick: () => void;
  danger?: boolean;
}

function ActionButton({
  label,
  icon,
  isActive,
  isLoading,
  activeColor,
  activeBg,
  position,
  dataOcid,
  onClick,
  danger,
}: ActionButtonProps) {
  const borderRight =
    position === "tl" || position === "bl"
      ? "1px solid rgba(212,175,55,0.15)"
      : "none";
  const borderTop =
    position === "bl" || position === "br"
      ? "1px solid rgba(212,175,55,0.15)"
      : "none";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      data-ocid={dataOcid}
      className="flex flex-col items-center justify-center gap-1.5 py-4 font-bold text-xs uppercase tracking-wide transition-all active:scale-95 disabled:opacity-50"
      style={{
        background: isActive
          ? activeBg
          : danger
            ? "rgba(239,68,68,0.05)"
            : "transparent",
        color: isActive
          ? activeColor
          : danger
            ? "#ef4444"
            : "rgba(212,175,55,0.65)",
        borderRight,
        borderTop,
        minHeight: "64px",
      }}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
      {label}
    </button>
  );
}
