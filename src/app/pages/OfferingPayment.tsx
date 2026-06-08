import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const OFFERING_TYPES: Record<string, string> = {
  tithe: "십일조",
  sunday: "주일헌금",
  group: "구역 헌금",
  thanks: "감사헌금",
  mission: "선교헌금",
  building: "건축헌금",
};

export function OfferingPayment() {
  const navigate = useNavigate();
  const { type } = useParams();
  const title = type && OFFERING_TYPES[type] ? OFFERING_TYPES[type] : "헌금하기";
  
  const [amount, setAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [payMethod, setPayMethod] = useState<"pay" | "npay" | "samsung">("pay");

  const PRESET_AMOUNTS = [10000, 50000, 70000, 100000];
  const PAY_METHODS: { id: "pay" | "npay" | "samsung"; label: string }[] = [
    { id: "pay", label: "페이" },
    { id: "npay", label: "Npay" },
    { id: "samsung", label: "삼성페이" },
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const formattedAmount = amount ? Number(amount).toLocaleString() : "";

  return (
    <div className="min-h-full flex flex-col" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="bg-white px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-2xl flex items-center justify-center transition-transform active:scale-95" style={{ backgroundColor: "#F9FAFB" }}>
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <h1 className="text-[#111827] text-lg font-bold flex-1">{title} 납부</h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col">
        <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] mb-6">
          <div className="mb-8">
            <label className="text-[#6B7280] text-sm font-bold mb-3 block text-center">얼마를 헌금하실까요?</label>
            <div className="relative flex items-center justify-center mt-2">
              <input
                type="text"
                inputMode="numeric"
                value={formattedAmount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full text-center text-4xl font-bold text-[#111827] bg-transparent outline-none pb-2 border-b-2 transition-colors placeholder:text-[#E5E7EB]"
                style={{ borderColor: amount ? "#212529" : "#E5E7EB" }}
              />
              <span className="absolute right-0 bottom-3 text-xl font-bold text-[#111827] ml-2">원</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-5">
              {PRESET_AMOUNTS.map((preset) => {
                const isActive = amount === String(preset);
                return (
                  <button
                    key={preset}
                    onClick={() => setAmount(String(preset))}
                    className="py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95"
                    style={{
                      borderColor: isActive ? "#212529" : "#E5E7EB",
                      backgroundColor: isActive ? "#212529" : "#FFFFFF",
                      color: isActive ? "#FFFFFF" : "#111827",
                    }}
                  >
                    {(preset / 10000).toLocaleString()}만원
                  </button>
                );
              })}
              <button
                onClick={() => setAmount("")}
                className="py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95"
                style={{
                  borderColor: "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                  color: "#111827",
                }}
              >
                직접입력
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[#6B7280] text-sm font-bold mb-3 block">헌금 방식</label>
            <div className="grid grid-cols-3 gap-2">
              {PAY_METHODS.map((m) => {
                const isActive = payMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    className="py-3 rounded-2xl border text-sm font-bold transition-all active:scale-95"
                    style={{
                      borderColor: isActive ? "#212529" : "#E5E7EB",
                      backgroundColor: isActive ? "#212529" : "#FFFFFF",
                      color: isActive ? "#FFFFFF" : "#111827",
                    }}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setIsAnonymous(!isAnonymous)}
            className="flex items-center gap-2 transition-transform active:scale-95"
          >
            <div
              className="w-5 h-5 rounded border flex items-center justify-center transition-colors"
              style={{
                borderColor: isAnonymous ? "#212529" : "#E5E7EB",
                backgroundColor: isAnonymous ? "#212529" : "transparent"
              }}
            >
              {isAnonymous && <Check size={12} color="#FFFFFF" />}
            </div>
            <span className="text-sm font-bold text-[#111827]">익명</span>
          </button>
        </div>

        <div className="mt-auto pb-4">
          <button
            disabled={!amount}
            onClick={() => {
              alert("납부 완료되었습니다.");
              navigate("/offering");
            }}
            className="w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center text-base"
            style={{
              backgroundColor: amount ? "#212529" : "#F3F4F6",
              color: amount ? "#FFFFFF" : "#9CA3AF"
            }}
          >
            납부하기
          </button>
        </div>
      </div>
    </div>
  );
}