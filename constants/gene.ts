export enum GENE_TYPE {
  NORMAL = 'NORMAL',
  FIRE = 'FIRE',
  WATER = 'WATER',
  THUNDER = 'THUNDER',
  ICE = 'ICE',
  DRAGON = 'DRAGON',
}

export const GENE_COLOR = {
  [GENE_TYPE.NORMAL]: '#808080', // Gray
  [GENE_TYPE.FIRE]: '#b22222', // FireBrick
  [GENE_TYPE.WATER]: '#00ffff', // Auqa
  [GENE_TYPE.THUNDER]: '#ffd700', // Gold
  [GENE_TYPE.ICE]: '#f0f8ff', // AliceBlue
  [GENE_TYPE.DRAGON]: '#800080', // Purple
};

export const GENE_EMPTY_COLOR = '#555';
