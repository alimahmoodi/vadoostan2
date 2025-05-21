import { Experience } from './services/services';

export type ExperienceItemStatus =
  | 'soldout'
  | 'active-historial'
  | 'recent-historical'
  | 'active';
export interface ExperienceItemProps extends Omit<Experience, 'isFilled'> {
  status: ExperienceItemStatus;
}
