import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ============================================================================
 * MODELOS
 * ----------------------------------------------------------------------------
 * A pagina e conduzida por BENEFICIO. O enquadramento legal saiu da tela por
 * decisao do cliente: a LP vende o produto e nao discute habilitacao, que e o
 * que a concorrencia (Aima, MUV) tambem faz.
 *
 * A trava abaixo permanece e custa zero: ela nao poe nada na tela, so impede
 * que um claim de isencao entre por engano numa spec que nao o sustenta.
 * Res. CONTRAN 996/2023, art. 2, par. 6: acima de 32 km/h a classificacao como
 * ciclomotor e automatica, e ciclomotor exige registro + ACC ou CNH A.
 * A spec declarada e 35 km/h. Logo: nenhum campo de isencao pode ser marcado.
 * ========================================================================== */

const LIMITE_VELOCIDADE_ISENCAO = 32; // km/h — Art. 2, II "d" e III "d"

const modelos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/modelos' }),
  schema: z
    .object({
      codigo: z.string().regex(/^MV[BSTH]-\d{2}$/, 'Nomenclatura: MV + categoria (B/S/T/H) + numero'),
      nome: z.string(),
      categoria: z.enum(['bike', 'scooter', 'triciclo', 'chopper']),
      categoriaLabel: z.string(),
      ordem: z.number().int(),

      /* Triade da marca: 2 descritivas + a assinatura institucional. */
      triade: z.tuple([z.string(), z.string(), z.string()]),
      chamada: z.string().describe('Uma frase. O beneficio central do modelo.'),

      /* ---- Spec declarada pelo fabricante -------------------------------- */
      potenciaW: z.number().positive(),
      velocidadeMaximaKmh: z.number().positive(),
      rodas: z.union([z.literal(2), z.literal(3)]),

      /* ---- Conteudo ------------------------------------------------------ */
      oQueE: z.string(),
      beneficios: z.array(z.string()).min(2).max(4),
      usos: z.array(z.enum(['trabalho', 'dia-a-dia', 'apoio', 'escola'])).min(1),

      /* ---- Assets -------------------------------------------------------- */
      imagem: z.string(),
      imagemAlt: z.string().min(20, 'Alt descritivo, nao "foto do produto"'),
      largura: z.number().int(),
      altura: z.number().int(),

      publicado: z.boolean().default(true),

      /* ---- A trava ------------------------------------------------------
         Campo opcional. So marcar como true com ficha tecnica ASSINADA pelo
         fabricante comprovando velocidade de fabricacao <= 32 km/h. */
      isentoDeHabilitacao: z.boolean().optional(),
    })
    .refine((m) => !(m.isentoDeHabilitacao === true && m.velocidadeMaximaKmh > LIMITE_VELOCIDADE_ISENCAO), {
      message:
        `Modelo marcado como isento de habilitacao com ${LIMITE_VELOCIDADE_ISENCAO}+ km/h. ` +
        'Res. CONTRAN 996/2023, art. 2, par. 6: acima de 32 km/h a classificacao como ciclomotor e automatica ' +
        '(registro obrigatorio + ACC ou CNH A). Ou a velocidade de fabricacao esta errada, ou o campo esta errado.',
      path: ['isentoDeHabilitacao'],
    }),
});

export const collections = { modelos };
