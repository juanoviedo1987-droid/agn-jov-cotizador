import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  Zap, 
  Filter, 
  BarChart3
} from 'lucide-react';

export default function WebAGNSection({ onSelectModule }) {
  // Selector dinámico interactivo de módulos
  const [selectedModules, setSelectedModules] = useState({
    m1: true,   // M1 es la base obligatoria
    m2: true,   // M2 activo por defecto en la demo
    m3: false   // M3 opcional
  });

  // Precios base acordados
  const precios = {
    m1: { setup: 250, mensual: 30, nombre: 'Módulo 1: Cotizador + Base de Datos' },
    m2: { setup: 150, mensual: 15, nombre: 'Módulo 2: Filtro Web de Captación' },
    m3: { setup: 150, mensual: 20, nombre: 'Módulo 3: Historial & Mini CRM' }
  };

  const toggleModule = (mod) => {
    if (mod === 'm1') return; // M1 no se puede desactivar porque es la base
    setSelectedModules(prev => ({ ...prev, [mod]: !prev[mod] }));
  };

  const totalSetup = (selectedModules.m1 ? precios.m1.setup : 0) +
                     (selectedModules.m2 ? precios.m2.setup : 0) +
                     (selectedModules.m3 ? precios.m3.setup : 0);

  const totalMensual = (selectedModules.m1 ? precios.m1.mensual : 0) +
                       (selectedModules.m2 ? precios.m2.mensual : 0) +
                       (selectedModules.m3 ? precios.m3.mensual : 0);

  return (
    <section className="bg-white text-slate-800 py-10 sm:py-16 px-4 antialiased selection:bg-[#4a208e] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">

        {/* 1. Header / Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#4a208e] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#e6007e]" />
            Sistema Modular • Grupo AGN
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Plataforma Modular de Ventas & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#4a208e] via-[#5a207e] to-[#e6007e] bg-clip-text text-transparent">
              Cotización Rápida para Pymes
            </span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sin paquetes cerrados ni sobrecostos. Empezá con la herramienta base que tu negocio necesita hoy y sumá módulos a medida que crezcas.
          </p>
        </div>

        {/* 2. Los 3 Módulos Puros (Tarjetas Interactivas con botón para probar cada uno) */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">Los 3 Módulos a la Carta</h3>
              <p className="text-xs text-slate-500">Seleccioná los módulos que querés sumar a tu solución:</p>
            </div>
            <span className="text-xs font-bold bg-purple-100 text-[#4a208e] px-2.5 py-1 rounded-full self-start sm:self-auto">
              Precios transparentes en USD
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

            {/* MÓDULO 1 */}
            <div className={`rounded-3xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m1 ? 'border-[#4a208e] bg-purple-50/30 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    Base Obligatoria
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">USD 250</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 30/mes</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">Módulo 1: Cotizador + Base de Datos</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    La app en el celular del taller para cotizar en 20 seg. Base de precios editable por vos en tu propia planilla sin tocar código.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Cálculo instantáneo en $ UYU y USD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Base de datos en la nube editable</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>WhatsApp formal listo en 1 toque</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60">
                <button
                  onClick={() => onSelectModule && onSelectModule('taller')}
                  className="w-full bg-[#4a208e] hover:bg-[#5a207e] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Probar Demo Módulo 1</span>
                </button>
              </div>
            </div>

            {/* MÓDULO 2 */}
            <div className={`rounded-3xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m2 ? 'border-[#e6007e] bg-pink-50/20 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-pink-100 text-[#e6007e] border border-pink-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    Captación Web
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">+ USD 150</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 15/mes</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">Módulo 2: Filtro Web Anti-Curiosos</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Link público para poner en Instagram o WhatsApp. Obliga al cliente a cargar Nombre, Celular y medidas antes de pedir cotización.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold" />
                    <span>Filtra curiosos que no compran</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold" />
                    <span>Pide teléfono real de Uruguay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold" />
                    <span>Alerta inmediata con pedido masticado</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-2">
                <button
                  onClick={() => toggleModule('m2')}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedModules.m2 
                      ? 'bg-pink-100 border-pink-300 text-[#e6007e]' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {selectedModules.m2 ? '✓ Módulo 2 Seleccionado' : '+ Sumar Módulo 2'}
                </button>
                <button
                  onClick={() => onSelectModule && onSelectModule('filtro_cliente')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Probar Demo Módulo 2</span>
                </button>
              </div>
            </div>

            {/* MÓDULO 3 */}
            <div className={`rounded-3xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m3 ? 'border-indigo-600 bg-indigo-50/20 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-indigo-100 text-indigo-800 border border-indigo-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    Gestión & CRM
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">+ USD 150</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 20/mes</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">Módulo 3: Historial & Mini CRM</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Cada cotización queda archivada sola con fecha, cliente y monto. Alertas a las 48h para recordar hacer seguimiento y no perder ventas.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold" />
                    <span>Historial automático en planilla</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold" />
                    <span>Alertas de seguimiento a las 48h</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold" />
                    <span>Métricas de facturación mensual</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-2">
                <button
                  onClick={() => toggleModule('m3')}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedModules.m3 
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-800' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {selectedModules.m3 ? '✓ Módulo 3 Seleccionado' : '+ Sumar Módulo 3'}
                </button>
                <button
                  onClick={() => onSelectModule && onSelectModule('crm_demo')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Probar Demo Módulo 3</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Calculadora Resumen del Pedido Modular */}
        <div className="bg-gradient-to-r from-[#2c1256] via-[#4a208e] to-[#5a207e] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase font-extrabold text-[#cb69fc] tracking-wider">Tu Configuración Modular</span>
            <h4 className="text-xl sm:text-2xl font-black">
              {selectedModules.m1 && selectedModules.m2 && selectedModules.m3 
                ? 'Sistema Completo (Módulos 1 + 2 + 3)'
                : selectedModules.m1 && selectedModules.m2
                ? 'Cotizador Taller + Filtro Web (Módulos 1 + 2)'
                : selectedModules.m1 && selectedModules.m3
                ? 'Cotizador Taller + CRM (Módulos 1 + 3)'
                : 'Cotizador Taller Base (Solo Módulo 1)'}
            </h4>
            <p className="text-xs text-purple-200">
              Incluye carga de catálogo, puesta en marcha, servidores y soporte técnico continuo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-center w-full sm:w-auto backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-purple-200 block">Inversión Inicial</span>
              <div className="text-2xl font-black text-white">USD {totalSetup}</div>
              <span className="text-[11px] text-purple-300 block">+ USD {totalMensual} / mes</span>
            </div>

            <a
              href={`https://wa.me/?text=Hola%20Grupo%20AGN,%20quiero%20consultar%20por%20la%20configuracion%20de%20modulos:%20Setup%20USD%20${totalSetup}%20+%20USD%20${totalMensual}/mes`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#e6007e] hover:bg-[#d40074] text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-900/30 transition-all shrink-0"
            >
              <span>Consultar por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4. Política de Personalizaciones Especiales */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#4a208e] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Zap className="w-4 h-4 text-[#e6007e]" /> ¿Precisás una función o circuito especial fuera del estándar?
            </span>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              La plataforma incluye la adaptación completa a tu rubro y listas de precios. Si tu negocio precisa funciones especiales (presupuestos en <strong>PDF con logo</strong>, <strong>cálculo de fletes por kilometraje</strong> o <strong>cobro de señas online</strong>), se cotiza aparte a un valor base de <strong>USD 30 la hora</strong> con precio cerrado y entrega en 48/72 horas.
            </p>
          </div>
          <a
            href="https://wa.me/?text=Hola%20Grupo%20AGN,%20tengo%20un%20pedido%20de%20desarrollo%20a%20medida"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
          >
            Consultar a Medida
          </a>
        </div>

      </div>
    </section>
  );
}
