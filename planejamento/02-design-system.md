# MOVVIN — DESIGN SYSTEM EXTRAÍDO DOS ASSETS REAIS

Todos os valores abaixo foram **medidos por amostragem de pixel** (PIL/ffmpeg), não estimados. Onde não pude medir, está marcado como **[NÃO VERIFICÁVEL]**.

---

## 0. TRÊS CORREÇÕES AO BRIEF (medidas, não opinião)

**1. O "degradê branco→verde" do símbolo não existe como degradê de cor.** Tracei a linha de centro do traço a cada 15°: o RGB é **constante** (`#C8F13F` na versão verde, `#1A1A1A` na preta) do início ao fim. O que varia é **só o alpha**, de 24% → 100%. Os pixels intermediários oliva (`#6E8423`) e cinza (`#757575`) que aparecem são **halo de matte do export** — na `3.png` o matte é branco, na `4.png` é preto. É por isso que "parece" branco→verde: você viu o fade sobre fundo branco. Reproduzir como `linear-gradient(white, green)` fica **errado sobre preto**. O correto é ramp de opacidade — detalhe na seção 4.

**2. O preto da marca não é `#000000`, é `#1A1A1A`** (26,26,26), exato, em `2.png` e `3.png`.

**3. Os vídeos têm marca d'água de IA.** Sparkle ✦ de 4 pontas persistente no canto inferior direito em **9 de 10 frames** — marcador Google Veo/Gemini. Ambos os vídeos são gerados por IA. Impacto legal na seção 7.

---

## 1. PALETA — HEX EXATOS

### Cores extraídas dos assets (medidas)

| Token | Hex | Origem medida |
|---|---|---|
| **Verde-lima da marca** | **`#C8F13F`** | 22,6% de `1.png` + 15,2% de `4.png`. HSL 74°, 74%, 60% |
| **Preto da marca** | **`#1A1A1A`** | 29,6% de `3.png`, 19% de `2.png` |

`#C7F03E` aparece como segunda cor — é antialiasing de `#C8F13F`, não é token.

### Cinzas de superfície — **derivados da fotografia dos produtos**

Os pretos das carrocerias medidos têm **cast verde-oliva**, não são neutros: `#373735` e `#2F2F2D` (MVB-01), `#22231E` e `#21221D` (MVT-03), `#121D17` e `#202B27` (MVS-02). Ancorei as superfícies nesse cast (hue ~74, sat muito baixa) para que os recortes PNG **assentem** no fundo em vez de flutuar sobre um cinza neutro.

```
--mv-bg          #0A0A0A   página (mais fundo que o preto da marca = profundidade)
--mv-surface-1   #141613   cards
--mv-surface-2   #1E211C   raised / hover
--mv-surface-3   #2A2E27   
--mv-border      #2E322B   
--mv-border-strong #3F443A 
--mv-logo-black  #1A1A1A   EXCLUSIVO do logo sobre fundo claro
```

### Escala verde

```
--mv-green-50   #F4FCDC     --mv-green-500  #C8F13F  ← MARCA (exato)
--mv-green-100  #EAFAB9     --mv-green-600  #A9CC35
--mv-green-200  #DBF77E     --mv-green-700  #7F9928  (3,24:1 no branco — só UI/large)
--mv-green-300  #D4F45F     --mv-green-800  #5F731E  (5,31:1 no branco — AA texto) ★
--mv-green-400  #CEF34C     --mv-green-900  #3F4C14  (9,31:1 no branco)
```

★ `--mv-green-800` é o **único verde que pode virar texto sobre branco**. Resolvi por busca no eixo V mantendo o hue 73,8° da marca: o primeiro valor a cruzar 4,5:1 é V=49 (`#687D21`); adotei V=45 (`#5F731E`) por margem.

### Cores de estado

Ancorei o `danger` no **vermelho real da carroceria do MVB-01** (medido: hue 4–7°, highlight `#E43C24`) para o erro não brigar com a fotografia de produto.

```
--mv-danger    #FF4536   (hue 5° — mesma família do vermelho MVB-01)
--mv-warning   #FFB020
--mv-info      #4DA3FF
--mv-success   #C8F13F   ← o próprio verde da marca
```

