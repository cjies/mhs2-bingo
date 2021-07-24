import powerIcon from '@/public/images/power-icon.png';
import skillIcon from '@/public/images/skill-icon.png';
import speedIcon from '@/public/images/speed-icon.png';

export enum ATTACK_TYPE {
  POWER = 'POWER',
  SPEED = 'SPEED',
  SKILL = 'SKILL',
  NONE = 'NONE',
}

export const ATTACK_TYPE_ICON = {
  [ATTACK_TYPE.POWER]: powerIcon,
  [ATTACK_TYPE.SKILL]: skillIcon,
  [ATTACK_TYPE.SPEED]: speedIcon,
  [ATTACK_TYPE.NONE]: null,
} as const;
