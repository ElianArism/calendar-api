import bcrypt from "bcrypt";

export const EncryptString = (str: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(str, salt);
};

export const AreEncriptedStringsEquals = (
  str1: string,
  str2: string
): boolean => {
  return bcrypt.compareSync(str1, str2);
};
