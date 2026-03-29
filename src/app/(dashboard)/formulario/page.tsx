"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, Save, X, Check } from "lucide-react";

const STEPS = [
  { label: "Objetivos", desc: "Evalúa el cumplimiento de cada objetivo" },
  { label: "Competencias", desc: "Califica las competencias del evaluado" },
  { label: "Comentarios", desc: "Agrega tus observaciones generales" },
  { label: "Resumen", desc: "Revisa y envía tu evaluación" },
];

const OBJETIVOS_FORM = [
  { titulo: "Entregar rediseño de app mobile", peso: "20%", desc: "Se evaluará el nivel de impacto de la aplicación móvil evaluando las áreas de inmobiliaria y sanitarias." },
  { titulo: "Implementar design system v2", peso: "15%", desc: "Crear e implementar el nuevo design system con componentes reutilizables para toda la organización." },
];

export default function FormularioPage() {
  const [step, setStep] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({ obj0: 4, obj1: 4 });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-0.5">Formulario de Evaluación</h1>
            <p className="text-sm text-[#6B6B6B]">Evaluación 360° · Ciclo Q1 2026</p>
          </div>
          <span className="tag bg-[#1C1C1E] text-white">360°</span>
        </div>

        {/* Stepper */}
        <div className="card p-5 mb-5">
          <div className="flex items-start gap-0">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                    i < step ? "bg-[#1C1C1E] border-[#1C1C1E] text-white" :
                    i === step ? "bg-brand border-brand text-white" :
                    "bg-white border-[#E8E7E2] text-[#A0A0A0]"
                  )}>
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <p className="text-xs mt-2 font-medium text-[#1A1A1A] text-center whitespace-nowrap">{s.label}</p>
                  <p className="text-xs text-[#A0A0A0] text-center hidden xl:block max-w-[100px] leading-tight">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-3 mt-[-24px]", i < step ? "bg-[#1C1C1E]" : "bg-[#E8E7E2]")} />
                )}
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-5 pt-4 border-t border-[#E8E7E2]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#6B6B6B]">Progreso de evaluación</span>
              <span className="font-semibold text-[#1A1A1A]">{Math.round((step / STEPS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-[#F0EFE9] rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${(step / STEPS.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Step content */}
        {step === 0 && (
          <div className="card p-6">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-1">Paso 1: Objetivos</h2>
            <p className="text-sm text-[#6B6B6B] mb-6">Evalúa el cumplimiento de cada objetivo del colaborador para este periodo.</p>
            <div className="space-y-6">
              {OBJETIVOS_FORM.map((obj, i) => (
                <div key={i} className="pb-6 border-b border-[#E8E7E2] last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#1A1A1A]">{obj.titulo}</h3>
                    <span className="tag bg-[#F7F6F2] text-[#6B6B6B] ml-3 flex-shrink-0">Peso: {obj.peso}</span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] mb-4 leading-relaxed">{obj.desc}</p>
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-2">% cumplido:</p>
                  <div className="flex gap-2 mb-4">
                    {[1,2,3,4,5].map((n) => (
                      <button key={n} onClick={() => setRatings(prev => ({ ...prev, [`obj${i}`]: n }))}
                        className={cn("w-10 h-10 rounded-xl text-sm font-bold border-2 transition-all",
                          ratings[`obj${i}`] === n ? "bg-[#1C1C1E] border-[#1C1C1E] text-white" : "bg-white border-[#E8E7E2] text-[#6B6B6B] hover:border-[#1C1C1E]"
                        )}>
                        {n}
                      </button>
                    ))}
                  </div>
                  <textarea placeholder="Por favor, añade observaciones sobre el objetivo evaluado..."
                    className="w-full px-4 py-3 bg-[#F7F6F2] border border-[#E8E7E2] rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#1C1C1E] focus:ring-2 focus:ring-black/5 resize-none transition-all"
                    rows={3} />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="card p-6">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-1">Paso 2: Competencias</h2>
            <p className="text-sm text-[#6B6B6B] mb-6">Califica las competencias del colaborador en una escala del 1 al 5.</p>
            <div className="space-y-5">
              {["Trabajo en Equipo", "Comunicación Efectiva", "Innovación", "Liderazgo"].map((comp, i) => (
                <div key={i} className="p-4 bg-[#F7F6F2] rounded-xl">
                  <p className="font-semibold text-[#1A1A1A] mb-3">{comp}</p>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((n) => (
                      <button key={n} onClick={() => setRatings(prev => ({ ...prev, [`comp${i}`]: n }))}
                        className={cn("w-10 h-10 rounded-xl text-sm font-bold border-2 transition-all",
                          (ratings[`comp${i}`] || 3) >= n ? "bg-[#1C1C1E] border-[#1C1C1E] text-white" : "bg-white border-[#E8E7E2] text-[#6B6B6B]"
                        )}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card p-6">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-1">Paso 3: Comentarios Generales</h2>
            <p className="text-sm text-[#6B6B6B] mb-4">Comparte tu perspectiva general sobre el desempeño del colaborador.</p>
            <textarea
              placeholder="Escribe tus comentarios generales sobre el desempeño del colaborador..."
              className="w-full px-4 py-4 bg-[#F7F6F2] border border-[#E8E7E2] rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#1C1C1E] focus:ring-2 focus:ring-black/5 resize-none"
              rows={10}
            />
          </div>
        )}

        {step === 3 && (
          <div className="card p-6">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-1">Paso 4: Resumen</h2>
            <p className="text-sm text-[#6B6B6B] mb-5">Revisa tu evaluación antes de enviarla.</p>
            <div className="space-y-0 mb-5">
              {[
                { label: "Objetivos evaluados", value: "2 / 2" },
                { label: "Competencias evaluadas", value: "4 / 4" },
                { label: "Calificación promedio", value: "4.0 / 5.0" },
                { label: "Estado", value: "Listo para enviar" },
              ].map((field, i) => (
                <div key={i} className="flex items-center justify-between py-3.5 border-b border-[#E8E7E2] last:border-0">
                  <span className="text-sm text-[#6B6B6B]">{field.label}</span>
                  <span className={cn("text-sm font-semibold", i === 2 ? "text-brand" : "text-[#1A1A1A]")}>{field.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#E8F5E9] rounded-xl p-4 flex items-center gap-3">
              <Check className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
              <p className="text-sm text-[#2E7D32] font-medium">Tu evaluación está completa y lista para ser enviada.</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E8E7E2] rounded-xl text-sm text-[#6B6B6B] font-medium hover:bg-[#F7F6F2] shadow-card">
              <Save className="w-3.5 h-3.5" /> Guardar borrador
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E8E7E2] rounded-xl text-sm text-[#6B6B6B] font-medium hover:bg-[#F7F6F2] shadow-card">
              <X className="w-3.5 h-3.5" /> Cancelar
            </button>
          </div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-white border border-[#E8E7E2] rounded-xl text-sm text-[#6B6B6B] font-medium hover:bg-[#F7F6F2] shadow-card mr-2">
              ← Anterior
            </button>
          )}
          <button
            onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : undefined}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1C1C1E] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-card">
            {step === STEPS.length - 1 ? "Enviar Evaluación" : "Siguiente Paso"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
