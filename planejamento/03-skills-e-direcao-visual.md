## 0. Auditoria de assets (base de evidência, feita antes de opinar)

Sampleei os pixels em vez de confiar no brief. Isso muda três decisões:

| Achado | Evidência | Consequência |
|---|---|---|
| **Lima exata: `#C8F13F`** | cor dominante de `imagens/1.png`, chapada, sem gradiente | é o único accent. Não "verde-limão aproximado". |
| **O escuro da marca é `#1A1A1A`, não `#000`** | `2.png` e `3.png` são 100% `#1A1A1A`/`#1B1B1B` | a própria marca já resolve o veto a preto puro (design-taste §8.B/§9.A). "Preto profundo" = `#1A1A1A`, não `#000000`. |
| **Os produtos NÃO são pretos** | `mvb-01.png` é **vermelho+preto**; `mvs-01.png` é **prata + tubo laranja + banco marrom** com escudo de fabricante OEM visível; `mvt-03.png` é preto com selo vermelho de terceiro + adesivo branco | "produto preto sobre fundo preto com reflexo" é **impossível** com estes assets. E vermelho/laranja/marrom quebram o COLOR CONSISTENCY LOCK (§4.2: um accent, a página inteira). |
| **Os vídeos são LUZ DO DIA, não estúdio** | `.frames/mvb-01_01` = bike vermelha na frente de uma loja; `mvb-03_02` = bike branca, muro de pedra, planta tropical; `mvb-01_03` = homem colocando sacola de compras | o único material de vida real que existe contradiz o moodboard preto. **E tem watermark de 4 pontas (sparkle) no canto inferior direito dos dois vídeos.** |
| **A wordmark contradiz as peças** | `movvin` é **minúscula, geométrica, arredondada, amigável**; as peças sociais são **condensadas, pesadas, caixa alta, agressivas** | não é erro: é o eixo de tensão da marca. Ver §3. |
| **O ícone não é um círculo** | `3.png`: anel **aberto**, com gap, com fade no topo-esquerdo + raio dentro | o anel está *girando* (motion blur) ou *carregando*. Isso é ownable e não está no vocabulário de clichê de IA. |

**Ação imediata antes de qualquer código:** os PNGs são recortes de catálogo OEM com marcas de terceiros. Publicar `mvs-01.png` e `mvt-03.png` como estão coloca logo de concorrente na LP da Movvin. Isso precisa de mascaramento ou de foto nova. Não é detalhe estético, é risco.

---

## 1. Regras acionáveis por skill

### `frontend-design` — a skill governante
- **A regra que decide tudo:** *"where the brief pins down a visual direction, follow it exactly — the brief's own words always win"*. Preto + lima é obrigatório, não opcional. Ver §2.
- Hero é **tese**, não template. "Número grande + label pequeno + stats + gradiente" é a resposta template. Proibido por default.
- **Um único signature element.** Toda a ousadia num lugar; o resto quieto. Regra Chanel: tire um acessório antes de sair.
- Tipografia carrega personalidade. Não usar as famílias que você usaria em qualquer outro projeto.
- **Devices estruturais precisam codificar algo verdadeiro.** `01 / 02 / 03` só se for sequência real. Os nichos da Movvin **não são sequência** → numeração proibida.
- Plano em 2 passos obrigatório: tokens (4-6 hex nomeados, 2+ famílias tipográficas, conceito de layout, signature) → **crítica do plano contra o brief** → só então código.
- Cuidado com especificidade de seletor entre `.section` e `.cta` (paddings que se cancelam).

