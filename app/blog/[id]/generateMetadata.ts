import { Metadata } from 'next';
import { getBlogPost } from '@/util/api';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        const post = await getBlogPost(params.id);
        const title = `${post.title} | Mario Carballo`;
        const description = post.content.substring(0, 155) + '...';

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                type: 'article',
                publishedTime: post.created_at || new Date().toISOString(),
                authors: ['Mario Carballo'],
                images: [
                    {
                        url: post.image_url || '/assets/imgs/blog/blog-1/header.jpg',
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [post.image_url || '/assets/imgs/blog/blog-1/header.jpg'],
            },
            alternates: {
                canonical: `https://mariocarballo.es/blog/${params.id}`,
            },
            robots: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
            authors: [{ name: 'Mario Carballo' }],
            keywords: [
                'Mario Carballo',
                'ciencia ficción',
                'fantasía',
                'escritor',
                'novelas',
                'relatos cortos',
                'sagas fantásticas',
                'literatura especulativa',
                'worldbuilding',
                'ficción especulativa',
                ...(post.tags || [])
            ],
            publisher: 'Mario Carballo',
            category: 'Literatura Fantástica y Ciencia Ficción',
            other: {
                'article:body': post.content,
                'article:section': 'Ficción Especulativa',
                'article:genre': ['Science Fiction', 'Fantasy', 'Speculative Fiction'],
                'schema:type': 'Article',
                'schema:context': 'https://schema.org',
                'schema:headline': post.title,
                'schema:description': description,
                'schema:author': JSON.stringify({
                    '@type': 'Person',
                    'name': 'Mario Carballo',
                    'url': 'https://mariocarballo.es'
                }),
                'schema:datePublished': post.created_at || new Date().toISOString(),
                'schema:dateModified': post.created_at || new Date().toISOString(),
                'schema:image': post.image_url || '/assets/imgs/blog/blog-1/header.jpg',
                'schema:publisher': JSON.stringify({
                    '@type': 'Person',
                    'name': 'Mario Carballo',
                    'url': 'https://mariocarballo.es'
                }),
                'schema:mainEntityOfPage': JSON.stringify({
                    '@type': 'WebPage',
                    '@id': `https://mariocarballo.es/blog/${params.id}`
                }),
                'schema:genre': JSON.stringify(['Science Fiction', 'Fantasy', 'Speculative Fiction'])
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Blog Post | Mario Carballo',
            description: 'Artículo del blog de Mario Carballo sobre ciencia ficción y fantasía.',
            robots: { index: false }
        };
    }
}