**Nota sobre `success`:** numa marca lima, inventar um segundo verde para "sucesso" cria colisão visual. O verde da marca **já lê como "go"**. Use-o. O custo: sucesso e marca ficam indistinguíveis — aceitável numa LP (não é um app com estados densos).

### O gradiente do símbolo

**Não é gradiente de cor. É ramp de opacidade sobre cor constante.** Medido em `3.png` (394×392):

| Ângulo (0°=3h, horário) | Relógio | Alpha |
|---|---|---|
| 350°→193° | 2:40 → 9:30 | **255 (100%)** |
| 195°–228° | 9:30 → 10:30 | **0 — GAP** |
| 230° | 10:40 | 62 (24%) ← reaparece |
| 270° | 12:00 | 102 (40%) |
| 300° | 1:00 | 186 (73%) |
| 330° | 2:00 | 244 (96%) |
| 350° | 2:40 | 255 (100%) |

Ramp de **120° de arco**. É um "rastro de cometa": o traço nasce a 24% às 10:40, ganha opacidade no sentido horário e satura às 2:40.

---

## 2. CONTRASTE WCAG — PARES SEGUROS E PROIBIDOS

Luminâncias: verde `L=0,7555` · `#1A1A1A` `L=0,0103` · branco `L=1,0`.

### ✅ PERMITIDOS

| Par | Ratio | Veredito |
|---|---|---|
| Verde `#C8F13F` sobre `#0A0A0A` | **15,19:1** | AAA |
| Verde sobre preto marca `#1A1A1A` | **13,35:1** | AAA |
| Verde sobre `#000000` | **16,11:1** | AAA |
| Preto marca sobre verde (botão) | **13,35:1** | AAA |
| `#0A0A0A` sobre verde (botão) | **15,19:1** | AAA |
| Branco sobre `#1A1A1A` | **17,40:1** | AAA |
| `#1A1A1A` sobre branco | **17,40:1** | AAA |
| `#5F731E` sobre branco | **5,31:1** | AA |

### 🚫 PROIBIDOS — regra absoluta

| Par | Ratio | Veredito |
|---|---|---|
| **Verde `#C8F13F` sobre branco** | **1,30:1** | **FALHA TUDO** — reprova até AA-large (3:1) e UI (3:1) |
| **Branco sobre verde `#C8F13F`** | **1,30:1** | **FALHA TUDO** |
| Verde `#A9CC35` sobre branco | 1,85:1 | FALHA |
| Verde `#7F9928` sobre branco | 3,24:1 | Só large/UI — **nunca corpo** |

O aviso do brief está **confirmado e é pior do que "costuma falhar"**: 1,30:1 está a ~3,5× de distância de AA. Não há ajuste de peso ou tamanho que salve.

**Regras operacionais:**
1. Verde-lima **só sobre escuro**. Nunca é texto sobre branco.
2. Botão verde → label **sempre** `#0A0A0A`/`#1A1A1A`. **Nunca branco.**
3. Precisa de verde em superfície clara? → `--mv-green-800 #5F731E` (5,31:1).
4. Verde `#C8F13F` sobre branco só como **preenchimento de área grande** (pílula, bloco) com texto escuro dentro — nunca como tinta.

### Auditoria final de todos os tokens de texto × todas as superfícies

| Token | `#0A0A0A` | `#141613` | `#1E211C` |
|---|---|---|---|
| `text` `#FFFFFF` | 19,80 AAA | 18,20 AAA | 16,29 AAA |
| `text-2` `#A8ADA2` | 8,64 AAA | 7,94 AAA | 7,11 AAA |
| `text-3` `#868A7C` | 5,60 AA | 5,15 AA | 4,61 AA |
| `green-500` | 15,19 AAA | 13,96 AAA | 12,49 AAA |
| `danger` | 5,80 AA | 5,34 AA | 4,77 AA |
| `warning` | 10,83 AAA | 9,95 AAA | 8,90 AAA |
| `info` | 7,54 AAA | 6,93 AA | 6,20 AA |

Nenhum token reprova. `text-3` foi **ajustado** de `#7A8074` (4,48:1 — reprovava por 0,02) para `#868A7C`.

---

## 3. TIPOGRAFIA

### O lettering do logo — medido em `1.png`

