import { useActor } from "@/hooks/useActor";
import {
  CheckCircle2,
  Copy,
  Loader2,
  Package,
  Phone,
  Search,
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

const STEPS = [
  {
    key: "Pending",
    label: "Order Received",
    desc: "Your order has been placed",
  },
  {
    key: "Confirmed",
    label: "Order Confirmed",
    desc: "Order confirmed by A.S.K team",
  },
  { key: "Sourcing", label: "Sourcing", desc: "Picking fresh stock" },
  {
    key: "Out for Delivery",
    label: "Out for Delivery",
    desc: "On the way to you",
  },
  { key: "Delivered", label: "Delivered", desc: "Order completed" },
];

function stepIndex(status: string): number {
  switch (status) {
    case "Pending":
      return 0;
    case "Confirmed":
      return 1;
    case "Sourcing":
      return 2;
    case "Out for Delivery":
      return 3;
    case "Delivered":
      return 4;
    default:
      return 0;
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

// Live Truck Animation component shown when status is "Out for Delivery"
function LiveTruckAnimation({ vehicleNumber }: { vehicleNumber?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mb-5 rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(212,175,55,0.08) 100%)",
        border: "1.5px solid rgba(59,130,246,0.4)",
      }}
    >
      {/* Header banner */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div>
          <p
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: "#60a5fa" }}
          >
            🚚 Your Order Is On The Way!
          </p>
          {vehicleNumber && (
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(96,165,250,0.7)" }}
            >
              Vehicle: {vehicleNumber}
            </p>
          )}
        </div>
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2 }}
          className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full"
          style={{
            background: "rgba(59,130,246,0.2)",
            color: "#60a5fa",
            border: "1px solid rgba(59,130,246,0.5)",
          }}
        >
          LIVE
        </motion.div>
      </div>

      {/* Truck track */}
      <div
        className="px-5 pb-5 pt-1 relative overflow-hidden"
        style={{ height: 72 }}
      >
        {/* Road */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: 20,
            height: 3,
            background: "rgba(59,130,246,0.25)",
            borderRadius: 2,
          }}
        />
        {/* Dashed road lines */}
        <div
          className="absolute left-0 right-0 flex gap-3"
          style={{ bottom: 21, height: 1 }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((dashId) => (
            <motion.div
              key={`road-dash-${dashId}`}
              style={{
                width: 18,
                height: 2,
                background: "rgba(212,175,55,0.3)",
                borderRadius: 1,
                flexShrink: 0,
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                delay: dashId * 0.12,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Truck SVG sliding across */}
        <motion.div
          className="absolute"
          style={{ bottom: 22 }}
          animate={{ x: ["-20%", "85%", "-20%"] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3.5,
            ease: "easeInOut",
          }}
        >
          {/* Golden glow trail */}
          <motion.div
            className="absolute"
            style={{
              width: 60,
              height: 24,
              left: -50,
              top: 4,
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.15))",
              borderRadius: 4,
              filter: "blur(6px)",
            }}
          />
          {/* Truck SVG */}
          <svg
            role="img"
            aria-label="Delivery truck"
            width="64"
            height="38"
            viewBox="0 0 64 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Delivery truck</title>
            {/* Cabin */}
            <rect
              x="36"
              y="8"
              width="22"
              height="22"
              rx="3"
              fill="#D4AF37"
              opacity="0.9"
            />
            {/* Body */}
            <rect
              x="4"
              y="14"
              width="34"
              height="16"
              rx="2"
              fill="#D4AF37"
              opacity="0.75"
            />
            {/* Windshield */}
            <rect
              x="40"
              y="11"
              width="12"
              height="10"
              rx="1.5"
              fill="rgba(59,130,246,0.7)"
            />
            {/* Wheels */}
            <circle
              cx="14"
              cy="32"
              r="5"
              fill="#0a0a0a"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            <circle cx="14" cy="32" r="2" fill="#D4AF37" opacity="0.6" />
            <circle
              cx="50"
              cy="32"
              r="5"
              fill="#0a0a0a"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            <circle cx="50" cy="32" r="2" fill="#D4AF37" opacity="0.6" />
            {/* A.S.K label on body */}
            <text
              x="11"
              y="25"
              fontSize="6"
              fill="#0a0a0a"
              fontWeight="bold"
              fontFamily="monospace"
            >
              A.S.K
            </text>
            {/* Exhaust particles */}
            <motion.circle cx="3" cy="16" r="1.5" fill="rgba(212,175,55,0.4)">
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="0.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="16;8;16"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </motion.circle>
          </svg>
        </motion.div>

        {/* Destination marker */}
        <div className="absolute right-3" style={{ bottom: 22 }}>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2 }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{
                background: "rgba(34,197,94,0.25)",
                border: "2px solid #22c55e",
                boxShadow: "0 0 10px rgba(34,197,94,0.4)",
                color: "#22c55e",
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              ✓
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrackingPage() {
  const { actor } = useActor();
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState<bigint | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchOrder = useCallback(
    async (id: bigint) => {
      if (!actor) return;
      try {
        const result = await actor.getOrder(id);
        if (result && Array.isArray(result) && result.length > 0) {
          setOrder(result[0]);
          setNotFound(false);
        } else if (
          result === null ||
          (Array.isArray(result) && result.length === 0)
        ) {
          setOrder(null);
          setNotFound(true);
        }
      } catch {
        // silent
      }
    },
    [actor],
  );

  // Auto-load from URL hash
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/#track\?order=(\d+)/);
      if (match) {
        const id = BigInt(match[1]);
        setOrderId(match[1]);
        setActiveId(id);
        if (actor) fetchOrder(id);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [actor, fetchOrder]);

  // Poll at 500ms for near-instant updates (0.5s latency target)
  useEffect(() => {
    if (activeId && actor) {
      pollRef.current = setInterval(() => fetchOrder(activeId), 500);
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    }
  }, [activeId, actor, fetchOrder]);

  const handleTrack = async () => {
    if (!orderId.trim() || !actor) return;
    const id = BigInt(orderId.trim());
    setLoading(true);
    setNotFound(false);
    setOrder(null);
    setActiveId(id);
    try {
      await fetchOrder(id);
    } finally {
      setLoading(false);
    }
  };

  const shareLink = activeId
    ? `${window.location.origin}${window.location.pathname}#track?order=${activeId}`
    : "";

  const copyShareLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    toast.success("Tracking link copied!");
  };

  const currentStep = order ? stepIndex(order.status) : -1;
  const isOutForDelivery = order?.status === "Out for Delivery";

  return (
    <section
      id="track"
      className="min-h-screen px-4 py-12"
      style={{ background: "#0a0a0a" }}
      data-ocid="track.section"
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-14 h-14 rounded-full overflow-hidden mb-4"
            style={{ boxShadow: "0 0 22px rgba(212,175,55,0.55)" }}
          >
            <img
              src="/assets/uploads/IMG_2664-1.jpeg"
              alt="A.S.K Eagle"
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className="text-xl font-bold uppercase tracking-widest mb-1"
            style={{ color: "#D4AF37" }}
          >
            A.S.K ORDER TRACKING
          </h1>
          <p
            className="text-xs text-center"
            style={{ color: "rgba(212,175,55,0.55)" }}
          >
            Live order status — updated in real time
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder="Enter Your Order ID"
            data-ocid="track.order.input"
            className="flex-1 px-4 py-4 rounded-xl text-base outline-none"
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1.5px solid rgba(212,175,55,0.3)",
              color: "#D4AF37",
            }}
          />
          <button
            type="button"
            onClick={handleTrack}
            disabled={loading || !orderId.trim()}
            data-ocid="track.order.submit_button"
            className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #a08020 100%)",
              color: "#0a0a0a",
            }}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            TRACK
          </button>
        </div>

        {/* Not found */}
        {notFound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 rounded-2xl"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
            data-ocid="track.order.error_state"
          >
            <p className="text-red-400 font-bold">Order not found.</p>
            <p className="text-red-400/60 text-sm mt-1">
              Please check your Order ID.
            </p>
          </motion.div>
        )}

        {/* Order Result */}
        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-ocid="track.order.card"
            >
              {/* Live Truck Animation — shown only when Out for Delivery */}
              <AnimatePresence>
                {isOutForDelivery && (
                  <LiveTruckAnimation vehicleNumber={order.vehicleNumber} />
                )}
              </AnimatePresence>

              {/* Order Info */}
              <div
                className="p-5 rounded-2xl mb-5"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ color: "#D4AF37" }}
                    >
                      {order.clientName}
                    </h2>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(212,175,55,0.5)" }}
                    >
                      Order #{String(order.id)}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                    style={{
                      background:
                        order.status === "Delivered"
                          ? "rgba(34,197,94,0.15)"
                          : isOutForDelivery
                            ? "rgba(59,130,246,0.15)"
                            : "rgba(212,175,55,0.12)",
                      color:
                        order.status === "Delivered"
                          ? "#22c55e"
                          : isOutForDelivery
                            ? "#60a5fa"
                            : "#D4AF37",
                      border: `1px solid ${
                        order.status === "Delivered"
                          ? "rgba(34,197,94,0.3)"
                          : isOutForDelivery
                            ? "rgba(59,130,246,0.4)"
                            : "rgba(212,175,55,0.3)"
                      }`,
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <p
                  className="text-sm"
                  style={{ color: "rgba(212,175,55,0.7)" }}
                >
                  {order.itemsSummary}
                </p>
              </div>

              {/* Timeline */}
              <div
                className="p-5 rounded-2xl mb-5"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-5"
                  style={{ color: "rgba(212,175,55,0.6)" }}
                >
                  Order Timeline
                </h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div
                    className="absolute left-5 top-0 bottom-0 w-0.5"
                    style={{ background: "rgba(212,175,55,0.15)" }}
                  />
                  <div className="space-y-6">
                    {STEPS.map((step, idx) => {
                      const done = idx <= currentStep;
                      const isCurrent = idx === currentStep;
                      const isDeliveryStep = step.key === "Out for Delivery";
                      return (
                        <div key={step.key} className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className="relative z-10 flex items-center justify-center rounded-full flex-shrink-0"
                            style={{
                              width: 40,
                              height: 40,
                              background: done
                                ? isDeliveryStep && isCurrent
                                  ? "rgba(59,130,246,0.2)"
                                  : "rgba(212,175,55,0.2)"
                                : "rgba(255,255,255,0.04)",
                              border: done
                                ? isDeliveryStep && isCurrent
                                  ? "2px solid #60a5fa"
                                  : "2px solid #D4AF37"
                                : "2px solid rgba(255,255,255,0.1)",
                              boxShadow: isCurrent
                                ? isDeliveryStep
                                  ? "0 0 16px rgba(59,130,246,0.6)"
                                  : "0 0 16px rgba(212,175,55,0.5)"
                                : "none",
                            }}
                          >
                            {idx === 0 && (
                              <Package
                                className="w-4 h-4"
                                style={{ color: done ? "#D4AF37" : "#555" }}
                              />
                            )}
                            {idx === 1 && (
                              <CheckCircle2
                                className="w-4 h-4"
                                style={{ color: done ? "#D4AF37" : "#555" }}
                              />
                            )}
                            {idx === 2 && (
                              <Package
                                className="w-4 h-4"
                                style={{ color: done ? "#D4AF37" : "#555" }}
                              />
                            )}
                            {idx === 3 && (
                              <Truck
                                className="w-4 h-4"
                                style={{
                                  color: done
                                    ? isCurrent
                                      ? "#60a5fa"
                                      : "#D4AF37"
                                    : "#555",
                                }}
                              />
                            )}
                            {idx === 4 && (
                              <CheckCircle2
                                className="w-4 h-4"
                                style={{ color: done ? "#22c55e" : "#555" }}
                              />
                            )}
                          </div>
                          {/* Text */}
                          <div className="pt-2">
                            <p
                              className="text-sm font-bold"
                              style={{
                                color: done
                                  ? isDeliveryStep && isCurrent
                                    ? "#60a5fa"
                                    : "#D4AF37"
                                  : "rgba(255,255,255,0.2)",
                              }}
                            >
                              {step.label}
                              {isCurrent && (
                                <motion.span
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{
                                    repeat: Number.POSITIVE_INFINITY,
                                    duration: 1.5,
                                  }}
                                  className="ml-2 text-xs"
                                  style={{
                                    color: isDeliveryStep
                                      ? "#60a5fa"
                                      : "#D4AF37",
                                  }}
                                >
                                  ● LIVE
                                </motion.span>
                              )}
                            </p>
                            <p
                              className="text-xs mt-0.5"
                              style={{
                                color: done
                                  ? "rgba(212,175,55,0.5)"
                                  : "rgba(255,255,255,0.15)",
                              }}
                            >
                              {isCurrent && order.statusMessage
                                ? order.statusMessage
                                : step.desc}
                            </p>
                            {isCurrent &&
                              step.key === "Out for Delivery" &&
                              order.vehicleNumber && (
                                <p
                                  className="text-xs mt-1"
                                  style={{ color: "#60a5fa" }}
                                >
                                  Vehicle: {order.vehicleNumber}
                                </p>
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Last updated + share */}
              <div
                className="p-4 rounded-2xl flex items-center justify-between mb-5"
                style={{
                  background: "rgba(212,175,55,0.05)",
                  border: "1px solid rgba(212,175,55,0.15)",
                }}
              >
                <p
                  className="text-xs"
                  style={{ color: "rgba(212,175,55,0.5)" }}
                >
                  Last updated: {formatTs(order.updatedAt)}
                </p>
                <button
                  type="button"
                  onClick={copyShareLink}
                  data-ocid="track.share.button"
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-lg transition-all active:scale-95"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    color: "#D4AF37",
                  }}
                >
                  <Copy className="w-3.5 h-3.5" /> Share
                </button>
              </div>

              {/* Support contact */}
              <div
                className="p-4 rounded-2xl flex items-center gap-3"
                style={{
                  background: "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(212,175,55,0.12)",
                }}
              >
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "#D4AF37" }}
                />
                <div className="flex-1">
                  <p
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ color: "rgba(212,175,55,0.7)" }}
                  >
                    Need help?
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(212,175,55,0.45)" }}
                  >
                    Contact MD (Sufiyan) for support
                  </p>
                </div>
                <a
                  href="https://wa.me/918700722663"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide flex-shrink-0"
                  style={{
                    background: "rgba(37,211,102,0.15)",
                    border: "1px solid rgba(37,211,102,0.4)",
                    color: "#25d366",
                  }}
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
