import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("blog");
  const collection = db.collection("blogPost");
  const result = await collection.insertOne({
    title: body.title,
    content: body.content,
    description: body.description,
    author: body.name,
  });
  return Response.json({ status: "working" });
}
