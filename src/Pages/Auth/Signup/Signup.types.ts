export type SignUpType = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export type SignUpRes = {
  token: string;
}