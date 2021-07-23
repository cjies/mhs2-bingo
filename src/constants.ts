export enum SLOT_TYPE {
  POWER = 'POWER',
  SPEED = 'SPEED',
  SKILL = 'SKILL',
}

export enum SLOT_PROPERTY {
  NORMAL = 'NORMAL',
  FIRE = 'FIRE',
  WATER = 'WATER',
  ICE = 'ICE',
  THUNDER = 'THUNDER',
  DRAGON = 'DRAGON',
}

export const SLOT_TYPE_ICON = {
  [SLOT_TYPE.POWER]: '💪',
  [SLOT_TYPE.SKILL]: '💦',
  [SLOT_TYPE.SPEED]: '👟',
};

export const SLOT_COLOR = {
  [SLOT_PROPERTY.NORMAL]: '#808080', // Gray
  [SLOT_PROPERTY.FIRE]: '#b22222', // FireBrick
  [SLOT_PROPERTY.WATER]: '#00ffff', // Auqa
  [SLOT_PROPERTY.ICE]: '#f0f8ff', // AliceBlue
  [SLOT_PROPERTY.THUNDER]: '#ffd700', // Gold
  [SLOT_PROPERTY.DRAGON]: '#800080', // Purple
};

export const SLOT_COLOR_EMPTY = '#eee';
