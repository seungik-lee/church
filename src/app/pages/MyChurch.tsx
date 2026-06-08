import { useNavigate } from "react-router";
import { ChevronRight, ChevronLeft, FileText, CheckSquare, Heart, Users, MessageCircle, Bell, Church, UserPlus } from "lucide-react";

const QUICK_LINKS = [
  { icon: Bell,         label: "공지사항",    path: "/notice" },
  { icon: FileText,     label: "주보",        path: "/bulletin" },
  { icon: CheckSquare,  label: "출석 체크",   path: "/attend" },
  { icon: Heart,        label: "중보 기도",   path: "/prayer" },
  { icon: Users,        label: "교우 정보",   path: "/directory" },
  { icon: MessageCircle,label: "교우 사랑", path: "/community" },
  { icon: Church,       label: "예배 안내",   path: "/worship-info" },
  { icon: UserPlus,     label: "새가족 등록 안내", path: "/newcomer" },
];

const RECENT_NOTICES = [
  { title: "[각종예배] 오늘은 세계선교헌금 작정주일입니다.", isNew: true },
  { title: "[각종예배] 6월 첫째 주 새벽예배", isNew: true },
  { title: "[각종예배] 남선교회 2026년도 6월 헌신예배", isNew: false },
  { title: "[각종예배] 장로회 2026년 6월 장로회 월례기도회", isNew: false },
];

const RECENT_BULLETINS = [
  { title: "6월 둘째 주 주보", date: "2026.06.14" },
];

const RECENT_PRAYERS = [
  { title: "수험생들을 위한 기도 부탁드립니다", author: "김기도 집사" },
  { title: "어머니의 건강 회복을 위해 기도해주세요", author: "이믿음 성도" },
  { title: "단기선교팀의 안전을 위해 기도합니다", author: "박소망 청년" },
];

export function MyChurch() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="bg-white px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <h1 className="text-[#111827] text-lg font-bold flex-1">나의 교회</h1>
        </div>
        <p className="text-[#6B7280] text-sm pl-12">우리교회의 소식과 교제</p>
      </div>

      {/* Dashboard snippet (Dashboard details could go here) */}
      <div className="px-4 mt-6 space-y-4">
        {/* 최근 공지사항 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#111827] text-sm font-bold">최근 공지사항</h2>
            <button onClick={() => navigate("/notice")} className="text-[10px] font-bold text-[#749EAD]">더보기</button>
          </div>
          <div className="space-y-3">
            {RECENT_NOTICES.map((notice, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: notice.isNew ? "#749EAD" : "#6B7280" }} />
                <p className="text-[#111827] text-sm truncate flex-1">{notice.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 주보 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#111827] text-sm font-bold">주보</h2>
            <button onClick={() => navigate("/bulletin")} className="text-[10px] font-bold text-[#749EAD]">더보기</button>
          </div>
          <div className="space-y-3">
            {RECENT_BULLETINS.map((bulletin, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <FileText size={14} style={{ color: "#6B7280" }} />
                  <p className="text-[#111827] text-sm truncate">{bulletin.title}</p>
                </div>
                <span className="text-xs text-[#6B7280]">{bulletin.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 중보기도 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#111827] text-sm font-bold">중보기도</h2>
            <button onClick={() => navigate("/prayer")} className="text-[10px] font-bold text-[#749EAD]">더보기</button>
          </div>
          <div className="space-y-3">
            {RECENT_PRAYERS.map((prayer, idx) => (
              <div key={idx} className="flex flex-col gap-0.5">
                <p className="text-[#111827] text-sm truncate">{prayer.title}</p>
                <p className="text-xs text-[#6B7280]">{prayer.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 pb-8">
        <h2 className="text-[#111827] text-base font-bold mb-4">교회 메뉴</h2>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_LINKS.map((link, idx) => (
            <button
              key={idx}
              onClick={() => navigate(link.path)}
              className="flex items-center gap-3 p-4 bg-white rounded-3xl active:scale-95 transition-transform text-left border border-[#F9FAFB]"
              style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}
            >
              <div
                className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <link.icon size={20} style={{ color: "#749EAD" }} />
              </div>
              <span className="text-[#111827] text-sm font-bold flex-1">{link.label}</span>
              <ChevronRight size={14} style={{ color: "#E5E7EB" }} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}