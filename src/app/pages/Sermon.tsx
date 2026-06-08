import { useState } from "react";
import { ChevronLeft, Play, Search, Clock, Eye, BookOpen, Wifi } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Primary Black #111827 | Yellow #FBBF24 | Yellow Light #FEF9C3 | Surface #F9FAFB

const primaryGrad = "linear-gradient(135deg, #111827, #374151)";

const SERMONS = [
  { id: 1, title: "포도나무와 가지",    verse: "요한복음 15:1-11",  pastor: "김성민 목사",  date: "2026.06.07", duration: "48분", views: 312, thumbnail: "https://images.unsplash.com/photo-1774471989330-3b52860b5ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYmlibGUlMjBzdW5saWdodCUyMGRldm90aW9ufGVufDF8fHx8MTc3NTU1MDk2NXww&ixlib=rb-4.1.0&q=80&w=600", series: "요한복음 강해",     summary: "예수님과의 연합이 우리 삶에서 열매 맺는 삶의 기초가 된다는 말씀입니다." },
  { id: 2, title: "하나님 나라의 비밀", verse: "마태복음 13:31-32", pastor: "김성민 목사",  date: "2026.05.31", duration: "52분", views: 445, thumbnail: "https://images.unsplash.com/photo-1700485437933-e1ee5a8749ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBoYW5kcyUyMGZhaXRoJTIwbW9ybmluZ3xlbnwxfHx8fDE3NzU1NTA5NjZ8MA&ixlib=rb-4.1.0&q=80&w=600", series: "하나님 나라 시리즈", summary: "겨자씨와 누룩의 비유를 통해 하나님 나라의 성장 원리를 배웁니다." },
  { id: 3, title: "부활의 능력으로",    verse: "빌립보서 3:10-14", pastor: "김성민 목사",  date: "2026.05.24", duration: "45분", views: 523, thumbnail: "https://images.unsplash.com/photo-1604443830970-05ac4193ada9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwY29uZ3JlZ2F0aW9ufGVufDF8fHx8MTc3NTU1MDk2MXww&ixlib=rb-4.1.0&q=80&w=600", series: "부활절 특별 설교",   summary: "부활의 능력이 우리의 일상을 변화시키는 삶을 살아가기를 소망합니다." },
  { id: 4, title: "사랑의 계명",        verse: "요한복음 13:34-35",pastor: "오주님 전도사",date: "2026.05.19", duration: "38분", views: 201, thumbnail: "https://images.unsplash.com/photo-1774471989330-3b52860b5ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYmlibGUlMjBzdW5saWdodCUyMGRldm90aW9ufGVufDF8fHx8MTc3NTU1MDk2NXww&ixlib=rb-4.1.0&q=80&w=600", series: "청년부 특별 설교",   summary: "예수님의 새 계명인 서로 사랑하라는 말씀을 청년들에게 전하는 메시지." },
];

