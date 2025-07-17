import Layout from "../components/Layout";
import NotificationButton from "../components/NotificationButton";
import { Island } from "../lib/Island";

export default function Home() {
  return (
    <Layout>
      <Island name="NotificationButton" props={{}} />

      <h1 className="text-2xl">Welcome to the Home Page</h1>
      <p>This is a simple server-side rendered page.</p>
    </Layout>
  );
}
