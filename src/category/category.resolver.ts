import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { prismaClient } from '../common/prisma';
import { Category } from './inputs/category';
import { CategoryInput } from './inputs/category-input';
import { UpdateCategoryInput } from './inputs/category-update-input';
import { validateCategory } from '../common/utils';
import { logger } from '../common/pino';

@Resolver()
export class CategoryResolver {
  /**
   * Query to get a single category by ID
   * @param id {string} ID
   * @returns Category
   */
  @Query(() => Category, { nullable: true })
  async getCategory(@Arg('id', () => ID) id: string): Promise<Category | null> {
    const category = await prismaClient.category.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            user: true,
          },
        },
      },
    });

    return category;
  }

  /**
   * Query to get a list of categories, including their associated products
   * @returns Category[]
   */
  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    try {
      const categories = await prismaClient.category.findMany({
        include: { products: true },
      });

      return categories;
    } catch (error) {
      throw new Error(
        `Failed to query categories: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Mutation to add a new category
   * @param data {CategoryInput} CategoryInput
   * @returns Category
   */
  @Mutation(() => Category)
  async createCategory(@Arg('data') data: CategoryInput): Promise<Category> {
    try {
      const category = await prismaClient.category.create({
        data,
      });

      logger.info(`Successfully created category with ID ${category.id}`);
      return category;
    } catch (error) {
      throw new Error(`Failed to add category: ${(error as Error).message}`);
    }
  }

  /**
   * Mutation to delete category
   * @param id {string} ID
   * @returns Boolean
   */
  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => ID) id: string): Promise<boolean> {
    await validateCategory(id);

    try {
      await prismaClient.category.delete({
        where: { id },
      });

      logger.info(`Category with ${id} mark as deleted!`);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete category: ${(error as Error).message}`);
    }
  }

  /**
   * Mutation to update an existing category
   * @param id {string} ID
   * @param categoryData {UpdateCategoryInput} UpdateCategoryInput
   * @returns Category | null
   */
  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg('id', () => ID) id: string,
    @Arg('categoryData') categoryData: UpdateCategoryInput,
  ): Promise<Category | null> {
    await validateCategory(id);

    try {
      const category = await prismaClient.category.update({
        where: { id },
        data: {
          ...categoryData,
        },
      });

      logger.info(`Category with ${id} updated!`);
      return category;
    } catch (error) {
      throw new Error(`Failed to update category: ${(error as Error).message}`);
    }
  }
}
