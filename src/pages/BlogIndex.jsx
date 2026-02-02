import React, { useMemo, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';

const BlogIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const tagSets = useMemo(() => {
    const toSet = (items) => new Set(items.map((tag) => tag.toLowerCase()));
    return {
      ai: toSet(['AI', 'ML', 'Machine Learning', 'AI/ML']),
      misc: toSet(['Misc', 'Misc.', 'Miscellaneous']),
      se: toSet([
        'Software Engineering',
        'Engineering',
        'Full Stack',
        'Full-Stack',
        'Frontend',
        'Backend',
        'Web',
        'DevOps',
        'Data Engineering'
      ])
    };
  }, []);

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'AI/ML', value: 'ai' },
    { label: 'Software Engineering', value: 'se' },
    { label: 'Misc.', value: 'misc' }
  ];

  const matchesTagSet = (post, tagSet) => {
    if (!post.tags?.length) return false;
    return post.tags.some((tag) => tagSet.has(tag.toLowerCase()));
  };

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query));

      if (!matchesQuery) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'ai') return matchesTagSet(post, tagSets.ai);
      if (activeFilter === 'se') return matchesTagSet(post, tagSets.se);
      if (activeFilter === 'misc') {
        return matchesTagSet(post, tagSets.misc) || (!matchesTagSet(post, tagSets.ai) && !matchesTagSet(post, tagSets.se));
      }
      return true;
    });
  }, [activeFilter, searchQuery, tagSets]);

  return (
    <main className="pt-24 pb-20">
      <section className="py-16 bg-section-light dark:bg-section-dark">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Blog
          </h1>
          <p className="text-xl text-content max-w-3xl mx-auto">
            Ideas, experiments, and notes from the build process.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10">
            <div className="glass-card p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search posts by title, topic, or tag"
                className="w-full md:flex-1 rounded-xl px-4 py-3 bg-input text-input border border-input focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="flex flex-wrap items-center gap-2">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.value;
                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => setActiveFilter(filter.value)}
                      className={`filter-pill ${isActive ? 'is-active' : ''}`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center text-content">
              No posts match your search yet.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogIndex;
