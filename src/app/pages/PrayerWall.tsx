import { useState } from "react";
import { ChevronLeft, Heart, Plus, Lock, Unlock, Send, Flame } from "lucide-react";
import { useNavigate } from "react-router";

// Primary Black #111827 | Yellow #FBBF24 | Yellow Light #FEF9C3 | Surface #F9FAFB

const primaryGrad = "linear-gradient(135deg, #111827, #374151)";

interface PrayerItem {
  id: number;
  anonymous: boolean;
  name: string;
  initial: string;
  category: string;
  content: string;
  prayCount: number;
  time: string;
  hasPrayed: boolean;
  color: string;
  bg: string;
  gradient: string;
}

const INITIAL_PRAYERS: PrayerItem[] = [
  { id: 1, anonymous: false, name: "이은혜 장로",  initial: "이", category: "치유", content: "암 투병 중인 남편을 위해 기도해 주세요. 주님의 치유의 손길이 임하기를 간절히 소망합니다.", prayCount: 24, time: "30분 전",  hasPrayed: false, color: "#BE123C", bg: "#FFE4E6", gradient: "linear-gradient(135deg, #9f1239, #BE123C)" },
  { id: 2, anonymous: true,  name: "익명",         initial: "?",  category: "직장", content: "직장에서 어려운 상황에 처해 있습니다. 지혜와 평강을 주시고 하나님의 인도하심을 구합니다.", prayCount: 15, time: "1시간 전", hasPrayed: true,  color: "#749EAD", bg: "#EEF2FF", gradient: primaryGrad },
  { id: 3, anonymous: false, name: "박믿음 장로",  initial: "박", category: "가정", content: "자녀들의 신앙 성장과 진로를 위해 중보 기도 부탁드립니다. 하나님의 뜻대로 인도해 주시길 기도합니다.", prayCount: 31, time: "2시간 전", hasPrayed: false, color: "#19632B", bg: "#DCFCE7", gradient: "linear-gradient(135deg, #19632B, #19632B)" },
  { id: 4, anonymous: true,  name: "익명",         initial: "?",  category: "회복", content: "오랫동안 교회를 떠나 있다가 다시 돌아왔습니다. 신앙 회복과 공동체와의 관계 회복을 위해 기도해 주세요.", prayCount: 42, time: "3시간 전", hasPrayed: false, color: "#BE123C", bg: "#FFE4E6", gradient: "linear-gradient(135deg, #9f1239, #BE123C)" },
  { id: 5, anonymous: false, name: "한기도 집사",  initial: "한", category: "선교", content: "파송 선교사님들의 안전과 사역에 열매가 있기를 기도해 주세요. 특히 중앙아시아 사역을 위해 간구합니다.", prayCount: 18, time: "5시간 전", hasPrayed: true,  color: "#D97706", bg: "#FEF3C7", gradient: "linear-gradient(135deg, #b45309, #D97706)" },
];

const CATEGORIES = ["전체", "치유", "직장", "가정", "회복", "선교", "감사", "기타"];

