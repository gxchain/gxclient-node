var randomBytes = require('randombytes');
var createHash = require('create-hash');
const DEFAULT_WORDLIST = require('../const/englishWords');

var INVALID_ENTROPY = 'Invalid entropy';

function lpad(str, padString, length) {
  while (str.length < length) str = padString + str;
  return str;
}

function binaryToByte(bin) {
  return parseInt(bin, 2);
}

function bytesToBinary(bytes) {
  return bytes.map(function (x) {
    return lpad(x.toString(2), '0', 8);
  }).join('');
}

function deriveChecksumBits(entropyBuffer) {
  var ENT = entropyBuffer.length * 8;
  var CS = ENT / 32;
  var hash = createHash('sha256').update(entropyBuffer).digest();

  return bytesToBinary([].slice.call(hash)).slice(0, CS);
}

function entropyToMnemonic(entropy, wordlist) {
  if (!Buffer.isBuffer(entropy)) entropy = Buffer.from(entropy, 'hex');
  wordlist = wordlist || DEFAULT_WORDLIST;

  // 128 <= ENT <= 256
  if (entropy.length < 16) throw new TypeError(INVALID_ENTROPY);
  if (entropy.length > 32) throw new TypeError(INVALID_ENTROPY);
  if (entropy.length % 4 !== 0) throw new TypeError(INVALID_ENTROPY);

  var entropyBits = bytesToBinary([].slice.call(entropy));
  var checksumBits = deriveChecksumBits(entropy);

  var bits = entropyBits + checksumBits;
  var chunks = bits.match(/(.{1,11})/g);
  var words = chunks.map(function (binary) {
    var index = binaryToByte(binary);
    return wordlist[index];
  });

  return words.join(' ');
}

function generateMnemonic(strength, rng, wordlist) {
  strength = strength || 128;
  if (strength % 32 !== 0) throw new TypeError(INVALID_ENTROPY);
  rng = rng || randomBytes;

  return entropyToMnemonic(rng(strength / 8), wordlist);
}

exports = { generateMnemonic };