import { InputType, Field, Float } from 'type-graphql';
import { Length, IsOptional, IsPositive } from 'class-validator';
import { Decimal } from '@prisma/client/runtime/library';

@InputType()
export class ProductUpdateInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 100)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 200)
  description?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsPositive()
  value?: Decimal;

  @Field({ nullable: true })
  @IsOptional()
  categoryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  userId?: string;
}
