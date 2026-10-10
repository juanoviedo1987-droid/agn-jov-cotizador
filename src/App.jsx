import React, { useState } from 'react';
import { 
  Wrench, 
  UserCheck, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  User, 
  Maximize2, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { PRICING_CONFIG, calcularCotizacion } from './pricingConfig';

export default function App() {
  // Pestaña activa: 'taller' o 'filtro_cliente'
  const [activeTab, setActiveTab] = useState('taller');

  // Estado del Formulario Modo Taller (Carpintero)
  const [tallerForm, setTallerForm] = useState({
    anchoCm: 150,
    altoCm: 120,
    tipologiaId: 'corrediza_2h',
    lineaId: 'probba',
    vidrioId: 'dvh',
    colorId: 'anodizado_natural',
    clienteNombre: 'Carlos Méndez',
    clienteTelefono: '099123456',
    incluyeColocacion: true
  });

  // Estado del Formulario Modo Cliente (Filtro Captación)
  const [clienteStep, setClienteStep] = useState(1);
  const [clienteForm, setClienteForm] = useState({
    tipologiaId: 'corrediza_2h',
    anchoAprox: 150,
    altoAprox: 120,
    calidadVidrio: 'dvh',
    nombre: '',
    telefono: '',
    zona: 'Montevideo / Canelones',
    comentarios: ''
  });
  const [clienteEnviado, setClienteEnviado] = useState(false);

  // Cálculo en vivo para Modo Taller
  const cotizacion = calcularCotizacion({
    anchoCm: tallerForm.anchoCm,
    altoCm: tallerForm.altoCm,
    tipologiaId: tallerForm.tipologiaId,
    lineaId: tallerForm.lineaId,
    vidrioId: tallerForm.vidrioId,
    colorId: tallerForm.colorId
  });

  // Generador de enlace y mensaje de WhatsApp para el carpintero
  const handleEnviarWhatsApp = () => {
    if (!cotizacion) return;

    let telLimpio = tallerForm.clienteTelefono.replace(/\D/g, '');
    if (telLimpio.startsWith('0')) {
      telLimpio = '598' + telLimpio.substring(1);
    } else if (!telLimpio.startsWith('598')) {
      telLimpio = '598' + telLimpio;
    }

    const mensaje = `Hola ${tallerForm.clienteNombre || 'estimado/a'}! 👋\n` +
      `Te paso el presupuesto detallado de tu abertura:\n\n` +
      `🪟 *Tipología:* ${cotizacion.tipologia.nombre}\n` +
      `📏 *Medidas:* ${cotizacion.medidas.anchoCm} cm (ancho) x ${cotizacion.medidas.altoCm} cm (alto)\n` +
      `🏗️ *Línea:* ${cotizacion.linea.nombre}\n` +
      `🛡️ *Vidrio:* ${cotizacion.vidrio.nombre}\n` +
      `🎨 *Color:* ${cotizacion.color.nombre}\n` +
      (tallerForm.incluyeColocacion ? `✅ *Incluye:* Rectificación de medidas en obra y colocación.\n\n` : `\n`) +
      `💰 *Total:* *$ ${cotizacion.precioFinalUYU.toLocaleString('es-UY')} UYU* (o aprox. USD ${cotizacion.precioFinalUSD})\n\n` +
      `⏱️ *Plazo de fabricación:* 10 a 15 días hábiles.\n` +
      `📋 *Validez del presupuesto:* 15 días corridos.\n\n` +
      `¿Querés que coordinemos una visita para rectificar medidas o tenés alguna consulta?`;

    const url = `https://wa.me/${telLimpio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  // Envío del Formulario de Filtro Cliente (Simulación Webhook n8n)
  const handleEnviarFiltroCliente = (e) => {
    e.preventDefault();
    setClienteEnviado(true);

    // Aquí n8n recibiría el webhook en la versión productiva
    console.log('Lead enviado a n8n CRM:', clienteForm);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col antialiased">
      {/* Header Corporativo AGN-JOB */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white font-black tracking-wider flex items-center justify-center">
              AGN
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                JOV <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium border border-blue-500/30">Beta 1.0</span>
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">Cotizador Express de Aberturas</div>
            </div>
          </div>

          {/* Switcher de Vista */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
            <button
              onClick={() => setActiveTab('taller')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'taller'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Modo Taller</span>
            </button>
            <button
              onClick={() => setActiveTab('filtro_cliente')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'filtro_cliente'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Filtro Clientes</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-20">

        {/* ---------------------------------------------------- */}
        {/* VISTA 1: MODO TALLER (USO RÁPIDO DEL CARPINTERO)     */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'taller' && (
          <div className="space-y-4">
            {/* Banner de explicación rápida */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-blue-300">Herramienta Interna</span>
                <h1 className="text-lg md:text-xl font-bold">Calculá y despachá cotizaciones en 20 segundos</h1>
                <p className="text-xs text-blue-200 mt-0.5">Ingresá medidas y enviá el presupuesto formal por WhatsApp con un solo clic.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Formulario de entrada rápida */}
              <div className="md:col-span-7 space-y-4">

                {/* 1. Medidas */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Maximize2 className="w-4 h-4 text-blue-600" /> 1. Medidas de la abertura (cm)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1 font-medium">Ancho (cm)</span>
                      <input
                        type="number"
                        value={tallerForm.anchoCm}
                        onChange={(e) => setTallerForm({ ...tallerForm, anchoCm: e.target.value })}
                        className="w-full text-xl font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1 font-medium">Alto (cm)</span>
                      <input
                        type="number"
                        value={tallerForm.altoCm}
                        onChange={(e) => setTallerForm({ ...tallerForm, altoCm: e.target.value })}
                        className="w-full text-xl font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="120"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Tipología */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Layers className="w-4 h-4 text-blue-600" /> 2. Tipología
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRICING_CONFIG.tipologias.map((tipo) => (
                      <button
                        key={tipo.id}
                        type="button"
                        onClick={() => setTallerForm({ ...tallerForm, tipologiaId: tipo.id })}
                        className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          tallerForm.tipologiaId === tipo.id
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-xs ring-1 ring-blue-600'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="font-bold text-sm">{tipo.nombre}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{tipo.descripcion}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Línea de Aluminio */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> 3. Línea de Aluminio (Perfilería)
                  </label>
                  <div className="space-y-2">
                    {PRICING_CONFIG.lineas.map((linea) => (
                      <div
                        key={linea.id}
                        onClick={() => setTallerForm({ ...tallerForm, lineaId: linea.id })}
                        className={`cursor-pointer p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          tallerForm.lineaId === linea.id
                            ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm text-slate-900">{linea.nombre}</div>
                          <div className="text-[11px] text-slate-500">{linea.descripcion}</div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          {linea.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Vidrio y Color */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      4. Vidrio
                    </label>
                    <select
                      value={tallerForm.vidrioId}
                      onChange={(e) => setTallerForm({ ...tallerForm, vidrioId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {PRICING_CONFIG.vidrios.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      5. Terminación / Color
                    </label>
                    <select
                      value={tallerForm.colorId}
                      onChange={(e) => setTallerForm({ ...tallerForm, colorId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {PRICING_CONFIG.colores.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Datos del Cliente */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <User className="w-4 h-4 text-blue-600" /> 6. Datos del Cliente para el WhatsApp
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Nombre del cliente</span>
                      <input
                        type="text"
                        value={tallerForm.clienteNombre}
                        onChange={(e) => setTallerForm({ ...tallerForm, clienteNombre: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Ej: Laura Rossi"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Celular (Uruguay)</span>
                      <input
                        type="text"
                        value={tallerForm.clienteTelefono}
                        onChange={(e) => setTallerForm({ ...tallerForm, clienteTelefono: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Ej: 099123456"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Lateral: Resumen de Cotización y Botón de WhatsApp */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg border border-slate-800 sticky top-20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Cotización Instantánea
                    </span>
                    <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                      Uruguay $ UYU / USD
                    </span>
                  </div>

                  {cotizacion ? (
                    <div>
                      {/* Gran Precio Final */}
                      <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 text-center mb-4">
                        <span className="text-xs text-slate-400 block mb-1 font-medium">Inversión Final Sugerida</span>
                        <div className="text-3xl font-extrabold text-white tracking-tight">
                          $ {cotizacion.precioFinalUYU.toLocaleString('es-UY')} <span className="text-sm font-semibold text-blue-400">UYU</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          ≈ USD {cotizacion.precioFinalUSD} (TC ref. {PRICING_CONFIG.tipoCambioUSD})
                        </div>
                      </div>

                      {/* Desglose Técnico Estimado */}
                      <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3 mb-5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Metros de perfil estimado:</span>
                          <span className="font-semibold">{cotizacion.metrosLinealesPerfiles} m lineales</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Superficie de vidrio:</span>
                          <span className="font-semibold">{cotizacion.superficieM2} m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Costo materiales estimado:</span>
                          <span className="font-semibold">$ {cotizacion.desglose.costoMateriales.toLocaleString('es-UY')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mano de obra y taller:</span>
                          <span className="font-semibold">$ {cotizacion.desglose.manoDeObra.toLocaleString('es-UY')}</span>
                        </div>
                      </div>

                      {/* Botón WhatsApp */}
                      <button
                        onClick={handleEnviarWhatsApp}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar Presupuesto por WhatsApp</span>
                      </button>

                      <p className="text-[11px] text-slate-400 text-center mt-2.5">
                        Abre WhatsApp con el mensaje estructurado listo para enviar al cliente.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      Ingresá ancho y alto para ver la cotización al instante.
                    </div>
                  )}
                </div>

                {/* Tarjeta de valor para AGN-JOV */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                  <div className="bg-blue-600 text-white rounded-lg p-1.5 font-bold text-[10px]">CRM</div>
                  <div>
                    <span className="font-bold block">Conexión con n8n lista</span>
                    Esta cotización puede guardarse automáticamente en tu base de datos de clientes para hacer seguimientos y remarketing por email o WhatsApp.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VISTA 2: FILTRO DE CLIENTES (CAPTACIÓN PÚBLICA)      */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'filtro_cliente' && (
          <div className="max-w-xl mx-auto space-y-4">
            {/* Banner de explicación */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Filtro Anti-Curiosos
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                Solicitá tu Presupuesto de Aberturas
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Completá los datos en 1 minuto para recibir una cotización precisa y personalizada directo a tu WhatsApp.
              </p>
            </div>

            {clienteEnviado ? (
              <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-sm text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">¡Solicitud Recibida con Éxito!</h3>
                <p className="text-sm text-slate-600">
                  Gracias <strong>{clienteForm.nombre}</strong>. El carpintero ha recibido tus especificaciones técnicas y te responderá a la brevedad a tu WhatsApp (<strong>{clienteForm.telefono}</strong>).
                </p>
                <button
                  onClick={() => {
                    setClienteEnviado(false);
                    setClienteForm({
                      tipologiaId: 'corrediza_2h',
                      anchoAprox: 150,
                      altoAprox: 120,
                      calidadVidrio: 'dvh',
                      nombre: '',
                      telefono: '',
                      zona: 'Montevideo / Canelones',
                      comentarios: ''
                    });
                  }}
                  className="bg-slate-900 text-white text-xs font-bold py-2.5 px-5 rounded-xl inline-flex items-center gap-1.5 hover:bg-slate-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnviarFiltroCliente} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
                {/* 1. Selección de Tipología */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    1. ¿Qué abertura necesitás?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRICING_CONFIG.tipologias.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setClienteForm({ ...clienteForm, tipologiaId: t.id })}
                        className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                          clienteForm.tipologiaId === t.id
                            ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 text-blue-900 font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {t.nombre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Medidas aproximadas */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    2. Medidas aproximadas (en centímetros)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500">Ancho aprox. (cm)</span>
                      <input
                        type="number"
                        required
                        value={clienteForm.anchoAprox}
                        onChange={(e) => setClienteForm({ ...clienteForm, anchoAprox: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500">Alto aprox. (cm)</span>
                      <input
                        type="number"
                        required
                        value={clienteForm.altoAprox}
                        onChange={(e) => setClienteForm({ ...clienteForm, altoAprox: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    * No te preocupes por la exactitud milimétrica; rectificamos en obra antes de fabricar.
                  </span>
                </div>

                {/* 3. Calidad de Vidrio */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    3. Tipo de Vidrio preferido
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setClienteForm({ ...clienteForm, calidadVidrio: 'simple_4mm' })}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                        clienteForm.calidadVidrio === 'simple_4mm'
                          ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 font-bold text-blue-900'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>Estándar Simple</div>
                      <div className="text-[10px] text-slate-500 font-normal">Económico para interiores o zonas resguardadas</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setClienteForm({ ...clienteForm, calidadVidrio: 'dvh' })}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                        clienteForm.calidadVidrio === 'dvh'
                          ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 font-bold text-blue-900'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>DVH Térmico / Acústico</span>
                        <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-bold">Recomendado</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal">Aísla el frío, calor y ruidos de la calle</div>
                    </button>
                  </div>
                </div>

                {/* 4. Datos del Cliente (Filtro para evitar spam) */}
                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                    4. ¿A dónde te enviamos el presupuesto?
                  </label>

                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1">Nombre completo *</span>
                    <input
                      type="text"
                      required
                      value={clienteForm.nombre}
                      onChange={(e) => setClienteForm({ ...clienteForm, nombre: e.target.value })}
                      placeholder="Ej: Martín Silva"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Celular / WhatsApp *</span>
                      <input
                        type="tel"
                        required
                        value={clienteForm.telefono}
                        onChange={(e) => setClienteForm({ ...clienteForm, telefono: e.target.value })}
                        placeholder="Ej: 099 123 456"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Zona / Departamento</span>
                      <input
                        type="text"
                        value={clienteForm.zona}
                        onChange={(e) => setClienteForm({ ...clienteForm, zona: e.target.value })}
                        placeholder="Ej: Pocitos, Montevideo"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Solicitar Presupuesto por WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

      </main>

      {/* Footer Branding AGN-JOV */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        Desarrollado y potenciado por <strong className="text-slate-800">AGN-JOV</strong> • Empresa <strong className="text-slate-800">AGN</strong>
      </footer>
    </div>
  );
}
