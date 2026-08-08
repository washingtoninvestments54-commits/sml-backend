const http = require("http");
const { app, server, io } = require("./server");
const { io: ioClient } = require("socket.io-client");

const PORT = 3099;
let baseUrl;
let testServer;

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || "GET",
      headers: { "Content-Type": "application/json", ...options.headers },
    };
    const req = http.request(reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ status: res.statusCode, json: () => JSON.parse(data), text: () => data });
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runTests() {
  baseUrl = `http://localhost:${PORT}/api`;
  let passed = 0;
  let failed = 0;

  function assert(condition, msg) {
    if (condition) {
      passed++;
      console.log(`  ✓ ${msg}`);
    } else {
      failed++;
      console.log(`  ✗ ${msg}`);
    }
  }

  // Start server on test port
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server on port ${PORT}\n`);

  // Test GET /api/gifts
  console.log("GET /api/gifts");
  let res = await fetch(`${baseUrl}/gifts`);
  let data = res.json();
  assert(res.status === 200, "status 200");
  assert(Array.isArray(data), "returns array");
  assert(data.length === 20, "has 20 gifts");
  assert(data[0].name === "Lion Roar", "first gift is Lion Roar");
  assert(data[0].animationUrl.includes(".mp4"), "has animationUrl");

  // Test POST /api/gifts
  console.log("\nPOST /api/gifts");
  res = await fetch(`${baseUrl}/gifts`, {
    method: "POST",
    body: JSON.stringify({ streamId: 1, giftTypeId: 1, senderName: "TestUser", coins: 10 }),
  });
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.success === true, "success true");
  assert(data.gift.giftName === "Lion Roar", "gift name correct");
  assert(data.gift.animationUrl.includes(".mp4"), "animationUrl in response");

  // Test POST /api/gifts - invalid gift
  res = await fetch(`${baseUrl}/gifts`, {
    method: "POST",
    body: JSON.stringify({ streamId: 1, giftTypeId: 999, senderName: "TestUser", coins: 10 }),
  });
  assert(res.status === 404, "404 for invalid gift");

  // Test POST /api/gifts - missing fields
  res = await fetch(`${baseUrl}/gifts`, {
    method: "POST",
    body: JSON.stringify({ streamId: 1 }),
  });
  assert(res.status === 400, "400 for missing fields");

  // Test GET /api/streams
  console.log("\nGET /api/streams");
  res = await fetch(`${baseUrl}/streams`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(Array.isArray(data), "returns array");
  assert(data.length >= 3, "has mock streams");

  // Test GET /api/streams?status=live
  res = await fetch(`${baseUrl}/streams?status=live`);
  data = res.json();
  assert(data.every((s) => s.status === "live"), "filters by status");

  // Test GET /api/streams/:id
  console.log("\nGET /api/streams/:id");
  res = await fetch(`${baseUrl}/streams/1`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.id === 1, "correct stream id");
  assert(data.title === "Friday Night Vibes", "correct title");

  // Test GET /api/streams/:id - not found
  res = await fetch(`${baseUrl}/streams/999`);
  assert(res.status === 404, "404 for missing stream");

  // Test POST /api/streams
  console.log("\nPOST /api/streams");
  res = await fetch(`${baseUrl}/streams`, {
    method: "POST",
    body: JSON.stringify({ title: "New Stream", artistId: 1, genre: "EDM" }),
  });
  data = res.json();
  assert(res.status === 201, "status 201");
  assert(data.title === "New Stream", "title correct");
  assert(data.genre === "EDM", "genre correct");
  assert(data.status === "live", "status is live");

  // Test PATCH /api/streams/:id
  console.log("\nPATCH /api/streams/:id");
  res = await fetch(`${baseUrl}/streams/1`, {
    method: "PATCH",
    body: JSON.stringify({ title: "Updated Title" }),
  });
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.title === "Updated Title", "title updated");

  // Test comments
  console.log("\nPOST /api/streams/:id/comments");
  res = await fetch(`${baseUrl}/streams/1/comments`, {
    method: "POST",
    body: JSON.stringify({ username: "TestUser", message: "Hello!" }),
  });
  data = res.json();
  assert(res.status === 201, "status 201");
  assert(data.username === "TestUser", "username correct");
  assert(data.message === "Hello!", "message correct");

  console.log("\nGET /api/streams/:id/comments");
  res = await fetch(`${baseUrl}/streams/1/comments`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.length >= 1, "has comments");

  // Test artists
  console.log("\nGET /api/artists");
  res = await fetch(`${baseUrl}/artists`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.length === 5, "has 5 artists");

  console.log("\nGET /api/artists/:id");
  res = await fetch(`${baseUrl}/artists/1`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.stage_name === "DJ Nova", "correct artist");

  // Test discovery
  console.log("\nGET /api/discovery/featured");
  res = await fetch(`${baseUrl}/discovery/featured`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(Array.isArray(data), "returns array");

  console.log("\nGET /api/discovery/trending");
  res = await fetch(`${baseUrl}/discovery/trending`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(Array.isArray(data.artists), "has artists array");

  console.log("\nGET /api/discovery/leaderboard");
  res = await fetch(`${baseUrl}/discovery/leaderboard`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.length === 5, "has 5 entries");
  assert(data[0].rank === 1, "first is rank 1");

  // Test battles
  console.log("\nGET /api/battles");
  res = await fetch(`${baseUrl}/battles`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.length === 2, "has 2 battles");

  // Test health
  console.log("\nGET /api/health");
  res = await fetch(`${baseUrl}/health`);
  data = res.json();
  assert(res.status === 200, "status 200");
  assert(data.status === "ok", "status ok");

  // Test Socket.io
  console.log("\nSocket.io tests");
  const client = ioClient(`http://localhost:${PORT}`, {
    path: "/api/socket.io",
    transports: ["websocket"],
  });

  await new Promise((resolve) => {
    client.on("connect", () => {
      assert(true, "socket connects");
      resolve();
    });
    setTimeout(() => { assert(false, "socket connects (timeout)"); resolve(); }, 3000);
  });

  // Test join_stream + viewer_count
  await new Promise((resolve) => {
    client.on("viewer_count", (count) => {
      assert(typeof count === "number" && count > 0, "viewer_count emitted");
      resolve();
    });
    client.emit("join_stream", 1);
    setTimeout(() => { assert(false, "viewer_count (timeout)"); resolve(); }, 2000);
  });

  // Test chat_message via socket
  await new Promise((resolve) => {
    client.on("chat_message", (msg) => {
      assert(msg.username === "SocketUser", "chat_message relayed");
      assert(msg.message === "Socket msg", "message content correct");
      resolve();
    });
    client.emit("chat_message", { streamId: 1, username: "SocketUser", message: "Socket msg" });
    setTimeout(() => { assert(false, "chat_message (timeout)"); resolve(); }, 2000);
  });

  // Test gift_animation via REST triggering socket
  await new Promise((resolve) => {
    client.on("gift_animation", (gift) => {
      assert(gift.username === "GiftSender", "gift_animation username");
      assert(gift.animationUrl.includes(".mp4"), "gift_animation has video URL");
      resolve();
    });
    fetch(`${baseUrl}/gifts`, {
      method: "POST",
      body: JSON.stringify({ streamId: 1, giftTypeId: 2, senderName: "GiftSender", coins: 50 }),
    });
    setTimeout(() => { assert(false, "gift_animation (timeout)"); resolve(); }, 2000);
  });

  client.disconnect();

  // Summary
  console.log(`\n${"=".repeat(50)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`${"=".repeat(50)}`);

  server.close();
  io.close();
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