### `design-taste-frontend` — o corpo de regras mecânicas (é a mais densa; ~90% do checklist real)
Aplicáveis e não negociáveis aqui:
- **Design Read declarado em 1 linha** antes de gerar. Dials explícitos. Minha leitura: *landing de consumo/varejo para 4 públicos brasileiros distintos + ponte B2B, linguagem premium-consumer com energia de rua, tendendo a CSS nativo + tipografia condensada + motion motivado.* Dials: `VARIANCE 7 / MOTION 5 / DENSITY 4`. Motion 5 e não 8: o argumento da marca é **silêncio**, não espetáculo.
- **§9.G ZERO em-dash (`—`)**. Binário. Em PT-BR isso significa: sem travessão em headline, label, botão, legenda ou alt.
- **§4.7 Hero:** headline ≤2 linhas, subtexto ≤20 palavras e ≤4 linhas, CTA visível sem scroll, `pt-24` máximo, **máx. 4 elementos de texto**. Sem faixa de specs, sem strip de confiança, sem tagline abaixo do CTA dentro do hero.
- **§4.7 EYEBROW COUNT (mecânico):** ≤ `ceil(nº seções / 3)`. Página de 9 seções = **3 eyebrows no total**, hero conta como 1. As peças de referência da Movvin são cheias de caps-label. Não replicar seção a seção.
- **§4.9 Spec sheet:** a faixa `DISPENSA CNH E IPVA / MOTOR 1.000 W / 35 KM/H / PAINEL LCD / NFC` é **exatamente o padrão banido** (5 linhas com `border-b` em cada). Usar alternativa: 2 specs herói em display grande + resto agrupado, ou pills scroll-snap.
- **§4.9 Números fake-precisos:** `1.000 W`, `500 W`, `35 km/h` vêm do brief → OK. **Autonomia em km, custo por km, "economize R$X/mês", "X entregas por carga" → PROIBIDOS** até o cliente fornecer. É a tentação óbvia no nicho de entregadores.
- **§9.C:** 3 cards iguais banidos. **§4.7 BENTO CELL COUNT:** 4 nichos = exatamente 4 células. Nada de 5ª célula vazia nem de 6ª "e muito mais".
- **§4.7 ZIGZAG CAP:** máx. 2 seções seguidas de imagem+texto. Com 4 produtos + 4 nichos, o risco de 8 zigzags seguidos é altíssimo.
- **§4.7 Section-Layout-Repetition:** ≥4 famílias de layout distintas em 8 seções.
- **§4.5 NO DUPLICATE CTA INTENT:** "Agende seu test ride" / "Faça um test ride" / "Conheça de perto" = mesma intenção. **Escolher UM rótulo e usar em nav, hero e footer.** Revendedor é intenção diferente → pode coexistir, com um rótulo só.
- **§4.11 Page Theme Lock** + a **cláusula de exceção** que é a chave do projeto (ver §3).
- **§4.2 COLOR CONSISTENCY LOCK** — o problema real está nos produtos vermelho/laranja, não no CSS.
- **§4.4 SHAPE CONSISTENCY LOCK:** um raio, a página toda. A wordmark é arredondada → raio suave, não zero.
- **§5 MOTION MUST BE MOTIVATED:** cada animação justificável em 1 frase. **§5 MARQUEE MÁX. 1.**
- **§9.F:** sem scroll cue, sem `01/04` em tiles, sem strip de decoração no fim do hero (`MOVA. CHEGUE. VÁ ALÉM.` seria exatamente isso), sem dots de status decorativos, sem pill sobre imagem, sem legenda de foto decorativa, sem strip de cidade/hora.
- **§5.D / §14:** proibido `window.addEventListener('scroll')`. `min-h-[100dvh]`, nunca `h-screen`.

### `high-end-visual-design` — usar seletivamente, **rejeitar o núcleo**
- **Aceitar:** veto a Inter/Roboto/Helvetica; veto a `ease-in-out`/`linear` (usar `cubic-bezier(0.32,0.72,0,1)`); `py-24`+; `IntersectionObserver` nunca listener de scroll; animar só `transform`/`opacity`; `backdrop-blur` só em fixed/sticky; grain só em pseudo-elemento fixed `pointer-events-none`; disciplina de z-index.
- **Rejeitar:** o **"Double-Bezel"** (shell + core aninhados com `rounded-[2rem]` em *todo* card) e o **"Button-in-Button"**. São o estilo pessoal da skill, não do brief. Colidem frontalmente com `image-to-code` §16 (anti-nested-box) e com o fato de que a Movvin é uma marca de rua, não um SaaS de OLED. Aplicar Double-Bezel aqui produziria exatamente o "Linear-tier genérico" que estamos tentando evitar.
- **Rejeitar também** o "Ethereal Glass / orbs radiais glow" — é o clichê #2 com outro nome.

