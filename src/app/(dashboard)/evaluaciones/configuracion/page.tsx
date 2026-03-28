"use client";
import { useState } from "react";
import { MOCK_USERS } from "@/lib/mock-data/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Plus, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ConfiguracionEvaluacionPage() {
  const [nombre, setNombre] = useState("Evaluación Anual 2026");
  const [tipo, setTipo] = useState("360");
  const [periodo, setPeriodo] = useState("anual");
  const [fechaInicio, setFechaInicio] = useState("2027-01-15");
  const [fechaFin, setFechaFin] = useState("2027-03-31");
  const [participantes, setParticipantes] = useState<string[]>(["u4", "u5", "u6"]);

  const evaluados = MOCK_USERS.filter((u) => u.roles.includes("evaluado"));

  const toggleParticipante = (id: string) => {
    setParticipantes((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  };

  const handleCreate = () => {
    if (!nombre || participantes.length === 0) {
      toast.error("Completa el nombre y selecciona al menos un participante");
      return;
    }
    toast.success("Ciclo de evaluación creado exitosamente");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <ButtonLink href="/evaluaciones" variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></ButtonLink>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Configurar ciclo</h1>
          <p className="text-sm text-gray-500">Define los parámetros del nuevo ciclo de evaluación</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Información general</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre del ciclo</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de evaluación</Label>
              <Select value={tipo} onValueChange={(v) => v && setTipo(v as typeof tipo)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90° (Autoevaluación)</SelectItem>
                  <SelectItem value="180">180° (Jefe + Auto)</SelectItem>
                  <SelectItem value="360">360° (Completa)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={periodo} onValueChange={(v) => v && setPeriodo(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="anual">Anual</SelectItem>
                  <SelectItem value="semestral">Semestral</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha inicio</Label>
              <Input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Fecha cierre</Label>
              <Input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Participantes</CardTitle>
            <Badge>{participantes.length} seleccionados</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {evaluados.map((u) => (
              <button
                key={u.id}
                onClick={() => toggleParticipante(u.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                  participantes.includes(u.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-100 hover:border-gray-200"
                )}
              >
                <img src={u.avatar} alt={u.nombre} className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{u.nombre}</p>
                  <p className="text-xs text-gray-500">{u.cargo}</p>
                </div>
                {participantes.includes(u.id) && (
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Configuración de ponderación</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Objetivos del cargo</span>
            <div className="flex items-center gap-2">
              <Input className="w-16 text-center h-8" defaultValue="60" />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Competencias</span>
            <div className="flex items-center gap-2">
              <Input className="w-16 text-center h-8" defaultValue="40" />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">La suma debe ser 100%</p>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pb-8">
        <ButtonLink href="/evaluaciones" variant="outline">Cancelar</ButtonLink>
        <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="h-4 w-4" />
          Crear ciclo de evaluación
        </Button>
      </div>
    </div>
  );
}
