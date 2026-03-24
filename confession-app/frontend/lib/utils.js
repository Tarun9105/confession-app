export const CATEGORY_OPTIONS = [
  { label: "Recent", value: "" },
  { label: "Trending", value: "trending" },
  { label: "Deep", value: "deep" },
  { label: "Secret", value: "secret" },
  { label: "Funny", value: "funny" }
];

export const QUOTES = [
  "Some truths need a soft place to land.",
  "You can be honest here without becoming visible.",
  "Every anonymous story still deserves empathy.",
  "A quiet confession can start a loud healing."
];

export const TRENDING_TOPICS = [
  "heartbreak",
  "friendship",
  "college",
  "career",
  "family",
  "late-night thoughts"
];

export const EMOTION_REACTIONS = [
  { label: "Relatable", value: "relatable" },
  { label: "Funny", value: "funny" },
  { label: "Sad", value: "sad" }
];

export function classifyConfession(text) {
  const value = text.toLowerCase();

  if (/(laugh|funny|meme|lol)/.test(value)) {
    return "funny";
  }

  if (/(secret|hide|nobody knows|anonymous)/.test(value)) {
    return "secret";
  }

  return "deep";
}

export function shouldBlur(text) {
  return text.trim().length > 180;
}

export function getScore(post) {
  return (post.likes || 0) + (post.comments?.length || 0) * 2 - (post.dislikes || 0);
}

export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value || 0);
}

export function getTopTags(posts) {
  const counts = new Map();

  posts.forEach((post) => {
    const matches = post.text?.toLowerCase().match(/#[a-z0-9-_]+/g) || [];
    matches.forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag, count]) => ({ tag, count }));
}
