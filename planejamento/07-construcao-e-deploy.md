# 07 · Construção e deploy

Registro do que foi construído, por que cada decisão foi tomada e o que deu errado no caminho. Os erros estão aqui de propósito: vários custaram horas e todos são repetíveis por quem pegar o projeto sem contexto.

---

## 1. Os efeitos

O cliente escolheu cinco efeitos do reactbits.dev: **magic-rings**, **shape-blur**, **magnet-lines**, **flowing-menu** e **scroll-stack**.

Nenhum entrou como dependência. Os originais são React e alguns arrastam Three.js — sozinho, ~600 KB. O público primário é entregador em 4G com franquia contada. Baixar meio megabyte de biblioteca para desenhar um anel é gastar o dado do cliente num enfeite.

Todos foram reescritos:

| Efeito | Como ficou | Onde |
|---|---|---|
| magic-rings | WebGL cru, ~200 linhas | `Rings.astro` |
| shape-blur | WebGL cru, `sdRoundBox` em espaço de pixel | `ShapeBlur.astro` |
| magnet-lines | CSS + transform | `MagnetLines.astro` |
| flowing-menu | CSS puro, marquee | `FlowingMenu.astro` |
| scroll-stack | `animation-timeline: view()` | `Faq.astro` |

### Regra rígida: zero listener de scroll

Toda animação ligada a rolagem usa `animation-timeline: scroll()`/`view()` ou `IntersectionObserver`. **Nenhum `addEventListener('scroll')` no projeto.** Listener de scroll roda na main thread: é exatamente o que trava o aparelho antigo do público 60+. Scroll-driven animations rodam no compositor.

### O que deu errado

**ShapeBlur não compilava.** Eu tinha a lógica invertida: WebGL2 aceita ESSL1, mas **não** promove `OES_standard_derivatives`, então `dFdx` simplesmente não existe lá. Resolvido com WebGL1 + extensão + pragma.

**ShapeBlur virou bolha, não borda.** O cálculo `|p-0.5|*4.2 - shapeSize + roundness = 0` com o default 1.2 põe a borda a 31% do card — no meio, não na borda. Reescrito do zero com `sdRoundBox` em espaço de pixel.

**Retângulo verde fantasma.** O halo era cortado na borda do canvas: `exp(-48/22)*0.55 = 0.062` de opacidade sobrando na aresta. Um degrau visível de 15 (medido). Com uma janela aplicada, caiu para 3.

**MagnetLines só animava a primeira instância.** `querySelector` singular. A segunda instância nunca recebia o loop.

**FlowingMenu com z-index trocado:** o label sentava *em cima* da faixa lima e colidia com o texto do marquee.

---

## 2. Mobile

Auditoria ampla da página em tela pequena. **37 achados**, todos corrigidos. Os que importam:

### O hero era ilegível — e nenhum scrim resolvia

A headline media **1,04:1** (branco) e **1,16:1** (lima). O motivo não era falta de sombra: o farol de LED da moto fica **na mesma altura do texto**. Escurecer o fundo o suficiente para o texto passar apagaria o produto.

A solução foi estrutural, não cosmética: **no mobile o layout vira fluxo** (moto em cima, texto embaixo); no desktop continua sobreposto.

| | Antes | Depois |
|---|---|---|
| Headline branca | 1,04:1 | **5,34:1** |
| Headline lima | 1,16:1 | **4,67:1** |

### Não havia navegação nenhuma no mobile

"Conheça a linha", "Nossa história" e "Suporte" eram todos `hidden sm:`. Sobrava logo + "Compre agora" — **duas páginas do site eram inalcançáveis pelo celular**, e o botão ainda cobria a logo.

Resolvido com `<details>`/`<summary>`: é um disclosure nativo, abre e fecha sem uma linha de JS, e vem com papel e estado de ARIA de graça. Um drawer em JS custaria bytes e reinventaria isso pior.

### Outros

- **Faltava um `</div>` no Grid** (bug meu): os cards caíam dentro do flex `min-h-screen`.
- **Alvos de toque:** 10 abaixo de 44px → 1 (o skip link de 1×1, que é a técnica padrão). Rodapé de 20px → 44px, texto de 12px → 14px.
- **Rings nunca voltava** depois de trocar de aba.
- **Guard de rede** (`saveData`/`effectiveType`) nos vídeos: ~2,2 MB que agora nunca descem em 2G/3G ou com Economia de Dados.
- **Thumbs do mobile:** 83 KB → 13 KB.
- **Payload:** 347 KB → **278 KB**.

Resultado final: todas as rotas 200, zero erro de console, desktop confirmado sem alteração.

---

## 3. Erros de conteúdo que quase foram ao ar

Estes são os mais importantes do documento. Todos eram afirmações **falsas sobre lei federal** que eu escrevi com confiança.

