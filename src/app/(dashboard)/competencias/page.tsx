"use client";
import { useState } from "react";
import { MOCK_COMPETENCIAS } from "@/lib/mock-data/competencias";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus, Search, Lock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const TIPO_COLORS: Record<string, string> = {
  core: "bg-blue-100 text-blue-700",
  funcional: "bg-purple-100 text-purple-700",
  liderazgo: "bg-amber-100 text-amber-700",
};

const TIPO_LABELS: Record<string, string> = {
  core: "Corporativa",
  funcional: "Funcional",
  liderazgo: "Liderazgo",
};

export default function CompetenciasPage() {
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState<string>("all");

  const filtered = MOCK_COMPETENCIAS.filter((c) => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase());
    const matchTipo = filterTipo === "all" || c.tipo === filterTipo;
    return matchSearch && matchTipo;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biblioteca de Competencias</h1>
          <p className="text-sm text-gray-500 mt-1">{MOCK_COMPETENCIAS.length} competencias definidas</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva competencia
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar competencias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["all", "core", "funcional", "liderazgo"].map((t) => (
            <Button
              key={t}
              size="sm"
              variant={filterTipo === t ? "default" : "outline"}
              onClick={() => setFilterTipo(t)}
              className="text-xs"
            >
              {t === "all" ? "Todas" : TIPO_LABELS[t]}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((comp) => (
          <Link key={comp.id} href={`/competencias/${comp.id}`}>
            <Card className="border shadow-sm hover:shadow-md transition-all hover:border-blue-200 cursor-pointer h-full">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-sm text-gray-900">{comp.nombre}</p>
                        {comp.inmutable && <Lock className="h-3 w-3 text-gray-400" />}
                      </div>
                    </div>
                  </div>
                  <Badge className={cn("text-xs shrink-0", TIPO_COLORS[comp.tipo])}>
                    {TIPO_LABELS[comp.tipo]}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{comp.descripcion}</p>
                <div className="flex flex-wrap gap-1">
                  {comp.nivelJerarquico.map((n) => (
                    <Badge key={n} variant="outline" className="text-xs capitalize">{n}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Peso por defecto: {comp.pesoPorDefecto}%</span>
                  <span>{comp.indicadores.length} niveles definidos</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
