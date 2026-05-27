# Guia completa: ivanlafuente.com

> Manual paso a paso de como se creo y deployó esta web.
> Sirve como referencia para replicar en cualquier otro sitio.

---

## 1. Que es este sitio

Pagina personal/profesional de Ivan Lafuente para vender cursos de IA.
Single-page con 10 secciones, sin frameworks, sin build step.

**URL:** https://ivanlafuente.com
**Hosting:** Cloudflare Pages (gratis)
**Repo:** https://github.com/ivanlafuentepy/ivanlafuente-web

---

## 2. Stack tecnico

| Componente | Tecnologia |
|---|---|
| HTML | Vanilla, single-page |
| CSS | Archivo separado (`style.css`), mobile-first |
| JS | Vanilla (`script.js`), zero dependencias |
| Font | Inter (Google Fonts) |
| Iconos | SVG inline (redes sociales, web) + imagen PNG (robot AI) |
| Imagenes | PNG (perfil, afiche, logos, icono) |
| Hosting | Cloudflare Pages |
| DNS | Cloudflare |
| Repo | GitHub |
| Deploy | Automatico al pushear a `master` |

---

## 3. Estructura de archivos

```
ivanlafuente-web/
  index.html          — pagina principal (~450 lineas, 10 secciones)
  style.css           — estilos (~750 lineas, paleta naranja+negro)
  script.js           — interactividad (~100 lineas)
  .gitignore          — ignora node_modules, .env, .wrangler
  GUIA-DEPLOY.md      — este archivo
  assets/
    perfil.png        — foto circular de Ivan (portada)
    afiche-curso.png  — afiche del curso de IA
    icono.png         — icono circular (favicon)
    logo-sss.png      — logo Salsa Soul Studio
    logo-fka.png      — logo Fenix Kids Academy
    robot-ai.png      — imagen robot AI (control acceso)
```

---

## 4. Paleta de colores

```css
--bg: #0a0a0f          /* negro azulado (fondo principal) */
--bg2: #10101a         /* fondo secciones alternas */
--bg-card: #1a1a28     /* fondo tarjetas */
--accent: #ff6b2b      /* naranja vibrante (color principal) */
--accent-light: #ff8f5a /* hover */
--accent-dark: #cc4a10  /* bordes */
--gold: #c9a84c        /* acento secundario (conecta con SSS) */
--green: #25D366       /* boton WhatsApp */
--text: #f0f0f5        /* texto principal */
--text2: #a0a0b8       /* texto secundario */
```

---

## 5. Secciones de la pagina

| # | Seccion | Que muestra |
|---|---|---|
| 1 | **Nav sticky** | Logo + links a secciones, hamburger en mobile |
| 2 | **Hero** | Foto perfil con glow, nombre, tagline, 2 CTAs |
| 3 | **Sobre mi** | Historia + timeline visual (2008→2026) |
| 4 | **Negocios** | SSS y FKA con logos reales y links a sus webs |
| 5 | **Agentes IA** | Dorita, Fenix, AgentBlue — cards con stats, accordion expandible |
| 6 | **Proyectos** | Redes sociales, paginas web, control acceso |
| 7 | **Cursos IA** | Charla + Curso 01 + Curso 02 + pricing box + afiche con lightbox |
| 8 | **Resultados** | Stats animadas (counters que suben al hacer scroll) |
| 9 | **CTA final** | Boton WhatsApp grande |
| 10 | **Footer** | Links a webs, @ivanlafuente.ia, WhatsApp |

---

## 6. JavaScript — que hace cada cosa

| Funcionalidad | Como funciona |
|---|---|
| **Nav sticky** | IntersectionObserver detecta cuando pasas el hero, muestra el nav |
| **Smooth scroll** | Links `href="#seccion"` hacen scroll suave |
| **Hamburger menu** | Toggle clase `.open` en mobile (<768px) |
| **Reveal on scroll** | IntersectionObserver agrega `.visible` a elementos `.reveal` (fade-in) |
| **Counter animation** | Numeros suben de 0 al valor final con easing (atributo `data-count`) |
| **Accordion agentes** | Click en tarjeta de agente expande detalles, cierra las demas |
| **Lightbox** | Click en afiche abre modal fullscreen, ESC o click para cerrar |

---

## 7. Responsive

- **Mobile** (<768px): 1 columna, hamburger menu, textos mas chicos
- **Tablet** (601-959px): grids de 2 columnas
- **Desktop** (960px+): grids de 3 columnas, timeline vertical, hero mas grande

---

## 8. Imagenes — de donde salen

| Imagen | Origen |
|---|---|
| `perfil.png` | `cursos-ia/marketing/perfil/ChatGPT Image 27 may 2026...png` |
| `afiche-curso.png` | `cursos-ia/marketing/afiches/1er curso IA basico.png` |
| `icono.png` | `cursos-ia/marca/icono/curso-ia-icono.png` |
| `logo-sss.png` | `salsasoulstudio-web/logo-dorado.png` |
| `logo-fka.png` | `fenixkidsacademy-web/logo.png` |
| `robot-ai.png` | Descargado manualmente (`Downloads/14313824.png`) |

---

## 9. Precios actuales en la web

| Producto | Precio |
|---|---|
| Charla Introductoria | Gs 30.000 (incluye desayuno) |
| Curso Implementacion IA | Gs 150.000 |
| Charla + Curso combo | Gs 180.000 (incluye desayuno: mixto y cafe) |
| Curso Agente WhatsApp | Proximamente (sin precio todavia) |

