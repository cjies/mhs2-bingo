import powerDarkIcon from '@/public/images/power-dark-icon.png';
import powerLightIcon from '@/public/images/power-light-icon.png';
import rainbowDarkIcon from '@/public/images/rainbow-dark-icon.png';
import rainbowLightIcon from '@/public/images/rainbow-light-icon.png';
import skillDarkIcon from '@/public/images/skill-dark-icon.png';
import skillLightIcon from '@/public/images/skill-light-icon.png';
import speedDarkIcon from '@/public/images/speed-dark-icon.png';
import speedLightIcon from '@/public/images/speed-light-icon.png';

export enum ATTACK_TYPE {
  POWER = 'POWER',
  SPEED = 'SPEED',
  SKILL = 'SKILL',
  RAINBOW = 'RAINBOW',
  NONE = 'NONE',
}

export const ATTACK_TYPE_LIGHT_ICON = {
  [ATTACK_TYPE.POWER]: powerLightIcon,
  [ATTACK_TYPE.SKILL]: skillLightIcon,
  [ATTACK_TYPE.SPEED]: speedLightIcon,
  [ATTACK_TYPE.RAINBOW]: rainbowLightIcon,
  [ATTACK_TYPE.NONE]: null,
} as const;

export const ATTACK_TYPE_DARK_ICON = {
  [ATTACK_TYPE.POWER]: powerDarkIcon,
  [ATTACK_TYPE.SKILL]: skillDarkIcon,
  [ATTACK_TYPE.SPEED]: speedDarkIcon,
  [ATTACK_TYPE.RAINBOW]: rainbowDarkIcon,
  [ATTACK_TYPE.NONE]: null,
} as const;
