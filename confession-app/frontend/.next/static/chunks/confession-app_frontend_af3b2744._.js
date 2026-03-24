(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/confession-app/frontend/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addComment",
    ()=>addComment,
    "addPost",
    ()=>addPost,
    "getActivity",
    ()=>getActivity,
    "getFeed",
    ()=>getFeed,
    "getSettings",
    ()=>getSettings,
    "reactToPost",
    ()=>reactToPost,
    "reportPost",
    ()=>reportPost,
    "searchPosts",
    ()=>searchPosts,
    "updateSettings",
    ()=>updateSettings,
    "voteComment",
    ()=>voteComment,
    "votePost",
    ()=>votePost
]);
const API_ROOT = "/api";
async function request(path) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const response = await fetch("".concat(API_ROOT).concat(path), {
        headers: {
            "Content-Type": "application/json",
            ...options.headers || {}
        },
        ...options
    });
    const data = await response.json().catch(()=>({}));
    if (!response.ok) {
        throw new Error((data === null || data === void 0 ? void 0 : data.message) || "Request failed");
    }
    return data;
}
async function getFeed(param) {
    let { category = "", page = 1, limit = 10 } = param;
    const endpoint = category === "trending" ? "/confessions/trending" : "/confessions?type=".concat(encodeURIComponent(category), "&page=").concat(page, "&limit=").concat(limit);
    const data = await request(endpoint, {
        cache: "no-store"
    });
    return data.data || [];
}
async function searchPosts(query) {
    if (!(query === null || query === void 0 ? void 0 : query.trim())) {
        return [];
    }
    const data = await request("/confessions/search?q=".concat(encodeURIComponent(query)), {
        cache: "no-store"
    });
    return data.data || [];
}
async function getActivity(postIds) {
    const data = await request("/confessions/activity", {
        method: "POST",
        body: JSON.stringify({
            postIds
        })
    });
    return data.data || [];
}
async function addPost(payload) {
    const data = await request("/confessions/add", {
        method: "POST",
        body: JSON.stringify(payload)
    });
    return data.data;
}
async function reactToPost(postId, type) {
    const data = await request("/confessions/react/".concat(postId), {
        method: "POST",
        body: JSON.stringify({
            type
        })
    });
    return data.data;
}
async function reportPost(postId) {
    const data = await request("/confessions/report/".concat(postId), {
        method: "POST"
    });
    return data.data;
}
async function votePost(postId, voteType, deviceId) {
    const data = await request("/confessions/".concat(voteType, "/").concat(postId), {
        method: "POST",
        body: JSON.stringify({
            deviceId
        })
    });
    return data.data;
}
async function addComment(postId, text) {
    const data = await request("/confessions/".concat(postId, "/comments"), {
        method: "POST",
        body: JSON.stringify({
            text
        })
    });
    return data.data;
}
async function voteComment(postId, commentId, isLike, deviceId) {
    const data = await request("/confessions/".concat(postId, "/comments/").concat(commentId, "/vote"), {
        method: "POST",
        body: JSON.stringify({
            isLike,
            deviceId
        })
    });
    return data.data;
}
async function getSettings(deviceId) {
    const data = await request("/settings/".concat(deviceId), {
        cache: "no-store"
    });
    return data.data || {
        theme: "system",
        revealEnabled: true
    };
}
async function updateSettings(deviceId, settings) {
    const data = await request("/settings", {
        method: "POST",
        body: JSON.stringify({
            deviceId,
            ...settings
        })
    });
    return data.data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/confession-app/frontend/lib/storage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOOKMARKS_KEY",
    ()=>BOOKMARKS_KEY,
    "DEVICE_ID_KEY",
    ()=>DEVICE_ID_KEY,
    "MY_POSTS_KEY",
    ()=>MY_POSTS_KEY,
    "getBookmarks",
    ()=>getBookmarks,
    "getDeviceId",
    ()=>getDeviceId,
    "getMyPosts",
    ()=>getMyPosts,
    "saveMyPost",
    ()=>saveMyPost,
    "toggleBookmark",
    ()=>toggleBookmark
]);
const MY_POSTS_KEY = "myConfessions";
const DEVICE_ID_KEY = "deviceId";
const BOOKMARKS_KEY = "bookmarkedConfessions";
function getDeviceId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const existing = window.localStorage.getItem(DEVICE_ID_KEY);
    if (existing) {
        return existing;
    }
    const generated = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    window.localStorage.setItem(DEVICE_ID_KEY, generated);
    return generated;
}
function getMyPosts() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return JSON.parse(window.localStorage.getItem(MY_POSTS_KEY) || "[]");
    } catch (e) {
        return [];
    }
}
function saveMyPost(postId) {
    const existing = getMyPosts();
    const next = [
        ...new Set([
            postId,
            ...existing
        ])
    ];
    window.localStorage.setItem(MY_POSTS_KEY, JSON.stringify(next));
}
function getBookmarks() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return JSON.parse(window.localStorage.getItem(BOOKMARKS_KEY) || "[]");
    } catch (e) {
        return [];
    }
}
function toggleBookmark(postId) {
    const existing = getBookmarks();
    const next = existing.includes(postId) ? existing.filter((item)=>item !== postId) : [
        postId,
        ...existing
    ];
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
    return next;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/confession-app/frontend/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORY_OPTIONS",
    ()=>CATEGORY_OPTIONS,
    "EMOTION_REACTIONS",
    ()=>EMOTION_REACTIONS,
    "QUOTES",
    ()=>QUOTES,
    "TRENDING_TOPICS",
    ()=>TRENDING_TOPICS,
    "classifyConfession",
    ()=>classifyConfession,
    "formatCompactNumber",
    ()=>formatCompactNumber,
    "getScore",
    ()=>getScore,
    "getTopTags",
    ()=>getTopTags,
    "shouldBlur",
    ()=>shouldBlur
]);
const CATEGORY_OPTIONS = [
    {
        label: "Recent",
        value: ""
    },
    {
        label: "Trending",
        value: "trending"
    },
    {
        label: "Deep",
        value: "deep"
    },
    {
        label: "Secret",
        value: "secret"
    },
    {
        label: "Funny",
        value: "funny"
    }
];
const QUOTES = [
    "Some truths need a soft place to land.",
    "You can be honest here without becoming visible.",
    "Every anonymous story still deserves empathy.",
    "A quiet confession can start a loud healing."
];
const TRENDING_TOPICS = [
    "heartbreak",
    "friendship",
    "college",
    "career",
    "family",
    "late-night thoughts"
];
const EMOTION_REACTIONS = [
    {
        label: "Relatable",
        value: "relatable"
    },
    {
        label: "Funny",
        value: "funny"
    },
    {
        label: "Sad",
        value: "sad"
    }
];
function classifyConfession(text) {
    const value = text.toLowerCase();
    if (/(laugh|funny|meme|lol)/.test(value)) {
        return "funny";
    }
    if (/(secret|hide|nobody knows|anonymous)/.test(value)) {
        return "secret";
    }
    return "deep";
}
function shouldBlur(text) {
    return text.trim().length > 180;
}
function getScore(post) {
    var _post_comments;
    return (post.likes || 0) + (((_post_comments = post.comments) === null || _post_comments === void 0 ? void 0 : _post_comments.length) || 0) * 2 - (post.dislikes || 0);
}
function formatCompactNumber(value) {
    return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(value || 0);
}
function getTopTags(posts) {
    const counts = new Map();
    posts.forEach((post)=>{
        var _post_text;
        const matches = ((_post_text = post.text) === null || _post_text === void 0 ? void 0 : _post_text.toLowerCase().match(/#[a-z0-9-_]+/g)) || [];
        matches.forEach((tag)=>{
            counts.set(tag, (counts.get(tag) || 0) + 1);
        });
    });
    return [
        ...counts.entries()
    ].sort((a, b)=>b[1] - a[1]).slice(0, 4).map((param)=>{
        let [tag, count] = param;
        return {
            tag,
            count
        };
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/confession-app/frontend/components/confession-experience.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfessionExperience",
    ()=>ConfessionExperience
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/confession-app/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/confession-app/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/confession-app/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/confession-app/frontend/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/confession-app/frontend/lib/storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/confession-app/frontend/lib/utils.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const NAV_ITEMS = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/explore",
        label: "Explore"
    },
    {
        href: "/hearts",
        label: "Hearts"
    }
];
const REACTION_OPTIONS = [
    {
        label: "Quiet",
        value: "deep"
    },
    {
        label: "Unfiltered",
        value: "secret"
    },
    {
        label: "Chaotic",
        value: "funny"
    }
];
function ConfessionExperience(param) {
    let { mode } = param;
    _s();
    const [bookmarks, setBookmarks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [deviceId, setDeviceId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        theme: "system",
        revealEnabled: true
    });
    const [postVotes, setPostVotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [gestureState, setGestureState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [quoteIndex, setQuoteIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mode === "home" ? "" : "trending");
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isEnd, setIsEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isComposeOpen, setIsComposeOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [composeText, setComposeText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [commentDraft, setCommentDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [activePostId, setActivePostId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [commentSort, setCommentSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("top");
    const [searchInput, setSearchInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const deferredSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchInput);
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const activePost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConfessionExperience.useMemo[activePost]": ()=>posts.find({
                "ConfessionExperience.useMemo[activePost]": (post)=>post._id === activePostId
            }["ConfessionExperience.useMemo[activePost]"]) || null
    }["ConfessionExperience.useMemo[activePost]"], [
        activePostId,
        posts
    ]);
    const sortedComments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConfessionExperience.useMemo[sortedComments]": ()=>{
            if (!(activePost === null || activePost === void 0 ? void 0 : activePost.comments)) {
                return [];
            }
            const clone = [
                ...activePost.comments
            ];
            if (commentSort === "newest") {
                return clone.sort({
                    "ConfessionExperience.useMemo[sortedComments]": (a, b)=>new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                }["ConfessionExperience.useMemo[sortedComments]"]);
            }
            return clone.sort({
                "ConfessionExperience.useMemo[sortedComments]": (a, b)=>(b.likes || 0) - (b.dislikes || 0) - ((a.likes || 0) - (a.dislikes || 0))
            }["ConfessionExperience.useMemo[sortedComments]"]);
        }
    }["ConfessionExperience.useMemo[sortedComments]"], [
        activePost,
        commentSort
    ]);
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConfessionExperience.useMemo[metrics]": ()=>{
            const totalComments = posts.reduce({
                "ConfessionExperience.useMemo[metrics].totalComments": (sum, post)=>{
                    var _post_comments;
                    return sum + (((_post_comments = post.comments) === null || _post_comments === void 0 ? void 0 : _post_comments.length) || 0);
                }
            }["ConfessionExperience.useMemo[metrics].totalComments"], 0);
            const totalReactions = posts.reduce({
                "ConfessionExperience.useMemo[metrics].totalReactions": (sum, post)=>sum + (post.likes || 0) + (post.dislikes || 0)
            }["ConfessionExperience.useMemo[metrics].totalReactions"], 0);
            return {
                confessions: posts.length,
                replies: totalComments,
                pulse: totalReactions
            };
        }
    }["ConfessionExperience.useMemo[metrics]"], [
        posts
    ]);
    const topTags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConfessionExperience.useMemo[topTags]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTopTags"])(posts)
    }["ConfessionExperience.useMemo[topTags]"], [
        posts
    ]);
    const bookmarkedPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConfessionExperience.useMemo[bookmarkedPosts]": ()=>posts.filter({
                "ConfessionExperience.useMemo[bookmarkedPosts]": (post)=>bookmarks.includes(post._id)
            }["ConfessionExperience.useMemo[bookmarkedPosts]"])
    }["ConfessionExperience.useMemo[bookmarkedPosts]"], [
        bookmarks,
        posts
    ]);
    const visiblePosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConfessionExperience.useMemo[visiblePosts]": ()=>{
            if (mode === "home") {
                return posts;
            }
            return [
                ...posts
            ].sort({
                "ConfessionExperience.useMemo[visiblePosts]": (a, b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScore"])(b) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScore"])(a)
            }["ConfessionExperience.useMemo[visiblePosts]"]);
        }
    }["ConfessionExperience.useMemo[visiblePosts]"], [
        mode,
        posts
    ]);
    function applyTheme(theme) {
        if (typeof document === "undefined") {
            return;
        }
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldUseDark = theme === "dark" || theme === "system" && prefersDark;
        document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfessionExperience.useEffect": ()=>{
            const nextDeviceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDeviceId"])();
            setDeviceId(nextDeviceId);
            setBookmarks((0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBookmarks"])());
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSettings"])(nextDeviceId).then({
                "ConfessionExperience.useEffect": (data)=>{
                    setSettings(data);
                    applyTheme(data.theme);
                }
            }["ConfessionExperience.useEffect"]).catch({
                "ConfessionExperience.useEffect": ()=>{
                    applyTheme("system");
                }
            }["ConfessionExperience.useEffect"]);
        }
    }["ConfessionExperience.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfessionExperience.useEffect": ()=>{
            const interval = window.setInterval({
                "ConfessionExperience.useEffect.interval": ()=>{
                    setQuoteIndex({
                        "ConfessionExperience.useEffect.interval": (current)=>(current + 1) % __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUOTES"].length
                    }["ConfessionExperience.useEffect.interval"]);
                }
            }["ConfessionExperience.useEffect.interval"], 4500);
            return ({
                "ConfessionExperience.useEffect": ()=>window.clearInterval(interval)
            })["ConfessionExperience.useEffect"];
        }
    }["ConfessionExperience.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfessionExperience.useEffect": ()=>{
            if (!deviceId) {
                return;
            }
            setError("");
            if (mode === "explore" && deferredSearch.trim()) {
                setLoading(true);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchPosts"])(deferredSearch).then({
                    "ConfessionExperience.useEffect": (data)=>{
                        setPosts(data);
                        setIsEnd(true);
                    }
                }["ConfessionExperience.useEffect"]).catch({
                    "ConfessionExperience.useEffect": ()=>{
                        setError("Search is unavailable right now.");
                        setPosts([]);
                    }
                }["ConfessionExperience.useEffect"]).finally({
                    "ConfessionExperience.useEffect": ()=>setLoading(false)
                }["ConfessionExperience.useEffect"]);
                return;
            }
            if (mode === "hearts") {
                const myPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMyPosts"])();
                if (!myPosts.length) {
                    setPosts([]);
                    setLoading(false);
                    setIsEnd(true);
                    return;
                }
                setLoading(true);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActivity"])(myPosts).then({
                    "ConfessionExperience.useEffect": (data)=>{
                        setPosts(data);
                        setIsEnd(true);
                    }
                }["ConfessionExperience.useEffect"]).catch({
                    "ConfessionExperience.useEffect": ()=>{
                        setError("We couldn't load your activity.");
                        setPosts([]);
                    }
                }["ConfessionExperience.useEffect"]).finally({
                    "ConfessionExperience.useEffect": ()=>setLoading(false)
                }["ConfessionExperience.useEffect"]);
                return;
            }
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeed"])({
                category: selectedCategory,
                page,
                limit: 10
            }).then({
                "ConfessionExperience.useEffect": (data)=>{
                    setPosts({
                        "ConfessionExperience.useEffect": (current)=>page === 1 ? data : [
                                ...current,
                                ...data
                            ]
                    }["ConfessionExperience.useEffect"]);
                    setIsEnd(data.length < 10 || selectedCategory === "trending");
                }
            }["ConfessionExperience.useEffect"]).catch({
                "ConfessionExperience.useEffect": ()=>{
                    setError("The feed is having a quiet moment. Try again shortly.");
                    if (page === 1) {
                        setPosts([]);
                    }
                }
            }["ConfessionExperience.useEffect"]).finally({
                "ConfessionExperience.useEffect": ()=>setLoading(false)
            }["ConfessionExperience.useEffect"]);
        }
    }["ConfessionExperience.useEffect"], [
        deferredSearch,
        deviceId,
        mode,
        page,
        selectedCategory
    ]);
    const heroText = mode === "explore" ? "Search the confessions people cannot say out loud." : mode === "hearts" ? "Track the confessions you posted and how people responded." : "A fast, anonymous social feed for thoughts that need room to breathe.";
    async function persistSettings(nextSettings) {
        setSettings(nextSettings);
        applyTheme(nextSettings.theme);
        if (!deviceId) {
            return;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateSettings"])(deviceId, nextSettings);
        } catch (e) {
            setError("Your preferences changed locally, but syncing failed.");
        }
    }
    async function handleVote(postId, voteType) {
        if (!deviceId) {
            return;
        }
        const previousVote = postVotes[postId];
        if (previousVote === voteType) {
            return;
        }
        setPostVotes((current)=>({
                ...current,
                [postId]: voteType
            }));
        setPosts((current)=>current.map((post)=>applyOptimisticVote(post, postId, previousVote, voteType)));
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["votePost"])(postId, voteType, deviceId);
        } catch (e) {
            setPostVotes((current)=>({
                    ...current,
                    [postId]: previousVote
                }));
            setPosts((current)=>current.map((post)=>applyOptimisticVote(post, postId, voteType, previousVote)));
            setError("Vote failed. Please try again.");
        }
    }
    async function handleCommentVote(commentId, isLike) {
        if (!deviceId || !activePostId) {
            return;
        }
        try {
            const updatedPost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["voteComment"])(activePostId, commentId, isLike, deviceId);
            setPosts((current)=>current.map((post)=>post._id === activePostId ? updatedPost : post));
        } catch (e) {
            setError("Comment vote failed.");
        }
    }
    async function submitComment() {
        if (!commentDraft.trim() || !activePostId) {
            return;
        }
        try {
            const updatedPost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addComment"])(activePostId, commentDraft.trim());
            setPosts((current)=>current.map((post)=>post._id === activePostId ? updatedPost : post));
            setCommentDraft("");
        } catch (submissionError) {
            setError(submissionError.message || "Comment failed.");
        }
    }
    async function submitConfession() {
        if (composeText.trim().length < 8) {
            return;
        }
        const payload = {
            text: composeText.trim(),
            type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classifyConfession"])(composeText),
            blurred: (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldBlur"])(composeText)
        };
        try {
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPost"])(payload);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveMyPost"])(created._id);
            setComposeText("");
            setIsComposeOpen(false);
            setSelectedCategory("");
            setPage(1);
            setPosts((current)=>[
                    created,
                    ...current
                ]);
        } catch (submissionError) {
            setError(submissionError.message || "Posting failed.");
        }
    }
    function cycleTheme() {
        const nextTheme = settings.theme === "light" ? "dark" : settings.theme === "dark" ? "system" : "light";
        void persistSettings({
            ...settings,
            theme: nextTheme
        });
    }
    function toggleReveal() {
        void persistSettings({
            ...settings,
            revealEnabled: !settings.revealEnabled
        });
    }
    function refreshCategory(nextCategory) {
        setSelectedCategory(nextCategory);
        setPage(1);
        setIsEnd(false);
    }
    function loadMore() {
        startTransition(()=>{
            setPage((current)=>current + 1);
        });
    }
    function handleBookmark(postId) {
        setBookmarks((0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleBookmark"])(postId));
    }
    function handleTouchStart(postId, event) {
        const point = event.touches[0];
        setGestureState((current)=>({
                ...current,
                [postId]: {
                    startX: point.clientX,
                    deltaX: 0
                }
            }));
    }
    function handleTouchMove(postId, event) {
        const point = event.touches[0];
        setGestureState((current)=>{
            const gesture = current[postId];
            if (!gesture) {
                return current;
            }
            return {
                ...current,
                [postId]: {
                    ...gesture,
                    deltaX: Math.max(-110, Math.min(110, point.clientX - gesture.startX))
                }
            };
        });
    }
    function handleTouchEnd(postId) {
        const gesture = gestureState[postId];
        if (!gesture) {
            return;
        }
        if (gesture.deltaX > 72) {
            handleBookmark(postId);
        } else if (gesture.deltaX < -72) {
            setActivePostId(postId);
        }
        setGestureState((current)=>({
                ...current,
                [postId]: {
                    startX: 0,
                    deltaX: 0
                }
            }));
    }
    async function handleReaction(postId, reactionType) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reactToPost"])(postId, reactionType);
            setPosts((current)=>current.map((post)=>{
                    var _post_reactions;
                    return post._id === postId ? {
                        ...post,
                        reactions: {
                            ...post.reactions,
                            [reactionType]: (((_post_reactions = post.reactions) === null || _post_reactions === void 0 ? void 0 : _post_reactions[reactionType]) || 0) + 1
                        }
                    } : post;
                }));
        } catch (e) {
            setError("Reaction failed.");
        }
    }
    async function handleReport(postId) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportPost"])(postId);
            setError("Thanks. That confession has been flagged for review.");
        } catch (e) {
            setError("Reporting failed.");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ambient ambient-left"
            }, void 0, false, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 406,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ambient ambient-right"
            }, void 0, false, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 407,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "frame",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "hero-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-topline",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "brand-mark",
                                        children: "C"
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 412,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Confessly"
                                            }, void 0, false, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 414,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                children: "Anonymous honesty, redesigned for speed."
                                            }, void 0, false, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 415,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hero-copy",
                                children: heroText
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 419,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "primary-button",
                                        onClick: ()=>setIsComposeOpen(true),
                                        children: "Write a confession"
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 422,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "secondary-button",
                                        onClick: toggleReveal,
                                        children: [
                                            "Blur ",
                                            settings.revealEnabled ? "on" : "off"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ghost-button",
                                        onClick: cycleTheme,
                                        children: [
                                            "Theme: ",
                                            settings.theme
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 428,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 421,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "metrics-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                        label: "Confessions",
                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(metrics.confessions)
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 434,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                        label: "Replies",
                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(metrics.replies)
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 435,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                        label: "Pulse",
                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(metrics.pulse)
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "quote-line",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUOTES"][quoteIndex]
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 439,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "tab-nav desktop-nav",
                        children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: modePath(mode) === item.href ? "tab-link active" : "tab-link",
                                children: item.label
                            }, item.href, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 444,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this),
                    mode !== "hearts" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "eyebrow",
                                                children: "Filters"
                                            }, void 0, false, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 458,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: mode === "explore" ? "Search and discover" : "Live confession stream"
                                            }, void 0, false, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 459,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "status-pill",
                                        children: isPending ? "Loading" : "Realtime"
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 461,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 456,
                                columnNumber: 13
                            }, this),
                            mode === "explore" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "search-shell",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Search"
                                            }, void 0, false, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 467,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: searchInput,
                                                onChange: (event)=>setSearchInput(event.target.value),
                                                placeholder: "Try heartbreak, exams, secrets..."
                                            }, void 0, false, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 468,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 466,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "chip-row",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRENDING_TOPICS"].map((topic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "topic-chip",
                                                onClick: ()=>setSearchInput(topic),
                                                children: [
                                                    "#",
                                                    topic
                                                ]
                                            }, topic, true, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 477,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 475,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chip-row",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_OPTIONS"].map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: selectedCategory === category.value ? "topic-chip active" : "topic-chip",
                                        onClick: ()=>refreshCategory(category.value),
                                        children: category.label
                                    }, category.label, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 490,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 488,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 455,
                        columnNumber: 11
                    }, this) : null,
                    mode === "explore" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "insight-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "metric-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Top tags"
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 508,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: topTags.length ? topTags[0].tag : "waiting"
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 509,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "insight-copy",
                                        children: topTags.length ? "".concat(topTags[0].count, " active mentions in the current result set.") : "Search or browse to surface live patterns."
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 507,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "metric-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Saved posts"
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(bookmarkedPosts.length)
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 516,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "insight-copy",
                                        children: "Keep meaningful confessions close without losing anonymity."
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 517,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 514,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "metric-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Search volume"
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 520,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(visiblePosts.length)
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 521,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "insight-copy",
                                        children: "Live result count from the backend search index."
                                    }, void 0, false, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 522,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 519,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 506,
                        columnNumber: 11
                    }, this) : null,
                    mode === "hearts" && !visiblePosts.length && !loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "empty-state",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "No activity yet"
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 529,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Your hearts dashboard wakes up after your first confession."
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 530,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "primary-button",
                                onClick: ()=>setIsComposeOpen(true),
                                children: "Post now"
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 531,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 528,
                        columnNumber: 11
                    }, this) : null,
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "inline-error",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 537,
                        columnNumber: 18
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "feed-grid",
                        children: loading && page === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCards, {}, void 0, false, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 541,
                            columnNumber: 13
                        }, this) : visiblePosts.map((post)=>{
                            var _gestureState_post__id, _post_comments;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "post-card",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "swipe-hint",
                                    style: {
                                        transform: "translateX(".concat(((_gestureState_post__id = gestureState[post._id]) === null || _gestureState_post__id === void 0 ? void 0 : _gestureState_post__id.deltaX) || 0, "px)")
                                    },
                                    onTouchStart: (event)=>handleTouchStart(post._id, event),
                                    onTouchMove: (event)=>handleTouchMove(post._id, event),
                                    onTouchEnd: ()=>handleTouchEnd(post._id),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "post-meta",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "post-type",
                                                    children: post.type || "deep"
                                                }, void 0, false, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 555,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: post.timeAgo || "Just now"
                                                }, void 0, false, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 556,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 554,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: post.blurred && settings.revealEnabled ? "post-text blurred" : "post-text",
                                            children: post.text
                                        }, void 0, false, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 559,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "post-stats",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "stat-button",
                                                    onClick: ()=>handleVote(post._id, "like"),
                                                    children: [
                                                        "Appreciate ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(post.likes || 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 564,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "stat-button",
                                                    onClick: ()=>handleVote(post._id, "dislike"),
                                                    children: [
                                                        "Skip ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(post.dislikes || 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 567,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "stat-button accent",
                                                    onClick: ()=>setActivePostId(post._id),
                                                    children: [
                                                        "Discuss ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(((_post_comments = post.comments) === null || _post_comments === void 0 ? void 0 : _post_comments.length) || 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 570,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 563,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "post-actions",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "mini-action",
                                                    onClick: ()=>handleBookmark(post._id),
                                                    children: bookmarks.includes(post._id) ? "Saved" : "Save"
                                                }, void 0, false, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 576,
                                                    columnNumber: 19
                                                }, this),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMOTION_REACTIONS"].map((reaction)=>{
                                                    var _post_reactions;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "mini-action",
                                                        onClick: ()=>handleReaction(post._id, reaction.value),
                                                        children: [
                                                            reaction.label,
                                                            " ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(((_post_reactions = post.reactions) === null || _post_reactions === void 0 ? void 0 : _post_reactions[reaction.value]) || 0)
                                                        ]
                                                    }, reaction.value, true, {
                                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                        lineNumber: 580,
                                                        columnNumber: 21
                                                    }, this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "mini-action subtle",
                                                    onClick: ()=>handleReport(post._id),
                                                    children: "Report"
                                                }, void 0, false, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 588,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 575,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 545,
                                    columnNumber: 17
                                }, this)
                            }, post._id, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 544,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 539,
                        columnNumber: 9
                    }, this),
                    mode === "hearts" && bookmarkedPosts.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel-header",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: "Saved collection"
                                        }, void 0, false, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 602,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Bookmarked confessions"
                                        }, void 0, false, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 603,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 601,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 600,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bookmark-list",
                                children: bookmarkedPosts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bookmark-card",
                                        onClick: ()=>setActivePostId(post._id),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: post.type || "deep"
                                            }, void 0, false, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 609,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: post.text
                                            }, void 0, false, {
                                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                lineNumber: 610,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, post._id, true, {
                                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                        lineNumber: 608,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 606,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 599,
                        columnNumber: 11
                    }, this) : null,
                    !loading && !visiblePosts.length && mode !== "hearts" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "empty-state",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "Nothing matched"
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 619,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Try a different keyword or category and we'll surface more confessions."
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 620,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 618,
                        columnNumber: 11
                    }, this) : null,
                    !isEnd && mode === "home" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "load-more",
                        onClick: loadMore,
                        disabled: isPending,
                        children: isPending ? "Pulling more stories..." : "Load more confessions"
                    }, void 0, false, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 625,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 409,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "floating-compose",
                onClick: ()=>setIsComposeOpen(true),
                children: "+"
            }, void 0, false, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 631,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bottom-nav",
                children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item.href,
                        className: modePath(mode) === item.href ? "bottom-link active" : "bottom-link",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 642,
                            columnNumber: 13
                        }, this)
                    }, item.href, false, {
                        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                        lineNumber: 637,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 635,
                columnNumber: 7
            }, this),
            isComposeOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overlay",
                onClick: ()=>setIsComposeOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "modal-card",
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: "Compose"
                                        }, void 0, false, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 652,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Say it exactly how it feels."
                                        }, void 0, false, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 653,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 651,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "close-button",
                                    onClick: ()=>setIsComposeOpen(false),
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 655,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 650,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "reaction-row",
                            children: REACTION_OPTIONS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mini-chip",
                                    children: item.label
                                }, item.value, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 662,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 660,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            className: "compose-input",
                            value: composeText,
                            onChange: (event)=>setComposeText(event.target.value),
                            placeholder: "No name. No profile. Just the truth."
                        }, void 0, false, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 668,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "compose-footer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        composeText.trim().length,
                                        "/1000"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 676,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "primary-button",
                                    disabled: composeText.trim().length < 8,
                                    onClick: submitConfession,
                                    children: "Post anonymously"
                                }, void 0, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 677,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 675,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                    lineNumber: 649,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 648,
                columnNumber: 9
            }, this) : null,
            activePost ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overlay",
                onClick: ()=>setActivePostId(""),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "drawer-card",
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "eyebrow",
                                            children: "Discussion"
                                        }, void 0, false, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 694,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: "Community replies"
                                        }, void 0, false, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 695,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 693,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "close-button",
                                    onClick: ()=>setActivePostId(""),
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 697,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 692,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sort-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: commentSort === "top" ? "topic-chip active" : "topic-chip",
                                    onClick: ()=>setCommentSort("top"),
                                    children: "Top"
                                }, void 0, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 703,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: commentSort === "newest" ? "topic-chip active" : "topic-chip",
                                    onClick: ()=>setCommentSort("newest"),
                                    children: "Newest"
                                }, void 0, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 709,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 702,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "comment-list",
                            children: sortedComments.length ? sortedComments.map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "comment-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: comment.text
                                        }, void 0, false, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 721,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "comment-footer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: comment.timeAgo || "Just now"
                                                }, void 0, false, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 723,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "comment-actions",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleCommentVote(comment._id, true),
                                                            children: [
                                                                "Up ",
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(comment.likes || 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                            lineNumber: 725,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleCommentVote(comment._id, false),
                                                            children: [
                                                                "Down ",
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCompactNumber"])(comment.dislikes || 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                            lineNumber: 728,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                                    lineNumber: 724,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                            lineNumber: 722,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, comment._id, true, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 720,
                                    columnNumber: 19
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-state compact",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "No replies yet."
                                }, void 0, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 737,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                lineNumber: 736,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 717,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "comment-input-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: commentDraft,
                                    onChange: (event)=>setCommentDraft(event.target.value),
                                    placeholder: "Respond gently, honestly, anonymously..."
                                }, void 0, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 743,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "primary-button",
                                    onClick: submitComment,
                                    children: "Reply"
                                }, void 0, false, {
                                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                                    lineNumber: 748,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                            lineNumber: 742,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                    lineNumber: 691,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 690,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
        lineNumber: 405,
        columnNumber: 5
    }, this);
}
_s(ConfessionExperience, "VhdYv/dfstbZfY2BEPea4IignDo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = ConfessionExperience;
function StatCard(param) {
    let { label, value } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "metric-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 762,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: value
            }, void 0, false, {
                fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
                lineNumber: 763,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
        lineNumber: 761,
        columnNumber: 5
    }, this);
}
_c1 = StatCard;
function SkeletonCards() {
    return Array.from({
        length: 6
    }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$confession$2d$app$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "skeleton-card"
        }, index, false, {
            fileName: "[project]/confession-app/frontend/components/confession-experience.jsx",
            lineNumber: 769,
            columnNumber: 54
        }, this));
}
_c2 = SkeletonCards;
function modePath(mode) {
    if (mode === "explore") {
        return "/explore";
    }
    if (mode === "hearts") {
        return "/hearts";
    }
    return "/";
}
function applyOptimisticVote(post, postId, previousVote, nextVote) {
    if (post._id !== postId) {
        return post;
    }
    const likes = Math.max(0, (post.likes || 0) - (previousVote === "like" ? 1 : 0) + (nextVote === "like" ? 1 : 0));
    const dislikes = Math.max(0, (post.dislikes || 0) - (previousVote === "dislike" ? 1 : 0) + (nextVote === "dislike" ? 1 : 0));
    return {
        ...post,
        likes,
        dislikes
    };
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ConfessionExperience");
__turbopack_context__.k.register(_c1, "StatCard");
__turbopack_context__.k.register(_c2, "SkeletonCards");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=confession-app_frontend_af3b2744._.js.map