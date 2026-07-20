/* ============================================================================
 * CONFIGURACAO DA MOVVIN
 * ----------------------------------------------------------------------------
 * Tudo que depende de informacao do cliente mora AQUI, nunca espalhado no
 * markup. Os campos marcados PENDENTE sao o piso legal de informacao
 * (CDC art. 6, III e art. 31): sao autuaveis por si so, mesmo com a spec
 * de velocidade corrigida.
 *
 * `npm run build` FALHA enquanto houver PENDENTE. Isso e proposital.
 * Para ver a pagina localmente mesmo assim: `npm run dev`.
 * ========================================================================== */

export const PENDENTE = '__PENDENTE__' as const;

export type Pendente = typeof PENDENTE;
export const estaPendente = (v: string) => v === PENDENTE;

export const site = {
  nome: 'Movvin',
  /* Onde o site MORA. Alimenta os @id do JSON-LD e a URL absoluta do OG.
     Dominio proprio (apex). Se mudar, troca aqui E no astro.config.mjs (site).
     Sao os dois unicos lugares. */
  dominio: 'https://movvin.com.br',

  /* ---- Identificacao legal (CDC art. 6, III) --------------------------
     CNPJ conferido pelo digito verificador: 67.098.455/0001-62 e valido. */
  razaoSocial: 'MOVVIN COMÉRCIO E SERVIÇO LTDA',
  cnpj: '67.098.455/0001-62',
  endereco: 'Av. Dr. José Avelino de Freitas, 225 · Ilha do Lazareto',
  cidade: 'Além Paraíba',
  uf: 'MG',
  cep: PENDENTE,

  /* ---- Atendimento ---------------------------------------------------- */
  sac: PENDENTE,
  sacHorario: PENDENTE,
  email: PENDENTE,

  /* ---- Social --------------------------------------------------------- */
  instagram: '@movvinbikes',
  instagramUrl: 'https://instagram.com/movvinbikes',

  /* ---- WhatsApp: o unico canal de conversao da pagina ------------------
     Formato E.164 sem sinais: 55 (Brasil) + 31 (DDD) + 991990488.
     PRE-CONDICAO COMERCIAL: alguem precisa responder preco do outro lado em
     menos de 2 minutos. Sem isso, o CTA queima a conversao E o numero. */
  whatsapp: '5531991990488',

  /* ---- Garantia (nunca so em anos: ciclos e o que o cliente cobra) ----- */
  garantiaAnos: PENDENTE,
  garantiaCiclosBateria: PENDENTE,
  prazoEntregaPeca: PENDENTE,

  /* ---- Assistencia tecnica: endereco, nunca 0800 ---------------------- */
  assistencia: [] as { cidade: string; uf: string; endereco: string }[],

  /* ---- Test ride: o botao SO existe onde ha endereco -------------------
     Sem endereco, sem botao. Se o veiculo for ciclomotor, test ride e em
     area privada: permitir conducao em via publica a quem nao tem ACC e
     infracao com a Movvin como facilitadora. */
  cidadesTestRide: [] as { cidade: string; uf: string; endereco: string; areaPrivada: boolean }[],

  /* ---- Divulgacao de IA -----------------------------------------------
     Os videos e frames disponiveis sao gerados por IA e trazem marca de
     agua. Tres saidas e nao existe quarta: declarar, refilmar, ou nao usar.
     Remover a marca para passar IA por filmagem real e CDC art. 37 + CONAR.
     Enquanto usarVideos = true, a divulgacao no rodape e OBRIGATORIA. */
  usarVideos: true,
  divulgacaoIA: 'Imagens ilustrativas geradas por inteligência artificial.',
} as const;

