# Análisis Crítico y Blindaje del Modelo de Negocio — Grupo AGN
**Estrategia Comercial, Límites Operativos y Gestión de Personalizaciones por Rubro**

---

## 1. El Diagnóstico Crítico: Los 2 Grandes Riesgos Reales

Mirando la estructura con ojos de negocio y de sostenibilidad en el tiempo, hay dos trampas clásicas en las que caen las agencias de software y automatizaciones:

### Riesgo A: "El Alcance Infinito" (Feature Creep / Trampa de las personalizaciones)
* **El problema:** El cliente paga el Módulo 1 (USD 250) y a las dos semanas dice:  
  *"Che, ¿me agregás que calcule fletes por kilómetro?", "¿y que le reste el IVA?", "¿y que imprima una factura con código de barras?", "¿y que se conecte con el stock del depósito?"*.
* **La consecuencia:** Trabajás 80 horas de más por una personalización que nunca te pagaron, y te sentís obligado a hacerla para que no cancele el abono mensual.

### Riesgo B: "Soporte no cotizado"
* **El problema:** Si el abono mensual no tiene un límite claro de qué incluye, el cliente te va a pedir cambios de diseño, agregar 50 productos a mano o rearmar fórmulas complejas todos los viernes por USD 30/mes.

---

## 2. Las 3 Mejoras Clave a Implementar YA

Para blindar tu tiempo y maximizar la rentabilidad de Grupo AGN, te propongo 3 ajustes estratégicos concretos:

### MEJORA 1: La Regla de los "Add-ons de Personalización" (Catálogo de Extras)
El núcleo del Módulo 1 es estándar (Medidas × Materiales + Mano de obra × Margen).  
Cualquier cosa que se salga de ese estándar **no entra en el setup base**, sino que se cotiza como un **Add-on (Bloque Adicional) con precio fijo**:

| Módulo Extra / Personalización | ¿Qué resuelve? | Inversión Extra (Setup) |
|---|---|:---:|
| **Generador de Presupuesto en PDF con Logo** | En vez de solo texto de WhatsApp, genera un PDF membretado formal descargable para imprimir o mandar por mail. | **+ USD 120** |
| **Cálculo de Flete / Logística por Zona** | Selector de barrios/zonas o cálculo de envío según distancia. | **+ USD 80** |
| **Opción con y sin Factura / IVA** | Selector que desglosa impuestos y comprobantes formales. | **+ USD 60** |
| **Integración con Pasarela de Pagos (Seña)** | Botón de Mercado Pago o Stripe para que el cliente señe el trabajo con tarjeta en el acto. | **+ USD 150** |
| **Conexión a ERP / Facturación Electrónica** | Conectar con sistemas contables existentes (vía webhook n8n). | **A cotizar (desde USD 250)** |

> **La frase de oro para el cliente:**  
> *"La plataforma base resuelve el 90% de tus ventas al instante. Si necesitás una función específica de tu circuito (como generar PDFs automáticos o cobrar señas por Mercado Pago), te la sumamos como un módulo extra independiente sin problema."*

---

### MEJORA 2: Blindar el Abono Mensual (Qué incluye y qué NO incluye)
Para que el cliente no abuse del abono mensual, las reglas del juego tienen que estar escritas desde el primer día:

* **Lo que SÍ incluye el abono mensual (USD 30 a USD 65/mes):**
  * Servidores en la nube activos 24/7 con soporte técnico de estabilidad.
  * Certificados de seguridad SSL y respaldos continuos (Backups).
  * **Hasta 1 hora de soporte/ajustes menores por mes** (ej. actualizar un archivo de precios que envía el cliente o cambiar un teléfono de contacto).
* **Lo que NO incluye (se cobra aparte):**
  * Cargar catálogos gigantescos a mano desde fotos borrosas que te mande por WhatsApp (si quiere que vos cargues 200 productos a mano, se cobra una tarifa de carga de datos).
  * Rediseño completo de la aplicación o reestructuración de la lógica de negocio.

