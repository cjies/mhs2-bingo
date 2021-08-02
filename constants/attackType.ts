export enum ATTACK_TYPE {
  POWER = 'POWER',
  SPEED = 'SPEED',
  SKILL = 'SKILL',
  RAINBOW = 'RAINBOW',
  NONE = 'NONE',
}

export const ATTACK_TYPE_LIGHT_ICON = {
  [ATTACK_TYPE.POWER]: '/images/power-light-icon.png',
  [ATTACK_TYPE.SKILL]: '/images/skill-light-icon.png',
  [ATTACK_TYPE.SPEED]: '/images/speed-light-icon.png',
  [ATTACK_TYPE.RAINBOW]: '/images/rainbow-light-icon.png',
  [ATTACK_TYPE.NONE]: null,
} as const;

export const ATTACK_TYPE_DARK_ICON = {
  [ATTACK_TYPE.POWER]: '/images/power-dark-icon.png',
  [ATTACK_TYPE.SKILL]: '/images/skill-dark-icon.png',
  [ATTACK_TYPE.SPEED]: '/images/speed-dark-icon.png',
  [ATTACK_TYPE.RAINBOW]: '/images/rainbow-dark-icon.png',
  [ATTACK_TYPE.NONE]: null,
} as const;