| Medida | Valor |
|---|---|
| Wordmark bbox | 446 × 65 px |
| `o` | **70 × 66 px → ratio 1,061** (círculo, ~6% esticado na horizontal) |
| Traço do `o` (corte horizontal) | **16 px de cada lado — idênticos = monolinear, zero contraste** |
| Traço / altura-x | 0,242 → **Bold/ExtraBold** |
| Terminal da haste do `m` | 16,16,16,16,16,16,16,**0** → **corte reto (flat), não arredondado** |
| `i` | banda contínua y=23→86, largura 16 constante → **SEM PINGO (dotless)** |
| Larguras | m=106, o=70, v=73, v=74, i=16, n=66 |

**Diagnóstico:** sans **geométrica, monolinear, bold, caixa baixa, bojos circulares, terminais retos, `i` sem pingo, tracking generoso**. "movvin" não tem ascendentes nem descendentes — por isso o wordmark é um retângulo perfeito.

**Duas correções ao brief:** os terminais são **retos, não arredondados** (medido: largura constante até o corte). E o `i` sem pingo é uma **modificação custom** — nenhuma fonte de prateleira entrega isso.

### Recomendação

**Display — `Archivo` (variável, Google Fonts)**
Eixos `wght 100–900` + `wdth 62–125`. Nos títulos-pôster: `wght 900 / wdth 62–75`. Justificativa: (a) reproduz a condensada pesada caixa-alta das peças; (b) **terminais retos** — mesmo DNA do wordmark medido; (c) uma família cobre título-pôster *e* label normal (`wdth 100`), evitando carregar duas fontes; (d) 1 arquivo variável; (e) diacríticos pt-BR completos (ã õ ç é á).
*Alternativa:* **`Anton`** — match mais literal das peças, mais denso. Custo: peso 400 único, sem eixos; toda hierarquia vira só tamanho.

**Body — `Inter` (variável, Google Fonts)**
Justificativa: (a) altura-x grande e aberturas abertas → **legibilidade para o nicho idoso**, que é requisito de negócio aqui, não preferência estética; (b) **`tabular-nums`** — as specs repetem números em todos os modelos (`1.000 W`, `500 W`, `35 KM/H`) e vão em tabela comparativa: figuras tabulares alinham as colunas; (c) grotesk de terminais retos, harmoniza com Archivo e com o wordmark.

**O logo: não re-tipografar em HTML.** O `i` sem pingo e o stretch de 6% são custom — qualquer fonte web vai renderizar "movvin" com pingo e errado. **Use SVG/PNG.** Se precisar de um "brand voice" tipográfico ao lado do logo, **`Poppins` SemiBold** é o parente mais próximo (`o` circular, monolinear, geométrica, terminais retos) a ~104% de escala horizontal.

---

## 4. O ELEMENTO GRÁFICO ASSINATURA

⚠️ **[NÃO VERIFICÁVEL]** — as peças sociais com a onda em S **não estão no repositório** (só há os 4 arquivos de marca, 7 recortes e 2 vídeos). Não pude medir a curva. O que segue é uma **construção proposta**, derivada da geometria que *pude* medir, não uma extração.

### A proposta: derivar o S do próprio anel do logo

Medi o anel: raio externo 196, **raio interno 138**, espessura 58 → **espessura = 29,6% do raio externo**, linha de centro em r=42,6 (viewBox 100). Se o S-divider for construído com **arcos do mesmo raio da linha de centro do anel**, o elemento gráfico deixa de ser decoração arbitrária e vira **extensão geométrica da marca**. É a diferença entre "tem uma onda" e "tem um sistema".

### Path SVG — ogiva (S) de largura total

```html
<svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true"
     style="display:block;width:100%;height:clamp(56px,7vw,160px)">
  <path fill="#C8F13F"
        d="M0,40 C240,40 480,80 720,80 S1200,120 1440,120 L1440,160 L0,160 Z"/>
</svg>
```

Geometria: começa em (0,40), inflexão em (720,80), termina em (1440,120). O `S` (smooth) reflete a alça (480,80) → (960,80): ambas em y=80 e colineares com o ponto de inflexão, garantindo **tangente contínua** — é isso que faz a curva ler como orgânica e não como duas curvas coladas.

`preserveAspectRatio="none"` é essencial: deixa o S esticar na largura sem engordar o traço.

