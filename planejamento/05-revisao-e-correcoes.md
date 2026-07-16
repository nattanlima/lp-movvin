# REVISÃO ADVERSARIAL — o que foi encontrado e corrigido

Seis lentes independentes (jurídico, acessibilidade, performance, design, SEO/GEO, CRO) revisaram o código **construído**, não o plano. Cada achado passou por um verificador cuja missão era **refutá-lo**.

**56 achados brutos → 28 sobreviveram à refutação.** Os 28 que caíram eram, em geral, comentário de código lido como texto de tela, ou preferência estética disfarçada de defeito.

---

## Os dois erros graves, ambos na tabela onde a Movvin assina como autoridade

### 1. Eu inventei uma linha da lei

A tabela do Anexo I tinha a linha:

```
Capacete | recomendado | recomendado | obrigatório
```

**Essa linha não existe.** Baixei o Anexo I oficial e conferi: a palavra "recomendado" **não aparece em nenhum ponto da Resolução 996/2023**. A norma só trata de capacete no art. 19, V, e só para ciclomotor.

Era uma célula normativa fabricada e atribuída a lei federal, publicada na única seção da página em que a Movvin fala como autoridade. Se um cliente fosse multado seguindo aquela linha, quem tinha afirmado era a Movvin.

**Corrigido:** a tabela agora é transcrição literal do Anexo I — 6 linhas, 4 colunas.

### 2. O link apontava para um PDF que não contém o Anexo I

O art. 20 diz que os anexos são publicados **à parte**. O PDF que eu linkava (`Resolucao9962023.pdf`) termina nas assinaturas. O quadro comparativo está em `Resolucao9962023Anexo.pdf`, arquivo diferente.

A legenda dizia "Fonte: Anexo I da [link]" e o link levava a um documento sem Anexo I.

**Corrigido:** `norma.urlAnexo` aponta para o arquivo certo.

### 3. E o que eu tinha omitido custava dinheiro ao comprador

A tabela suprimia a linha **EQUIPAMENTOS OBRIGATÓRIOS** — a única do quadro que impõe custo:

> Bicicleta elétrica: indicador de velocidade, campainha, sinalização noturna dianteira, traseira, lateral **e nos pedais**, espelho retrovisor do lado esquerdo, pneus em condições de segurança.

**Corrigido:** a linha voltou, literal.

---

## O terceiro erro: uma data falsa em duas páginas

As páginas afirmavam **"Desde janeiro de 2026 a fiscalização da Resolução 996 é real"**.

**É falso.** O art. 22 põe a Resolução em vigor em **3 de julho de 2023** — ela vale há três anos. O prazo de 31/12/2025 que eu tinha registrado como "fim da transição" é outra coisa: art. 14, §1º, I, uma janela para inclusão no RENAVAM de ciclomotores antigos sem CAT. Não é prazo de transição da norma e não tem relação com fiscalização.

**Corrigido** nas duas páginas e no rodapé. O campo `transicaoEncerrada` foi substituído por `vigenciaDesde`.

---

## O que a revisão confirmou que está certo (e mandou não mexer)

**"A CNH categoria B não autoriza ciclomotor"** — a linha mais valiosa da página. Verificada contra fonte primária: o Anexo I traz "Categoria ACC ou A" para ciclomotor, e o CTB art. 143, II define a categoria B como condutor de veículo motorizado *"não abrangido pela categoria A"* — e o ciclomotor, de 2 ou 3 rodas, é abrangido pela A. **A célula da página é idêntica à do Anexo I.**

**A disciplina de contraste de texto passou sem uma exceção.** Os 21 usos de `text-mv-green` caem todos sobre superfície escura. Nenhum verde sobre branco, nenhum branco sobre verde, em toda a base.

**Performance medida, não estimada:** LCP de **552&nbsp;ms** em 360×640 sob 1,6&nbsp;Mbps / 150&nbsp;ms RTT / CPU 4× lenta. O orçamento era 1,2&nbsp;s. **CLS = 0** — e é sólido: os 15 arquivos de imagem foram conferidos byte a byte (header PNG, box `ispe` do AVIF, `VP8X` do WebP) contra os `width`/`height` declarados, e batem exatamente. JS: 4.812 bytes, zero requisição externa.

---

## Acessibilidade: os bugs não estavam no texto, estavam nas camadas que ninguém auditou

**O anel de foco sumia sobre a faixa verde.** `:focus-visible` pintava o outline em `#C8F13F`; a faixa do revendedor é `#C8F13F` chapado. **1,00:1** — foco literalmente invisível, no CTA B2B de maior ticket da página. É a mesma colisão que o projeto inteiro se organizou para evitar no texto, só que na cor do foco. **Corrigido** com `--mv-focus` invertido na faixa.

**A tabela da lei era inalcançável por teclado no celular.** Rola 576&nbsp;px num viewport de 350&nbsp;px e o container não era focável — a coluna "Ciclomotor", que é onde estão os 5 modelos, ficava inacessível. **Corrigido** com `tabindex="0"` + `role="region"`.

**`scrollIntoView({behavior:'smooth'})` furava o `prefers-reduced-motion`.** A spec dá precedência à opção do método sobre o CSS, então o `!important` da media query não alcançava. Quem liga "reduzir movimento" levava um scroll animado de milhares de pixels. **Corrigido.**

**O botão "Ver a linha inteira" se apagava com `innerHTML=''` enquanto estava focado**, jogando o foco de volta ao topo do documento. **Corrigido:** devolve o foco à chip ativa.

**Numeral 1/2/3 da faixa verde em `/45` = 3,02:1.** Reprovava. **Corrigido** para `/70` = 6,4:1.

---

## SEO/GEO

**`og:image` apontava para `/img/og.jpg`, que não existia.** Todo compartilhamento sairia sem imagem. **Corrigido:** gerada a partir do recorte real e da paleta medida.

**O title não disputava nenhuma busca.** Abria com a marca e não continha "CNH" nem "bicicleta elétrica" — os termos que a página inteira existe para responder. Ninguém busca "Movvin". **Corrigido:** intenção informacional na frente, marca atrás.

**"Ver o MVT-03" levava para `#linha`**, o topo do grid, não para o card — os cards não tinham `id`. O usuário clicava num botão que prometia levar a um modelo e tinha que procurá-lo entre cinco. **Corrigido.**

---

## O que ficou em aberto de propósito

**`data-mv-event` sem consumidor.** Os 13 pontos de instrumentação existem no HTML e não há nenhum leitor (zero gtag, zero dataLayer). Isso é deliberado: a decisão de analytics depende de resposta do cliente (Cloudflare Web Analytics sem cookie? Meta Pixel? GTM?). Os ganchos estão prontos; o consumidor entra quando a decisão vier.

**Os 6 CTAs apontam para `wa.me/__PENDENTE__`** no build local. Isso não é bug de produção: é o gate funcionando. `npm run build` recusa publicar enquanto `site.whatsapp` estiver pendente. O `dist/` em disco só existe porque foi gerado com `build:unsafe`.
