import {
  Activity,
  ActivityCategory as PrismaActivityCategory,
  SignificanceLevel,
  Semester as PrismaSemester,
} from '@prisma/client';

export type ActivityCategory = PrismaActivityCategory; //'TEACHING' | 'RESEARCH' | 'SERVICE';
export type ActivityWeight = SignificanceLevel; //'MAJOR' | 'SIGNIFICANT' | 'MINOR';
export type Semester = PrismaSemester; //'FALL' | 'SPRING' | 'SUMMER' | 'OTHER';

export type ActivityDto = Activity; /*{
    id: string;
    userId: string;
    year: number;
    semester: Semester[];
    dateModified: BigInt;
    name: string;
    description: string;
    category: ActivityCategory;
    significance: ActivityWeight;
    isFavorite: boolean;
};*/

export type CreateActivityDto = Omit<Activity, 'id'>; /*{
    userId: string;
    year: number;
    semester: Semester[];
    dateModified BigInt;
    name: string;
    description: string;
    category: ActivityCategory;
    significance: ActivityWeight;
    isFavorite: boolean;
};*/
