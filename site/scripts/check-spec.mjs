#!/usr/bin/env node
/* ============================================================================
 * GATE DE PUBLICACAO
 * ----------------------------------------------------------------------------
 * Roda antes de `astro build`. Impede que a pagina va ao ar enquanto:
 *   1. Houver campo PENDENTE no piso legal de informacao (CDC art. 6, III / 31)
 *   2. Algum modelo violar a Regra Zero (isencao afirmada acima de 32 km/h)
 *   3. Houver claim proibido no conteudo
 *
 * `npm run dev` continua funcionando: da para VER a pagina, nao PUBLICAR.
 * Para forcar (nao faca isso em producao): npm run build:unsafe
 * ========================================================================== */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const vermelho = (s) => `\x1b[31m${s}\x1b[0m`;
const amarelo = (s) => `\x1b[33m${s}\x1b[0m`;
const verde = (s) => `\x1b[32m${s}\x1b[0m`;
const negrito = (s) => `\x1b[1m${s}\x1b[0m`;

const erros = [];
const avisos = [];

/* ---- 1. Piso legal de informacao -------------------------------------
   BLOQUEIA: campos que a pagina REALMENTE usa e sem os quais ela quebra ou
   fica sem identificacao. AVISA: campos que perderam lugar na tela quando a
   secao "Quem assina" foi removida a pedido do cliente. Eles continuam sendo
   piso do CDC (art. 6, III e art. 31), mas hoje nao ha onde renderiza-los:
   travar o build por eles seria travar por algo que o build nao resolve. */
const BLOQUEIAM = ['razaoSocial', 'cnpj', 'endereco', 'cidade', 'uf', 'whatsapp'];

const siteTs = readFileSync(join(raiz, 'src/lib/site.ts'), 'utf8');
const pendentes = [...siteTs.matchAll(/^\s*(\w+):\s*PENDENTE,/gm)].map((m) => m[1]);
const bloqueando = pendentes.filter((p) => BLOQUEIAM.includes(p));
const soAvisam = pendentes.filter((p) => !BLOQUEIAM.includes(p));

if (bloqueando.length) {
  erros.push(
    `Piso legal de informacao incompleto (CDC art. 6, III e art. 31). ` +
      `${bloqueando.length} campo(s) obrigatorio(s) pendente(s) em src/lib/site.ts:\n      ` +
      bloqueando.join(', '),
  );
}
if (soAvisam.length) {
  avisos.push(
    `${soAvisam.length} campo(s) do piso do CDC sem lugar na pagina desde que a secao ` +
      `"Quem assina" saiu: ${soAvisam.join(', ')}. ` +
      `Nao travam o build (nao ha onde exibi-los), mas continuam exigiveis: ` +
      `SAC e garantia precisam existir em algum canto antes do go-live.`,
  );
}

/* ---- 2. A trava de isencao, por modelo ------------------------------- */
const LIMITE_VEL = 32;
const dir = join(raiz, 'src/content/modelos');
const modelos = readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')));

let acimaDoLimite = 0;
for (const m of modelos) {
  if (m.isentoDeHabilitacao === true && m.velocidadeMaximaKmh > LIMITE_VEL) {
    erros.push(
      `${m.codigo}: marcado como isento de habilitacao com ${m.velocidadeMaximaKmh} km/h. ` +
        `Art. 2, par. 6 da Res. CONTRAN 996/2023: acima de ${LIMITE_VEL} km/h a classificacao ` +
        `como ciclomotor e automatica (registro obrigatorio + ACC ou CNH A).`,
    );
  }
  if (m.velocidadeMaximaKmh > LIMITE_VEL) acimaDoLimite++;
}

if (acimaDoLimite) {
  avisos.push(
    `${acimaDoLimite} de ${modelos.length} modelos declaram velocidade acima de ${LIMITE_VEL} km/h. ` +
      `A pagina NAO afirma isencao de habilitacao, o que esta correto: nessa faixa a Res. CONTRAN ` +
      `996/2023 classifica o veiculo como ciclomotor. Nao adicionar claim de isencao sem antes ` +
      `confirmar a velocidade real de fabricacao com o fornecedor.`,
  );
}

/* ---- 3. Claims proibidos em qualquer arquivo de conteudo -------------- */
const PROIBIDOS = [
  { re: /dispensa\s+cnh/i, motivo: 'Claim de isencao. Vetado enquanto a spec for 35 km/h.' },
  { re: /dispensa\s+ipva/i, motivo: 'Claim fiscal. IPVA e estadual e diverge em 27 UFs.' },
  { re: /isento\s+de\s+ipva/i, motivo: 'Promessa fiscal generica. Vetada.' },
  { re: /n[aã]o\s+cai\b/i, motivo: 'Garantia absoluta de seguranca (CDC art. 66) sobre produto que tomba em curva.' },
  { re: /n[aã]o\s+precisa\s+equilibrar/i, motivo: 'Idem: garantia absoluta de seguranca.' },
  { re: /sai\s+emplacada/i, motivo: 'Afirmacao sobre homologacao nao confirmada (CDC arts. 30 e 35).' },
  { re: /leads?\s+da\s+sua\s+regi[aã]o/i, motivo: 'Promessa de rede que nao existe. Precedente Voltz.' },
  { re: /ciclo-?el[eé]trico/i, motivo: 'Categoria da Res. 315/2009, REVOGADA. Nao existe desde 2023.' },
  { re: /economize\s+r\$/i, motivo: 'Numero sem lastro. Projecao exibida vincula pelo art. 30.' },
];

const varrer = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', 'dist', '.astro'].includes(e.name)) continue;
      varrer(p);
      continue;
    }
    if (!/\.(astro|json|ts|tsx|md)$/.test(e.name)) continue;
    if (e.name === 'check-spec.mjs') continue;
    const txt = readFileSync(p, 'utf8');
    for (const { re, motivo } of PROIBIDOS) {
      const linhas = txt.split('\n');
      linhas.forEach((linha, i) => {
        // Ignora linhas de comentario: o veto e sobre o que vai para a TELA.
        const t = linha.trim();
        if (t.startsWith('*') || t.startsWith('//') || t.startsWith('/*')) return;
        if (re.test(linha)) {
          erros.push(`${p.replace(raiz, '.')}:${i + 1} claim proibido -> ${motivo}\n      > ${t.slice(0, 100)}`);
        }
      });
    }
  }
};
varrer(join(raiz, 'src'));

/* ---- Relatorio -------------------------------------------------------- */
console.log('');
console.log(negrito('  GATE DE PUBLICACAO MOVVIN'));
console.log('  ' + '-'.repeat(64));

for (const a of avisos) console.log(`  ${amarelo('AVISO')}  ${a}\n`);

if (erros.length) {
  for (const e of erros) console.log(`  ${vermelho('ERRO')}   ${e}\n`);
  console.log('  ' + '-'.repeat(64));
  console.log(vermelho(negrito(`  BUILD BLOQUEADO: ${erros.length} pendencia(s).`)));
  console.log('  A pagina nao pode ir ao ar neste estado.');
  console.log('  Ver: planejamento/04-perguntas-ao-cliente.md');
  console.log('');
  process.exit(1);
}

console.log(verde(negrito('  OK: gate liberado.')));
console.log('');
