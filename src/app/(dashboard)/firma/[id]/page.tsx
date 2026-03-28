"use client";
import { use, useState, useRef, useEffect } from "react";
import { MOCK_FIRMAS } from "@/lib/mock-data/firmas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  ArrowLeft, Shield, CheckCircle2, Clock, Send,
  RotateCcw, Lock, FileText, Monitor, Globe
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Step = "preview" | "otp-send" | "otp-verify" | "sign" | "done";

export default function FirmaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const firma = MOCK_FIRMAS.find((f) => f.id === id);
  const [step, setStep] = useState<Step>("preview");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    if (step === "sign" && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#1e3a5f";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
      }
    }
  }, [step]);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
    setHasSigned(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    toast.success("OTP enviado a su correo registrado ****@inmov.co");
    setStep("otp-verify");
  };

  const handleVerifyOtp = () => {
    if (otp.length < 6) {
      toast.error("Ingresa el código de 6 dígitos");
      return;
    }
    toast.success("OTP verificado correctamente");
    setStep("sign");
  };

  const handleFinalizarFirma = () => {
    if (!hasSigned) {
      toast.error("Debes dibujar tu firma en el pad");
      return;
    }
    setStep("done");
    toast.success("Documento firmado electrónicamente con validez legal");
  };

  if (!firma) return <div className="p-8 text-center text-gray-400">Documento no encontrado</div>;

  if (firma.estado === "firmado" || step === "done") {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <ButtonLink href="/firma" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
          <h1 className="text-xl font-bold text-gray-900">Documento firmado</h1>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h2 className="font-bold text-green-900 text-lg mb-1">Firma completada</h2>
            <p className="text-sm text-green-700">{firma.nombreDocumento}</p>
            <div className="mt-4 text-xs text-green-600 space-y-1">
              <p>Hash: {firma.hashDocumento.substring(0, 40)}...</p>
              {firma.timestamp && <p>Firmado: {new Date(firma.timestamp).toLocaleString("es-CO")}</p>}
              {firma.ipMock && <p>IP: {firma.ipMock}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Audit trail */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Audit Trail</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {firma.auditTrail.map((entry, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <div className="w-1 rounded-full bg-blue-200 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{entry.accion}</p>
                    <p className="text-gray-400">{new Date(entry.timestamp).toLocaleString("es-CO")} · {entry.ip} · {entry.dispositivo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <ButtonLink href="/firma" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Firma electrónica</h1>
          <p className="text-sm text-gray-500">{firma.nombreDocumento}</p>
        </div>
      </div>

      {/* Progreso */}
      <div className="flex items-center gap-0">
        {["preview", "otp-verify", "sign"].map((s, i) => {
          const labels = ["Revisar", "OTP", "Firmar"];
          const isDone = ["preview", "otp-send", "otp-verify", "sign"].indexOf(step) > i;
          const isCurrent = step === s || (step === "otp-send" && s === "otp-verify");
          return (
            <div key={s} className="flex-1 flex flex-col items-center">
              <div className="flex w-full items-center">
                <div className={cn("flex-1 h-0.5", i === 0 ? "bg-transparent" : isDone ? "bg-blue-500" : "bg-gray-200")} />
                <div className={cn("h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold", isDone ? "bg-blue-600 text-white" : isCurrent ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-gray-100 text-gray-400")}>
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <div className={cn("flex-1 h-0.5", i === 2 ? "bg-transparent" : isDone ? "bg-blue-500" : "bg-gray-200")} />
              </div>
              <p className={cn("text-xs mt-1", isCurrent ? "text-blue-700 font-semibold" : "text-gray-400")}>{labels[i]}</p>
            </div>
          );
        })}
      </div>

      {/* Paso 1: Preview */}
      {step === "preview" && (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><FileText className="h-4 w-4" /> Vista previa del documento</CardTitle></CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 border min-h-48 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <div className="h-6 w-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">I</div>
                  <span className="text-xs font-bold text-gray-700">INMOV · Sistema de Evaluación de Desempeño</span>
                </div>
                <p className="text-xs font-bold text-gray-800">{firma.nombreDocumento}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div><span className="text-gray-400">Evaluación:</span> {firma.evaluacionId}</div>
                  <div><span className="text-gray-400">Documento ID:</span> {firma.id}</div>
                </div>
                <p className="text-xs text-gray-500">
                  Este documento contiene los resultados de la evaluación de desempeño correspondiente al período 2025.
                  Al firmar, acepta que ha revisado el contenido y da fe de su veracidad conforme a la Ley 527 de 1999.
                </p>
                <div className="text-xs text-gray-400 font-mono break-all bg-white rounded p-2 border">
                  {firma.hashDocumento}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
            <label htmlFor="agree" className="text-sm text-gray-600">
              He leído el documento y acepto el <strong>Acuerdo de Uso de Firma Electrónica</strong> conforme al Decreto 526/2021. Entiendo que esta firma tiene validez legal en Colombia.
            </label>
          </div>

          <Button disabled={!agreed} onClick={() => setStep("otp-send")} className="w-full gap-2">
            <Shield className="h-4 w-4" />
            Continuar con verificación OTP
          </Button>
        </div>
      )}

      {/* Paso 2: OTP */}
      {(step === "otp-send" || step === "otp-verify") && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Verificación de identidad</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {otpSent
                    ? "Ingresa el código de 6 dígitos enviado a ****@inmov.co"
                    : "Enviaremos un código OTP a tu correo para verificar tu identidad antes de firmar."}
                </p>
              </div>

              {otpSent && (
                <div className="space-y-2">
                  <Input
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="text-center text-2xl tracking-widest font-mono h-14"
                    maxLength={6}
                  />
                  <p className="text-xs text-center text-gray-400">
                    Para demo: usa cualquier código de 6 dígitos (ej: 847291)
                  </p>
                </div>
              )}

              {!otpSent ? (
                <Button onClick={handleSendOtp} className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Enviar código OTP
                </Button>
              ) : (
                <Button onClick={handleVerifyOtp} disabled={otp.length < 6} className="w-full">
                  Verificar y continuar
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Paso 3: Firma canvas */}
      {step === "sign" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-600" />
                Dibuja tu firma manuscrita
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={560}
                  height={160}
                  className="w-full cursor-crosshair"
                  onMouseDown={startDraw}
                  onMouseMove={draw}
                  onMouseUp={stopDraw}
                  onMouseLeave={stopDraw}
                />
                {!hasSigned && (
                  <p className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 pointer-events-none">
                    Firma aquí con el cursor
                  </p>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={clearCanvas} className="gap-2 text-xs">
                <RotateCcw className="h-3.5 w-3.5" />
                Limpiar
              </Button>

              <div className="rounded-lg bg-blue-50 p-3 space-y-1 text-xs text-blue-700">
                <p className="flex items-center gap-1.5"><Monitor className="h-3.5 w-3.5" /> Dispositivo: Chrome 120 / Windows</p>
                <p className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> IP: 192.168.1.45 (capturada automáticamente)</p>
                <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Timestamp: {new Date().toLocaleString("es-CO")}</p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleFinalizarFirma}
            disabled={!hasSigned}
            className="w-full gap-2 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="h-4 w-4" />
            Firmar documento electrónicamente
          </Button>

          <p className="text-xs text-center text-gray-400">
            Al firmar, acepta que este acto tiene validez legal conforme a la Ley 527 de 1999 y Decreto 2364 de 2012
          </p>
        </div>
      )}
    </div>
  );
}
