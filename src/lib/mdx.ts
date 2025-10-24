import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  services: string[];
  images: string[];
  date: string;
  featured: boolean;
  content: string;
}

export function getContentBySlug<T>(
  type: 'services' | 'projects',
  slug: string
): T & { content: string } {
  const fullPath = path.join(contentDirectory, type, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  } as unknown as T & { content: string };
}

export function getAllContent<T>(type: 'services' | 'projects'): Array<T & { slug: string }> {
  const directory = path.join(contentDirectory, type);

  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);

  const content = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(directory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
      } as unknown as T & { slug: string };
    });

  return content;
}

export function getAllServices(): Service[] {
  return getAllContent<Service>('services');
}

export function getServiceBySlug(slug: string): Service {
  return getContentBySlug<Service>('services', slug);
}

export function getAllProjects(): Project[] {
  return getAllContent<Project>('projects');
}

export function getProjectBySlug(slug: string): Project {
  return getContentBySlug<Project>('projects', slug);
}

export function getProjectsByService(serviceSlug: string): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) =>
    project.services.includes(serviceSlug)
  );
}

export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.featured);
}
