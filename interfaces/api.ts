import { Gene } from './gene';
import { Monster } from './monster';

export interface ApiResponseData {
  genes: Gene[];
  monsters: Monster[];
}
