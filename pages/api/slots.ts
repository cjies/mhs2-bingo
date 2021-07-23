import { promises as fs } from 'fs';
import neatCsv from 'neat-csv';
import type { NextApiRequest, NextApiResponse } from 'next';

import { CATEGORY } from '../../constants/category';
import { SKILL } from '../../constants/skill';
import { TYPE } from '../../constants/type';
import { Slot, SlotId } from '../../interfaces/slot';

const CSV_PATH = {
  [TYPE.NORMAL]: 'csv/normal.csv',
  [TYPE.FIRE]: 'csv/fire.csv',
  [TYPE.WATER]: 'csv/water.csv',
  [TYPE.ICE]: 'csv/ice.csv',
  [TYPE.THUNDER]: 'csv/thunder.csv',
  [TYPE.DRAGON]: 'csv/dragon.csv',
};

const SKILL_MAP: Record<string, SKILL> = {
  主動: SKILL.ACTIVE,
  被動: SKILL.PASSIVE,
};

const CATEGORY_MAP: Record<string, CATEGORY> = {
  力量: CATEGORY.POWER,
  技巧: CATEGORY.SPEED,
  速度: CATEGORY.SKILL,
  無: CATEGORY.NONE,
};

const fetchSlotsByType = async (type: TYPE): Promise<Slot[]> => {
  const csvPath = CSV_PATH[type];
  const fileBuffer = await fs.readFile(csvPath);
  const rows = await neatCsv(fileBuffer);

  return rows.map((data, index) => {
    const category = CATEGORY_MAP[data['類型']];
    const id = `${type}-${category}-${index}` as SlotId;
    const slot: Slot = {
      id,
      type,
      category,
      name: data['基因名稱'],
      skill: SKILL_MAP[data['主/被動']],
      skillName: data['技能名稱'],
      skillDescription: data['技能詳情'],
      minLevel: +data['所需等級'],
      sp: +data['消耗羈絆值'],
      monsters: data['可持有隨行獸'].split('、'),
    };

    return slot;
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Slot[]>
) {
  try {
    const allTypes = Object.keys(TYPE) as TYPE[];
    const slots = (await Promise.all(allTypes.map(fetchSlotsByType))).flat();

    res.status(200).json(slots);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}