### Reprodução fiel do símbolo (o ramp de opacidade)

**Anel em CSS** — reproduz o alpha medido ângulo a ângulo. `conic-gradient` começa às 12h; conversão: `ângulo_CSS = ângulo_medido + 90`.

```css
.mv-mark {
  aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(from 0deg,
    rgba(200,241,63,.40)   0deg,   /* medido 270° = 12h, a=102 */
    rgba(200,241,63,.50)  10deg,
    rgba(200,241,63,.62)  20deg,
    rgba(200,241,63,.73)  30deg,   /* medido 300°, a=186 */
    rgba(200,241,63,.90)  50deg,
    rgba(200,241,63,.96)  60deg,   /* medido 330°, a=244 */
    rgba(200,241,63,1)    80deg,   /* medido 350° — satura */
    rgba(200,241,63,1)   283deg,   /* medido 193° — fim do traço */
    rgba(200,241,63,0)   285deg,   /* GAP */
    rgba(200,241,63,0)   318deg,
    rgba(200,241,63,.24) 320deg,   /* medido 230° — renasce a 24% */
    rgba(200,241,63,.40) 360deg);
  /* furo: raio interno medido = 138/196 = 70,4% */
  -webkit-mask: radial-gradient(circle at 50% 50%, #0000 0 70.4%, #000 70.4%);
          mask: radial-gradient(circle at 50% 50%, #0000 0 70.4%, #000 70.4%);
}
```

**Raio: use `#C8F13F` puro sobre qualquer fundo.** Como o fade é alpha, ele se compõe corretamente sobre preto *e* sobre branco — que é exatamente o que o PNG com matte queimado **não** faz.

**O raio, extraído por polígono** (bbox 195×224, vértices confirmados por regressão nas arestas — erro ≤1px):

```html
<!-- viewBox 0 0 100 100 · centro (50,50) · anel r-ext 50 / r-int 35.2 -->
<path d="M52.8,21.2 L47.2,42.6 L74.5,43.6 L44.4,78.3 L52,53.8 L26.3,51.8 Z"/>
```

Validação da aresta ápice→ponta-esquerda: em y=163 o modelo prevê x=137,7; medido **138**. Aresta braço-direito→base: em y=235 prevê 236,5; medido **237**.

---

## 5. TRATAMENTO FOTOGRÁFICO → COMPONENTE WEB

### O que os recortes realmente são (medido)

| Arquivo | Dimensão | Padding | Sombra assada? |
|---|---|---|---|
| mvb-01.png | 1920×1811 | L3 R3 T0 **B2** | **Não** |
| mvb-03.png | 1907×1766 | L0 R2 T0 **B2** | **Não** |
| mvt-03.png | 1869×1446 | L0 R3 T3 **B3** | **Não** |
| mvs-01.png | 1942×1866 | L3 R1 T0 **B3** | **Não** |

Os 3–5% de pixels semi-alpha são **antialiasing de silhueta complexa** (grade do cesto, raios, arames), não sombra. A base de cada PNG **é o ponto de contato do pneu**.

**Consequência de layout — a informação mais útil daqui:** como todo PNG está cortado rente ao contato, **bottom-align num grid coloca todas as rodas na mesma linha de chão automaticamente**, sem offset por produto. E `scaleY(-1)` ancorado na base gera reflexo **fisicamente correto de graça** — a origem do espelho já é o contato. Cuidado: os aspect-ratios diferem, então escale por **altura**, não por largura, senão os produtos ficam de tamanhos incoerentes entre si.

### ⚠️ Franja branca — bloqueador para fundo preto

Medi o brilho dos pixels de borda semi-transparentes:

| Arquivo | mediana | p99 | % > 180 |
|---|---|---|---|
| mvb-01 | 79 | 228 | **7,3%** |
| mvb-03 | 76 | 233 | **10,9%** |
| mvt-03 | 63 | 205 | 3,1% |
| mvs-01 | 79 | 231 | **11,1%** |

Os recortes foram feitos **sobre fundo branco** e ficaram com franja. A mediana é escura (79 = a própria carroceria preta), mas **7–11% da borda é quase-branca** — concentrada na chapa branca/prata (mvs-01, mvb-03). Sobre `#0A0A0A` isso vira **halo luminoso de contorno**. É o principal risco de qualidade visual da página.

