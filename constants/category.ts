export enum CATEGORY {
  POWER = 'POWER',
  SPEED = 'SPEED',
  SKILL = 'SKILL',
  NONE = 'NONE',
}

export const CATEGORY_ICON = {
  [CATEGORY.POWER]: '💪',
  [CATEGORY.SKILL]: '💦',
  [CATEGORY.SPEED]: '👟',
  [CATEGORY.NONE]: '',
};
