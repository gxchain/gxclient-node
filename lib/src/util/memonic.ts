import { randomBytes } from 'randombytes';
import { createHash } from 'create-hash';
import DEFAULT_WORDLIST from '../const/englishWords';

const INVALID_ENTROPY = 'Invalid entropy';

function lpad(str, padString, length) {
  while (str.length < length) str = padString + str;
  return str;
}

function binaryToByte(bin) {
  return parseInt(bin, 2);
}

function bytesToBinary(bytes) {
  return bytes.map((x) => {
    return lpad(x.toString(2), '0', 8);
  }).join('');
}

function deriveChecksumBits(entropyBuffer) {
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;
  const hash = createHash('sha256').update(entropyBuffer).digest();

  return bytesToBinary([].slice.call(hash)).slice(0, CS);
}

function entropyToMnemonic(entropy, wordlist) {
  if (!Buffer.isBuffer(entropy)) entropy = Buffer.from(entropy, 'hex');
  wordlist = wordlist || DEFAULT_WORDLIST;

  // 128 <= ENT <= 256
  if (entropy.length < 16) throw new TypeError(INVALID_ENTROPY);
  if (entropy.length > 32) throw new TypeError(INVALID_ENTROPY);
  if (entropy.length % 4 !== 0) throw new TypeError(INVALID_ENTROPY);

  const entropyBits = bytesToBinary([].slice.call(entropy));
  const checksumBits = deriveChecksumBits(entropy);

  const bits = entropyBits + checksumBits;
  const chunks = bits.match(/(.{1,11})/g);
  const words = chunks.map((binary) => {
    const index = binaryToByte(binary);
    return wordlist[index];
  });

  return words.join(' ');
}

export function generateMnemonic(strength, rng?: any, wordlist?: any) {
  strength = strength || 128;
  if (strength % 32 !== 0) throw new TypeError(INVALID_ENTROPY);
  rng = rng || randomBytes;

  return entropyToMnemonic(rng(strength / 8), wordlist);
}