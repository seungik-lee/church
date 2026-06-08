import { useNavigate } from "react-router";
import { ChevronLeft, Bell } from "lucide-react";

const NOTICES = [
  {
    id: 1,
    category: "각종예배",
    title: "오늘은 세계선교헌금 작정주일입니다.",
    date: "2026.06.08",
    isNew: true,
    content: "오늘은 세계선교헌금 작정주일입니다. 성도님들께서는 선교헌금 작정에 모두 동참하여 주시기 바랍니다."
  },
  {
    id: 2,
    category: "각종예배",
    title: "6월 첫째 주 새벽예배",
    date: "2026.06.07",
    isNew: true,
    content: "일 시: 6월 8일(월)~6월 12일(금) 새벽 5시 30분\n장 소: 대성전\n설 교: 이영훈 목사(9일 제직특화), 이상영 목사(8일), 엄태욱 목사(10일), 김민철 목사(11일, 12일)"
  },
  {
    id: 3,
    category: "각종예배",
    title: "남선교회 2026년도 6월 헌신예배",
    date: "2026.06.05",
    isNew: false,
    content: "일 시: 6월 17일(수) 오후 7시 30분\n장 소: 바울성전\n설 교: 김미정 선교사"
  },
  {
    id: 4,
    category: "각종예배",
    title: "장로회 2026년 6월 장로회 월례기도회",
    date: "2026.06.03",
    isNew: false,
    content: "일 시 : 6월 19일(금) 오후 7시\n장 소: 벧엘성전(세계선교센터 7층)\n설 교: 배정희 선교사"
  }
];

export function Notice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex flex-col" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Header */}
      <div 
        className="bg-white px-4 h-14 flex items-center gap-3 sticky top-0 z-10" 
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 active:bg-[#F9FAFB] rounded-full transition-colors"
        >
          <ChevronLeft size={24} style={{ color: "#111827" }} />
        </button>
        <h1 className="text-[#111827] text-lg font-bold">공지사항</h1>
      </div>

      <div className="px-4 py-5 flex-1">
        <div className="mb-5 flex items-center gap-2">
          <Bell size={20} style={{ color: "#749EAD" }} />
          <p className="text-[#111827] text-base font-bold">교회 소식을 알려드립니다</p>
        </div>

        <div className="space-y-3">
          {NOTICES.map((notice) => (
            <div 
              key={notice.id} 
              className="bg-white p-5 rounded-3xl"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
            >
              <div className="flex items-start gap-2 mb-2">
                {notice.isNew && (
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#212529", color: "#FFFFFF" }}
                  >
                    NEW
                  </span>
                )}
                <h3 className="text-[#111827] text-base font-bold leading-tight flex-1">
                  <span style={{ color: "#749EAD" }}>[{notice.category}]</span> {notice.title}
                </h3>
              </div>
              <p className="text-[#6B7280] text-xs mb-3">{notice.date}</p>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <p className="text-[#111827] text-sm leading-relaxed whitespace-pre-line">
                  {notice.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}