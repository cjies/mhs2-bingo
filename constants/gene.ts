import dragonTypeIcon from '@/public/images/dragon-type.png';
import fireTypeIcon from '@/public/images/fire-type.png';
import iceTypeIcon from '@/public/images/ice-type.png';
import normalTypeIcon from '@/public/images/normal-type.png';
import thunderTypeIcon from '@/public/images/thunder-type.png';
import waterTypeIcon from '@/public/images/water-type.png';

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
  [GENE_TYPE.NORMAL]: '#6f6f6f',
  [GENE_TYPE.FIRE]: '#ff4802',
  [GENE_TYPE.WATER]: '#4691a1',
  [GENE_TYPE.THUNDER]: '#dbd115',
  [GENE_TYPE.ICE]: '#afcceb',
  [GENE_TYPE.DRAGON]: '#6b73b5',
  [GENE_TYPE.RAINBOW]:
    'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
};

export const GENE_EMPTY_COLOR = '#291d0d';
export const GENE_BORDER_COLOR = '#483517';
export const GENE_BORDER_COLOR_MATCH = '#fff';

export const GENE_TYPE_ICON = {
  [GENE_TYPE.NORMAL]: normalTypeIcon,
  [GENE_TYPE.FIRE]: fireTypeIcon,
  [GENE_TYPE.WATER]: waterTypeIcon,
  [GENE_TYPE.THUNDER]: thunderTypeIcon,
  [GENE_TYPE.ICE]: iceTypeIcon,
  [GENE_TYPE.DRAGON]: dragonTypeIcon,
} as const;

export enum GENE_LEVEL {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export const GENE_LEVEL_COLOR = {
  [GENE_LEVEL.S]: '#291d0d',
  [GENE_LEVEL.M]: '#aaa9ad',
  [GENE_LEVEL.L]: '#d4af37',
  [GENE_LEVEL.XL]: '#a7d8de',
};
