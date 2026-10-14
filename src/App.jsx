import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Send, 
  Check, 
  Maximize2, 
  ShieldCheck, 
  ArrowRight, 
  BarChart3,
  Filter,
  FileText,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { UNIVERSAL_RUBROS, calcularCotizacionUniversal } from './pricingConfig';

export default function App() {
  // Selector multimoneda global
  const [moneda, setMoneda] = useState('USD'); // 'USD' | 'UYU' | 'ARS'

  // Selector de Rubro de Ejemplo en la Demo del Cotizador
  const [rubroId, setRubroId] = useState('aberturas');
  const rubroActual = UNIVERSAL_RUBROS.find(r => r.id === rubroId) || UNIVERSAL_RUBROS[0];

  // Estado del Cotizador Móvil / Web
  const [cotizadorForm, setCotizadorForm] = useState({
    productoId: rubroActual.productos[0].id,
    ancho: rubroActual.productos[0].anchoDefault,
    alto: rubroActual.productos[0].altoDefault,
    cantidad: 1,
    calidadId: 'media',
    incluyeServicio: true,
    clienteNombre: 'Carlos Méndez',
    clienteTelefono: '099123456'
  });

  // Estado del acordeón de FAQ
  const [faqAbierta, setFaqAbierta] = useState(null);

  const toggleFaq = (idx) => {
    setFaqAbierta(faqAbierta === idx ? null : idx);
  };

  const handleCambioRubro = (nuevoRubroId) => {
    setRubroId(nuevoRubroId);
    const nuevoRubro = UNIVERSAL_RUBROS.find(r => r.id === nuevoRubroId) || UNIVERSAL_RUBROS[0];
    const primerProd = nuevoRubro.productos[0];
    setCotizadorForm(prev => ({
      ...prev,
      productoId: primerProd.id,
      ancho: primerProd.anchoDefault,
      alto: primerProd.altoDefault,
      cantidad: 1,
      calidadId: nuevoRubro.calidades[1]?.id || nuevoRubro.calidades[0].id
    }));
  };

  const handleCambioProducto = (prodId) => {
    const prod = rubroActual.productos.find(p => p.id === prodId) || rubroActual.productos[0];
    setCotizadorForm(prev => ({
      ...prev,
      productoId: prodId,
      ancho: prod.anchoDefault,
      alto: prod.altoDefault
    }));
  };

  const cotizacion = calcularCotizacionUniversal({
    rubroId,
    productoId: cotizadorForm.productoId,
    ancho: cotizadorForm.ancho,
    alto: cotizadorForm.alto,
    cantidad: cotizadorForm.cantidad,
    calidadId: cotizadorForm.calidadId,
    incluyeServicio: cotizadorForm.incluyeServicio
  });

  const handleEnviarWhatsApp = () => {
    if (!cotizacion) return;

    let telLimpio = cotizadorForm.clienteTelefono.replace(/\D/g, '');
    if (telLimpio.startsWith('0')) {
      telLimpio = '598' + telLimpio.substring(1);
    } else if (!telLimpio.startsWith('598')) {
      telLimpio = '598' + telLimpio;
    }

    const textoPrecio = moneda === 'USD' 
      ? `*USD ${cotizacion.precioFinalUSD}* (o aprox. $ ${cotizacion.precioFinalUYU.toLocaleString('es-UY')} UYU)`
      : `*$ ${cotizacion.precioFinalUYU.toLocaleString('es-UY')} UYU* (o aprox. USD ${cotizacion.precioFinalUSD})`;

    const mensaje = `Hola ${cotizadorForm.clienteNombre || 'estimado/a'}! 👋\n` +
      `Te paso el presupuesto formal para tu consulta de *${rubroActual.nombre}*:\n\n` +
      `📦 *Trabajo / Concepto:* ${cotizacion.producto.nombre}\n` +
      `📏 *Especificación / Medidas:* ${cotizacion.medidasTexto}\n` +
      `⭐ *Nivel de Terminación:* ${cotizacion.calidad.nombre}\n` +
      (cotizadorForm.incluyeServicio ? `✅ *Incluye:* ${rubroActual.servicioLabel}\n\n` : `\n`) +
      `💰 *Total Presupuestado:* ${textoPrecio}\n\n` +
      `⏱️ *Plazo estimado:* 7 a 15 días hábiles.\n` +
      `📋 *Validez:* 15 días corridos.\n\n` +
      `¿Querés que coordinemos una visita técnica para rectificar medidas o tenés alguna consulta?`;

    const url = `https://wa.me/${telLimpio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const scrollToPrecios = () => {
    const el = document.getElementById('seccion-precios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      q: '¿Tengo que descargar o instalar algo en el celular o la computadora?',
      a: 'No. Es una Aplicación Web moderna que funciona directo en el navegador de cualquier teléfono (Android o iPhone), tablet o PC. Podés guardarla como un acceso directo en tu pantalla de inicio con 1 toque sin ocupar espacio ni depender de tiendas de apps.'
    },
    {
      q: '¿Cómo actualizo los precios si aumentan los costos de mis proveedores?',
      a: 'Te entregamos una planilla en la nube autogestionable y muy simple. Modificás un precio o sumás un producto nuevo y se actualiza al instante en los celulares y computadoras de todo tu equipo, sin tocar código.'
    },
    {
      q: '¿Qué pasa si mi negocio cotiza de forma distinta o con fórmulas complejas?',
      a: 'Ese es nuestro mayor diferencial. No te forzamos a una fórmula fija ni a un enlatado: adaptamos el motor de cálculo a la lógica exacta de tu rubro (metros cuadrados, metros lineales, peso, horas de mano de obra o combos).'
    },
    {
      q: '¿Mis empleados pueden ver los costos reales o solo el precio final al cliente?',
      a: 'Se puede configurar para que el personal operativo o los vendedores en la calle solo vean el precio final de venta y el botón de WhatsApp, protegiendo la confidencialidad de tus márgenes y costos internos.'
    },
    {
      q: '¿Qué cubre el abono mensual de mantenimiento?',
      a: 'Cubre el alojamiento en servidores seguros en la nube de alta velocidad, copias de seguridad continuas y el soporte técnico y mantenimiento evolutivo de Grupo AGN para que tu aplicación esté siempre activa, rápida y disponible.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-[#4a208e] selection:text-white relative">
      
      {/* 1. Header Corporativo Grupo AGN */}
      <header className="bg-gradient-to-r from-[#2c1256] via-[#4a208e] to-[#5a207e] text-white shadow-lg sticky top-0 z-40 border-b border-purple-800/40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white">GRUPO AGN</span>
              <span className="bg-gradient-to-r from-[#e6007e] to-[#cb69fc] text-white text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                Web & Mobile
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-purple-200 font-medium">Aplicaciones Web a Medida para PyMEs</span>
          </div>

          <button
            type="button"
            onClick={scrollToPrecios}
            className="bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
          >
            Ver Precios
          </button>
        </div>
      </header>

      {/* Contenido Principal en Flujo Vertical Limpio */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 space-y-8 sm:space-y-12 pb-20">

        {/* ==================================================== */}
        {/* PARTE 1: LA APLICACIÓN DE EJEMPLO EN VIVO (ARRIBA)   */}
        {/* ==================================================== */}
        <section className="space-y-4">
          
          {/* Cartelito Superior */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-[#4a208e] text-white rounded-lg font-bold shrink-0">📱</span>
              <span className="text-purple-950 font-medium leading-relaxed">
                <strong>Probá este ejemplo interactivo:</strong> Así de rápido y simple cotiza tu equipo en el celular, tablet o computadora.
              </span>
            </div>
            <div className="flex items-center gap-2 text-purple-700 font-bold text-[11px] shrink-0">
              <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" /> Celular</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5" /> Web / PC</span>
            </div>
          </div>

          {/* Banner con Selector de Rubro de Muestra */}
          <div className="bg-gradient-to-r from-[#4a208e] via-[#5a207e] to-[#2c1256] rounded-3xl p-4 sm:p-5 text-white shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#cb69fc] bg-purple-950/50 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-purple-400/20">
                  Demostración Interactiva
                </span>
                <h2 className="text-lg sm:text-xl font-bold">Cotizá en 20 segundos delante de tu cliente</h2>
                <p className="text-xs text-purple-200 mt-0.5">
                  Cambiá de rubro para ver cómo se adapta a distintos tipos de negocio:
                </p>
              </div>

              {/* Selector de Moneda */}
              <div className="bg-purple-950/80 p-1 rounded-xl border border-purple-400/20 flex items-center text-xs font-bold shrink-0 self-end sm:self-auto">
                {['USD', 'UYU', 'ARS'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMoneda(m)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      moneda === m ? 'bg-[#e6007e] text-white shadow-xs' : 'text-purple-200 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Pills de Selección de Rubro */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              {UNIVERSAL_RUBROS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleCambioRubro(r.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border min-h-[44px] ${
                    rubroId === r.id
                      ? 'bg-white text-[#4a208e] border-white shadow-md scale-[1.02]'
                      : 'bg-purple-900/40 text-purple-200 border-purple-400/20 hover:bg-purple-900/70'
                  }`}
                >
                  <span>{r.icono}</span>
                  <span>{r.nombre}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Formulario y Tarjeta de Resultado */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Formulario en 3 pasos */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-purple-100 space-y-4">
                
                {/* 1. Producto */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    1. Trabajo o Producto
                  </label>
                  <select
                    value={cotizadorForm.productoId}
                    onChange={(e) => handleCambioProducto(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                  >
                    {rubroActual.productos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Medidas o Cantidad */}
                {rubroActual.unidadTipo === 'dimensiones' ? (
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Maximize2 className="w-4 h-4 text-[#4a208e]" /> 2. Dimensiones (cm)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs text-slate-500 block mb-1 font-medium">Ancho (cm)</span>
                        <input
                          type="number"
                          min="30"
                          max="600"
                          step="5"
                          value={cotizadorForm.ancho}
                          onChange={(e) => setCotizadorForm({ ...cotizadorForm, ancho: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-base font-bold text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block mb-1 font-medium">Alto (cm)</span>
                        <input
                          type="number"
                          min="30"
                          max="600"
                          step="5"
                          value={cotizadorForm.alto}
                          onChange={(e) => setCotizadorForm({ ...cotizadorForm, alto: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-base font-bold text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      2. Cantidad de Unidades / Puntos
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 5].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setCotizadorForm({ ...cotizadorForm, cantidad: cnt })}
                          className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                            cotizadorForm.cantidad === cnt
                              ? 'bg-[#4a208e] text-white border-[#4a208e] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cnt} {cnt === 1 ? 'unidad' : 'unidades'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Nivel de Terminación */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#4a208e]" /> 3. Nivel de Terminación / Gama
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {rubroActual.calidades.map((cal) => (
                      <button
                        key={cal.id}
                        type="button"
                        onClick={() => setCotizadorForm({ ...cotizadorForm, calidadId: cal.id })}
                        className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between min-h-[56px] ${
                          cotizadorForm.calidadId === cal.id
                            ? 'bg-purple-50/70 border-[#4a208e] ring-2 ring-purple-200 text-slate-900'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#e6007e]">
                          {cal.badge}
                        </span>
                        <span className="text-xs font-bold leading-tight mt-0.5">
                          {cal.nombre}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Servicio Adicional */}
                <label className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-2xl border border-purple-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cotizadorForm.incluyeServicio}
                    onChange={(e) => setCotizadorForm({ ...cotizadorForm, incluyeServicio: e.target.checked })}
                    className="w-5 h-5 text-[#4a208e] rounded-lg accent-[#4a208e]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">{rubroActual.servicioLabel}</span>
                    <span className="text-slate-500">Suma mano de obra e instalación</span>
                  </div>
                </label>

                {/* Datos del Cliente */}
                <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1 font-medium">Nombre Cliente</span>
                    <input
                      type="text"
                      value={cotizadorForm.clienteNombre}
                      onChange={(e) => setCotizadorForm({ ...cotizadorForm, clienteNombre: e.target.value })}
                      placeholder="Ej: Carlos Méndez"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1 font-medium">WhatsApp</span>
                    <input
                      type="tel"
                      value={cotizadorForm.clienteTelefono}
                      onChange={(e) => setCotizadorForm({ ...cotizadorForm, clienteTelefono: e.target.value })}
                      placeholder="099 123 456"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#4a208e]"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Columna Derecha: Tarjeta de Presupuesto */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100 space-y-4 sticky top-20">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-extrabold uppercase text-[#4a208e] tracking-wider">
                    Resumen del Presupuesto
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Calculado en Vivo
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Concepto:</span>
                    <span className="font-bold text-slate-800 text-right">{cotizacion?.producto.nombre}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Medidas / Cantidad:</span>
                    <span className="font-bold text-slate-800">{cotizacion?.medidasTexto}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Gama / Calidad:</span>
                    <span className="font-bold text-slate-800">{cotizacion?.calidad.badge}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Servicio en obra:</span>
                    <span className="font-bold text-slate-800">{cotizadorForm.incluyeServicio ? 'Incluido' : 'No incluido'}</span>
                  </div>
                </div>

                {/* Gran Total */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50/40 rounded-2xl p-4 border border-purple-100 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#4a208e] tracking-wider block">
                    Total al Cliente ({moneda})
                  </span>
                  <div className="text-3xl font-black text-slate-900">
                    {moneda === 'USD' && `USD ${cotizacion?.precioFinalUSD}`}
                    {moneda === 'UYU' && `$ ${cotizacion?.precioFinalUYU.toLocaleString('es-UY')}`}
                    {moneda === 'ARS' && `$ ${cotizacion?.precioFinalARS.toLocaleString('es-AR')}`}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {moneda === 'USD' && `≈ $ ${cotizacion?.precioFinalUYU.toLocaleString('es-UY')} UYU`}
                    {moneda === 'UYU' && `≈ USD ${cotizacion?.precioFinalUSD}`}
                    {moneda === 'ARS' && `≈ USD ${cotizacion?.precioFinalUSD}`}
                  </div>
                </div>

                {/* Botón Verde WhatsApp */}
                <button
                  type="button"
                  onClick={handleEnviarWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-slate-900 font-extrabold py-3.5 px-4 rounded-2xl shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 text-sm transition-all min-h-[48px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Presupuesto por WhatsApp</span>
                </button>

                <p className="text-[10px] text-slate-400 text-center">
                  Abre WhatsApp con el mensaje formal estructurado y listo para enviar.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================== */}
        {/* PARTE 2: EL PRECIO BASE ÚNICO (TRANSPARENTE)         */}
        {/* ==================================================== */}
        <section id="seccion-precios" className="scroll-mt-20 pt-4">
          <div className="bg-gradient-to-r from-[#2c1256] via-[#4a208e] to-[#5a207e] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-purple-400/30 pb-6">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-[#cb69fc] tracking-wider bg-purple-950/60 px-3 py-1 rounded-full border border-purple-400/20 inline-block mb-2">
                  Precio Base de Partida
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">Tu Aplicación Web Lista para Usar</h3>
                <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
                  Reemplazamos planillas de Excel, cuadernos y cuentas a mano por una herramienta ágil accesible desde cualquier dispositivo.
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-center w-full md:w-auto backdrop-blur-sm shrink-0">
                <span className="text-[10px] uppercase font-bold text-purple-200 block">Inversión Base</span>
                <div className="text-3xl font-black text-white">USD 250</div>
                <span className="text-xs text-purple-300 block font-semibold mt-0.5">+ USD 30 / mes (Servidores & Soporte)</span>
              </div>
            </div>

            {/* Qué incluye la base */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold text-purple-200 tracking-wider block">
                Qué incluye la solución base:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-purple-100">
                <div className="flex items-center gap-2.5 bg-purple-950/40 p-3 rounded-xl border border-purple-400/20">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 font-bold" />
                  <span>Tu logo, colores e identidad corporativa adaptados.</span>
                </div>
                <div className="flex items-center gap-2.5 bg-purple-950/40 p-3 rounded-xl border border-purple-400/20">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 font-bold" />
                  <span>Carga inicial de tus productos, medidas y listas de precios.</span>
                </div>
                <div className="flex items-center gap-2.5 bg-purple-950/40 p-3 rounded-xl border border-purple-400/20">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 font-bold" />
                  <span>Funciona en celulares, tablets o PC sin instalar nada de tiendas.</span>
                </div>
                <div className="flex items-center gap-2.5 bg-purple-950/40 p-3 rounded-xl border border-purple-400/20">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 font-bold" />
                  <span>Planilla en la nube para actualizar precios vos mismo cuando quieras.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================== */}
        {/* PARTE 3: ADICIONALES A MEDIDA (SOLO 3 EJEMPLOS)      */}
        {/* ==================================================== */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              ¿Querés potenciarla? Ejemplos de lo que le podemos sumar:
            </h3>
            <p className="text-xs text-slate-500">
              Funciones adicionales que se integran a medida de tu circuito:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            
            {/* Adicional 1: Mini CRM */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#4a208e] flex items-center justify-center font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Mini CRM & Alertas 48h</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guarda automáticamente cada presupuesto y te avisa a los 2 días con alerta para recordar al cliente por WhatsApp y cerrar la seña.
              </p>
            </div>

            {/* Adicional 2: Filtro Web */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#e6007e] flex items-center justify-center font-bold">
                <Filter className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Filtro Web para Redes</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Un link público para tu Instagram o WhatsApp que filtra curiosos y te entrega pedidos con Nombre, Teléfono y medidas reales.
              </p>
            </div>

            {/* Adicional 3: PDF Formal */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Presupuestos en PDF con Logo</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generación en 1 clic de presupuestos formales descargables con membrete de tu empresa, condiciones y validez comercial.
              </p>
            </div>

          </div>
        </section>

        {/* ==================================================== */}
        {/* PARTE 4: EL GRAN DIFERENCIAL (LA NOTA PROTAGÓNICA)  */}
        {/* ==================================================== */}
        <section className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border-2 border-purple-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="p-3.5 bg-gradient-to-r from-[#4a208e] to-[#e6007e] text-white rounded-2xl shadow-md shrink-0">
              <Lightbulb className="w-8 h-8" />
            </div>

            <div className="space-y-2 flex-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#e6007e] bg-pink-100 px-3 py-1 rounded-full inline-block">
                Nuestro Mayor Diferencial
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                «Y cualquier otra idea que tengas en mente, la ejecutamos.»
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                No te vendemos un software enlatado ni te obligamos a adaptarte a un molde rígido. Si tenés una forma particular de calcular costos, un circuito propio entre tus empleados y la oficina, o una idea que viste en otro lado, <strong>nosotros la desarrollamos a tu medida</strong>.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#4a208e]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cobro de señas online, cálculo de fletes por km, partes de trabajo con fotos, y mucho más.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* PARTE 5: PASO A PASO ÁGIL (EN 3 A 5 DÍAS HÁBILES)   */}
        {/* ==================================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-4">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4a208e] bg-purple-100 px-3 py-1 rounded-full inline-block">
              Puesta en Marcha sin Complicaciones
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Cómo trabajamos con tu empresa
            </h3>
            <p className="text-xs text-slate-500">
              Nosotros nos encargamos de todo el trabajo técnico:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 space-y-1.5">
              <span className="w-7 h-7 rounded-xl bg-[#4a208e] text-white flex items-center justify-center text-xs font-black">1</span>
              <h4 className="font-bold text-sm text-slate-900">Nos mandás lo que tengas</h4>
              <p className="text-xs text-slate-600">Una foto de tu lista, cuaderno o un audio contándonos cómo calculás tus precios.</p>
            </div>

            <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 space-y-1.5">
              <span className="w-7 h-7 rounded-xl bg-[#4a208e] text-white flex items-center justify-center text-xs font-black">2</span>
              <h4 className="font-bold text-sm text-slate-900">Te armamos la aplicación</h4>
              <p className="text-xs text-slate-600">En 3 a 5 días hábiles tenés tu app lista con tus productos para probar en tu celular y PC.</p>
            </div>

            <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 space-y-1.5">
              <span className="w-7 h-7 rounded-xl bg-[#4a208e] text-white flex items-center justify-center text-xs font-black">3</span>
              <h4 className="font-bold text-sm text-slate-900">Puesta en marcha</h4>
              <p className="text-xs text-slate-600">Si te gusta y te ahorra tiempo, la dejamos lista con tu marca y soporte de Grupo AGN.</p>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* PARTE 6: PREGUNTAS FRECUENTES (FAQ)                  */}
        {/* ==================================================== */}
        <section className="space-y-4">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#e6007e] bg-pink-100 px-3 py-1 rounded-full inline-block">
              Respuestas Claras
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs text-slate-500">
              Todo lo que necesitás saber antes de empezar:
            </p>
          </div>

          <div className="space-y-2.5 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all cursor-pointer min-h-[48px]"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#4a208e] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${faqAbierta === idx ? 'rotate-180 text-[#4a208e]' : ''}`} />
                </button>
                {faqAbierta === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================== */}
        {/* PARTE 7: LLAMADO A LA ACCIÓN FINAL (WHATSAPP)        */}
        {/* ==================================================== */}
        <section className="text-center bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-4">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Querés digitalizar la operativa de tu negocio?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Mandanos un audio o foto de cómo cotizás hoy y te preparamos una propuesta a tu medida sin costo ni compromiso.
            </p>
          </div>

          <a
            href="https://wa.me/?text=Hola%20Grupo%20AGN,%20quiero%20consultar%20por%20una%20Aplicaci%C3%B3n%20Web%20a%20medida%20para%20mi%20negocio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-slate-900 font-extrabold text-sm py-4 px-8 rounded-2xl shadow-lg shadow-emerald-900/10 transition-all min-h-[52px]"
          >
            <span>Consultar por WhatsApp con Grupo AGN</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>

      </main>

      {/* Botón Flotante de WhatsApp para Móvil y Desktop */}
      <a
        href="https://wa.me/?text=Hola%20Grupo%20AGN,%20quiero%20consultar%20por%20una%20Aplicaci%C3%B3n%20Web%20a%20medida%20para%20mi%20negocio"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs border-2 border-white transition-all shadow-emerald-950/20"
        title="Consultar por WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-slate-950 text-[#25D366]" />
        <span className="hidden sm:inline font-bold">Consultar por WhatsApp</span>
      </a>

      {/* Footer Corporativo */}
      <footer className="bg-white border-t border-purple-100 py-4 text-center text-xs text-slate-500">
        Potenciado por <strong className="text-[#4a208e]">Grupo AGN</strong> • Soluciones Tecnológicas & Marketing Digital para PyMEs
      </footer>

    </div>
  );
}
