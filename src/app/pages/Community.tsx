import { useNavigate } from "react-router";
import { ChevronLeft, Store, MapPin, Tag, Phone } from "lucide-react";

const BUSINESSES = [
  {
    id: 1,
    name: "메가커피 여의도점",
    owner: "김안나 집사",
    category: "카페/디저트",
    benefit: "교인 10% 할인",
    address: "서울 영등포구 여의도동 12-3",
    phone: "02-123-4567"
  },
  {
    id: 2,
    name: "샬롬 베이커리",
    owner: "이준호 장로",
    category: "베이커리",
    benefit: "방문 시 쿠키 1개 무료 증정",
    address: "서울 영등포구 여의대방로 45",
    phone: "02-987-6543"
  },
  {
    id: 3,
    name: "여의도 크린토피아",
    owner: "권민지 성도",
    category: "생활서비스",
    benefit: "세탁물 5% 상시 할인",
    address: "서울 영등포구 국제금융로 78",
    phone: "02-555-1111"
  },
  {
    id: 4,
    name: "늘푸른 카센터",
    owner: "박상우 안수집사",
    category: "자동차",
    benefit: "엔진오일 교환 시 워셔액 보충",
    address: "서울 영등포구 영등포로 231",
    phone: "02-333-2222"
  }
];

export function Community() {
  const navigate = useNavigate();

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
        <h1 className="text-[#111827] text-lg font-bold">교우와 함께</h1>
      </div>

      <div className="px-4 py-5">
        <div className="mb-5">
          <p className="text-[#111827] text-base font-bold">우리 교회 성도님들의</p>
          <p className="text-[#111827] text-base font-bold">아름다운 기업을 소개합니다</p>
          <p className="text-[#6B7280] text-sm mt-1">서로 돕고 나누는 따뜻한 교제</p>
        </div>

        <div className="space-y-3">
          {BUSINESSES.map((biz) => (
            <div 
              key={biz.id} 
              className="bg-white p-4 rounded-3xl"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span 
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: "#DCFCE7", color: "#19632B" }}
                    >
                      {biz.category}
                    </span>
                  </div>
                  <h3 className="text-[#111827] text-base font-bold">
                    {biz.name}
                  </h3>
                  <p className="text-[#6B7280] text-sm">{biz.owner}</p>
                </div>
                <div 
                  className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#DCFCE7" }}
                >
                  <Store size={20} style={{ color: "#19632B" }} />
                </div>
              </div>

              {/* Benefit Highlight */}
              <div 
                className="rounded-xl p-3 flex items-start gap-2 mb-4"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <Tag size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#19632B" }} />
                <span className="text-sm font-bold" style={{ color: "#19632B" }}>{biz.benefit}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: "#E5E7EB" }} />
                  <p className="text-[#6B7280] text-xs">{biz.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: "#E5E7EB" }} />
                  <p className="text-[#6B7280] text-xs">{biz.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}