
export type ActivityCategory = 'TEACHING' | 'RESEARCH' | 'SERVICE';
export type ActivityWeight = 'MAJOR' | 'SIGNIFICANT' | 'MINOR';
export type Semester = 'Fall' | 'Spring' | 'Summer 1' | 'Summer 2';

export type ActivityDto = {
    id: string;
    userId: string;
    academicYearId: string;
    year: number;
    semester: Semester;
    date?: Date;
    name: string;
    description: string;
    category: ActivityCategory;
    significance: ActivityWeight;
    isFavorite: boolean;
};

export type CreateActivityDto = {
    userId: string;
    academicYearId: string;
    year: number;
    semester: Semester;
    date?: Date;
    name: string;
    description: string;
    category: ActivityCategory;
    significance: ActivityWeight;
    isFavorite: boolean;
};