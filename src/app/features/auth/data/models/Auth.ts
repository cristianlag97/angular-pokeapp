export interface AuthLogin {
  status: number;
  data:   Auth;
}

export interface  Auth {
  name:         string;
  email:        string;
  accessToken:  string;
  refreshToken: string;
}