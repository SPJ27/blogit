import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const find = async (id) => {
  let client = await clientPromise;
  let db = client.db("blog");
  const collection = db.collection("blogPost");
  const data = await collection.findOne({ _id: new ObjectId(id) });
  return data;
}
const  Page = async ({ params }) => {
  let post = (await find(params.id))
  return (
    <>
      {post && (
        <div className="container mx-auto flex justify-center flex-col gap-4 items-center px-5 md:px-0 text-xs md:text-base pt-20">
          <h1 className="text-center font-bold text-3xl">{post.title}</h1>
          <p className="text-center md:text-left">{post.content}</p>
          <hr />
          <p className="text-center md:text-left">By {post.author}</p>
        </div>
      )}
    </>
  );
};

export default Page;