### `web-design-guidelines` (Vercel Web Interface Guidelines — busquei as regras reais)
Não é estética, é o piso de qualidade. As que mordem aqui:
- `<img>` com `width`/`height` explícitos (CLS). Below-fold `loading="lazy"`; herói `fetchpriority="high"` + `preload` da fonte crítica com `font-display: swap`.
- `focus-visible:ring-*` em tudo; nunca `outline: none` sem substituto.
- Botão de ação = `<button>`; navegação = `<a>`. Ícone sozinho = `aria-label`. Ícone decorativo = `aria-hidden="true"`.
- **Nunca `transition: all`** — listar propriedades.
- `color-scheme: dark` no `<html>` + `<meta name="theme-color">` batendo com o fundo. (Crítico: sem isso, os inputs do formulário de test ride ficam brancos no Windows.)
- **`translate="no"` em `Movvin`, `MVB-01`, `MVS-02`, `NFC`** — senão o Google Translate destrói a nomenclatura.
- **`&nbsp;` em `1.000&nbsp;W`, `35&nbsp;km/h`** e `tabular-nums` nas colunas de spec.
- `text-wrap: balance` nas headlines (mata viúvas em PT-BR, que tem palavras longas).
- URL reflete estado: se houver filtro de produto/nicho, vai para query param.
- Form: `autocomplete` + `name` significativos, `type="tel"`/`inputmode`, label clicável, erro inline ao lado do campo, foco no primeiro erro, submit **fica habilitado** até a request começar.
- `touch-action: manipulation`, `env(safe-area-inset-*)`.
- **Conflito:** essa skill manda "Title Case for headings/buttons (Chicago style)". **Descartar** — é regra de inglês. Português usa sentence case. Ver §4.

### `brand-guidelines` — **NÃO USAR. É uma armadilha.**
Apesar do nome, é a identidade da **Anthropic** (`#141413`, `#d97757`, Poppins + Lora). Não tem nada a ver com a Movvin. Se alguém invocar essa skill por causa do nome, a LP sai laranja com serifada. **A regra acionável é: ignorar.** O papel dela seria cumprido por um `brand.md` da Movvin, que ainda não existe e que devemos escrever (tokens: `#C8F13F`, `#1A1A1A`, uso do anel, área de respiro do logo, qual variante em qual fundo — repare que existe logo preto `2.png`, ou seja, a marca já prevê superfície clara).

### `theme-factory` — **não aplicável, e a razão importa**
Serve para artefatos **sem** marca (escolher entre "Ocean Depths", "Tech Innovation"...). A Movvin tem marca. `design-taste-frontend` §0.A.5 e §11.C dizem que assets de marca existentes são material de partida, não input opcional. Aplicar um preset aqui seria trocar a marca do cliente por um tema de catálogo. **Único uso legítimo:** o processo de "Create your Own Theme" como formato de entrega dos tokens da Movvin.

### `minimalist-ui` — **incompatível ponto a ponto**
Exige fundo branco/osso, serifada editorial, "nenhum fundo colorido primário", "sem gradientes, sem neon", "sem `rounded-full` em containers grandes", pastéis dessaturados. **Cada uma dessas contradiz o brief.** Salvar apenas 3 regras transferíveis: motion invisível (fade 600ms `cubic-bezier(0.16,1,0.3,1)` via IntersectionObserver), stagger em cascata, e "seções não devem ser fundos chapados vazios".

### `industrial-brutalist-ui` — **incompatível, mas doa o vocabulário certo**
Exige vermelho aviação como *único* accent e `border-radius: 0`. Ambos vetados pelo brief. Mas o **§3.1 Macro-Typography** é o descritor exato das peças da Movvin e deve ser adotado: `clamp(4rem, 10vw, 15rem)`, tracking `-0.03em` a `-0.06em`, leading `0.85`–`0.95`, caixa alta. Também vale o `display: grid; gap: 1px` com fundo contrastante para hairlines perfeitas, e o `clamp()` só na macro-tipografia.

