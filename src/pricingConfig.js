// Configuración base de cálculo de aberturas de aluminio (Uruguay)
// Valores estimativos paramétricos fácilmente ajustables con el cliente o vía Google Sheets/n8n

export const PRICING_CONFIG = {
  // Cotización dólar de referencia
  tipoCambioUSD: 40.5,

  // Tipologías disponibles
  tipologias: [
    {
      id: 'corrediza_2h',
      nombre: 'Corrediza 2 Hojas',
      descripcion: 'Ventana tradicional corrediza de dos hojas móviles',
      factorPerimetro: 2.2, // Factor de perfilería aproximado
      herrajesBaseUYU: 1400, // Cierres embutidos, rodamientos dobles, felpas
      icono: 'SplitSquareVertical'
    },
    {
      id: 'pano_fijo',
      nombre: 'Paño Fijo',
      descripcion: 'Marco fijo sin apertura, máxima iluminación',
      factorPerimetro: 1.0,
      herrajesBaseUYU: 600, // Cuñas, burletes
      icono: 'Square'
    },
    {
      id: 'proyectante',
      nombre: 'Proyectante / Batiente',
      descripcion: 'Ventana con brazo de empuje exterior o bisagras',
      factorPerimetro: 1.8,
      herrajesBaseUYU: 2100, // Brazos inox, aldaba, burletes
      icono: 'AppWindow'
    },
    {
      id: 'puerta_abrir',
      nombre: 'Puerta de Abrir 1 Hoja',
      descripcion: 'Puerta batiente con cerradura y picaporte',
      factorPerimetro: 1.9,
      herrajesBaseUYU: 3200, // Cerradura, picaporte, bisagras reforzadas
      icono: 'DoorClosed'
    }
  ],

  // Líneas de aluminio habituales en Uruguay
  lineas: [
    {
      id: 'serie25',
      nombre: 'Serie 20/25 (Estándar)',
      descripcion: 'Línea liviana económica, ideal reformas y aberturas chicas/medianas',
      costoMetroLinealUYU: 580,
      badge: 'Económica'
    },
    {
      id: 'probba',
      nombre: 'Probba / Módena (Media Prestación)',
      descripcion: 'Excelente hermeticidad, soporte de DVH y gran durabilidad',
      costoMetroLinealUYU: 950,
      badge: 'Más Vendida'
    },
    {
      id: 'gala',
      nombre: 'Gala / A30 (Alta Prestación)',
      descripcion: 'Cortes a 45°, perfiles pesados, máxima aislación y diseño prémium',
      costoMetroLinealUYU: 1450,
      badge: 'Prémium'
    }
  ],

  // Tipos de vidrio
  vidrios: [
    {
      id: 'simple_4mm',
      nombre: 'Simple 4mm Float',
      descripcion: 'Vidrio transparente común básico',
      costoM2UYU: 1200
    },
    {
      id: 'laminado_33',
      nombre: 'Laminado 3+3 (Seguridad)',
      descripcion: 'Vidrio de seguridad anti-rotura',
      costoM2UYU: 2300
    },
    {
      id: 'dvh',
      nombre: 'DVH 4+9+4 (Doble Vidrio Térmico)',
      descripcion: 'Cámara de aire aislante termo-acústica',
      costoM2UYU: 3600
    }
  ],

  // Color de perfil
  colores: [
    { id: 'anodizado_natural', nombre: 'Anodizado Natural (Gris)', multiplicador: 1.0 },
    { id: 'blanco', nombre: 'Pintura Blanca Termoendurecible', multiplicador: 1.05 },
    { id: 'negro', nombre: 'Negro Mate / Microtexturado', multiplicador: 1.10 }
  ],

  // Mano de obra, armado e instalación
  manoDeObraBaseUYU: 2500,
  margenTaller: 0.35 // 35% de margen sugerido sobre costo directo
};

// Función de cálculo matemático
export function calcularCotizacion({ anchoCm, altoCm, tipologiaId, lineaId, vidrioId, colorId }) {
  const anchoM = (parseFloat(anchoCm) || 0) / 100;
  const altoM = (parseFloat(altoCm) || 0) / 100;

  if (anchoM <= 0 || altoM <= 0) {
    return null;
  }

  const tipologia = PRICING_CONFIG.tipologias.find(t => t.id === tipologiaId) || PRICING_CONFIG.tipologias[0];
  const linea = PRICING_CONFIG.lineas.find(l => l.id === lineaId) || PRICING_CONFIG.lineas[0];
  const vidrio = PRICING_CONFIG.vidrios.find(v => v.id === vidrioId) || PRICING_CONFIG.vidrios[0];
  const color = PRICING_CONFIG.colores.find(c => c.id === colorId) || PRICING_CONFIG.colores[0];

  // Cálculos geométricos
  const perimetroMarcoM = (anchoM * 2) + (altoM * 2);
  const metrosLinealesPerfiles = perimetroMarcoM * tipologia.factorPerimetro;
  const superficieM2 = anchoM * altoM;

  // Costos directos de materiales
  const costoPerfiles = (metrosLinealesPerfiles * linea.costoMetroLinealUYU) * color.multiplicador;
  const costoVidrio = superficieM2 * vidrio.costoM2UYU;
  const costoHerrajes = tipologia.herrajesBaseUYU;

  // Subtotal costo directo de materiales
  const costoMateriales = costoPerfiles + costoVidrio + costoHerrajes;

  // Mano de obra de fabricación e instalación aproximada
  const manoDeObra = PRICING_CONFIG.manoDeObraBaseUYU + (superficieM2 * 800);

  // Costo total bruto
  const costoTotalTaller = costoMateriales + manoDeObra;

  // Precio final con margen
  const precioFinalUYU = Math.round(costoTotalTaller * (1 + PRICING_CONFIG.margenTaller));
  const precioFinalUSD = Math.round(precioFinalUYU / PRICING_CONFIG.tipoCambioUSD);

  return {
    medidas: { anchoM, altoM, anchoCm, altoCm },
    metrosLinealesPerfiles: metrosLinealesPerfiles.toFixed(1),
    superficieM2: superficieM2.toFixed(2),
    desglose: {
      costoPerfiles: Math.round(costoPerfiles),
      costoVidrio: Math.round(costoVidrio),
      costoHerrajes: Math.round(costoHerrajes),
      manoDeObra: Math.round(manoDeObra),
      costoMateriales: Math.round(costoMateriales)
    },
    precioFinalUYU,
    precioFinalUSD,
    tipologia,
    linea,
    vidrio,
    color
  };
}
