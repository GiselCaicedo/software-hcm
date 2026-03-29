"use client";
import { use } from "react";
import Link from "next/link";
import { EVALUACIONES } from "@/lib/mock-data/evaluaciones";
import { Mail, Phone, Edit2, Plus, Calendar, ArrowLeft } from "lucide-react";

export default function DetalleEvaluacionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const ev = EVALUACIONES.find((e) => e.id === id) || EVALUACIONES[0];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/evaluaciones" className="w-8 h-8 rounded-xl bg-white border border-[#E8E7E2] flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] shadow-card">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Detalle de Evaluación</h1>
            <p className="text-xs text-[#6B6B6B]">Ciclo Q1 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Left: profile */}
          <div className="col-span-2 space-y-4">
            {/* Profile card */}
            <div className="card p-6">
              <div className="flex gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-3xl font-black flex-shrink-0">
                  {ev.empleado.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#1A1A1A]">{ev.empleado.name}</h2>
                      <p className="text-sm text-[#6B6B6B] mt-0.5">{ev.empleado.cargo}</p>
                      <p className="text-xs text-[#A0A0A0] mt-0.5">{ev.empleado.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-[#1A1A1A]">{ev.calificacion}%</p>
                      <p className="text-xs text-[#6B6B6B]">Calificación actual</p>
                    </div>
                  </div>

                  {/* Action buttons like Salesforce */}
                  <div className="flex items-center gap-2 mt-4">
                    {[
                      { icon: Edit2, label: "Editar" },
                      { icon: Mail, label: "Email" },
                      { icon: Phone, label: "Llamar" },
                      { icon: Plus, label: "Agregar" },
                      { icon: Calendar, label: "Agendar" },
                    ].map((btn, i) => (
                      <button key={i} title={btn.label} className="w-9 h-9 rounded-xl bg-[#F7F6F2] border border-[#E8E7E2] flex items-center justify-center text-[#6B6B6B] hover:bg-[#E8E7E2] hover:text-[#1A1A1A] transition-all shadow-card">
                        <btn.icon className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed info — like Salesforce panel */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#1A1A1A]">Información Detallada</h3>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B]"><Edit2 className="w-3 h-3" /></button>
                  <button className="w-7 h-7 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#6B6B6B]"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
              <div className="space-y-0">
                {[
                  { label: "Nombre", value: ev.empleado.name.split(" ")[0] },
                  { label: "Apellido", value: ev.empleado.name.split(" ")[1] || "" },
                  { label: "Email", value: ev.empleado.email },
                  { label: "Cargo", value: ev.empleado.cargo },
                  { label: "Departamento", value: ev.empleado.departamento },
                  { label: "Días en empresa", value: `${ev.empleado.diasEnEmpresa || 697} días` },
                ].map((field, i) => (
                  <div key={i} className="flex items-center py-3 border-b border-[#E8E7E2] last:border-0">
                    <div className="flex items-center gap-2 w-36 flex-shrink-0">
                      <div className="w-4 h-4 rounded bg-[#F7F6F2] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A0A0A0]" />
                      </div>
                      <span className="text-xs text-[#6B6B6B] font-medium">{field.label}</span>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-[#1A1A1A] font-medium">{field.value}</span>
                      <button className="w-6 h-6 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-[#A0A0A0] opacity-0 group-hover:opacity-100">
                        <Edit2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: stats */}
          <div className="space-y-4">
            {/* Working format */}
            <div className="card p-5">
              <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-3">Formato de Trabajo</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#F7F6F2] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#1A1A1A]">42%</p>
                  <p className="text-xs text-[#6B6B6B]">Remoto</p>
                </div>
                <div className="bg-[#1C1C1E] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-white">58%</p>
                  <p className="text-xs text-white/60">Híbrido</p>
                </div>
              </div>
            </div>

            {/* Time tracking */}
            <div className="card p-5">
              <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">Tiempo activo</p>
              <p className="text-3xl font-mono font-bold text-[#1A1A1A]">03:37:52</p>
              <div className="mt-3 bg-brand rounded-xl p-3 text-white text-sm font-semibold">
                Ver evaluación completa →
              </div>
            </div>

            {/* Stats grid */}
            <div className="card p-5">
              <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-3">Métricas</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#F7F6F2] rounded-xl p-3">
                  <p className="text-xl font-bold text-[#1A1A1A]">{ev.empleado.diasEnEmpresa || 697}</p>
                  <p className="text-xs text-[#6B6B6B]">días empresa</p>
                </div>
                <div className="bg-[#F5C518] rounded-xl p-3">
                  <p className="text-xl font-bold text-[#1A1A1A]">41</p>
                  <p className="text-xs text-[#1A1A1A]/70">proyectos</p>
                </div>
                <div className="bg-[#4A90D9] rounded-xl p-3 col-span-2">
                  <p className="text-xl font-bold text-white">{ev.calificacion}%</p>
                  <p className="text-xs text-white/70">Calificación del ciclo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