### Extras que li e que mudam a execução
- **`image-to-code`**: manda gerar imagens ANTES de codar. **Não há ferramenta de image-gen neste ambiente** → cai na prioridade 3 do `design-taste` §4.8: usar assets reais + deixar slots `<!-- TODO: foto X, 1600x1200 -->` explícitos e listar o que falta no final. Aproveitar o §16 (anti-nested-box), o §14 (hero calmo, headline 1-3 linhas), o §17 (cortar micro-UI decorativa) e o §27 (**anti-drift**: o código não pode virar genérico depois de um bom plano).
- **`web-artifacts-builder`**: só se virar React multi-componente. Confirma o mesmo veto: sem centralização excessiva, sem gradiente roxo, sem cantos uniformes, sem Inter.
- **`brandkit`**: não é para LP, é para board de identidade. Mas o veto *"generic lightning bolts unless strongly justified"* é interessante ao contrário: o raio da Movvin **é** justificado (veículo elétrico) e já é a marca. E a "Dark Nature / Calm System" (verde profundo + lima + acento calmo) é literalmente descrita como paleta premium legítima. Serve de contra-argumento a quem disser que lima sobre preto é slop.

---

## 2. O clichê: honrar a marca e ainda assim não parecer template de IA

### O erro de leitura que precisa ser feito primeiro
A skill não bane preto+verde-ácido. Ela bane isso **como default**: *"All three are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject."* O pecado é a **falta de causa**, não o hex.

E ela mesma dá a saída: *"Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults."*

Então a instrução operacional é cirúrgica:
- **Eixo cor: TRAVADO pelo brief.** `#C8F13F` sobre `#1A1A1A`. Não negociar, não "dessaturar para ficar sofisticado", não introduzir um segundo accent. Isso desliga os vetos §4.2 (saturação <80%), §9.A (sem accent supersaturado) e a LILA RULE via a própria cláusula de override delas.
- **Eixos LIVRES: tipografia, layout, motion, fotografia, estrutura, copy.** É aqui que 100% do risco de slop mora. **Nenhum deles pode receber o default.**

### O que realmente denuncia IA (e é o que temos que matar)
A cor não é o tell. O **sintaxe** que sempre acompanha a cor é o tell. O template preto+ácido vem sempre com o mesmo pacote:

> hero centralizado · orbs radiais com glow · Inter/Geist com `tracking-tighter` · pill de eyebrow em toda seção · 3 cards de vidro iguais · `01 / 02 / 03` · texto com gradiente · marquee de logos · `Scroll ↓` · números fake-precisos · `—` em toda headline

**Se a Movvin sair com preto+lima E esse pacote, é slop. Se sair com preto+lima e nada disso, é a marca dela.** A cor é do cliente; o pacote é meu. Só o pacote está em julgamento.

### Onde a marca *ganha* o preto (a justificativa que a IA nunca tem)
Um agente genérico usa preto porque "premium". A Movvin tem motivo material, e ele está nos assets: **`#1A1A1A` é a cor real dos produtos** (chassi, banco, cesto, pneu, farol). O preto da página não é fundo, é **continuação do objeto**. Isso é uma razão que nenhuma página gerada por default consegue apresentar.

### O paradoxo que os assets revelam (e que é o ouro)
Aqui está a coisa mais útil desta auditoria: **o moodboard mente sobre o produto.**

1. Os produtos são vermelho, laranja, prata, marrom. Uma página toda preta **esconde o que está à venda**. O clichê não é só feio aqui, é **comercialmente destrutivo**.
2. O único material de vida real que existe (os 2 vídeos) é **luz do dia, rua brasileira, muro de pedra, planta tropical, sacola de compras**. É o oposto do estúdio preto.
3. A wordmark é **minúscula, redonda, gentil**. As peças são **caixa alta, condensada, agressiva**.

O brief é mais rico que o moodboard. O moodboard é o registro **noturno/estúdio** da marca. Mas a Movvin não vive num estúdio: vive na luz de uma rua brasileira, às 7h, indo pro mercado. **A marca tem dois registros e só está usando um.**

