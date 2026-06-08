import { useState } from "react";
import QRCode from "react-qr-code";
import { ChevronLeft, MoreHorizontal, Calendar, Cross } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MEMBER_INFO = {
  name: "김성도",
  memberNo: "202301234",
  position: "성도",
  district: "1교구",
  group: "1교구 3구역",
  joinDate: "2023.01.15",
  church: "우리교회",
  pastor: "김성민 담임목사",
  phone: "010-1234-5678",
  baptismDate: "2023.04.09",
  status: "정교인"
};

export function MemberCard() {
  const navigate = useNavigate();
  // Using an Unsplash portrait as a placeholder for the avatar
  const avatarUrl = "https://images.unsplash.com/photo-1634040829222-d13d8a59c238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzc2Mjc0ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div className="min-h-[100dvh] flex flex-col relative" style={{ backgroundColor: "#F9FAFB" }}>
      
      {/* ── Background Header Shape ── */}
      <div
        className="absolute top-0 left-0 right-0 z-0 h-[280px]"
        style={{
          backgroundColor: "#212529",
          borderBottomLeftRadius: "36px",
          borderBottomRightRadius: "36px"
        }}
      />
      
      {/* ── Navbar ── */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <ChevronLeft size={20} style={{ color: "#FFFFFF" }} />
        </button>
        <h1 className="text-white text-lg font-bold tracking-tight">스마트 교인증</h1>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <MoreHorizontal size={20} style={{ color: "#FFFFFF" }} />
        </button>
      </div>

      {/* ── Main Ticket Card ── */}
      <div className="relative z-10 flex-1 px-5 mt-2 pb-8 flex flex-col">
        <div 
          className="bg-white rounded-3xl w-full p-6 shadow-xl flex-1 flex flex-col"
          style={{ boxShadow: "0 12px 40px rgba(26,54,115,0.15)" }}
        >
          
          {/* 1. Avatar & Logo Row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={avatarUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="text-[#6B7280] text-[11px] font-bold uppercase tracking-widest mb-0.5">{MEMBER_INFO.position}</p>
                <h2 className="text-[#111827] text-base font-extrabold">{MEMBER_INFO.name}</h2>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 opacity-90">
              <Cross size={14} style={{ color: "#749EAD" }} strokeWidth={2.5} />
              <span className="text-[#749EAD] font-black italic tracking-tighter text-sm">우리교회</span>
            </div>
          </div>

          {/* 2. Path Row (like flight Origin -> Destination) */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-left">
              <h3 className="text-[#111827] text-3xl font-black mb-1 leading-none tracking-tighter">본당</h3>
              <p className="text-[#6B7280] text-[11px] font-bold">{MEMBER_INFO.church}</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center px-4 relative">
              <div className="absolute w-full h-[2px] border-t-2 border-dashed border-[#E5E7EB]" />
              <div className="w-8 h-8 rounded-full flex items-center justify-center z-10 border-[3px] border-white shadow-sm" style={{ backgroundColor: "#F9FAFB" }}>
                <Cross size={13} style={{ color: "#749EAD" }} strokeWidth={3} />
              </div>
            </div>

            <div className="text-right">
              <h3 className="text-[#111827] text-3xl font-black mb-1 leading-none tracking-tighter">1교구</h3>
              <p className="text-[#6B7280] text-[11px] font-bold">{MEMBER_INFO.group}</p>
            </div>
          </div>

          {/* 3. Two Highlight Boxes */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 rounded-2xl p-3 flex items-center gap-3" style={{ backgroundColor: "#F9FAFB" }}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <Calendar size={18} style={{ color: "#749EAD" }} />
              </div>
              <div>
                <p className="text-[#6B7280] text-[9px] font-bold uppercase tracking-widest mb-0.5">등록일</p>
                <p className="text-[#111827] text-xs font-bold">{MEMBER_INFO.joinDate}</p>
              </div>
            </div>
            <div className="flex-1 rounded-2xl p-3 flex items-center gap-3" style={{ backgroundColor: "#F9FAFB" }}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <Calendar size={18} style={{ color: "#749EAD" }} />
              </div>
              <div>
                <p className="text-[#6B7280] text-[9px] font-bold uppercase tracking-widest mb-0.5">세례일</p>
                <p className="text-[#111827] text-xs font-bold">{MEMBER_INFO.baptismDate}</p>
              </div>
            </div>
          </div>

          {/* 4. Ticket Divider with edge cutouts */}
          {/* Note: -mx-6 undoes the card padding to hit the edges. Cutouts match the background color #F9FAFB */}
          <div className="relative flex items-center -mx-6 my-2 h-10">
            <div className="absolute -left-3 w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: "#F9FAFB" }} />
            <div className="flex-1 border-t-[2px] border-dashed border-[#E5E7EB]" />
            <div className="absolute -right-3 w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: "#F9FAFB" }} />
          </div>

          {/* 5. Four Columns (Stats / Details) */}
          <div className="grid grid-cols-4 gap-2 mb-8 pt-2 text-center">
            <div>
              <p className="text-[#6B7280] text-[9px] font-bold uppercase tracking-widest mb-1">직분</p>
              <p className="text-[#111827] text-sm font-black">{MEMBER_INFO.position}</p>
            </div>
            <div>
              <p className="text-[#6B7280] text-[9px] font-bold uppercase tracking-widest mb-1">교구</p>
              <p className="text-[#111827] text-sm font-black">{MEMBER_INFO.district}</p>
            </div>
            <div>
              <p className="text-[#6B7280] text-[9px] font-bold uppercase tracking-widest mb-1">교인번호</p>
              <p className="text-[#111827] text-sm font-black">{MEMBER_INFO.memberNo.slice(-4)}</p>
            </div>
            <div>
              <p className="text-[#6B7280] text-[9px] font-bold uppercase tracking-widest mb-1">상태</p>
              <p className="text-[#111827] text-sm font-black">{MEMBER_INFO.status}</p>
            </div>
          </div>

          {/* 6. QR Code Area (Instead of Barcode) */}
          <div className="flex-1 flex flex-col items-center justify-end">
            <QRCode
              value={JSON.stringify({ church: "우리교회", id: MEMBER_INFO.memberNo, type: "attendance" })}
              size={180}
              fgColor="#111827"
              bgColor="#ffffff"
              level="M"
              style={{ padding: "4px", borderRadius: "8px" }}
            />
            <p className="text-[#6B7280] text-[10px] font-bold tracking-widest mt-4 uppercase">
              SCAN FOR ATTENDANCE
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}