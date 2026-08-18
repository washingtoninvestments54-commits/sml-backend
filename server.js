require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/api/socket.io",
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());
app.use('/gifts', express.static(path.join(__dirname, 'public/gifts')));
app.use('/.well-known', express.static(path.join(__dirname, 'public/.well-known')));

// ─── Data ────────────────────────────────────────────────────────────────────

// CDN base for cinematic gift videos
const CDN_BASE = "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos";


// Full 90-gift database with all categories, lucky gifts, and cinematic URLs
const GIFT_TYPES = [
  // ─── Standard Gifts (category: "gifts") ─────────────────────────────────────
  { id: 1, name: "Rose", emoji: "🌹", coin_cost: 10, animation_class: "gift-rose", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 2, name: "Mic", emoji: "🎤", coin_cost: 25, animation_class: "gift-mic", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 3, name: "Guitar", emoji: "🎸", coin_cost: 50, animation_class: "gift-guitar", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 4, name: "Crown", emoji: "👑", coin_cost: 100, animation_class: "gift-crown", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 5, name: "Diamond", emoji: "💎", coin_cost: 500, animation_class: "gift-diamond", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 6, name: "Rocket", emoji: "🚀", coin_cost: 1000, animation_class: "gift-rocket", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 7, name: "Fire", emoji: "🔥", coin_cost: 75, animation_class: "gift-fire", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 8, name: "Trophy", emoji: "🏆", coin_cost: 250, animation_class: "gift-trophy", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 9, name: "Lion Roar", emoji: "🦁", coin_cost: 75000, animation_class: "gift-lion-cinematic", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: `${CDN_BASE}/046a1834d48c46df.mp4` },
  { id: 10, name: "Dragon Fire", emoji: "🐉", coin_cost: 20000, animation_class: "gift-dragon-cinematic", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: `${CDN_BASE}/413c39b54df4f333.mp4` },
  { id: 11, name: "Phoenix Rising", emoji: "🦅", coin_cost: 5000, animation_class: "gift-phoenix-cinematic", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/c9a36e3ee7ac4b37879c3c22ab3597f8_phoenix_rising.mp4" },
  { id: 12, name: "Diamond Storm", emoji: "💎", coin_cost: 2000, animation_class: "gift-diamond-cinematic", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/d82ccc97a15c4fd597415d88c137239b_diamond_storm.mp4" },
  { id: 13, name: "Galaxy Blast", emoji: "🌌", coin_cost: 10000, animation_class: "gift-galaxy-cinematic", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/797dbcd0d55f4778988cc526bb876480_galaxy_blast.mp4" },
  { id: 14, name: "King's Crown", emoji: "👑", coin_cost: 50000, animation_class: "gift-crown-cinematic", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/312151b4dcd54a4eabb61d888ba3accf_kings_crown.mov" },
  { id: 15, name: "Heart Me", emoji: "❤️", coin_cost: 1, animation_class: "gift-heart-me", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 16, name: "Music Note", emoji: "🎵", coin_cost: 5, animation_class: "gift-music-note", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 17, name: "Tiny Dino", emoji: "🦕", coin_cost: 10, animation_class: "gift-tiny-dino", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 18, name: "Doughnut", emoji: "🍩", coin_cost: 30, animation_class: "gift-doughnut", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 19, name: "Bouquet", emoji: "💐", coin_cost: 30, animation_class: "gift-bouquet", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 20, name: "Soccer Ball", emoji: "⚽", coin_cost: 39, animation_class: "gift-soccer", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 21, name: "Groove Guitar", emoji: "🎸", coin_cost: 99, animation_class: "gift-groove-guitar", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 22, name: "Community Style", emoji: "🕶️", coin_cost: 99, animation_class: "gift-community", category: "gifts", is_lucky: false, is_limited: true, is_exclusive: false, is_new: false, animation_url: null },
  { id: 23, name: "Mishka Bear", emoji: "🐻", coin_cost: 100, animation_class: "gift-mishka", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 24, name: "Hand Heart", emoji: "🫶", coin_cost: 100, animation_class: "gift-hand-heart", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 25, name: "Tempo Flute", emoji: "🪈", coin_cost: 149, animation_class: "gift-tempo-flute", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 26, name: "Hearts", emoji: "💕", coin_cost: 199, animation_class: "gift-hearts", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 27, name: "Cheering Towel", emoji: "🎽", coin_cost: 299, animation_class: "gift-towel", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 28, name: "Good Night", emoji: "🌙", coin_cost: 399, animation_class: "gift-good-night", category: "gifts", is_lucky: false, is_limited: true, is_exclusive: false, is_new: false, animation_url: null },
  { id: 29, name: "Capibara Dance", emoji: "🦫", coin_cost: 399, animation_class: "gift-capibara", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: null },
  { id: 30, name: "Match Master", emoji: "🎯", coin_cost: 500, animation_class: "gift-match-master", category: "gifts", is_lucky: false, is_limited: true, is_exclusive: false, is_new: false, animation_url: null },
  { id: 31, name: "Galaxy", emoji: "✨", coin_cost: 1000, animation_class: "gift-galaxy", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/f53ba9e28eb74ba3ab8b10b07eeea4ef_galaxy.mp4" },
  { id: 32, name: "Matchtacular", emoji: "🎮", coin_cost: 1000, animation_class: "gift-matchtacular", category: "gifts", is_lucky: false, is_limited: true, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/fd34926796e841d8937ab97dc2d92749_matchtacular.mp4" },
  { id: 33, name: "Tom Thunderfoot", emoji: "🥁", coin_cost: 2499, animation_class: "gift-thunder", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/ddb88fd7fdda47f5a52eec931f72acd8_tom_thunderfoot.mp4" },
  { id: 34, name: "Match Maniac", emoji: "🎲", coin_cost: 2999, animation_class: "gift-match-maniac", category: "gifts", is_lucky: false, is_limited: true, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/18fd8129d3484006874a3fdcf22c9a67_match_maniac.mp4" },

  // ─── Interactive Gifts (category: "interactive") ─────────────────────────────
  { id: 35, name: "Interstellar Trek", emoji: "🚀", coin_cost: 14999, animation_class: "gift-interstellar", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/042a55df313c4b219eb61ab2492ba8c6_interstellar_trek.mp4" },
  { id: 36, name: "Stadium", emoji: "🏟️", coin_cost: 15999, animation_class: "gift-stadium", category: "interactive", is_lucky: false, is_limited: true, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/fe0b39d0e74b4e79a00a6fd09ff8b339_stadium.mp4" },
  { id: 37, name: "Amusement Park", emoji: "🎡", coin_cost: 17000, animation_class: "gift-amusement", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/47a546b0f92b49f3a0b382527e115398_amusement_park.mp4" },
  { id: 38, name: "Castle Fantasy", emoji: "🏰", coin_cost: 20000, animation_class: "gift-castle", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/ada0e8dc922643149b216474372be45f_castle_fantasy.mp4" },
  { id: 42, name: "Fighter Jets", emoji: "✈️", coin_cost: 8000, animation_class: "gift-fighter-jets", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/424449d4606f055b.mp4` },
  { id: 43, name: "Dino Roar", emoji: "🦖", coin_cost: 12000, animation_class: "gift-dino-roar", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/721e2d3275e6c211.mp4` },
  { id: 45, name: "DJ Lion", emoji: "🎧", coin_cost: 15000, animation_class: "gift-dj-lion", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/b7a5b2bdbdd98663.mp4` },
  { id: 46, name: "Dream Castle", emoji: "🏰", coin_cost: 20000, animation_class: "gift-castle", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/41684a731489dc8f.mp4` },
  { id: 47, name: "Screaming Eagle", emoji: "🦅", coin_cost: 30000, animation_class: "gift-screaming-eagle", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/00947de3ffd93cc1.mp4` },
  { id: 48, name: "Football Superwin", emoji: "🏈", coin_cost: 20000, animation_class: "gift-football-superwin", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/efe991dbad9a4b54.mp4` },
  { id: 49, name: "Elephant", emoji: "🐘", coin_cost: 10000, animation_class: "gift-elephant", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/cfd63d61fb1e3bab.mp4` },
  { id: 63, name: "Mardi Gras Float", emoji: "🎭", coin_cost: 110000, animation_class: "gift-mardi-gras-float", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/9d0782006ea081aa.mp4` },
  { id: 82, name: "Clown", emoji: "🤡", coin_cost: 3000, animation_class: "gift-clown-cinematic", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/a67ad455f1b842eb.mp4` },

  // ─── Exclusive Gifts (category: "exclusive") ─────────────────────────────────
  { id: 39, name: "Adam's Dream", emoji: "🌍", coin_cost: 25999, animation_class: "gift-adams-dream", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: null },
  { id: 40, name: "Dragon Flame", emoji: "🔥", coin_cost: 26999, animation_class: "gift-dragon-flame", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: null },
  { id: 41, name: "Leon and Lion", emoji: "🦁", coin_cost: 34000, animation_class: "gift-leon-lion", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: null },
  { id: 44, name: "Archangel Michael", emoji: "⚔️", coin_cost: 750000, animation_class: "gift-archangel-michael", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: null },
  { id: 50, name: "Angel", emoji: "😇", coin_cost: 49999, animation_class: "gift-angel", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: `${CDN_BASE}/0e23a26c03156993.mp4` },
  { id: 51, name: "Magical Unicorn", emoji: "🦄", coin_cost: 60000, animation_class: "gift-magical-unicorn", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/76f49b2a14db4521813583b6dcace154_magical_unicorn.mov" },
  { id: 52, name: "Dragon's Lair", emoji: "🐲", coin_cost: 37999, animation_class: "gift-dragons-lair-cinematic", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: null },
  { id: 53, name: "Whale", emoji: "🐋", coin_cost: 39999, animation_class: "gift-whale-cinematic", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: `${CDN_BASE}/6fba9ad4b8a7cb09.mp4` },
  { id: 54, name: "Dragon Skull Castle", emoji: "🐉", coin_cost: 44999, animation_class: "gift-dragon-skull-cinematic", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: null },
  { id: 55, name: "Supercar Spaceship", emoji: "🚀", coin_cost: 149999, animation_class: "gift-supercar-spaceship", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: `${CDN_BASE}/e08f836ffc87f503.mp4` },
  { id: 56, name: "The Most High", emoji: "🖤", coin_cost: 75000, animation_class: "gift-the-most-high", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/c28581aa3feb4b72be64c50095adc47a_black_god_part2.mov" },
  { id: 57, name: "God on Throne", emoji: "🪑", coin_cost: 80000, animation_class: "gift-god-throne", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: `${CDN_BASE}/d2e18806e6fbfc08.mp4` },
  { id: 58, name: "Airavata", emoji: "🐘", coin_cost: 90000, animation_class: "gift-airavata", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: null },
  { id: 59, name: "Archangel Gabriel", emoji: "👼", coin_cost: 100000, animation_class: "gift-archangel-gabriel", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: null },
  { id: 60, name: "Ultra Warrior", emoji: "⚔️", coin_cost: 110000, animation_class: "gift-ultra-warrior", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: `${CDN_BASE}/ae4d3060cf2fcbc8.mp4` },
  { id: 61, name: "Emerald Castle", emoji: "🏰", coin_cost: 120000, animation_class: "gift-emerald-castle", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: `${CDN_BASE}/aeb16ed0a4050e9e.mp4` },
  { id: 62, name: "Mardi Gras Castle", emoji: "🎭", coin_cost: 130000, animation_class: "gift-mardi-gras", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: `${CDN_BASE}/75e5df38bfe8002a.mp4` },
  { id: 64, name: "Dreams Castle", emoji: "👑", coin_cost: 140000, animation_class: "gift-dreams-castle", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: null },
  { id: 65, name: "Heavens Crown", emoji: "✨", coin_cost: 145000, animation_class: "gift-heavens-crown", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: null },
  { id: 66, name: "The Second Coming", emoji: "✝️", coin_cost: 150000, animation_class: "gift-second-coming", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: false, animation_url: `${CDN_BASE}/0f1fc6af86b1a973.mp4` },

  // ─── New Standard Gifts ──────────────────────────────────────────────────────
  { id: 67, name: "Sword", emoji: "⚔️", coin_cost: 50, animation_class: "gift-sword", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 68, name: "Kiss", emoji: "💋", coin_cost: 15, animation_class: "gift-kiss", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 69, name: "Corgi", emoji: "🐕", coin_cost: 60, animation_class: "gift-corgi", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 70, name: "Boxing Glove", emoji: "🥊", coin_cost: 35, animation_class: "gift-boxing-glove", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 71, name: "Sunglasses", emoji: "🕶️", coin_cost: 25, animation_class: "gift-sunglasses", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 72, name: "Dancer", emoji: "💃", coin_cost: 99, animation_class: "gift-dancer", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 73, name: "Cute Car", emoji: "🚗", coin_cost: 50, animation_class: "gift-cute-car", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 74, name: "Rio", emoji: "🌴", coin_cost: 150, animation_class: "gift-rio", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 75, name: "Barco", emoji: "⛵", coin_cost: 80, animation_class: "gift-barco", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 76, name: "Mermaid", emoji: "🧜", coin_cost: 200, animation_class: "gift-mermaid", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 77, name: "Bear", emoji: "🐻", coin_cost: 45, animation_class: "gift-bear", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 78, name: "Giraffe", emoji: "🦒", coin_cost: 55, animation_class: "gift-giraffe", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 79, name: "Tomato", emoji: "🍅", coin_cost: 5, animation_class: "gift-tomato", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 80, name: "Bucket of Water", emoji: "🪳", coin_cost: 10, animation_class: "gift-bucket-of-water", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },
  { id: 81, name: "Egg", emoji: "🥚", coin_cost: 5, animation_class: "gift-egg", category: "gifts", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: null },

  // ─── Lucky Gifts (category: "lucky") ─────────────────────────────────────────
  { id: 83, name: "Lucky Fairy", emoji: "🧚", coin_cost: 1, animation_class: "gift-lucky", category: "lucky", is_lucky: true, is_limited: false, is_exclusive: false, is_new: false, animation_url: null, min_diamond_reward: 1, max_diamond_reward: 100 },
  { id: 84, name: "Lucky Clover", emoji: "🍀", coin_cost: 3, animation_class: "gift-lucky", category: "lucky", is_lucky: true, is_limited: false, is_exclusive: false, is_new: false, animation_url: null, min_diamond_reward: 5, max_diamond_reward: 300 },
  { id: 85, name: "Lucky Star", emoji: "🌟", coin_cost: 5, animation_class: "gift-lucky", category: "lucky", is_lucky: true, is_limited: false, is_exclusive: false, is_new: false, animation_url: null, min_diamond_reward: 10, max_diamond_reward: 500 },
  { id: 86, name: "Lucky Butterfly", emoji: "🦋", coin_cost: 10, animation_class: "gift-lucky", category: "lucky", is_lucky: true, is_limited: false, is_exclusive: false, is_new: false, animation_url: null, min_diamond_reward: 20, max_diamond_reward: 1000 },
  { id: 87, name: "Lucky Rainbow", emoji: "🌈", coin_cost: 20, animation_class: "gift-lucky", category: "lucky", is_lucky: true, is_limited: false, is_exclusive: false, is_new: false, animation_url: null, min_diamond_reward: 50, max_diamond_reward: 2000 },
  { id: 88, name: "Lucky Unicorn", emoji: "🦄", coin_cost: 25, animation_class: "gift-lucky", category: "lucky", is_lucky: true, is_limited: false, is_exclusive: false, is_new: false, animation_url: null, min_diamond_reward: 100, max_diamond_reward: 5000 },
  { id: 89, name: "Lucky Dragon", emoji: "🐉", coin_cost: 50, animation_class: "gift-lucky", category: "lucky", is_lucky: true, is_limited: false, is_exclusive: false, is_new: false, animation_url: null, min_diamond_reward: 200, max_diamond_reward: 10000 },
  { id: 90, name: "Lucky Orb", emoji: "🔮", coin_cost: 100, animation_class: "gift-lucky", category: "lucky", is_lucky: true, is_limited: false, is_exclusive: false, is_new: false, animation_url: null, min_diamond_reward: 500, max_diamond_reward: 50000 },
  { id: 93, name: "Adam's Dream", emoji: "🌟", coin_cost: 90000, animation_class: "gift-adams-dream", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/wingman/7fe9a122-157e-48c4-a338-be0912ddbb1f/attachments/b203d8727c1c478b90321b8501e6999d_adams_dream.mp4" },
  { id: 94, name: "Ferris Wheel", emoji: "🎡", coin_cost: 8000, animation_class: "gift-ferris-wheel", category: "interactive", is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: `${CDN_BASE}/df5445a3569b2fa5.mp4` },
  { id: 95, name: "Winged Lion Castle", emoji: "🦁", coin_cost: 10000, animation_class: "gift-winged-lion-castle", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/88ee2863f2ec9c88.mp4" },
  { id: 96, name: "Iceman Elephant", emoji: "🐘", coin_cost: 25000, animation_class: "gift-iceman-elephant", category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true, is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/42e90c990cdcebbd.mp4" },
];

// Legacy cinematic gifts array (kept for backwards compatibility with old clients)
const gifts = GIFT_TYPES.filter(g => g.animation_url !== null).map(g => ({
  id: g.id,
  name: g.name,
  emoji: g.emoji,
  coin_cost: g.coin_cost,
  animationUrl: g.animation_url,
}));

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
  const gift = GIFT_TYPES.find(g => g.id === giftTypeId);
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

  const stream = streams.find(s => s.id === streamId);
  if (stream) {
    stream.gift_total = (stream.gift_total || 0) + qty;
  }
  io.to(`stream_${streamId}`).emit("gift_animation", {
    username: "🎁 Share Me Live (Promo)",
    giftName: gift.name,
    giftEmoji: gift.emoji,
    animationUrl: gift.animation_url || null,
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
  res.json(GIFT_TYPES);
});

// ─── REST Routes ─────────────────────────────────────────────────────────────

// ─── Coin Purchase Endpoints ─────────────────────────────────────────────────

// In-memory user balances (production: use DB)
const userBalances = {};

// POST /api/coins/credit — credit coins after successful IAP (iOS RevenueCat / Android Stripe)
app.post("/api/coins/credit", (req, res) => {
  const { coins, receipt, userId } = req.body;
  if (!coins || coins <= 0) {
    return res.status(400).json({ error: "Invalid coin amount" });
  }
  // In production: verify receipt with RevenueCat/Apple/Google
  // For now, trust the client and credit coins
  const uid = userId || receipt || "anonymous";
  userBalances[uid] = (userBalances[uid] || 0) + coins;
  res.json({ success: true, newBalance: userBalances[uid], credited: coins });
});

// POST /api/coins/checkout — create Stripe checkout session (Android)
app.post("/api/coins/checkout", (req, res) => {
  const { packageId, coins, amount } = req.body;
  if (!packageId || !coins || !amount) {
    return res.status(400).json({ error: "packageId, coins, and amount required" });
  }
  // In production: create a real Stripe Checkout session
  // For demo: return success without a URL (client handles fallback)
  res.json({
    success: true,
    message: "Stripe checkout not configured — coins credited directly in demo mode",
    packageId,
    coins,
    amount,
  });
});

// GET /api/coins/balance — get user coin balance
app.get("/api/coins/balance", (req, res) => {
  const userId = req.query.userId || "anonymous";
  res.json({ balance: userBalances[userId] || 0 });
});


// Gift Types - full catalog (all 90 gifts)
app.get("/api/gift-types", (req, res) => {
  let result = [...GIFT_TYPES];
  if (req.query.category) {
    result = result.filter(g => g.category === req.query.category);
  }
  if (req.query.is_lucky === "true") {
    result = result.filter(g => g.is_lucky === true);
  }
  if (req.query.is_new === "true") {
    result = result.filter(g => g.is_new === true);
  }
  if (req.query.is_exclusive === "true") {
    result = result.filter(g => g.is_exclusive === true);
  }
  res.json(result);
});

// Gifts - serves full catalog (primary endpoint for app)
app.get("/api/gifts", (req, res) => {
  let result = [...GIFT_TYPES];
  if (req.query.category) {
    result = result.filter(g => g.category === req.query.category);
  }
  if (req.query.is_lucky === "true") {
    result = result.filter(g => g.is_lucky === true);
  }
  if (req.query.cinematic === "true") {
    result = result.filter(g => g.animation_url !== null);
  }
  res.json(result);
});

// Send a gift (with lucky gift diamond reward calculation)
app.post("/api/gifts", (req, res) => {
  const { streamId, giftTypeId, senderName, coins } = req.body;
  if (!streamId || !giftTypeId || !senderName) {
    return res.status(400).json({ error: "streamId, giftTypeId, and senderName required" });
  }
  const gift = GIFT_TYPES.find((g) => g.id === giftTypeId);
  if (!gift) {
    return res.status(404).json({ error: "Gift type not found" });
  }

  // Calculate diamond reward for lucky gifts
  let diamondReward = null;
  if (gift.is_lucky && gift.min_diamond_reward && gift.max_diamond_reward) {
    diamondReward = Math.floor(
      Math.random() * (gift.max_diamond_reward - gift.min_diamond_reward + 1)
    ) + gift.min_diamond_reward;
  }

  const payload = {
    username: senderName,
    giftName: gift.name,
    giftEmoji: gift.emoji,
    animationUrl: gift.animation_url || null,
    animationClass: gift.animation_class,
    isLucky: gift.is_lucky,
    diamondReward: diamondReward,
    coinCost: gift.coin_cost,
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
    is_lucky: gift.is_lucky,
    diamond_reward: diamondReward,
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
  res.json({ status: "ok", version: "2.2.0-90gifts", uptime: process.uptime(), gift_count: GIFT_TYPES.length });
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
    console.log(`  Total gift types: ${GIFT_TYPES.length}`);
    console.log(`  Lucky gifts: ${GIFT_TYPES.filter(g => g.is_lucky).length}`);
    console.log(`  Cinematic gifts (with video): ${GIFT_TYPES.filter(g => g.animation_url).length}`);
  });
}

module.exports = { app, server, io };

// ─── Revenue & Compensation Constants ────────────────────────────────────────
const PLATFORM_SHARE = 0.40;           // Platform keeps 40% of all gift revenue
const STREAMER_BASE_SHARE = 0.60;      // Streamers earn from 60% pool

// Streamer tier multipliers (based on hours streamed/month)
const STREAMER_TIERS = [
  { name: 'Bronze',  minHours: 0,   maxHours: 50,  share: 0.55 },
  { name: 'Silver',  minHours: 51,  maxHours: 150, share: 0.60 },
  { name: 'Gold',    minHours: 151, maxHours: 300, share: 0.63 },
  { name: 'Diamond', minHours: 301, maxHours: Infinity, share: 0.65 },
];

// Weekly base guarantee
const WEEKLY_BASE_GUARANTEE_USD = 20.00;  // $20/week guaranteed
const WEEKLY_BASE_MIN_HOURS = 10;         // Minimum hours/week to qualify

// Super chat splits (same as gift splits)
const SUPER_CHAT_PLATFORM_SHARE = 0.40;
const SUPER_CHAT_STREAMER_SHARE = 0.60;

// Agency coin reseller program
const AGENCY_COIN_RESELLER_COMMISSION = 0.30;  // Agency earns 30% of coins they sell
const PLATFORM_COIN_RESELLER_SHARE = 0.70;     // Platform keeps 70% of agency coin sales
const AGENCY_MAX_STREAMER_COMMISSION = 0.15;   // Max agency can take from streamer (15%)

// Helper: get streamer tier by monthly hours
function getStreamerTier(monthlyHours) {
  return STREAMER_TIERS.find(t => monthlyHours >= t.minHours && monthlyHours <= t.maxHours) || STREAMER_TIERS[0];
}

// Helper: calculate gift payout
function calculateGiftPayout(coinCost, monthlyHours = 0) {
  const tier = getStreamerTier(monthlyHours);
  const totalUsd = coinCost * 0.01; // 1 coin = $0.01 ($1 = 100 coins)
  return {
    platformEarns: +(totalUsd * PLATFORM_SHARE).toFixed(4),
    streamerEarns: +(totalUsd * tier.share).toFixed(4),
    tier: tier.name,
    streamerSharePct: tier.share,
  };
}

// ─── Lion Gift Collection ─────────────────────────────────────────────────────
// Added 2026-08-18 — 6 cinematic lion gifts
const LION_GIFTS = [
  { id: 97,  name: "Lion Cub",        emoji: "🦁", coin_cost: 4000,  animation_class: "gift-lion-cub",        category: "popular",   is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/b14211190fdcd799.mp4" },
  { id: 98,  name: "Pride",           emoji: "🦁", coin_cost: 8000,  animation_class: "gift-pride",           category: "popular",   is_lucky: false, is_limited: false, is_exclusive: false, is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/e34eb8df2b4ffa6d.mp4" },
  { id: 99,  name: "Lion King",       emoji: "🦁", coin_cost: 12000, animation_class: "gift-lion-king",       category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true,  is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/2d56e2a59e0c5f5a.mp4" },
  { id: 100, name: "Lioness",         emoji: "🦁", coin_cost: 22000, animation_class: "gift-lioness",         category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true,  is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/351edc9ec096ef07.mp4" },
  { id: 101, name: "Golden Lion",     emoji: "🦁", coin_cost: 20000, animation_class: "gift-golden-lion",     category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true,  is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/09353ae146ab5efa.mp4" },
  { id: 102, name: "Lion of Heaven",  emoji: "🦁", coin_cost: 44000, animation_class: "gift-lion-of-heaven",  category: "exclusive", is_lucky: false, is_limited: false, is_exclusive: true,  is_new: true, animation_url: "https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/41da4187fc98e4c8.mp4" },
];

// Merge lion gifts into GIFT_TYPES
GIFT_TYPES.push(...LION_GIFTS);
