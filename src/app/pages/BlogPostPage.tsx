import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { blogPosts } from "../data/blogData";

export function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl text-[#2c2c2c] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Post Not Found
          </h1>
          <button
            onClick={() => navigate("/blog")}
            className="text-[#5a7a5a] hover:text-[#4a6a4a] underline underline-offset-4 cursor-pointer"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-sm text-[#5a7a5a] hover:text-[#4a6a4a] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </button>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="overflow-hidden rounded-3xl shadow-lg h-[400px] md:h-[500px]">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-xs bg-[#e8f0e8] text-[#5a7a5a] px-4 py-2 rounded-full tracking-wide">
            {post.category}
          </span>
          <div className="flex items-center gap-4 text-xs text-[#2c2c2c]/40">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {post.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-5xl md:text-6xl text-[#2c2c2c] leading-tight mb-8"
        >
          {post.title}
        </h1>

        {/* Share Button */}
        <div className="mb-12 pb-8 border-b border-[#e5ddd4]">
          <button className="inline-flex items-center gap-2 text-sm text-[#5a7a5a] hover:text-[#4a6a4a] transition-colors cursor-pointer">
            <Share2 size={16} />
            Share this article
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.map((section, idx) => (
            <div key={idx} className="mb-8">
              {section.type === "paragraph" && (
                <p className="text-[#2c2c2c]/80 leading-relaxed mb-6">{section.text}</p>
              )}
              {section.type === "heading" && (
                <h2
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-3xl text-[#2c2c2c] mt-12 mb-6"
                >
                  {section.text}
                </h2>
              )}
              {section.type === "list" && (
                <ul className="space-y-4 mb-6">
                  {section.items?.map((item, i) => (
                    <li key={i} className="text-[#2c2c2c]/80 leading-relaxed pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-[#5a7a5a] before:font-bold">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.type === "quote" && (
                <blockquote className="border-l-4 border-[#5a7a5a] pl-6 py-4 my-8 italic text-xl text-[#2c2c2c]/70">
                  "{section.text}"
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-[#e5ddd4] text-center">
          <h3
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl text-[#2c2c2c] mb-4"
          >
            Ready to Begin Your Journey?
          </h3>
          <p className="text-[#2c2c2c]/60 mb-8">
            Join me for a class and experience the transformative power of yoga.
          </p>
          <button
            onClick={() => navigate("/classes")}
            className="px-8 py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all cursor-pointer"
          >
            Explore Classes
          </button>
        </div>
      </article>
    </div>
  );
}
