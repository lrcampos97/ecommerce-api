import { InputType, Field } from 'type-graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true })
  @Length(3, 50)
  @IsOptional()
  name?: string;
}
