import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

// Configure MDX with plugins for GitHub Flavored Markdown and syntax highlighting
// Note: These plugins require webpack (--webpack flag) as Turbopack cannot serialize
// JavaScript functions. This is a known limitation as of Next.js 16.
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
