const API_ROOT = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export async function getFeed({ category = "", page = 1, limit = 10 }) {
  const endpoint =
    category === "trending"
      ? `/confessions/trending`
      : `/confessions?type=${encodeURIComponent(category)}&page=${page}&limit=${limit}`;

  const data = await request(endpoint, { cache: "no-store" });
  return data.data || [];
}

export async function searchPosts(query) {
  if (!query?.trim()) {
    return [];
  }

  const data = await request(`/confessions/search?q=${encodeURIComponent(query)}`, {
    cache: "no-store"
  });
  return data.data || [];
}

export async function getActivity(postIds) {
  const data = await request("/confessions/activity", {
    method: "POST",
    body: JSON.stringify({ postIds })
  });
  return data.data || [];
}

export async function addPost(payload) {
  const data = await request("/confessions/add", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return data.data;
}

export async function reactToPost(postId, type) {
  const data = await request(`/confessions/react/${postId}`, {
    method: "POST",
    body: JSON.stringify({ type })
  });
  return data.data;
}

export async function reportPost(postId) {
  const data = await request(`/confessions/report/${postId}`, {
    method: "POST"
  });
  return data.data;
}

export async function votePost(postId, voteType, deviceId) {
  const data = await request(`/confessions/${voteType}/${postId}`, {
    method: "POST",
    body: JSON.stringify({ deviceId })
  });
  return data.data;
}

export async function addComment(postId, text) {
  const data = await request(`/confessions/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ text })
  });
  return data.data;
}

export async function voteComment(postId, commentId, isLike, deviceId) {
  const data = await request(`/confessions/${postId}/comments/${commentId}/vote`, {
    method: "POST",
    body: JSON.stringify({ isLike, deviceId })
  });
  return data.data;
}

export async function getSettings(deviceId) {
  const data = await request(`/settings/${deviceId}`, { cache: "no-store" });
  return data.data || { theme: "system", revealEnabled: true };
}

export async function updateSettings(deviceId, settings) {
  const data = await request("/settings", {
    method: "POST",
    body: JSON.stringify({ deviceId, ...settings })
  });
  return data.data;
}
