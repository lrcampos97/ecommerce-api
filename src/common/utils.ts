import { prismaClient } from './prisma';

/**
 * Function to validate if a category exists in the database
 * @param id {string} ID
 */
export async function validateCategory(id: string): Promise<void> {
  const category = await prismaClient.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error(`Category with id '${id}' not found`);
  }
}

/**
 * Function to validate if a user exists in the database
 * @param id {string} ID
 */
export async function validateUser(id: string): Promise<void> {
  const user = await prismaClient.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error(`User with id '${id}' not found`);
  }
}
