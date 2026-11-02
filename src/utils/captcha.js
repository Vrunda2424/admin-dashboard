// Ambiguous characters (0/O, 1/l/I) are left out so people can read the text.
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWER = "abcdefghijkmnpqrstuvwxyz";
const DIGITS = "23456789";
const INK = ["#1f3a5f", "#0a5f67", "#5b3d9a", "#8a2d2d", "#2b5a2b"];

const randomInt = (max) => {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return value[0] % max;
};
const pick = (text) => text[randomInt(text.length)];

// Returns characters with random look settings. Always has an uppercase, a lowercase, and a digit.
export function generateCaptcha(length = 6) {
  const chars = [pick(UPPER), pick(LOWER), pick(DIGITS)];
  while (chars.length < length) chars.push(pick(UPPER + LOWER + DIGITS));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.map((ch) => ({
    ch,
    rotate: randomInt(41) - 20,
    skew: randomInt(21) - 10,
    y: randomInt(11) - 5,
    size: 22 + randomInt(10),
    color: INK[randomInt(INK.length)],
  }));
}

export const captchaText = (chars) => chars.map((c) => c.ch).join("");
