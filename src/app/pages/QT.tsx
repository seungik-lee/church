import { useState } from "react";
import { ChevronLeft, BookOpen, PenLine, CheckSquare, Calendar, ChevronDown, ChevronUp, Star, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const DAILY_DEVOTION = {
  date: "2026년 6월 8일 월요일",
  title: "하나님의 완전한 사랑",
  verse: "요한복음 3:16",
  text: `"하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라"`,
  meditation: `오늘 우리는 성경에서 가장 잘 알려진 구절 중 하나를 묵상합니다. 이 짧은 구절 속에는 구원의 핵심이 담겨 있습니다.\n\n"하나님이 세상을 이처럼 사랑하사" — 이 사랑은 조건 없는 사랑, 아가페 사랑입니다. 우리의 행위나 자격이 아닌 오직 하나님의 사랑으로 말미암은 것입니다.\n\n"독생자를 주셨으니" — 가장 소중한 것을 내어주셨습니다. 하나님은 우리를 위해 아무것도 아끼지 않으셨습니다.\n\n오늘 하루, 이 사랑을 받은 자로서 주변에 그 사랑을 나누는 삶을 살아가길 소망합니다.`,
  question: "오늘 하나님의 사랑을 실제적으로 경험한 순간이 있었나요? 그 사랑을 다른 사람에게 어떻게 나눌 수 있을까요?",
  prayer: "사랑의 하나님, 오늘도 주님의 크신 사랑을 묵상하게 하소서. 그 사랑이 내 삶 속에서 흘러 넘치게 하소서. 예수님의 이름으로 기도합니다. 아멘.",
};

const BIBLE_PLAN = [
  { book: "창세기",   chapters: 50, read: 50 },
  { book: "출애굽기", chapters: 40, read: 32 },
  { book: "레위기",   chapters: 27, read: 10 },
  { book: "민수기",   chapters: 36, read: 0  },
  { book: "신명기",   chapters: 34, read: 0  },
  { book: "여호수아", chapters: 24, read: 0  },
  { book: "사사기",   chapters: 21, read: 0  },
  { book: "룻기",     chapters: 4,  read: 0  },
];

interface JournalEntry { id: number; date: string; verse: string; content: string; prayer: string; }

const INITIAL_JOURNAL: JournalEntry[] = [
  { id: 1, date: "2026.06.06", verse: "시편 23:1",   content: "여호와는 나의 목자시니 내게 부족함이 없으리로다. 오늘 힘든 일이 있었지만 주님이 나의 목자되심을 묵상하며 평안을 얻었다.", prayer: "주님, 오늘도 선한 목자 되어 주심에 감사합니다." },
  { id: 2, date: "2026.06.05", verse: "로마서 8:28", content: "모든 것이 합력하여 선을 이룬다는 말씀을 붙잡았다. 지금의 어려움도 하나님의 선한 뜻 안에 있음을 믿는다.", prayer: "하나님, 모든 상황을 주관하시는 주님을 신뢰합니다." },
];

const TABS = [
  { key: "devotion", label: "오늘의 QT" },
  { key: "journal",  label: "신앙 일기" },
  { key: "bible",    label: "성경통독" },
] as const;

export function QT() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"devotion" | "journal" | "bible">("devotion");
  const [expandedSection, setExpandedSection] = useState<string | null>("meditation");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL);
  const [showAddJournal, setShowAddJournal] = useState(false);
  const [newEntry, setNewEntry] = useState({ verse: "", content: "", prayer: "" });
  const [starred, setStarred] = useState(false);

  const totalChapters = BIBLE_PLAN.reduce((s, b) => s + b.chapters, 0);
  const readChapters  = BIBLE_PLAN.reduce((s, b) => s + b.read, 0);
  const readPercent   = Math.round((readChapters / totalChapters) * 100);

  const handleAddJournal = () => {
    if (!newEntry.content) return;
    const entry: JournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, ".").replace(/\.$/, ""),
      verse: newEntry.verse,
      content: newEntry.content,
      prayer: newEntry.prayer,
    };
    setJournalEntries([entry, ...journalEntries]);
    setNewEntry({ verse: "", content: "", prayer: "" });
    setShowAddJournal(false);
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: "#F9FAFB" }}>

      <div className="bg-white px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#F9FAFB" }}
          >
            <ChevronLeft size={18} style={{ color: "#111827" }} />
          </button>
          <h1 className="text-[#111827] text-lg font-bold flex-1">말씀 묵상 (QT)</h1>
        </div>

        <div className="flex bg-[#F9FAFB] rounded-2xl p-1 gap-1 border border-[#E5E7EB]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={
                activeTab === tab.key
                  ? { backgroundColor: "#FFFFFF", color: "#749EAD", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                  : { color: "#6B7280" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "devotion" && (
        <div className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#6B7280] text-xs">{DAILY_DEVOTION.date}</p>
              <h2 className="text-[#111827] text-lg font-bold mt-0.5">{DAILY_DEVOTION.title}</h2>
            </div>
            <button
              onClick={() => setStarred(!starred)}
              className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB" }}
            >
              <Star size={18} style={starred ? { color: "#749EAD", fill: "#749EAD" } : { color: "#E5E7EB" }} />
            </button>
          </div>

          <div className="rounded-3xl p-5 mb-4" style={{ backgroundColor: "#EEF2FF", border: "1px solid #E5E7EB" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#212529" }}>
                <BookOpen size={12} style={{ color: "#FFFFFF" }} />
              </div>
              <span className="text-xs font-bold" style={{ color: "#111827" }}>{DAILY_DEVOTION.verse}</span>
            </div>
            <p className="text-[#111827] text-sm leading-relaxed italic">{DAILY_DEVOTION.text}</p>
          </div>

          {[
            { key: "meditation", emoji: "📖", title: "오늘의 묵상", content: DAILY_DEVOTION.meditation },
            { key: "question",   emoji: "💭", title: "묵상 질문",   content: DAILY_DEVOTION.question },
            { key: "prayer",     emoji: "🙏", title: "기도문",      content: DAILY_DEVOTION.prayer },
          ].map((section) => (
            <div key={section.key} className="bg-white rounded-2xl mb-3 overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
              <button
                className="w-full flex items-center justify-between px-4 py-4"
                onClick={() => setExpandedSection(expandedSection === section.key ? null : section.key)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{section.emoji}</span>
                  <span className="text-[#111827] text-sm font-bold">{section.title}</span>
                </div>
                {expandedSection === section.key
                  ? <ChevronUp size={15} style={{ color: "#6B7280" }} />
                  : <ChevronDown size={15} style={{ color: "#6B7280" }} />}
              </button>
              {expandedSection === section.key && (
                <div className="px-4 pb-4 border-t border-[#E5E7EB]">
                  <p className="text-[#6B7280] text-sm leading-relaxed whitespace-pre-line pt-3">{section.content}</p>
                </div>
              )}
            </div>
          ))}

          <div className="bg-white rounded-2xl p-4 mt-3" style={{ border: "1px solid #E5E7EB" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EEF2FF" }}>
                <PenLine size={12} style={{ color: "#749EAD" }} />
              </div>
              <span className="text-[#111827] text-sm font-bold">나의 묵상 나눔</span>
            </div>
            <textarea
              placeholder="오늘 말씀을 통해 받은 은혜를 기록해 보세요..."
              rows={4}
              className="w-full rounded-2xl px-4 py-3 text-sm text-[#111827] outline-none resize-none"
              style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
            />
            <button
              className="mt-3 w-full py-3 rounded-2xl text-sm font-bold"
              style={{ backgroundColor: "#212529", color: "#FFFFFF" }}
            >
              저장하기
            </button>
          </div>
        </div>
      )}

      {activeTab === "journal" && (
        <div className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#111827] text-base font-bold">신앙 일기</h2>
            <button
              onClick={() => setShowAddJournal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold"
              style={{ backgroundColor: "#212529", color: "#FFFFFF" }}
            >
              <Plus size={12} /> 새 일기
            </button>
          </div>

          {showAddJournal && (
            <div className="bg-white rounded-3xl p-4 mb-4 border border-[#E5E7EB]">
              <p className="text-[#111827] text-sm font-bold mb-3">오늘의 묵상 기록</p>
              <input
                type="text"
                value={newEntry.verse}
                onChange={(e) => setNewEntry({ ...newEntry, verse: e.target.value })}
                placeholder="성경 구절 (예: 요한복음 3:16)"
                className="w-full rounded-2xl px-4 py-3 text-sm outline-none mb-2"
                style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
              />
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder="오늘의 묵상 내용을 작성해 주세요"
                rows={4}
                className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none mb-2"
                style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
              />
              <textarea
                value={newEntry.prayer}
                onChange={(e) => setNewEntry({ ...newEntry, prayer: e.target.value })}
                placeholder="기도 제목 (선택)"
                rows={2}
                className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none mb-3"
                style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddJournal(false)}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold border border-[#E5E7EB]"
                  style={{ backgroundColor: "#FFFFFF", color: "#6B7280" }}
                >
                  취소
                </button>
                <button
                  onClick={handleAddJournal}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold"
                  style={{ backgroundColor: "#212529", color: "#FFFFFF" }}
                >
                  저장
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-2xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} style={{ color: "#749EAD" }} />
                    <span className="text-[#6B7280] text-xs">{entry.date}</span>
                  </div>
                  {entry.verse && (
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ color: "#749EAD", backgroundColor: "#EEF2FF" }}
                    >
                      {entry.verse}
                    </span>
                  )}
                </div>
                <p className="text-[#111827] text-sm leading-relaxed mb-2">{entry.content}</p>
                {entry.prayer && (
                  <div className="flex items-start gap-1.5 rounded-xl px-3 py-2.5" style={{ backgroundColor: "#F9FAFB" }}>
                    <span className="text-sm">🙏</span>
                    <p className="text-[#6B7280] text-xs leading-relaxed">{entry.prayer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "bible" && (
        <div className="px-4 py-5">
          <div className="rounded-3xl p-5 mb-5 border border-[#E5E7EB]" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EEF2FF" }}>
                <CheckSquare size={13} style={{ color: "#749EAD" }} />
              </div>
              <span className="text-[#111827] text-sm font-bold">1년 1독 진도표</span>
            </div>
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-4xl font-bold" style={{ color: "#749EAD" }}>{readPercent}%</span>
                <p className="text-[#6B7280] text-xs mt-1">{readChapters}장 / {totalChapters}장 완료</p>
              </div>
              <div className="text-right">
                <p className="text-[#6B7280] text-xs">2026년 6월 8일 기준</p>
                <p className="text-[#111827] text-xs font-bold mt-0.5">모세오경 진행 중</p>
              </div>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E7EB" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${readPercent}%`, backgroundColor: "#212529" }}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {BIBLE_PLAN.map((book) => {
              const pct = Math.round((book.read / book.chapters) * 100);
              return (
                <div key={book.book} className="bg-white rounded-2xl px-4 py-3.5 border border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#111827] text-sm font-bold">{book.book}</span>
                      {pct === 100 && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ color: "#749EAD", backgroundColor: "#EEF2FF" }}
                        >
                          완독 ✓
                        </span>
                      )}
                    </div>
                    <span className="text-[#6B7280] text-xs font-medium">{book.read}/{book.chapters}장</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#F9FAFB" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: "#212529" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}