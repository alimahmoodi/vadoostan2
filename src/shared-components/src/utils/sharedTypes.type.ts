import { Experience } from '../services';

export type ExperienceItemStatus =
  | 'soldout'
  | 'active-historial'
  | 'recent-historical'
  | 'active';
export interface ExperienceItemProps extends Omit<Experience, 'isFilled'> {
  status: ExperienceItemStatus;
}
