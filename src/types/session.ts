export type UserSession = {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
  user: {
    email: string;
    id: string;
    name: string;
    phone: string;
    profilePicture: string;
  };
};
