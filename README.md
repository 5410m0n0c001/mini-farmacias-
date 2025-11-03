# Dashboard Analítico Empresarial - Mini Farmacia México

Una página web moderna y minimalista con análisis empresarial completo del modelo de microfranquicia farmacéutica Mini Farmacia.

## 🎯 Características Principales

### ✨ Diseño Apple-Inspired
- Interfaz limpia y elegante con tipografía Inter
- Sombras suaves y efectos de blur
- Animaciones fluidas y microinteracciones
- Diseño mobile-first responsivo

### 📊 Análisis Completos
- **Análisis Financiero**: Proyecciones, punto de equilibrio, ROI
- **Análisis de Mercado**: Tamaño del mercado, segmentación, competencia
- **Marketing Digital**: Efectividad de canales, funnel de conversión
- **Análisis Estratégico**: FODA, Matriz BCG, evaluación de disrupción
- **Operaciones**: Requerimientos de talento, estructura de costos, riesgos

### 🔄 Funcionalidades Interactivas
- Gráficos dinámicos con Chart.js
- Secciones plegables con información detallada
- Navegación suave entre secciones
- Scroll parallax en hero section
- Animaciones AOS (Animate On Scroll)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Funcionalidad interactiva
- **Chart.js**: Visualización de datos
- **AOS Library**: Animaciones al scroll
- **Google Fonts**: Tipografía Inter

## 📱 Compatibilidad

- ✅ GitHub Pages (rutas relativas)
- ✅ Dispositivos móviles (mobile-first)
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Responsive design (320px - 1920px+)

## 🚀 Instalación y Despliegue

### Opción 1: GitHub Pages
1. Subir todos los archivos al repositorio de GitHub
2. Habilitar GitHub Pages en Settings > Pages
3. Seleccionar la rama principal como fuente

### Opción 2: Servidor Local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

### Opción 3: Live Server (VSCode)
1. Instalar la extensión "Live Server"
2. Abrir `index.html`
3. Clic derecho y seleccionar "Open with Live Server"

## 📁 Estructura de Archivos

```
minifarmacia-analytics/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js          # JavaScript funcional
├── logo.jpg           # Logo de la empresa
├── hero.png           # Imagen hero de fondo
└── README.md          # Documentación
```

## 🎨 Personalización

### Colores
Los colores se pueden modificar en las variables CSS:
```css
:root {
  --accent-blue: #007AFF;
  --success: #30D158;
  --warning: #FF9500;
  --danger: #FF453A;
}
```

### Fuentes
Para cambiar la fuente principal:
```css
--font-family: 'Tu-Fuente', sans-serif;
```

### Animaciones
Las animaciones se pueden ajustar en:
```javascript
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});
```

## 📊 Datos del Análisis

El dashboard incluye análisis basado en:
- Investigación del mercado farmacéutico mexicano
- Análisis competitivo de franquicias
- Evaluación regulatoria COFEPRIS
- Proyecciones financieras estimadas
- Matriz de riesgos operacionales

## 🔧 Funcionalidades JavaScript

### Gráficos Interactivos
- Barras comparativas de inversión
- Gráficos de línea para proyecciones
- Charts tipo pie/donut para distribución
- Radar charts para efectividad de canales
- Charts logarítmicos para comparativas

### Navegación
- Sticky navbar con blur effect
- Scroll suave entre secciones
- Indicadores visuales de sección activa
- Botón flotante para ir al reporte final

### Collapsible Sections
- Botones expand/collapse
- Animaciones de apertura/cierre
- Lazy loading de gráficos
- Estados visuales activos/inactivos

## 📈 Métricas de Rendimiento

- ⚡ Carga optimizada con lazy loading
- 📱 Responsive design mobile-first
- 🎯 SEO optimizado con meta tags
- ♿ Accesibilidad considerada
- 🔍 Chart.js para visualizaciones eficientes

## 🐛 Solución de Problemas

### Gráficos no se muestran
- Verificar conexión a internet (Chart.js CDN)
- Revisar consola del navegador para errores
- Asegurar que los canvas elements existen

### Animaciones no funcionan
- Verificar que AOS.js se carga correctamente
- Comprobar que los elementos tienen atributos `data-aos`

### Responsive issues
- Revisar viewport meta tag
- Verificar media queries en CSS
- Probar en diferentes tamaños de pantalla

## 📞 Contacto

Para consultas sobre el análisis o la implementación:
- Email: analytics@minifarmacia.mx
- WhatsApp: +52 56 6252 8692

## 📄 Licencia

Este proyecto es parte del análisis empresarial de Mini Farmacia México. Los datos utilizados son para fines informativos y de análisis estratégico.

---

**Desarrollado con ❤️ para el análisis empresarial de Mini Farmacia México**