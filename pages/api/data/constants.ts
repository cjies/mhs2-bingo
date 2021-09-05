import { ATTACK_TYPE } from '@/constants/attackType';
import { GENE_TYPE } from '@/constants/gene';
import { SKILL_TYPE } from '@/constants/skillType';

export const GENE_TYPE_MAP: Record<string, GENE_TYPE> = {
  彩虹: GENE_TYPE.RAINBOW,
  無: GENE_TYPE.NORMAL,
  火: GENE_TYPE.FIRE,
  水: GENE_TYPE.WATER,
  雷: GENE_TYPE.THUNDER,
  冰: GENE_TYPE.ICE,
  龍: GENE_TYPE.DRAGON,
};

export const SKILL_TYPE_MAP: Record<string, SKILL_TYPE> = {
  主動: SKILL_TYPE.ACTIVE,
  被動: SKILL_TYPE.PASSIVE,
  無: SKILL_TYPE.NONE,
};

export const ATTACK_TYPE_MAP: Record<string, ATTACK_TYPE> = {
  力量: ATTACK_TYPE.POWER,
  技巧: ATTACK_TYPE.SKILL,
  速度: ATTACK_TYPE.SPEED,
  彩虹: ATTACK_TYPE.RAINBOW,
  無: ATTACK_TYPE.NONE,
};
