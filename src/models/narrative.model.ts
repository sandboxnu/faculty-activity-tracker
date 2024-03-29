import {
  Narrative,
  NarrativeCategory as PrismaNarrativeCategory,
} from '@prisma/client';

export type NarrativeCategory = PrismaNarrativeCategory; // "SUMMARY" | "SERVICE" | "RESEARCH" | "TEACHING"
export type NarrativeDto = Narrative; /*
{
    id: number;
    userId: number;
    year: number;
    dateModified: bigint;
    category: NarrativeCategory;
    text: string;
}*/

// id is generated by db
export type CreateNarrativeDto = Omit<Narrative, 'id'>;
export type UpdateNarrativeDto = Partial<NarrativeDto>;
export type DeleteNarrativeDto = Pick<NarrativeDto, 'id'>;
