"use client";
import { useState, useEffect, useRef } from "react";
import { CARGOS } from "@/lib/mock-data/cargos";
import { USERS } from "@/lib/mock-data/users";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTopBarActions } from "@/stores/topBarActionsStore";

const NIVEL_BADGE: Record<string, { bg: string; text: string }> = {
  operativo: { bg: "bg-blue-100/70", text: "text-blue-700" },
  tactico: { bg: "bg-purple-100/70", text: "text-purple-700" },
  estrategico: { bg: "bg-amber-100/70", text: "text-amber-700" },
};

// Cuántas personas del mock tienen ese cargoId
function countPersonas(cargoId: string) {
  return USERS.filter((u) => u.cargoId === cargoId).length;
}

// ── Modal Importar Excel ──────────────────────────────────────────────────────
function ModalImportarExcel({ onClose }: { onClose: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-[#1C1C1E] mb-1">
          Importar perfil de cargo desde Excel
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          El archivo debe tener la misma estructura del formato INMOV (F12P12).{" "}
          <button className="text-blue-600 hover:underline">Descargar plantilla</button>
        </p>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) setFile(f);
          }}
          onClick={() => document.getElementById("file-input-cargo")?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
            dragging ? "border-[#1C1C1E] bg-gray-50" : "border-gray-300 hover:border-gray-400"
          )}
        >
          <input
            id="file-input-cargo"
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); }}
          />
          {file ? (
            <div>
              <p className="text-sm font-medium text-[#1C1C1E]">{file.name}</p>
              <p className="text-xs text-gray-400 mt-1">Listo para importar</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">Arrastra el archivo aquí o haz clic para seleccionar</p>
              <p className="text-xs text-gray-400 mt-1">.xlsx · .xls</p>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Al importar se crearán o actualizarán los campos del perfil automáticamente.
        </p>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
            Cancelar
          </button>
          <button
            onClick={() => { alert("Funcionalidad en desarrollo"); onClose(); }}
            className="flex-1 py-2 bg-[#1C1C1E] text-white rounded-xl text-sm hover:bg-black/80"
          >
            Subir archivo
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Chat IA — Glassmorphism ───────────────────────────────────────────────────

const IA_FLUJO: { pregunta: string; campo: string; chips?: string[] }[] = [
  { pregunta: "¡Hola! Voy a ayudarte a crear el perfil de cargo. Para empezar, ¿cuál es el nombre del cargo?", campo: "denominacion" },
  { pregunta: "¿A qué nivel jerárquico pertenece?", campo: "nivel", chips: ["Operativo", "Táctico", "Estratégico"] },
  { pregunta: "¿A qué área pertenece este cargo?", campo: "area", chips: ["Operaciones", "Tecnología", "Comercial", "Contabilidad", "Talento Humano", "Marketing"] },
  { pregunta: "¿A quién reporta directamente?", campo: "reportaA" },
  { pregunta: "Cuéntame la misión del cargo. Puedes dármela tal como la tienes, o te ayudo a estructurarla: [Acción] + [Función] + [Para qué resultado].", campo: "mision" },
  { pregunta: "¿Cuántas personas tiene a cargo este rol?", campo: "personasACargo", chips: ["0", "1–2", "3–5", "6–10", "Más de 10"] },
  { pregunta: "Describe las principales responsabilidades. Puedes listarlas libremente y yo las estructuro como objetivos SMART.", campo: "responsabilidades" },
  { pregunta: "¿Qué formación académica se requiere?", campo: "formacion", chips: ["Bachiller", "Técnico / Tecnólogo", "Profesional", "Especialización", "Maestría"] },
  { pregunta: "¿Cuánta experiencia previa necesita quien ocupe este cargo?", campo: "experiencia", chips: ["Sin experiencia", "6 meses", "1 año", "2–3 años", "Más de 5 años"] },
  { pregunta: "¿Con qué áreas internas se relaciona y para qué?", campo: "relaciones" },
  {
    pregunta: "Ya casi terminamos. ¿Cómo quieres manejar las competencias del cargo?",
    campo: "competencias",
    chips: ["Pegar las mías", "Que la IA las defina"],
  },
];

const CAMPO_LABELS: Record<string, string> = {
  denominacion: "Denominación",
  nivel: "Nivel jerárquico",
  area: "Área",
  reportaA: "Reporta a",
  mision: "Misión",
  personasACargo: "Personas a cargo",
  responsabilidades: "Responsabilidades",
  formacion: "Formación académica",
  experiencia: "Experiencia requerida",
  relaciones: "Relaciones internas",
  competencias: "Competencias",
};

type Mensaje = { rol: "asistente" | "usuario"; texto: string };

function SheetCrearConIA({ onClose }: { onClose: () => void }) {
  const [paso, setPaso] = useState(0);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { rol: "asistente", texto: IA_FLUJO[0].pregunta },
  ]);
  const [input, setInput] = useState("");
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [terminado, setTerminado] = useState(false);
  const [pensando, setPensando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, pensando]);

  useEffect(() => {
    if (!terminado && !pensando) inputRef.current?.focus();
  }, [paso, terminado, pensando]);

  const handleEnviar = () => {
    const texto = input.trim();
    if (!texto || pensando) return;

    const campo = IA_FLUJO[paso].campo;
    setRespuestas((prev) => ({ ...prev, [campo]: texto }));
    setMensajes((prev) => [...prev, { rol: "usuario", texto }]);
    setInput("");
    setPensando(true);

    const siguientePaso = paso + 1;
    setTimeout(() => {
      setPensando(false);
      if (siguientePaso < IA_FLUJO.length) {
        setMensajes((prev) => [...prev, { rol: "asistente", texto: IA_FLUJO[siguientePaso].pregunta }]);
        setPaso(siguientePaso);
      } else {
        setMensajes((prev) => [
          ...prev,
          { rol: "asistente", texto: "¡Perfecto! He procesado toda la información. Aquí está el resumen del perfil generado." },
        ]);
        setTerminado(true);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay — blur suave sobre el dashboard */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />

      {/* Panel glass claro — armoniza con el fondo beige del dashboard */}
      <div
        className="relative flex flex-col h-full w-[460px] shadow-2xl"
        style={{
          background: "rgba(255, 252, 248, 0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        {/* Blob decorativo — hereda los colores del tema pastelBalanced */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(199,146,234,0.15) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 -left-10 w-44 h-44 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,160,112,0.10) 0%, transparent 70%)" }}
        />

        {/* Header */}
        <div className="relative z-10 px-5 py-4 flex items-center justify-between flex-shrink-0 border-b border-black/6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1C1C1E] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✦</span>
            </div>
            <div>
              <p className="font-semibold text-[#1C1C1E] text-sm leading-tight">Asistente de cargos</p>
              <p className="text-[11px] text-gray-400 leading-tight">INMOV IA · Modo guiado</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-black/5 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Área de mensajes */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-5 space-y-3">
          {mensajes.map((m, i) => (
            <div key={i} className={cn("flex", m.rol === "asistente" ? "justify-start" : "justify-end")}>
              {m.rol === "asistente" && (
                <div className="w-6 h-6 rounded-full bg-[#1C1C1E] flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                  <span className="text-white text-[9px]">✦</span>
                </div>
              )}
              <div
                className={cn(
                  "max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                  m.rol === "asistente"
                    ? "text-[#1C1C1E] rounded-2xl rounded-tl-sm"
                    : "text-[#1C1C1E] rounded-2xl rounded-tr-sm"
                )}
                style={
                  m.rol === "asistente"
                    ? {
                      background: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(0,0,0,0.07)",
                      backdropFilter: "blur(8px)",
                    }
                    : {
                      background: "rgba(28,28,30,0.88)",
                      color: "white",
                      border: "1px solid rgba(0,0,0,0.12)",
                    }
                }
              >
                {m.texto}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {pensando && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-[#1C1C1E] flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                <span className="text-white text-[9px]">✦</span>
              </div>
              <div
                className="px-4 py-3 flex items-center gap-1.5 rounded-2xl rounded-tl-sm"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Resumen al terminar */}
          {terminado && (
            <div
              className="rounded-2xl p-4 mt-1"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Perfil generado
              </p>
              <div className="space-y-2">
                {IA_FLUJO.map(({ campo }) =>
                  respuestas[campo] ? (
                    <div key={campo} className="flex gap-2 text-xs">
                      <span className="w-36 flex-shrink-0 text-gray-400">{CAMPO_LABELS[campo]}</span>
                      <span className="text-[#1C1C1E] font-medium leading-relaxed">{respuestas[campo]}</span>
                    </div>
                  ) : null
                )}
              </div>
              <button
                onClick={() => { alert("Funcionalidad en desarrollo"); onClose(); }}
                className="mt-4 w-full py-2.5 bg-[#1C1C1E] text-white rounded-xl text-sm font-medium hover:bg-black/80 transition-colors"
              >
                Guardar cargo
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input + chips */}
        {!terminado && (
          <div className="relative z-10 px-4 pb-5 pt-3 flex-shrink-0 border-t border-black/6 space-y-2">
            {/* Chips de respuesta rápida */}
            {!pensando && IA_FLUJO[paso]?.chips && (
              <div className="flex flex-wrap gap-1.5">
                {IA_FLUJO[paso].chips!.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      setInput(chip);
                      setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                      input === chip
                        ? "bg-[#1C1C1E] text-white border-[#1C1C1E]"
                        : "text-gray-600 border-black/10 hover:border-black/20 hover:bg-black/5"
                    )}
                    style={{ background: input === chip ? undefined : "rgba(255,255,255,0.6)" }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input de texto */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all focus-within:border-black/20"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.09)",
                backdropFilter: "blur(8px)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleEnviar(); } }}
                placeholder="Escribe tu respuesta o elige una opción..."
                className="flex-1 bg-transparent text-sm text-[#1C1C1E] placeholder-gray-400 focus:outline-none"
                disabled={pensando}
              />
              <button
                onClick={handleEnviar}
                disabled={!input.trim() || pensando}
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                  input.trim() && !pensando
                    ? "bg-[#1C1C1E] text-white hover:bg-black/80"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                )}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function CargosPage() {
  const [showImport, setShowImport] = useState(false);
  const [showIA, setShowIA] = useState(false);
  const router = useRouter();
  const setActions = useTopBarActions((s) => s.setActions);

  useEffect(() => {
    setActions({
      openImport: () => setShowImport(true),
      openIA: () => setShowIA(true),
    });
    return () => setActions(null);
  }, [setActions]);

  return (
    <div className="px-10 pt-8 pb-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1E]">Perfiles de Cargo</h1>
          <p className="text-gray-500 text-sm mt-1">{CARGOS.length} cargos definidos</p>
        </div>
        <button
          onClick={() => alert("Funcionalidad en desarrollo")}
          className="px-4 py-2 text-sm bg-[#1C1C1E] text-white rounded-xl hover:bg-black/80 transition-colors"
        >
          + Nuevo cargo
        </button>
      </div>

      {/* Tabla */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-gray-200">
              {[
                "Denominación",
                "Código",
                "Nivel",
                "Área",
                "Banda",
                "Personas",
                "Responsabilidades",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className={cn(
                    "pb-3 pr-5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap",
                    h === "" ? "text-right pr-0" : "text-left"
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CARGOS.map((cargo) => {
              const badge = NIVEL_BADGE[cargo.nivel];
              const personas = countPersonas(cargo.id);
              return (
                <tr
                  key={cargo.id}
                  onClick={() => router.push(`/cargos/${cargo.id}`)}
                  className="group border-b border-gray-100 last:border-0 cursor-pointer"
                >
                  {/* Denominación */}
                  <td className="py-3.5 pr-5">
                    <p className="font-medium text-[#1C1C1E] text-sm group-hover:text-black transition-colors">
                      {cargo.denominacion}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{cargo.area}</p>
                  </td>

                  {/* Código */}
                  <td className="py-3.5 pr-5">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {cargo.codigo}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">Rev. {cargo.revision}</p>
                  </td>

                  {/* Nivel */}
                  <td className="py-3.5 pr-5">
                    <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium capitalize", badge.bg, badge.text)}>
                      {cargo.nivel}
                    </span>
                  </td>

                  {/* Área */}
                  <td className="py-3.5 pr-5 text-sm text-gray-600 whitespace-nowrap">{cargo.area}</td>

                  {/* Banda */}
                  <td className="py-3.5 pr-5">
                    <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                      {cargo.bandaSalarial}
                    </span>
                  </td>

                  {/* Personas */}
                  <td className="py-3.5 pr-5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-[#1C1C1E]">{personas}</span>
                      <span className="text-xs text-gray-400">personas</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{cargo.personasACargo} a cargo</p>
                  </td>

                  {/* Responsabilidades */}
                  <td className="py-3.5 pr-5">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-[#1C1C1E]">{cargo.responsabilidades.length}</span>
                      <span className="text-xs text-gray-400">objetivos SMART</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {cargo.responsabilidades.map((r, i) => (
                        <div
                          key={i}
                          title={r.que}
                          className="h-1 rounded-full bg-gray-200 flex-1 max-w-[28px]"
                          style={{ opacity: 0.5 + i * 0.15 }}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Acción */}
                  <td className="py-3.5 text-right">
                    <span className="text-xs text-gray-300 group-hover:text-gray-500 transition-colors font-medium">
                      Ver →
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showImport && <ModalImportarExcel onClose={() => setShowImport(false)} />}
      {showIA && <SheetCrearConIA onClose={() => setShowIA(false)} />}
    </div>
  );
}
