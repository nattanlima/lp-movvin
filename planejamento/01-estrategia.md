# ESTRATÉGIA FINAL — LANDING PAGE MOVVIN

> **Status de bloqueio:** esta é a estratégia aprovada. **Nenhuma linha vai ao ar** antes de o cliente entregar, por escrito e por modelo, os 5 dados de engenharia (§4.6) e a comprovação de homologação. O documento define a ESTRUTURA; a spec define se ela é publicável.

---

## 1. Posicionamento

**A Movvin é a única marca de mobilidade elétrica do Brasil que te diz, na primeira dobra e modelo a modelo, o que você pode pilotar — e o que a lei exige de cada um.**

Assinatura verbal da marca: **A MOVVIN TE DIZ.**

Por que essa e não outra: num mercado que opera entre a omissão (Aima e MUV não mencionam a lei) e a fraude (marketplace vendendo 2000 W/70 km/h como "bicicleta elétrica"), dizer a verdade é o único território que o concorrente não ocupa sem se acusar. É o único posicionamento com **custo de imitação real** — copiar exige confessar que omitia. E é o único que **melhora** quando a spec for corrigida para 32 km/h; os outros apenas deixam de ser ilegais.

---

## 2. Nicho primário e secundários

### Primário — **Quem compra para trabalhar** (entrega de bairro, primeira renda)
- Único dos 4 nichos que decide por **aritmética**, o formato que mais converte em LP (IBGE/PNAD 2024: 455–485 mil entregadores dentro de 1,7 mi de trabalhadores de plataforma, +18% em 2 anos).
- Único que **absorve a verdade jurídica sem perder a venda**: ACC é custo de ferramenta para ele, não barreira emocional. Para ele, legalidade não é compliance — é faturamento ("moto apreendida é dia sem rodar").
- Inimigo nomeado e com preço que ele já conhece: a **mensalidade do aluguel** (iFood Pedal/Bliv/Mottu, R$ 380–540/mês, para sempre).
- **Ressalva de produção (bloqueia execução, não estratégia):** não existe UM pixel de entregador na biblioteca. O MVS-02 tem um PNG vermelho de catálogo OEM (emblema de terceiro na carenagem, "SPRAND" no pneu, upscale) e um vídeo IA de uma moça em frente a uma escola. Enquanto não houver footage, o hero deste nicho é **crop fechado + tipografia**, não cena.

### Secundário forte — **60+ e o filho que decide a compra**
Maior defensabilidade (ninguém disputa esse público), menor conversão (o 60+ não compra self-service). **Produto de enquadramento mais frágil da linha inteira**: triciclo não pode ser "bicicleta elétrica" (a definição exige 2 rodas) e provavelmente estoura os 70 cm do autopropelido. Trata-se como **ciclomotor até prova dimensional em contrário**.

### Terciário — **Jovem / estudante**
Só existe como MVB-01 pedal-assistido, sem acelerador, travado em 32 km/h. É o único produto com rota legal para menores de 18 (a ACC exige 18 anos completos). **Imagem de marca, não conversão.** Sem hero, sem oferta, sem CTA próprio.

### **NÃO É NICHO** — "Pessoas sem CNH" → rebaixado a **atributo por modelo**
Três motivos: (a) 100 milhões de pessoas não segmentam nada — sem dor, linguagem ou canal comuns; (b) a reforma da CNH de dez/2025 derrubou o custo de R$ 3.215 para ~R$ 700–800, a barreira está evaporando; (c) na spec atual o produto exige habilitação de qualquer forma.

### B2B — **Revendedor com ponto já existente** (bicicletaria, oficina de moto, loja de peças)
Ticket alto, ciclo curto, e resolve as duas maiores objeções do consumidor de uma vez: assistência perto de casa + ajuda para emplacar.

---

## 3. Arquitetura de mensagem

### Hero

**Headline:**
> ## COMPLICADO, NÉ? NÃO PRECISA SER.

**Subheadline:**
> Cada Movvin tem a classificação legal escrita no card. Você vê o modelo, vê o que ele faz e vê o que a lei exige dele — antes de falar com qualquer vendedor.

**CTA primário:** **Achar a minha Movvin** (seletor de 1 pergunta, 1 tela, resultado instantâneo)
**CTA secundário:** **Ver a linha inteira** (escape hatch, mesmo peso visual, zero atrito)

