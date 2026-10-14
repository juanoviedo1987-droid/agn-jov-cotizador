import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Database, 
  Filter, 
  BarChart3, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export default function WebAGNSection() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <section className="bg-white text-slate-800 py-16 px-4 antialiased selection:bg-[#4a208e] selection:text-white">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* 1. Header / Hero de la Sección en la Web de Grupo AGN */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#4a208e] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#e6007e]" />
            Nuevo Servicio • Grupo AGN
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Cotizadores Inteligentes & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#4a208e] via-[#5a207e] to-[#e6007e] bg-clip-text text-transparent">
              Sistemas de Captación para Pymes
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Presupuestá en 20 segundos desde el celular con tus costos actualizados, eliminá las consultas de curiosos en redes sociales y enviá propuestas formales por WhatsApp con 1 clic.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://juanoviedo1987-droid.github.io/agn-jov-cotizador/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4a208e] to-[#5a207e] hover:opacity-95 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-purple-900/20 text-sm transition-all"
            >
              <span>Ver Demo en Vivo (Aberturas)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#precios"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-2xl text-sm transition-all"
            >
              <span>Ver Planes & Precios</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 2. Comparativa: El Antes y el Después */}
        <div className="bg-gradient-to-br from-[#2c1256] to-[#1a0836] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-purple-900/40">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#cb69fc] uppercase tracking-wider">El Impacto en tu Negocio</span>
            <h3 className="text-2xl font-black mt-1">¿Cuánto tiempo y dinero pierde tu empresa hoy?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">❌ El Método Tradicional</span>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>15 a 20 minutos por cada consulta buscando costos en planillas de Excel y calculando a mano.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Pérdida de ventas frente a competidores que responden más rápido.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>30 mensajes al día en Instagram de curiosos que preguntan "precio" y no vuelven a contestar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Presupuestos enviados que quedan en la nada porque nadie tiene tiempo de hacer seguimiento.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 border border-[#cb69fc]/30 rounded-2xl p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#e6007e] to-[#cb69fc] text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-bl-xl">
                Solución Grupo AGN
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">✅ Con tu Cotizador AGN</span>
              <ul className="space-y-3 text-sm text-white">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Cotización en 20 segundos</strong> desde el celular con tus costos reales y margen de ganancia.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Propuesta formal por WhatsApp en 1 toque:</strong> mensaje profesional y detallado listo para enviar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Filtro calificador de clientes:</strong> frena curiosos y entrega solicitudes con nombre, medidas y teléfono real.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Base de datos editable:</strong> cambiás los precios en tu planilla y la app se actualiza sola al instante.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Tabla de Precios y Módulos */}
        <div id="precios" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#4a208e] uppercase tracking-wider">Estructura Modular & Escalable</span>
            <h3 className="text-3xl font-black text-slate-900">Elegí el plan para tu negocio</h3>
            <p className="text-sm text-slate-500">
              Iniciá con lo que necesitás hoy y sumá funciones a medida que tu empresa crece. Precios transparentes en USD.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* PLAN 1: COMBO OPERATIVO */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-purple-300 transition-all">
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uso Interno</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">Combo Operativo</h4>
                  <p className="text-xs text-slate-500 mt-1">La herramienta rápida de bolsillo para el dueño o taller.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-3xl font-black text-slate-900">USD 250</div>
                  <div className="text-xs text-slate-500 font-medium">Setup inicial (único pago)</div>
                  <div className="text-sm font-bold text-[#4a208e] mt-2">+ USD 30 / mes</div>
                  <div className="text-[11px] text-slate-400">Hosting en la nube y soporte</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>App Web privada</strong> (Móvil / PC con tu marca)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Cálculo en 20 segundos</strong> de costos y precio final</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Base de datos de productos</strong> editable por vos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Botón WhatsApp directo</strong> con presupuesto listo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Carga inicial de tu catálogo y fórmulas</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <a
                  href="https://wa.me/?text=Hola%20Grupo%20AGN,%20quiero%20consultar%20por%20el%20Combo%20Operativo"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Consultar Combo Operativo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* PLAN 2: PRO VENTAS (EL DESTACADO) */}
            <div className="bg-gradient-to-b from-white to-[#fcfaff] rounded-3xl p-6 sm:p-8 border-2 border-[#4a208e] shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#4a208e] to-[#e6007e] text-white text-[10px] uppercase font-extrabold px-4 py-1 rounded-full shadow-md">
                ⭐ Más Elegido por Pymes
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#4a208e] uppercase tracking-wider">Taller + Captación Web</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">Combo Pro Ventas</h4>
                  <p className="text-xs text-slate-500 mt-1">Cotizá rápido y filtrá curiosos de redes en automático.</p>
                </div>

                <div className="bg-[#f8f4fc] p-4 rounded-2xl border border-purple-200">
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-black text-slate-900">USD 380</div>
                    <span className="text-xs line-through text-slate-400">USD 400</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Setup inicial bonificado (único pago)</div>
                  <div className="text-sm font-bold text-[#4a208e] mt-2">+ USD 45 / mes</div>
                  <div className="text-[11px] text-slate-400">Hosting público, servidor y soporte</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4a208e] shrink-0 font-bold" />
                    <span><strong>Todo lo del Combo Operativo</strong> (Módulo 1)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4a208e] shrink-0 font-bold" />
                    <span><strong>Página Web Pública Calificadora</strong> con tu marca</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4a208e] shrink-0 font-bold" />
                    <span><strong>Filtro Anti-Curiosos:</strong> pide Nombre, Teléfono y medidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4a208e] shrink-0 font-bold" />
                    <span><strong>Alertas a tu WhatsApp:</strong> pedidos listos para cotizar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4a208e] shrink-0 font-bold" />
                    <span>Link para Instagram, Google Ads y WhatsApp</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-purple-100 mt-6">
                <a
                  href="https://wa.me/?text=Hola%20Grupo%20AGN,%20quiero%20el%20Combo%20Pro%20Ventas"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-gradient-to-r from-[#4a208e] to-[#5a207e] hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 transition-all"
                >
                  <span>Elegir Combo Pro Ventas</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* PLAN 3: FULL INTEGRADO */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-purple-300 transition-all">
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gestión & CRM</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">Combo Full Gestión</h4>
                  <p className="text-xs text-slate-500 mt-1">Control de ventas, historial de clientes y alertas a las 48h.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-black text-slate-900">USD 500</div>
                    <span className="text-xs line-through text-slate-400">USD 550</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Setup inicial bonificado (único pago)</div>
                  <div className="text-sm font-bold text-[#4a208e] mt-2">+ USD 65 / mes</div>
                  <div className="text-[11px] text-slate-400">Automatizaciones, base y soporte prioritario</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Todo lo del Combo Pro Ventas</strong> (Módulos 1 y 2)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Historial centralizado:</strong> cada cotización se archiva sola</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Mini CRM en Google Sheets:</strong> estados de venta</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Alertas a las 48h:</strong> recordatorios para cerrar presupuestos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Métricas mensuales de ventas y facturación</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <a
                  href="https://wa.me/?text=Hola%20Grupo%20AGN,%20quiero%20el%20Combo%20Full%20Gestion"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Consultar Combo Full</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Cláusula de Personalizaciones & Add-ons */}
        <div className="bg-purple-50/70 border border-purple-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#4a208e] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#e6007e]" /> ¿Necesitás una función especial para tu empresa?
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
              Nuestros módulos estándar resuelven el 90% de las ventas de cualquier negocio. Si tu circuito requiere funciones específicas (generador de presupuestos en <strong>PDF descargable con membrete</strong>, cálculo de <strong>fletes por kilometraje</strong> o <strong>cobro de señas con Mercado Pago</strong>), te lo cotizamos e integramos a medida en 48/72 horas.
            </p>
          </div>
          <a
            href="https://wa.me/?text=Hola%20Grupo%20AGN,%20tengo%20un%20requerimiento%20a%20medida"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 bg-[#4a208e] hover:bg-[#5a207e] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all"
          >
            Consultar a Medida
          </a>
        </div>

        {/* 5. Rubros aplicables */}
        <div className="text-center space-y-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Adaptable a Cualquier Industria</span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-slate-600">
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full">🪟 Carpinterías de Aluminio & PVC</span>
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full">🪚 Fábricas de Muebles & Placards</span>
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full">🔩 Herrerías & Estructuras</span>
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full">🖨️ Imprentas & Cartelería</span>
            <span className="bg-slate-100 px-3.5 py-1.5 rounded-full">❄️ Climatización & Instalaciones</span>
          </div>
        </div>

      </div>
    </section>
  );
}