---

### MEJORA 3: Agregar la "Opción de Pago Anual" (El Secreto del Flujo de Caja)
A muchos dueños de pymes no les gusta tener débitos o transferencias mensuales chicas de USD 30 o USD 45 todos los meses; prefieren sacarse el tema de la cabeza de una sola vez.

* **La Oferta Anual:** *"Si pagás el año por adelantado, te bonificamos 2 meses de abono y el 50% del setup."*
  * En un Combo 1 + 2: en vez de pagar USD 380 setup + USD 45/mes, le cobrás **USD 640 en un solo pago anual**.
  * **Ventaja para Grupo AGN:** Te entran USD 640 limpios y cash de golpe en el día 1, y te asegurás al cliente por 12 meses sin riesgo de que se dé de baja a los 60 días.

---

## 3. Matriz de Adaptación por Rubro (Cómo se personaliza sin rehacer código)

El secreto para que esto sea un negocio escalable es que **la aplicación en un 80% sea siempre la misma**, y que solo cambien 3 variables de configuración:

```
┌────────────────────────────────────────────────────────┐
│             NÚCLEO COMÚN (80% DEL CÓDIGO)              │
│  • Motor de cálculo (Variables x Insumos + Margen)     │
│  • Conexión a Base de Datos (Google Sheets / n8n)      │
│  • Generador de WhatsApp formal                        │
│  • Diseño Mobile-First adaptable                       │
└──────────────────────────┬─────────────────────────────┘
                           │ Solo cambian estas 3 cosas:
       ┌───────────────────┼────────────────────┐
       ▼                   ▼                    ▼
1. La Marca         2. Las Variables     3. El Catálogo
(Logo y Colores)    (Medidas, m², kg,    (Lista de insumos
                     horas de servicio)   en Google Sheets)
```

### Ejemplos concretos de adaptación por rubro:

1. **Aberturas / Vidrierías:**
   * Variables: Ancho (cm), Alto (cm), Tipología, Línea, Vidrio.
   * Catálogo: Precio por metro de perfil, precio por $m^2$ de vidrio, herrajes.
2. **Muebles a Medida / Placards / Cocinas:**
   * Variables: Metros lineales, tipo de melamina (18mm), cantos, correderas telescópicas o comunes.
   * Catálogo: Precio por placa, herrajes, costo de armado y flete.
3. **Herrería / Portones / Estructuras:**
   * Variables: Ancho x Alto, diseño (reja simple, chapa ciega, metal desplegado), automatización (motor).
   * Catálogo: Precio por metro de caño estructural, chapas, electrodos, pintura y motor.
4. **Imprenta y Cartelería:**
   * Variables: Ancho x Alto en cm, material (Lona front, Vinilo mate, Microperforado), terminación (ojales, montado en foam).
   * Catálogo: Precio por $m^2$ de material, tinta y bastidor.

---

## 4. Resumen Ejecutivo: El Catálogo Maestro Blindado

```
[MÓDULO 1: COTIZADOR + BASE PRODUCTOS]  ➔ USD 250 Setup  |  USD 30 / mes
[MÓDULO 2: FILTRO WEB DE CAPTACIÓN]    ➔ +USD 150 Setup  |  +USD 15 / mes
[MÓDULO 3: MINI CRM & SEGUIMIENTO]     ➔ +USD 150 Setup  |  +USD 20 / mes
─────────────────────────────────────────────────────────────────────────
COMBO ESTRELLA (M1 + M2):              ➔ USD 380 Setup   |  USD 45 / mes
COMBO COMPLETO (M1 + M2 + M3):         ➔ USD 500 Setup   |  USD 65 / mes
─────────────────────────────────────────────────────────────────────────
ADD-ONS PERSONALIZADOS:
• Generador de Presupuesto en PDF:     + USD 120 (único)
• Cobro de Seña con Mercado Pago:      + USD 150 (único)
• Selector de Flete / Envíos:          + USD 80 (único)
```
