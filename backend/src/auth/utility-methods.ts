import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export async function comparePasswords(
  plainTextPasskey: string,
  encryptedPasskey: string,
): Promise<{ data: boolean | null; error: boolean | null }> {
  const status = compareSync(plainTextPasskey, encryptedPasskey);
  return { data: status ?? false, error: !status ?? true };
}

export function encryptPlainPassword(password: string) {
  return hashSync(password, genSaltSync(10));
}