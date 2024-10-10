// public record RegisterDTO
// {

//     public required string UserName { get; set; }
//     public required string Email { get; set; }
//     public required string Password { get; set; }
//     public required string FirstName { get; set; }
//     public required string LastName { get; set; }
// }
export interface RegisterRequest {
  //   username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
