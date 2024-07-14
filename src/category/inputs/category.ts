import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
