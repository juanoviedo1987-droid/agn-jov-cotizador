// Configuración Universal de Cotización para Pymes y Oficios (Grupo AGN)
// Este archivo sirve como motor de ejemplo demostrativo.
// En producción con clientes reales, cada lista de precios se conecta a su propia Google Sheets/n8n sin tocar código.

export const TIPOS_CAMBIO = {
  USD: 1,
  UYU: 40.5,
  ARS: 1250
};

export const UNIVERSAL_RUBROS = [
  {
    id: 'aberturas',
    nombre: 'Aberturas & Vidriería',
    icono: '🪟',
    unidadTipo: 'dimensiones', // usa ancho x alto
    unidadLabel: 'Medidas (Ancho x Alto en cm)',
    servicioLabel: 'Incluye rectificación en obra e instalación',
    productos: [
      {
        id: 'ventana_corrediza',
        nombre: 'Ventana Corrediza 2 Hojas',
        descripcion: 'Ideal reformas y obra nueva con cierre hermético',
        anchoDefault: 150,
        altoDefault: 120,
        precioBaseM2USD: 160,
        herrajesUSD: 35
      },
      {
        id: 'pano_fijo',
        nombre: 'Paño Fijo Panorámico',
        descripcion: 'Marco estanco para máxima entrada de luz',
        anchoDefault: 180,
        altoDefault: 140,
        precioBaseM2USD: 120,
        herrajesUSD: 15
      },
      {
        id: 'puerta_abrir',
        nombre: 'Puerta de Entrada Reforzada',
        descripcion: 'Cerradura de seguridad, picaporte y bisagras pesadas',
        anchoDefault: 90,
        altoDefault: 205,
        precioBaseM2USD: 210,
        herrajesUSD: 70
      }
    ],
    calidades: [
      { id: 'estandar', nombre: 'Serie 25 Estándar (Vidrio 4mm)', factor: 1.0, badge: 'Económica' },
      { id: 'media', nombre: 'Línea Media (Probba + DVH Doble Vidrio)', factor: 1.35, badge: 'Más Vendida' },
      { id: 'premium', nombre: 'Línea Alta Gama (Gala / A30 Termoacústico)', factor: 1.70, badge: 'Prémium' }
    ]
  },
  {
    id: 'muebles',
    nombre: 'Muebles & Carpintería',
    icono: '🪵',
    unidadTipo: 'dimensiones',
    unidadLabel: 'Dimensiones del Mueble (cm)',
    servicioLabel: 'Incluye flete, subida y armado en domicilio',
    productos: [
      {
        id: 'placard_vestidor',
        nombre: 'Placard / Vestidor con Puertas Corredizas',
        descripcion: 'Interior con barrales, cajoneras y estantes a medida',
        anchoDefault: 200,
        altoDefault: 240,
        precioBaseM2USD: 145,
        herrajesUSD: 60
      },
      {
        id: 'bajo_mesada',
        nombre: 'Bajo Mesada de Cocina en Melamina 18mm',
        descripcion: 'Correderas telescópicas y cantos de PVC pegados',
        anchoDefault: 160,
        altoDefault: 85,
        precioBaseM2USD: 180,
        herrajesUSD: 45
      },
      {
        id: 'mesa_comedor',
        nombre: 'Mesa de Comedor en Madera Maciza / Hierro',
        descripcion: 'Tapa en madera finger o paraíso y patas industriales',
        anchoDefault: 180,
        altoDefault: 90,
        precioBaseM2USD: 190,
        herrajesUSD: 30
      }
    ],
    calidades: [
      { id: 'estandar', nombre: 'Melamina Clásica Blanca (18mm)', factor: 1.0, badge: 'Estándar' },
      { id: 'media', nombre: 'Melamina Texturada con Cantos de PVC (2mm)', factor: 1.25, badge: 'Media' },
      { id: 'premium', nombre: 'Madera Maciza Laqueada Poliuretánico', factor: 1.65, badge: 'Prémium' }
    ]
  },
  {
    id: 'herreria',
    nombre: 'Herrería & Estructuras',
    icono: '⚙️',
    unidadTipo: 'dimensiones',
    unidadLabel: 'Medidas de la Estructura (cm)',
    servicioLabel: 'Incluye amurado, nivelación y pintura de terminación',
    productos: [
      {
        id: 'porton_corredizo',
        nombre: 'Portón Corredizo de Entrada',
        descripcion: 'Estructura en caño estructural con guía de piso y ruedas',
        anchoDefault: 300,
        altoDefault: 200,
        precioBaseM2USD: 130,
        herrajesUSD: 80
      },
      {
        id: 'reja_seguridad',
        nombre: 'Reja de Seguridad para Ventana',
        descripcion: 'Hierro macizo redondo o cuadrado con planchuela perforada',
        anchoDefault: 150,
        altoDefault: 120,
        precioBaseM2USD: 95,
        herrajesUSD: 20
      },
      {
        id: 'pergola_alero',
        nombre: 'Pérgola / Alero con Techo Traslúcido',
        descripcion: 'Columnas y tirantes en perfilería con fijaciones a muro',
        anchoDefault: 350,
        altoDefault: 250,
        precioBaseM2USD: 110,
        herrajesUSD: 50
      }
    ],
    calidades: [
      { id: 'estandar', nombre: 'Hierro Estándar con Fondo Antióxido', factor: 1.0, badge: 'Básica' },
      { id: 'media', nombre: 'Estructura Reforzada con Esmalte Sintético 3en1', factor: 1.25, badge: 'Reforzada' },
      { id: 'premium', nombre: 'Pintura Horneada al Polvo Electrostática (Máxima Duración)', factor: 1.55, badge: 'Prémium' }
    ]
  },
  {
    id: 'servicios',
    nombre: 'Servicios & Climatización',
    icono: '🔧',
    unidadTipo: 'cantidad',
    unidadLabel: 'Cantidad de Equipos / Puntos de Trabajo',
    servicioLabel: 'Incluye materiales de montaje y garantía escrita de 1 año',
    productos: [
      {
        id: 'instalacion_split',
        nombre: 'Instalación de Aire Acondicionado Split',
        descripcion: 'Hasta 3 metros de cañería de cobre, aislación y ménsulas',
        anchoDefault: 1, // unidades
        altoDefault: 1,
        precioBaseM2USD: 130,
        herrajesUSD: 25
      },
      {
        id: 'service_mantenimiento',
        nombre: 'Service & Limpieza Integral de Equipo',
        descripcion: 'Desinfección de evaporadora, control de gas refrigerante',
        anchoDefault: 1,
        altoDefault: 1,
        precioBaseM2USD: 60,
        herrajesUSD: 10
      },
      {
        id: 'instalacion_electrica',
        nombre: 'Adecuación Eléctrica / Línea Dedicada con Térmica',
        descripcion: 'Cableado bajo norma, llave termomagnética y puesta a tierra',
        anchoDefault: 1,
        altoDefault: 1,
        precioBaseM2USD: 90,
        herrajesUSD: 30
      }
    ],
    calidades: [
      { id: 'estandar', nombre: 'Servicio Estándar en Horario Hábil', factor: 1.0, badge: 'Normal' },
      { id: 'media', nombre: 'Servicio Express (Atención en menos de 24 horas)', factor: 1.30, badge: 'Express' },
      { id: 'premium', nombre: 'Guardia Prioritaria 24/7 con Repuestos Incluidos', factor: 1.70, badge: 'Prioritaria' }
    ]
  }
];

