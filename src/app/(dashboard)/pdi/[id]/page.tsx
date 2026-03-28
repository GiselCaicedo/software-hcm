"use client";
import { use, useState, useEffect } from "react";
import { MOCK_PDI } from "@/lib/mock-data/pdi";
import { getUserById } from "@/lib/mock-data/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, Clock, RefreshCw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ESTADO_ACCION_COLORS: Record<string, string> = {
  pendiente: "bg-gray-100 text-gray-600",
  en_progreso: "bg-blue-100 text-blue-700",
  completada: "bg-green-100 text-green-700",
};

const TIPO_ACCION_ICONS: Record<string, string> = {
  formacion: "📚",
  mentoring: "🤝",
  proyecto: "🎯",
  coaching: "💡",
};

export default function PDIDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const pdi = MOCK_PDI.find((p) => p.id === id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedText, setDisplayedText] = useState(pdi?.feedbackIA ?? "");
  const [feedbackLider, setFeedbackLider] = useState(pdi?.feedbackLider ?? "");

  if (!pdi) return <div className="p-8 text-center text-gray-400">PDI no encontrado</div>;

  const evaluado = getUserById(pdi.evaluadoId);

  const handleGenerateIA = () => {
    setIsGenerating(true);
    setDisplayedText("");
    const fullText = pdi.feedbackIA ?? "";
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i += 8;
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setDisplayedText(fullText);
        toast.success("PDI generado por IA · Pendiente de revisión y aprobación");
      }
    }, 20);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <ButtonLink href="/pdi" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Plan de Desarrollo Individual</h1>
          {evaluado && <p className="text-sm text-gray-500">{evaluado.nombre} · {evaluado.cargo}</p>}
        </div>
        <Badge className={pdi.estado === "aprobado" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
          {pdi.estado === "aprobado" ? "Aprobado" : "En revisión"}
        </Badge>
      </div>

      {/* Fortalezas y mejoras */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-green-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-green-700">Fortalezas identificadas</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pdi.areasFortaleza.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-amber-700">Áreas de mejora</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pdi.areasMejora.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  {m}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* IA Feedback */}
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <CardTitle className="text-base">Análisis y recomendaciones IA</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-50 text-purple-700 text-xs">
                Powered by Claude API
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGenerateIA}
                disabled={isGenerating}
                className="gap-2 text-xs"
              >
                {isGenerating ? (
                  <><RefreshCw className="h-3.5 w-3.5 animate-spin" />Generando...</>
                ) : (
                  <><Sparkles className="h-3.5 w-3.5" />Regenerar con IA</>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {displayedText ? (
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
              {displayedText}
              {isGenerating && <span className="inline-block w-0.5 h-4 bg-purple-500 ml-0.5 animate-pulse" />}
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="h-8 w-8 text-purple-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Haz clic en "Regenerar con IA" para generar el análisis</p>
            </div>
          )}
          <div className="mt-3 rounded-lg bg-amber-50 border border-amber-100 p-2.5 flex gap-1.5 text-xs text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            Sugerido por IA · Requiere revisión y aprobación del Líder y Talento Humano
          </div>
        </CardContent>
      </Card>

      {/* Feedback Líder */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Feedback del Líder</CardTitle></CardHeader>
        <CardContent>
          <Textarea
            value={feedbackLider}
            onChange={(e) => setFeedbackLider(e.target.value)}
            placeholder="Escribe el feedback personalizado para el colaborador..."
            rows={3}
            className="text-sm"
          />
        </CardContent>
      </Card>

      {/* Plan de acción */}
      <Card>
        <CardHeader><CardTitle className="text-base">Plan de Acción</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pdi.planAccion.map((accion) => (
              <div key={accion.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border">
                <span className="text-lg shrink-0">{TIPO_ACCION_ICONS[accion.tipo]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-medium text-sm text-gray-800">{accion.actividad}</p>
                    <Badge className={cn("text-xs", ESTADO_ACCION_COLORS[accion.estado])}>
                      {accion.estado === "pendiente" ? "Pendiente" : accion.estado === "en_progreso" ? "En progreso" : "Completada"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(accion.plazo).toLocaleDateString("es-CO")}</span>
                    <span>Responsable: {accion.responsable}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Meta: {accion.metrica}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline" onClick={() => toast.info("Guardado")}>Guardar cambios</Button>
        {pdi.estado !== "aprobado" && (
          <Button onClick={() => toast.success("PDI aprobado y enviado al evaluado")} className="bg-green-600 hover:bg-green-700 gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Aprobar PDI
          </Button>
        )}
      </div>
    </div>
  );
}
