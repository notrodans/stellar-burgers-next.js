export type Session = {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

export type SessionPartial = Partial<{
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;
