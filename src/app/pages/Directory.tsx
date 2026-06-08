import { useState } from "react";
import { ChevronLeft, Search, Phone, MessageCircle, User, Shield, X } from "lucide-react";
import { useNavigate } from "react-router";

// Trust Blue / Deep Green / Charcoal Color System

const primaryGrad = "linear-gradient(135deg, #111827, #212529)";

const MEMBERS = [
  { id: 1,  name: "김성민", position: "목사",   district: "담임",  phone: "010-1234-5678", group: "담임목사실",  initial: "김" },
  { id: 2,  name: "이은혜", position: "장로",   district: "1교구", phone: "010-2345-6789", group: "1교구",        initial: "이" },
  { id: 3,  name: "박믿음", position: "장로",   district: "2교구", phone: "010-3456-7890", group: "2교구",        initial: "박" },
  { id: 4,  name: "최소망", position: "권사",   district: "1교구", phone: "010-4567-8901", group: "1교구 1구역",  initial: "최" },
  { id: 5,  name: "정사랑", position: "권사",   district: "2교구", phone: "010-5678-9012", group: "2교구 3구역",  initial: "정" },
  { id: 6,  name: "한기도", position: "집사",   district: "1교구", phone: "010-6789-0123", group: "남선교회",     initial: "한" },
  { id: 7,  name: "윤찬양", position: "집사",   district: "3교구", phone: "010-7890-1234", group: "청년부",       initial: "윤" },
  { id: 8,  name: "임복음", position: "성도",   district: "2교구", phone: "010-8901-2345", group: "여선교회",     initial: "임" },
  { id: 9,  name: "오주님", position: "전도사", district: "청년부",phone: "010-9012-3456", group: "청년부",       initial: "오" },
  { id: 10, name: "서예배", position: "성도",   district: "3교구", phone: "010-0123-4567", group: "3교구 2구역",  initial: "서" },
  { id: 11, name: "강감사", position: "권사",   district: "4교구", phone: "010-1122-3344", group: "4교구 1구역",  initial: "강" },
  { id: 12, name: "조선교", position: "집사",   district: "5교구", phone: "010-2233-4455", group: "선교부",       initial: "조" },
  { id: 13, name: "유말씀", position: "성도",   district: "4교구", phone: "010-3344-5566", group: "청소년부",     initial: "유" },
  { id: 14, name: "배충성", position: "장로",   district: "3교구", phone: "010-4455-6677", group: "3교구",        initial: "배" },
  { id: 15, name: "허할렐", position: "성도",   district: "청년부",phone: "010-5566-7788", group: "청년부",       initial: "허" },
];

const POSITIONS = ["전체", "목사", "장로", "권사", "집사", "전도사", "성도"];

// Position colors aligned to brand palette
const POSITION_CONFIG: Record<string, { color: string; bg: string; gradient: string }> = {
  목사:   { color: "#749EAD", bg: "#EEF2FF", gradient: "linear-gradient(135deg, #212529, #111827)" },
  장로:   { color: "#FFFFFF", bg: "#212529", gradient: "linear-gradient(135deg, #212529, #212529)" },
  권사:   { color: "#FFFFFF", bg: "#212529", gradient: "linear-gradient(135deg, #212529, #212529)" },
  집사:   { color: "#111827", bg: "#E5E7EB", gradient: "linear-gradient(135deg, #111827, #111827)" },
  전도사: { color: "#749EAD", bg: "#EEF2FF", gradient: "linear-gradient(135deg, #212529, #111827)" },
  성도:   { color: "#6B7280", bg: "#F9FAFB", gradient: "linear-gradient(135deg, #6B7280, #6B7280)" },
};