Três saídas, em ordem de qualidade:
1. **Defringe de verdade** — erodir o alpha em 1px no export. Mata quase tudo.
2. **Transformar o bug em feature** — glow radial verde/branco atrás do produto ("stage light"). A franja passa a ler como **rim light** intencional. É o que as peças de referência já sugerem com o fundo preto + reflexo.
3. **Não usar `#000000`** — `#0A0A0A` + glow reduz o delta de borda.

### O componente

```css
.mv-stage { position:relative; display:grid; place-items:end center;
            background:var(--mv-bg); isolation:isolate; }
/* 1. luz de palco — também disfarça a franja */
.mv-stage::before{ content:""; position:absolute; inset:0; z-index:0;
  background: radial-gradient(60% 55% at 50% 62%,
              rgba(200,241,63,.16) 0%, rgba(200,241,63,.05) 45%, transparent 72%); }
/* 2. sombra de contato sob os pneus */
.mv-stage::after{ content:""; position:absolute; left:50%; bottom:calc(var(--refl-h,38%) - 6px);
  translate:-50% 0; width:56%; height:22px; z-index:1; filter:blur(12px);
  background: radial-gradient(ellipse at center, rgba(0,0,0,.85) 0%, transparent 70%); }
.mv-stage__img{ position:relative; z-index:2; height:100%; width:auto; }
/* 3. reflexo — scaleY(-1) ancorado na base (correto porque o PNG é rente ao contato) */
.mv-stage__refl{ position:relative; z-index:1; height:var(--refl-h,38%); width:auto;
  transform:scaleY(-1); transform-origin:top center; opacity:.34; filter:blur(2px);
  -webkit-mask-image:linear-gradient(to bottom, rgba(0,0,0,.55), transparent 58%);
          mask-image:linear-gradient(to bottom, rgba(0,0,0,.55), transparent 58%);
  pointer-events:none; }
```

O reflexo é decorativo → `aria-hidden="true"` + `alt=""` na `<img>` duplicada.

---

## 6. TOKENS — BLOCO PRONTO

