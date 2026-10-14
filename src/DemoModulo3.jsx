import React, { useState } from 'react';
import { 
  Bell, 
  Send,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function DemoModulo3() {
  // Moneda activa en el CRM
  const [monedaCRM, setMonedaCRM] = useState('USD'); // 'USD' | 'UYU'

  // Lista de cotizaciones registradas automáticamente (Multi-rubro representativo)
  const [cotizaciones, setCotizaciones] = useState([
    {
      id: 1,
      fecha: 'Hace 48 horas',
      cliente: 'Carlos Méndez',
      telefono: '099123456',
      zona: 'Pocitos',
      rubro: 'Aberturas',
      trabajo: 'Ventana Corrediza 2H Probba DVH (150x120)',
      montoUSD: 326,
      montoUYU: 13200,
      estado: 'Pendiente',
      alerta48h: true
    },
    {
      id: 2,
      fecha: 'Hace 52 horas',
      cliente: 'Laura Rossi',
      telefono: '098456789',
      zona: 'Carrasco',
      rubro: 'Muebles',
      trabajo: 'Bajo Mesada Cocina en Melamina (160x85)',
      montoUSD: 410,
      montoUYU: 16600,
      estado: 'Pendiente',
      alerta48h: true
    },
    {
      id: 3,
      fecha: 'Ayer',
      cliente: 'Martín Silva',
      telefono: '091223344',
      zona: 'Canelones',
      rubro: 'Herrería',
      trabajo: 'Portón Corredizo Reforzado (300x200)',
      montoUSD: 860,
      montoUYU: 34800,
      estado: 'Ganado',
      alerta48h: false
    },
    {
      id: 4,
      fecha: 'Hace 4 días',
      cliente: 'Arq. Gonzalo Pena',
      telefono: '099778899',
      zona: 'Punta del Este',
      rubro: 'Climatización',
      trabajo: 'Instalación Split 3 Puntos + Tablero',
      montoUSD: 480,
      montoUYU: 19440,
      estado: 'Archivado',
      alerta48h: false
    }
  ]);

  const cambiarEstado = (id, nuevoEstado) => {
    setCotizaciones(prev => prev.map(c => 
      c.id === id 
        ? { ...c, estado: nuevoEstado, alerta48h: nuevoEstado === 'Pendiente' ? c.alerta48h : false } 
        : c
    ));
  };

  const enviarSeguimientoWhatsApp = (cot) => {
    const mensaje = `Hola ${cot.cliente}! 👋 Te escribo del taller para consultarte si pudiste revisar el presupuesto de ${cot.trabajo}. ¿Querés que coordinemos una visita técnica o tenés alguna consulta antes de avanzar?`;
    const telLimpio = cot.telefono.replace(/\D/g, '');
    window.open(`https://wa.me/598${telLimpio}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const totalUSD = cotizaciones.reduce((acc, c) => acc + c.montoUSD, 0);
  const totalUYU = cotizaciones.reduce((acc, c) => acc + c.montoUYU, 0);
  const ganadosUSD = cotizaciones.filter(c => c.estado === 'Ganado').reduce((acc, c) => acc + c.montoUSD, 0);
  const ganadosUYU = cotizaciones.filter(c => c.estado === 'Ganado').reduce((acc, c) => acc + c.montoUYU, 0);
  const alertasPendientes = cotizaciones.filter(c => c.alerta48h && c.estado === 'Pendiente').length;

  return (
    <div className="max-w-3xl mx-auto space-y-5 antialiased">
      
      {/* Header / Explicación del Módulo 3 */}
      <div className="bg-gradient-to-r from-[#2c1256] via-[#4a208e] to-[#5a207e] rounded-3xl p-5 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#e6007e] text-white px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-xs">
            Módulo 3 • Historial & Mini CRM
          </span>
          <h2 className="text-xl font-bold">Seguimiento Automático de Presupuestos</h2>
          <p className="text-xs text-purple-200 mt-0.5 max-w-xl">
            Cada presupuesto enviado se registra solo en tu planilla en la nube. Si el cliente no responde a las 48h, te avisa para volver a contactarlo con 1 toque.
          </p>
        </div>

        {/* Selector de Moneda Rápido */}
        <div className="bg-purple-950/80 p-1 rounded-xl border border-purple-400/20 flex items-center text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setMonedaCRM('USD')}
            className={`px-3 py-1 rounded-lg transition-all ${
              monedaCRM === 'USD' ? 'bg-[#e6007e] text-white shadow' : 'text-purple-200 hover:text-white'
            }`}
          >
            USD ($)
          </button>
          <button
            type="button"
            onClick={() => setMonedaCRM('UYU')}
            className={`px-3 py-1 rounded-lg transition-all ${
              monedaCRM === 'UYU' ? 'bg-[#e6007e] text-white shadow' : 'text-purple-200 hover:text-white'
            }`}
          >
            UYU ($)
          </button>
        </div>
      </div>

      {/* 3 Métricas Claras y Directas (Sin sobrecarga) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Presupuestado</span>
            <DollarSign className="w-4 h-4 text-[#4a208e]" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {monedaCRM === 'USD' ? `USD ${totalUSD.toLocaleString()}` : `$ ${totalUYU.toLocaleString('es-UY')}`}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">{cotizaciones.length} cotizaciones este mes</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-xs bg-emerald-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Ventas Confirmadas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {monedaCRM === 'USD' ? `USD ${ganadosUSD.toLocaleString()}` : `$ ${ganadosUYU.toLocaleString('es-UY')}`}
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Con seña confirmada</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs bg-amber-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Alertas 48h Activas</span>
            <Bell className="w-4 h-4 text-amber-600 animate-bounce" />
          </div>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {alertasPendientes} clientes
          </div>
          <span className="text-[10px] text-amber-600 font-medium">Recordatorio listo para enviar</span>
        </div>
      </div>

      {/* Banner de Acción Rápida */}
      {alertasPendientes > 0 && (
        <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-amber-500 text-white rounded-lg font-bold shrink-0">🔔</span>
            <span className="text-amber-950 font-semibold">
              Tenés <strong>{alertasPendientes} clientes</strong> que recibieron presupuesto hace 2 días y no respondieron.
            </span>
          </div>
          <span className="text-[11px] font-extrabold text-amber-800 bg-amber-100 px-2 py-1 rounded-md shrink-0">
            Cerrá más ventas
          </span>
        </div>
      )}

      {/* Feed de Tarjetas Táctiles Mobile-First (Sin scroll horizontal) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-sm text-slate-900">Historial de Clientes</h3>
          <span className="text-[11px] text-slate-500">Sincronizado en la nube</span>
        </div>

        {cotizaciones.map((cot) => (
          <div 
            key={cot.id}
            className={`bg-white rounded-2xl p-4 border transition-all shadow-xs flex flex-col gap-3 ${
              cot.alerta48h && cot.estado === 'Pendiente'
                ? 'border-amber-300 ring-2 ring-amber-200/50'
                : 'border-slate-200'
            }`}
          >
            {/* Fila superior: Cliente, tiempo y monto */}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm">{cot.cliente}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#4a208e]">
                    {cot.rubro}
                  </span>
                  {cot.alerta48h && cot.estado === 'Pendiente' && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
                      🔔 Alerta 48h
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <span>{cot.telefono}</span>
                  <span>•</span>
                  <span>{cot.zona}</span>
                  <span>•</span>
                  <span className="text-slate-400">{cot.fecha}</span>
                </div>
              </div>

              {/* Monto destacado */}
              <div className="text-right shrink-0">
                <div className="font-black text-base text-slate-900">
                  {monedaCRM === 'USD' ? `USD ${cot.montoUSD}` : `$ ${cot.montoUYU.toLocaleString('es-UY')}`}
                </div>
                <div className="text-[10px] text-slate-400">
                  {monedaCRM === 'USD' ? `≈ $ ${cot.montoUYU.toLocaleString('es-UY')}` : `≈ USD ${cot.montoUSD}`}
                </div>
              </div>
            </div>

            {/* Fila media: Detalle del trabajo */}
            <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
              {cot.trabajo}
            </div>

            {/* Fila inferior: Estado de 1 toque y botón de WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1 border-t border-slate-100">
              
              {/* Selector de estado simple con 3 botones tipo pill */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => cambiarEstado(cot.id, 'Pendiente')}
                  className={`flex-1 sm:flex-initial text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    cot.estado === 'Pendiente'
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🟡 Pendiente
                </button>
                <button
                  type="button"
                  onClick={() => cambiarEstado(cot.id, 'Ganado')}
                  className={`flex-1 sm:flex-initial text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    cot.estado === 'Ganado'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🟢 Señado
                </button>
                <button
                  type="button"
                  onClick={() => cambiarEstado(cot.id, 'Archivado')}
                  className={`flex-1 sm:flex-initial text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    cot.estado === 'Archivado'
                      ? 'bg-slate-400 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚪ Archivado
                </button>
              </div>

              {/* Botón de Seguimiento WhatsApp */}
              {cot.estado === 'Pendiente' && (
                <button
                  type="button"
                  onClick={() => enviarSeguimientoWhatsApp(cot)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Recordatorio 48h</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Nota de pie */}
      <div className="text-center text-[11px] text-slate-500 py-2">
        💡 Cada taller o empresa define sus propios plazos de aviso (24h, 48h o 7 días) según su ciclo de ventas.
      </div>

    </div>
  );
}
