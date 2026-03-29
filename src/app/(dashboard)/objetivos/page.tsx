"use client";
import { OBJETIVOS } from "@/lib/mock-data/objetivos";
import { Plus, MoreHorizontal, ArrowUpRight, Target, TrendingUp, CheckCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "bg-[#E3F2FD] text-[#1565C0]",
  "Completado": "bg-[#E8F5E9] text-[#2E7D32]",
  "Pendiente": "bg-[#F7F6F2] text-[#6B6B6B]",
};

const CARD_ACCENTS = ["bg-brand", "bg-[#2DD4BF]", "bg-[#4A90D9]", "bg-[#1C1C1E]"];

export default function ObjetivosPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-0.5">Objetivos</h1>
            <p className="text-sm text-[#6B6B6B]">Define y monitorea tus metas individuales y estratégicas</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-card">
            <Plus className="w-3.5 h-3.5" /> Nuevo Objetivo
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Objetivos", value: "24", icon: Target, accent: "" },
            { label: "En Progreso", value: "16", icon: TrendingUp, accent: "text-brand" },
            { label: "Completados", value: "6", icon: CheckCircle, accent: "text-[#2E7D32]" },
            { label: "Promedio Avance", value: "72%", icon: Zap, accent: "text-[#6A1B9A]" },
          ].map((stat, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-[#6B6B6B] font-medium">{stat.label}</p>
                <stat.icon className={cn("w-4 h-4", stat.accent || "text-[#A0A0A0]")} />
              </div>
              <p className={cn("text-3xl font-bold", stat.accent || "text-[#1A1A1A]")}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Objectives list */}
        <div className="space-y-3">
          {OBJETIVOS.map((obj, i) => (
            <div key={obj.id} className="card p-5 hover:shadow-card-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Color accent bar */}
                <div className={cn("w-1 rounded-full flex-shrink-0 self-stretch", CARD_ACCENTS[i])} />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-[#1A1A1A]">{obj.titulo}</h3>
                    <div className="flex items-center gap-2 ml-4">
                      <span className={cn("tag", STATUS_STYLES[obj.estado])}>{obj.estado}</span>
                      <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#A0A0A0] hover:text-[#1A1A1A]">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B6B6B] mb-3">{obj.descripcion}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-[#A0A0A0]">
                      <span>Fuente: <span className="text-[#6B6B6B] font-medium">{obj.fuente}</span></span>
                      <span>·</span>
                      <span>{obj.fechaInicio}</span>
                      <span>·</span>
                      <span>Peso: {obj.ponderacion}%</span>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2.5">
                      <div className="w-28 h-1.5 bg-[#F0EFE9] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${obj.progreso}%`,
                            background: obj.progreso >= 100 ? "#22c55e" : obj.progreso >= 50 ? "#FF4500" : obj.progreso === 0 ? "#E8E7E2" : "#FF4500",
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#1A1A1A] w-10 text-right">{obj.progreso}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
