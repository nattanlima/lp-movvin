# PERGUNTAS AO CLIENTE — o que destrava a página

> Este documento existe porque o projeto produziu ~40 mil palavras de pesquisa, estratégia e arquitetura **antes de fazer uma única pergunta**. A quantidade de deliberação foi inversamente proporcional à informação disponível. As perguntas abaixo estão ranqueadas por **quanto a resposta muda o plano** — não por ordem de conversa.
>
> O `npm run build` está **bloqueado de propósito** enquanto os campos do Nível 0 e 1 não forem respondidos. Ver `site/scripts/check-spec.mjs`.

---

## NÍVEL 0 — decidem se existe projeto

Nada pode ser publicado antes destas cinco.

### 1. A Movvin fabrica, importa ou revende marca branca?

**Por que decide tudo:** toda a estratégia assume que a Movvin **controla o produto** — que dá para "pedir 32 km/h" e exigir "ficha técnica assinada com cláusula de regresso".

**A evidência do repositório aponta para importador de catálogo OEM chinês:** ideograma chinês vermelho no `mvt-03.png`, dois brasões de fabricante no `mvs-01.png`, "SPRAND" no pneu do `mvs-02.png`, "RSE" no `mvb-04.png`, PNGs com upscale, e specs **idênticas** copiadas entre modelos de potências diferentes (500 W e 1.000 W, ambos "35 km/h").

Se for importador: vocês não podem pedir 32 km/h, compram o que existe no catálogo. E "cláusula de regresso" contra uma empresa em Shenzhen é conforto psicológico, não garantia executável.

### 2. Existe CAT/CSV Denatran de algum modelo?

**Este é o risco que foi lido ao contrário no projeto inteiro.** Todo mundo tratou a LINHA FORTE como o lado seguro: "é ciclomotor, emplaca, precisa de ACC, pronto."

**Ciclomotor só emplaca se o MODELO tiver homologação (CAT/CSV) no Denatran.** Sem CAT não existe emplacamento — não é burocracia do comprador, é impossibilidade. E se não emplaca, **o veículo não pode circular em via pública de forma alguma, por ninguém, com ou sem ACC.**

Consequência que ninguém tinha escrito: na spec atual, sem CAT, **a linha inteira é invendável para circulação**. Não é "a linha está errada" — é que não há produto. A LINHA LIVRE vazia era o risco óbvio. A LINHA FORTE fantasma é o risco maior.

### 3. Os "35 km/h" são medição ou catálogo do fornecedor?

**A pergunta de maior alavancagem do projeto.** Se for texto copiado de catálogo e o produto real for 32 km/h, o problema é trivial e a LINHA LIVRE nasce inteira.

Precisamos, **por modelo, com ficha assinada**:

| Dado | Por que |
|---|---|
| Velocidade máxima **de fabricação** + tem limitador eletrônico? | É o gargalo. Decide tudo. |
| Tem acelerador ou variador manual? | Acelerador **proíbe** a rota "bicicleta elétrica" |
| Os pedais são funcionais? O motor anda sem pedalada? | Pedal decorativo não é bicicleta elétrica |
| Largura em cm | Rota "autopropelido" exige ≤ 70 cm |
| Distância entre eixos em cm | Rota "autopropelido" exige ≤ 130 cm |

**O gesto mais barato do universo, e ninguém propôs em 40 mil palavras: ligar para o fornecedor e pedir a ficha técnica.**

### 4. Existe estoque comprado? Quantas unidades, com qual spec?

Se há 200 unidades de 35 km/h no armazém, "corrigir a spec" não é decisão de engenharia — é um write-off. Isso decide se a conversa da pergunta 3 é possível ou é teatro.

### 5. Razão social, CNPJ, endereço físico. A marca está registrada no INPI na classe 12?

Os três primeiros são **piso legal** (CDC art. 6º, III e art. 31): são autuáveis por si sós, mesmo com a spec corrigida. Hoje travam o build.

O INPI: estamos construindo uma LP, um sistema de nomenclatura (MVB/MVS/MVT/MVH) e uma assinatura verbal sobre um nome que pode ter colidência. Consulta: 10 minutos, grátis.

---

## NÍVEL 1 — decidem a arquitetura da página

6. **Preço.** Existe tabela? Existe parcela? Quem calcula e assina o CET?
7. **Quem responde o WhatsApp, em quanto tempo, e sabe o preço?** O funil inteiro desemboca aí. Sem essa pessoa, o CTA "Ver a parcela no WhatsApp" queima a conversão **e** o número. Se não houver, o CTA vira captura de interesse por região.
8. **Vocês vendem direto, por revenda, ou os dois?** Decide se a LP compete com o revendedor que ela recruta — erro que ajudou a quebrar a Voltz.
9. **Existe assistência técnica? Onde, com que endereço, com que estoque de peça?**
10. **Garantia: quantos anos, quantos ciclos de bateria, quem honra?**
11. **Entregam em todo o Brasil? Frete de quem?**

---

## NÍVEL 2 — decidem a produção

