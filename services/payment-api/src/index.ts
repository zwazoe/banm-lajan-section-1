import express from "express";

const app = express();
const PORT = 4000;

// use underscore (_req) because the request doesn't contain infomration we need yet.

app.get("/health", (_req, res) => {
  res.json({
    service: "banm-lajan-payment-api",
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`Payment API running on port ${PORT}`);
});
