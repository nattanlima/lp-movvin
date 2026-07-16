/* ============================================================================
 * CAMINHO DE ASSET
 * ----------------------------------------------------------------------------
 * O site e servido pelo GitHub Pages num subcaminho (/lp-movvin/), definido em
 * `base` no astro.config.mjs. O Astro NAO reescreve caminho absoluto escrito a
 * mao em href/src/srcset: um "/img/x.png" aponta pra raiz do dominio e da 404
 * em producao, funcionando so no dev.
 *
 * Toda referencia a arquivo de /public passa por aqui. Quando o dominio
 * proprio existir e o base virar '/', esta funcao vira identidade sozinha e
 * nenhum componente muda.
 *
 *   asset('/img/logo.png')  ->  '/lp-movvin/img/logo.png'   (Pages)
 *                           ->  '/img/logo.png'             (dominio proprio)
 * ========================================================================== */

/** BASE_URL vem do Astro e sempre termina em '/'. Tiro a barra pra nao duplicar. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function asset(caminho: string): string {
  return BASE + (caminho.startsWith('/') ? caminho : '/' + caminho);
}

/** URL absoluta e canonica de uma rota, para canonical/og/JSON-LD. */
export function urlAbsoluta(caminho: string, origem: string | URL): string {
  return new URL(asset(caminho), origem).toString();
}

/* ----------------------------------------------------------------------------
 * ROTA: o mesmo problema do asset(), mas para navegacao.
 *
 * Existe separado de propositto porque destino de link nao e so caminho de
 * arquivo: os menus misturam rota interna ('/suporte'), ancora ('#faq') e link
 * externo (wa.me, instagram) na MESMA lista. Prefixar uma ancora com o base
 * transforma "rolar ate o FAQ" em "recarregar a home", e prefixar um wa.me
 * quebra o unico canal de conversao da pagina. Entao so o que comeca em '/'
 * ganha o base; o resto passa intacto.
 * -------------------------------------------------------------------------- */
export function rota(destino: string): string {
  return destino.startsWith('/') ? asset(destino) : destino;
}
