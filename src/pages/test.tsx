import { Suspense, use } from "react";
import Layout from "../components/Layout";

const getPosts = async () => {
  try {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("API failed");
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch posts", err);
    return [];
  }
};

export default function Page() {
  return (
    <Layout>
      <h1>Streaming Works Now</h1>

      <Suspense fallback={<p>Loading posts...</p>}>
        <Posts />
      </Suspense>
    </Layout>
  );
}

function Posts() {
  const posts = use(getPosts()) as any[];
  return (
    <ul>
      {posts.slice(0, 20).map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
