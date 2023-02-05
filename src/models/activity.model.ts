import {
  Activity,
  ActivityCategory as PrismaActivityCategory,
  SignificanceLevel,
  Semester as PrismaSemester,
} from '@prisma/client';

export type ActivityCategory = PrismaActivityCategory; //'TEACHING' | 'RESEARCH' | 'SERVICE';
export type ActivityWeight = SignificanceLevel; //'MAJOR' | 'SIGNIFICANT' | 'MINOR';
export type Semester = PrismaSemester; //'Fall' | 'Spring' | 'Summer 1' | 'Summer 2';

export type ActivityDto = Activity; /*{
    id: string;
    userId: string;
    year: number;
    semester: Semester;
    date?: Date;
    name: string;
    description: string;
    category: ActivityCategory;
    significance: ActivityWeight;
    isFavorite: boolean;
};*/

export type CreateActivityDto = Omit<Activity, 'id'>; /*{
    userId: string;
    year: number;
    semester: Semester;
    date?: Date;
    name: string;
    description: string;
    category: ActivityCategory;
    significance: ActivityWeight;
    isFavorite: boolean;
};*/
