import { useCallback, useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface VisitRecord {
  timestamp: number;
  city: string;
  page: string;
}

interface DailyBucket {
  label: string;
  count: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getVisits(): VisitRecord[] {
  try {
    return JSON.parse(localStorage.getItem("ask_visits") || "[]");
  } catch {
    return [];
  }
}

function computeStats(visits: VisitRecord[]) {
  const now = Date.now();
  const DAY = 86400000;
  const WEEK = 7 * DAY;

  const todayVisits = visits.filter((v) => now - v.timestamp < DAY).length;
  const weekVisits = visits.filter((v) => now - v.timestamp < WEEK).length;
  const totalVisits = visits.length;
  const noidaGhazVisits = visits.filter(
    (v) => v.city === "Noida/Ghaziabad",
  ).length;
  const otherVisits = totalVisits - noidaGhazVisits;

  return { todayVisits, weekVisits, totalVisits, noidaGhazVisits, otherVisits };
}

function computeDailyBuckets(visits: VisitRecord[], days = 14): DailyBucket[] {
  const now = Date.now();
  const DAY = 86400000;
  const buckets: DailyBucket[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const bucketStart = now - (i + 1) * DAY;
    const bucketEnd = now - i * DAY;
    const count = visits.filter(
      (v) => v.timestamp >= bucketStart && v.timestamp < bucketEnd,
    ).length;
    const date = new Date(bucketEnd);
    const label = `${date.getDate()}/${date.getMonth() + 1}`;
    buckets.push({ label, count });
  }

  return buckets;
}

// ─── SVG Bar Chart ────────────────────────────────────────────────────────────
function BarChart({ buckets }: { buckets: DailyBucket[] }) {
  const maxCount = Math.max(...buckets.map((b) => b.count), 1);
  const chartWidth = 600;
  const chartHeight = 160;
  const barWidth = Math.floor(chartWidth / buckets.length) - 4;
  const padding = { left: 32, right: 8, top: 12, bottom: 40 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  return (
    <div className="overflow-x-auto w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        height={chartHeight}
        role="img"
        aria-label="Daily visitor bar chart for the last 14 days"
        style={{ minWidth: "320px" }}
      >
        <title>Daily visitor bar chart — last 14 days</title>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = padding.top + plotHeight - frac * plotHeight;
          const val = Math.round(frac * maxCount);
          return (
            <g key={frac}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="rgba(212,175,55,0.15)"
                strokeWidth="1"
              />
              <text
                x={padding.left - 4}
                y={y + 4}
                textAnchor="end"
                fontSize="9"
                fill="rgba(212,175,55,0.5)"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {buckets.map((b, i) => {
          const barHeight =
            maxCount > 0 ? (b.count / maxCount) * plotHeight : 0;
          const x =
            padding.left +
            (i / buckets.length) * plotWidth +
            (plotWidth / buckets.length - barWidth) / 2;
          const y = padding.top + plotHeight - barHeight;
          const isToday = i === buckets.length - 1;

          return (
            <g key={b.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={
                  isToday ? "rgba(212,175,55,0.95)" : "rgba(212,175,55,0.6)"
                }
                rx="2"
              />
              {b.count > 0 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 3}
                  textAnchor="middle"
                  fontSize="9"
                  fill="rgba(212,175,55,0.9)"
                >
                  {b.count}
                </text>
              )}
              <text
                x={x + barWidth / 2}
                y={chartHeight - padding.bottom + 14}
                textAnchor="middle"
                fontSize="8"
                fill="rgba(212,175,55,0.55)"
                transform={`rotate(-35, ${x + barWidth / 2}, ${chartHeight - padding.bottom + 14})`}
              >
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ASK@TRACKER786") {
      sessionStorage.setItem("ask_admin_auth", "1");
      onLogin();
    } else {
      setError("Access denied. Incorrect password.");
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #001233 0%, #002366 40%, #001a4d 100%)",
      }}
      data-ocid="admin.analytics.modal"
    >
      <div
        className="w-full max-w-sm"
        style={{
          animation: shaking
            ? "shake 0.6s cubic-bezier(.36,.07,.19,.97) both"
            : "none",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="relative rounded-full"
            style={{
              width: "100px",
              height: "100px",
              boxShadow:
                "0 0 32px 10px rgba(212,175,55,0.5), 0 0 60px 20px rgba(212,175,55,0.2)",
              border: "2px solid rgba(212,175,55,0.6)",
            }}
          >
            <img
              src="/assets/uploads/IMG_2664-1.jpeg"
              alt="A.S.K VVIP Eagle Logo"
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/IMG_2664.jpeg";
              }}
            />
          </div>
          <div className="mt-4 text-center">
            <h1
              className="text-2xl font-black uppercase tracking-widest"
              style={{ color: "#D4AF37" }}
            >
              A.S.K Analytics
            </h1>
            <p
              className="text-xs mt-1 uppercase tracking-widest"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              SAHIBABAD, GHAZIABAD & DELHI NCR
            </p>
            <p
              className="text-xs mt-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Private Owner Dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          data-ocid="admin.analytics.panel"
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(212,175,55,0.3)" }}
          >
            <input
              type="password"
              placeholder="Enter access password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 text-sm outline-none"
              style={{
                background: "rgba(0,24,71,0.8)",
                color: "#fff",
                caretColor: "#D4AF37",
              }}
              autoComplete="current-password"
              data-ocid="admin.analytics.input"
            />
          </div>

          {error && (
            <p
              className="text-xs text-center"
              style={{ color: "#ef4444" }}
              data-ocid="admin.analytics.error_state"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-black uppercase tracking-widest text-sm"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)",
              color: "#001233",
              boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
              touchAction: "manipulation",
            }}
            data-ocid="admin.analytics.submit_button"
          >
            ACCESS DASHBOARD
          </button>
        </form>

        <style>{`
          @keyframes shake {
            10%, 90% { transform: translateX(-1px); }
            20%, 80% { transform: translateX(2px); }
            30%, 50%, 70% { transform: translateX(-4px); }
            40%, 60% { transform: translateX(4px); }
          }
        `}</style>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{
        background: highlight ? "rgba(212,175,55,0.12)" : "rgba(0,24,71,0.6)",
        border: `1px solid ${
          highlight ? "rgba(212,175,55,0.6)" : "rgba(212,175,55,0.2)"
        }`,
      }}
    >
      <span
        className="text-3xl font-black tabular-nums"
        style={{ color: "#D4AF37" }}
      >
        {value}
      </span>
      <span
        className="text-xs uppercase tracking-wider"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export function AdminAnalyticsDashboard() {
  const [authed, setAuthed] = useState(
    sessionStorage.getItem("ask_admin_auth") === "1",
  );
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const loadData = useCallback(() => {
    setVisits(getVisits());
    setLastRefreshed(new Date());
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  const stats = computeStats(visits);
  const buckets = computeDailyBuckets(visits, 14);
  const totalPct =
    stats.totalVisits > 0
      ? Math.round((stats.noidaGhazVisits / stats.totalVisits) * 100)
      : 0;
  const otherPct = 100 - totalPct;

  return (
    <div
      className="min-h-screen font-body"
      style={{
        background:
          "linear-gradient(135deg, #001233 0%, #002366 40%, #001a4d 100%)",
      }}
      data-ocid="admin.analytics.panel"
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between gap-4"
        style={{
          background: "rgba(0,18,51,0.98)",
          borderBottom: "1px solid rgba(212,175,55,0.25)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/assets/uploads/IMG_2664-1.jpeg"
            alt="A.S.K Logo"
            className="rounded-full object-cover flex-shrink-0"
            style={{
              width: "44px",
              height: "44px",
              border: "2px solid rgba(212,175,55,0.5)",
              boxShadow: "0 0 12px rgba(212,175,55,0.4)",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/IMG_2664.jpeg";
            }}
          />
          <div>
            <h1
              className="text-sm font-black uppercase tracking-wider leading-none"
              style={{ color: "#D4AF37" }}
            >
              A.S.K Private Analytics
            </h1>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(212,175,55,0.45)" }}
            >
              Owner-Only Visitor Intelligence
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.hash = "";
            window.location.reload();
          }}
          className="text-xs uppercase tracking-wider px-3 py-2 rounded-lg flex-shrink-0"
          style={{
            border: "1px solid rgba(212,175,55,0.3)",
            color: "rgba(212,175,55,0.7)",
            background: "transparent",
            touchAction: "manipulation",
          }}
          data-ocid="admin.analytics.close_button"
        >
          ← Back to Site
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Stats Grid */}
        <section>
          <h2
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "rgba(212,175,55,0.5)" }}
          >
            Visitor Overview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label="Today's Visitors"
              value={stats.todayVisits}
              highlight
            />
            <StatCard label="This Week" value={stats.weekVisits} />
            <StatCard
              label="All-Time Total"
              value={stats.totalVisits}
              highlight
            />
            <StatCard
              label="Noida / Ghaziabad"
              value={stats.noidaGhazVisits}
              highlight
            />
            <StatCard label="Other Locations" value={stats.otherVisits} />
          </div>
        </section>

        {/* Bar Chart */}
        <section
          className="rounded-2xl p-4"
          style={{
            background: "rgba(0,18,51,0.7)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(212,175,55,0.7)" }}
            >
              Daily Visits — Last 14 Days
            </h2>
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: "rgba(212,175,55,0.12)",
                color: "rgba(212,175,55,0.7)",
              }}
            >
              Today →
            </span>
          </div>
          <BarChart buckets={buckets} />
        </section>

        {/* City Breakdown */}
        <section
          className="rounded-2xl p-4"
          style={{
            background: "rgba(0,18,51,0.7)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <h2
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            City Breakdown
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: "#fff" }}>Noida / Ghaziabad</span>
                <span style={{ color: "#D4AF37", fontWeight: 700 }}>
                  {totalPct}%
                </span>
              </div>
              <div
                className="rounded-full overflow-hidden"
                style={{
                  height: "8px",
                  background: "rgba(212,175,55,0.12)",
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${totalPct}%`,
                    background:
                      "linear-gradient(90deg, #D4AF37 0%, #f0d060 100%)",
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: "#fff" }}>Other Locations</span>
                <span
                  style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700 }}
                >
                  {otherPct}%
                </span>
              </div>
              <div
                className="rounded-full overflow-hidden"
                style={{
                  height: "8px",
                  background: "rgba(212,175,55,0.12)",
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${otherPct}%`,
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.5) 100%)",
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Refresh Controls */}
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Last refreshed:{" "}
            {lastRefreshed.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <button
            type="button"
            onClick={loadData}
            className="text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider"
            style={{
              background: "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.35)",
              color: "#D4AF37",
              touchAction: "manipulation",
            }}
            data-ocid="admin.analytics.secondary_button"
          >
            ↻ Refresh Data
          </button>
        </div>

        {/* Security Note */}
        <div
          className="rounded-xl p-3 text-center"
          style={{
            background: "rgba(212,175,55,0.05)",
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          <p className="text-xs" style={{ color: "rgba(212,175,55,0.4)" }}>
            🔒 Private data — visible only on this device. Visit data is stored
            locally for privacy.
          </p>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("ask_admin_auth");
            window.location.hash = "";
            window.location.reload();
          }}
          className="w-full py-2 rounded-xl text-xs uppercase tracking-widest"
          style={{
            border: "1px solid rgba(255,80,80,0.3)",
            color: "rgba(255,100,100,0.6)",
            background: "transparent",
            touchAction: "manipulation",
          }}
          data-ocid="admin.analytics.cancel_button"
        >
          Logout & Clear Session
        </button>
      </main>
    </div>
  );
}
