"use client";
import { MOCK_NINE_BOX } from "@/lib/mock-data/analytics";
import { getUserById } from "@/lib/mock-data/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const CELL_CONFIG = [
  // Fila superior (potencial alto = 3)
  { desempeno: 1, potencial: 3, label: "Dilema", desc: "Alto potencial, bajo desempeño", color: "bg-amber-50 border-amber-200" },
  { desempeno: 2, potencial: 3, label: "Alto Potencial", desc: "Potencial y desempeño crecientes", color: "bg-blue-50 border-blue-200" },
  { desempeno: 3, potencial: 3, label: "Estrella", desc: "Máximo desempeño y potencial", color: "bg-green-50 border-green-200" },
  // Fila media (potencial medio = 2)
  { desempeno: 1, potencial: 2, label: "Bajo Performer", desc: "Bajo desempeño y potencial", color: "bg-red-50 border-red-200" },
  { desempeno: 2, potencial: 2, label: "Colaborador Clave", desc: "Desempeño y potencial medios", color: "bg-gray-50 border-gray-200" },
  { desempeno: 3, potencial: 2, label: "Referente", desc: "Alto desempeño, potencial estable", color: "bg-blue-50 border-blue-200" },
  // Fila baja (potencial bajo = 1)
  { desempeno: 1, potencial: 1, label: "Riesgo", desc: "Bajo en ambas dimensiones", color: "bg-red-100 border-red-300" },
  { desempeno: 2, potencial: 1, label: "Mantenimiento", desc: "Desempeño moderado, bajo potencial", color: "bg-orange-50 border-orange-200" },
  { desempeno: 3, potencial: 1, label: "Experto Especialista", desc: "Alto desempeño, bajo potencial", color: "bg-amber-50 border-amber-200" },
];

export default function NineBoxPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ButtonLink href="/analytics" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div>
          <h1 className="text-xl font-bold text-gray-900">9-Box Grid</h1>
          <p className="text-sm text-gray-500">Matriz de Desempeño vs. Potencial · Ciclo 2025</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1">
          {/* Eje Y label */}
          <div className="flex gap-2">
            <div className="flex flex-col items-center justify-center w-8">
              <div className="flex flex-col items-center gap-1 text-xs text-gray-400 writing-vertical">
                <div className="h-24 flex items-center" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>← Potencial →</div>
              </div>
            </div>
            <div className="flex-1">
              {/* Grid 3x3: filas de potencial 3→1, columnas desempeno 1→3 */}
              <div className="grid grid-cols-3 gap-2">
                {[3, 2, 1].flatMap((potencial) =>
                  [1, 2, 3].map((desempeno) => {
                    const cellConfig = CELL_CONFIG.find((c) => c.desempeno === desempeno && c.potencial === potencial)!;
                    const empleados = MOCK_NINE_BOX.filter((e) => e.desempeno === desempeno && e.potencial === potencial);
                    return (
                      <div
                        key={`${desempeno}-${potencial}`}
                        className={cn(
                          "rounded-xl border-2 p-3 min-h-28 flex flex-col",
                          cellConfig.color
                        )}
                      >
                        <div className="mb-2">
                          <p className="text-xs font-bold text-gray-700">{cellConfig.label}</p>
                          <p className="text-xs text-gray-400 leading-tight">{cellConfig.desc}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {empleados.map((e) => {
                            const user = getUserById(e.usuarioId);
                            return user ? (
                              <div key={e.usuarioId} className="flex items-center gap-1 bg-white rounded-full px-2 py-0.5 shadow-sm border">
                                <img src={user.avatar} alt={user.nombre} className="h-4 w-4 rounded-full" />
                                <span className="text-xs font-medium text-gray-700">{user.nombre.split(" ")[0]}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {/* Eje X */}
              <div className="flex text-center mt-2">
                {["Bajo", "Medio", "Alto"].map((l) => (
                  <div key={l} className="flex-1 text-xs text-gray-400">{l}</div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-0.5">← Desempeño →</p>
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="w-52 space-y-2">
          <p className="text-xs font-semibold text-gray-600 mb-3">Colaboradores</p>
          {MOCK_NINE_BOX.map((pos) => {
            const user = getUserById(pos.usuarioId);
            const conf = CELL_CONFIG.find((c) => c.desempeno === pos.desempeno && c.potencial === pos.potencial);
            return user ? (
              <div key={pos.usuarioId} className="flex items-center gap-2">
                <img src={user.avatar} alt={user.nombre} className="h-7 w-7 rounded-full shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{user.nombre}</p>
                  <p className="text-xs text-gray-400">{conf?.label}</p>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
