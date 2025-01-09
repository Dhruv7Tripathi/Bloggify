"use client";
import Image from "next/image";
import { FollowerPointerCard } from "@/components/ui/following-pointer";


export default function FollowingPointerDemo() {
  const blogs = [
    {
      slug: "amazing-tailwindcss-grid-layouts",
      author: "Manu Arora",
      date: "28th March, 2023",
      title: "Amazing Tailwindcss Grid Layout Examples",
      description:
        "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
      image: "/demo/thumbnail.png",
      authorAvatar: "/manu.png",
    },
    {
      slug: "responsive-design-tailwindcss",
      author: "Dhruv Tripathi",
      date: "15th April, 2023",
      title: "Responsive Design with Tailwindcss",
      description:
        "Learn how to create responsive designs effortlessly using Tailwindcss in this comprehensive guide.",
      image: "/demo/thumbnail2.png",
      authorAvatar: "/dhruv.png",
    },
    {
      slug: "tailwindcss-best-practices",
      author: "Kavya Shah",
      date: "5th May, 2023",
      title: "Best Practices for Tailwindcss",
      description:
        "Discover the best practices to follow when building scalable and maintainable projects with Tailwindcss.",
      image: "/demo/thumbnail3.png",
      authorAvatar: "/kavya.png",
    },
    {
      slug: "blog page",
      author: "dhruv tripathi",
      date: "5th May, 2025",
      title: "Best Practices for Tailwindcss",
      description:
        "Discover the best practices to follow when building scalable and maintainable projects with Tailwindcss.",
      image: "/demo/thumbnail3.png",
      authorAvatar: "/kavya.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto">
      {blogs.map((blog) => (
        <FollowerPointerCard
          key={blog.slug}
          title={
            <TitleComponent title={blog.author} avatar={blog.authorAvatar} />
          }
        >
          <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
            <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
              <Image
                src={blog.image}
                alt="thumbnail"
                layout="fill"
                objectFit="cover"
                className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200`}
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold my-4 text-lg text-zinc-700">
                {blog.title}
              </h2>
              <h2 className="font-normal my-4 text-sm text-zinc-500">
                {blog.description}
              </h2>
              <div className="flex flex-row justify-between items-center mt-10">
                <span className="text-sm text-gray-500">{blog.date}</span>
                <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
                  Read More
                </div>
              </div>
            </div>
          </div>
        </FollowerPointerCard>
      ))}
    </div>
  );
}

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height={20}
      width={20}
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
