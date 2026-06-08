import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, CheckSquare, Heart, MessageCircle, Calendar, Edit3 } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import cellImage1 from "../../imports/area1.png";
import cellImage2 from "../../imports/area2.png";

// ─── Color System: Cell Deep Green / Charcoal / White ─────────
// Deep Green   : #19632B  | Light Green   : #DCFCE7
// Text Charcoal: #111827  | Section Bg    : #F9FAFB
// Border/Muted : #E5E7EB  | Text muted    : #6B7280
// ─────────────────────────────────────────────────────────────────

const MY_CELLS = [
  { id: 1, name: "1교구 3구역", leader: "최소망 권사", members: 12, image: cellImage1 },
  { id: 2, name: "청년부 엘림구역", leader: "이믿음 형제", members: 8, image: cellImage2 },
];

const CELL_MEMBERS = [
  { name: "최소망 권사", role: "구역리더" },
  { name: "박믿음 성도", role: "구역원" },
  { name: "김성도 성도", role: "구역원" },
  { name: "이복음 성도", role: "구역원" },
];

const SCHEDULE = [
  { date: "6.12 (금)", title: "정기 구역모임", time: "오후 7:30" },
  { date: "6.19 (금)", title: "연합 구역모임", time: "오후 7:30" },
  { date: "6.26 (금)", title: "야외 교제", time: "오전 10:00" },
];

