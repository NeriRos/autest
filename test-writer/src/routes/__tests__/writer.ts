import { app } from "../../app";
import fs from "fs";
import path from "path";
import request from "supertest";

it("should return 200 for uploading a file", async () => {
  await request(app)
    .post("/api/test-writer")
    .attach("file", "storage/file-example.jsx", "component.jsx")
    .expect(200);
});

xit("should return 200 on testing ai storify route ", async () => {
  const result = await request(app)
    .get("http://ingress-external/api/ai/storify/file")
    .set("Host", "autest.dev")
    .redirects(1)
    .expect(200);

  // expect(result.body).toContain({ test: "Tete" });
  console.log(result.body);
});
