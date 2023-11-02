import { Narrative } from '.prisma/client';
import {
  CreateNarrativeDto,
  UpdateNarrativeDto,
  DeleteNarrativeDto,
} from '@/models/narrative.model';
import { NarrativeCategory } from '@prisma/client';
import prisma from 'lib/db';

export const getNarrativeForUserForCategory = async (
  userId: number,
  category: NarrativeCategory,
): Promise<Narrative | null> => {
  const narrative = await prisma.narrative.findFirst({
    where: { userId, category },
  });
  return narrative;
};

export const getNarrativesForUser = async (
  userId: number,
): Promise<Narrative[] | null> => {
  const narratives = await prisma.narrative.findMany({
    where: { userId },
  });
  return narratives;
};

export const createNarrative = async (
  narrative: CreateNarrativeDto,
): Promise<Narrative> => {
  const newNarrative = await prisma.narrative.create({
    data: {
      ...narrative,
    },
  });
  return newNarrative;
};

export const updateNarrative = async (
  narrative: UpdateNarrativeDto,
): Promise<Narrative | null> => {
  try {
    const updatedNarrative = await prisma.narrative.update({
      where: { id: narrative.id },
      data: { ...narrative },
    });
    return updatedNarrative;
  } catch (e) {
    // RecordNotFound exception
    console.error(e);
    return null;
  }
};

export const deleteNarrative = async (
  narrative: DeleteNarrativeDto,
): Promise<Narrative | null> => {
  try {
    const deletedNarrative = await prisma.narrative.delete({
      where: { id: narrative.id },
    });
    return deletedNarrative;
  } catch (e) {
    // RecordNotFound exception
    console.error(e);
    return null;
  }
};
