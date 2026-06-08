import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, FileText, Download, Building2, CreditCard, Check, Receipt } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import wooriBanner from "../../imports/wooribank.png";

// ─── Color System: Trust Blue / Deep Green / Charcoal ─────────
// Primary Blue : #1A3673  | Deep Green    : #19632B
// Text Charcoal: #111827  | Section Bg    : #F9FAFB
// Border/Muted : #E5E7EB  | Text muted    : #6B7280
// ─────────────────────────────────────────────────────────────────

const OFFERING_TYPES = [
  { id: "tithe",    label: "십일조" },
  { id: "sunday",   label: "주일헌금" },
  { id: "group",    label: "구역 헌금" },
  { id: "thanks",   label: "감사헌금" },
  { id: "mission",  label: "선교헌금" },
  { id: "building", label: "건축헌금" },
];

const HISTORY = [
  { type: "십일조", amount: 300000, date: "2026.06.05" },
  { type: "주일헌금", amount: 50000, date: "2026.06.05" },
  { type: "구역 헌금", amount: 10000, date: "2026.06.12" },
];

export function Offering() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"give" | "history">("give");

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="bg-white px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <h1 className="text-[#111827] text-lg font-bold flex-1">헌금</h1>
        </div>

        <div className="flex bg-[#F9FAFB] rounded-2xl p-1 gap-1 border border-[#E5E7EB]">
          {[
            { key: "give", label: "헌금하기" },
            { key: "history", label: "헌금 내역" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
              style={
                activeTab === tab.key
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
        {activeTab === "give" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]">
              <h2 className="text-[#111827] text-sm font-bold mb-4">헌금 종류 선택</h2>
              <div className="grid grid-cols-2 gap-2">
                {OFFERING_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => navigate(`/offering/payment/${type.id}`)}
                    className="flex items-center justify-center p-3 rounded-xl border transition-all text-sm font-bold active:scale-95"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF", color: "#111827" }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB]">
              <button className="w-full active:scale-95 transition-transform block">
                <ImageWithFallback src={wooriBanner} alt="우리은행 비대면 계좌개설" className="w-full h-auto object-cover" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#111827] text-sm font-bold">최근 헌금 내역</h2>
                <span className="text-[#6B7280] text-[11px]">2026년</span>
              </div>
              <div className="space-y-4">
                {HISTORY.map((h, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b border-[#F9FAFB] pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[#111827] text-sm font-bold">{h.type}</span>
                      <span className="text-[#749EAD] text-sm font-bold">{h.amount.toLocaleString()}원</span>
                    </div>
                    <span className="text-[#6B7280] text-[11px]">{h.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-white rounded-3xl p-4 border border-[#E5E7EB] flex items-center justify-between active:scale-95 transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#EEF2FF" }}>
                  <Receipt size={18} style={{ color: "#749EAD" }} />
                </div>
                <div className="text-left">
                  <h3 className="text-[#111827] text-sm font-bold">기부금 영수증 발급</h3>
                  <p className="text-[#6B7280] text-[11px] mt-0.5">연말정산용 영수증 신청</p>
                </div>
              </div>
              <ChevronRight size={16} style={{ color: "#E5E7EB" }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}