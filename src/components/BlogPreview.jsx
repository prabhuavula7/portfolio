import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import BlogCard from './BlogCard';

const BlogPreview = () => {
  const previewPosts = blogPosts.slice(0, 2);

  return (
    <section id="blog" className="py-20 bg-section-light dark:bg-section-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Latest Writing
          </h2>
          <p className="text-xl text-content max-w-3xl mx-auto">
            Ideas, experiements, notes and thoughts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {previewPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/blog"
            className="glass-button bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 inline-flex items-center"
          >
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