**CTA de fechamento (aparece no RESULTADO do seletor, não no hero):** **Ver a parcela no WhatsApp** — com a mensagem pré-montada pelo próprio seletor:
`"Quero a MVB-01 — uso trabalho — não tenho CNH — [cidade]"`

**Test ride:** rebaixado a terciário e **condicionado**. O botão só existe em cidades onde há endereço. Sem endereço, sem botão. Se o veículo for ciclomotor, test ride só em área privada/fechada.

### Por que o hero muda da headline da proposta vencedora

`CADA UM ANDA DE UM JEITO. ACHA O SEU.` é "Find Your Ride" traduzido — já foi de Nike, de Havaianas, de operadora de celular. O mecanismo era 9, a embalagem verbal era 6. O dispositivo `___, NÉ? NÃO PRECISA SER.` é a única sintaxe **ownable** de todo o material: registro coloquial brasileiro, ritmo de dois tempos, cabe em display condensada sobre preto, e **escala infinitamente**:

- Hero: *"Complicado, né? Não precisa ser."*
- Resultado trabalho: *"Aluguel, né? Não precisa ser."*
- Resultado 60+: *"Depender de alguém, né? Não precisa ser."*
- Seção legal: *"Multa, né? Não precisa ser."*

Mecanismo da proposta 2 + voz da proposta 1. É o enxerto central desta síntese.

### O seletor — regras duras de execução

1. **Uma pergunta, uma tela.** Sem formulário, sem e-mail, sem "passo 1 de 4". 4 chips grandes, resposta em 1 toque, resultado instantâneo na mesma tela.
2. **Não é gate.** Todo o conteúdo continua abaixo para quem só rola. O seletor filtra o grid; não esconde a página.
3. **Escape hatch permanente** com o mesmo peso visual.
4. **Máximo 4 opções.** "Sem CNH" não é pergunta — é o **resultado** que o seletor devolve.
5. **Estado na URL** (`?uso=trabalho`) — a mesma LP serve 4 campanhas sem 4 páginas, o anúncio cai direto no bloco certo com scroll-to.
6. **Resultado em 3 blocos fixos, mesmo esqueleto para todo modelo:** *o que é / o que ela faz / o que a lei exige dela*. É isso que impede a página de virar 4 LPs coladas.
7. **A última pergunta é "Você tem CNH ou ACC?"** — e ela filtra de verdade.

### ⚠️ O ESTADO VAZIO — a correção que salva o mecanismo

Na spec de 35 km/h, **todos** os modelos são ciclomotor. Quem responde *"não tenho nada"* recebe **grid vazio**: o mecanismo que É a tese devolve "não temos nada pra você" justamente ao público que o cliente listou como nicho 4.

**Solução:** quem responde "não tenho nada" **não vê um beco — cai na seção da ACC.**

> ## ACC, NÉ? NÃO PRECISA SER UM BICHO DE SETE CABEÇAS.
> A ACC é a autorização para conduzir ciclomotor. **20h teóricas + 10h práticas** — metade da carga horária da CNH de moto. Exige 18 anos, documento de identificação, exames médico e psicotécnico, e prova teórica e prática. Não é a mesma coisa que CNH A.

Custo operacional dessa seção: **zero**. É texto sobre uma norma pública — não exige asset, estoque, rede nem footage. O que a Movvin não consegue entregar em produto, ela entrega em informação, que é a única coisa que ela tem de sobra hoje. É também o que faz o mecanismo **degradar com elegância** em vez de quebrar.

---

## 4. Tratamento de CNH / IPVA

### 4.1 REGRA ZERO — redação executória, para anexar ao contrato como condição suspensiva

> **Enquanto a spec for 35 km/h, a expressão "DISPENSA CNH E IPVA" não aparece na página. Em lugar nenhum, em tamanho nenhum, com asterisco nenhum.**

Não é ajuste de copy — é decisão de produto que precede o design. Art. 2º, §6º da Res. CONTRAN 996/2023 é automático e literal: acima de 32 km/h o veículo *"deve ser classificado como ciclomotor"*. O Anexo I da própria norma manda, para ciclomotor: **REGISTRO E EMPLACAMENTO: Obrigatório / HABILITAÇÃO: Categoria ACC ou A**. A norma que a Movvin precisaria invocar para dizer "dispensa CNH" é a que diz, em tabela, o contrário.

