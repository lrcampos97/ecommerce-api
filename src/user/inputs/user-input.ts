import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsOptional()
  @Length(5, 50)
  name: string;

  @Field()
  @IsOptional()
  @IsEmail()
  email: string;
}
