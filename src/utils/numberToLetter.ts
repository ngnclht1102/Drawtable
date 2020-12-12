export function numberToLetter(number: number) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return alphabet.charAt(number) || "Don't know";
}
