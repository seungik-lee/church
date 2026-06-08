import { ChevronLeft, Bell, Info, Calendar, Heart } from "lucide-react";
import { useNavigate } from "react-router";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "notice",
    title: "이번 주 주일예배 안내",
    time: "2시간 전",
    content: "주일 2부 예배는 본당에서 드립니다. 실시간 방송도 함께 진행됩니다.",
    isRead: false,
  },
  {
    id: 2,
    type: "group",
    title: "구역모임 장소 변경 안내",
    time: "어제",
    content: "이번 주 사랑구역 모임은 친교실이 아닌 교육관 2층에서 진행됩니다.",
    isRead: false,
  },
  {
    id: 3,
    type: "prayer",
    title: "중보기도 요청",
    time: "어제",
    content: "박믿음 성도님의 건강 회복을 위해 성도님들의 많은 기도 부탁드립니다.",
    isRead: true,
  },
  {
    id: 4,
    type: "offering",
    title: "헌금 확인 안내",
    time: "2일 전",
    content: "온라인으로 드려진 헌금(십일조) 입금이 정상적으로 확인되었습니다. 감사합니다.",
    isRead: true,
  },
];

export function Notifications() {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case "notice":
        return <Info size={16} style={{ color: "#749EAD" }} />;
      case "group":
        return <Calendar size={16} style={{ color: "#749EAD" }} />;
      case "prayer":
        return <Heart size={16} style={{ color: "#749EAD" }} />;
      case "offering":
        return <Bell size={16} style={{ color: "#749EAD" }} />;
      default:
        return <Bell size={16} style={{ color: "#749EAD" }} />;
    }
  };

  return (
    <div className="min-h-full flex flex-col pb-8" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Header */}
      <div
        className="bg-white px-4 h-14 flex items-center gap-3 sticky top-0 z-10"
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-2xl flex items-center justify-center transition-colors active:opacity-70"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <ChevronLeft size={18} className="text-[#111827]" />
        </button>
        <h1 className="text-[#111827] text-base font-bold flex-1">알림</h1>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 flex flex-col gap-3">
        {NOTIFICATIONS.map((notif) => (
          <div
            key={notif.id}
            className="bg-white rounded-2xl p-4 transition-all"
            style={{
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              opacity: notif.isRead ? 0.6 : 1,
            }}
          >
            <div className="flex gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h2 className="text-[#111827] text-sm font-bold flex items-center gap-1.5 leading-tight">
                    {notif.title}
                    {!notif.isRead && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "#212529" }}
                      ></span>
                    )}
                  </h2>
                  <span className="text-[#6B7280] text-[11px] whitespace-nowrap pt-0.5">
                    {notif.time}
                  </span>
                </div>
                <p className="text-[#6B7280] text-xs leading-relaxed break-keep">
                  {notif.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}