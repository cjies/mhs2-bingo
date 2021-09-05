import shortHash from 'shorthash2';

import { GENE_LEVEL, GENE_TYPE } from '@/constants/gene';
import { Gene, GeneId } from '@/interfaces/gene';
import parseCSV from '@/utils/parseCsv';

import { ATTACK_TYPE_MAP, SKILL_TYPE_MAP } from './constants';

export type LegacyGenesMap = {
  [name: string]: Gene;
};

const LEGACY_GENES_CSV_PATH = {
  [GENE_TYPE.RAINBOW]: 'csv/legacy/rainbow.csv',
  [GENE_TYPE.NORMAL]: 'csv/legacy/normal.csv',
  [GENE_TYPE.FIRE]: 'csv/legacy/fire.csv',
  [GENE_TYPE.WATER]: 'csv/legacy/water.csv',
  [GENE_TYPE.THUNDER]: 'csv/legacy/thunder.csv',
  [GENE_TYPE.ICE]: 'csv/legacy/ice.csv',
  [GENE_TYPE.DRAGON]: 'csv/legacy/dragon.csv',
};

const fetchLegacyGenesByType = async (geneType: GENE_TYPE): Promise<Gene[]> => {
  const csvRows = await parseCSV(LEGACY_GENES_CSV_PATH[geneType]);

  return csvRows.map((data, index) => {
    const name = data['基因名稱'];
    const attackType = ATTACK_TYPE_MAP[data['類型']];
    const id = shortHash(`${geneType}-${attackType}-${index}`) as GeneId;

    const gene: Gene = {
      id,
      type: geneType,
      level: (data['基因等級'] as GENE_LEVEL) || null,
      attackType,
      name,
      skillType: SKILL_TYPE_MAP[data['主/被動']],
      skillName: data['技能名稱'],
      skillDescription: data['技能詳情'],
      minLevel: +data['所需等級'] ?? 0,
      sp: +data['消耗羈絆值'] || 0,
      monsters: data['可持有隨行獸'].split(/\n|、/).map((m) => m.trim()),
    };

    return gene;
  });
};

const fetchLegacyGenesMap = async (): Promise<LegacyGenesMap> => {
  const geneTypes = Object.keys(GENE_TYPE) as GENE_TYPE[];
  const genes = (
    await Promise.all(geneTypes.map(fetchLegacyGenesByType))
  ).flat();

  return genes.reduce<LegacyGenesMap>(
    (genesMap, gene) => ({
      ...genesMap,
      [gene.name]: gene,
    }),
    {}
  );
};

export default fetchLegacyGenesMap;
