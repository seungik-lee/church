import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Heart, BookOpen, Newspaper, Users, MessageCircle,
  QrCode, Play, ChevronRight, Sparkles, CheckSquare
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import mainBanner01 from "../../imports/main_banner01.png";
import mainBanner02 from "../../imports/main_banner02.png";
import mainBanner03 from "../../imports/main_banner03.png";
import mainBanner04 from "../../imports/main_banner04.png";

const MAIN_BANNERS = [mainBanner01, mainBanner02, mainBanner03, mainBanner04];

// ─── Color System: Trust Blue / Deep Green / Charcoal ─────────
// Primary Blue : #212529  | Deep Green    : #19632B
// Text Charcoal: #111827  | Section Bg    : #F9FAFB
// Border/Muted : #E5E7EB  | Text muted    : #6B7280
// ─────────────────────────────────────────────────────────────────

const QUICK_MENUS = [
  { icon: CheckSquare,   label: "출석체크",   path: "/my-church"   },
  { icon: Heart,         label: "헌금하기",   path: "/offering"    },
  { icon: Users,         label: "나의 구역",     path: "/cells"       },
  { icon: QrCode,        label: "교인증",     path: "/member-card" },
];

const CHURCH_NEWS = [
  { text: "새가족 환영회가 이번 주일 진행됩니다.", time: "10분 전", dot: "#749EAD" },
  { text: "상반기 제자훈련 모집 안내", time: "어제", dot: "#6B7280" },
  { text: "금요기도회 공지사항이 있습니다.", time: "어제", dot: "#6B7280" },
  { text: "주일학교 여름성경학교 자원봉사자 모집", time: "2일 전", dot: "#6B7280" },
  { text: "교회 주차장 이용 및 차량 5부제 안내", time: "3일 전", dot: "#6B7280" },
];

const GROUP_NEWS = [
  { text: "구역 소식이 등록되었습니다.", time: "방금 전", dot: "#19632B" },
  { text: "구역모임 시간이 토요일 오후 2시로 변경되었습니다.", time: "2시간 전", dot: "#6B7280" },
  { text: "이번 달 구역 예배 나눔 가이드 자료", time: "어제", dot: "#6B7280" },
  { text: "상반기 교구 연합 체육대회 안내", time: "2일 전", dot: "#6B7280" },
  { text: "청년부 수련회 회비 납부 안내", time: "3일 전", dot: "#6B7280" },
];

const SCHEDULE_NEWS = [
  { text: "6월 14일 주일 연합 예배", time: "오전 9:00", dot: "#749EAD" },
  { text: "상반기 세례 및 입교식", time: "오전 11:00", dot: "#111827" },
];

const NOTI_TABS = [
  { key: "church", label: "공지사항" },
  { key: "group", label: "구역 공지" },
  { key: "schedule", label: "일정" },
] as const;