### Onde gastar a ousadia
Não na cor (travada). Não em motion cinematográfico (contradiz o argumento de silêncio). **Na composição: no momento em que a noite vira dia.**

`design-taste-frontend` §4.11 trava o tema... **e abre exatamente uma porta:**

> *"The exception: if the brief explicitly calls for a 'Color Block Story' or 'Theme Switch on Scroll' device AND that is a deliberate composition (one full theme switch with a strong transition, not random alternation), it is allowed once per page."*

Uma página gerada por default **nunca** usa essa porta: ela trava dark e vai até o footer. Usar a exceção, **uma vez**, com a onda em S como a linha do horizonte, é: (a) fiel ao brief, (b) derivado dos assets reais, (c) permitido pela regra, (d) estruturalmente impossível de confundir com template.

### O signature element desta página, derivado do mundo da Movvin
Do inventário do mundo real da marca:

| Elemento do mundo | Leitura | Potencial |
|---|---|---|
| Anel **aberto** com fade + raio | roda girando / carga em ~85% | alto, e ninguém usa |
| **Silêncio** do motor elétrico | ausência de ruído e de vibração | altíssimo: justifica MOTION baixo como *argumento*, não como preguiça |
| Onda em S | já é assinatura **da marca**, não da página | médio, ver crítica abaixo |
| Farol LED (todo veículo tem) | luz que revela o preto no preto | médio, colide com veto a cursor custom |
| Acelerador de punho | o gesto que **todo** produto compartilha | alto |
| "Dispensa CNH" | a barreira que a marca remove | alto (conceitual) |

**Crítica importante:** a onda em S **não pode ser o signature da página**. O brief já a define como "elemento gráfico assinatura" *da marca*. Reusá-la é **conformidade de marca, não autoria**. `frontend-design` pede *"the single unique element this page will be remembered by"*. Se a resposta é "a onda que já estava no Instagram deles", não houve design. A onda tem que ser **promovida a outra coisa** para contar.

E o **silêncio** é o insight mais forte porque inverte o gênero inteiro: toda LP de veículo grita (motor, vibração, aceleração, GSAP em tudo). Um veículo elétrico não faz barulho. **Uma página que não se mexe sozinha, e que só se move quando você pede, é um argumento de produto, não uma escolha estética.** E ainda por cima passa por §5 MOTION MUST BE MOTIVATED com folga.

---

## 3. Três signature elements concretos

### Ideia A — "A Virada do Dia" (recomendada)
**O que é:** a página abre no registro noturno da marca (`#1A1A1A`, produto recortado, luz de estúdio, macro-tipografia condensada branca+lima). Exatamente **uma vez**, no ponto de articulação entre "o que é" e "para quem é", a **onda em S vira a linha do horizonte** e a página **amanhece**: o corte em S revela os frames reais dos vídeos, luz do dia, muro de pedra, planta tropical, o cara com a sacola de compras. Da onda para baixo, a página é dia: os nichos, o test ride e a ponte de revendedor vivem na rua, não no estúdio. A lima deixa de ser "neon sobre preto" e passa a ser **a cor da luz**.

A onda em S é promovida de divisor decorativo a **horizonte**: acima dela é o objeto, abaixo é a vida. Uma transição, com peso, `scrub` de scroll, sem repetição.

**Prós**
- Usa a cláusula de exceção do §4.11 de forma textualmente legítima; um agente default nunca chega lá.
- **Resolve o problema comercial**: os produtos vermelho/laranja/prata param de sumir, porque aparecem na luz onde foram fotografados.
- Usa o material que **realmente existe** (os frames de vídeo) em vez de exigir fotos que não temos. Satisfaz §4.8 sem image-gen.
- Barato: um `clip-path` em S + `useScroll`/`animation-timeline: view()`. Sem GSAP, sem pin, sem hijack.
- Dá lugar natural para os 4 nichos (são pessoas na rua, não features num card).
- Justifica os dois registros tipográficos: condensado/caps na noite, wordmark redonda/minúscula no dia.

