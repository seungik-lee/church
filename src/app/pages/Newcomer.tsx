import { useNavigate } from "react-router";
import { ChevronLeft, UserPlus, MapPin, Phone, Mail, Globe } from "lucide-react";

const STEPS = [
  {
    step: "1단계",
    title: "등록 안내",
    desc: "교회에 처음 나오신 분은 예배 후 봉사자의 안내를 받아 대성전 1층 새가족환영회(베들레헴 성전)에 참석합니다.",
  },
  {
    step: "2단계",
    title: "환영회",
    desc: "이영훈 위임목사님의 환영 메시지와 교회 소개 영상을 시청한 뒤, 새가족 1강 교육이 진행됩니다.",
  },
  {
    step: "3단계",
    title: "새가족 교육",
    desc: "새가족 교육을 3주간 받습니다. (한국어 · 영어 · 중국어 교육 안내 제공)",
  },
  {
    step: "4단계",
    title: "등록 완료",
    desc: "3주간 교육 수료 시 수료증과 함께 주해성경 외 소정의 선물이 증정됩니다.",
  },
  {
    step: "5단계",
    title: "심방",
    desc: "소속 교구의 목사 및 전도사가 상담과 심방을 진행합니다.",
  },
];

const SERVICE_TIMES = [
  { name: "1부", time: "06:40" },
  { name: "2부", time: "08:40" },
  { name: "3부", time: "10:40" },
  { name: "4부", time: "12:35" },
  { name: "5부", time: "14:35" },
  { name: "수요 1부", time: "10:10" },
];

export function Newcomer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="bg-white px-4 h-14 flex items-center gap-3 sticky top-0 z-10" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
          <ChevronLeft size={18} style={{ color: "#111827" }} />
        </button>
        <h1 className="text-[#111827] text-lg font-bold flex-1">새가족 등록 안내</h1>
      </div>

      <div className="px-4 py-5 space-y-4 pb-10">
        <div className="bg-white rounded-3xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-3">
            <UserPlus size={20} style={{ color: "#749EAD" }} />
            <h2 className="text-[#111827] text-base font-bold">우리교회에 오신 것을 환영합니다</h2>
          </div>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            여의도순복음교회의 새가족 등록 절차를 안내해 드립니다. 아래 단계에 따라 등록을 진행해 주세요.
          </p>
        </div>

        <div>
          <h3 className="text-[#111827] text-sm font-bold mb-2 pl-1">등록 절차</h3>
          <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden">
            {STEPS.map((s, idx) => (
              <div key={idx} className={`p-4 ${idx < STEPS.length - 1 ? "border-b border-[#F9FAFB]" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#212529", color: "#FFFFFF" }}
                  >
                    {s.step}
                  </span>
                  <p className="text-[#111827] text-sm font-bold">{s.title}</p>
                </div>
                <p className="text-[#6B7280] text-[12px] leading-relaxed pl-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[#111827] text-sm font-bold mb-2 pl-1">새가족 환영회 시간</h3>
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-4">
            <div className="grid grid-cols-3 gap-2">
              {SERVICE_TIMES.map((s) => (
                <div key={s.name} className="p-2 rounded-xl text-center" style={{ backgroundColor: "#F9FAFB" }}>
                  <p className="text-[#6B7280] text-[11px] font-bold">{s.name}</p>
                  <p className="text-[#749EAD] text-sm font-bold mt-0.5">{s.time}</p>
                </div>
              ))}
            </div>
            <p className="text-[#6B7280] text-[11px] mt-3 text-center">예배 후 베들레헴 성전에 모입니다.</p>
          </div>
        </div>

        <div>
          <h3 className="text-[#111827] text-sm font-bold mb-2 pl-1">문의 안내</h3>
          <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden">
            <div className="flex items-start gap-3 p-4 border-b border-[#F9FAFB]">
              <Phone size={16} style={{ color: "#749EAD" }} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#111827] text-sm font-bold">전도새가족부</p>
                <p className="text-[#6B7280] text-[12px] mt-0.5">02-6181-7401~4, 7407</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border-b border-[#F9FAFB]">
              <Phone size={16} style={{ color: "#749EAD" }} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#111827] text-sm font-bold">교회 대표 전화</p>
                <p className="text-[#6B7280] text-[12px] mt-0.5">02-6181-9191</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border-b border-[#F9FAFB]">
              <Mail size={16} style={{ color: "#749EAD" }} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#111827] text-sm font-bold">외국인 문의</p>
                <p className="text-[#6B7280] text-[12px] mt-0.5">yfgcinfo@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border-b border-[#F9FAFB]">
              <Globe size={16} style={{ color: "#749EAD" }} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#111827] text-sm font-bold">전도새가족부 홈페이지</p>
                <p className="text-[#6B7280] text-[12px] mt-0.5 break-all">nfamily.fgtv.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <MapPin size={16} style={{ color: "#749EAD" }} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#111827] text-sm font-bold">교회 주소</p>
                <p className="text-[#6B7280] text-[12px] mt-0.5 leading-relaxed">
                  서울특별시 영등포구 국회대로 76길 15<br />(여의도동 11번지) · 07239
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="w-full py-4 rounded-2xl font-bold text-base"
          style={{ backgroundColor: "#212529", color: "#FFFFFF" }}
        >
          새가족 등록 신청
        </button>
      </div>
    </div>
  );
}