**O gargalo é a VELOCIDADE, não a potência.** 1.000 W está dentro do limite de bicicleta elétrica. Reduzir potência não resolve nada — o MVB-01, mesmo com 500 W, também é ciclomotor a 35 km/h.

**Disclaimer de rodapé não salva e agrava.** CDC art. 37, §3º trata omissão de dado essencial como enganosidade; art. 30 diz que a oferta vincula; o Código CONAR é explícito: *"um anúncio enganador não pode ser defendido com base no fato de o Anunciante ter posteriormente fornecido ao Consumidor as informações corretas."* Se o cliente pedir "põe só um asterisco", a resposta técnica é **não**.

### 4.2 As duas linhas — naming corrigido

| | **LINHA LIVRE** | **LINHA FORTE** |
|---|---|---|
| **Badge no card** | `LINHA LIVRE · até 32 km/h · Res. CONTRAN 996/2023` | `LINHA FORTE · ciclomotor · exige ACC ou CNH A + placa` |
| **Copy** | "Ela para nos 32 km/h porque é o limite da lei. Aí você não precisa de CNH, não emplaca e não paga IPVA." | "Essa aqui é mais robusta — e por isso emplaca. Precisa de placa e de ACC: metade da carga horária da CNH de moto." |
| **Rotas admitidas** | (a) **bicicleta elétrica**: pedal assistido funcional, **PROIBIDO acelerador**, ≤1.000 W, ≤32 km/h, sem limite de tamanho. (b) **autopropelido**: acelerador permitido, pedais dispensados, ≤1.000 W, ≤32 km/h, **largura ≤70 cm E entre-eixos ≤130 cm**. | Tudo o mais. |

**Correção de naming vinda do julgamento de marca:** era "LINHA PLACA". Batizar o produto pelo ônus é erro — "Livre" é aspiracional, "Placa" é cartório, e é exatamente onde estão o MVT-03 e o MVH-01, os produtos de **maior margem e maior desejo**. "LINHA FORTE: mais robusta, por isso emplaca" mantém 100% da verdade jurídica e devolve dignidade ao lado caro do catálogo.

**As duas rotas da Linha Livre são INCOMPATÍVEIS entre si.** Acelerador + entre-eixos convencional = ciclomotor mesmo a 32 km/h e 1.000 W. Pedal decorativo + acelerador (padrão do importado chinês) não é bicicleta elétrica. É preciso escolher **uma rota por modelo**.

### 4.3 IPVA — formulação exata

**Escrever (só na Linha Livre):**
> Bicicleta elétrica não é veículo automotor. Logo, não há CNH, não há placa e não há fato gerador de IPVA.

**Nunca escrever:** "isento de IPVA", "dispensa IPVA", ou qualquer promessa fiscal genérica. IPVA é estadual e diverge em 27 unidades federativas. Em SP, a isenção de 2026 cobre só combustão até 180 cc — **ciclomotor elétrico continua pagando**. Na LINHA FORTE, "sem IPVA" é simplesmente falso, ponto.

### 4.4 A prova documental na página

Publicar o **Anexo I da Res. 996/2023 como tabela**, com a data de vigência na tela e a fonte nominal. Custo zero, e é o gesto de boa-fé objetiva mais eficaz disponível: torna a informação verificável no ato, esvazia a alegação de omissão do art. 37, §3º e **neutraliza preventivamente o gatilho "deveria saber" do art. 67** ao demonstrar que a norma foi lida e exibida.

### 4.5 O argumento que vende a mudança de spec ao cliente

> **32 km/h é o limite da lei. Os 3 km/h a mais que o mercado te vende custam ACC, placa, licenciamento anual, capacete e IPVA. Não vale.**

**35 km/h não é performance — é uma conta aberta.** A Aima entrega 1.000 W a 32 km/h no T1: dá para engenheirar. A Movvin está 3 km/h fora e paga por isso com a perda integral do claim que é o eixo comercial da campanha.

### 4.6 Os 5 dados que travam a página (por modelo, assinados pelo fabricante)

1. Velocidade máxima **de fabricação** real e se há limitador eletrônico (Art. 3º, I e Art. 4º, I exigem indicador e/ou limitador)
2. Tem acelerador ou variador manual de potência?
3. Os pedais são **funcionais** ou decorativos? O motor funciona sem pedalada?
4. Largura em cm
5. Distância entre eixos em cm

