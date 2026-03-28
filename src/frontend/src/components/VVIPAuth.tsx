import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Crown, Loader2, LogOut, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { VVIPPartnerProfile } from "../backend.d";

// ─── Registration Dialog ───────────────────────────────────────────────────
interface RegisterDialogProps {
  onClose: () => void;
  onRegistered: (profile: VVIPPartnerProfile) => void;
}

function RegisterDialog({ onClose, onRegistered }: RegisterDialogProps) {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.registerVVIPPartner(
        fullName.trim(),
        phone.trim(),
        businessName.trim(),
      );
      const profile = await actor.getVVIPPartnerProfile();
      return profile;
    },
    onSuccess: (profile) => {
      qc.invalidateQueries({ queryKey: ["vvip-status"] });
      qc.invalidateQueries({ queryKey: ["vvip-profile"] });
      if (profile) {
        onRegistered(profile);
        toast.success(`Welcome to VVIP Partner Program, ${profile.fullName}!`);
      }
      onClose();
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !businessName.trim()) {
      toast.error("Please fill all fields.");
      return;
    }
    mutation.mutate();
  };

  const inputStyle = {
    background: "#0A0A0A",
    border: "1px solid rgba(212,175,55,0.4)",
    color: "#D4AF37",
    outline: "none",
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      data-ocid="vvip.dialog"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-md rounded-xl p-8"
        style={{
          background: "#0A0A0A",
          border: "1px solid rgba(212,175,55,0.5)",
          boxShadow: "0 0 40px rgba(212,175,55,0.15)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.4)",
            }}
          >
            <Crown className="w-5 h-5" style={{ color: "#D4AF37" }} />
          </div>
          <div>
            <h2
              className="font-heading font-black text-lg uppercase tracking-widest"
              style={{ color: "#D4AF37" }}
            >
              VVIP Partner Registration
            </h2>
            <p className="text-xs" style={{ color: "rgba(212,175,55,0.5)" }}>
              A.S.K Exclusive Partner Program
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="vvip-fullname"
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(212,175,55,0.7)" }}
            >
              Full Name
            </label>
            <input
              id="vvip-fullname"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm font-medium placeholder:text-yellow-900"
              style={inputStyle}
              data-ocid="vvip.input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="vvip-phone"
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(212,175,55,0.7)" }}
            >
              Phone Number
            </label>
            <input
              id="vvip-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm font-medium placeholder:text-yellow-900"
              style={inputStyle}
              data-ocid="vvip.input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="vvip-business"
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(212,175,55,0.7)" }}
            >
              Business Name
            </label>
            <input
              id="vvip-business"
              type="text"
              placeholder="Your business or shop name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm font-medium placeholder:text-yellow-900"
              style={inputStyle}
              data-ocid="vvip.input"
            />
          </div>

          <div
            className="rounded-lg px-4 py-3 mt-1 text-xs"
            style={{
              background: "rgba(212,175,55,0.06)",
              border: "1px solid rgba(212,175,55,0.2)",
              color: "rgba(212,175,55,0.6)",
            }}
          >
            ✦ As a VVIP Partner you unlock exclusive wholesale pricing — 15%
            below retail on all items.
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all"
              style={{
                background: "transparent",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "rgba(212,175,55,0.5)",
              }}
              data-ocid="vvip.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              style={{
                background: mutation.isPending
                  ? "rgba(212,175,55,0.3)"
                  : "linear-gradient(135deg, #D4AF37, #FFD700)",
                color: "#0A0A0A",
                cursor: mutation.isPending ? "not-allowed" : "pointer",
              }}
              data-ocid="vvip.submit_button"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4" />
                  Register as VVIP Partner
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Hooks ─────────────────────────────────────────────────────────────────
export function useVVIPStatus() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const isPartnerQuery = useQuery({
    queryKey: ["vvip-status", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isVVIPPartner();
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  const profileQuery = useQuery({
    queryKey: ["vvip-profile", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getVVIPPartnerProfile();
    },
    enabled:
      !!actor && !isFetching && !!identity && isPartnerQuery.data === true,
  });

  return {
    isVVIP: isPartnerQuery.data === true,
    profile: profileQuery.data ?? null,
    isLoading: isPartnerQuery.isLoading,
  };
}

// ─── Nav Button ────────────────────────────────────────────────────────────
interface VVIPNavButtonProps {
  className?: string;
}

export function VVIPNavButton({ className = "" }: VVIPNavButtonProps) {
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const { isVVIP, profile, isLoading } = useVVIPStatus();
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();
  const [showRegister, setShowRegister] = useState(false);
  const [_welcomeShown, setWelcomeShown] = useState(false);

  const isAuthenticated = !!identity;

  // After login: check status and open register dialog if needed, or show welcome
  useEffect(() => {
    if (!isAuthenticated || isLoading || isFetching || !actor) return;
    if (isVVIP && profile) {
      setWelcomeShown((prev) => {
        if (!prev) {
          toast.success(
            `Welcome back, ${profile.fullName}! 👑 VVIP Partner Access Unlocked.`,
            { duration: 5000 },
          );
          return true;
        }
        return prev;
      });
    } else if (!isVVIP) {
      setShowRegister((prev) => prev || true);
    }
  }, [isAuthenticated, isVVIP, isLoading, isFetching, actor, profile]);

  const handleLogin = () => {
    if (isAuthenticated) {
      clear();
      qc.invalidateQueries({ queryKey: ["vvip-status"] });
      qc.invalidateQueries({ queryKey: ["vvip-profile"] });
      setWelcomeShown(false);
    } else {
      login();
    }
  };

  const goldStyle = {
    background: "linear-gradient(135deg, #D4AF37, #FFD700)",
    color: "#0A0A0A",
  };

  const outlineStyle = {
    background: "transparent",
    border: "1px solid rgba(212,175,55,0.6)",
    color: "#D4AF37",
  };

  return (
    <>
      <AnimatePresence>
        {showRegister && isAuthenticated && !isVVIP && (
          <RegisterDialog
            onClose={() => setShowRegister(false)}
            onRegistered={() => {
              setShowRegister(false);
              setWelcomeShown(true);
            }}
          />
        )}
      </AnimatePresence>

      {isAuthenticated && isVVIP ? (
        <div className={`flex items-center gap-2 ${className}`}>
          <div
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded text-xs font-black uppercase tracking-widest"
            style={goldStyle}
          >
            <Crown className="w-3.5 h-3.5" />
            VVIP PARTNER ✓
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="p-2 rounded transition-all"
            style={outlineStyle}
            title="Logout"
            data-ocid="vvip.logout_button"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleLogin}
          disabled={isLoggingIn}
          className={`px-5 py-2 text-xs font-black tracking-widest uppercase hidden md:inline-flex items-center gap-2 rounded transition-all ${className}`}
          style={outlineStyle}
          data-ocid="nav.register_login.button"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              CONNECTING...
            </>
          ) : (
            <>
              <Star className="w-3.5 h-3.5" />
              REGISTER / LOGIN
            </>
          )}
        </button>
      )}
    </>
  );
}

