export interface IUser {
  id_token: string;

  name: string;

  profile: {
    email: string;
    picture: string;
  };
}
