import React, { useState } from 'react';
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Send, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  User, 
  Filter,
  ArrowUpRight
} from 'lucide-react';

export default function DemoModulo3() {
  // Lista simulada interactiva de cotizaciones guardadas automáticamente
  const [cotizaciones, setCotizaciones] = useState([
    {
      id: 1,
      fecha: '14/10/2026',
      cliente: 'Carlos Méndez',
      telefono: '099123456',
      zona: 'Pocitos, MVD',
      trabajo: 'Corrediza 2H Probba DVH (150x120)',
      montoUYU: 13200,
      montoUSD: 326,
      estado: 'Pendiente',
      horasTranscurridas: 48,
      alertaActiva: true
    },
    {
      id: 2,
      fecha: '13/10/2026',
      cliente: 'Laura Rossi',
      telefono: '098456789',
      zona: 'Carrasco, MVD',
      trabajo: 'Paño Fijo Serie 25 Simple (200x150)',
      montoUYU: 9800,
      montoUSD: 242,
      estado: 'Ganado',
      horasTranscurridas: 72,
      alertaActiva: false
    },
    {
      id: 3,
      fecha: '12/10/2026',
      cliente: 'Martín Silva',
      telefono: '091223344',
      zona: 'Canelones',
      trabajo: 'Puerta de Abrir Gala DVH (90x210)',
      montoUYU: 24500,
      montoUSD: 605,
      estado: 'Pendiente',
      horasTranscurridas: 52,
      alertaActiva: true
    },
    {
      id: 4,
      fecha: '10/10/2026',
      cliente: 'Arq. Gonzalo Pena',
      telefono: '099778899',
      zona: 'Punta del Este',
      trabajo: '3 Ventanas Batientes Serie 25 (100x100)',
      montoUYU: 32000,
      montoUSD: 790,
      estado: 'Perdido',
      horasTranscurridas: 96,
      alertaActiva: false
    }
  ]);

  const cambiarEstado = (id, nuevoEstado) => {
    setCotizaciones(cotizaciones.map(c => 
      c.id === id ? { ...c, estado: nuevoEstado, alertaActiva: nuevoEstado === 'Pendiente' ? c.alertaActiva : false } : c
    ));
  };

  const enviarSeguimiento = (cot) => {
    const mensaje = `Hola ${cot.cliente}! 👋 Te escribo desde el taller para consultarte si pudiste revisar el presupuesto de ${cot.trabajo}. ¿Te gustaría que coordinemos una visita a obra para rectificar medidas o tenés alguna consulta técnica?`;
    window.open(`https://wa.me/598${cot.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  // Selector de moneda en Módulo 3
  const [monedaCRM, setMonedaCRM] = useState('USD');

  const totalCotizadoUSD = cotizaciones.reduce((acc, c) => acc + c.montoUSD, 0);
  const totalGanadoUSD = cotizaciones.filter(c => c.estado === 'Ganado').reduce((acc, c) => acc + c.montoUSD, 0);
  const totalCotizadoUYU = cotizaciones.reduce((acc, c) => acc + c.montoUYU, 0);
  const totalGanadoUYU = cotizaciones.filter(c => c.estado === 'Ganado').reduce((acc, c) => acc + c.montoUYU, 0);
  const pendientesCount = cotizaciones.filter(c => c.estado === 'Pendiente').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner Explicativo del Módulo 3 */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-[#2c1256] rounded-3xl p-5 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-400/20 inline-block mb-1">
            Demo Interactiva • Módulo 3
          </span>
          <h2 className="text-xl font-bold">Historial de Cotizaciones & Alertas de Seguimiento</h2>
          <p className="text-xs text-indigo-200 mt-0.5">
            Cada presupuesto enviado se guarda solo. El sistema te avisa a las 48h para recordar contactar al cliente y cerrar la venta.
          </p>
        </div>

        {/* Toggle Multimoneda */}
        <div className="bg-indigo-950 p-1 rounded-xl border border-indigo-400/30 flex items-center text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setMonedaCRM('USD')}
            className={`px-3 py-1 rounded-lg transition-all ${
              monedaCRM === 'USD' ? 'bg-[#e6007e] text-white shadow' : 'text-indigo-200 hover:text-white'
            }`}
          >
            USD ($)
          </button>
          <button
            type="button"
            onClick={() => setMonedaCRM('LOCAL')}
            className={`px-3 py-1 rounded-lg transition-all ${
              monedaCRM === 'LOCAL' ? 'bg-[#e6007e] text-white shadow' : 'text-indigo-200 hover:text-white'
            }`}
          >
            Moneda Local
          </button>
        </div>
      </div>

      {/* Métricas KPI Simples de Facturación */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Presupuestado</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {monedaCRM === 'USD' ? `USD ${totalCotizadoUSD.toLocaleString()}` : `$ ${totalCotizadoUYU.toLocaleString('es-UY')}`}
          </div>
          <span className="text-[10px] text-slate-400">{cotizaciones.length} presupuestos este mes</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-xs bg-emerald-50/20">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Ventas Cerradas / Ganadas</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {monedaCRM === 'USD' ? `USD ${totalGanadoUSD.toLocaleString()}` : `$ ${totalGanadoUYU.toLocaleString('es-UY')}`}
          </div>
          <span className="text-[10px] text-emerald-600">Trabajos con seña confirmada</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs bg-amber-50/20">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">Seguimientos Pendientes</span>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {pendientesCount} clientes
          </div>
          <span className="text-[10px] text-amber-600">Alertas activas para volver a contactar</span>
        </div>
      </div>

      {/* Alerta de Seguimiento Activa (n8n Engine) */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs flex items-start gap-3">
        <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0">
          <Bell className="w-4 h-4 animate-bounce" />
        </div>
        <div className="space-y-1">
          <span className="font-extrabold text-amber-900 block text-sm">
            🔔 Alerta Automática de n8n: 2 clientes llevan más de 48h sin responder
          </span>
          <p className="text-amber-800">
            El sistema detectó presupuestos enviados hace más de 2 días. Tocá el botón verde al lado de cada cliente para enviarle el recordatorio suave por WhatsApp con 1 toque.
          </p>
        </div>
      </div>

      {/* Tabla Visual de Cotizaciones */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-sm text-slate-900">Registro Automático de Presupuestos</h3>
          <span className="text-[11px] text-slate-500">Sincronizado con Google Sheets en la nube</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="p-3">Cliente / Teléfono</th>
                <th className="p-3">Abertura Cotizada</th>
                <th className="p-3">Total</th>
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acción Rápida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cotizaciones.map((cot) => (
                <tr key={cot.id} className="hover:bg-slate-50/70 transition-all">
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{cot.cliente}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span>{cot.telefono}</span> • <span>{cot.zona}</span>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="text-slate-800 font-medium">{cot.trabajo}</div>
                    <div className="text-[10px] text-slate-400">Enviado: {cot.fecha} ({cot.horasTranscurridas}h)</div>
                  </td>

                  <td className="p-3">
                    {monedaCRM === 'USD' ? (
                      <>
                        <div className="font-bold text-slate-900">USD {cot.montoUSD}</div>
                        <div className="text-[10px] text-slate-400">≈ $ {cot.montoUYU.toLocaleString('es-UY')}</div>
                      </>
                    ) : (
                      <>
                        <div className="font-bold text-slate-900">$ {cot.montoUYU.toLocaleString('es-UY')}</div>
                        <div className="text-[10px] text-slate-400">≈ USD {cot.montoUSD}</div>
                      </>
                    )}
                  </td>

                  <td className="p-3">
                    <select
                      value={cot.estado}
                      onChange={(e) => cambiarEstado(cot.id, e.target.value)}
                      className={`text-xs font-extrabold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                        cot.estado === 'Ganado'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : cot.estado === 'Perdido'
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Pendiente">🟡 Pendiente</option>
                      <option value="Ganado">🟢 Ganado (Seña)</option>
                      <option value="Perdido">🔴 Perdido</option>
                    </select>
                  </td>

                  <td className="p-3 text-right">
                    {cot.estado === 'Pendiente' ? (
                      <button
                        onClick={() => enviarSeguimiento(cot)}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-xl text-[11px] shadow-xs transition-all"
                        title="Enviar mensaje de seguimiento a las 48h"
                      >
                        <Send className="w-3 h-3" />
                        <span>Seguimiento 48h</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">Archivado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
