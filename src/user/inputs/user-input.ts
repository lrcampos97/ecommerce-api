import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @Length(5, 50)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
