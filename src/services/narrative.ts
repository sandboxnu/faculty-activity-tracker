import { PrismaClient, Narrative } from '.prisma/client';
import {
  CreateNarrativeDto,
  UpdateNarrativeDto,
  DeleteNarrativeDto,
} from '@/models/narrative.model';

const prisma = new PrismaClient();

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
): Promise<Narrative> => {
  const updatedNarrative = await prisma.narrative.update({
    where: { id: narrative.id },
    data: { ...narrative },
  });
  return updatedNarrative;
};

export const deleteNarrative = async (
  narrative: DeleteNarrativeDto,
): Promise<Narrative> => {
  const deletedNarrative = await prisma.narrative.delete({
    where: { id: narrative.id },
  });
  return deletedNarrative;
};