**Condição de aprovação da LINHA LIVRE:** nenhum modelo entra nela sem ficha técnica **assinada** pelo fabricante cobrindo os 5 dados, anexada ao contrato de fornecimento **com cláusula de regresso**. Nomear uma linha por status jurídico transfere para a Movvin o risco integral do enquadramento — aceitável só com lastro documental oponível ao fornecedor.

**Hipótese de maior alavancagem do projeto inteiro, e a primeira pergunta a fazer:** os "35 KM/H" repetidos **idênticos** em modelos de potências diferentes (500 W no MVB-01, 1.000 W nos demais) cheiram a texto copiado de catálogo de fornecedor, não a medição. Há chance concreta de o produto já ser 32 km/h — e o problema ser trivial.

### 4.7 Bloqueadores de informação obrigatória (art. 6º, III e art. 31 — autuáveis por si só)

Preço ou faixa de preço · condições de parcelamento **com CET** · garantia em anos e ciclos · rede de assistência com endereço · razão social · CNPJ · endereço físico · canal de SAC.

---

## 5. Matriz nicho × modelo × dor × promessa × prova

| Nicho | Modelo | Dor | Promessa | Prova (o que temos HOJE) |
|---|---|---|---|---|
| **Trabalho / entrega de bairro** (primário) | MVS-02 · alternativa de raio curto: MVB-01 | Paga R$ 380–540/mês de aluguel e no fim de 2 anos não tem nada. Sem CNH A nem consegue alugar. Medo real não é gasolina — é ficar parado. | *"Aluguel, né? Não precisa ser."* Aluguel você paga pra sempre; essa aqui uma hora é sua. | Badge de enquadramento no card + a linha **"moto apreendida é dia sem rodar"** + garantia da bateria em **anos e ciclos** por escrito + prazo de peça + endereço da assistência. **Sem número** de autonomia, custo/km ou "economize R$ X" até ficha técnica assinada. |
| **60+ / autonomia** (secundário forte) — duas vozes | MVT-03 | Deixou de sair de casa. Depende do filho pra farmácia, mercado, médico. E o filho carrega a culpa. | Para o filho: *"Ela não precisa esperar você pra ir na farmácia."* Para ele: *"Você não pede carona pra ninguém."* **Nunca a palavra "idoso" na tela.** | Vídeo mvb-03 **só se** a divulgação de IA for resolvida antes (ver §8). Ponto de apoio na cidade + acompanhamento no emplacamento. **TRAVA:** enquanto a largura do MVT-03 não for medida, esta seção não contém **uma única palavra** sobre CNH. |
| **Jovem / estudante** (terciário, imagem) | MVB-01 | Depende do busão, do horário, da carona. Não tem 18 anos. | *"Pedala e ela ajuda."* Suficiente para a escola, não para a rodovia. | Caloi Mobylette: 350 W, com pedais, dentro da Res. 996, R$ 9.199, **primeiro lote esgotado em 24 h**. Prova de que produto legal vende. **Se o MVB-01 tiver acelerador, este nicho sai da página inteira.** Sem hero, sem oferta. |
| **Sem CNH** (atributo, não nicho) | — | Acha que a habilitação é a barreira. | Nenhuma promessa de marca. Vira o **resultado** do seletor + a seção da ACC. | Anexo I da Res. 996 publicado como tabela na página. |
| **Revendedor com ponto** (B2B) | Linha inteira | É ele quem toma o processo na cara quando o cliente é multado. | *"Venda o que você pode garantir."* | Enquadramento declarado por modelo, por escrito. |

**MVH-01 fica FORA da página** até a letra da categoria e a spec serem confirmadas. **MVB-03 e MVB-04 não entram no grid nem no seletor** — não constam da nomenclatura do cliente, e oferta sobre produto não confirmado é CDC arts. 30, 35 e 39, IX.

---

## 6. Tríades de adjetivos por modelo

Padrão da marca: **3 palavras, caixa alta, display condensada, ponto final entre cada uma.** Duas descritivas + uma que declara a classe. A terceira palavra é sempre a assinatura da linha — é o que torna a tríade um sistema, não um enfeite.

