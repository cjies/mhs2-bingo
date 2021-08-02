import { promises as fs } from 'fs';
import neatCsv from 'neat-csv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import shortHash from 'shorthash2';

import { ATTACK_TYPE } from '@/constants/attackType';
import { GENE_LEVEL, GENE_TYPE } from '@/constants/gene';
import { SKILL_TYPE } from '@/constants/skillType';
import { Gene, GeneId } from '@/interfaces/gene';
import { Monster } from '@/interfaces/monster';

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

const GENE_LEVEL_MAP: Record<string, GENE_LEVEL> = {
  '【小】': GENE_LEVEL.S,
  '【中】': GENE_LEVEL.M,
  '【大】': GENE_LEVEL.L,
  '【特大】': GENE_LEVEL.XL,
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

    // parse gene level from name
    const geneLevel = Object.entries(GENE_LEVEL_MAP).reduce<GENE_LEVEL | null>(
      (level, [key, value], _, arr) => {
        if (name.endsWith(key)) {
          level = value;
          arr.splice(1); // eject early by mutating iterated copy
        }

        return level;
      },
      null
    );

    const gene: Gene = {
      id,
      type: geneType,
      level: geneLevel,
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

const BLACKLIST_MONSTERS = ['', '-', '136', '138', '139'];

const getMonsterList = (genes: Gene[]) => {
  const monstersMap = genes.reduce<Record<string, string>>(
    (map, { monsters }) => {
      monsters.forEach((monster) => {
        const monsterId = shortHash(monster);
        if (!map[monsterId] && !BLACKLIST_MONSTERS.includes(monster)) {
          map[monsterId] = monster;
        }
      });

      return map;
    },
    {}
  );

  return Object.entries(monstersMap).map(
    ([id, name]) => ({ id, name } as Monster)
  );
};

interface ResponseData {
  genes: Gene[];
  monsters: Monster[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const geneTypes = Object.keys(GENE_TYPE) as GENE_TYPE[];
    const genes = (await Promise.all(geneTypes.map(fetchGenesByType))).flat();
    const monsters = getMonsterList(genes);

    res.status(200).json({ genes, monsters });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
