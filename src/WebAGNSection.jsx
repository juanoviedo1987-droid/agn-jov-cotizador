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
  // Selector dinámico interactivo de soluciones
  const [selectedModules, setSelectedModules] = useState({
    m1: true,   // App Cotizaciones (base habitual)
    m2: true,   // Filtro Web
    m3: false   // Mini CRM
  });

  // Precios base estandarizados Grupo AGN
  const precios = {
    m1: { 
      setup: 250, 
      mensual: 30, 
      nombre: 'App de Cotizaciones Rápidas',
      descripcion: 'Para calcular y despachar presupuestos formales por WhatsApp en 20 segundos.'
    },
    m2: { 
      setup: 150, 
      mensual: 15, 
      nombre: 'Filtro Web Anti-Curiosos para Redes',
      descripcion: 'Formulario público para Instagram/WhatsApp que captura pedidos con datos reales.'
    },
    m3: { 
      setup: 150, 
      mensual: 20, 
      nombre: 'Historial de Presupuestos & Mini CRM',
      descripcion: 'Registro en la nube con alertas automáticas a las 48h para cerrar ventas.'
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
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14">

        {/* 1. Hero Principal: Qué hacemos y para quién */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#4a208e] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#e6007e]" />
            Grupo AGN • Desarrollo de Aplicaciones Web para PyMEs
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Aplicaciones Web a Medida <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#4a208e] via-[#5a207e] to-[#e6007e] bg-clip-text text-transparent">
              para la Operativa y Ventas de tu PyME
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Reemplazamos planillas de Excel desordenadas, cuadernos y demoras por aplicaciones ágiles para el celular de tu equipo. Precios base transparentes, puesta en marcha en 48/72 horas y desarrollo de funciones a medida.
          </p>

          <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl max-w-xl mx-auto text-xs text-purple-900 font-medium">
            💡 <strong>Cada proyecto se realiza 100% a medida:</strong> Podés arrancar con una solución base y sumarle circuitos específicos según las necesidades de tu rubro.
          </div>
        </div>

        {/* 2. Las 3 Soluciones con Precios Base y Detalle de Alcance */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">Soluciones Base & Precios Transparentes</h2>
              <p className="text-xs text-slate-500">Elegí lo que tu negocio necesita hoy; podés probar los ejemplos interactivos en las solapas superiores:</p>
            </div>
            <span className="text-xs font-bold bg-purple-100 text-[#4a208e] px-3 py-1 rounded-full self-start sm:self-auto">
              Valores de Referencia en USD
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

            {/* TARJETA SOLUCIÓN 1 */}
            <div className={`rounded-3xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m1 ? 'border-[#4a208e] bg-purple-50/30 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-[#4a208e] to-[#5a207e] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    Solución de Ventas
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">USD 250</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 30/mes</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">App de Cotizaciones Rápidas</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    La app en el celular para que vos o tus vendedores coticen en 20 segundos delante del cliente o en obra.
                  </p>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">Qué incluye el precio base:</span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold mt-0.5" />
                      <span>Carga inicial de tu catálogo de productos y precios.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold mt-0.5" />
                      <span>Cálculo automático de medidas, m² o unidades en vivo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold mt-0.5" />
                      <span>Despacho formal por WhatsApp en 1 toque.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold mt-0.5" />
                      <span>Planilla en la nube para actualizar precios vos mismo.</span>
                    </li>
                  </ul>
                </div>
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
                  {selectedModules.m1 ? '✓ Incluida en Presupuesto' : '+ Sumar a Presupuesto'}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModule && onSelectModule('cotizador')}
                  className="w-full bg-[#4a208e] hover:bg-[#5a207e] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Ver Ejemplo 1 en Vivo</span>
                </button>
              </div>
            </div>

            {/* TARJETA SOLUCIÓN 2 */}
            <div className={`rounded-3xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m2 ? 'border-[#e6007e] bg-pink-50/20 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-pink-100 text-[#e6007e] border border-pink-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    Captación de Clientes
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">+ USD 150</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 15/mes</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">Filtro Web Anti-Curiosos</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Link público para poner en tu Instagram o respuesta automática de WhatsApp. Filtra a los que solo preguntan y no compran.
                  </p>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">Qué incluye el precio base:</span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold mt-0.5" />
                      <span>Formulario rápido adaptado a tu rubro.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold mt-0.5" />
                      <span>Obliga a cargar Nombre, WhatsApp y medidas/detalles.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold mt-0.5" />
                      <span>Te llega el lead limpio y masticado a tu celular.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 font-bold mt-0.5" />
                      <span>Diseño corporativo con el logo de tu empresa.</span>
                    </li>
                  </ul>
                </div>
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
                  {selectedModules.m2 ? '✓ Incluida en Presupuesto' : '+ Sumar a Presupuesto'}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModule && onSelectModule('filtro')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Ver Ejemplo 2 en Vivo</span>
                </button>
              </div>
            </div>

            {/* TARJETA SOLUCIÓN 3 */}
            <div className={`rounded-3xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
              selectedModules.m3 ? 'border-indigo-600 bg-indigo-50/20 shadow-md' : 'border-slate-200 bg-white'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-indigo-100 text-indigo-800 border border-indigo-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    Gestión & Cierre
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">+ USD 150</span>
                    <span className="text-[11px] text-slate-500 block">+ USD 20/mes</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">Historial & Mini CRM (48h)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Cada presupuesto queda registrado solo. El sistema te avisa a las 48h con alerta para recordarte contactar al cliente y cerrar la venta.
                  </p>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">Qué incluye el precio base:</span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold mt-0.5" />
                      <span>Registro automático en la nube de cada cotización.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold mt-0.5" />
                      <span>Alertas amarillas a las 48h para volver a escribir.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold mt-0.5" />
                      <span>Botón directo para enviar recordatorio por WhatsApp.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 font-bold mt-0.5" />
                      <span>Métricas de total cotizado vs. ventas confirmadas.</span>
                    </li>
                  </ul>
                </div>
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
                  {selectedModules.m3 ? '✓ Incluida en Presupuesto' : '+ Sumar a Presupuesto'}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModule && onSelectModule('crm')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Ver Ejemplo 3 en Vivo</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Calculadora / Resumen de Soluciones Seleccionadas */}
        <div className="bg-gradient-to-r from-[#2c1256] via-[#4a208e] to-[#5a207e] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase font-extrabold text-[#cb69fc] tracking-wider">Tu Configuración Base Sugerida</span>
            <h4 className="text-xl sm:text-2xl font-black">
              {totalSetup === 0 
                ? 'Seleccioná al menos 1 solución arriba' 
                : selectedModules.m1 && selectedModules.m2 && selectedModules.m3
                ? 'Pack Completo: Cotizador + Filtro + Mini CRM'
                : selectedModules.m1 && selectedModules.m2
                ? 'Cotizador Móvil + Filtro Web para Redes'
                : selectedModules.m1 && selectedModules.m3
                ? 'Cotizador Móvil + Historial CRM'
                : selectedModules.m1
                ? 'App de Cotizaciones Rápidas Base'
                : 'Solución Seleccionada'}
            </h4>
            <p className="text-xs text-purple-200">
              Incluye carga de catálogo, adaptación a tu rubro, servidores en la nube y soporte continuo de Grupo AGN.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-center w-full sm:w-auto backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-purple-200 block">Puesta en Marcha</span>
              <div className="text-2xl font-black text-white">USD {totalSetup}</div>
              <span className="text-[11px] text-purple-300 block">+ USD {totalMensual} / mes</span>
            </div>

            <a
              href={`https://wa.me/?text=Hola%20Grupo%20AGN,%20quiero%20consultar%20por%20una%20App%20a%20medida%20para%20mi%20pyme:%20Setup%20USD%20${totalSetup}%20+%20USD%20${totalMensual}/mes`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#e6007e] hover:bg-[#d40074] text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-900/30 transition-all shrink-0 min-h-[48px]"
            >
              <span>Consultar por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4. Política Clara de Adicionales a Medida */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 text-[#4a208e] rounded-xl font-bold">
                <Zap className="w-4 h-4 text-[#e6007e]" />
              </div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                ¿Precisás funciones especiales o circuitos propios de tu empresa?
              </h4>
            </div>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              La base incluye todo lo necesario para empezar a operar. Si querés sumarle funciones avanzadas como <strong>generación de presupuestos en PDF con logo</strong>, <strong>cobro de señas con pasarelas de pago</strong>, <strong>cálculo de fletes por kilometraje</strong> o <strong>conexión con tu sistema de facturación</strong>, se cotiza como adicional cerrado a una tarifa base de <strong>USD 30 la hora</strong> con entrega en 48/72 horas.
            </p>
          </div>
          
          <a
            href="https://wa.me/?text=Hola%20Grupo%20AGN,%20tengo%20un%20pedido%20de%20desarrollo%20de%20app%20a%20medida%20para%20mi%20empresa"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all text-center min-h-[44px] flex items-center justify-center"
          >
            Pedir Cotización a Medida
          </a>
        </div>

      </div>
    </section>
  );
}
