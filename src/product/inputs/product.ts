import { ObjectType, Field, ID, Float } from 'type-graphql';
import { Category } from '../../category/inputs/category';
import { Decimal } from '@prisma/client/runtime/library';
import { omit } from 'lodash';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  value: Decimal;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  categoryId: string;

  @Field(() => Category)
  category: Category;

  @Field(() => String, { nullable: true })
  userId?: string | null;
}

@ObjectType()
export class ProductWithoutUser extends Product {
  constructor(product: Product) {
    super();
    Object.assign(this, omit(product, ['user']));
  }
}
