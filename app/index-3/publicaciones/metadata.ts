import { Metadata } from 'next';
import { getAllPublications } from '@/util/publications';

export const metadata: Metadata = {
  title: 'Publicaciones | Mario Carballo',
  description: 'Descubre las publicaciones de Mario Carballo, escritor de ciencia ficción y fantasía. Novelas, relatos cortos y más obras literarias.',
  openGraph: {
    title: 'Publicaciones | Mario Carballo',
    description: 'Descubre las publicaciones de Mario Carballo, escritor de ciencia ficción y fantasía. Novelas, relatos cortos y más obras literarias.',
    type: 'website',
    url: 'https://mariocarballo.es/index-3/publicaciones',
    images: [
      {
        url: 'https://mariocarballo.es/assets/imgs/home-page-3/typical/Archivo.png',
        width: 800,
        height: 1200,
        alt: 'Publicaciones de Mario Carballo',
      },
    ],
    locale: 'es_ES',
    siteName: 'Mario Carballo - Escritor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publicaciones | Mario Carballo',
    description: 'Descubre las publicaciones de Mario Carballo, escritor de ciencia ficción y fantasía. Novelas, relatos cortos y más obras literarias.',
    images: ['https://mariocarballo.es/assets/imgs/home-page-3/typical/Archivo.png'],
    creator: '@MarioCarballo',
  },
  alternates: {
    canonical: 'https://mariocarballo.es/index-3/publicaciones',
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
    'escritor',
    'novelas',
    'libros',
    'ciencia ficción',
    'fantasía',
    'literatura española',
    'ficción española',
    'publicaciones',
    'relatos cortos',
  ],
  publisher: 'Mario Carballo',
  category: 'Literatura',
  other: {
    'schema:type': 'CollectionPage',
    'schema:context': 'https://schema.org',
    'schema:headline': 'Publicaciones de Mario Carballo',
    'schema:description': 'Descubre las publicaciones de Mario Carballo, escritor de ciencia ficción y fantasía. Novelas, relatos cortos y más obras literarias.',
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
      '@id': 'https://mariocarballo.es/index-3/publicaciones'
    }),
    'structured-data': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Publicaciones de Mario Carballo',
      'description': 'Descubre las publicaciones de Mario Carballo, escritor de ciencia ficción y fantasía. Novelas, relatos cortos y más obras literarias.',
      'url': 'https://mariocarballo.es/index-3/publicaciones',
      'author': {
        '@type': 'Person',
        'name': 'Mario Carballo',
        'url': 'https://mariocarballo.es'
      },
      'publisher': {
        '@type': 'Person',
        'name': 'Mario Carballo',
        'url': 'https://mariocarballo.es'
      },
      'inLanguage': 'es',
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'Mario Carballo - Escritor',
        'url': 'https://mariocarballo.es'
      },
      'about': {
        '@type': 'Thing',
        'name': 'Literatura de ciencia ficción y fantasía'
      },
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': getAllPublications().map((pub, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@type': 'Book',
            'name': pub.title,
            'url': `https://mariocarballo.es/index-3/publicaciones/${pub.slug}`,
            'author': {
              '@type': 'Person',
              'name': 'Mario Carballo'
            },
            'datePublished': pub.year,
            'image': `https://mariocarballo.es${pub.coverImage}`,
            'publisher': {
              '@type': 'Organization',
              'name': pub.details.publisher || 'Editorial Independiente'
            },
            'inLanguage': pub.details.language === 'Español' ? 'es' : 'en',
            'isbn': pub.details.isbn
          }
        }))
      }
    })
  }
};
