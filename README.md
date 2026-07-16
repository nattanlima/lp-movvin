# Movvin · Landing page

Mobilidade elétrica urbana. Bikes, scooters e triciclos.

**No ar:** https://nattanlima.github.io/lp-movvin

---

## Rodando

```bash
cd site
npm install
npm run dev          # http://localhost:4321/lp-movvin/
```

| Script | O que faz |
|---|---|
| `npm run dev` | servidor local. Não passa pelo gate: dá para **ver** a página sempre. |
| `npm run build` | **gate + build.** É o que roda no deploy. |
| `npm run build:unsafe` | pula o gate. Não use para publicar. |
| `npm run check:spec` | só o gate, sem construir. |

O deploy é automático: todo push na `main` roda [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## O gate

`site/scripts/check-spec.mjs` roda **antes** de todo build e é a condição de publicação, não um lembrete. Ele bloqueia três coisas:

1. **Piso legal de informação** (CDC art. 6º, III e art. 31). Razão social, CNPJ, endereço, cidade, UF e WhatsApp pendentes = build quebrado. Hoje estão todos preenchidos.
2. **A Regra Zero.** Um modelo marcado `isentoDeHabilitacao` com velocidade acima de 32 km/h quebra o build. (Res. CONTRAN 996/2023, art. 2º, §6º: acima de 32 km/h a classificação como ciclomotor é automática.) O campo é opcional, não vai para a tela e nenhum modelo o usa. Ele existe para que, se alguém um dia marcar a isenção sem antes corrigir a velocidade, **o build quebre em vez de a afirmação ir ao ar.**
3. **Claims proibidos**, varridos em todo `src/`: "dispensa CNH", "não cai", "sai emplacada", "economize R$", "ciclo-elétrico" (categoria revogada em 2023)...

A página conduz por benefício e **não discute habilitação**. O gate garante que continue assim depois que eu sair do projeto.

---

## Stack

| | |
|---|---|
| Framework | Astro 5, saída 100% estática |
| CSS | Tailwind 4, tokens em `src/styles/global.css` |
| JS | **Zero framework.** Nada de React, Three.js, GSAP ou Lenis. |
| Conteúdo | Astro Content Collections + Zod |
| Fontes | Archivo + Inter variáveis, self-hosted (43 KB as duas) |
| Hospedagem | GitHub Pages |

**Por que zero JS de framework:** o público primário é entregador em 4G com franquia contada, e o secundário é 60+ com aparelho antigo. Uma LP com 300 KB de JS não perde alguns pontos de conversão nesse público — perde a sessão.

Os efeitos vieram de reactbits.dev, mas **nenhum trouxe a biblioteca junto**: magic-rings, shape-blur, magnet-lines, flowing-menu e scroll-stack foram reescritos em WebGL cru ou CSS puro. Um `<canvas>` de 200 linhas custa menos que a árvore de dependências que o original arrasta.

### Duas regras rígidas do projeto

- **Zero `addEventListener('scroll')`.** Toda animação ligada a rolagem usa `animation-timeline: scroll()`/`view()` ou `IntersectionObserver`. Listener de scroll roda na main thread e trava o dispositivo do público alvo.
- **Contraste é medido, nunca estimado.** Todo par cor/fundo da paleta foi calculado.

### Peso medido

| | |
|---|---|
| HTML + CSS inline (gzip) | 24 KB |
| Fontes | 43 KB |
| Hero AVIF | 68 KB |
| **Primeira carga (iPhone 13)** | **278 KB** |
| Vídeos | `preload="none"` + guard de rede: não contam |

Os vídeos das faixas somam ~2,2 MB de decoração. Com Economia de Dados ligada, ou em 2G/3G, eles **nunca descem** — o poster fica. Ver o guard em [`Base.astro`](site/src/layouts/Base.astro).

---

## O subcaminho `/lp-movvin/`

O Pages serve o site num subcaminho, e **o Astro não reescreve caminho absoluto escrito à mão**: um `/img/x.png` no markup aponta para a raiz do domínio e dá 404 em produção, funcionando só no dev.

Por isso todo caminho passa por [`src/lib/url.ts`](site/src/lib/url.ts):

```
asset('/img/logo.png')   →  arquivo de /public
rota('/suporte')         →  navegação; deixa '#faq' e wa.me em paz
urlAbsoluta(p, origem)   →  canonical, OG, JSON-LD
```

**Quando o domínio próprio existir**, mude `site` e `base` em [`astro.config.mjs`](site/astro.config.mjs), `dominio` em [`site.ts`](site/src/lib/site.ts) e as **duas linhas de `@font-face`** em `global.css` (CSS não enxerga `import.meta.env`; é o único lugar do projeto com o base escrito à mão, e está comentado lá). Nenhum componente muda.

---

## Estrutura

```
site/
  src/
    styles/global.css        design tokens (medidos por pixel)
    lib/site.ts              CNPJ, WhatsApp, garantia + contexto dos CTAs
    lib/url.ts               asset() / rota() / urlAbsoluta()
    content.config.ts        A TRAVA (schema Zod)
    content/modelos/*.json   5 modelos
    layouts/Base.astro       SEO: meta, OG, JSON-LD, IO dos vídeos
    components/
      Header · Hero · Grid · CardModelo · Footer · Logo
      Onda                   ← signature element (aparece 1×)
      Rings · ShapeBlur · MagnetLines · FlowingMenu   ← efeitos, WebGL/CSS cru
      Trabalho · Apoio · Escola · Beneficios · FaixaVideo · Revendedor · Faq
    pages/                   index · revendedor · suporte · nossa-historia · privacidade
  scripts/check-spec.mjs     o gate
assets/                      material-fonte (marca, produtos, mídia, vídeo)
planejamento/                ← 07 tem o registro do que foi construído
```

## Design system

| Token | Hex | Uso |
|---|---|---|
| `--color-mv-green-500` | `#C8F13F` | a marca. Medido do asset, não estimado. |
| `--color-mv-bg` | `#0A0A0A` | fundo da página |
| `--color-mv-logo-black` | `#1A1A1A` | **só** o logo sobre fundo claro |
| `--color-mv-green-800` | `#5F731E` | único verde legível sobre branco (5,31:1) |
| `--color-mv-faq-cinza` | `#DCDFD4` | cards do FAQ |

**A regra que define a página:** o verde-lima sobre branco dá **1,30:1** e reprova até AA-large. Ele só existe sobre escuro (15,19:1) ou como fundo com texto escuro em cima. Botão verde tem label `#0A0A0A`, nunca branco. Isso torna a página dark-first — não por estética, por contraste.

---

## O que falta para o go-live

O que trava a **venda**, não o build:

1. **Preço e parcela** (com CET) + alguém que responda o WhatsApp em menos de 2 minutos. O CTA inteiro depende disso; sem resposta, ele queima a conversão e o número.
2. **Spec de velocidade por modelo**, assinada pelo fornecedor. Os 5 modelos declaram 35 km/h — nessa faixa a Res. 996/2023 classifica como ciclomotor, e a página está correta ao não afirmar isenção. Não adicionar claim sem confirmar a velocidade real de fabricação.
3. **CAT/CSV Denatran.** Sem homologação, ciclomotor não emplaca.
4. **7 campos do CDC sem lugar na tela** desde que a seção "Quem assina" saiu a pedido: `cep`, `sac`, `sacHorario`, `email`, `garantiaAnos`, `garantiaCiclosBateria`, `prazoEntregaPeca`. Não travam o build (não há onde exibi-los), mas continuam exigíveis. O gate avisa a cada build.
5. **Licença dos assets.** Os PNGs têm marcas de terceiros visíveis e podem ser do catálogo do fornecedor. Os vídeos são gerados por IA e trazem watermark — a divulgação no rodapé está ligada por `site.usarVideos`.

Detalhe em [`planejamento/04-perguntas-ao-cliente.md`](planejamento/04-perguntas-ao-cliente.md).

---

## Documentação

| | |
|---|---|
| [`01-estrategia.md`](planejamento/01-estrategia.md) | estratégia original (superada, ver 06) |
| [`02-design-system.md`](planejamento/02-design-system.md) | paleta, contraste, tipografia, geometria da onda |
| [`03-skills-e-direcao-visual.md`](planejamento/03-skills-e-direcao-visual.md) | o que cada skill impõe + direção de arte |
| [`04-perguntas-ao-cliente.md`](planejamento/04-perguntas-ao-cliente.md) | o que falta para publicar |
| [`05-revisao-e-correcoes.md`](planejamento/05-revisao-e-correcoes.md) | revisão adversarial: 56 achados, 28 confirmados |
| [`06-mudanca-de-direcao.md`](planejamento/06-mudanca-de-direcao.md) | a virada para conduzir por benefício |
| [`07-construcao-e-deploy.md`](planejamento/07-construcao-e-deploy.md) | **o registro da construção:** efeitos, mobile, deploy |