| Modelo | Tríade | Linha |
|---|---|---|
| **MVB-01** | `LEVE. DISCRETA. LIVRE.` | LIVRE *(condicionada a: pedal assistido, sem acelerador, 32 km/h)* |
| **MVB-02** | `URBANA. DIRETA. LIVRE.` | LIVRE *(condicionada)* |
| **MVS-01** | `COMPACTA. ESPERTA. LIVRE.` | LIVRE *(condicionada a: ≤32 km/h, largura ≤70 cm, entre-eixos ≤130 cm)* |
| **MVS-02** | `ROBUSTA. DE TRABALHO. FORTE.` | FORTE |
| **MVT-03** | `TRÊS RODAS. DE APOIO. FORTE.` | FORTE |
| **MVH-01** | *(fora da página até letra e spec confirmadas)* | — |

**Tríade institucional da marca (assinatura de página):**
> ## SILENCIOSA. INTELIGENTE. 100% ELÉTRICA.

**Tríade de posicionamento (a que carrega a tese):**
> ## CLARA. CLASSIFICADA. SUA.

**Regra de sistema:** a terceira palavra **nunca** é adjetivo livre — é sempre `LIVRE.` ou `FORTE.`. É o que faz o cliente sair da página sabendo que a Movvin tem duas linhas, e não oito produtos.

---

## 7. Ponte para revendedores

**Formato:** faixa única de contraste invertido — **verde-lima chapado sobre o preto da página, com a onda em "S" da identidade como o próprio corte**. Imediatamente antes do rodapé, depois de todo o conteúdo B2C consumido. No header, **no máximo um link de texto** — nunca um botão com o peso do CTA principal.

> ## VENDA ELÉTRICO SEM VENDER PROBLEMA.
>
> A gente te diz o que você pode vender, do mesmo jeito que diz ao seu cliente o que ele pode pilotar. Desde janeiro de 2026 a fiscalização da Resolução 996 é real — e quem toma o processo na cara é você. Cada Movvin chega na sua loja com o enquadramento legal declarado no papel.

**3 provas — só três, sem formulário na LP:**
1. **"Comece com 3 unidades. Sem taxa de franquia, sem royalties, sem obra."** — o número explícito e baixo qualifica e desqualifica sozinho, e é o que separa a Movvin da franquia Shineray (R$ 450 mil a R$ 1 mi+) na mesma busca.
2. **"Enquadramento legal declarado por modelo, por escrito."** — a lacuna que Watts, Aima e Shineray deixam aberta. Watts chega perto ("homologados DENATRAN") e enterra na 10ª seção, depois do FAQ.
3. **"Treinamento e material de venda prontos."** — substituiu a terceira prova original. Ver §8.

**CTA:** *"Quero representar a Movvin"* → `/revendedor`. Nada de formulário completo na LP: mata o fôlego da página B2C.

**Alvo do pitch:** **não** é quem quer abrir loja do zero. É o lojista que **já tem ponto** — bicicletaria, oficina de moto, loja de peças — e quer agregar linha elétrica sem espaço exclusivo. Insight roubado da Watts, e é o que derruba a barreira da franquia pesada.

**Página `/revendedor`** — ordem validada em Watts e Shineray (a Aima inverte, pede CNPJ antes de dar motivo, e é a mais fraca):
headline de oportunidade → contexto de mercado (2 números, **sempre citando Aliança Bike nominalmente e com a data na tela**: "R$ 511 milhões/ano" + "quase metade das lojas do país ainda não vende elétrica") → **6 cards** (margem · entrada · território · **garantia/RMA** · treinamento · marketing — garantia e território são os dois que **nenhum** concorrente responde) → prova social numérica → FAQ de qualificação → formulário.

**Formulário, 5 campos:**
`Nome | WhatsApp | Cidade/UF | Já tem ponto comercial? (loja de bike / oficina de moto / outro ramo / ainda não) | Quantas unidades pretende começar? (3–5 / 6–10 / 10+ / quero entender antes)`
Sem CNPJ, sem CNAE, sem faturamento no primeiro toque — isso se pega na call.

**O material de revenda é o MAIS conservador da página, não o mais agressivo.** Pelo CDC (arts. 18 e 30) o revendedor herda responsabilidade solidária pela oferta que veicula. Revendedor autuado abandona a marca.

