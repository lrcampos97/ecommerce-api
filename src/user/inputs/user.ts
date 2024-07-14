import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { ProductWithoutUser } from '../../product/inputs/product';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  @Length(5, 50)
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [ProductWithoutUser])
  products: ProductWithoutUser[];
}
