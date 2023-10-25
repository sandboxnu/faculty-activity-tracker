import { SignificanceLevel } from '@prisma/client';
import {
  ActivityCategory,
  ActivityDto,
  Semester,
} from '../../models/activity.model';
import { NarrativeCategory, NarrativeDto } from '@/models/narrative.model';

export const seperateNarrativesByCategory = (
  narratives: NarrativeDto[],
): Record<NarrativeCategory, NarrativeDto[]> => {
  let narrativesByCategory: Record<NarrativeCategory, NarrativeDto[]> = {
    SUMMARY: [],
    TEACHING: [],
    RESEARCH: [],
    SERVICE: [],
  };
  for (let narrative of narratives) {
    narrativesByCategory[narrative.category].push(narrative);
  }
  return narrativesByCategory;
};
