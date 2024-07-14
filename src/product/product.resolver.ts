import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { prismaClient } from '../common/prisma';
import { Product } from './inputs/product';
import { ProductInput } from './inputs/product-input';
import { ProductUpdateInput } from './inputs/product-update-input';
import { validateCategory, validateUser } from '../common/utils';

@Resolver(() => Product)
export class ProductResolver {
  /**
   * Query to get a list of products, including the full category and user details
   * @returns Product[]
   */
  @Query(() => [Product])
  async getProducts(): Promise<Product[]> {
    try {
      return await prismaClient.product.findMany({
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to query products: ${(error as Error).message}`);
    }
  }

  /**
   * Query to get a single product by ID
   * @param id {string} ID
   * @returns Product
   */
  @Query(() => Product, { nullable: true })
  async getProduct(@Arg('id', () => ID) id: string): Promise<Product | null> {
    try {
      return await prismaClient.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to query product: ${(error as Error).message}`);
    }
  }

  /**
   * Mutation to add a new Product
   * @param data {ProductInput} ProductInput
   * @returns Product
   */
  @Mutation(() => Product, { nullable: true })
  async createProduct(@Arg('data') data: ProductInput): Promise<Product> {
    await validateCategory(data.categoryId);

    if (data.userId) {
      await validateUser(data.userId);
    }
    try {
      const product = await prismaClient.product.create({
        data,
        include: {
          category: true,
        },
      });

      return product;
    } catch (error) {
      throw new Error(`Failed to add product: ${(error as Error).message}`);
    }
  }

  /**
   * Mutation to update an existing product
   * @param id {string} ID
   * @param productData {ProductUpdateInput} ProductUpdateInput
   * @returns Product | null
   */
  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg('id', () => ID) id: string,
    @Arg('productData') productData: ProductUpdateInput,
  ): Promise<Product | null> {
    await this.validateProduct(id);

    if (productData.categoryId) {
      await validateCategory(productData.categoryId);
    }

    if (productData.userId) {
      await validateUser(productData.userId);
    }

    try {
      return await prismaClient.product.update({
        where: { id },
        data: productData,
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to update product: ${(error as Error).message}`);
    }
  }

  /**
   * Mutation to delete a product by ID
   * @param id {string} ID
   * @returns Boolean
   */
  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id', () => ID) id: string): Promise<boolean> {
    await this.validateProduct(id);

    try {
      await prismaClient.product.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw new Error(`Failed to delete product: ${(error as Error).message}`);
    }
  }

  /**
   * Function to validate if a product exists in the database
   * @param id {string} ID
   */
  private async validateProduct(id: string): Promise<void> {
    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with id '${id}' not found`);
    }
  }
}
