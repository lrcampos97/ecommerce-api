import { InputType, Field, Float } from 'type-graphql';
import { Length, IsPositive, IsOptional } from 'class-validator';
import { Decimal } from '@prisma/client/runtime/library';

@InputType()
export class ProductInput {
  @Field()
  @Length(3, 100)
  name: string;

  @Field()
  @Length(5, 200)
  description: string;

  @Field(() => Float)
  @IsPositive()
  value: Decimal;

  @Field()
  categoryId: string;

  @Field({ nullable: true })
  @IsOptional()
  userId?: string;
}