export function Directory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("전체");
  const [showContact, setShowContact] = useState<number | null>(null);
  const [authConfirmed, setAuthConfirmed] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [showCallPopup, setShowCallPopup] = useState(true);

  const filtered = MEMBERS.filter((m) => {
    const matchSearch = m.name.includes(search) || m.position.includes(search) || m.group.includes(search);
    const matchPos    = selectedPosition === "전체" || m.position === selectedPosition;
    return matchSearch && matchPos;
  });

  /* ── Auth Gate ── */
  if (showAuth && !authConfirmed) {
    return (
      <div className="min-h-full flex flex-col" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="bg-white px-4 py-4 flex items-center gap-3 border-b border-gray-100">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-gray-900 text-base font-bold">교인 정보</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6" style={{ backgroundColor: "#FFFFFF" }}>
            <Shield size={40} style={{ color: "#749EAD" }} />
          </div>
          <h2 className="text-gray-900 text-xl font-bold mb-2 text-center">개인정보 보호 안내</h2>
          <p className="text-gray-500 text-sm text-center leading-relaxed mb-6">
            교인 정보는 성도들의 개인정보를 포함하고 있습니다.<br />
            개인정보보호법에 따라 인증된 교인만 열람 가능하며, 무단으로 외부에 공유하는 것은 금지됩니다.
          </p>
          <div className="rounded-2xl p-4 w-full mb-6 flex items-center gap-3" style={{ backgroundColor: "#EEF2FF" }}>
            <span className="text-xl">🔒</span>
            <p className="text-sm font-semibold" style={{ color: "#749EAD" }}>AES-256 암호화로 데이터가 보호됩니다</p>
          </div>
          <button className="w-full py-4 rounded-2xl font-semibold text-[#FFFFFF] font-bold" style={{ backgroundColor: "#212529" }}
            onClick={() => { setAuthConfirmed(true); setShowAuth(false); }}>
            동의하고 열람하기
          </button>
          <button className="mt-3 text-gray-400 text-sm" onClick={() => navigate("/")}>취소</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Sticky header */}
      <div className="bg-white sticky top-0 z-20" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-gray-900 text-base font-bold flex-1">교인 정보</h1>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: "#749EAD", backgroundColor: "#EEF2FF" }}>
            {MEMBERS.length}명
          </span>
        </div>
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-[#E5E7EB]" style={{ backgroundColor: "#FFFFFF" }}>
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 직분, 소속으로 검색"
              className="flex-1 bg-transparent text-sm text-[#111827] outline-none" />
          </div>
        </div>
        {/* Position filter */}
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2" style={{ width: "max-content" }}>
            {POSITIONS.map((pos) => (
              <button key={pos} onClick={() => setSelectedPosition(pos)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all"
                style={selectedPosition === pos
                  ? { backgroundColor: "#212529", color: "#FFFFFF" }
                  : { backgroundColor: "#FFFFFF", color: "#6B7280", border: "1px solid #E5E7EB" }}>
                {pos}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Incoming call popup — Primary */}
      {showCallPopup && (
        <div className="mx-4 mt-3">
          <div className="rounded-3xl p-4 flex items-center gap-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#FFFFFF] text-sm font-bold flex-shrink-0" style={{ backgroundColor: "#212529" }}>박</div>
            <div className="flex-1">
              <p className="text-[#6B7280] text-[10px] font-medium mb-0.5">📞 수신 전화 알림</p>
              <p className="text-[#111827] font-bold text-sm">박믿음 장로</p>
              <p className="text-[#6B7280] text-xs">2교구 · 010-3456-****</p>
            </div>
            <div className="flex gap-2 items-center">
              <button className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#111827" }}>
                <Phone size={14} className="text-white" />
              </button>
              <button className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#212529" }}>
                <Phone size={14} className="text-white" />
              </button>
              <button onClick={() => setShowCallPopup(false)} className="w-7 h-7 bg-black/5 rounded-xl flex items-center justify-center ml-1">
                <X size={12} className="text-[#111827]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Member list */}
      <div className="px-4 py-3">
        <p className="text-gray-400 text-xs font-medium mb-3">{filtered.length}명의 성도</p>
        <div className="space-y-2">
          {filtered.map((member) => {
            const cfg = POSITION_CONFIG[member.position] || POSITION_CONFIG["성도"];
            return (
              <div key={member.id}>
                <button
                  className={`w-full bg-white px-4 py-3.5 flex items-center gap-3 text-left transition-all ${showContact === member.id ? "rounded-t-2xl" : "rounded-2xl"}`}
                  style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}
                  onClick={() => setShowContact(showContact === member.id ? null : member.id)}
                >
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white text-base font-bold" style={{ background: cfg.gradient }}>
                    {member.initial}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-gray-900 text-sm font-bold">{member.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                        {member.position}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{member.group}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all`}
                    style={showContact === member.id ? { backgroundColor: "#212529" } : { backgroundColor: "#F9FAFB" }}>
                    <User size={12} style={showContact === member.id ? { color: "#FFFFFF" } : { color: "#E5E7EB" }} />
                  </div>
                </button>

                {showContact === member.id && (
                  <div className="bg-[#FFFFFF] border-x border-b border-[#E5E7EB] rounded-b-2xl px-4 py-3.5 flex items-center justify-between" style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.04)" }}>
                    <div>
                      <p className="text-xs font-bold" style={{ color: "#111827" }}>{member.name} {member.position}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{member.phone.replace(/-\d{4}-/, "-****-")}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: primaryGrad }}>
                        <Phone size={15} className="text-white" />
                      </button>
                      <button className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #212529, #111827)" }}>
                        <MessageCircle size={15} className="text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-3" style={{ backgroundColor: "#F9FAFB" }}>
              <User size={28} className="text-[#E5E7EB]" />
            </div>
            <p className="text-[#6B7280] text-sm">검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}