**Encaixe com a tese:** o revendedor é a única prova que sustenta a seção do consumidor. Ele resolve as duas maiores objeções de uma vez — assistência técnica perto de casa e ajuda para emplacar. A rede não é apêndice comercial da página; ela é a prova.

---

## 8. O que NÃO fazer

**Vetos jurídicos (inegociáveis):**
1. **"DISPENSA CNH E IPVA" + "35 KM/H" na mesma página.** CDC arts. 37, 66 e 67 — detenção de 3 meses a 1 ano para dirigentes, e uma base de clientes multados em R$ 880,41 com 7 pontos e remoção ao pátio.
2. **"ELA NÃO CAI" / "NÃO PRECISA EQUILIBRAR"** — veto transversal, aparecia nas 3 propostas. É garantia absoluta de **segurança** (a palavra está literalmente no art. 66), dirigida a consumidor hipervulnerável (art. 39, IV), sobre um produto que **tomba em curva**. No primeiro acidente é a prova documental da vítima, e a responsabilidade pelo art. 12 é objetiva. **Substituir por:** *"Três rodas: apoio permanente, sem necessidade de equilibrar na parada."* — descrição factual, sem promessa de resultado, com advertência de uso ostensiva na forma do art. 9º.
3. **"Sai emplacada, com nota"** — afirmação de fato sobre homologação que a pesquisa declara não confirmada. Art. 30 vincula, art. 35 permite exigir cumprimento forçado, art. 20 dá vício de serviço. Sem CAT/CSV confirmado, não se promete emplacabilidade.
4. **"Os leads da sua região são seus."** — as 3 propostas escrevem isso. Não existe região, não existe roteamento, não existe rede. É a promessa que corroeu a Voltz (R$ 335,1 mi de dívida, recuperação judicial) e é a única frase do lote que cria passivo com o público que herda responsabilidade solidária. **Uma marca sem rede não promete rede.**
5. **Remover o watermark do vídeo mvb-03** para passar material de IA por filmagem real de produto. Publicidade enganosa (CDC art. 37 + CONAR). Três saídas: declarar "imagens ilustrativas geradas por IA", filmar de verdade, ou não usar. Não existe quarta.
6. **BB Crédito Acessibilidade e consignado INSS** — excisão total, não condicionamento. Abre frente de publicidade de crédito consignado a idoso (Bacen, Procon, MPF). E o BB Crédito Acessibilidade exige laudo médico de deficiência: não atende "todo idoso".
7. **"A gente te acompanha no processo da ACC"** — só publicar se o serviço existir, com escopo descrito e limites declarados. É oferta de serviço e vincula pelo art. 30. Caso contrário: **informação pura sobre o que é a ACC, sem verbo de compromisso.**
8. **Art. 18, III** (equipamentos para pessoa com deficiência ou comprometimento de mobilidade) como claim genérico para o público 60+. Porta estreita, exige laudo e parecer jurídico próprio. Não vira headline.
9. **A exceção dos 45 km/h.** Só uso esportivo, em estrada/rodovia ou competição, com autorização do órgão viário — e ainda assim exige pedal assistido sem acelerador. Nenhum uso urbano se enquadra.
10. **"Ciclo-elétrico".** Categoria da Res. 315/2009, **revogada**. Não existe desde 2023 — e, ironicamente, também levava a ciclomotor. Vocabulário correto e único: *bicicleta elétrica / equipamento de mobilidade individual autopropelido / ciclomotor*.

**Vetos de negócio:**
11. **Publicar qualquer número sem lastro** — autonomia em km, custo/km, "economize R$ X/mês", entregas por carga. Todas as fontes disponíveis são de vendedores de elétricos e divergem entre si. O setor já é minado de reclamação de autonomia real ~50% da prometida e bateria morrendo em 1 ano (Reclame Aqui: Edeltec, C-MOBI, Ecobikes, Biciclete).
12. **Liderar com "sem CNH".** É literalmente o título que o seller anônimo do Mercado Livre usa. Coloca a Movvin no mesmo balde retórico e destrói o premium que a identidade visual constrói.
13. **O território "LIBERDADE".** Sousa Motos já usa "Liberdade para todos". Commodity.
14. **Posicionar como "troque sua moto".** 1.000 W e 35 km/h não competem com uma CG 160 em produtividade. Adequação ao fim (art. 18) + indução a erro sobre utilidade (art. 37, §1º).
15. **Publicar os PNGs como estão.** São recortes de catálogo OEM com marcas de terceiros visíveis: ideograma chinês vermelho e adesivo de fábrica no MVT-03, dois brasões no MVS-01, "RSE" no MVB-04, "SPRAND" no pneu do MVS-02. Publicar coloca a marca do fornecedor na LP da Movvin e entrega o OEM. O MVS-02 é upscale inutilizável. E os produtos pretos **somem** sobre o preto da marca — o formato "produto sobre preto com reflexo" das peças de referência **não sobrevive à biblioteca real**.
16. **Calculadora de economia publicada.** Ver §9, conflito 3.
17. **CTAs de peso igual no header.** Causam paralisia e derrubam a conversão principal.

