"use client";
import {
  ChevronRight, MoreHorizontal,
  ArrowUpRight, SlidersHorizontal,
  BarChart2, User, CheckSquare, Clock,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

// ── Mock data ─────────────────────────────────────────────
const HEADER_STATS = [
  { icon: BarChart2,   value: "142", badge: "+8 semana", badgeBg: "bg-[#F5C518] text-[#1A1A1A]", label: "Evaluaciones Activas este ciclo" },
  { icon: User,        value: "89",  badge: "+12 hoy",   badgeBg: "bg-[#4A7FE5] text-white",      label: "Completadas este ciclo" },
  { icon: CheckSquare, value: "31",  badge: "+6 hoy",    badgeBg: "bg-emerald-100 text-emerald-700", label: "Nuevas esta semana · Q1 2026" },
];

const STAT_CARDS = [
  { icon: BarChart2,    label: "Presentes Hoy",  value: "206", sub: "de 264 personas", pct: "16%",   up: true  },
  { icon: User,         label: "Ausentes Hoy",   value: "24",  sub: "personas",        pct: "24%",   up: false },
  { icon: CheckSquare,  label: "En Licencia Hoy",value: "18",  sub: "personas",        pct: "8%",    up: true  },
  { icon: Clock,        label: "Llegadas Tarde",  value: "10",  sub: "personas",        pct: "2.64%", up: true  },
];

const ATTENDANCE_DATA = [
  { date: "01 Oct", present: 78, late: 13, absent: 8  },
  { date: "04 Oct", present: 75, late: 14, absent: 9  },
  { date: "06 Oct", present: 80, late: 12, absent: 7  },
  { date: "08 Oct", present: 72, late: 15, absent: 11 },
  { date: "10 Oct", present: 82, late: 11, absent: 6  },
  { date: "13 Oct", present: 76, late: 16, absent: 9  },
  { date: "15 Oct", present: 79, late: 13, absent: 8  },
  { date: "17 Oct", present: 85, late: 10, absent: 5  },
  { date: "20 Oct", present: 81, late: 12, absent: 7  },
  { date: "22 Oct", present: 77, late: 14, absent: 9  },
  { date: "24 Oct", present: 80, late: 13, absent: 7  },
];

const EMPLOYEES = [
  { name: "Sindy Caicedo",    city: "Bogotá, Colombia",   title: "HR Manager",      lead: "Carlos Martínez", status: "full-time",  seed: "Sindy Caicedo"    },
  { name: "Kevin Nunez",      city: "Medellín, Colombia", title: "Mobile UI Designer", lead: "Sindy Caicedo", status: "full-time",  seed: "Kevin Nunez"      },
  { name: "Emily Luna",       city: "Cali, Colombia",     title: "Product Designer",lead: "Kevin Nunez",    status: "full-time",  seed: "Emily Luna"       },
  { name: "Amy Donovan",      city: "Bogotá, Colombia",   title: "Animación Digital",lead: "Carlos Martínez",status: "internship", seed: "Amy Donovan"      },
  { name: "Marcus Smith",     city: "Bogotá, Colombia",   title: "Flutter Dev",     lead: "Kevin Nunez",    status: "internship", seed: "Marcus Smith"     },
];

const TOP_PERFORMERS = [
  { name: "Sindy Caicedo",    role: "HR Manager",        loc: "At Office",  pct: 100,   seed: "Sindy Caicedo"    },
  { name: "Kevin Nunez",      role: "Mobile UI Designer",loc: "Remotely",   pct: 97.25, seed: "Kevin Nunez"      },
  { name: "Emily Luna",       role: "Product Designer",  loc: "At Office",  pct: 97.25, seed: "Emily Luna"       },
  { name: "Carlos Martínez",  role: "Tech Lead",         loc: "At Office",  pct: 95,    seed: "Carlos Martínez"  },
  { name: "Amy Donovan",      role: "Animación Digital", loc: "Remotely",   pct: 95,    seed: "Amy Donovan"      },
  { name: "Marcus Smith",     role: "Flutter Dev",       loc: "At Office",  pct: 93.5,  seed: "Marcus Smith"     },
];

function Avatar({ seed, name, size = 8 }: { seed: string; name: string; size?: number; textSize?: string }) {
  return (
    <img
      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=FF6A1A,FF4500,C03000,6B0080&backgroundType=gradientLinear`}
      alt={name}
      className={`w-${size} h-${size} rounded-full object-cover bg-white border border-white/60 shadow-sm flex-shrink-0`}
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = "none";
        const fallback = el.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = "flex";
      }}
    />
  );
}

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-pink-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
];

const STATUS_STYLE: Record<string, string> = {
  "full-time":  "text-emerald-600 bg-emerald-50/80 border border-emerald-200/60",
  "internship": "text-orange-600 bg-orange-50/80  border border-orange-200/60",
};
const STATUS_LABEL: Record<string, string> = {
  "full-time": "Full-time", "internship": "Internship",
};

// ── Estilos glass ─────────────────────────────────────────
const glass   = "bg-white/35 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.07)] rounded-2xl";
const glassSm = "bg-white/25 backdrop-blur-xl border border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.05)] rounded-xl";

// ── Tooltip gráfico ───────────────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#16161a]/95 backdrop-blur-md text-white text-xs rounded-xl px-3 py-2.5 shadow-2xl border border-white/10">
      <p className="font-semibold mb-1.5 text-white/70">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-1.5 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.stroke }} />
          <span style={{ color: p.stroke }}>{p.name}:</span>
          <span className="font-bold">{p.value}%</span>
        </p>
      ))}
    </div>
  );
}

// ── Página ────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="flex h-full overflow-hidden">

      {/* ══ Columna principal ══════════════════════════════════════════════ */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide flex flex-col gap-4 min-w-0">

        {/* ── Stats combinadas ── */}
        <div className={`flex items-center px-1 py-2.5 gap-0`}>
          {HEADER_STATS.map((s, i) => (
            <div key={i} className="flex items-center flex-1 min-w-0 px-3.5">
              {i > 0 && <div className="w-px self-stretch bg-black/8 flex-shrink-0 mr-3.5" />}
              <div className="w-8 h-8 rounded-xl bg-white/70 border border-white/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                <s.icon className="w-3.5 h-3.5 text-[#6B6B6B]" strokeWidth={1.6} />
              </div>
              <div className="ml-2.5 min-w-0">
                <div className="flex items-baseline gap-1.5 flex-wrap leading-none">
                  <span className="text-lg font-bold text-[#1A1A1A]">{s.value}</span>
                  <span className={`text-[9px] px-1.5 py-[2px] rounded-full font-bold ${s.badgeBg}`}>{s.badge}</span>
                  <span className="text-[10px] text-[#6B6B6B]">{s.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

  
        {/* ── BENTO ROW: columna izq (gráfico + tabla) | columna der ── */}
        <div className="grid grid-cols-[1fr_256px] gap-4 items-start">

          {/* Columna izquierda: gráfico + tabla */}
          <div className="flex flex-col gap-4">

          {/* Attendance Overview */}
          <div className={`${glass} p-5`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart2 className="w-3.5 h-3.5 text-[#6B6B6B]" strokeWidth={1.6} />
                  <h2 className="text-sm font-semibold text-[#1A1A1A]">Attendance Overview</h2>
                </div>
                <div className="flex items-center gap-5">
                  {[
                    { color: "#8B5CF6", label: "Present",       pct: "78.5%"  },
                    { color: "#4A7FE5", label: "Late arrivals",  pct: "13.25%" },
                    { color: "#FF6B35", label: "Absent",         pct: "8.25%"  },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
                        <path d="M0 6 Q4 1 9 4 Q14 7 18 2" stroke={item.color} strokeWidth="2" strokeLinecap="round" fill="none"/>
                      </svg>
                      <span className="text-[11px] text-[#6B6B6B]">{item.label}</span>
                      <span className="text-sm font-bold text-[#1A1A1A]">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="flex items-center gap-1 text-[11px] text-[#5A5A5A] bg-white/55 border border-white/65 px-2.5 py-1 rounded-lg">
                  01 Oct – 30 Oct <ChevronRight className="w-3 h-3 rotate-90" />
                </button>
                <MoreHorizontal className="w-4 h-4 text-[#C0C0C0]" />
              </div>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ATTENDANCE_DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#8B5CF6" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.03} />
                    </linearGradient>
                    <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#4A7FE5" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#4A7FE5" stopOpacity={0.03} />
                    </linearGradient>
                    <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#FF6B35" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#FF6B35" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#B0B0B0" }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={{ fontSize: 10, fill: "#B0B0B0" }} axisLine={false} tickLine={false} domain={[0,100]} ticks={[0,20,40,60,80,100]} />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(0,0,0,0.06)", strokeWidth: 1 }} />
                  <Area type="monotoneX" dataKey="present" name="Present"       stroke="#8B5CF6" strokeWidth={2.5} fill="url(#gP)" dot={false} activeDot={{ r:4, fill:"#8B5CF6", stroke:"#fff", strokeWidth:2 }} />
                  <Area type="monotoneX" dataKey="late"    name="Late arrivals"  stroke="#4A7FE5" strokeWidth={2}   fill="url(#gL)" dot={false} activeDot={{ r:4, fill:"#4A7FE5", stroke:"#fff", strokeWidth:2 }} />
                  <Area type="monotoneX" dataKey="absent"  name="Absent"         stroke="#FF6B35" strokeWidth={2}   fill="url(#gA)" dot={false} activeDot={{ r:4, fill:"#FF6B35", stroke:"#fff", strokeWidth:2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

            {/* ── Tabla empleados (debajo del gráfico) ── */}
            <div className={`${glass} p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-[3px]">
                    <div className="w-3.5 h-[2px] bg-[#6B6B6B] rounded" />
                    <div className="w-3.5 h-[2px] bg-[#6B6B6B] rounded" />
                    <div className="w-3.5 h-[2px] bg-[#6B6B6B] rounded" />
                  </div>
                  <h2 className="text-sm font-semibold text-[#1A1A1A]">List of Employee</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 text-[11px] text-[#5A5A5A] bg-white/55 border border-white/65 px-2.5 py-1.5 rounded-lg hover:bg-white/75 transition-colors">
                    <SlidersHorizontal className="w-3 h-3" /> Filters
                  </button>
                  <button className="flex items-center gap-1.5 text-[11px] text-[#5A5A5A] bg-white/55 border border-white/65 px-2.5 py-1.5 rounded-lg hover:bg-white/75 transition-colors">
                    View Detail <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <MoreHorizontal className="w-4 h-4 text-[#C0C0C0]" />
                </div>
              </div>
              <table className="w-full text-xs border-separate border-spacing-0">
                <thead>
                  <tr>
                    {["Name","Title","Locations","Team Lead","Status"].map((h) => (
                      <th key={h} className="text-left pb-2.5 text-[11px] font-semibold text-[#A0A0A0] pr-4 border-b border-black/6">
                        <span className="flex items-center gap-0.5">
                          {h} <ChevronRight className="w-2.5 h-2.5 text-[#C0C0C0] rotate-90 inline-block" />
                        </span>
                      </th>
                    ))}
                    <th className="w-6 border-b border-black/6" />
                  </tr>
                </thead>
                <tbody>
                  {EMPLOYEES.map((e, i) => (
                    <tr key={i} className="group hover:bg-white/25 transition-colors">
                      <td className="py-3 pr-4 border-b border-black/4">
                        <div className="flex items-center gap-2.5">
                          <div className="relative flex-shrink-0">
                            <Avatar seed={e.seed} name={e.name} size={8} />
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} items-center justify-center text-white text-[11px] font-bold flex-shrink-0 absolute inset-0 hidden`}>
                              {e.name.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1A1A1A] text-[12px]">{e.name}</p>
                            <p className="text-[10px] text-[#A0A0A0]">{e.city}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 border-b border-black/4 text-[#5A5A5A] text-[11px]">{e.title}</td>
                      <td className="py-3 pr-4 border-b border-black/4 text-[#5A5A5A] text-[11px]">{e.city.split(",")[0]}</td>
                      <td className="py-3 pr-4 border-b border-black/4 text-[#5A5A5A] text-[11px]">{e.lead}</td>
                      <td className="py-3 pr-4 border-b border-black/4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_STYLE[e.status]}`}>
                          {STATUS_LABEL[e.status]}
                        </span>
                      </td>
                      <td className="py-3 border-b border-black/4">
                        <MoreHorizontal className="w-3.5 h-3.5 text-[#C0C0C0] group-hover:text-[#888]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>{/* fin columna izquierda */}

          {/* Columna derecha del bento */}
          <div className="flex flex-col gap-4">

            {/* Employee Satisfaction */}
            <div className={`${glass} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-[#6B6B6B]" strokeWidth={1.6} />
                  <h3 className="text-[12px] font-semibold text-[#1A1A1A]">Employee Satisfaction</h3>
                </div>
                <MoreHorizontal className="w-3.5 h-3.5 text-[#C0C0C0]" />
              </div>
              <p className="text-[10px] text-[#A0A0A0]">Total employee</p>
              <div className="flex items-baseline gap-1 mb-2.5">
                <span className="text-2xl font-bold text-[#1A1A1A]">264</span>
                <span className="text-xs text-[#A0A0A0]">people</span>
              </div>
              {/* Barra segmentada */}
              <div className="flex h-3.5 rounded-md overflow-hidden gap-[1.5px] mb-2.5">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div key={i} className="flex-1 rounded-[1px]" style={{
                    background: i < 9 ? "#FF4500" : i < 25 ? "#8B5CF6" : "#D8D8D8"
                  }} />
                ))}
              </div>
              {[
                { label: "At Office", pct: "32.64%", color: "#FF4500" },
                { label: "Remotely",  pct: "56.12%", color: "#8B5CF6" },
                { label: "Others",    pct: "12.22%", color: "#D0D0D0" },
              ].map((item, i, arr) => (
                <div key={i} className={`flex items-center justify-between py-1.5 ${i < arr.length-1 ? "border-b border-black/5" : ""}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-[11px] text-[#5A5A5A]">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#1A1A1A]">{item.pct}</span>
                </div>
              ))}
            </div>

            {/* Top Performers */}
            <div className={`${glass} p-4 flex-1`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-[#6B6B6B]" strokeWidth={1.6} />
                  <h3 className="text-[12px] font-semibold text-[#1A1A1A]">Top Performers</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`${glassSm} flex items-center gap-0.5 text-[10px] text-[#5A5A5A] px-2 py-0.5`}>
                    By Rating <ChevronRight className="w-2.5 h-2.5 rotate-90" />
                  </div>
                  <MoreHorizontal className="w-3.5 h-3.5 text-[#C0C0C0]" />
                </div>
              </div>
              <div className="flex flex-col divide-y divide-black/5">
                {TOP_PERFORMERS.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 hover:bg-white/20 -mx-1 px-1 rounded-lg transition-colors cursor-pointer">
                    <div className="relative flex-shrink-0">
                      <Avatar seed={p.seed} name={p.name} size={7} textSize="text-[10px]" />
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} items-center justify-center text-white text-[10px] font-bold absolute inset-0 hidden`}>
                        {p.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#1A1A1A] truncate leading-tight">{p.name}</p>
                      <p className="text-[9px] text-[#A0A0A0] truncate">{p.role} · {p.loc}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-[11px] font-bold text-[#8B5CF6]">{p.pct}%</span>
                      <p className="text-[9px] text-[#C0C0C0]">Rating</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
