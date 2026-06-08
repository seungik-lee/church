import { useNavigate } from "react-router";
import { ChevronLeft, FileText, Download } from "lucide-react";

export function Bulletin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="bg-white px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#F9FAFB" }}
          >
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <div className="flex-1">
            <h1 className="text-[#111827] text-lg font-bold">주보</h1>
            <p className="text-[#6B7280] text-xs mt-0.5">2026년 6월 14일</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#EEF2FF" }}>
              <FileText size={20} style={{ color: "#749EAD" }} />
            </div>
            <div>
              <p className="text-[#111827] text-sm font-bold">6월 둘째 주 주보</p>
              <p className="text-[#6B7280] text-[11px] mt-0.5">PDF 다운로드</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
            <Download size={14} style={{ color: "#111827" }} />
          </button>
        </div>
      </div>
    </div>
  );
}