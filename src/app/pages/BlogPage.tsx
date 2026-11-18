import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { blogPosts } from "../data/blogData";

const categories = ["All", "Practice", "Philosophy", "Wellness", "Lifestyle", "Story"];

export function BlogPage() {
  const navigate = useNavigate();
  const featured = blogPosts.find((p) => p.featured)!;
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-[#f2ede8] text-center px-6">
        <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Thoughts & Teachings</p>
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-6xl md:text-7xl text-[#2c2c2c]"
        >
          The <span className="italic text-[#5a7a5a]">Blog</span>
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-14 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all ${
                cat === "All"
                  ? "bg-[#5a7a5a] text-white"
                  : "bg-[#e8f0e8] text-[#5a7a5a] hover:bg-[#5a7a5a] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div 
          onClick={() => navigate(`/blog/${featured.slug}`)}
          className="group mb-16 grid md:grid-cols-2 gap-10 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="overflow-hidden h-72 md:h-auto">
            <img
              src={featured.img}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs bg-[#e8f0e8] text-[#5a7a5a] px-3 py-1 rounded-full tracking-wide">
                {featured.category}
              </span>
              <span className="text-xs text-[#2c2c2c]/40">Featured</span>
            </div>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-[#2c2c2c] leading-tight mb-4"
            >
              {featured.title}
            </h2>
            <p className="text-[#2c2c2c]/60 leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-[#2c2c2c]/40">
                <span>{featured.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {featured.readTime}
                </span>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm text-[#5a7a5a] hover:gap-4 transition-all"
              >
                Read More <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <div
              key={post.title}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="overflow-hidden h-52">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-[#e8f0e8] text-[#5a7a5a] px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#2c2c2c]/40 flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>
                <h3
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-2xl text-[#2c2c2c] mb-3 leading-snug"
                >
                  {post.title}
                </h3>
                <p className="text-[#2c2c2c]/60 text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#2c2c2c]/40">{post.date}</span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm text-[#5a7a5a] hover:gap-3 transition-all"
                  >
                    Read <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}