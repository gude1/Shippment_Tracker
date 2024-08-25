export type LoginParam = {
  usr: string;
  pwd: string;
};

export type LoginResponse = {
  message?: string;
  full_name?: string;
  error?: string;
};
