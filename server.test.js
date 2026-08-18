const request = require("supertest");
const { app, server, io } = require("./server");

afterAll((done) => {
  io.close();
  server.close(done);
});

describe("Lion Me Feature - Backend", () => {
  describe("POST /api/streams/:streamId/lion-me", () => {
    it("should increment lion me count with default count of 1", async () => {
      const res = await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId: "test-user-1", username: "TestUser" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.lionMeCount).toBe(1);
      expect(res.body.lionTier).toBe(1);
    });

    it("should batch multiple taps (count > 1)", async () => {
      const res = await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId: "test-user-2", username: "TestUser2", count: 5 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.lionMeCount).toBe(5);
      expect(res.body.lionTier).toBe(1);
    });

    it("should cap batch at 10", async () => {
      const res = await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId: "test-user-3", username: "TestUser3", count: 50 });

      expect(res.status).toBe(200);
      expect(res.body.lionMeCount).toBe(10);
    });

    it("should accumulate counts across multiple requests", async () => {
      const userId = "test-user-accum";
      await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId, username: "Accum", count: 5 });

      const res = await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId, username: "Accum", count: 6 });

      expect(res.body.lionMeCount).toBe(11);
      expect(res.body.lionTier).toBe(2); // tier 2 = 10+ lions
    });

    it("should correctly calculate tier progression", async () => {
      const userId = "test-user-tiers";

      // Send 10 lions
      await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId, username: "TierTest", count: 10 });
      let res = await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId, username: "TierTest", count: 10 });
      expect(res.body.lionMeCount).toBe(20);
      expect(res.body.lionTier).toBe(3); // tier 3 = 20+ lions

      res = await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId, username: "TierTest", count: 10 });
      expect(res.body.lionMeCount).toBe(30);
      expect(res.body.lionTier).toBe(4); // tier 4 = 30+ lions

      res = await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId, username: "TierTest", count: 10 });
      expect(res.body.lionMeCount).toBe(40);
      expect(res.body.lionTier).toBe(5); // tier 5 = 40+ lions

      res = await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId, username: "TierTest", count: 10 });
      expect(res.body.lionMeCount).toBe(50);
      expect(res.body.lionTier).toBe(6); // tier 6 = 50+ lions
    });
  });

  describe("GET /api/users/:userId/lion-me-count", () => {
    it("should return 0 for unknown user", async () => {
      const res = await request(app).get("/api/users/unknown-user-xyz/lion-me-count");
      expect(res.status).toBe(200);
      expect(res.body.lionMeCount).toBe(0);
    });

    it("should return the correct count for a known user", async () => {
      // First send some lions
      await request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId: "count-check-user", username: "CountCheck", count: 7 });

      const res = await request(app).get("/api/users/count-check-user/lion-me-count");
      expect(res.status).toBe(200);
      expect(res.body.lionMeCount).toBe(7);
    });
  });

  describe("LION_GIFTS unlock_tier", () => {
    it("should have unlock_tier on all Lion Gift types", async () => {
      const res = await request(app).get("/api/gifts");
      expect(res.status).toBe(200);

      const lionGifts = res.body.filter(g => [97, 98, 99, 100, 101, 102].includes(g.id));
      expect(lionGifts.length).toBe(6);

      expect(lionGifts.find(g => g.id === 97).unlock_tier).toBe(1);
      expect(lionGifts.find(g => g.id === 98).unlock_tier).toBe(10);
      expect(lionGifts.find(g => g.id === 99).unlock_tier).toBe(20);
      expect(lionGifts.find(g => g.id === 100).unlock_tier).toBe(30);
      expect(lionGifts.find(g => g.id === 101).unlock_tier).toBe(40);
      expect(lionGifts.find(g => g.id === 102).unlock_tier).toBe(50);
    });
  });

  describe("Existing endpoints still work", () => {
    it("GET /api/health", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
    });

    it("GET /api/streams", async () => {
      const res = await request(app).get("/api/streams");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
