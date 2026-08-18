const request = require("supertest");
const { io: ioClient } = require("socket.io-client");
const { app, server, io } = require("./server");

let serverAddress;

beforeAll((done) => {
  server.listen(0, () => {
    serverAddress = `http://localhost:${server.address().port}`;
    done();
  });
});

afterAll((done) => {
  io.close();
  server.close(done);
});

describe("Entrance Animation System", () => {
  describe("getEntranceAnimation logic via join_stream", () => {
    it("should emit user_entrance with null animationUrl for new users (level < 10)", (done) => {
      const client = ioClient(serverAddress, { path: "/api/socket.io", transports: ["websocket"] });

      client.on("connect", () => {
        client.emit("join_stream", { streamId: 1, userId: "entrance-test-new", username: "NewUser" });
      });

      client.on("user_entrance", (data) => {
        expect(data.userId).toBe("entrance-test-new");
        expect(data.username).toBe("NewUser");
        expect(data.lionMeCount).toBe(0);
        expect(data.lionTier).toBe(0);
        expect(data.animationUrl).toBeNull();
        client.disconnect();
        done();
      });
    });

    it("should emit user_entrance with level 10 animation after accumulating 10+ lion me", (done) => {
      // First, accumulate 10 lion me via API
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(
          request(app)
            .post("/api/streams/1/lion-me")
            .send({ userId: "entrance-test-10", username: "Level10User", count: 1 })
        );
      }

      Promise.all(promises).then(() => {
        const client = ioClient(serverAddress, { path: "/api/socket.io", transports: ["websocket"] });

        client.on("connect", () => {
          client.emit("join_stream", { streamId: 1, userId: "entrance-test-10", username: "Level10User" });
        });

        client.on("user_entrance", (data) => {
          expect(data.userId).toBe("entrance-test-10");
          expect(data.username).toBe("Level10User");
          expect(data.lionMeCount).toBe(10);
          expect(data.lionTier).toBe(10);
          expect(data.animationUrl).toBe("https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/b212b650a6b5a90f.mp4");
          client.disconnect();
          done();
        });
      });
    });

    it("should emit user_entrance with level 50 animation for 50+ lion me", (done) => {
      // Accumulate 50 lion me
      request(app)
        .post("/api/streams/1/lion-me")
        .send({ userId: "entrance-test-50", username: "Level50User", count: 10 })
        .then(() => request(app).post("/api/streams/1/lion-me").send({ userId: "entrance-test-50", username: "Level50User", count: 10 }))
        .then(() => request(app).post("/api/streams/1/lion-me").send({ userId: "entrance-test-50", username: "Level50User", count: 10 }))
        .then(() => request(app).post("/api/streams/1/lion-me").send({ userId: "entrance-test-50", username: "Level50User", count: 10 }))
        .then(() => request(app).post("/api/streams/1/lion-me").send({ userId: "entrance-test-50", username: "Level50User", count: 10 }))
        .then(() => {
          const client = ioClient(serverAddress, { path: "/api/socket.io", transports: ["websocket"] });

          client.on("connect", () => {
            client.emit("join_stream", { streamId: 1, userId: "entrance-test-50", username: "Level50User" });
          });

          client.on("user_entrance", (data) => {
            expect(data.userId).toBe("entrance-test-50");
            expect(data.lionMeCount).toBe(50);
            expect(data.lionTier).toBe(50);
            expect(data.animationUrl).toBe("https://customer-assets-agu9un31.emergentagent.net/jobs/7fe9a122-157e-48c4-a338-be0912ddbb1f/videos/e86e2e8d84cd1496.mp4");
            client.disconnect();
            done();
          });
        });
    });

    it("should still work with primitive streamId (backwards compatible)", (done) => {
      const client = ioClient(serverAddress, { path: "/api/socket.io", transports: ["websocket"] });

      client.on("connect", () => {
        // Old format: just streamId as number
        client.emit("join_stream", 1);
        // No user_entrance should fire since no userId/username
        // Just verify we get viewer_count (existing behavior)
      });

      client.on("viewer_count", (count) => {
        expect(typeof count).toBe("number");
        client.disconnect();
        done();
      });
    });

    it("should not emit user_entrance when no userId or username provided", (done) => {
      const client = ioClient(serverAddress, { path: "/api/socket.io", transports: ["websocket"] });
      let entranceFired = false;

      client.on("connect", () => {
        client.emit("join_stream", 2); // primitive, no user info
      });

      client.on("user_entrance", () => {
        entranceFired = true;
      });

      client.on("viewer_count", () => {
        setTimeout(() => {
          expect(entranceFired).toBe(false);
          client.disconnect();
          done();
        }, 200);
      });
    });
  });
});