```css
:root{
  /* ── MARCA (medido nos assets, não alterar) ───────────────── */
  --mv-green:        #C8F13F;   /* 1.png 22,6% · 4.png 15,2% */
  --mv-logo-black:   #1A1A1A;   /* 2.png · 3.png */

  /* ── ESCALA VERDE ──────────────────────────────────────────── */
  --mv-green-50:#F4FCDC; --mv-green-100:#EAFAB9; --mv-green-200:#DBF77E;
  --mv-green-300:#D4F45F; --mv-green-400:#CEF34C; --mv-green-500:#C8F13F;
  --mv-green-600:#A9CC35; --mv-green-700:#7F9928; --mv-green-800:#5F731E;
  --mv-green-900:#3F4C14;

  /* ── SUPERFÍCIES (cast oliva derivado das carrocerias) ────── */
  --mv-bg:#0A0A0A; --mv-surface-1:#141613; --mv-surface-2:#1E211C;
  --mv-surface-3:#2A2E27; --mv-border:#2E322B; --mv-border-strong:#3F443A;

  /* ── TEXTO (todos ≥AA nas 3 superfícies) ──────────────────── */
  --mv-text:#FFFFFF;      /* 19,80:1 */
  --mv-text-2:#A8ADA2;    /*  8,64:1 */
  --mv-text-3:#868A7C;    /*  5,60:1 */
  --mv-text-on-green:#0A0A0A;  /* 15,19:1 — NUNCA branco */

  /* ── ESTADO (danger ancorado no vermelho do MVB-01) ───────── */
  --mv-danger:#FF4536; --mv-warning:#FFB020;
  --mv-info:#4DA3FF;   --mv-success:#C8F13F;

  /* ── GRADIENTES ───────────────────────────────────────────── */
  /* fade do símbolo: opacidade sobre cor constante — NÃO é white→green */
  --mv-mark-sweep: conic-gradient(from 0deg,
    rgba(200,241,63,.40) 0deg, rgba(200,241,63,.73) 30deg,
    rgba(200,241,63,.96) 60deg, rgba(200,241,63,1) 80deg,
    rgba(200,241,63,1) 283deg, rgba(200,241,63,0) 285deg,
    rgba(200,241,63,0) 318deg, rgba(200,241,63,.24) 320deg,
    rgba(200,241,63,.40) 360deg);
  --mv-mark-inner: 70.4%;            /* r-int/r-ext medido = 138/196 */
  --mv-stage-glow: radial-gradient(60% 55% at 50% 62%,
    rgba(200,241,63,.16) 0%, rgba(200,241,63,.05) 45%, transparent 72%);

  /* ── TIPOGRAFIA ───────────────────────────────────────────── */
  --mv-font-display:"Archivo","Anton",system-ui,sans-serif;
  --mv-font-body:"Inter",system-ui,-apple-system,sans-serif;
  --mv-display-wght:900; --mv-display-wdth:68;   /* pôster condensado */

  --mv-step--1:clamp(.83rem,.8rem + .15vw,.94rem);
  --mv-step-0: clamp(1rem,.96rem + .2vw,1.13rem);
  --mv-step-1: clamp(1.2rem,1.1rem + .5vw,1.5rem);
  --mv-step-2: clamp(1.44rem,1.3rem + .9vw,2rem);
  --mv-step-3: clamp(1.73rem,1.5rem + 1.6vw,2.66rem);
  --mv-step-4: clamp(2.07rem,1.6rem + 2.7vw,3.55rem);
  --mv-step-5: clamp(2.49rem,1.7rem + 4.5vw,4.74rem);
  --mv-step-hero: clamp(2.8rem,1.2rem + 8vw,7rem);

  --mv-lh-tight:.92;  /* display caixa-alta condensada */
  --mv-lh-snug:1.15; --mv-lh-body:1.6;
  --mv-track-display:-.02em; --mv-track-eyebrow:.14em;

  /* ── ESPAÇO · RAIO · MOVIMENTO ────────────────────────────── */
  --mv-1:4px;  --mv-2:8px;  --mv-3:12px; --mv-4:16px; --mv-5:24px;
  --mv-6:32px; --mv-7:48px; --mv-8:64px; --mv-9:96px; --mv-10:128px;
  --mv-r-sm:6px; --mv-r-md:12px; --mv-r-lg:20px; --mv-r-pill:999px;
  --mv-ease:cubic-bezier(.22,1,.36,1);
  --mv-dur-1:160ms; --mv-dur-2:280ms; --mv-dur-3:520ms;
  --mv-shadow-1:0 1px 2px rgba(0,0,0,.5);
  --mv-shadow-2:0 8px 24px rgba(0,0,0,.55);
  --mv-glow:0 0 0 1px rgba(200,241,63,.35), 0 8px 32px rgba(200,241,63,.18);
  --mv-focus:0 0 0 3px #0A0A0A, 0 0 0 6px #C8F13F;  /* 15,19:1 */
}

/* Corpo/specs: figuras tabulares alinham "1.000 W" / "500 W" / "35 KM/H" */
.mv-spec{ font-variant-numeric:tabular-nums; font-feature-settings:"tnum" 1; }

/* Display condensado pesado */
.mv-display{ font-family:var(--mv-font-display);
  font-variation-settings:"wght" var(--mv-display-wght),"wdth" var(--mv-display-wdth);
  text-transform:uppercase; line-height:var(--mv-lh-tight);
  letter-spacing:var(--mv-track-display); }
/* destaque 2 cores das peças: <h1>VÁ <em>ALÉM.</em></h1> */
.mv-display em{ font-style:normal; color:var(--mv-green); }

/* GUARDA-CORPO: verde-lima sobre claro = 1,30:1. */
.on-light{ --mv-green-text:var(--mv-green-800); }   /* 5,31:1 — use SEMPRE este */
.btn-primary{ background:var(--mv-green); color:var(--mv-text-on-green); }  /* 15,19:1 */

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:.01ms!important; transition-duration:.01ms!important; }
}
```

---

## 7. OS VÍDEOS

**Metadados (ffprobe):** ambos 1280×720, 24fps, exatamente 10,000s, H.264, **com trilha AAC estéreo**. mvb-01: 3,09 MB · mvb-03: 2,61 MB.

