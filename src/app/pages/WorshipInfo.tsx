import { useNavigate } from "react-router";
import { ChevronLeft, Church } from "lucide-react";

type Service = { title: string; time: string; place?: string };
type Section = { title: string; items: Service[] };

const SECTIONS: Section[] = [
  {
    title: "정기예배",
    items: [
      { title: "주일 1부 예배", time: "오전 7:00", place: "대성전" },
      { title: "주일 2부 예배", time: "오전 9:00", place: "대성전" },
      { title: "주일 3부 예배", time: "오전 11:00", place: "대성전" },
      { title: "주일 4부 예배", time: "오후 1:00", place: "대성전" },
      { title: "주일 5부 대학청년", time: "오후 2:30", place: "대성전" },
      { title: "주일 저녁 예배", time: "오후 5:00", place: "대성전" },
      { title: "수요 1부 예배", time: "오전 10:30", place: "대성전" },
      { title: "수요 2부 예배 (스크린)", time: "오후 2:00", place: "예루살렘성전" },
      { title: "수요 3부 예배", time: "오후 7:30", place: "대성전" },
      { title: "금요 성령대망회", time: "오후 8:30", place: "대성전" },
      { title: "토요 예배", time: "오전 7:00", place: "대성전" },
      { title: "새벽 1부 (월~금)", time: "오전 5:30", place: "대성전" },
      { title: "새벽 2부 (월~금)", time: "오전 6:30", place: "예루살렘성전" },
    ],
  },
  {
    title: "교회학교",
    items: [
      { title: "영아부", time: "오전 8:40 / 10:40 / 오후 12:40", place: "제2교육관 1층 사랑성전" },
      { title: "유아부", time: "오전 8:50 / 10:50 / 오후 12:50", place: "제1교육관 3층 요셉성전" },
      { title: "유치부", time: "오전 8:50 / 10:50 / 오후 12:50", place: "제2교육관 2층 행복성전" },
      { title: "초등 1~3부", time: "오전 8:40 / 10:40 / 오후 12:40", place: "제2교육관 3층 사무엘성전" },
      { title: "초등 4~6부", time: "오전 8:40 / 10:40 / 오후 12:40", place: "제2교육관 4층 요한성전" },
      { title: "중등 1부", time: "오전 8:40 / 10:40", place: "제2교육관 5층 베드로성전" },
      { title: "중등 2부", time: "오전 8:40 / 10:40", place: "제2교육관 5층 디모데성전" },
      { title: "중등 3부", time: "오전 8:40 / 10:40", place: "제2교육관 7층 은혜성전" },
      { title: "고등 1·2부", time: "오전 8:40 / 10:30", place: "제2교육관 6층 야고보성전" },
      { title: "고등 3부", time: "오전 8:30", place: "비전센터 6층 브니엘성전" },
      { title: "틴스파워 (금)", time: "오후 8:00", place: "제2교육관 4층 요한성전" },
    ],
  },
  {
    title: "청년예배",
    items: [
      { title: "주일 5부 청년", time: "오후 2:35", place: "대성전" },
      { title: "비전브릿지선교회 (금)", time: "오후 8:00", place: "브니엘성전" },
      { title: "프뉴마선교회 (금)", time: "오후 8:20", place: "바울성전" },
      { title: "가스펠선교회 (금)", time: "오후 8:10", place: "야고보성전" },
      { title: "카리스선교회 (금)", time: "오후 8:30", place: "예루살렘성전" },
    ],
  },
  {
    title: "장년예배",
    items: [
      { title: "주일 예배", time: "오후 12:35", place: "대성전" },
      { title: "화요 중보기도회", time: "오전 11:00", place: "제2교육관 11층 세미나실" },
      { title: "금요 성령대망회", time: "오후 8:00", place: "대성전 (둘째 주는 세미나실)" },
      { title: "헌아 예배 (매월 마지막 주)", time: "오후 2:00", place: "예루살렘성전" },
    ],
  },
  {
    title: "외국어 예배",
    items: [
      { title: "영어 주일", time: "오전 9:00 / 11:00", place: "제2교육관 11층 International Hall" },
      { title: "영어 금요", time: "오후 8:30", place: "제2교육관" },
      { title: "영어 청소년", time: "오전 11:00", place: "제2교육관 10층 1001호" },
      { title: "영어 주일학교", time: "오전 11:00", place: "세계선교센터 1F #102" },
      { title: "중국어 주일", time: "오후 12:40", place: "비전센터 6층" },
      { title: "중국어 금요", time: "오후 8:00", place: "제2교육관 11층" },
      { title: "일본어 주일", time: "오후 1:00", place: "제2교육관 10층 1001호" },
      { title: "일본어 금요", time: "오후 7:00", place: "제2교육관 10층 1001호" },
      { title: "인도네시아어 주일", time: "오전 11:00", place: "제2교육관 10층 #1007" },
      { title: "베트남어 주일", time: "오전 10:30", place: "제2교육관 9층 Conference Hall" },
      { title: "러시아어 주일", time: "오후 2:30", place: "제2교육관 10층 1007호" },
      { title: "스페인어 예배·주일학교", time: "오후 3:00", place: "제2교육관 11층 International Hall" },
    ],
  },
  {
    title: "장애인 예배",
    items: [
      { title: "토요 예배", time: "오전 10:35", place: "대성전 지하1층 안디옥성전" },
      { title: "수요 철야예배", time: "오후 7:45", place: "안디옥성전" },
      { title: "청각교구 (주일)", time: "오전 10:45", place: "제2교육관 7층 청각교구실" },
    ],
  },
];

export function WorshipInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="bg-white px-4 h-14 flex items-center gap-3 sticky top-0 z-10" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9FAFB" }}>
          <ChevronLeft size={18} style={{ color: "#111827" }} />
        </button>
        <h1 className="text-[#111827] text-lg font-bold flex-1">예배 안내</h1>
      </div>

      <div className="px-4 py-5 space-y-5 pb-10">
        <div className="flex items-center gap-2">
          <Church size={20} style={{ color: "#749EAD" }} />
          <p className="text-[#111827] text-base font-bold">여의도순복음교회 예배 안내</p>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-[#111827] text-sm font-bold mb-2 pl-1">{section.title}</h2>
            <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden">
              {section.items.map((s, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between gap-3 p-4 ${idx < section.items.length - 1 ? "border-b border-[#F9FAFB]" : ""}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[#111827] text-sm font-bold">{s.title}</p>
                    {s.place && <p className="text-[#6B7280] text-[11px] mt-0.5">{s.place}</p>}
                  </div>
                  <span className="text-[#749EAD] text-sm font-bold whitespace-nowrap text-right">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