---

## 9. Conflitos resolvidos

### Conflito 1 — Conversão (5,5) contra Marca (8,5), Jurídico (8) e Realismo (7,5) sobre o seletor

**A divergência:** CRO argumentou que "Achar a minha Movvin" gasta o pico de intenção — a chegada — num mecanismo que não captura lead, e que a pergunta "você tem CNH ou ACC?" é um **desqualificador voluntário antes da oferta**: a página encolhe o catálogo na frente do visitante e o faz sentir excluído antes de desejar. Elegante juridicamente, suicida comercialmente.

**Decisão: o seletor fica, mas deixa de ser o destino — vira o formulário de qualificação que antecede o WhatsApp.**

O CRO tem razão em que filtro não converte. Mas a solução dele (CTA de parcela no hero) tem um custo que ele não viu: anunciar parcela dispara o **CDC art. 52** (preço à vista, juros de mora, taxa efetiva anual, número e periodicidade das prestações, soma total a pagar) e as normas de CET do Bacen — arrastando a LP inteira para o regime de publicidade de crédito.

**A síntese resolve os dois:** o seletor filtra e monta a mensagem; o WhatsApp converte. O visitante nunca vê "parcela" como promessa de página — ele vê *"Ver a parcela no WhatsApp"* como o **resultado** de ter se qualificado. A parcela mora na cabeça de um vendedor, não no HTML. E o desqualificador deixa de desqualificar: quem responde "não tenho nada" cai na seção da ACC, não num beco.

**Trade-off aceito:** perdemos alguns pontos de conversão de topo por não gritar a oferta no hero. Ganhamos o único fosso competitivo disponível, um CTA primário que não gera passivo, e um mecanismo que **degrada com elegância** (sem o dado do cliente, vira um grid feio mas funcional — as propostas 1 e 3 simplesmente não abrem).

**Pré-condição inegociável:** alguém precisa saber responder o preço e a parcela do outro lado em menos de 2 minutos. Sem isso, o CTA queima a conversão **e** o número.

### Conflito 2 — Conversão exigiu inimigo nomeado; Marca disse que inimigo-mensalidade é promoção, não marca

**Decisão: o inimigo fica — rebaixado ao RESULTADO "trabalho", nunca como tese de marca.**

CRO está certo: *"pare de pagar aluguel"* passa no teste do bar e o visitante repete pro amigo. Marca está certa: qualquer um publica isso na sexta-feira sem mudar o produto e sem admitir nada — custo de imitação zero. E amarra a marca a um número que ela não controla: **Mottu a R$ 290/mês e a tese evapora.**

Marca no nível da página (*"A Movvin te diz"* — imitável só com confissão pública). Inimigo no nível da seção (*"Aluguel, né? Não precisa ser"* — converte). O inimigo vende o produto; a tese vende a empresa. Quem confunde os dois constrói uma marca inteira sobre um SKU.

### Conflito 3 — CRO quis a calculadora rebaixada a seção; Jurídico e Realismo quiseram morta

**Decisão: a calculadora MORRE. A tese dela sobrevive como copy estática.**

CRO chamou a calculadora de "melhor argumento da rodada no pior lugar possível" e propôs movê-la para a seção 3. Jurídico foi mais fundo: **uma projeção personalizada exibida em tela é oferta suficientemente precisa e VINCULA pelo art. 30.** Realismo foi definitivo: a Movvin não tem preço, e a própria proposta 3 admite que sem preço a calculadora não fecha.

