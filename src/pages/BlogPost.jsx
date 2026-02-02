import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Link2 } from 'lucide-react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { blogPosts, getPostBySlug } from '../data/blogPosts';
import BlogCard from '../components/BlogCard';

const formatDate = (date) => {
  if (!date || Number.isNaN(date.getTime?.())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post?.title || 'Blog post';

  const relatedPosts = useMemo(() => {
    return blogPosts.filter((item) => item.slug !== slug).slice(0, 2);
  }, [slug]);

  if (!post) {
    return (
      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-heading mb-4">Post not found</h1>
          <p className="text-content mb-8">
            The article you are looking for does not exist yet.
          </p>
          <Link to="/blog" className="btn-primary">
            Back to blog
          </Link>
        </section>
      </main>
    );
  }

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleShare = (platform) => {
    if (!shareUrl) return;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    if (platform === 'x') {
      window.open(`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank');
    }

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
    }
  };

  return (
    <main className="pt-24 pb-20">
      <section className="container mx-auto px-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <div className="glass-card overflow-hidden max-w-5xl mx-auto">
          {post.cover && (
            <div className="relative w-full h-72">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
            </div>
          )}
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-content mb-4">
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              )}
              {formatDate(post.date) && <span>{post.readTime ? '• ' : ''}{formatDate(post.date)}</span>}
              {post.author && <span>{(post.readTime || formatDate(post.date)) ? '• ' : ''}By {post.author}</span>}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-5">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                type="button"
                onClick={handleCopy}
                className="glass-button px-4 py-2 rounded-xl text-sm flex items-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                {copied ? 'Copied' : 'Copy link'}
              </button>
              <button
                type="button"
                onClick={() => handleShare('x')}
                className="glass-button px-4 py-2 rounded-xl text-sm flex items-center gap-2"
              >
                <FaXTwitter className="w-4 h-4" />
                Share on X
              </button>
              <button
                type="button"
                onClick={() => handleShare('linkedin')}
                className="glass-button px-4 py-2 rounded-xl text-sm flex items-center gap-2"
              >
                <FaLinkedin className="w-4 h-4" />
                Share on LinkedIn
              </button>
            </div>

            {post.excerpt && (
              <p className="text-lg text-content leading-relaxed mb-4">
                {post.excerpt}
              </p>
            )}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill px-3 py-1 text-xs font-medium rounded-full border border-primary/30 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <article className="blog-content">
              <post.Component />
            </article>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-4 mt-16">
          <h2 className="text-2xl font-bold text-heading mb-6">More posts</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {relatedPosts.map((item) => (
              <BlogCard key={item.slug} post={item} showExcerpt={false} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPost;
