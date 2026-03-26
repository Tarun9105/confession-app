const BAD_WORDS = [
  'abuse', 'hate', 'spam', 'scam', 'idiot', 'stupid',
  'kill', 'suicide', 'bomb', 'terror', 'attack',
  'porn', 'nudity', 'sex', 'nsfw', 'naked',
  'pussy', 'dick', 'cock', 'vagina', 'asshole', 'faggot', 'nigger',
  'f u c k', 's h i t', 'b i t c h'
];

const LEET_MAP = {
  '4': 'a', '@': 'a', '3': 'e', '1': 'i', '!': 'i', '0': 'o', '5': 's', '$': 's', '7': 't', '+': 't'
};

const normalizeForScan = (text) => {
  let normalized = String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');

  // Handle leetspeak
  normalized = normalized.split('').map(char => LEET_MAP[char] || char).join('');

  // Remove potential bypass characters (dots, spaces, underscores inside words)
  return normalized.replace(/[^a-z0-9]/g, '');
};

export const containsBadWords = (text) => {
  const rawNormalized = String(text || '').toLowerCase();
  const deepNormalized = normalizeForScan(text);

  if (!deepNormalized) return false;

  return BAD_WORDS.some((word) => {
    const cleanWord = word.replace(/\s+/g, '');
    // Check for exact word or deep normalized match
    return rawNormalized.includes(word) || deepNormalized.includes(cleanWord);
  });
};
