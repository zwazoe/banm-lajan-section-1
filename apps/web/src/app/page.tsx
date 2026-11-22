import { Suspense } from "react";
import { unstable_rethrow } from "next/navigation";
import { Card, Tag } from "antd";

type HealthResponse = {
  service: string;
  status: string;
};

async function HealthStatus() {
  let status = "offline";

  try {
    const response = await fetch("http://localhost:4000/health", {
      cache: "no-store",
    });
    if (response.ok) {
      const data = (await response.json()) as HealthResponse;
      status = data.status;
    }
  } catch (error) {
    unstable_rethrow(error);
  }

  return <Tag color={status === "ok" ? "green" : "red"}>{status}</Tag>;
}

export default async function Home() {
  return (
    <main style={{ maxWidth: 600, margin: "80px auto", padding: 24 }}>
      <Card title="Banm Lajan">
        <p>Solana Payment Processing System</p>

        <p>Payment API:</p>

        <Suspense fallback={<Tag>Checking...</Tag>}>
          <HealthStatus />
        </Suspense>
      </Card>
    </main>
  );
}
