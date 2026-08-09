require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/api/socket.io",
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

// ─── Data ────────────────────────────────────────────────────────────────────

const gifts = [
  { id: 1, name: "Lion Roar", emoji: "🦁", coin_cost: 10, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/046a1834d48c46df.mp4" },
  { id: 2, name: "Dragon Fire", emoji: "🐉", coin_cost: 50, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/413c39b54df4f333.mp4" },
  { id: 3, name: "Unicorn Magic", emoji: "🦄", coin_cost: 30, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/d1264085471a5600.mp4" },
  { id: 4, name: "Mardi Castle", emoji: "🏰", coin_cost: 100, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/75e5df38bfe8002a.mp4" },
  { id: 5, name: "Emerald Castle", emoji: "💚", coin_cost: 200, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/aeb16ed0a4050e9e.mp4" },
  { id: 6, name: "Black God Gift", emoji: "👑", coin_cost: 500, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/d2e18806e6fbfc08.mp4" },
  { id: 7, name: "Whale Breach", emoji: "🐋", coin_cost: 75, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/6fba9ad4b8a7cb09.mp4" },
  { id: 8, name: "Queen of Heaven", emoji: "🌸", coin_cost: 300, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/0e23a26c03156993.mp4" },
  { id: 9, name: "Second Coming", emoji: "✝️", coin_cost: 1000, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/0f1fc6af86b1a973.mp4" },
  { id: 10, name: "Stealth Bomber", emoji: "✈️", coin_cost: 150, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/424449d4606f055b.mp4" },
  { id: 11, name: "Supercar Launch", emoji: "🚀", coin_cost: 250, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/e08f836ffc87f503.mp4" },
  { id: 12, name: "Lion DJ", emoji: "🎧", coin_cost: 80, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/b7a5b2bdbdd98663.mp4" },
  { id: 13, name: "Mardi Float", emoji: "🎭", coin_cost: 60, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/9d0782006ea081aa.mp4" },
  { id: 14, name: "White Tiger", emoji: "⚡", coin_cost: 120, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/ae4d3060cf2fcbc8.mp4" },
  { id: 15, name: "Screaming Eagle", emoji: "🦅", coin_cost: 40, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/00947de3ffd93cc1.mp4" },
  { id: 16, name: "Robot Monster", emoji: "🤖", coin_cost: 180, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/721e2d3275e6c211.mp4" },
  { id: 17, name: "Heavenly Elephant", emoji: "🐘", coin_cost: 350, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/cfd63d61fb1e3bab.mp4" },
  { id: 18, name: "Clown Circus", emoji: "🤡", coin_cost: 20, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/a67ad455f1b842eb.mp4" },
  { id: 19, name: "Super Win", emoji: "🏈", coin_cost: 90, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/efe991dbad9a4b54.mp4" },
  { id: 20, name: "Dream Castle", emoji: "🌟", coin_cost: 400, animationUrl: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/41684a731489dc8f.mp4" },
];

const GIFT_TYPES = [
  { id: 1, name: "Rose", emoji: "🌹", coin_cost: 10, animation_class: "gift-rose", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 2, name: "Mic", emoji: "🎤", coin_cost: 25, animation_class: "gift-mic", category: "gifts" },
  { id: 3, name: "Guitar", emoji: "🎸", coin_cost: 50, animation_class: "gift-guitar", category: "gifts" },
  { id: 4, name: "Crown", emoji: "👑", coin_cost: 100, animation_class: "gift-crown", category: "gifts" },
  { id: 5, name: "Diamond", emoji: "💎", coin_cost: 500, animation_class: "gift-diamond", category: "gifts" },
  { id: 6, name: "Rocket", emoji: "🚀", coin_cost: 1000, animation_class: "gift-rocket", category: "gifts" },
  { id: 7, name: "Fire", emoji: "🔥", coin_cost: 75, animation_class: "gift-fire", category: "gifts" },
  { id: 8, name: "Trophy", emoji: "🏆", coin_cost: 250, animation_class: "gift-trophy", category: "gifts" },
  { id: 9, name: "Lion Roar", emoji: "🦁", coin_cost: 75000, animation_class: "gift-lion-cinematic", category: "gifts", animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/046a1834d48c46df.mp4" },
  { id: 10, name: "Dragon Fire", emoji: "🐉", coin_cost: 20000, animation_class: "gift-dragon-cinematic", category: "gifts", animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/413c39b54df4f333.mp4" },
  { id: 15, name: "Heart Me", emoji: "❤️", coin_cost: 1, animation_class: "gift-heart-me", category: "gifts" },
  { id: 16, name: "Music Note", emoji: "🎵", coin_cost: 5, animation_class: "gift-music-note", category: "gifts" },
  { id: 35, name: "Interstellar Trek", emoji: "🚀", coin_cost: 14999, animation_class: "gift-interstellar", category: "interactive" },
  { id: 44, name: "Archangel Michael", emoji: "⚔️", coin_cost: 750000, animation_class: "gift-archangel-michael", category: "exclusive" },
  { id: 66, name: "The Second Coming", emoji: "✝️", coin_cost: 150000, animation_class: "gift-second-coming", category: "exclusive" },
  { id: 83, name: "Lucky Fairy", emoji: "🧚", coin_cost: 1, animation_class: "gift-lucky", category: "lucky", is_lucky: true },
];

let streams = [
  { id: 1, title: "Friday Night Vibes", status: "live", viewer_count: 1243, artist_id: 1, artist_name: "DJ Nova", genre: "Hip-Hop", category: "Music", featured: true, gift_total: 4500, cf_live_input_uid: null, thumbnail_url: null, started_at: new Date().toISOString() },
  { id: 2, title: "Acoustic Sessions", status: "live", viewer_count: 567, artist_id: 2, artist_name: "Luna Keys", genre: "R&B", category: "Music", featured: false, gift_total: 1200, cf_live_input_uid: null, thumbnail_url: null, started_at: new Date().toISOString() },
  { id: 3, title: "Beat Battle Championship", status: "live", viewer_count: 3021, artist_id: 3, artist_name: "MC Thunder", genre: "Rap", category: "Music", featured: true, gift_total: 8700, cf_live_input_uid: null, thumbnail_url: null, started_at: new Date().toISOString() },
];
let nextStreamId = 4;

const artists = [
  { id: 1, stage_name: "DJ Nova", genre: "Hip-Hop", bio: "Bringing the heat every night", follower_count: 15200, total_gifts_received: 8700, is_live: true, category: "Music", avatar_url: null },
  { id: 2, stage_name: "Luna Keys", genre: "R&B", bio: "Soul in every note", follower_count: 8900, total_gifts_received: 4200, is_live: true, category: "Music", avatar_url: null },
  { id: 3, stage_name: "MC Thunder", genre: "Rap", bio: "Words that shake the ground", follower_count: 22100, total_gifts_received: 19500, is_live: true, category: "Music", avatar_url: null },
  { id: 4, stage_name: "Bella Strings", genre: "Classical", bio: "Violin virtuoso", follower_count: 6700, total_gifts_received: 3100, is_live: false, category: "Music", avatar_url: null },
  { id: 5, stage_name: "Neon Pulse", genre: "EDM", bio: "Drop it low, bring it high", follower_count: 31000, total_gifts_received: 27800, is_live: false, category: "Music", avatar_url: null },
];

const commentsDb = {};
let nextCommentId = 1;

const battles = [
  { id: 1, artist1_id: 1, artist2_id: 3, artist1_name: "DJ Nova", artist2_name: "MC Thunder", artist1_avatar: null, artist2_avatar: null, coins1: 4500, coins2: 6200, status: "active", duration_seconds: 300, started_at: new Date().toISOString() },
  { id: 2, artist1_id: 2, artist2_id: 5, artist1_name: "Luna Keys", artist2_name: "Neon Pulse", artist1_avatar: null, artist2_avatar: null, coins1: 2100, coins2: 1800, status: "completed", duration_seconds: 300, started_at: new Date(Date.now() - 3600000).toISOString() },
];

const leaderboard = [
  { rank: 1, artist_id: 5, stage_name: "Neon Pulse", genre: "EDM", total_coins: 27800, avatar_url: null },
  { rank: 2, artist_id: 3, stage_name: "MC Thunder", genre: "Rap", total_coins: 19500, avatar_url: null },
  { rank: 3, artist_id: 1, stage_name: "DJ Nova", genre: "Hip-Hop", total_coins: 8700, avatar_url: null },
  { rank: 4, artist_id: 2, stage_name: "Luna Keys", genre: "R&B", total_coins: 4200, avatar_url: null },
  { rank: 5, artist_id: 4, stage_name: "Bella Strings", genre: "Classical", total_coins: 3100, avatar_url: null },
];

// ─── Admin Data Stores ───────────────────────────────────────────────────────

const giftEvents = [];
let nextGiftEventId = 1;

const moderationFlags = [
  { id: 1, stream_id: 1, artist_name: "DJ Nova", reason: "Inappropriate language", severity: "warning", status: "pending", created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 2, stream_id: 3, artist_name: "MC Thunder", reason: "Copyright music detected", severity: "moderate", status: "pending", created_at: new Date(Date.now() - 900000).toISOString() },
  { id: 3, stream_id: 2, artist_name: "Luna Keys", reason: "Spam in chat reported", severity: "low", status: "dismissed", created_at: new Date(Date.now() - 3600000).toISOString() },
];
let nextFlagId = 4;

let totalCoinsInCirculation = 500000;

// ─── Viewer tracking ─────────────────────────────────────────────────────────

const streamViewers = {};

// ─── Admin Middleware ────────────────────────────────────────────────────────

const ADMIN_KEY = "SML_ADMIN_2026";

function adminAuth(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized: invalid admin key" });
  }
  next();
}

// ─── Admin Routes ────────────────────────────────────────────────────────────

// GET /admin/streams — all active streams
app.get("/admin/streams", adminAuth, (req, res) => {
  const liveStreams = streams.filter(s => s.status === "live").map(s => ({
    ...s,
    viewer_count: streamViewers[s.id] || s.viewer_count,
  }));
  res.json(liveStreams);
});

// GET /admin/moderation — recent flags (last 50)
app.get("/admin/moderation", adminAuth, (req, res) => {
  const recent = moderationFlags.slice(-50).reverse();
  res.json(recent);
});

// POST /admin/moderation/:id/dismiss — dismiss a flag
app.post("/admin/moderation/:id/dismiss", adminAuth, (req, res) => {
  const flag = moderationFlags.find(f => f.id === Number(req.params.id));
  if (!flag) return res.status(404).json({ error: "Flag not found" });
  flag.status = "dismissed";
  res.json({ success: true, flag });
});

// POST /admin/moderation/:id/action — take action on a flag
app.post("/admin/moderation/:id/action", adminAuth, (req, res) => {
  const flag = moderationFlags.find(f => f.id === Number(req.params.id));
  if (!flag) return res.status(404).json({ error: "Flag not found" });
  flag.status = "actioned";
  // If action is to end stream, do that too
  if (req.body.endStream) {
    const stream = streams.find(s => s.id === flag.stream_id);
    if (stream) stream.status = "ended";
  }
  res.json({ success: true, flag });
});

// POST /admin/gift — send promo gift
app.post("/admin/gift", adminAuth, (req, res) => {
  const { streamId, giftTypeId, artistId, quantity } = req.body;
  if (!streamId || !giftTypeId || !artistId) {
    return res.status(400).json({ error: "streamId, giftTypeId, and artistId required" });
  }
  const gift = gifts.find(g => g.id === giftTypeId) || GIFT_TYPES.find(g => g.id === giftTypeId);
  if (!gift) return res.status(404).json({ error: "Gift type not found" });
  
  const qty = quantity || 1;
  const event = {
    id: nextGiftEventId++,
    stream_id: streamId,
    gift_type_id: giftTypeId,
    gift_name: gift.name,
    gift_emoji: gift.emoji,
    artist_id: artistId,
    quantity: qty,
    is_promo: true,
    coin_cost: 0,
    created_at: new Date().toISOString(),
  };
  giftEvents.push(event);

  // Emit the gift animation to the stream
  const stream = streams.find(s => s.id === streamId);
  if (stream) {
    stream.gift_total = (stream.gift_total || 0) + qty;
  }
  io.to(`stream_${streamId}`).emit("gift_animation", {
    username: "🎁 Share Me Live (Promo)",
    giftName: gift.name,
    giftEmoji: gift.emoji,
    animationUrl: gift.animationUrl || gift.animation_url || null,
    isPromo: true,
  });

  res.json({ success: true, event });
});

// POST /admin/stream/:id/end — end a stream
app.post("/admin/stream/:id/end", adminAuth, (req, res) => {
  const stream = streams.find(s => s.id === Number(req.params.id));
  if (!stream) return res.status(404).json({ error: "Stream not found" });
  stream.status = "ended";
  io.to(`stream_${stream.id}`).emit("stream_ended", { reason: "Ended by admin" });
  res.json({ success: true, stream });
});

// POST /admin/stream/:id/featured — toggle featured status
app.post("/admin/stream/:id/featured", adminAuth, (req, res) => {
  const stream = streams.find(s => s.id === Number(req.params.id));
  if (!stream) return res.status(404).json({ error: "Stream not found" });
  stream.featured = !stream.featured;
  res.json({ success: true, stream });
});

// GET /admin/stats — overview stats
app.get("/admin/stats", adminAuth, (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const giftsToday = giftEvents.filter(e => e.created_at.startsWith(today)).length;
  const activeStreams = streams.filter(s => s.status === "live").length;
  const totalViewers = streams.filter(s => s.status === "live").reduce((sum, s) => sum + (streamViewers[s.id] || s.viewer_count), 0);
  res.json({
    active_streams: activeStreams,
    total_viewers: totalViewers,
    gifts_sent_today: giftsToday,
    total_gift_events: giftEvents.length,
    coins_in_circulation: totalCoinsInCirculation,
    total_artists: artists.length,
    moderation_pending: moderationFlags.filter(f => f.status === "pending").length,
  });
});

// GET /admin/artists — all artists (for dropdown)
app.get("/admin/artists", adminAuth, (req, res) => {
  res.json(artists);
});

// GET /admin/gifts — all gift types (for dropdown)
app.get("/admin/gifts", adminAuth, (req, res) => {
  res.json([...gifts, ...GIFT_TYPES]);
});

// ─── REST Routes ─────────────────────────────────────────────────────────────

// Gifts
app.get("/api/gifts", (req, res) => {
  res.json(gifts);
});

app.post("/api/gifts", (req, res) => {
  const { streamId, giftTypeId, senderName, coins } = req.body;
  if (!streamId || !giftTypeId || !senderName) {
    return res.status(400).json({ error: "streamId, giftTypeId, and senderName required" });
  }
  const gift = gifts.find((g) => g.id === giftTypeId);
  if (!gift) {
    return res.status(404).json({ error: "Gift type not found" });
  }
  const payload = {
    username: senderName,
    giftName: gift.name,
    giftEmoji: gift.emoji,
    animationUrl: gift.animationUrl,
  };
  io.to(`stream_${streamId}`).emit("gift_animation", payload);
  
  // Track gift event
  giftEvents.push({
    id: nextGiftEventId++,
    stream_id: streamId,
    gift_type_id: giftTypeId,
    gift_name: gift.name,
    gift_emoji: gift.emoji,
    artist_id: null,
    quantity: 1,
    is_promo: false,
    coin_cost: gift.coin_cost,
    created_at: new Date().toISOString(),
  });
  
  res.json({ success: true, gift: payload });
});

// Streams
app.get("/api/streams", (req, res) => {
  let result = [...streams];
  if (req.query.status) result = result.filter((s) => s.status === req.query.status);
  if (req.query.genre) result = result.filter((s) => s.genre === req.query.genre);
  if (req.query.limit) result = result.slice(0, Number(req.query.limit));
  res.json(result);
});

app.get("/api/streams/:id", (req, res) => {
  const stream = streams.find((s) => s.id === Number(req.params.id));
  if (!stream) return res.status(404).json({ error: "Stream not found" });
  res.json(stream);
});

app.post("/api/streams", (req, res) => {
  const { title, artistId, genre, category } = req.body;
  const artist = artists.find((a) => a.id === artistId);
  const newStream = {
    id: nextStreamId++,
    title: title || "Untitled Stream",
    status: "live",
    viewer_count: 0,
    artist_id: artistId || null,
    artist_name: artist ? artist.stage_name : "Unknown",
    genre: genre || null,
    category: category || null,
    featured: false,
    gift_total: 0,
    cf_live_input_uid: null,
    thumbnail_url: null,
    started_at: new Date().toISOString(),
  };
  streams.push(newStream);
  res.status(201).json(newStream);
});

app.patch("/api/streams/:id", (req, res) => {
  const stream = streams.find((s) => s.id === Number(req.params.id));
  if (!stream) return res.status(404).json({ error: "Stream not found" });
  Object.assign(stream, req.body);
  res.json(stream);
});

// Comments
app.get("/api/streams/:id/comments", (req, res) => {
  const id = Number(req.params.id);
  res.json(commentsDb[id] || []);
});

app.post("/api/streams/:id/comments", (req, res) => {
  const id = Number(req.params.id);
  const { username, message } = req.body;
  if (!username || !message) {
    return res.status(400).json({ error: "username and message required" });
  }
  if (!commentsDb[id]) commentsDb[id] = [];
  const comment = {
    id: nextCommentId++,
    stream_id: id,
    username,
    message,
    created_at: new Date().toISOString(),
  };
  commentsDb[id].push(comment);
  io.to(`stream_${id}`).emit("chat_message", { username, message });
  res.status(201).json(comment);
});

// Artists
app.get("/api/artists", (req, res) => {
  let result = [...artists];
  if (req.query.genre) result = result.filter((a) => a.genre === req.query.genre);
  if (req.query.search) {
    const q = String(req.query.search).toLowerCase();
    result = result.filter((a) => a.stage_name.toLowerCase().includes(q));
  }
  if (req.query.limit) result = result.slice(0, Number(req.query.limit));
  res.json(result);
});

app.get("/api/artists/:id", (req, res) => {
  const artist = artists.find((a) => a.id === Number(req.params.id));
  if (!artist) return res.status(404).json({ error: "Artist not found" });
  res.json(artist);
});

// Discovery
app.get("/api/discovery/featured", (req, res) => {
  res.json(streams.filter((s) => s.status === "live"));
});

app.get("/api/discovery/trending", (req, res) => {
  res.json({ artists: artists.filter((a) => a.is_live) });
});

app.get("/api/discovery/leaderboard", (req, res) => {
  const limit = Number(req.query.limit) || 20;
  res.json(leaderboard.slice(0, limit));
});

// Battles
app.get("/api/battles", (req, res) => {
  res.json(battles);
});

// Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", version: "2.1.0-admin", uptime: process.uptime() });
});

// ─── Socket.io Events ────────────────────────────────────────────────────────

io.on("connection", (socket) => {
  let currentStream = null;

  socket.on("join_stream", (streamId) => {
    const room = `stream_${streamId}`;
    if (currentStream) {
      socket.leave(`stream_${currentStream}`);
      if (streamViewers[currentStream]) {
        streamViewers[currentStream]--;
        io.to(`stream_${currentStream}`).emit("viewer_count", streamViewers[currentStream]);
      }
    }
    currentStream = streamId;
    socket.join(room);
    if (!streamViewers[streamId]) streamViewers[streamId] = 0;
    streamViewers[streamId]++;
    io.to(room).emit("viewer_count", streamViewers[streamId]);
  });

  socket.on("chat_message", (data) => {
    const { streamId, message, username } = data;
    if (!streamId || !message || !username) return;
    const room = `stream_${streamId}`;
    if (!commentsDb[streamId]) commentsDb[streamId] = [];
    const comment = {
      id: nextCommentId++,
      stream_id: streamId,
      username,
      message,
      created_at: new Date().toISOString(),
    };
    commentsDb[streamId].push(comment);
    io.to(room).emit("chat_message", { username, message });
  });

  socket.on("disconnect", () => {
    if (currentStream && streamViewers[currentStream]) {
      streamViewers[currentStream]--;
      io.to(`stream_${currentStream}`).emit("viewer_count", streamViewers[currentStream]);
    }
  });
});

// ─── Start ───────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Share Me Live 2.0 Backend running on port ${PORT}`);
    console.log(`  REST API: http://localhost:${PORT}/api`);
    console.log(`  Admin API: http://localhost:${PORT}/admin`);
    console.log(`  Socket.io path: /api/socket.io`);
  });
}

module.exports = { app, server, io };
