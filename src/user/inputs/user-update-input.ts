import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 50)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
