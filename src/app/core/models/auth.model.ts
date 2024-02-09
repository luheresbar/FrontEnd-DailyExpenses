export interface ResponseLogin {
  access_token: string,
  refresh_token: string
}

export interface RefreshToken extends Omit<ResponseLogin, 'access_Token'> {}