import { MetadataRoute } from 'next';

// This is a dynamic sitemap generator
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment variable or default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ] as const;

  // You can add dynamic routes here by fetching from your API
  // Example:
  // const posts = await fetch('api/posts').then(res => res.json());
  // const dynamicRoutes = posts.map(post => ({
  //   url: `${baseUrl}/posts/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  // Combine all routes
  // return [...staticRoutes, ...dynamicRoutes];
  return [...staticRoutes];
}