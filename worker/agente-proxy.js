/*
 * agente-proxy.js — Worker de Cloudflare para agente.ivanlafuente.com
 * Parte de Cowork AgentKit / Genesis
 *
 * POR QUÉ EXISTE: el custom domain de Railway se queda para siempre en
 * VALIDATING_OWNERSHIP y nunca emite el cert Let's Encrypt (bug conocido de
 * Railway — ver memory/errores-aprendidos.md 2026-06-15, mismo caso que
 * asuguia-router). Solución: servir el subdominio con el Universal SSL de
 * Cloudflare (candado verde inmediato, sin depender de Railway) y proxear el
 * tráfico a la URL de Railway que SÍ funciona, reescribiendo el Host para que
 * Railway rutee bien (Railway solo rutea si ve su propio dominio en el Host).
 */

const ORIGIN = "entrevista-agente-production.up.railway.app";
const PUBLIC = "agente.ivanlafuente.com";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = ORIGIN;
    url.protocol = "https:";
    url.port = "";

    // Reescribimos el Host al dominio de Railway (si no, Railway devuelve 404
    // porque no reconoce el custom domain sin cert). Guardamos el dominio
    // público en X-Forwarded-Host por si la app lo necesita.
    const req = new Request(url.toString(), request);
    req.headers.set("Host", ORIGIN);
    req.headers.set("X-Forwarded-Host", PUBLIC);

    let resp = await fetch(req, { redirect: "manual" });

    // Si la app redirige a la URL cruda de Railway, la devolvemos al dominio
    // lindo para que el usuario nunca vea el .up.railway.app.
    const loc = resp.headers.get("Location");
    if (loc && loc.includes(ORIGIN)) {
      resp = new Response(resp.body, resp);
      resp.headers.set(
        "Location",
        loc.replace(new RegExp("https?://" + ORIGIN, "g"), "https://" + PUBLIC)
      );
    }
    return resp;
  },
};
