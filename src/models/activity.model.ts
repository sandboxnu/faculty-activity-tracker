import {
  Activity,
  ActivityCategory as PrismaActivityCategory,
  SignificanceLevel,
  Semester as PrismaSemester,
} from '.prisma/client';

export type ActivityCategory = PrismaActivityCategory; //'TEACHING' | 'RESEARCH' | 'SERVICE';
export type ActivityWeight = SignificanceLevel; //'MAJOR' | 'SIGNIFICANT' | 'MINOR';
export type Semester = PrismaSemester; //'FALL' | 'SPRING' | 'SUMMER' | 'OTHER';

export type ActivityDistribution = {
  userId: Activity['userId'];
  count: number;
}[];

export type ActivityDto = Activity;

export type CreateActivityDto = Omit<Activity, 'id'>;

export type UpdateActivityDto = Partial<ActivityDto>;

export type SortOrder = 'asc' | 'desc';

export type ActivityOrderByQuery = Partial<{
  [Property in keyof ActivityDto]: SortOrder;
}>;

export const isActivityCategory = (
  category: String,
): category is ActivityCategory => {
  return ['TEACHING', 'RESEARCH', 'SERVICE'].includes(
    category as ActivityCategory,
  );
};

export const categoryLabels: Record<ActivityCategory, string> = {
  TEACHING: 'Teaching',
  RESEARCH:
    'Creative Activity, Scholarship and Research/Professional Development',
  SERVICE: 'Service',
};

export const formatCategory = (category: ActivityCategory): string =>
  categoryLabels[category];