export function Sermon() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedSermon, setSelectedSermon] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);

  const filtered = SERMONS.filter((s) =>
    s.title.includes(search) || s.verse.includes(search) || s.pastor.includes(search) || s.series.includes(search)
  );

  const sermon = SERMONS.find((s) => s.id === selectedSermon);

  /* ── Sermon Detail ── */
  if (selectedSermon && sermon) {
    return (
      <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="bg-white px-4 py-4 flex items-center gap-3" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <button onClick={() => setSelectedSermon(null)} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} className="text-[#111827]" />
          </button>
          <h1 className="text-[#111827] text-base font-bold flex-1 truncate">{sermon.title}</h1>
        </div>

        {/* Video player */}
        <div className="relative aspect-video" style={{ backgroundColor: "#212529" }}>
          <ImageWithFallback src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/90" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
              <Play size={26} className="ml-1" style={{ color: "#749EAD", fill: "#749EAD" }} />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 rounded-full px-2.5 py-1 backdrop-blur-sm">
            <Clock size={11} className="text-white" />
            <span className="text-white text-[10px] font-medium">{sermon.duration}</span>
          </div>
          {/* Gold series badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full" style={{ background: "linear-gradient(90deg, #b45309, #D97706)" }}>
            <span className="text-white text-[10px] font-bold">{sermon.series}</span>
          </div>
        </div>

        <div className="px-4 py-5">
          <h2 className="text-[#111827] text-xl font-bold mb-1.5">{sermon.title}</h2>
          <div className="flex items-center flex-wrap gap-1.5 mb-4">
            {/* Gold for scripture */}
            <span className="text-sm font-semibold" style={{ color: "#D97706" }}>{sermon.verse}</span>
            <span className="text-[#E5E7EB]">·</span>
            <span className="text-[#6B7280] text-sm">{sermon.pastor}</span>
            <span className="text-[#E5E7EB]">·</span>
            <span className="text-[#6B7280] text-sm">{sermon.date}</span>
          </div>

          <div className="flex gap-2.5 mb-5">
            {[
              { icon: Eye,   label: `조회 ${sermon.views}회` },
              { icon: Clock, label: sermon.duration },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9C3" }}>
                <stat.icon size={13} style={{ color: "#111827" }} />
                <span className="text-xs font-bold" style={{ color: "#111827" }}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-4 mb-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FEF3C7" }}>
                <BookOpen size={13} style={{ color: "#D97706" }} />
              </div>
              <span className="text-[#111827] text-sm font-bold">설교 요약</span>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed">{sermon.summary}</p>
          </div>

          <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <p className="text-[#111827] text-sm font-bold mb-3">설교 노트</p>
            <textarea placeholder="설교를 들으며 받은 은혜를 기록해 보세요..." rows={4}
              className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827] outline-none resize-none border border-[#E5E7EB]"
              style={{ backgroundColor: "#F9FAFB" }} />
            <button className="mt-3 w-full py-3 rounded-2xl text-sm font-bold" style={{ backgroundColor: "#111827", color: "#FBBF24" }}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Sermon List ── */
  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="bg-white px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #F9FAFB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <h1 className="text-[#111827] text-lg font-bold flex-1">설교 영상</h1>
        </div>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-[#E5E7EB]" style={{ backgroundColor: "#FFFFFF" }}>
          <Search size={15} style={{ color: "#6B7280" }} className="flex-shrink-0" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="설교 제목, 구절, 목사님 이름으로 검색"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#111827" }} />
        </div>
      </div>

      <div className="px-4 py-5">
        {/* LIVE banner — Crimson Red when live */}
        <button onClick={() => setIsLive(!isLive)} className="w-full rounded-3xl p-4 mb-5 flex items-center gap-3 transition-all overflow-hidden"
          style={{
            background: isLive ? "linear-gradient(135deg, #9f1239, #BE123C)" : primaryGrad,
            boxShadow: "0 8px 30px rgba(29,78,216,0.18)",
          }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Wifi size={20} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-0.5">
              {isLive && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
              <p className="text-white text-sm font-bold">{isLive ? "🔴 LIVE · 지금 예배 중" : "주일 예배 실시간 중계"}</p>
            </div>
            <p className="text-white/70 text-xs">{isLive ? "은혜제일교회 주일 2부 예배" : "매주 일요일 오전 11:00"}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Play size={18} className="text-white ml-0.5" fill="white" />
          </div>
        </button>

        {/* VOD list header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#111827] text-base font-bold">지난 설교 VOD</h2>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: "#749EAD", backgroundColor: "#EEF2FF" }}>
            {filtered.length}편
          </span>
        </div>

        <div className="space-y-4">
          {filtered.map((sermon) => (
            <button key={sermon.id} onClick={() => setSelectedSermon(sermon.id)}
              className="w-full bg-white rounded-3xl overflow-hidden text-left"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div className="relative h-44">
                <ImageWithFallback src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,32,71,0.85) 0%, rgba(0,0,0,0.1) 60%)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                    <Play size={18} className="ml-0.5" style={{ color: "#749EAD", fill: "#749EAD" }} />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 rounded-full px-2.5 py-1 backdrop-blur-sm">
                  <Clock size={10} className="text-white" />
                  <span className="text-white text-[10px] font-medium">{sermon.duration}</span>
                </div>
                {/* Gold series badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full" style={{ background: "linear-gradient(90deg, #b45309, #D97706)" }}>
                  <span className="text-white text-[9px] font-bold">{sermon.series}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[#111827] text-sm font-bold mb-1.5">{sermon.title}</h3>
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="text-xs font-semibold" style={{ color: "#D97706" }}>{sermon.verse}</span>
                  <span className="text-[#E5E7EB] text-xs">·</span>
                  <span className="text-[#6B7280] text-xs">{sermon.pastor}</span>
                  <span className="text-[#E5E7EB] text-xs">·</span>
                  <div className="flex items-center gap-0.5">
                    <Eye size={10} className="text-[#6B7280]" />
                    <span className="text-[#6B7280] text-xs">{sermon.views}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}