import dragonTypeIcon from '@/public/images/dragon-type.png';
import fireTypeIcon from '@/public/images/fire-type.png';
import iceTypeIcon from '@/public/images/ice-type.png';
import normalTypeIcon from '@/public/images/normal-type.png';
import thunderTypeIcon from '@/public/images/thunder-type.png';
import waterTypeIcon from '@/public/images/water-type.png';

export enum GENE_TYPE {
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
};

export const GENE_EMPTY_COLOR = '#221402';

export const GENE_TYPE_ICON = {
  [GENE_TYPE.NORMAL]: normalTypeIcon,
  [GENE_TYPE.FIRE]: fireTypeIcon,
  [GENE_TYPE.WATER]: waterTypeIcon,
  [GENE_TYPE.THUNDER]: thunderTypeIcon,
  [GENE_TYPE.ICE]: iceTypeIcon,
  [GENE_TYPE.DRAGON]: dragonTypeIcon,
} as const;
