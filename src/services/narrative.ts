import { PrismaClient, Narrative } from '.prisma/client';
import { CreateNarrativeDto } from '@/models/narrative.model';

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
