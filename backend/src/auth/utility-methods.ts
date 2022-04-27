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

export function generateUUIDV4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
