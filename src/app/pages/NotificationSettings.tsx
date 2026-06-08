import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function NotificationSettings() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    notice: true,
    group: true,
    community: false,
    prayer: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
        <h1 className="text-[#111827] text-base font-bold flex-1">푸시 알림 설정</h1>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[#6B7280] text-xs mb-4 pl-1">
          수신하고 싶은 알림 종류를 선택해주세요.
        </p>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          {/* Item: Church Notice */}
          <div className="flex items-center justify-between p-4 border-b border-[#F9FAFB]">
            <div>
              <h2 className="text-[#111827] text-sm font-medium mb-1">나의 교회 공지 알림</h2>
              <p className="text-[#6B7280] text-[11px]">주보, 교회 행사 등 중요한 공지사항</p>
            </div>
            <button 
              onClick={() => toggleSetting('notice')}
              className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${settings.notice ? 'bg-[#212529]' : 'bg-[#E5E7EB]'}`}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.notice ? 'translate-x-5' : 'translate-x-0'}`} 
              />
            </button>
          </div>

          {/* Item: Cell Group */}
          <div className="flex items-center justify-between p-4 border-b border-[#F9FAFB]">
            <div>
              <h2 className="text-[#111827] text-sm font-medium mb-1">구역 공지 알림</h2>
              <p className="text-[#6B7280] text-[11px]">소속된 구역의 모임 일정 및 공지</p>
            </div>
            <button 
              onClick={() => toggleSetting('group')}
              className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${settings.group ? 'bg-[#212529]' : 'bg-[#E5E7EB]'}`}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.group ? 'translate-x-5' : 'translate-x-0'}`} 
              />
            </button>
          </div>

          {/* Item: Community */}
          <div className="flex items-center justify-between p-4 border-b border-[#F9FAFB]">
            <div>
              <h2 className="text-[#111827] text-sm font-medium mb-1">커뮤니티 새글 알림</h2>
              <p className="text-[#6B7280] text-[11px]">자유게시판 등 커뮤니티의 새로운 게시물</p>
            </div>
            <button 
              onClick={() => toggleSetting('community')}
              className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${settings.community ? 'bg-[#19632B]' : 'bg-[#E5E7EB]'}`}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.community ? 'translate-x-5' : 'translate-x-0'}`} 
              />
            </button>
          </div>

          {/* Item: Prayer Wall */}
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-[#111827] text-sm font-medium mb-1">중보기도 새기도 알림</h2>
              <p className="text-[#6B7280] text-[11px]">중보기도실에 등록된 새로운 기도 제목</p>
            </div>
            <button 
              onClick={() => toggleSetting('prayer')}
              className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${settings.prayer ? 'bg-[#212529]' : 'bg-[#E5E7EB]'}`}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.prayer ? 'translate-x-5' : 'translate-x-0'}`} 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}