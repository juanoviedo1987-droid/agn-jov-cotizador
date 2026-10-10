# Estructura de la Aplicación: AGN-JOB Cotizador de Aberturas

## 1. Concepto: "Una Sola Aplicación Web con 2 Vistas / Modos Claros"

Para no tener que mantener dos sitios distintos ni complicar el despliegue, la web tendrá dos pantallas principales con acceso diferenciado:

```
┌─────────────────────────────────────────────────────────────┐
│                      AGN-JOB WEB APP                        │
│                                                             │
│   ┌────────────────────────┐    ┌───────────────────────┐   │
│   │   1. VISTA PÚBLICA     │    │   2. VISTA TALLER     │   │
│   │   (Filtro de Clientes) │    │   (Cotizador Rápido)  │   │
│   │   Ruta: / o /cotizar   │    │   Ruta: /taller       │   │
│   └───────────┬────────────┘    └───────────┬───────────┘   │
│               │                             │               │
│               ▼                             ▼               │
│        Webhook a n8n                 Webhook a n8n          │
│      (Registra Lead)               (Guarda Cotización)      │
│               │                             │               │
│               ▼                             ▼               │
│      Alerta al Carpintero          WhatsApp directo con     │
│       con datos listos            presupuesto al cliente    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Detalle de la Vista 1: "Filtro de Captación" (Para el público / clientes)
* **Objetivo:** Filtrar a los curiosos y captar sólo personas con interés real, obteniendo sus datos de contacto antes de darles una cifra o atención personalizada.
* **Flujo del usuario (Paso a paso en 60 segundos):**
  1. **Paso 1: ¿Qué necesitas?**
     * Selector con tarjetas visuales e iconos: *Ventana Corrediza*, *Paño Fijo*, *Puerta de Abrir*, *Ventana Proyectante*, *Cerramiento / Otro*.
  2. **Paso 2: Medidas aproximadas**
     * Ancho (cm) y Alto (cm). Con ayuda visual ("No te preocupes por la exactitud milimétrica, luego rectificamos en obra").
  3. **Paso 3: Preferencia de calidad / vidrio**
     * Estándar económico (Vidrio simple 4mm).
     * Térmico / Acústico (Doble Vidrio Hermético - DVH).
  4. **Paso 4: Datos de contacto (El Filtro Real)**
     * Nombre y Apellido.
     * Teléfono / Celular uruguayo (09X...).
     * Email (opcional o requerido para CRM).
     * Zona / Departamento (Montevideo, Canelones, Maldonado, etc.).
  5. **Acción de Cierre:**
     * Al tocar *"Solicitar Presupuesto"*:
       * Dispara Webhook a tu **n8n** (guarda el contacto en la base).
       * Le avisa al carpintero por WhatsApp/Telegram: *"🔔 Nuevo pedido de Juan (099123456) - Corrediza DVH 150x120"*.
       * La pantalla del cliente muestra: *"¡Listo! Tu solicitud fue recibida. En minutos te contactamos con tu presupuesto formal."*

---

## 3. Detalle de la Vista 2: "Modo Taller" (Uso exclusivo del Carpintero)
* **Objetivo:** Velocidad absoluta para el carpintero. Mientras está hablando por teléfono o en el taller, cotiza en 20 segundos.
* **Interfaz de una sola pantalla (Todo a la vista, sin pasos):**
  1. **Selector rápido de Tipología:** Botones grandes (Corrediza, Fijo, Batiente, Puerta).
  2. **Línea de Perfilería:** 
     * *Serie 20/25* (Económica).
     * *Probba / Módena* (Media prestación).
     * *Gala / A30* (Alta prestación).
  3. **Tipo de Vidrio:**
     * Simple (4mm / 5mm).
     * Laminado (3+3 mm).
     * DVH (4+9+4 mm).
  4. **Medidas:** Inputs numéricos grandes para Ancho y Alto en cm.
  5. **Datos del Cliente:** Nombre y Teléfono.
  6. **Caja de Resultados Instantánea (En vivo):**
     * Perfilería: Metros lineales calculados.
     * Vidrio: Metros cuadrados ($m^2$).
     * Herrajes y Accesorios estimados.
     * Mano de obra y margen de ganancia.
     * **Total en $ UYU y USD**.
  7. **Botón Principal: "📲 Enviar por WhatsApp":**
     * Abre WhatsApp con el mensaje prearmado:
       ```text
       Hola [Nombre]! Te paso el presupuesto de tu abertura desde [Nombre de Carpintería]:

       • Tipología: Corrediza 2 hojas
       • Línea: Serie 25 Aluminio Anodizado
       • Vidrio: Doble Vidrio Hermético (DVH 4+9+4)
       • Medidas: 150 cm x 120 cm

       💰 Inversión total: $ 12.800 UYU (o USD 320)
       ⏱️ Plazo de fabricación estimado: 10 a 15 días hábiles.
       ✅ Incluye colocación / rectificación en obra.

       Quedo a las órdenes para coordinar la seña o rectificar medidas. Saludos!
       ```
     * En paralelo, dispara Webhook a tu **n8n** para que la cotización quede archivada en el CRM.

---

## 4. Cómo se vinculan ambas pantallas

* Si entra un cliente desde el formulario público, el carpintero recibe la alerta con los datos ya ordenados.
* Si el carpintero quiere cotizarle formalmente, abre su **Modo Taller**, carga las medidas y le dispara el WhatsApp final con el precio exacto.
* Ambas pantallas se alimentan de la misma base de configuración (precios y costos base de aluminio y vidrio).