**Horarios primeras fechas:**
- Sabado 30: 08:30 Charla → 09:30 Curso
- Domingo 31: 09:30 Charla → 10:30 Curso
- Ubicacion: Salsa Soul Studio, Asuncion
- Requisito: venir con computadora

**WhatsApp para CTAs:** wa.me/595982790407 (numero de Ivan)

---

## 10. Pasos para crear el proyecto desde cero

### 10.1 Crear la carpeta y copiar assets

```bash
mkdir -p Projects/ivanlafuente-web/assets
cd Projects/ivanlafuente-web
git init

# Copiar imagenes desde otros proyectos
cp ../cursos-ia/marketing/perfil/*.png assets/perfil.png
cp ../cursos-ia/marketing/afiches/1er\ curso\ IA\ basico.png assets/afiche-curso.png
cp ../cursos-ia/marca/icono/curso-ia-icono.png assets/icono.png
cp ../salsasoulstudio-web/logo-dorado.png assets/logo-sss.png
cp ../fenixkidsacademy-web/logo.png assets/logo-fka.png
```

### 10.2 Crear los archivos

- `index.html` — estructura completa con las 10 secciones
- `style.css` — paleta, reset, componentes, responsive
- `script.js` — nav, scroll, reveal, counters, accordion, lightbox
- `.gitignore` — node_modules, .env, .wrangler, CLAUDE.local.md

### 10.3 Commit y push a GitHub

```bash
git add -A
git commit -m "feat: sitio web ivanlafuente.com"

# Crear repo en GitHub y pushear
gh repo create ivanlafuentepy/ivanlafuente-web --public --source=. --push
```

---

## 11. Deploy en Cloudflare Pages — paso a paso

### 11.1 Crear el proyecto Pages

1. Ir a **dash.cloudflare.com**
2. Menu lateral: **Workers & Pages**
3. Click **Create** > pestaña **Pages** > **Connect to Git**
4. Seleccionar repo **ivanlafuente-web**
5. Configurar:
   - **Production branch:** `master`
   - **Build command:** VACIO (no escribir nada)
   - **Build output directory:** `/`
   - **Framework preset:** None
6. Click **Save and Deploy**
7. Esperar a que diga "Success"

**IMPORTANTE:** Asegurate de crear un proyecto **Pages**, NO un Worker. Si se crea como Worker, los archivos estaticos no se sirven. Si pasa esto, borrar y recrear como Pages.

### 11.2 Conectar el dominio principal

1. En el proyecto Pages, ir a **Custom domains**
2. Click **Set up a custom domain**
3. Escribir: `ivanlafuente.com`
4. Click **Continue** > **Activate domain**
5. Elegir **Simple domain mapping**

### 11.3 Conectar www (importante!)

Sin esto, www.ivanlafuente.com no funciona.

**Paso A — DNS:**
1. En Cloudflare, ir a la seccion **DNS** del dominio ivanlafuente.com
2. Agregar registro CNAME:
   - **Name:** `www`
   - **Target:** `ivanlafuente-web.pages.dev`
   - **Proxy:** ON (naranja)

**Paso B — Custom domain en Pages:**
1. Volver a Workers & Pages > ivanlafuente-web > **Custom domains**
2. Agregar: `www.ivanlafuente.com`
3. Activar

### 11.4 Verificar DNS final

Los registros DNS deben quedar asi:

| Name | Type | Content | Proxy |
|---|---|---|---|
| `ivanlafuente.com` | CNAME | `ivanlafuente-web.pages.dev` | Proxied |
| `www.ivanlafuente.com` | CNAME | `ivanlafuente-web.pages.dev` | Proxied |

### 11.5 Verificar que funciona

Probar estas 3 URLs:
- https://ivanlafuente.com
- https://www.ivanlafuente.com
- https://ivanlafuente-web.pages.dev

Las 3 deben mostrar la misma pagina.

---

## 12. Deploy automatico

Cada vez que se hace `git push` a `master`, Cloudflare Pages redeploya automaticamente en ~1-2 minutos.

```bash
# Ejemplo: hacer un cambio y deployar
git add -A
git commit -m "fix: actualizar precios"
git push
# Esperar 1-2 minutos, recargar la web
```

**Si el auto-deploy no funciona**, verificar en Settings > Builds & deployments que la cuenta de GitHub este conectada. Si hay un banner "disconnected from Git", reconectar.

---

## 13. Errores comunes y soluciones

| Problema | Causa | Solucion |
|---|---|---|
| Se creo como Worker en vez de Pages | Elegiste mal al crear | Borrar, recrear como Pages |
| www no funciona | Falta CNAME + custom domain | Agregar ambos (DNS + Pages) |
| "This site can't be reached" | DNS no propago todavia | Esperar 5-10 min, probar en incognito |
| Deploy dice Success pero no carga | Build output dir mal | Verificar que sea `/` |
| Auto-deploy no funciona | Git desconectado | Reconectar GitHub en Settings |
| Imagenes no cargan | Path incorrecto | Verificar que esten en `assets/` |

---

## 14. Para replicar en otro sitio

Este mismo proceso sirve para cualquier web estatica:

1. Crear carpeta con `index.html` + assets
2. Push a GitHub
3. Cloudflare Pages > Connect to Git > Sin build command > Output `/`
4. Custom domain + www
5. Listo

El modelo base esta en `salsasoulstudio-web/` (mismo patron).
