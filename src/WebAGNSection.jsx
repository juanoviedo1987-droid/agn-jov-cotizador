import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  Zap, 
  Filter, 
  BarChart3,
  Palette
} from 'lucide-react';

export default function WebAGNSection({ onSelectModule }) {
  // Selector dinámico de soluciones
  const [selectedModules, setSelectedModules] = useState({
    m1: true,   // Cotizaciones
    m2: true,   // Filtro Web
    m3: false   // Mini CRM
  });

  const precios = {
    m1: { 
      setup: 250, 
      mensual: 30, 
      nombre: 'App de Cotizaciones Rápidas',
      tag: 'Ventas en Calle / Taller'
    },
    m2: { 
      setup: 150, 
      mensual: 15, 
      nombre: 'Filtro Web Anti-Curiosos',
      tag: 'Instagram & WhatsApp'
    },
    m3: { 
      setup: 150, 
      mensual: 20, 
      nombre: 'Historial & Mini CRM (48h)',
      tag: 'Cierre y Seguimiento'
    }
  };

  const toggleModule = (mod) => {
    setSelectedModules(prev => ({ ...prev, [mod]: !prev[mod] }));
  };

  const totalSetup = (selectedModules.m1 ? precios.m1.setup : 0) +
                     (selectedModules.m2 ? precios.m2.setup : 0) +
                     (selectedModules.m3 ? precios.m3.setup : 0);

  const totalMensual = (selectedModules.m1 ? precios.m1.mensual : 0) +
                       (selectedModules.m2 ? precios.m2.mensual : 0) +
                       (selectedModules.m3 ? precios.m3.mensual : 0);

  return (
    <section className="bg-white text-slate-800 py-6 sm:py-12 px-3 sm:px-4 antialiased selection:bg-[#4a208e] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">

        {/* 1. Hero Principal Súper Directo */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#4a208e] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#e6007e]" />
            Grupo AGN • Soluciones Tecnológicas para PyMEs
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            No vendemos un software enlatado. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#4a208e] via-[#5a207e] to-[#e6007e] bg-clip-text text-transparent">
              Creamos la App a Medida de tu Negocio.
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Analizamos cómo cotizás y operás hoy (planillas de Excel, cuadernos o audios) y desarrollamos una aplicación ágil para el celular de tu equipo, con tu estética, tus productos y tu forma de trabajar.
          </p>

          {/* Banner de Aclaración de Diseño Único */}
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border border-purple-200 rounded-2xl p-4 max-w-2xl mx-auto flex items-start sm:items-center gap-3 text-left">
            <div className="p-2 bg-[#4a208e] text-white rounded-xl shrink-0">
              <Palette className="w-4 h-4 text-[#cb69fc]" />
            </div>
            <div className="text-xs text-purple-950 leading-relaxed">
              <strong>El diseño y circuito final cambian para cada pyme:</strong> Los ejemplos de las solapas superiores son demostraciones interactivas para que pruebes la velocidad en el celular. Tu app se programa desde cero según tu operativa.
            </div>
          </div>
        </div>

        {/* 2. Tres Soluciones Base con Precios Claros */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">Precios Base de Partida</h2>
              <p className="text-xs text-slate-500">Valores de referencia transparentes para arrancar con servidores y soporte incluidos:</p>
            </div>
            <span className="text-xs font-bold bg-purple-100 text-[#4a208e] px-3 py-1 rounded-full self-start sm:self-auto">
              Precios en USD
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* TARJETA 1 */}
            <div className={`rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m1 ? 'border-[#4a208e] bg-purple-50/30 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    {precios.m1.tag}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">USD 250</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 30/mes</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">App de Cotizaciones Rápidas</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Cotizá en 20 segundos delante del cliente o en obra. Mensaje formal directo a WhatsApp en 1 toque.
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Carga inicial de tu catálogo y precios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Cálculo automático de medidas o unidades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Base autogestionable en la nube</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-2">
                <button
                  type="button"
                  onClick={() => toggleModule('m1')}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedModules.m1 
                      ? 'bg-purple-100 border-purple-300 text-[#4a208e]' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {selectedModules.m1 ? '✓ Seleccionada' : '+ Sumar a la App'}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModule && onSelectModule('cotizador')}
                  className="w-full bg-[#4a208e] hover:bg-[#5a207e] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Probar Ejemplo 1 en Vivo</span>
                </button>
              </div>
            </div>

            {/* TARJETA 2 */}
            <div className={`rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m2 ? 'border-[#e6007e] bg-pink-50/20 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-pink-100 text-[#e6007e] border border-pink-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    {precios.m2.tag}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">+ USD 150</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 15/mes</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">Filtro Web Anti-Curiosos</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Link público para tu Instagram o WhatsApp. Filtra a los que solo curiosean y captura pedidos ordenados.
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold" />
                    <span>Formulario con las preguntas de tu rubro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold" />
                    <span>Captura Nombre, WhatsApp y medidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold" />
                    <span>Te llega el pedido listo a tu celular</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-2">
                <button
                  type="button"
                  onClick={() => toggleModule('m2')}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedModules.m2 
                      ? 'bg-pink-100 border-pink-300 text-[#e6007e]' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {selectedModules.m2 ? '✓ Seleccionada' : '+ Sumar a la App'}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModule && onSelectModule('filtro')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Probar Ejemplo 2 en Vivo</span>
                </button>
              </div>
            </div>

            {/* TARJETA 3 */}
            <div className={`rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m3 ? 'border-indigo-600 bg-indigo-50/20 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-indigo-100 text-indigo-800 border border-indigo-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    {precios.m3.tag}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">+ USD 150</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 20/mes</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">Historial & Mini CRM (48h)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Cada presupuesto queda guardado. Te alerta a las 48h para reenviar recordatorio por WhatsApp y cerrar la seña.
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold" />
                    <span>Registro automático de cada cotización</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold" />
                    <span>Alertas a las 48h para no perder ventas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold" />
                    <span>Métricas de facturación mensual</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-2">
                <button
                  type="button"
                  onClick={() => toggleModule('m3')}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedModules.m3 
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-800' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {selectedModules.m3 ? '✓ Seleccionada' : '+ Sumar a la App'}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModule && onSelectModule('crm')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Probar Ejemplo 3 en Vivo</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Resumen y Botón de WhatsApp */}
        <div className="bg-gradient-to-r from-[#2c1256] via-[#4a208e] to-[#5a207e] rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-extrabold text-[#cb69fc] tracking-wider">Configuración Sugerida</span>
            <h4 className="text-xl sm:text-2xl font-black">
              {totalSetup === 0 
                ? 'Elegí tus soluciones arriba' 
                : selectedModules.m1 && selectedModules.m2 && selectedModules.m3
                ? 'Sistema Completo para tu Empresa'
                : selectedModules.m1 && selectedModules.m2
                ? 'Cotizaciones Móviles + Filtro Web'
                : selectedModules.m1 && selectedModules.m3
                ? 'Cotizaciones Móviles + Mini CRM'
                : selectedModules.m1
                ? 'App de Cotizaciones Base'
                : 'Solución Seleccionada'}
            </h4>
            <p className="text-xs text-purple-200">
              Incluye carga de catálogo, diseño con tu marca, servidores en la nube y soporte continuo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5 text-center w-full sm:w-auto backdrop-blur-sm">
              <span className="text-[9px] uppercase font-bold text-purple-200 block">Puesta en Marcha</span>
              <div className="text-2xl font-black text-white">USD {totalSetup}</div>
              <span className="text-[10px] text-purple-300 block">+ USD {totalMensual} / mes</span>
            </div>

            <a
              href={`https://wa.me/?text=Hola%20Grupo%20AGN,%20quiero%20consultar%20por%20una%20App%20a%20medida%20para%20mi%20negocio:%20Setup%20USD%20${totalSetup}%20+%20USD%20${totalMensual}/mes`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#e6007e] hover:bg-[#d40074] text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-900/30 transition-all shrink-0 min-h-[48px]"
            >
              <span>Consultar por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4. Adicionales a Medida (Simple y Claro) */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#e6007e]" />
              <h4 className="font-extrabold text-sm text-slate-900">
                ¿Precisás funciones especiales fuera del estándar?
              </h4>
            </div>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Si tu empresa precisa funciones extra (como <strong>generación de presupuestos en PDF con tu logo</strong>, <strong>cálculo de fletes por kilometraje</strong>, <strong>cobro de señas online</strong> o <strong>conexión con tu sistema actual</strong>), se cotiza como adicional cerrado a una tarifa base de <strong>USD 30 la hora</strong> con entrega en 48/72 horas.
            </p>
          </div>
          
          <a
            href="https://wa.me/?text=Hola%20Grupo%20AGN,%20tengo%20un%20pedido%20de%20desarrollo%20a%20medida"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all text-center min-h-[44px] flex items-center justify-center"
          >
            Consultar a Medida
          </a>
        </div>

      </div>
    </section>
  );
}
