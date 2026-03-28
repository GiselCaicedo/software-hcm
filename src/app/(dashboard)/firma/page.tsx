"use client";
import { MOCK_FIRMAS } from "@/lib/mock-data/firmas";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import Link from "next/link";
import { PenLine, Clock, CheckCircle2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FirmaPage() {
  const { currentUser } = useAuthStore();
  const firmas = MOCK_FIRMAS.filter((f) => f.participanteId === currentUser?.id || true);
  const pendientes = firmas.filter((f) => f.estado === "pendiente");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Firma Digital</h1>
        <p className="text-sm text-gray-500 mt-1">
          Gestiona los documentos pendientes de firma electrónica · Ley 527/1999
        </p>
      </div>

      {pendientes.length > 0 && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" />
          Tienes <strong>{pendientes.length}</strong> documento(s) pendiente(s) de firma.
        </div>
      )}

      <div className="space-y-3">
        {firmas.map((firma) => (
          <Card key={firma.id} className="border shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                firma.estado === "firmado" ? "bg-green-50" : "bg-amber-50"
              )}>
                <FileText className={cn("h-5 w-5", firma.estado === "firmado" ? "text-green-600" : "text-amber-600")} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">{firma.nombreDocumento}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span>Hash: {firma.hashDocumento.substring(0, 24)}...</span>
                  {firma.timestamp && <span>Firmado: {new Date(firma.timestamp).toLocaleDateString("es-CO")}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {firma.estado === "firmado" ? (
                  <Badge className="bg-green-100 text-green-700 gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Firmado
                  </Badge>
                ) : (
                  <Badge className="bg-amber-100 text-amber-700 gap-1">
                    <Clock className="h-3 w-3" /> Pendiente
                  </Badge>
                )}
                <ButtonLink href={`/firma/${firma.id}`} variant={firma.estado === "pendiente" ? "default" : "outline"} size="sm" className="text-xs">{firma.estado === "pendiente" ? "Firmar" : "Ver"}</ButtonLink>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
