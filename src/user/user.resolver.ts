import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { User } from './inputs/user';
import { prismaClient } from '../common/prisma';
import { UserInput } from './inputs/user-input';
import { UserUpdateInput } from './inputs/user-update-input';
import { validateUser } from '../common/utils';

@Resolver(() => User)
export class UserResolver {
  /**
   * Query to get a list of users
   * @returns User[]
   */
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    try {
      return await prismaClient.user.findMany({
        include: {
          products: {
            include: {
              category: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to query users: ${(error as Error).message}`);
    }
  }

  /**
   * Query to get a single user by ID
   * @param id {string} ID
   * @returns User
   */
  @Query(() => User, { nullable: true })
  async getUser(@Arg('id', () => ID) id: string): Promise<User | null> {
    try {
      return await prismaClient.user.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              category: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to query user: ${(error as Error).message}`);
    }
  }

  /**
   * Mutation to create a new User
   * @param data {UserInput} UserInput
   * @returns User
   */
  @Mutation(() => User)
  async createUser(@Arg('data') data: UserInput): Promise<User> {
    try {
      await this.validateUserEmail(data.email);

      const user = await prismaClient.user.create({
        data,
        include: {
          products: {
            include: {
              category: true,
            },
          },
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${(error as Error).message}`);
    }
  }

  /**
   * Mutation to update an existing user
   * @param id {string} ID
   * @param userData {UserUpdateInput} UserUpdateInput
   * @returns User | null
   */
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('id', () => ID) id: string,
    @Arg('userData') userData: UserUpdateInput,
  ): Promise<User | null> {
    await validateUser(id);

    if (userData.email) {
      await this.validateUserEmail(userData.email);
    }

    try {
      return await prismaClient.user.update({
        where: { id },
        data: userData,
        include: {
          products: {
            include: {
              category: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to update user: ${(error as Error).message}`);
    }
  }

  /**
   * Mutation to delete a user by ID
   * @param id {string} ID
   * @returns Boolean
   */
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<boolean> {
    await validateUser(id);

    try {
      await prismaClient.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw new Error(`Failed to delete user: ${(error as Error).message}`);
    }
  }

  private async validateUserEmail(email: string): Promise<void> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new Error(`Email '${email}' not available`);
    }
  }
}
