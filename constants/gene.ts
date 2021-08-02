import { GeneTable } from '@/interfaces/gene';

export const EMPTY_GENE_TABLE: GeneTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export enum GENE_TYPE {
  RAINBOW = 'RAINBOW',
  NORMAL = 'NORMAL',
  FIRE = 'FIRE',
  WATER = 'WATER',
  THUNDER = 'THUNDER',
  ICE = 'ICE',
  DRAGON = 'DRAGON',
}

export const GENE_COLOR = {
  [GENE_TYPE.NORMAL]: '#909090',
  [GENE_TYPE.FIRE]: '#c50701',
  [GENE_TYPE.WATER]: '#1f47a9',
  [GENE_TYPE.THUNDER]: '#cab503',
  [GENE_TYPE.ICE]: '#0ea8e4',
  [GENE_TYPE.DRAGON]: '#9823c0',
  [GENE_TYPE.RAINBOW]:
    'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
};

export const GENE_EMPTY_COLOR = '#291d0d';
export const GENE_BORDER_COLOR = '#483517';
export const GENE_BORDER_COLOR_MATCH = '#fff';

export const GENE_TYPE_ICON = {
  [GENE_TYPE.NORMAL]: '/images/normal-type.png',
  [GENE_TYPE.FIRE]: '/images/fire-type.png',
  [GENE_TYPE.WATER]: '/images/water-type.png',
  [GENE_TYPE.THUNDER]: '/images/thunder-type.png',
  [GENE_TYPE.ICE]: '/images/ice-type.png',
  [GENE_TYPE.DRAGON]: '/images/dragon-type.png',
} as const;

export enum GENE_LEVEL {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export const GENE_LEVEL_COLOR = {
  [GENE_LEVEL.S]: '#483517',
  [GENE_LEVEL.M]: '#cacaca',
  [GENE_LEVEL.L]:
    'conic-gradient(#e3cd57, #ffeebe, #e3cd57, #ffeebe, #e3cd57, #ffeebe, #e3cd57)',
  [GENE_LEVEL.XL]:
    'conic-gradient(#88d4ec, #def7fc, #88d4ec, #def7fc, #88d4ec, #def7fc, #88d4ec)',
};
