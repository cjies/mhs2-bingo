import { ATTACK_TYPE } from '@/constants/attackType';
import { GENE_LEVEL, GENE_TYPE } from '@/constants/gene';
import { SKILL_TYPE } from '@/constants/skillType';

import { Maybe, Opaque } from './common';

export type GeneId = Opaque<'GENE_ID', string>;

export interface Gene {
  id: GeneId;
  type: GENE_TYPE;
  level: GENE_LEVEL | null;
  attackType: ATTACK_TYPE;
  name: string;
  skillType: SKILL_TYPE;
  skillName: string;
  skillDescription: string;
  minLevel: number;
  sp: number;
  monsters: string[];
  locked?: boolean;
}

export type GeneRow = Maybe<Gene>[];
export type GeneTable = GeneRow[];

export interface GeneMatchResult {
  geneType: GENE_TYPE | null;
  attackType: ATTACK_TYPE | null;
}

export interface SelectedGene {
  rowIndex: number;
  columnIndex: number;
  gene: Maybe<Gene>;
}