export function Home() {
  const navigate = useNavigate();
  const [activeNotiTab, setActiveNotiTab] = useState<"church" | "group" | "schedule">("church");
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBannerIdx((i) => (i + 1) % MAIN_BANNERS.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);
  const today    = new Date();
  const dateStr  = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayStr   = dayNames[today.getDay()];

  return (
    <div className="min-h-full w-full bg-[#F9FAFB] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

      {/* ── Header Banner ── */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1693857072311-0c0ee8e664ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBjaHVyY2glMjBpbnRlcmlvciUyMHN1bmxpZ2h0JTIwbW9ybmluZyUyMHdvcnNoaXB8ZW58MXx8fHwxNzc2MTIyNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="church"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.08) 40%, rgba(17,24,39,0.72) 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-5 pb-12">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles size={12} style={{ color: "#FFFFFF" }} />
            <span
              className="text-[11px] font-bold tracking-wider uppercase"
              style={{ color: "#FFFFFF" }}
            >
              오늘의 말씀
            </span>
          </div>
          <p className="text-white/70 text-xs mb-0.5">{dateStr} {dayStr}</p>
          <h1 className="text-white text-xl font-bold mb-1 leading-snug">평강의 하나님이</h1>
          <p className="text-white/85 text-sm">"너희와 함께 계시리라" — 빌 4:9</p>
        </div>
      </div>

      {/* ── Today's Verse Card ── */}
      <div className="mx-4 -mt-8 mb-5 relative z-10">
        <div className="bg-white rounded-3xl pt-3 pb-6 px-5" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.10)" }}>
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#111827" }}
            >
              <BookOpen size={15} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[#111827] text-sm leading-relaxed font-medium">
                "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라"
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold" style={{ color: "#749EAD" }}>요한복음 3:16</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── QR Offering Banner ── */}
      <div className="px-4 mb-2">
        <button
          onClick={() => navigate("/qr-scan")}
          className="w-full rounded-3xl flex items-center justify-between px-5 py-4 active:scale-95 transition-transform"
          style={{
            backgroundColor: "#111827",
            boxShadow: "0 8px 24px rgba(17,24,39,0.15)"
          }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#212529" }}
            >
              <QrCode size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="text-white/60 text-[11px] font-medium mb-0.5">간편하고 안전한</div>
              <div className="text-white text-[15px] font-bold tracking-tight">QR 헌금하기</div>
            </div>
          </div>
          <div
            className="flex items-center gap-0.5 text-[11px] font-bold px-3 py-1.5 rounded-full"
            style={{ color: "#111827", backgroundColor: "#EEF2FF" }}
          >
            스캔하기 <ChevronRight size={11} />
          </div>
        </button>
      </div>

      {/* ── Quick Menu ── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#111827] text-base font-bold">빠른 메뉴</h2>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_MENUS.map((menu) => (
            <button
              key={menu.path}
              onClick={() => navigate(menu.path)}
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div
                className="w-[60px] h-[60px] rounded-[18px] flex items-center justify-center border border-[#E5E7EB]"
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              >
                <menu.icon size={24} style={{ color: "#749EAD" }} strokeWidth={1.8} />
              </div>
              <span className="text-[#6B7280] text-[10px] font-medium text-center leading-tight">
                {menu.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Banner Slider ── */}
      <div className="px-4 mt-6">
        <div className="relative w-full overflow-hidden rounded-3xl border border-[#E5E7EB]" style={{ aspectRatio: "16 / 9", backgroundColor: "#F9FAFB" }}>
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${bannerIdx * 100}%)` }}
          >
            {MAIN_BANNERS.map((src, idx) => (
              <div key={idx} className="h-full w-full flex-shrink-0">
                <img src={src} alt={`배너 ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
            {MAIN_BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setBannerIdx(idx)}
                className="rounded-full transition-all"
                style={{
                  width: idx === bannerIdx ? 16 : 6,
                  height: 6,
                  backgroundColor: idx === bannerIdx ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Notifications ── */}
      <div className="px-4 mt-6 mb-8 pb-4">
        <div className="flex bg-[#F9FAFB] rounded-2xl p-1 gap-1 border border-[#E5E7EB] mb-3">
          {NOTI_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveNotiTab(tab.key)}
              className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
              style={
                activeNotiTab === tab.key
                  ? { backgroundColor: "#212529", color: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                  : { color: "#6B7280" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          {(activeNotiTab === "church" ? CHURCH_NEWS : activeNotiTab === "group" ? GROUP_NEWS : SCHEDULE_NEWS).map((n, idx, arr) => (
            <div
              key={idx}
              className={`flex items-start px-4 py-3.5 gap-3 ${idx < arr.length - 1 ? "border-b border-[#F9FAFB]" : ""}`}
            >
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: n.dot }} />
              <div className="flex-1">
                <p className="text-[#111827] text-sm font-medium">{n.text}</p>
                <p className="text-[#6B7280] text-[11px] mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}