Não é uma questão de posição na página — é de natureza do ativo. Uma calculadora publicada é **um número assinado e permanente**, exibido ao público que mais confere conta e mais compartilha print. Sem consumo real medido (piloto + bag + ladeira + chuva) e sem preço, ela devolve "em X meses ela se paga" com X indefinido. É o único ativo das três propostas que **gera passivo ativamente** em vez de só prometer demais.

**O que fica:** o vocabulário. *"Aluguel você paga pra sempre. Essa aqui uma hora é sua."* é uma frase — não precisa de motor. A comparação contra a mensalidade vive em uma linha de texto e é fechada por um humano no WhatsApp com o preço na mão. **Fica a tese, morre o `<input>`.**

**E "CUSTO FECHADO" também morre como tese de marca** — não só por vocabulário de planilha, mas porque **é falso na própria linha**: ciclomotor tem licenciamento anual, IPVA em vários estados, capacete e ACC, e bateria de lítio tem vida útil e custo de reposição. A tese negava exatamente os custos recorrentes que a pesquisa dela própria documentava. Art. 37, §1º + §3º, e art. 66 quando o dirigente sabia — e o documento é a prova de que sabia. Não é corrigível por redação, porque não é uma frase: é a tese.

### Conflito 4 — Marca amou a voz da proposta 1; Conversão amou a headline dela; ambos apontaram que a vencedora tinha embalagem verbal fraca

**Decisão: enxerto direto. Mecanismo da 2 + voz da 1.**

Não há trade-off aqui — é ganho puro. `___, NÉ? NÃO PRECISA SER.` é a única sintaxe ownable de todo o material, e a única coisa nas três propostas que soa como **voz** de marca e não como argumento de vendedor. Nenhum concorrente do dossiê tem voz nenhuma. O CRO reclamou do "né?" como tique de copywriter — discordo: no hero *"Complicado, né?"* o vocativo não desperdiça linha, ele **nomeia a dor real do mercado em 2026** (o comprador não sabe o que pode pilotar) e a resolve na segunda metade. É a headline que a tese pede.

### Conflito 5 — Test ride: peça de referência da marca ("AGENDE SEU TEST RIDE JÁ") vs. ausência de rede

**Decisão: rebaixado a terciário e condicionado por cidade.** O botão só existe onde há endereço. Sem endereço, sem botão. Se o veículo for ciclomotor, área privada/fechada apenas — permitir condução em via pública a quem não tem ACC é infração **com a Movvin como facilitadora**, além de responsabilidade civil objetiva em acidente.

Um test ride não atendido é o dano exato do precedente Voltz — e é o tipo de promessa que a Movvin quebra em D+1, não em D+90.

### Conflito 6 — O nicho primário contraria o briefing implícito do cliente

**Decisão: executar assim, mas NEGOCIAR em reunião, não no silêncio.**

Rebaixar o entregador de "hero heroico" para "contra o aluguel", matar "sem CNH" como nicho e rebaixar o jovem a imagem de marca são três decisões que contrariam o briefing. Se forem executadas sem conversa, a página volta em revisão com os três de volta — e aí a discussão acontece sob pressão de prazo, que é o pior momento possível para ter uma discussão jurídica.

---

## Ordem de destravamento

1. **Spec de velocidade por modelo** (os 5 dados assinados). Sem isso, nada existe. *Primeira pergunta: os "35 km/h" são medição ou catálogo de fornecedor?*
2. **Preço ou faixa de preço + parcela** (com CET). Sem isso o CTA de fechamento desemboca numa parede.
3. **Homologação (CAT/CSV Denatran)** por modelo. Sem isso, a palavra "emplacável" não entra na página.
4. **Arquitetura de canal** (D2C vs. roteamento). Sem isso, a prova 3 da faixa de revenda não existe.
5. **Largura e entre-eixos do MVT-03.** Sem isso, a seção 60+ não fala de CNH.
6. **Decisão sobre os vídeos de IA** (declarar / refilmar / não usar) e sobre os PNGs OEM (limpar marca de terceiro / refotografar).
7. **Razão social, CNPJ, endereço, SAC, garantia em ciclos.** Piso legal de informação — autuável por si só.

---

**Em uma linha:** seletor honesto → resultado com enquadramento por modelo → WhatsApp com a mensagem já montada → um humano que sabe o preço. Nada além disso é executável hoje — e nada menos que isso é defensável amanhã.