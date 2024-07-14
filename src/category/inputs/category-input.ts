import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class CategoryInput {
  @Field()
  @Length(3, 50)
  name: string;
}