**Contras**
- É **um** movimento. Se a execução da onda for mole, não sobra nada.
- Os frames têm **watermark de sparkle** no canto inferior direito. Precisa de crop ou de reautoria. Bloqueante.
- Risco de leitura de "seção clara aleatória" se a transição não for forte e única. Mitigação: acontece uma vez, ocupa 100vh, e a onda é o próprio corte.
- `prefers-reduced-motion`: vira corte estático em S, sem scrub. Precisa ficar bom parado.

---

### Ideia B — "O Acelerador"
**O que é:** o argumento do silêncio, materializado. A página é **completamente imóvel** por default: zero ambient motion, zero loop, zero parallax. Nada se mexe até você pedir. No hero existe um único controle: um **punho de acelerador** (arraste/segure, ou seta/espaço no teclado) que é o gesto que todo produto Movvin compartilha. Enquanto você segura, o veículo atravessa os frames do vídeo, o painel LCD acende, o velocímetro sobe até `35 km/h` e para. Você solta, ele desacelera. O copy fecha: você não precisa de CNH; precisa de um punho.

**Prós**
- É o único item da lista que **nenhum concorrente e nenhum template tem**. Risco real e justificável, exatamente o que `frontend-design` pede.
- Transforma MOTION_INTENSITY baixo em **tese** ("motor elétrico não faz barulho; esta página também não") em vez de economia.
- Feedback tátil = §5 "motion motivated" (feedback + state transition) trivialmente satisfeito.
- Amarra `35 km/h` e `dispensa CNH` num mesmo gesto, sem inventar número nenhum.

**Contras**
- **Custo e risco de execução alto.** Feito com `useMotionValue`/`useTransform` fora do ciclo de render (§3.B proíbe `useState` para valor contínuo). Mobile + teclado + reduced-motion = 3 caminhos.
- Beira o gimmick. Se **gatear conteúdo** atrás do gesto, é falha de acessibilidade e de conversão. Regra dura: nunca esconder informação atrás dele.
- Come todo o orçamento de ousadia e **não resolve o problema do preto-no-preto** nem o dos assets de catálogo.
- Descoberta: muita gente nunca vai segurar.

---

### Ideia C — "O Anel de Carga"
**O que é:** o anel aberto do ícone (com o gap e o fade) sai do logo e vira o **índice real dos produtos**, fixo na lateral. Cada veículo ocupa uma posição no arco; clicar navega; o gap do anel é a posição atual; `stroke-dashoffset` acompanha o scroll. O fade do topo-esquerdo do logo vira a "cauda" do movimento, como um ponteiro de velocímetro.

**Prós**
- Derivação **literal e defensável** da marca: usa o gap e o fade que já existem no `3.png`, e ninguém mais os tem.
- É **navegação de verdade**, não decoração → sobrevive a §9.F (proibição de scroll cue) e a "structure is information", porque encoda uma coisa verdadeira: **quantos produtos existem e onde você está**.
- Barato, acessível (`<nav>` + `<a>` reais por baixo do SVG), degrada para lista.
- Amarra logo, ícone e navegação num sistema só.

**Contras**
- **É o mais próximo de virar template.** Anel de progresso de scroll existe aos milhares. Se ler como "progress ring", perdemos.
- **Não é uma tese, é um componente.** Não faz nenhum argumento sobre mobilidade elétrica. `frontend-design` pede um hero que seja tese; isso é chrome de canto.
- Compete com o conteúdo pela lateral e complica o mobile (onde ou vira dock inferior, ou some, e se some não era signature).
- Só funciona se a nomenclatura MV_-0X for realmente navegável, o que exige que a linha de produto esteja fechada (a letra do MVH ainda está "a confirmar").

---

### Recomendação
**A**, sozinha. Matar B e C.

Motivo: só a A é simultaneamente (i) signature, (ii) solução de um problema comercial real (produto colorido invisível no preto), (iii) construída sobre o material que temos de fato, e (iv) uma leitura da marca que o cliente não fez sobre si mesmo. B é mais ousada mas gasta tudo num gesto opcional e deixa o problema dos assets de pé. C é bonita e segura, e "segura" aqui é o próprio risco.

Se o cliente quiser um momento interativo no hero, **B substitui A**, não soma. Regra Chanel.

