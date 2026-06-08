import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Home, Heart, Church, Users, User, Newspaper,
  Cross, Bell
} from "lucide-react";
import logoImg from "../../imports/yfgc_hearder_logo_color.png";

// ─── Color System: Trust Blue / Deep Green / Charcoal ─────────
// Primary Blue : #1A3673  | Deep Green    : #19632B
// Text Charcoal: #111827  | Section Bg    : #F9FAFB
// Border/Muted : #E5E7EB  | Text muted    : #6B7280
// ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { path: "/",         icon: Home,          label: "홈"    },
  { path: "/my-church",icon: Church,        label: "나의 교회" },
  { path: "/cells",    icon: Users,         label: "나의 구역"  },
  { path: "/offering", icon: Heart,         label: "헌금"  },
  { path: "/more",     icon: User,          label: "내정보"},
];

export function Layout() {
  const navigate     = useNavigate();
  const location     = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isMoreActive = () => {
    const morePaths = ["/more", "/directory", "/groups", "/prayer", "/member-card", "/sermon"];
    return morePaths.some((p) => location.pathname.startsWith(p));
  };

  return (
    <div
      className="flex flex-col max-w-[430px] w-full mx-auto relative overflow-x-hidden"
      style={{ height: "100dvh", overflow: "hidden", backgroundColor: "#F9FAFB" }}
    >
      {/* ── Fixed Top Header ─────────────────────────── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: 56,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          zIndex: 50,
        }}
      >
        {/* Church name */}
        <div className="flex items-center">
          <img src={logoImg} alt="우리교회" className="h-8 w-auto object-contain" />
        </div>
        
        {/* Actions */}
        <div className="flex items-center">
          {location.pathname !== "/notifications" && (
            <button 
              onClick={() => navigate("/notifications")}
              className="w-9 h-9 flex items-center justify-center relative rounded-full transition-colors active:bg-gray-100"
            >
              <Bell size={20} className="text-[#111827]" />
              {/* Unread badge indicator */}
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#212529" }}></span>
            </button>
          )}
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F9FAFB]">
        <Outlet />
      </div>

      {/* ── Bottom Navigation ────────────────────────── */}
      <div
        className="flex-shrink-0 bg-white"
        style={{
          borderTop: "1px solid #E5E7EB",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
        }}
      >
        <div className="flex items-center justify-around px-4 pt-3 pb-1">
          {NAV_ITEMS.map((item) => {
            const active =
              item.path === "/more"
                ? isMoreActive()
                : isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 flex-1 transition-all duration-200 active:scale-95"
              >
                {/* Icon area */}
                <div
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: active ? "#1A3673" : "transparent",
                  }}
                >
                  <item.icon
                    size={20}
                    strokeWidth={active ? 2.5 : 1.8}
                    style={{
                      color: active ? "#FFFFFF" : "#6B7280",
                    }}
                  />
                </div>
                {/* Label */}
                <span
                  className="text-xs font-bold"
                  style={{
                    color: active ? "#1A3673" : "#6B7280",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
