import { useNavigate } from "react-router";
import { User, QrCode, Settings, Bell, ChevronRight, ChevronLeft, HelpCircle, Shield, LogOut } from "lucide-react";

const MENU_ITEMS = [
  { icon: QrCode, label: "교인증 (바코드/QR)", path: "/member-card" },
  { icon: User, label: "내 정보 관리", path: null },
];

const SETTING_ITEMS = [
  { icon: Bell, label: "푸시 알림 설정", path: "/settings/notifications" },
  { icon: Shield, label: "개인정보 보호", path: null },
  { icon: HelpCircle, label: "도움말 / 문의", path: null },
];

export function More() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Profile Header */}
      <div className="px-4 pt-5 pb-6 bg-white" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <h1 className="text-[#111827] text-lg font-bold flex-1">내정보</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-white rounded-3xl p-5 border border-[#E5E7EB]" style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
          <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-lg text-white" style={{ backgroundColor: "#212529" }}>
            김
          </div>
          <div className="flex-1">
            <h2 className="text-[#111827] text-lg font-bold flex items-center gap-2">
              김성도 성도 <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EEF2FF", color: "#749EAD" }}>정식등록</span>
            </h2>
            <p className="text-[#6B7280] text-sm mt-0.5">1교구 3구역</p>
            <p className="text-[#6B7280] text-xs mt-0.5">교인번호: 202301234</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <h3 className="text-[#111827] text-sm font-bold mb-3 px-1">내 정보</h3>
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] mb-6">
          {MENU_ITEMS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => item.path && navigate(item.path)}
              className={`w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${
                idx < MENU_ITEMS.length - 1 ? "border-b border-[#F9FAFB]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EEF2FF" }}>
                  <item.icon size={18} style={{ color: "#749EAD" }} />
                </div>
                <span className="text-[#111827] text-sm font-bold">{item.label}</span>
              </div>
              <ChevronRight size={16} style={{ color: "#E5E7EB" }} />
            </button>
          ))}
        </div>

        <h3 className="text-[#111827] text-sm font-bold mb-3 px-1">설정</h3>
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] mb-6">
          {SETTING_ITEMS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => item.path && navigate(item.path)}
              className={`w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors ${
                idx < SETTING_ITEMS.length - 1 ? "border-b border-[#F9FAFB]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
                  <item.icon size={18} style={{ color: "#6B7280" }} />
                </div>
                <span className="text-[#111827] text-sm font-medium">{item.label}</span>
              </div>
              <ChevronRight size={16} style={{ color: "#E5E7EB" }} />
            </button>
          ))}
        </div>

        <button className="w-full bg-white rounded-3xl p-4 flex items-center justify-center gap-2 border border-[#E5E7EB] active:bg-gray-50 transition-colors">
          <LogOut size={16} style={{ color: "#BE123C" }} />
          <span className="text-[#BE123C] text-sm font-bold">로그아웃</span>
        </button>
      </div>
    </div>
  );
}