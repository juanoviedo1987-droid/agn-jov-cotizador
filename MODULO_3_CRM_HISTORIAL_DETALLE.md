# Módulo 3 al Detalle: Historial de Cotizaciones & Gestión de Clientes (Mini CRM)
**Grupo AGN**

---

## 1. El Problema Universal que Resuelve el Módulo 3

Cualquier negocio o taller que ya está cotizando con el Módulo 1 y recibiendo consultas con el Módulo 2 empieza a sufrir un nuevo problema a las pocas semanas: **el desorden y la fuga silenciosa de ventas**.

* **Cotizaciones perdidas en la nada:** Se mandan 50 o 100 presupuestos por WhatsApp en un mes. A las dos semanas, nadie sabe a quién se le cotizó, quién respondió y quién quedó colgado.
* **Cero seguimiento (Follow-up):** El 60% de las ventas que no se cierran no es por precio, es porque **el dueño se olvidó de volver a contactar al cliente**. Como el cliente no volvió a escribir, el dueño asume que no le interesó, cuando en realidad el cliente solo estaba ocupado o esperando un llamado.
* **Pérdida del historial:** Un cliente vuelve a escribir 4 meses después diciendo: *"Hola, me habías pasado precio por la ventana corrediza, ¿me mantenés el número?"*. El dueño tiene que ponerse a scrollear chats eternos de WhatsApp para encontrar qué le había cotizado y a qué medidas.
* **Ceguera de números:** El dueño no sabe con certeza cuánto dinero cotizó en el mes, cuántos trabajos cerró ni cuál es su tasa real de conversión.

**El Módulo 3 transforma WhatsApp en un Sistema de Ventas Organizado, sin obligar al cliente a aprender un software corporativo complejo.**

---

## 2. ¿Qué es y qué incluye EXACTAMENTE el Módulo 3?

El Módulo 3 es el **cerebro de control y seguimiento** del negocio.

### A. Registro Automático de Cotizaciones (Cero Carga Manual):
* Cada vez que el carpintero o vendedor toca *"Enviar Presupuesto por WhatsApp"* en el Módulo 1 (o entra un lead del Módulo 2), una automatización silenciosa en segundo plano guarda los datos en su base centralizada:
  * Fecha y hora exacta.
  * Nombre y Celular del cliente (con link directo para abrir el chat con 1 toque).
  * Detalle de lo presupuestado (tipología, medidas, materiales, calidad).
  * Monto cotizado ($ UYU, ARS o USD).
  * Estado inicial: `Enviado / Pendiente`.

### B. El Panel Visual de Gestión (Mini CRM Amigable):
En lugar de instalar un CRM gigante, costoso y difícil de usar como HubSpot o Salesforce (que los talleres nunca usan porque son un dolor de cabeza), se implementa un **Mini CRM en Google Sheets profesionalizado** (o tabla interactiva en Airtable / Supabase):
* **Columnas claras y desplegables simples:**
  * Estado de la venta: `Pendiente` ➔ `En Negociación` ➔ `Ganado / Seña Pagada` ➔ `Perdido` ➔ `Finalizado`.
  * Notas rápidas: *"Llamar el jueves para coordinar visita a obra"*.
  * Fecha de último contacto.
* **Filtros rápidos con 1 clic:** Ver solo los presupuestos de esta semana, los que superan cierto monto o los que están pendientes de respuesta hace más de 48 horas.

### C. Alertas de Seguimiento Inteligente (La Máquina de Cerrar Ventas):
* Conectado con **n8n en Google Cloud**, el sistema monitorea las cotizaciones:
  * **Alerta al taller:** A los 2 o 3 días de haber mandado un presupuesto sin respuesta, el sistema le manda una alerta al dueño por WhatsApp/Telegram:  
    > ⚠️ *SEGUIMIENTO PENDIENTE: Hace 48 horas le cotizaste a Carlos Méndez ($ 12.800 UYU). [Tocá acá para escribirle y consultar si tiene dudas].*
  * **Mensaje de reactivación semi-automático:** Un botón que le prepara el mensaje suave al cliente: *"Hola [Nombre], ¿pudiste revisar la cotización que te enviamos? Avisanos si querés que coordinemos una visita para rectificar medidas."*

### D. Métricas Simples de Fin de Mes (Dashboard Ejecutivo):
Un panel visual en la misma herramienta que le muestra al dueño:
* Total de presupuestos emitidos en el mes (ej: 42 cotizaciones).
* Dinero total cotizado (ej: $ 450.000 UYU).
* Dinero cerrado / ganado (ej: $ 180.000 UYU).
* Producto o tipología más cotizada.

---

## 3. ¿Por qué el Módulo 3 se sostiene fácil sin ser un experto de software?

* **Para vos (Grupo AGN):** La infraestructura ya la tenés (es tu **n8n en Google Cloud** que recibe un webhook desde la app y agrega una fila en Google Sheets con 1 solo nodo estándar). No hay servidores nuevos que configurar ni código complejo que mantener.
* **Para el cliente:** Abre una planilla de Google Drive desde su celular o compu con su cuenta de Gmail. No tiene que recordar contraseñas de sistemas raros ni pagar licencias en dólares por usuario.

---

## 4. ¿Qué incluye el Servicio y el Abono Mensual del Módulo 3?

* **Conexión y flujo activo en n8n:** Monitoreo del puente entre la app web y la base de datos para que ningún dato se pierda.
* **Copias de seguridad continuas (Backups):** Si el cliente borra sin querer una fila o desconfigura una columna, se recupera el backup en 5 minutos.
* **Ajustes de alertas:** Si el cliente quiere que el recordatorio sea a las 72 horas en vez de 48 horas, o cambiar el texto de aviso, se lo ajusta Grupo AGN.
* **Reporte mensual:** Envío mensual de un resumen con sus números de ventas.

---

## 5. Estructura de Precios del Módulo 3:

* **Setup Inicial (Único pago):** **+ USD 150**  
  *(Incluye: Creación y configuración de la base CRM + enlace de webhooks en n8n + armado del panel de métricas + configuración de alertas de seguimiento).*
* **Abono Mensual:** **+ USD 20 / mes**  
  *(Mantenimiento del motor n8n + backups de la base de datos + soporte operativo).*

---

## 6. La Escalera Completa de Grupo AGN (Los 3 Módulos Integrados)

| Módulo | Nombre | Función | Setup | Abono |
|:---:|---|---|:---:|:---:|
| **M1** | **Cotizador + Base de Productos** | Calcular rápido con precios reales y mandar WhatsApp formal. | USD 250 | USD 30/m |
| **M2** | **Portal Público Calificador** | Frenar curiosos en redes y recibir solicitudes con teléfono y medidas. | + USD 150 | + USD 15/m |
| **M3** | **Historial & CRM de Seguimiento** | Guardar cada cotización, recordar seguimientos y ver métricas de ventas. | + USD 150 | + USD 20/m |
| **TOTAL** | **SISTEMA FULL INTEGRADO ⭐** | **Toda la operación de ventas en piloto automático** | **USD 500** *(Bonificado)* | **USD 65 / mes** |