// Cálculo Universal Paramétrico
export function calcularCotizacionUniversal({
  rubroId = 'aberturas',
  productoId,
  ancho = 150,
  alto = 120,
  cantidad = 1,
  calidadId = 'estandar',
  incluyeServicio = true
}) {
  const rubro = UNIVERSAL_RUBROS.find(r => r.id === rubroId) || UNIVERSAL_RUBROS[0];
  const producto = rubro.productos.find(p => p.id === productoId) || rubro.productos[0];
  const calidad = rubro.calidades.find(c => c.id === calidadId) || rubro.calidades[0];

  let costoDirectoUSD = 0;
  let medidasTexto = '';

  if (rubro.unidadTipo === 'dimensiones') {
    const anchoNum = parseFloat(ancho) || 100;
    const altoNum = parseFloat(alto) || 100;
    const superficieM2 = (anchoNum / 100) * (altoNum / 100);
    costoDirectoUSD = (superficieM2 * producto.precioBaseM2USD * calidad.factor) + producto.herrajesUSD;
    medidasTexto = `${anchoNum} cm x ${altoNum} cm (${superficieM2.toFixed(2)} m²)`;
  } else {
    const cantNum = parseInt(cantidad, 10) || 1;
    costoDirectoUSD = (cantNum * producto.precioBaseM2USD * calidad.factor) + (cantNum * producto.herrajesUSD);
    medidasTexto = `${cantNum} unidad(es)`;
  }

  // Costo de mano de obra y servicio adicional
  const costoServicioUSD = incluyeServicio ? 45 : 0;
  const precioFinalUSD = Math.round(costoDirectoUSD + costoServicioUSD);
  const precioFinalUYU = Math.round(precioFinalUSD * TIPOS_CAMBIO.UYU);
  const precioFinalARS = Math.round(precioFinalUSD * TIPOS_CAMBIO.ARS);

  return {
    rubro,
    producto,
    calidad,
    incluyeServicio,
    medidasTexto,
    precioFinalUSD,
    precioFinalUYU,
    precioFinalARS
  };
}

// Compatibilidad retroactiva por si se necesita
export const PRICING_CONFIG = UNIVERSAL_RUBROS[0];
export function calcularCotizacion(params) {
  return calcularCotizacionUniversal(params);
}
