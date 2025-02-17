import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog de Ciencia Ficción y Fantasía | Mario Carballo",
    description: "Explora relatos, novelas y sagas de ciencia ficción y fantasía. Descubre mundos imaginarios, historias especulativas y reflexiones sobre el género fantástico y la ciencia ficción.",
    openGraph: {
        title: "Blog de Ciencia Ficción y Fantasía | Mario Carballo",
        description: "Explora relatos, novelas y sagas de ciencia ficción y fantasía. Descubre mundos imaginarios, historias especulativas y reflexiones sobre el género fantástico y la ciencia ficción.",
        type: 'website',
        images: [
            {
                url: '/assets/imgs/blog/blog-1/header.jpg',
                width: 1200,
                height: 630,
                alt: 'Blog de Ciencia Ficción y Fantasía de Mario Carballo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Blog de Ciencia Ficción y Fantasía | Mario Carballo",
        description: "Explora relatos, novelas y sagas de ciencia ficción y fantasía. Descubre mundos imaginarios, historias especulativas y reflexiones sobre el género fantástico y la ciencia ficción.",
        images: ['/assets/imgs/blog/blog-1/header.jpg'],
    },
    alternates: {
        canonical: 'https://mariocarballo.es/blog',
    },
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
    },
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
        'ficción especulativa'
    ],
    category: 'Literatura Fantástica y Ciencia Ficción',
    other: {
        'schema:type': 'Blog',
        'schema:context': 'https://schema.org',
        'schema:headline': 'Blog de Ciencia Ficción y Fantasía de Mario Carballo',
        'schema:description': 'Explora relatos, novelas y sagas de ciencia ficción y fantasía. Descubre mundos imaginarios, historias especulativas y reflexiones sobre el género fantástico y la ciencia ficción.',
        'schema:author': JSON.stringify({
            '@type': 'Person',
            'name': 'Mario Carballo',
            'url': 'https://mariocarballo.es'
        }),
        'schema:publisher': JSON.stringify({
            '@type': 'Person',
            'name': 'Mario Carballo',
            'url': 'https://mariocarballo.es'
        }),
        'schema:mainEntityOfPage': JSON.stringify({
            '@type': 'WebPage',
            '@id': 'https://mariocarballo.es/blog'
        }),
        'schema:genre': JSON.stringify(['Science Fiction', 'Fantasy', 'Speculative Fiction'])
    }
};
