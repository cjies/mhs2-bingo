import shortHash from 'shorthash2';

import { GENE_LEVEL } from '@/constants/gene';
import { UNRELEASED_MONSTERS } from '@/constants/monster';
import { SKILL_TYPE } from '@/constants/skillType';
import { Gene, GeneId } from '@/interfaces/gene';
import parseCSV from '@/utils/parseCsv';

import {
  ACTIVE_SKILL_TYPE_MAP,
  ATTACK_TYPE_MAP,
  GENE_TYPE_MAP,
  SKILL_TYPE_MAP,
} from './constants';
import { LegacyGenesMap } from './fetchLegacyGenesMap';

const GENES_CSV_PATH = 'csv/genes.csv';

const parseMonsters = (monstersStr: string): string[] => {
  if (!monstersStr) {
    return [];
  }

  return monstersStr.split(/\n|、/).map((m) => m.trim());
};

const fetchGenes = async (legacyGenesMap: LegacyGenesMap): Promise<Gene[]> => {
  const csvRows = await parseCSV(GENES_CSV_PATH);

  // Filter invalid rows first
  const filteredRows = csvRows.filter((data) => {
    const geneType = GENE_TYPE_MAP[data['屬性']];
    const attackType = ATTACK_TYPE_MAP[data['類型']];
    const fixedMonster = data['固有'];

    return !(
      !geneType ||
      !attackType ||
      UNRELEASED_MONSTERS.includes(fixedMonster)
    );
  });

  return filteredRows.map((data) => {
    const name = data['基因名稱'];
    const geneType = GENE_TYPE_MAP[data['屬性']];
    const id = shortHash(`${geneType}-${name}`) as GeneId;

    const skillType = SKILL_TYPE_MAP[data['主/被']];
    const activeSkillType =
      skillType === SKILL_TYPE.ACTIVE
        ? ACTIVE_SKILL_TYPE_MAP[data['目標']]
        : null;

    const monsters = [
      ...parseMonsters(data['固有']),
      ...parseMonsters(data['一般']),
      ...parseMonsters(data['稀有']),
    ].reduce<string[]>((list, monster) => {
      if (!list.includes(monster)) {
        list.push(monster);
      }
      return list;
    }, []);

    const gene: Gene = {
      id,
      legacyId: legacyGenesMap[name]?.id,
      type: geneType,
      level: (data['基因等級'] as GENE_LEVEL) || null,
      attackType: ATTACK_TYPE_MAP[data['類型']],
      activeSkillType,
      name,
      skillType,
      skillName: data['技能名稱'],
      skillDescription: data['技能細節'],
      minLevel: +data['等級'] ?? 0,
      sp: +data['羈絆值消耗'] || 0,
      monsters,
    };

    return gene;
  });
};

export default fetchGenes;
