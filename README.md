# Test del Amor Triangular - Sternberg

Aplicación de escritorio multiplataforma para realizar el Test del Modelo Triangular del Amor (Sternberg, 1997).

## 📋 Descripción

Esta aplicación implementa la Escala del Modelo Triangular del Amor de Sternberg, un cuestionario de 45 preguntas que evalúa tres componentes fundamentales del amor:

- **Intimidad**: Sentimientos de cercanía, conexión y vínculo
- **Pasión**: Impulsos que llevan al romance, atracción física y consumación sexual
- **Compromiso**: Decisión de amar y mantener ese amor a largo plazo

## 🚀 Características

- ✅ Formulario interactivo con las 45 preguntas del test
- ✅ Personalización con el nombre de la pareja
- ✅ Cálculo automático de puntuaciones
- ✅ Gráfico triangular de resultados
- ✅ Clasificación del tipo de amor
- ✅ Generación de PDF con los resultados
- ✅ 100% offline - sin envío de datos a servidores
- ✅ Disponible para Windows, macOS y Linux

## 📦 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (incluido con Node.js)

## 🛠️ Instalación

1. **Clonar o descargar el proyecto**

```bash
cd sternberg-app
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar en modo desarrollo**

```bash
npm start
```

## 🔨 Compilación

### Compilar para todas las plataformas

```bash
npm run build:all
```

### Compilar solo para Windows

```bash
npm run build:win
```

Genera:
- `dist/Test del Amor Triangular Setup X.X.X.exe` (Instalador)
- `dist/Test del Amor Triangular X.X.X.exe` (Portable)

### Compilar solo para macOS

```bash
npm run build:mac
```

Genera:
- `dist/Test del Amor Triangular-X.X.X.dmg`
- `dist/Test del Amor Triangular-X.X.X-arm64.dmg` (para Apple Silicon)

### Compilar solo para Linux

```bash
npm run build:linux
```

Genera:
- `dist/Test del Amor Triangular-X.X.X.AppImage`
- `dist/test-del-amor-triangular_X.X.X_amd64.deb`

## 📁 Estructura del Proyecto

```
sternberg-app/
├── package.json          # Configuración del proyecto y scripts
├── README.md            # Este archivo
├── src/
│   ├── main.js          # Proceso principal de Electron
│   ├── preload.js       # Script de precarga (comunicación IPC)
│   ├── index.html       # Interfaz principal
│   ├── styles.css       # Estilos
│   ├── renderer.js      # Lógica de la aplicación
│   └── assets/
│       └── icon.svg     # Icono base de la aplicación
└── dist/                # Carpeta de salida (generada al compilar)
```

## 🎨 Personalización de Iconos

Para las compilaciones, necesitarás crear iconos en los formatos apropiados:

### Windows (.ico)
- Tamaños recomendados: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
- Coloca el archivo como `src/assets/icon.ico`

### macOS (.icns)
- Tamaños recomendados: 16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024
- Coloca el archivo como `src/assets/icon.icns`

### Linux (.png)
- Tamaño recomendado: 512x512
- Coloca el archivo como `src/assets/icon.png`

**Herramientas para convertir:**
- [iConvert Icons](https://iconverticons.com/online/) - Online
- [png2icns](https://github.com/nicklockwood/png2icns) - macOS
- [ImageMagick](https://imagemagick.org/) - Línea de comandos

## 📊 Interpretación de Resultados

| Puntuación | Nivel |
|------------|-------|
| 15-45 | Bajo |
| 46-90 | Moderado |
| 91-135 | Alto |

### Tipos de Amor según Sternberg

| Tipo | Intimidad | Pasión | Compromiso |
|------|-----------|--------|------------|
| Sin amor | ❌ | ❌ | ❌ |
| Cariño | ✅ | ❌ | ❌ |
| Encaprichamiento | ❌ | ✅ | ❌ |
| Amor vacío | ❌ | ❌ | ✅ |
| Amor romántico | ✅ | ✅ | ❌ |
| Amor compañero | ✅ | ❌ | ✅ |
| Amor fatuo | ❌ | ✅ | ✅ |
| **Amor consumado** | ✅ | ✅ | ✅ |

## 🔒 Privacidad

Esta aplicación:
- **NO** envía datos a ningún servidor
- **NO** requiere conexión a internet
- **NO** almacena datos personales
- Todos los cálculos se realizan localmente en tu dispositivo

## 📄 Licencia

MIT License - Siéntete libre de usar, modificar y distribuir.

## 📚 Referencias

Sternberg, R. J. (1986). A triangular theory of love. *Psychological Review*, 93(2), 119-135.

Sternberg, R. J. (1997). Construct validation of a triangular love scale. *European Journal of Social Psychology*, 27(3), 313-335.

---

**Nota:** Esta es una herramienta educativa y de autoexploración. No sustituye el consejo profesional de un psicólogo o terapeuta de parejas.

## Juego del mapa de amor

Disponible desde el menú en escritorio (`src/`) y web/Android (`www/`). Incluye las 60 preguntas y sus puntos del documento «Juego mapa de amor». Cada persona recibe 20 preguntas aleatorias sin repeticiones en su lista; los turnos se alternan hasta completar 40. La pareja responde en voz alta y quien pregunta marca el acierto: la persona que responde suma los puntos de la pregunta y quien pregunta suma 1. Los fallos y las preguntas pasadas no suman.

El marcador se actualiza durante la partida; se puede deshacer el último turno, revisar el resumen final y comenzar otra partida. Los nombres son opcionales. No se almacenan nombres ni respuestas, ni se transmiten datos.

Para verificar el sorteo, los turnos y las puntuaciones sin instalar dependencias:

```bash
node --test tests/mapa-de-amor.test.js
```