**Conteúdo:**
- **mvb-01.mp4** — urbano/comercial. MVB-01 vermelho+preto. Batidas: (1) close do cesto dianteiro e roda diante de uma loja; (2) pessoa carregando sacolas de compras no bagageiro traseiro; (3) homem pilotando na rua. Luz dourada quente, DOF raso, câmera na mão. Narrativa = **utilidade urbana / entregas**.
- **mvb-03.mp4** — suburbano brasileiro. MVB-03 azul-ciano. Batidas: (1) **senhor idoso** ao lado da bike na garagem de uma casa (telhado de telha, palmeiras); (2) carregando compras, colocando capacete; (3) pilotando em frente ao "MERCADO LOCAL". Narrativa = **autonomia do idoso** — bate exatamente no nicho #1 do brief.

### ⚠️ Dois bloqueadores

**1. Marca d'água de IA.** O sparkle ✦ de 4 pontas aparece em 9/10 frames no canto inferior direito — marcador de geração Google Veo/Gemini. **Os dois vídeos são gerados por IA.** Dá para cortar (fica nos últimos ~75px), mas: remover o marcador de proveniência para apresentar material de IA como filmagem real de produto é **publicidade enganosa** (CDC art. 37 + Código CONAR). O vídeo do idoso é o caso mais sensível — encena um cliente real de um nicho real. Caminhos: (a) **divulgar** ("imagens ilustrativas geradas por IA"), (b) **filmar de verdade**, (c) **não usar**. Decisão do cliente, mas precisa ser consciente.

**2. 720p não aguenta hero full-bleed.** Num hero de 1440–2560px o upscale é de 2–3,5× — vai borrar. Opções: (a) **conter** o vídeo num painel de ~720–960px (fica perto do nativo) — minha recomendação; (b) full-bleed **só com tratamento pesado** (overlay escuro + grain + duotone verde), que disfarça a suavidade e de quebra pode reenquadrar fora da marca d'água.

### Se for usar

```html
<video autoplay muted loop playsinline preload="none"
       poster="/hero-poster.avif" aria-hidden="true" tabindex="-1">
  <source src="/mvb-03.webm" type="video/webm">
  <source src="/mvb-03.mp4"  type="video/mp4">
</video>
```

- `muted` é **obrigatório** para autoplay — e ambos têm áudio: remova (`-an`), economiza bytes e elimina o risco de som.
- `poster` sempre — o vídeo **não pode ser o elemento LCP**.
- `prefers-reduced-motion: reduce` → só o poster. O nicho idoso torna isso relevante de verdade, não checkbox.
- Loop de 10s sem áudio, sem controles, decorativo → `aria-hidden`.

```bash
# tira áudio + marca d'água (crop 8% dir/baixo) + reencoda
ffmpeg -i mvb-03.mp4 -an -vf "crop=iw*0.92:ih*0.92:0:0" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 mvb-03.webm
ffmpeg -i mvb-03.mp4 -an -vf "crop=iw*0.92:ih*0.92:0:0" \
  -c:v libx264 -crf 25 -profile:v main -movflags +faststart mvb-03.mp4
```
Chega em ~600 KB–1,2 MB cada. **Só rode o `crop` se a decisão de divulgação da seção acima estiver resolvida.**

---

## 8. AÇÕES ANTES DE CODAR

1. **Redesenhar a marca em SVG.** Os 4 PNGs têm halo de matte no fade (matte branco na `3.png`, preto na `4.png`) — vão sujar sobre qualquer fundo que não seja o do export. Geometria medida para reconstruir: centro (50,50), r-ext 50, **r-int 35,2**, espessura 14,8, gap 195°–228°, ramp 230°→350°. Path do raio na seção 4.
2. **Defringe nos 7 recortes.** 7–11% da borda é quase-branca (pior: mvs-01 11,1%, mvb-03 10,9%). Sobre `#0A0A0A` vira halo.
3. **Decidir a divulgação de IA** antes de qualquer corte de marca d'água.
4. **Confirmar a letra do MVH-01.** O brief marca "letra a confirmar" e não há asset dessa categoria no repo.
5. **Pedir as peças sociais.** O S-curve da seção 4 é **construção proposta, não extração** — não estão no repositório.

**Não medido / não entregue:** onda em S (peças ausentes), MVB-02/04 e MVS-02 não inspecionados visualmente (só amostrados), MVH-01 sem asset.