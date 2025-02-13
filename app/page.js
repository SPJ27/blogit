// "use client"
// import { useState } from "react";
import clientPromise from "@/lib/mongodb";
import Link from "next/link";

const find = async () => {
  let client = await clientPromise;
  let db = client.db("blog");
  const collection = db.collection("blogPost");
  const data = collection.find();
  const result = await data.toArray();
  return result;
}



export default async function Home() {
  let doc = await find( )
  return (
    
    <>
      <div className="container mx-auto flex justify-center flex-col gap-4 items-center px-5 md:px-0 text-xs md:text-base pt-20">
        <h1 className="text-center font-bold text-3xl">Welcome to Blogit</h1>
        <p className="text-center md:text-left">
          Blog out your ideas on Blogit
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {doc.map((i) => 
            <div key={i._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link href={`/post/${i._id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {i.title} 
                </h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {i.description}
              </p>
              <Link
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