**Inventei uma linha da tabela legal.** `Capacete | recomendado | recomendado | obrigatório` não existe no Anexo I. A palavra "recomendado" não aparece em lugar nenhum da Resolução. Eu também linkei o PDF errado (**o Anexo I é arquivo separado** — art. 20: os anexos são publicados à parte) e omiti a linha de EQUIPAMENTOS OBRIGATÓRIOS.

**"Desde janeiro de 2026 a fiscalização é real" era falso.** O art. 22 põe a Resolução em vigor em **3 de julho de 2023**: ela vale há três anos. O 31/12/2025 que eu tinha visto é outra coisa (art. 14, §1º, I: janela para inclusão no RENAVAM de ciclomotores antigos sem CAT) e não tem relação com fiscalização.

**Escrevi todo o conteúdo dos modelos sem acento.**

A lição: as duas primeiras passaram por revisão e só caíram na verificação contra o texto do DOU. Os comentários em `site.ts` registram os dois erros nominalmente para que ninguém os repita.

---

## 4. A linha que eu segurei

Os cinco modelos declaram **35 km/h**. O cliente pediu para manter.

Acima de 32 km/h, a Res. CONTRAN 996/2023 classifica o veículo como **ciclomotor**: registro obrigatório e ACC ou CNH A. Três verificadores independentes tentaram refutar e nenhum conseguiu.

**A página nunca afirma isenção de habilitação. Ela simplesmente não discute habilitação** — conduz por benefício, que foi a direção que o cliente pediu no documento 06. Isso é honesto e é vendável. O que não é possível é 35 km/h **e** "dispensa CNH": essa combinação quebra o build, de propósito, e é a razão de a trava existir.

---

## 5. Organização dos arquivos

```
assets/
  marca/      logo, wordmark, símbolo
  produtos/   PNGs dos 5 modelos
  midia/      midia1..4
  video/      fonte, 41 MB — FORA DO GIT
```

`assets/video/` está no `.gitignore`: são 41 MB de material bruto gerado por IA que todo clone pagaria para sempre, e que vai ser substituído por filmagem real. Os cortes que o site serve estão versionados em `site/public/video/`.

---

## 6. A página parava de responder em 1440px

Relatado pelo cliente num monitor de 2560px: *"por que as coisas estão tão espremidas no centro da tela?"*

Medido com Playwright, e o número explica tudo:

| viewport | container | vazio de cada lado |
|---|---|---|
| 1440px | 94% da tela | 40px |
| 1920px | 71% | 280px |
| 2543px | **53%** | **592px** |

**A página renderizava idêntica em 1440px e em 2543px.** Não havia "layout de tela grande": havia a mesma página com mais preto em volta. A causa não era só o `--mv-largura: 1360px` cravado — era que **toda a escala foi authorada contra uma faixa de 390px a 1440px e saturava dentro dela**:

- `.mv-h1` saturava em 1445,7px. Entre 1440px e 2543px a tela ganha 76,6% e a headline ganhava **0,27%**: caía de 5,8% para 3,3% da largura da tela.
- `.mv-h2` saturava em **1040px**, 400px antes de um laptop comum. Como ela governa Grid, Benefícios, FAQ, Revendedor, Trabalho, Escola, Apoio e as 3 páginas internas, era **ela, e não o hero**, que espalhava a sensação de miniatura pela página toda.
- `.mv-section` (respiro vertical) saturava em 1280px. Medido: 128px em 1440px **e** em 2543px. Ninguém reduziu o espaçamento; a tela cresceu 1103px e o respiro não cresceu 1px, então caiu de 17,8% para 10,1% da largura e **lê** como se tivesse encolhido. A queixa do cliente estava certa; a causa era o valor fixo.
- Ironia medida: a `--mv-goteira` é vw-based e continuava crescendo com o container já parado. De 1440px a 2543px a tela ganhava 1103px e a coluna de texto **perdia 8px**.

E o descompasso que dava o aspecto de "espremido": **toda faixa de cor pinta no `<section>`**, que é block-level e vai até a borda. Então o olho via faixa lima cheia de ponta a ponta com o conteúdo numa coluna no meio.

### O que a análise derrubou

O plano óbvio (subir o `--mv-largura`) teria quebrado três coisas:

1. **O hero pioraria.** A moto é presa pela **altura**, não pelo container: media 1354px em qualquer largura. Ela já está no tamanho máximo que o farol permite — crescer pela largura cortaria 47,4% da imagem e jogaria o farol 139px para fora do quadro. Alargar move só o *texto* para a esquerda, **descolando ele do produto** que ele deveria sobrepor, com o scrim radial apontado para onde o texto não está mais.
2. **Os cards do grid não tinham cap de texto nenhum.** O resto da página protege a medida com `max-w` em ch, mas no `CardModelo` a largura da linha era um acidente da largura do card: alargar esticaria a linha 1,6×.
3. **O FAQ ficaria pior.** O card já era 52% vazio em 1440px (a resposta tem medida travada em 54ch). Herdando 2100px ele iria a 69% vazio.

