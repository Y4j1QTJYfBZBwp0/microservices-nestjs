export class UserDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
