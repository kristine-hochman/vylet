import { customAlphabet } from "nanoid";

// No look-alike characters (0/O, 1/I/l) since these show up in shared URLs.
const nanoid = customAlphabet(
  "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz",
  10
);

export function newId(): string {
  return nanoid();
}