**E antes de tudo isso, o trabalho que não é signature, é só competência:** um **sistema único de tratamento de produto** (rim-light lima no contorno + sombra de contato + mesma altura de horizonte + máscara nos selos OEM) aplicado aos 7 PNGs. Sem isso, temos 7 recortes de catálogo de fornecedores diferentes fingindo ser uma linha de produtos. Nenhum signature salva isso.

---

## 4. Diretrizes de copy PT-BR

Derivadas de `writing-guidelines` (busquei as regras reais da Vercel), da seção *"More on writing in design"* do `frontend-design`, do §4.9 COPY SELF-AUDIT + §9.D do `design-taste`, e do §29 do `image-to-code`.

### Regras herdadas que valem direto
- **Voz ativa.** Teste: se der para anexar "por macacos" e a frase funcionar, reescreva. *"O test ride é agendado"* → *"Agende seu test ride"*.
- **Segunda pessoa.** `você`, nunca "o cliente", "o usuário", "os brasileiros".
- **Imperativo nos passos.** *"Escolha o modelo"*, não *"Você vai precisar escolher o modelo"*.
- **Frases abaixo de 20 palavras.**
- **Presente.** Sem "irá proporcionar".
- **Sem perguntas retóricas.** *"Cansado do trânsito?"* é a headline mais previsível do Brasil. Proibida.
- **`nós` só para ação deliberada da Movvin** ("recomendamos", "entregamos em X"), nunca como disfarce de "você".
- **Numerais para contagem:** "4 modelos", não "quatro modelos".
- **Rótulo de botão específico:** "Agendar test ride", nunca "Saiba mais" / "Continuar" / "Clique aqui".
- **Erro traz o conserto**, não só o problema: *"Digite um WhatsApp com DDD. Ex.: 11 91234-5678"*, não *"Campo inválido"*.
- **Um rótulo por intenção**, do nav ao footer. O botão diz "Agendar test ride" → o toast diz "Test ride agendado".
- **`…` não `...`**. **Aspas curvas** `"` `"`. **`—` zero.**
- **Sentence case** nos headings. **Descartar a regra de Title Case** da web-interface-guidelines: é regra de inglês; em português Title Case É um erro ortográfico. Caixa alta das peças = `text-transform: uppercase` no CSS, com o texto semântico correto embaixo (importante para leitor de tela e para SEO).

### Banidas em PT-BR (tradução dos vetos + os equivalentes locais)
`revolucione` · `eleve` · `descomplique` · `transforme sua jornada` · `inovador` · `disruptivo` · `next-gen` · `solução completa` · `o futuro da mobilidade` · `venha conhecer` · `não perca` · `imperdível` · `confira` · `apenas` · `simplesmente` · `muito` · `fácil` · `simples` · `rápido` (a regra da Vercel bane `easy/simple/quick` porque pressionam o leitor: *"dispensa CNH"* é fato; *"é fácil, dispensa CNH"* é venda).

**Weasel words:** trocar `significativamente`, `muitos`, `geralmente`, `mais econômico` por número ou por nada. **Se não temos o número, não fazemos a afirmação.**

**Nuance:** *"A revolução elétrica do seu dia a dia"* contém `revolução`, que está na lista. **Mas é copy existente do cliente** → brief wins, usa-se como está onde já existe. O veto vale para **não proliferar** o registro. Uma peça herdada, não um gerador de headlines.

### Tells de IA a caçar no PT-BR
- **Transição-resumo:** *"Agora que você já conhece a linha…"*, *"Com tudo isso em mente…"*. Nunca abrir parágrafo recapitulando o anterior.
- **Frases picadas:** *"Antes era difícil. Agora não é. Isso muda tudo."* → uma frase só.
- **Voz de datasheet:** *"O MVB-01 oferece um motor que proporciona…"* → *"O MVB-01 tem motor de 500 W."*
- **Artefato personificado:** *"a bateria entrega liberdade"* → *"a bateria é removível"*.
- **Trocadilho fofo e errado.** O §4.9 é explícito: *"AI-generated cute copy is worse than boring copy."* Na dúvida, frase funcional chapada.
- **Nome genérico:** nada de "João da Silva" ou "Maria Souza" em depoimento. Nome brasileiro real e específico, com cidade e função (*"Rodrigo Sampaio, entregador, Contagem"*), **e só se o depoimento for real.** Depoimento inventado numa LP comercial não é AI tell, é problema sério.

