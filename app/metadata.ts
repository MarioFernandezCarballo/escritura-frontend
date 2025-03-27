import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Mario Carballo | Escritor de Ciencia Ficción y Fantasía",
    description: "Bienvenidos a mi espacio digital donde comparto mis novelas, relatos cortos y sagas de ciencia ficción y fantasía. Explora mis mundos imaginarios, historias especulativas y universos fantásticos.",
    openGraph: {
        title: "Mario Carballo | Escritor de Ciencia Ficción y Fantasía",
        description: "Bienvenidos a mi espacio digital donde comparto mis novelas, relatos cortos y sagas de ciencia ficción y fantasía. Explora mis mundos imaginarios, historias especulativas y universos fantásticos.",
        type: 'website',
        images: [
            {
                url: 'assets/imgs/home-page-3/hero/img-1.webp',
                width: 1200,
                height: 630,
                alt: 'Mario Carballo - Escritor de Ciencia Ficción y Fantasía',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Mario Carballo | Escritor de Ciencia Ficción y Fantasía",
        description: "Bienvenidos a mi espacio digital donde comparto mis novelas, relatos cortos y sagas de ciencia ficción y fantasía. Explora mis mundos imaginarios, historias especulativas y universos fantásticos.",
        images: ['/assets/imgs/hero/hero-1/profile.jpg'],
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
    other: {
        'schema:type': 'Person',
        'schema:context': 'https://schema.org',
        'schema:name': 'Mario Carballo',
        'schema:description': 'Escritor de ciencia ficción y fantasía, especializado en novelas, relatos cortos y sagas.',
        'schema:url': 'https://mariocarballo.es',
        'schema:jobTitle': 'Escritor de Ciencia Ficción y Fantasía',
        'schema:genre': JSON.stringify(['Science Fiction', 'Fantasy', 'Speculative Fiction'])
    }
};
