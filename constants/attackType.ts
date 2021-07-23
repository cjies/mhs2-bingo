export enum ATTACK_TYPE {
  POWER = 'POWER',
  SPEED = 'SPEED',
  SKILL = 'SKILL',
  NONE = 'NONE',
}

export const ATTACK_TYPE_ICON = {
  [ATTACK_TYPE.POWER]: '💪',
  [ATTACK_TYPE.SKILL]: '💦',
  [ATTACK_TYPE.SPEED]: '👟',
  [ATTACK_TYPE.NONE]: '',
};
