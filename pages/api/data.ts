import { promises as fs } from 'fs';
import neatCsv from 'neat-csv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import shortHash from 'shorthash2';

import { ATTACK_TYPE } from '@/constants/attackType';
import { GENE_LEVEL, GENE_TYPE } from '@/constants/gene';
import { MONSTERS } from '@/constants/monster';
import { SKILL_TYPE } from '@/constants/skillType';
import { ApiResponseData } from '@/interfaces/api';
import { Gene, GeneId } from '@/interfaces/gene';
import { MonsterId } from '@/interfaces/monster';

const CSV_PATH = {
  [GENE_TYPE.RAINBOW]: 'csv/rainbow.csv',
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
  無: SKILL_TYPE.NONE,
};

const ATTACK_TYPE_MAP: Record<string, ATTACK_TYPE> = {
  力量: ATTACK_TYPE.POWER,
  技巧: ATTACK_TYPE.SKILL,
  速度: ATTACK_TYPE.SPEED,
  彩虹: ATTACK_TYPE.RAINBOW,
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
      monstersDescription: data['隨行獸備註'],
    };

    return gene;
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  try {
    const geneTypes = Object.keys(GENE_TYPE) as GENE_TYPE[];
    const genes = (await Promise.all(geneTypes.map(fetchGenesByType))).flat();

    const monsters = MONSTERS.map(({ name, icon }) => {
      const monsterId = shortHash(name) as MonsterId;
      return { id: monsterId, name, icon };
    });

    res.status(200).json({ genes, monsters });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}
