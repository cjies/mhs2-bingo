import { promises as fs } from 'fs';
import neatCsv from 'neat-csv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';

import { ATTACK_TYPE } from '../../constants/attackType';
import { GENE_TYPE } from '../../constants/gene';
import { SKILL_TYPE } from '../../constants/skillType';
import { Gene, GeneId } from '../../interfaces/gene';

const CSV_PATH = {
  [GENE_TYPE.NORMAL]: 'csv/normal.csv',
  [GENE_TYPE.FIRE]: 'csv/fire.csv',
  [GENE_TYPE.WATER]: 'csv/water.csv',
  [GENE_TYPE.THUNDER]: 'csv/thunder.csv',
  [GENE_TYPE.ICE]: 'csv/ice.csv',
  [GENE_TYPE.DRAGON]: 'csv/dragon.csv',
};

const SKILL_TYPE_MAP: Record<string, SKILL_TYPE> = {
  主動: SKILL_TYPE.ACTIVE,
  被動: SKILL_TYPE.PASSIVE,
};

const ATTACK_TYPE_MAP: Record<string, ATTACK_TYPE> = {
  力量: ATTACK_TYPE.POWER,
  技巧: ATTACK_TYPE.SPEED,
  速度: ATTACK_TYPE.SKILL,
  無: ATTACK_TYPE.NONE,
};

const fetchGenesByType = async (geneType: GENE_TYPE): Promise<Gene[]> => {
  const basePath =
    process.env.NODE_ENV === 'production'
      ? join(process.cwd(), '.next/server/chunks')
      : process.cwd();
  const csvFilePath = join(basePath, CSV_PATH[geneType]);

  const fileBuffer = await fs.readFile(csvFilePath, 'utf-8');
  const rows = await neatCsv(fileBuffer);

  return rows.map((data, index) => {
    const attackType = ATTACK_TYPE_MAP[data['類型']];
    const id = `${geneType}-${attackType}-${index}` as GeneId;
    const gene: Gene = {
      id,
      type: geneType,
      attackType,
      name: data['基因名稱'],
      skillType: SKILL_TYPE_MAP[data['主/被動']],
      skillName: data['技能名稱'],
      skillDescription: data['技能詳情'],
      minLevel: +data['所需等級'] ?? 0,
      sp: +data['消耗羈絆值'] || 0,
      monsters: data['可持有隨行獸'].split('、'),
    };

    return gene;
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Gene[]>
) {
  try {
    const geneTypes = Object.keys(GENE_TYPE) as GENE_TYPE[];
    const genes = (await Promise.all(geneTypes.map(fetchGenesByType))).flat();

    res.status(200).json(genes);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