export function PrayerWall() {
  const navigate = useNavigate();
  const [prayers, setPrayers] = useState<PrayerItem[]>(INITIAL_PRAYERS);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showAdd, setShowAdd] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [newPrayer, setNewPrayer] = useState({ category: "가정", content: "" });

  const handlePray = (id: number) => {
    setPrayers((prev) =>
      prev.map((p) => p.id === id
        ? { ...p, hasPrayed: !p.hasPrayed, prayCount: p.hasPrayed ? p.prayCount - 1 : p.prayCount + 1 }
        : p
      )
    );
  };

  const handleSubmitPrayer = () => {
    if (!newPrayer.content.trim()) return;
    const newItem: PrayerItem = {
      id: Date.now(), anonymous, name: anonymous ? "익명" : "나", initial: anonymous ? "?" : "나",
      category: newPrayer.category, content: newPrayer.content, prayCount: 0, time: "방금",
      hasPrayed: false, color: "#749EAD", bg: "#EEF2FF", gradient: primaryGrad,
    };
    setPrayers([newItem, ...prayers]);
    setNewPrayer({ category: "가정", content: "" });
    setShowAdd(false);
  };

  const filtered = selectedCategory === "전체" ? prayers : prayers.filter((p) => p.category === selectedCategory);
  const totalPrayers = prayers.reduce((s, p) => s + p.prayCount, 0);

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-5" style={{ borderBottom: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <h1 className="text-[#111827] text-lg font-bold flex-1">기도의 벽</h1>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold"
            style={{ backgroundColor: "#FBBF24", color: "#111827" }}>
            <Plus size={12} /> 기도 요청
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { value: prayers.length,                               label: "기도 요청" },
            { value: totalPrayers,                                 label: "함께 기도" },
            { value: prayers.filter((p) => p.anonymous).length,   label: "익명 요청" },
          ].map((stat, idx) => (
            <div key={idx} className="rounded-2xl p-3 text-center" style={{ backgroundColor: "#F9FAFB" }}>
              <p className="text-[#111827] text-xl font-bold">{stat.value}</p>
              <p className="text-[#6B7280] text-[10px] font-medium mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Prayer Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full max-w-[430px] mx-auto rounded-t-3xl p-5" style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <h3 className="text-gray-900 text-base font-bold mb-4">기도 제목 나누기</h3>
            <div className="mb-4">
              <p className="text-[#6B7280] text-xs font-semibold mb-2">카테고리</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter((c) => c !== "전체").map((cat) => (
                  <button key={cat} onClick={() => setNewPrayer({ ...newPrayer, category: cat })}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={newPrayer.category === cat ? { backgroundColor: "#FBBF24", color: "#111827" } : { backgroundColor: "#F9FAFB", color: "#6B7280" }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <textarea value={newPrayer.content} onChange={(e) => setNewPrayer({ ...newPrayer, content: e.target.value })}
              placeholder="기도 제목을 나눠주세요. 함께 중보하겠습니다 🙏" rows={4}
              className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827] outline-none resize-none border border-gray-200 mb-3"
              style={{ backgroundColor: "#F9FAFB" }} />
            <button onClick={() => setAnonymous(!anonymous)}
              className="flex items-center gap-2 mb-4 px-4 py-2.5 rounded-2xl transition-all w-full"
              style={anonymous ? { backgroundColor: "#FEF9C3" } : { backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              {anonymous ? <Lock size={14} style={{ color: "#111827" }} /> : <Unlock size={14} className="text-[#6B7280]" />}
              <span className="text-xs font-bold" style={anonymous ? { color: "#111827" } : { color: "#6B7280" }}>
                {anonymous ? "익명으로 올리기 ON" : "익명으로 올리기 OFF"}
              </span>
            </button>
            <div className="flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 py-3.5 rounded-2xl text-[#6B7280] text-sm font-semibold">취소</button>
              <button onClick={handleSubmitPrayer} disabled={!newPrayer.content.trim()}
                className="flex-1 py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
                style={newPrayer.content.trim() ? { backgroundColor: "#111827", color: "#fff" } : { backgroundColor: "#E5E7EB", color: "#9CA3AF" }}>
                <Send size={14} /> 올리기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="px-4 pt-4 pb-2 overflow-x-auto">
        <div className="flex gap-2" style={{ width: "max-content" }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
              style={selectedCategory === cat
                ? { backgroundColor: "#FBBF24", color: "#111827" }
                : { backgroundColor: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prayer Cards */}
      <div className="px-4 py-3 space-y-3 pb-6">
        {filtered.map((prayer) => (
          <div key={prayer.id} className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: prayer.gradient }}>
                {prayer.anonymous ? "?" : prayer.initial}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#111827] text-sm font-bold">{prayer.anonymous ? "익명" : prayer.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: prayer.bg, color: prayer.color }}>
                    {prayer.category}
                  </span>
                  {prayer.anonymous && <Lock size={10} className="text-[#6B7280]" />}
                </div>
                <p className="text-[#6B7280] text-[10px] mt-0.5">{prayer.time}</p>
              </div>
            </div>
            <p className="text-[#111827] text-sm leading-relaxed mb-3">{prayer.content}</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              {/* Crimson Red flame for prayer action */}
              <button onClick={() => handlePray(prayer.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all"
                style={prayer.hasPrayed
                  ? { background: "linear-gradient(135deg, #9f1239, #BE123C)", color: "#fff" }
                  : { backgroundColor: "#F9FAFB", color: "#6B7280" }}>
                <Flame size={13} style={prayer.hasPrayed ? { color: "#fff" } : { color: "#6B7280" }} />
                <span className="text-xs font-semibold">{prayer.hasPrayed ? "기도 중" : "함께 기도해요"}</span>
              </button>
              <div className="flex items-center gap-1.5">
                {/* Crimson Red heart */}
                <Heart size={13} style={{ color: "#BE123C", fill: "#BE123C" }} />
                <span className="text-[#6B7280] text-xs font-medium">{prayer.prayCount}명</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}