// ─── Mobile Nav Button ─────────────────────────────────────────────────────
export function VVIPMobileNavButton() {
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const { isVVIP, profile } = useVVIPStatus();
  const qc = useQueryClient();

  const isAuthenticated = !!identity;

  const handleLogin = () => {
    if (isAuthenticated) {
      clear();
      qc.invalidateQueries({ queryKey: ["vvip-status"] });
      qc.invalidateQueries({ queryKey: ["vvip-profile"] });
    } else {
      login();
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={isLoggingIn}
      className="px-4 py-2 text-xs font-black tracking-widest uppercase text-center rounded mt-1 w-full flex items-center justify-center gap-2"
      style={{
        background:
          isAuthenticated && isVVIP
            ? "linear-gradient(135deg, #D4AF37, #FFD700)"
            : "transparent",
        border: "1px solid rgba(212,175,55,0.6)",
        color: isAuthenticated && isVVIP ? "#0A0A0A" : "#D4AF37",
      }}
      data-ocid="nav.mobile_register_login.button"
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> CONNECTING...
        </>
      ) : isAuthenticated && isVVIP ? (
        <>
          <Crown className="w-3.5 h-3.5" /> VVIP PARTNER ✓
        </>
      ) : isAuthenticated ? (
        <>
          <Star className="w-3.5 h-3.5" /> COMPLETE REGISTRATION
        </>
      ) : (
        <>
          <Star className="w-3.5 h-3.5" /> REGISTER / LOGIN
        </>
      )}
      {isAuthenticated && isVVIP && profile && (
        <span className="text-xs font-normal ml-1 opacity-70">
          ({profile.businessName})
        </span>
      )}
    </button>
  );
}

// ─── Status Bar ────────────────────────────────────────────────────────────
export function VVIPStatusBar() {
  const { identity } = useInternetIdentity();
  const { isVVIP, profile } = useVVIPStatus();

  if (!identity || !isVVIP || !profile) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="w-full flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
      style={{
        background:
          "linear-gradient(90deg, rgba(212,175,55,0.12) 0%, rgba(255,215,0,0.18) 50%, rgba(212,175,55,0.12) 100%)",
        borderBottom: "1px solid rgba(212,175,55,0.3)",
        color: "#FFD700",
      }}
      data-ocid="vvip.panel"
    >
      <Crown className="w-3.5 h-3.5" />
      <span>🟡 VVIP Partner Access Active</span>
      <span style={{ color: "rgba(212,175,55,0.6)" }}>—</span>
      <span>{profile.businessName}</span>
    </motion.div>
  );
}

// ─── VVIP Price Badge (for Product Cards) ─────────────────────────────────
interface VVIPPriceProps {
  retailPrice: number;
  unit: string;
}

export function VVIPPriceBadge({ retailPrice, unit }: VVIPPriceProps) {
  const { identity } = useInternetIdentity();
  const { isVVIP } = useVVIPStatus();

  const partnerPrice = Math.round(retailPrice * 0.85);

  if (!identity || !isVVIP) {
    return (
      <p
        className="text-xs font-semibold mt-0.5"
        style={{ color: "rgba(212,175,55,0.4)" }}
      >
        🔒 LOGIN TO VIEW PARTNER PRICE
      </p>
    );
  }

  return (
    <div
      className="flex items-center gap-1.5 mt-0.5 px-2 py-0.5 rounded"
      style={{
        background: "rgba(212,175,55,0.12)",
        border: "1px solid rgba(212,175,55,0.3)",
      }}
    >
      <Crown className="w-3 h-3" style={{ color: "#FFD700" }} />
      <span className="text-xs font-black" style={{ color: "#FFD700" }}>
        Partner: ₹{partnerPrice}/{unit}
      </span>
    </div>
  );
}