12. **Arquivos-fonte da marca.** Onde estão as peças sociais originais e a onda em "S" vetorizada? Quem desenhou a marca e existe cessão de direitos? (Hoje a wordmark do site é PNG recortado do `1.png`; o símbolo eu redesenhei em SVG a partir das medidas.)
13. **Os PNGs de produto são fotos de vocês ou do catálogo do fornecedor? Existe licença?** Isto é anterior ao retoque: **apagar o logo do terceiro não cria licença.** Publicar foto de terceiro sem cessão é infração autoral, independente de retoque.
14. **Os vídeos: qual ferramenta, qual plano, uso comercial permitido?** O projeto discutiu *divulgação* ("declarar / refilmar / não usar") e ninguém perguntou a pergunta anterior: **o plano usado permite uso comercial?** E há um segundo problema: os vídeos **retratam pessoas** (o senhor 60+, o entregador). Rosto sintético em peça comercial é território instável no Brasil.
15. **Existe verba e prazo para refotografar os 5 modelos?** Existe uma unidade física para a sessão? **Esta é a linha crítica do cronograma real — não o código.**
16. **MVH: qual letra, qual spec, o produto existe?** (Está fora da página até isso ser respondido.)
17. **MVB-03 e MVB-04 existem?** Têm PNG e vídeo no repositório e estão fora da nomenclatura que vocês passaram.

---

## NÍVEL 3 — operação

18. **Domínio, hospedagem, e-mail, WhatsApp Business: o que já existe?**
19. **Quem mantém a página depois do go-live?**
20. **Quantos DMs o Instagram já gera por mês? Quais as perguntas mais frequentes? Quantas vendas já foram feitas e por que as que não fecharam não fecharam?** Existe uma amostra real de objeções reais, de graça — e cinco pesquisas preferiram inferir de perfil demográfico.

---

## Três oportunidades que o planejamento ignorou

### A. Publicar a página da ACC sozinha, esta semana

A seção "ACC e a lei" **não depende de nada**: nem de spec, nem de foto, nem de preço, nem de CNPJ, nem de rede, nem de decisão sobre IA. É texto sobre norma pública.

Ela responde "preciso de CNH pra bicicleta elétrica?" e "CNH B pode andar de ciclomotor?" — buscas que existem hoje e que **ninguém responde**. Domínio novo leva meses para ranquear: **cada semana de espera é caixa queimado.** Publicá-la sozinha começa a ranquear enquanto o resto destrava.

### B. Criar o serviço de ACC em vez de vetar a promessa

O plano veta "a gente te acompanha na ACC" porque o serviço não existe. Ninguém propôs **criar**: é uma parceria com um CFC, custa uma reunião, e converte o maior atrito da linha no maior diferencial. Vetar é fácil; resolver é o trabalho.

### C. O posicionamento provavelmente certo não é informar — é resolver

Se todos os modelos forem ciclomotor, **"a gente te diz a lei" é um consolo. "A gente emplaca pra você" é um negócio**: despachante, documento, CAT, ACC, entrega com placa.

O concorrente omite exatamente porque a burocracia é o atrito — e quem *remove* o atrito ganha. Informar é barato, imitável numa tarde de terça (a Aima publica uma página "Legislação" e o fosso evapora) e não resolve o problema do cliente. Emplacar é caro, operacional, e é o único fosso real disponível.

**O plano atual escolheu o barato e chamou isso de fosso.** Isso precisa ser decidido por você, não por mim.

### D. Test ride não precisa de rede — precisa de uma van

O plano condicionou o test ride a "cidade com endereço" e concluiu que hoje não haveria botão nenhum. Ninguém propôs **test ride que vai até a casa do cliente** — que é exatamente o que o público 60+ precisa (ele não vai à loja) e o que uma marca sem rede consegue fazer com um veículo e um motorista.

---

## Correções que já fiz no conteúdo, e que você precisa saber

**Removi a frase "a ACC tem metade da carga horária da CNH de moto".** Duas pesquisas do próprio projeto se contradizem: uma apurou ACC = 20h teóricas + 10h práticas; a outra apurou que a reforma da CNH de dez/2025 cortou as aulas práticas de 20 para 2 e derrubou o custo de R$ 3.215 para ~R$ 800. **Se a reforma não alcançou a ACC, a ACC hoje é mais longa e mais cara que a CNH** — e a frase estaria invertida, na seção cuja tese é dizer a verdade. Só volta com fonte nominal e data. **Precisa ser confirmada no Detran.**

**Não publiquei nenhum número de autonomia, custo por km ou economia mensal.** Todas as fontes disponíveis são de vendedores de elétricos e divergem entre si.

**Não publiquei a faixa "R$ 380 a R$ 540/mês" de aluguel.** Vem de fonte secundária, e o próprio dossiê tem o dado que a contradiz: **iFood Pedal a partir de R$ 32/semana (~R$ 128/mês)**. Para o entregador de bike, o inimigo custa um quarto do que a copy afirmava.

**A calculadora de economia foi cortada.** Uma projeção personalizada exibida em tela é oferta suficientemente precisa e **vincula pelo art. 30**. Sem consumo medido e sem preço, ela devolveria "em X meses ela se paga" com X indefinido. Ficou a tese em texto; morreu o `<input>`.