### Registro e ortografia da marca
- **Um registro por página.** Não misturar mono técnico (`1.000 W · 35 km/h · NFC`), prosa editorial e punch publicitário no mesmo bloco. As peças da Movvin são **punch**; a ficha técnica é **dado**. Separar por seção, nunca dentro do mesmo parágrafo.
- **Unidades:** `1.000 W`, `35 km/h`, `48 V` — espaço (não-quebrável) antes da unidade, unidade em minúscula com `km/h` correto. A peça mostra `35 KM/H`; isso é `text-transform`, não o texto-fonte. `Intl.NumberFormat('pt-BR')` para qualquer número gerado.
- **Nomenclatura:** `MVB-01`, `MVS-02`, `MVT-03` sempre com hífen e caixa alta, sempre com `translate="no"`. **`MVH` fica fora da LP até a letra ser confirmada** — não publicamos uma nomenclatura que o cliente ainda não fechou.
- `lang="pt-BR"` no `<html>`.

### Os quatro nichos: a regra que evita o desastre
A tentação é escrever quatro cards paralelos ("Para idosos / Para entregadores / Para estudantes / Para quem não tem CNH"). Isso é o card-de-persona genérico, e ainda por cima **§9.C bane 3 cards iguais** e §4.7 exige que o bento tenha ritmo.

Além disso: os nichos **não são validados** (o brief diz isso). Então a copy não pode afirmar o que não sabemos. Regra: **nomear a barreira, não a persona.**

- ~~"Para idosos"~~ → **"Três rodas. Você não precisa equilibrar."** (fato do MVT, não rótulo etário; ninguém se identifica como "idoso" numa LP)
- ~~"Para entregadores"~~ → **"Cesto na frente, bagageiro atrás."** (fato visível na foto; **não** invente custo por km)
- ~~"Para estudantes"~~ → **"35 km/h. O suficiente para a escola, não para a rodovia."**
- ~~"Para quem não tem CNH"~~ → **"Dispensa CNH e IPVA."** (a barreira, chapada, sem adjetivo)

Cada uma é verificável nos assets ou no brief. Nenhuma inventa número. E `dispensa CNH e IPVA` é forte demais para virar um card entre quatro: é provavelmente a **subheadline do hero**.

### Ponte para revendedores
Intenção distinta → CTA distinto, um rótulo só, no fim, e **fora do registro de consumo**. A LP inteira fala com quem compra 1; essa seção fala com quem compra 20. Escrever no tom de negócio, não de campanha: *"Quer vender Movvin na sua cidade?"* já é pergunta retórica → **"Seja revendedor Movvin"** + a informação que um lojista realmente quer (região, pedido mínimo, prazo). Se não temos esses dados, o CTA é só um formulário honesto e a seção fica curta. Não inventar termos comerciais.

---

### Slots de imagem que faltam (obrigatório declarar, §4.8 prioridade 3)
1. `MVB-01` e `MVS-01` refotografados **sem selo de OEM de terceiro** (ou máscara/retoque aprovado).
2. Os 2 vídeos **sem o watermark de sparkle** no canto inferior direito.
3. Frames de dia com **rosto e corpo brasileiro** para a seção pós-onda (temos mãos e torsos, não temos gente).
4. Um `MVT-03` na luz do dia (o de catálogo não sustenta a seção de três rodas).
5. Confirmação da letra do `MVH` antes de qualquer menção.

**Arquivos relevantes:** `c:/Users/deeja/OneDrive/Área de Trabalho/lp-movvin/imagens/1.png` (fonte de `#C8F13F`), `.../imagens/3.png` (fonte de `#1A1A1A` e do anel aberto), `.../imagens/mvb-01.png` e `.../imagens/mvs-01.png` (evidência do conflito de cor e dos selos OEM), `.../.frames/mvb-01_01.png` e `.../.frames/mvb-03_02.png` (evidência do registro diurno e do watermark).