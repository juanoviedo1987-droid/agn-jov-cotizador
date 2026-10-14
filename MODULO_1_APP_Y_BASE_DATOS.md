# Módulo 1 Redefinido: La App de Cotización + Base de Datos de Productos Editable
**Grupo AGN**

---

## 1. El Concepto Clave del Módulo 1

El **Módulo 1 NO es una calculadora estática con números fijos en el código**.  
Es una **App de Cotización viva**, conectada a una **Base de Datos / Planilla de Productos y Precios** que el propio cliente (o el taller) puede editar periódicamente cuando:
* El proveedor de aluminio le sube el precio del kilo o metro de perfil.
* La vidriería cambia el costo del metro cuadrado de DVH o float.
* Quiere agregar una línea nueva (ej. sumar Serie 30 o PVC) o un accesorio nuevo (ej. mosquiteros, cortinas monoblock).

---

## 2. ¿Cómo funciona la arquitectura técnica de forma ultra simple?

```
┌────────────────────────────────────────────────────────────────────────┐
│                       LA FUENTE DE DATOS (Fácil)                       │
│    Google Sheets (o tabla Airtable / Supabase amigable)                │
│    El cliente tiene columnas familiares:                               │
│    [Código | Producto/Línea | Categoría | Costo Unitario | Margen %]  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    │ (Webhook / API vía n8n o Fetch)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   LA WEB APP (Celular / Taller)                        │
│    • Al abrirse en el celular, lee la lista de productos actualizada.  │
│    • Selector dinámico: muestra los productos activos en la base.      │
│    • Realiza el cálculo con el costo que está vigente hoy.             │
│    • Genera el WhatsApp formal con un clic.                            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Qué incluye EXACTAMENTE el Módulo 1 para el Cliente:

1. **La Aplicación Web Móvil/PC (Mobile-First):**
   * Interfaz rápida para ingresar medidas y seleccionar productos.
   * Cálculo en vivo de costos, mano de obra y precio final sugerido.
   * Botón directo con mensaje formal de WhatsApp.
2. **El Panel / Planilla de Carga de Productos:**
   * Una planilla en su Google Drive (o panel simple) donde tiene:
     * Lista de perfiles y líneas de aluminio con su costo por metro o barra.
     * Lista de vidrios con su costo por $m^2$.
     * Herrajes, accesorios y costo base de mano de obra.
   * **Cero código:** Si el vidrio sube un 10%, el cliente cambia el número en la planilla y la app ya calcula con el precio nuevo.
3. **Puesta a Punto Inicial:**
   * Carga inicial por parte de Grupo AGN de su catálogo actual y sus primeras fórmulas.
   * Capacitación de 20 minutos para enseñarle cómo cambiar los precios cuando lo necesite.

---

## 4. Justificación del Abono Mensual en el Módulo 1

Como el Módulo 1 incluye la **base de datos activa en la nube y sincronización periódica de productos**, el abono mensual queda 100% justificado y es indiscutible:

* **Sincronización en la nube 24/7:** Mantiene el puente activo entre su planilla y la aplicación.
* **Hosting y base de datos:** Sin caídas, accesible desde cualquier teléfono del taller.
* **Soporte y auxilio en carga:** Si el cliente no tiene tiempo de cargar una lista nueva o se traba con una fórmula, le da una mano Grupo AGN.
* **Backups periódicos:** Resguardo de su catálogo para que no pierda su lista de precios si borra algo por error.

---

## 5. Precios Sugeridos para el Módulo 1 (Con Base de Datos Activa):

* **Setup Inicial (Único pago):** **USD 250**  
  *(Incluye: Desarrollo de la app + creación y vinculación de la base de datos de productos + carga del catálogo inicial).*
* **Abono Mensual (Mantenimiento, nube y soporte):** **USD 30 a 35 / mes**  
  *(Cubre la infraestructura en la nube, sincronización y auxilio en la actualización de listas).*