### Dois comentários do próprio código estavam errados

Medido no browser com a fonte carregada: **"Não precisa ser." dá 6,78em, não "~8em"** como o comentário afirmava — 18% de superestimativa. Pelo número dele a headline já estaria vazando a coluna hoje, o que fez a linha parecer intocável quando tem folga de **1,87×** até o cartão MVS-01.

O mesmo comentário temia "quebra automática em 4 linhas". Com `text-wrap: nowrap` logo abaixo isso é impossível — nowrap proíbe toda quebra. O modo de falha real é o oposto: overflow horizontal.

### O que mudou

Todas as rampas começam **exatamente onde as antigas saturavam, com o mesmo valor**: a curva é contínua e tudo até 1440px continua byte-idêntico ao que foi validado.

| | de | para | 2543px |
|---|---|---|---|
| `--mv-largura` | `1360px` | `clamp(1360px, 88vw, 2100px)` | 83% da tela |
| `--mv-goteira` | teto `2.5rem` | teto `4rem` | 64px |
| `.mv-h1` | satura 1446px | 2ª rampa | 120px |
| `.mv-h2` | satura 1040px | 2ª rampa | 96px |
| `.mv-section` | satura 1280px | 2ª rampa | 176px |
| Grid | 3 col p/ sempre | `3xl:grid-cols-5` | 5×379px, a linha inteira |
| CardModelo | sem cap | `44ch` / `56ch` | linha protegida |
| FAQ | herdava tudo | teto próprio 1600px | 58% vazio (era 52%) |

O breakpoint `3xl` (2100px) teve que ser **registrado no `@theme`**, não usado como variante arbitrária: o Tailwind 4 emite `min-[2100px]:` **antes** dos breakpoints nomeados, então `min-[2100px]:grid-cols-5` perdia a cascata para `lg:grid-cols-3` justamente onde deveria valer.

### Verificado por medição

| viewport | container | h1 | h2 | grid | contraste da headline |
|---|---|---|---|---|---|
| 1440px | 1360px (94%) | 83,2px | 68px | 3×416px | 12,63:1 / 9,69:1 |
| 1920px | 1690px (88%) | 99,1px | 80,2px | 3×518px | 11,69:1 / 8,97:1 |
| 2543px | 2100px (83%) | 120px | 96px | **5×379px** | **19,57:1 / 15,01:1** |

1440px saiu idêntico em todos os campos. Zero overflow horizontal de 390px a 2543px.

**Nota de método sobre o contraste.** A primeira medição usou o pixel mais claro da *caixa* da headline e reprovou tudo (3,52:1). Era falso alarme: o pixel claro existia na caixa mas não embaixo de letra nenhuma. A medição correta fotografa a headline **com e sem texto** e mede só onde os dois diferem, que é onde há glifo. Vale registrar porque o método pessimista quase gerou uma "correção" de um problema inexistente.

---

## 7. Deploy

**GitHub Pages**, push na `main` → [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

O workflow roda `npm run build`, que **passa pelo gate**. Isso é o ponto: se alguém remover o CNPJ ou escrever "dispensa CNH", o deploy falha e a página no ar continua sendo a última versão boa. Nunca trocar por `build:unsafe`.

### O subcaminho

O Pages serve em `/lp-movvin/`, e o Astro **não reescreve caminho absoluto escrito à mão**. Cada `/img/x.png` no markup daria 404 em produção funcionando perfeitamente no dev — o pior tipo de bug.

Criado `src/lib/url.ts` com `asset()`, `rota()` e `urlAbsoluta()`. `rota()` existe separado de `asset()` porque os menus misturam rota interna, âncora e link externo na mesma lista: prefixar `#faq` com o base transformaria "rolar até o FAQ" em "recarregar a home", e prefixar um `wa.me` quebraria o único canal de conversão da página.

Verificado após a migração: **51 assets referenciados, 0 faltando**; todas as rotas 200; nenhum caminho absoluto sem base sobrando no HTML final; âncoras preservadas.

**Exceção única:** as duas linhas de `@font-face` em `global.css` têm o base escrito à mão. CSS não enxerga `import.meta.env`, e `url()` relativo resolveria contra a URL da *página* (que muda entre `/` e `/suporte`) porque o CSS é inlinado no HTML. Estão comentadas lá.

Para migrar ao domínio próprio: `astro.config.mjs` (`site` + `base`), `site.ts` (`dominio`) e essas duas linhas. Nenhum componente muda.