/* ---- A norma: fonte unica, com data na tela ----------------------------
 * CUIDADO AO EDITAR: cada campo abaixo vai para a tela como afirmacao sobre
 * lei federal. Verificado contra o texto do DOU.
 *
 * >>> DOIS ERROS JA COMETIDOS AQUI, NAO REPETIR <<<
 * 1. O Anexo I NAO esta no PDF da Resolucao. O art. 20 diz que os anexos sao
 *    publicados a parte: o quadro comparativo esta em `urlAnexo`, arquivo
 *    diferente. Linkar `url` como fonte do Anexo I aponta para um documento
 *    que nao contem o Anexo I.
 * 2. "Prazo de transicao encerrado em 31/12/2025" estava errado e virou
 *    "a fiscalizacao passou a valer em janeiro de 2026", o que e FALSO.
 *    O art. 22 poe a Resolucao em vigor em 3 de julho de 2023: ela vale ha
 *    3 anos. O 31/12/2025 e outra coisa — art. 14, par. 1, I: janela para
 *    inclusao no RENAVAM de ciclomotores antigos sem CAT. Nao e prazo de
 *    transicao da norma e nao tem relacao com fiscalizacao.
 */
export const norma = {
  ref: 'Resolução CONTRAN nº 996/2023',
  /* Texto da Resolucao (sem os anexos). */
  url: 'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9962023.pdf',
  /* Anexo I: o quadro comparativo. Arquivo separado, publicado a parte. */
  urlAnexo:
    'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9962023Anexo.pdf',
  publicada: '22 de junho de 2023',
  vigenciaDesde: '3 de julho de 2023',
  limiteVelocidadeKmh: 32,
  limitePotenciaW: 1000,
} as const;

/* ============================================================================
 * WHATSAPP
 * ----------------------------------------------------------------------------
 * Sem backend, sem API oficial, sem custo por conversa: e uma query string.
 *
 * A MENSAGEM E O CONTEXTO. Quem atende nao ve de onde a pessoa clicou, entao
 * a mensagem tem que dizer. Um "Ola" generico obriga o vendedor a comecar
 * perguntando o que a pessoa quer, e quem chegou olhando a MVS-02 ja
 * respondeu isso ao clicar. Cada CTA declara seu contexto no tipo abaixo:
 * assim e impossivel adicionar um botao novo e esquecer de contextualizar.
 *
 * Toda mensagem abre dizendo que veio do site: e o unico jeito de o
 * atendimento separar o lead da pagina do lead do Instagram ou do cartao.
 *
 * Zero em-dash, como no resto da pagina.
 * ========================================================================== */

export type ContextoWhats =
  | { tipo: 'geral' }
  | { tipo: 'modelo'; modelo: string }
  | { tipo: 'uso'; uso: 'trabalho' | 'apoio' | 'escola' }
  | { tipo: 'compra' }
  | { tipo: 'revenda' };

const ABERTURA = 'Oi! Vim pelo site da Movvin';

const POR_USO: Record<'trabalho' | 'apoio' | 'escola', string> = {
  trabalho: 'e procuro uma elétrica pra trabalhar e rodar o dia inteiro. Pode me ajudar a escolher?',
  apoio: 'e procuro uma elétrica pra resolver o dia a dia sem depender de ninguém. Pode me ajudar a escolher?',
  escola: 'e procuro uma elétrica pra levar e buscar na escola. Pode me ajudar a escolher?',
};

function mensagem(ctx: ContextoWhats): string {
  switch (ctx.tipo) {
    case 'modelo':
      return `${ABERTURA} e me interessei pela ${ctx.modelo}. Pode me passar as informações?`;
    case 'uso':
      return `${ABERTURA} ${POR_USO[ctx.uso]}`;
    case 'compra':
      return `${ABERTURA} e quero comprar. Pode me ajudar a escolher o modelo?`;
    case 'revenda':
      return `${ABERTURA} e quero representar a marca na minha cidade. Pode me passar as condições?`;
    case 'geral':
    default:
      return `${ABERTURA} e quero saber mais sobre a linha.`;
  }
}

export function linkWhatsApp(ctx: ContextoWhats = { tipo: 'geral' }) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem(ctx))}`;
}
