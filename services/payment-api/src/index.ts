import express from "express";
import { PublicKey } from "@solana/web3.js";
import { randomUUID } from "node:crypto";
import { PAYMENT_STATUS } from "./payment-status.ts";
import { pool } from "./database.ts";

const app = express();
app.use(express.json());

const PORT = 4000;

// use underscore (_req) because the request doesn't contain information we need yet.
app.get("/health", (_req, res) => {
  res.json({
    service: "banm-lajan-payment-api",
    status: "ok",
  });
});

app.get("/health/db", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ database: "connected" });
  } catch {
    res.status(503).json({ database: "unavailable" });
  }
});

app.get("/payments/statuses", (_req, res) => {
  res.json({
    statuses: Object.values(PAYMENT_STATUS),
  });
});

app.post("/payments", (req, res) => {
  const { asset, amount, recipient } = req.body ?? {};

  if (asset !== "SOL") {
    res.status(400).json({
      error: "Unsupported asset",
    });
    return;
  }

  if (
    typeof asset !== "string" ||
    !asset.trim() ||
    typeof amount !== "string" ||
    !amount.trim() ||
    typeof recipient !== "string" ||
    !recipient.trim()
  ) {
    res.status(400).json({
      error: "Asset, amount, and recipient are required",
    });
    return;
  }

  const value = Number(amount);

  const decimalPlaces = amount.split(".")[1]?.length ?? 0;

  const paymentAmountCheck =
    !/^\d+(\.\d+)?$/.test(amount) ||
    !Number.isFinite(value) ||
    value <= 0 ||
    decimalPlaces > 9;

  if (paymentAmountCheck) {
    res.status(400).json({
      error: "Invalid payment amount",
    });
  }

  try {
    const publicKey = new PublicKey(recipient);
    if (publicKey.toBase58() !== recipient) {
      throw new Error("Invalid address format");
    }
  } catch {
    res.status(400).json({
      err: "Invalid Solana recipient address",
    });
    return;
  }

  const payment = {
    id: randomUUID(),
    asset,
    amount,
    recipient,
    status: "draft",
  };

  res.status(201).json(payment);
});

app.listen(PORT, () => {
  console.log(`Payment API running on port ${PORT}`);
});
