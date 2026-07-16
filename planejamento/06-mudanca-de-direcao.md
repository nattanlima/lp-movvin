# MUDANÇA DE DIREÇÃO — decisão do cliente

Data: 16/07/2026. Três instruções do cliente reorientaram a página.

| Instrução | O que foi feito |
|---|---|
| A Movvin importa, mas isso não precisa ser citado | Nunca esteve na página. Só constava dos documentos internos de planejamento. Nada a remover. |
| Não entrar a fundo em leis, apenas mencionar os benefícios | Seção da ACC e tabela do Anexo I **removidas**. Entrou o bloco `Benefícios`. Página reconduzida por benefício. |
| Manter os 35 km/h | Mantido. Aparece como spec em destaque nos 5 cards. |

---

## O que mudou na prática

**A estratégia "A Movvin te diz" foi abandonada.** Ela dependia inteiramente de declarar o enquadramento legal modelo a modelo. Sem isso, não há tese — e não havia por que fingir que ainda havia.

**O seletor mudou de eixo.** Era "O que você tem hoje?" (habilitação). Agora é **"Pra que você vai usar?"**, com os 4 usos que o cliente nomeou no briefing original: trabalhar e entregar, meu dia a dia, mais apoio e conforto, ir pra escola. É mais próximo do pedido original e não devolve grid vazio para ninguém.

**O sistema LINHA LIVRE / LINHA FORTE saiu.** Era nomenclatura de enquadramento jurídico. No lugar, a categoria real: Bike elétrica, Scooter elétrica, Triciclo elétrico. A tríade da marca virou `DESCRITIVA. DESCRITIVA. 100% ELÉTRICA.` — que é a assinatura que já existe nas peças do cliente.

**Os cards agora vendem produto.** Duas specs herói em display grande (motor e velocidade) + três benefícios concretos + `Falar no WhatsApp`. O bloco "o que a lei exige" sumiu.

**O FAQ estruturado mudou de assunto.** Era sobre CNH, IPVA e classificação. Agora é sobre nomenclatura MV, onde carregar, o que precisa de manutenção, o que é o painel NFC, e a diferença entre bike/scooter/triciclo. Marcar como FAQ uma resposta que a página não dá seria spam de dado estruturado.

**O title trocou de estratégia.** Era `Bicicleta elétrica precisa de CNH?` (intenção informacional). Agora é `Bike, scooter e triciclo elétrico | Movvin` — disputa o termo de produto, que é o que sobra quando a página não responde a pergunta jurídica.

---

## A única linha que eu segurei

**A página não afirma "dispensa CNH e IPVA".**

Não é preciosismo e não é opinião de design. É que a Resolução CONTRAN 996/2023, art. 2º, §6º, reclassifica automaticamente como ciclomotor todo veículo acima de 32 km/h — e ciclomotor exige registro, placa e habilitação ACC ou A. Isso foi verificado contra o PDF oficial do DOU por três revisores independentes cuja tarefa era **refutar** a conclusão. Nenhum conseguiu.

Publicar a isenção com 35 km/h declarados expõe a:

- **CDC art. 37** (publicidade enganosa) e **arts. 66 e 67**, que preveem detenção de 3 meses a 1 ano para dirigentes
- Uma base de clientes multada em **R$ 880,41 + 7 pontos + remoção ao pátio**, tendo comprado exatamente porque a página disse que não precisava

**O que a página faz em vez disso:** não discute habilitação. Vende os benefícios reais — carrega na tomada, sem combustível, silenciosa, quase nada pra manter, painel LCD e NFC. É exatamente o que Aima e MUV fazem hoje no Brasil, e não expõe a Movvin a nada.

**Isso não bloqueia nada.** A página está pronta, o build compila, e ela pode subir assim que os dados do rodapé chegarem.

---

## A trava que ficou (e por que ela não te atrapalha)

`src/content.config.ts` mantém um campo opcional `isentoDeHabilitacao`. Ele não aparece na tela e nenhum modelo o usa. Ele existe para uma coisa só: se alguém, algum dia, marcar um modelo como isento sem antes corrigir a velocidade, o **build quebra** em vez de a afirmação ir ao ar.

Custa zero e não muda nada hoje. É uma apólice.

**Se o fornecedor confirmar 32 km/h**, a isenção passa a ser verdadeira, o campo pode ser marcado, o build aceita, e aí sim vale reabrir a conversa: naquele cenário "sem CNH" deixa de ser risco e vira o argumento comercial mais forte da linha.

Segue valendo a pergunta de maior alavancagem: **os 35 km/h são medição ou texto copiado do catálogo do fornecedor?** Eles aparecem idênticos em modelos de 500 W e de 1.000 W, o que é o padrão de quem copiou a ficha. Uma mensagem ao fornecedor resolve.

---

## O que ainda trava a publicação

Nada disso tem a ver com lei. É o piso de informação do CDC (art. 6º, III e art. 31), autuável por si só:

`razaoSocial · cnpj · endereco · cidade · uf · cep · sac · sacHorario · email · whatsapp · garantiaAnos · garantiaCiclosBateria · prazoEntregaPeca`

Todos em `src/lib/site.ts`. O `npm run build` lista os pendentes e recusa publicar. Assim que chegarem, a página sobe.

E dois assets que continuam pendentes de decisão sua:

- Os **PNGs** têm marcas de terceiros visíveis (ideograma no MVT-03, brasões no MVS-01, "SPRAND" no pneu do MVS-02). Se forem do catálogo do fornecedor, apagar o logo não cria licença.
- Os **vídeos** são gerados por IA e trazem watermark. A divulgação no rodapé está ligada por `site.usarVideos`. Se preferir sem, é uma linha.
