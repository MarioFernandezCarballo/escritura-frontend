# Configuración de Google Analytics 4 (GA4) y Google Tag Manager (GTM)

Este documento explica cómo se ha integrado Google Analytics 4 (GA4) a través de Google Tag Manager (GTM) en el sitio web de Mario Carballo, y cómo completar la configuración.

## Archivos implementados

Se han creado los siguientes archivos para la integración:

1. `components/analytics/GoogleTagManager.tsx` - Componente para cargar el script de GTM
2. `components/analytics/PageViewTracker.tsx` - Componente para rastrear vistas de página automáticamente
3. `util/analytics.ts` - Configuración de GTM
4. `util/analytics-helpers.ts` - Funciones de ayuda para rastrear eventos
5. `types/window.d.ts` - Declaración de tipos para dataLayer

Además, se ha modificado:

- `app/layout.tsx` - Para incluir los componentes de GTM y PageViewTracker

## Pasos para completar la configuración

### 1. Crear una cuenta de Google Tag Manager

1. Ve a [Google Tag Manager](https://tagmanager.google.com/) y crea una cuenta si aún no tienes una.
2. Crea un nuevo contenedor para el sitio web (Web).
3. Anota el ID del contenedor GTM (formato: `GTM-XXXXXXX`).

### 2. Configurar el ID de GTM en el proyecto

El ID de GTM ya ha sido configurado en el archivo `util/analytics.ts` con el valor `GTM-PHR5L8JJ`. Si necesitas cambiarlo por otro ID, puedes editar este archivo:

```typescript
export const GTM_ID = 'GTM-PHR5L8JJ'; // Ya configurado con tu ID de GTM
```

### 3. Crear una propiedad de Google Analytics 4

1. Ve a [Google Analytics](https://analytics.google.com/) y crea una cuenta si aún no tienes una.
2. Crea una nueva propiedad de GA4.
3. Anota el ID de medición de GA4 (formato: `G-XXXXXXXXXX`).

### 4. Configurar GA4 en Google Tag Manager

1. Inicia sesión en [Google Tag Manager](https://tagmanager.google.com/).
2. Selecciona tu contenedor.
3. Crea una nueva etiqueta:
   - Haz clic en "Nueva etiqueta".
   - Nombra la etiqueta (por ejemplo, "GA4 Configuration").
   - Haz clic en "Tipo de etiqueta" y selecciona "Configuración de Google Analytics: GA4".
   - Introduce tu ID de medición de GA4 en el campo "ID de medición".
   - En "Activación", selecciona "All Pages" (si no existe, crea un nuevo activador para todas las páginas).
   - Guarda la etiqueta.

4. Crea una etiqueta para eventos (opcional pero recomendado):
   - Haz clic en "Nueva etiqueta".
   - Nombra la etiqueta (por ejemplo, "GA4 Events").
   - Haz clic en "Tipo de etiqueta" y selecciona "Evento de Google Analytics: GA4".
   - Introduce tu ID de medición de GA4.
   - En "Configuración del evento", selecciona "Enviar un evento personalizado".
   - En "Nombre del evento", introduce `{{Event}}` para capturar todos los eventos personalizados.
   - En "Activación", crea un nuevo activador:
     - Tipo: Evento personalizado
     - Nombre del evento: .*
     - Esto capturará todos los eventos personalizados enviados al dataLayer.
   - Guarda la etiqueta.

5. Publica los cambios en GTM haciendo clic en "Enviar" y luego en "Publicar".

## Eventos implementados

Se han implementado los siguientes eventos en la aplicación:

1. **Vistas de página** - Rastreadas automáticamente con el componente `PageViewTracker`.
2. **Vistas de contenido** - Rastreadas cuando un usuario ve una publicación.
3. **Clics** - Rastreados cuando un usuario hace clic en botones de compra.

### Ejemplo de uso de eventos personalizados

Los eventos personalizados se pueden rastrear utilizando las funciones de ayuda en `util/analytics-helpers.ts`:

```typescript
import { trackClick, trackContentView } from "@/util/analytics-helpers";

// Rastrear una vista de contenido
trackContentView('publication', 'slug-del-libro', 'Título del libro');

// Rastrear un clic
trackClick('purchase', 'amazon', 19.99);
```

## Verificación de la implementación

Para verificar que GA4 y GTM están funcionando correctamente:

1. Instala la [extensión de Chrome Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk).
2. Visita tu sitio web.
3. Abre la extensión Tag Assistant y verifica que GTM se está cargando correctamente.
4. En Google Analytics, ve a "Informes" > "Tiempo real" para ver si se están registrando las visitas.

## Solución de problemas

Si los eventos no se están rastreando correctamente:

1. Verifica que el ID de GTM en `util/analytics.ts` sea correcto.
2. Asegúrate de que las etiquetas en GTM estén configuradas correctamente.
3. Utiliza la consola del navegador para verificar si hay errores relacionados con GTM o GA4.
4. Utiliza la vista previa de GTM para depurar la configuración.

## Recursos adicionales

- [Documentación oficial de Google Tag Manager](https://developers.google.com/tag-manager/quickstart)
- [Documentación oficial de Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Guía de eventos recomendados para GA4](https://support.google.com/analytics/answer/9267735)
