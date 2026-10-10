# Plan de Proyecto: AGN-JOB — Cotizador Express de Aberturas
**Empresa:** AGN  
**Proyecto:** AGN-JOB  
**Cliente Piloto:** Carpintería de aluminio / aberturas en Uruguay  

---

## 1. Visión y Objetivos

### Para el Cliente (Carpintero):
* **Ahorro de tiempo crítico:** Reducir el tiempo de cotización de 15–20 minutos (consultando Excel + redactando mensajes con IA) a **menos de 30 segundos**.
* **Filtro de curiosos:** Un formulario ágil que captura datos reales del cliente antes de cotizar.
* **Cierre inmediato por WhatsApp:** Mensaje profesional generado automáticamente con formato listo para enviar en un clic.

### Para AGN / AGN-JOB:
* **Caso de éxito tangible:** Primer producto llave en mano validado en un taller real.
* **Producto replicable (Micro-SaaS o Producto-Servicio):** Poder licenciar o vender esta misma herramienta a otras carpinterías de aluminio y herrerías de Uruguay.

---

## 2. Herramientas y Stack Tecnológico

| Capa | Herramienta / Tecnología | Justificación |
|---|---|---|
| **Frontend** | **React + Vite + Tailwind CSS** | Ultra ligero, tiempos de carga instantáneos, estética moderna y 100% adaptable a celulares (Mobile-First). |
| **Iconografía** | **Lucide-react** | Iconos limpios para medidas, tipos de ventanas, WhatsApp, etc. |
| **Persistencia / Configuración (Fase Beta)** | **JSON / LocalStorage** | Permite cambiar costos base, precios por metro lineal y vidrio al instante sin depender de backend. |
| **Persistencia (Fase 2 / Producción)** | **Google Sheets API o Supabase** | Para que el carpintero pueda actualizar sus precios en su planilla habitual de Google Sheets y la web tome los cambios sola. |
| **Hosting / Despliegue** | **Vercel o Netlify** | Gratuito para arrancar, SSL automático, deploy en segundos y link público inmediato para que el cliente lo abra desde su smartphone. |
| **Integraciones** | **WhatsApp Web / API (`wa.me`)** | Sin costo por API oficial, funciona nativo en cualquier teléfono. |

---

## 3. Arquitectura Funcional de la Beta

### Vista A: "Modo Taller" (Uso Rápido del Carpintero)
1. **Medidas:** Ancho (cm) y Alto (cm).
2. **Tipología:**
   * Corrediza (2 hojas)
   * Paño Fijo
   * Proyectante / Batiente
   * Puerta de abrir
3. **Línea de Perfilería (Uruguay):**
   * Estándar (Serie 20 / 25)
   * Media prestación (Probba / Módena)
   * Alta prestación (Gala / A30)
4. **Tipo de Vidrio:**
   * Simple (4 mm)
   * Laminado de seguridad (3+3 mm)
   * Doble Vidriado Hermético (DVH 4+9+4)
5. **Color / Terminación:**
   * Anodizado Natural
   * Blanco / Negro / Anodizado Bronce
6. **Resultados en tiempo real:**
   * Metros lineales calculados.
   * Superficie de vidrio ($m^2$).
   * Costo de perfiles + vidrios + accesorios/felpas + mano de obra.
   * Total en **UYU ($)** y **USD**.
7. **Acción directa:**
   * Botón *"Enviar presupuesto por WhatsApp"* con formato pro.

### Vista B: "Filtro de Clientes" (Captación Pública)
* Landing/Formulario mínimo con selector visual guiado:
  * ¿Qué necesitas? (Fotos/íconos simples).
  * Medidas aproximadas.
  * Localidad / Barrio.
  * Nombre y Celular (09X XXX XXX).
* Al enviar: Le llega al carpintero un WhatsApp estructurado con la solicitud lista para cotizar o confirmar.

---

## 4. Fases de Ejecución

### Fase 1: Prototipo Beta Interactivo (HOY)
- [ ] Inicializar proyecto Vite + React + Tailwind en el repositorio.
- [ ] Montar motor de cálculo paramétrico base (perfiles, vidrios, herrajes, margen).
- [ ] Construir la interfaz de Modo Taller mobile-first.
- [ ] Construir el generador de enlace y mensaje de WhatsApp.
- [ ] Agregar selector de vista (Modo Taller / Modo Cliente).
- [ ] Branding sutil "AGN-JOB".
- [ ] Probar y dejar listo para desplegar.

### Fase 2: Validación con el Carpintero
- [ ] Pasar el link al carpintero para testeo real en taller.
- [ ] Ajustar valores base de costos con sus precios reales (precios por metro de perfil, $m^2$ de vidrio, etc.).

### Fase 3: Modelo de Negocio y Escalado
- [ ] Opciones comerciales para el cliente: Pago único + mantenimiento, o abono mensual accesible.
- [ ] Sincronización con Google Sheets para que edite precios sin código.
- [ ] Presentación a otras carpinterías bajo el catálogo de servicios de AGN-JOB.