export function Groups() {
  const navigate = useNavigate();
  const [activeMainTab, setActiveMainTab] = useState<"my_cells" | "schedule">("my_cells");
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<"members" | "attend" | "offering" | "community">("attend");
  const [attended, setAttended] = useState(false);

  // 나의 구역 상세 화면
  if (selectedCell !== null) {
    const cell = MY_CELLS.find((c) => c.id === selectedCell);
    return (
      <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="bg-white px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #E5E7EB" }}>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSelectedCell(null)}
              className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#F9FAFB" }}
            >
              <ChevronLeft size={18} style={{ color: "#111827" }} />
            </button>
            <div className="flex-1 flex items-center justify-between gap-3">
              <div>
                <h1 className="text-[#111827] text-xl font-bold">{cell?.name}</h1>
                <p className="text-[#6B7280] text-sm mt-0.5">리더: {cell?.leader}</p>
              </div>
              {cell?.image && (
                <div className="w-[68px] h-[68px] rounded-[20px] shrink-0 overflow-hidden bg-[#DCFCE7] border border-[#F9FAFB]" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <ImageWithFallback
                    src={cell.image}
                    alt={cell.name || ""}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex bg-[#F9FAFB] rounded-2xl p-1 gap-1 border border-[#E5E7EB]">
            {[
              { key: "members", label: "구성원" },
              { key: "attend", label: "출석 체크" },
              { key: "offering", label: "헌금" },
              { key: "community", label: "커뮤니티" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveDetailTab(tab.key as any)}
                className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                style={
                  activeDetailTab === tab.key
                    ? { backgroundColor: "#212529", color: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                    : { color: "#6B7280" }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-5">
          {activeDetailTab === "members" && (
            <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]">
              <h2 className="text-[#111827] text-sm font-bold mb-4">구역 구성원 ({cell?.members}명)</h2>
              <div className="space-y-3">
                {CELL_MEMBERS.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "#DCFCE7", color: "#19632B" }}>
                      {m.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111827] text-sm font-bold">{m.name}</p>
                      <p className="text-[#6B7280] text-[11px]">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDetailTab === "attend" && (
            <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]">
              <div className="text-center py-4">
                <p className="text-[#111827] text-base font-bold mb-2">{attended ? "출석 완료" : "오늘의 구역모임 출석"}</p>
                <p className="text-[#6B7280] text-sm mb-6">{attended ? "참석 처리되었습니다." : "출석체크 버튼을 눌러주세요."}</p>
                <button
                  onClick={() => setAttended(true)}
                  disabled={attended}
                  className="w-full py-3.5 rounded-2xl font-bold transition-all"
                  style={
                    attended
                      ? { backgroundColor: "#EFF2F8", color: "#749EAD" }
                      : { backgroundColor: "#212529", color: "#FFFFFF" }
                  }
                >
                  {attended ? "출석 완료" : "출석 체크하기"}
                </button>
              </div>
            </div>
          )}

          {activeDetailTab === "offering" && (
            <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB] text-center py-10">
              <p className="text-[#111827] text-base font-bold mb-2">구역 헌금</p>
              <p className="text-[#6B7280] text-sm mb-6">간편하게 구역 헌금을 드릴 수 있습니다.</p>
              <button
                onClick={() => navigate("/offering")}
                className="w-full py-3.5 rounded-2xl font-bold"
                style={{ backgroundColor: "#212529", color: "#FFFFFF" }}
              >
                헌금하기
              </button>
            </div>
          )}

          {activeDetailTab === "community" && (
            <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]">
              <div className="flex justify-end mb-4">
                <button className="flex items-center gap-1.5 text-[#19632B] font-bold text-sm">
                  <Edit3 size={16} />
                  글쓰기
                </button>
              </div>
              <div className="space-y-5">
                <div className="border-b border-[#F9FAFB] pb-5 last:border-0 last:pb-0">
                  <p className="text-[#111827] text-[15px] mb-2 leading-snug font-bold">
                    <span className="text-[#19632B] mr-1.5">[공지]</span>
                    6월 행사 안내
                  </p>
                  <div className="flex items-center gap-2 text-[#6B7280] text-xs">
                    <span>1일전</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[#E5E7EB]"></span>
                    <span>최소망 권사</span>
                  </div>
                </div>
                <div className="border-b border-[#F9FAFB] pb-5 last:border-0 last:pb-0">
                  <p className="text-[#111827] text-[15px] mb-2 leading-snug">이번주는 저희 집으로 모십니다.</p>
                  <div className="flex items-center gap-2 text-[#6B7280] text-xs">
                    <span>2시간전</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[#E5E7EB]"></span>
                    <span>최소망 권사</span>
                  </div>
                </div>
                <div className="border-b border-[#F9FAFB] pb-5 last:border-0 last:pb-0">
                  <p className="text-[#111827] text-[15px] mb-2 leading-snug">간식으로 샌드위치 준비했습니다! 내일 봬요~</p>
                  <div className="flex items-center gap-2 text-[#6B7280] text-xs">
                    <span>어제</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[#E5E7EB]"></span>
                    <span>박믿음 성도</span>
                  </div>
                </div>
                <div className="border-b border-[#F9FAFB] pb-5 last:border-0 last:pb-0">
                  <p className="text-[#111827] text-[15px] mb-2 leading-snug">모두 평안한 한 주 보내셨나요? 기도 제목 나눕니다.</p>
                  <div className="flex items-center gap-2 text-[#6B7280] text-xs">
                    <span>2일전</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[#E5E7EB]"></span>
                    <span>김성도 성도</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 메인 화면
  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="bg-white px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <h1 className="text-[#111827] text-lg font-bold flex-1">나의 구역</h1>
        </div>
        <div className="flex bg-[#F9FAFB] rounded-2xl p-1 gap-1 border border-[#E5E7EB]">
          {[
            { key: "my_cells", label: "참여 구역" },
            { key: "schedule", label: "일정" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveMainTab(tab.key as any)}
              className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
              style={
                activeMainTab === tab.key
                  ? { backgroundColor: "#212529", color: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                  : { color: "#6B7280" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5">
        {activeMainTab === "my_cells" && (
          <div className="space-y-3">
            {MY_CELLS.map((cell) => (
              <button
                key={cell.id}
                onClick={() => setSelectedCell(cell.id)}
                className="w-full bg-white rounded-3xl p-4 text-left border border-[#E5E7EB] active:scale-95 transition-transform flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex-shrink-0 overflow-hidden bg-[#DCFCE7]">
                    <ImageWithFallback
                      src={cell.image}
                      alt={cell.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#111827] text-sm font-bold">{cell.name}</h3>
                    <p className="text-[#6B7280] text-[11px] mt-0.5">리더: {cell.leader} · {cell.members}명</p>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: "#E5E7EB" }} />
              </button>
            ))}
          </div>
        )}

        {activeMainTab === "schedule" && (
          <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} style={{ color: "#19632B" }} />
              <h2 className="text-[#111827] text-sm font-bold">월간 일정</h2>
            </div>
            <div className="space-y-3">
              {SCHEDULE.map((s, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F9FAFB" }}>
                  <div className="w-12 flex-shrink-0 text-center">
                    <p className="text-[#19632B] text-xs font-bold">{s.date}</p>
                  </div>
                  <div className="flex-1 border-l border-[#E5E7EB] pl-3">
                    <p className="text-[#111827] text-sm font-bold">{s.title}</p>
                    <p className="text-[#6B7280] text-[11px] mt-0.5">{s.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}