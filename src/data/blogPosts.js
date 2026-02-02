import matter from 'gray-matter';

const parseDateLocal = (value) => {
  if (!value || typeof value !== 'string') return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return new Date(value);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return new Date(year, month - 1, day);
};

const postModules = import.meta.glob('/content/blog/*.mdx', { eager: true });
const rawModules = import.meta.glob('/content/blog/*.mdx', { eager: true, as: 'raw' });
const rawModulesQuery = import.meta.glob('/content/blog/*.mdx', { eager: true, query: '?raw' });

const normalizeExcerpt = (value, content) => {
  if (value) return value.trim();
  if (!content) return '';
  const cleaned = content
    .replace(/^import .*$/gm, '')
    .replace(/^export .*$/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.slice(0, 180) + (cleaned.length > 180 ? '...' : '');
};

const normalizeRawPath = (path) => path.replace(/\?raw.*$/, '');

const resolveRawValue = (rawValue) => {
  if (typeof rawValue === 'string') return rawValue;
  if (typeof rawValue?.default === 'string') return rawValue.default;
  return '';
};

const rawEntries = Object.entries(rawModules).map(([path, rawValue]) => {
  const raw = resolveRawValue(rawValue);
  return [normalizeRawPath(path), raw];
});

const rawQueryEntries = Object.entries(rawModulesQuery).map(([path, rawValue]) => {
  const raw = resolveRawValue(rawValue);
  return [normalizeRawPath(path), raw];
});

const rawByPath = rawEntries.reduce((acc, [path, raw]) => {
  const normalized = path.replace(/\?raw$/, '');
  acc[normalized] = raw;
  return acc;
}, {});

rawQueryEntries.forEach(([path, raw]) => {
  if (!rawByPath[path]) {
    rawByPath[path] = raw;
  }
});

const rawBySlug = rawEntries.reduce((acc, [path, raw]) => {
  const slug = path.split('/').pop().replace(/\.mdx(\?.*)?$/, '');
  acc[slug] = raw;
  return acc;
}, {});

rawQueryEntries.forEach(([path, raw]) => {
  const slug = path.split('/').pop().replace(/\.mdx(\?.*)?$/, '');
  if (!rawBySlug[slug]) {
    rawBySlug[slug] = raw;
  }
});

export const blogPosts = Object.keys(postModules)
  .map((path) => {
    const module = postModules[path];
    const slugFromPath = path.split('/').pop().replace(/\.mdx$/, '');
    const frontmatter = module.frontmatter || module?.metadata || {};
    const raw = rawByPath[path] || rawBySlug[slugFromPath] || '';
    const parsed = raw ? matter(raw) : { data: {}, content: '' };
    const data = parsed.data || {};
    const content = parsed.content || '';
    const mergedData = Object.keys(data).length ? data : frontmatter;
    const dateValue = mergedData.date ? parseDateLocal(mergedData.date) : null;

    return {
      slug: mergedData.slug || slugFromPath,
      title: mergedData.title || slugFromPath.replace(/-/g, ' '),
      date: dateValue,
      dateLabel: mergedData.date || '',
      author: mergedData.author || '',
      excerpt: normalizeExcerpt(mergedData.excerpt, content),
      cover: mergedData.cover || '/preview.png',
      readTime: mergedData.readTime || '',
      Component: module.default,
      tags: mergedData.tags || []
    };
  })
  .sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date - a.date;
  });

export const getPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug);
