import { Metadata } from 'next';
import { getPublicationBySlug } from '@/util/publications';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const publication = getPublicationBySlug(params.slug);
    
    if (!publication) {
      throw new Error('Publication not found');
    }
    
    // Create a description from the first paragraph of the description
    const description = publication.description[0].substring(0, 155) + '...';
    
    // Create a title that includes the book title and author
    const title = `${publication.title} | Mario Carballo`;
    
    // Generate keywords based on book details
    const keywords = [
      'Mario Carballo',
      'escritor',
      'novelas',
      'libros',
      'literatura española',
      'ficción española',
      publication.title,
      ...(publication.details.genre || []),
    ];

    // Create structured data for the book
    const bookStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      'name': publication.title,
      'author': {
        '@type': 'Person',
        'name': 'Mario Carballo'
      },
      'url': `https://mariocarballo.es/index-3/publicaciones/${params.slug}`,
      'workExample': [
        {
          '@type': 'Book',
          'isbn': publication.details.isbn,
          'bookFormat': 'http://schema.org/Paperback',
          'potentialAction': {
            '@type': 'ReadAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': publication.buyingOptions.amazon || 'https://mariocarballo.es'
            }
          }
        }
      ],
      'image': `https://mariocarballo.es${publication.coverImage}`,
      'description': description,
      'publisher': {
        '@type': 'Organization',
        'name': publication.details.publisher
      },
      'inLanguage': publication.details.language === 'Español' ? 'es' : 'en',
      'datePublished': publication.year
    };

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'book',
        url: `https://mariocarballo.es/index-3/publicaciones/${params.slug}`,
        images: [
          {
            url: `https://mariocarballo.es${publication.coverImage}`,
            width: 800,
            height: 1200,
            alt: publication.title,
          },
        ],
        locale: 'es_ES',
        siteName: 'Mario Carballo - Escritor',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`https://mariocarballo.es${publication.coverImage}`],
        creator: '@MarioCarballo',
      },
      alternates: {
        canonical: `https://mariocarballo.es/index-3/publicaciones/${params.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
      authors: [{ name: 'Mario Carballo' }],
      keywords,
      publisher: 'Mario Carballo',
      category: 'Literatura',
      other: {
        'book:author': 'Mario Carballo',
        'book:isbn': publication.details.isbn || '',
        'book:release_date': publication.year,
        'schema:type': 'Book',
        'schema:context': 'https://schema.org',
        'schema:headline': publication.title,
        'schema:description': description,
        'schema:author': JSON.stringify({
          '@type': 'Person',
          'name': 'Mario Carballo',
          'url': 'https://mariocarballo.es'
        }),
        'schema:datePublished': publication.year,
        'schema:publisher': JSON.stringify({
          '@type': 'Organization',
          'name': publication.details.publisher || 'Editorial Independiente',
          'url': 'https://mariocarballo.es'
        }),
        'schema:mainEntityOfPage': JSON.stringify({
          '@type': 'WebPage',
          '@id': `https://mariocarballo.es/index-3/publicaciones/${params.slug}`
        }),
        'schema:genre': JSON.stringify(publication.details.genre || []),
        'schema:bookFormat': JSON.stringify(publication.details.format || []),
        'schema:potentialAction': JSON.stringify({
          '@type': 'ReadAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': publication.buyingOptions.amazon || 'https://mariocarballo.es'
          }
        }),
        'structured-data': JSON.stringify(bookStructuredData)
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Publicación | Mario Carballo',
      description: 'Descubre las publicaciones de Mario Carballo, escritor de ciencia ficción y fantasía.',
      robots: { index: false }
    };
  }
}
