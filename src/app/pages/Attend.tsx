import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, CheckCircle2, Calendar, MapPin, Clock } from "lucide-react";

export function Attend() {
  const navigate = useNavigate();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
  };

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
        <h1 className="text-[#111827] text-lg font-bold">출석 체크</h1>
      </div>

      <div className="px-4 py-6 flex-1 flex flex-col">
        {/* Status Card */}
        <div 
          className="bg-white rounded-3xl p-6 mb-6 text-center"
          style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
        >
          <div className="flex justify-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: isCheckedIn ? "#19632B" : "#DCFCE7" }}
            >
              <CheckCircle2 size={32} style={{ color: isCheckedIn ? "#FFFFFF" : "#19632B" }} />
            </div>
          </div>
          
          <h2 className="text-[#111827] text-xl font-bold mb-2">
            {isCheckedIn ? "출석이 완료되었습니다" : "오늘의 예배에 오신 것을 환영합니다"}
          </h2>
          <p className="text-[#6B7280] text-sm">
            {isCheckedIn ? "은혜로운 예배 시간 되시길 바랍니다" : "아래 버튼을 눌러 출석을 확인해주세요"}
          </p>
        </div>

        {/* Worship Info */}
        <div className="mb-8">
          <h3 className="text-[#111827] text-sm font-bold mb-3 px-2">예배 정보</h3>
          <div 
            className="bg-white rounded-3xl p-5 space-y-4"
            style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <Calendar size={16} style={{ color: "#19632B" }} />
              </div>
              <div>
                <p className="text-[#6B7280] text-xs">예배</p>
                <p className="text-[#111827] text-sm font-bold">주일 2부 예배</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <Clock size={16} style={{ color: "#19632B" }} />
              </div>
              <div>
                <p className="text-[#6B7280] text-xs">시간</p>
                <p className="text-[#111827] text-sm font-bold">오전 11:00</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <MapPin size={16} style={{ color: "#19632B" }} />
              </div>
              <div>
                <p className="text-[#6B7280] text-xs">장소</p>
                <p className="text-[#111827] text-sm font-bold">본당 2층 대예배실</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pb-4">
          <button
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            className="w-full py-4 rounded-2xl text-base font-bold transition-transform active:scale-[0.98]"
            style={{ 
              backgroundColor: isCheckedIn ? "#E5E7EB" : "#19632B",
              color: isCheckedIn ? "#6B7280" : "#FFFFFF"
            }}
          >
            {isCheckedIn ? "출석 완료" : "예배 출석하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
