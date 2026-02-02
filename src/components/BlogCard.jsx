import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';

const formatDate = (date) => {
  if (!date || Number.isNaN(date.getTime?.())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const BlogCard = ({ post, showExcerpt = true }) => {
  const dateLabel = formatDate(post.date);

  return (
    <article className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-content mb-3">
          {dateLabel && <span>{dateLabel}</span>}
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-heading mb-3">
          {post.title}
        </h3>
        {showExcerpt && (
          <p className="text-content leading-relaxed mb-6">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold">Read article</span>
          <Link
            to={`/blog/${post.slug}`}
            className="blog-card-cta w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary transition-all duration-300"
            aria-label={`Read ${post.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
