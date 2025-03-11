// Define the Publication interface for standardized JSON structure
export interface Publication {
  id: string;
  slug: string;
  title: string;
  year: string;
  coverImage: string;
  description: string[];
  buyingOptions: {
    amazon?: string;
    webBuy?: string;
    paypalButtonId?: string; // PayPal hosted button ID for this publication
    isPhysical?: boolean;
    isEbook?: boolean;
    prices?: {
      paperback?: {
        amazon?: number;
        web?: number;
      };
      hardcover?: {
        amazon?: number;
        web?: number;
      };
      ebook?: {
        amazon?: number;
        web?: number;
      };
    };
    otherStores?: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
  };
  details: {
    isbn?: string;
    pages?: number;
    publisher?: string;
    language?: string;
    format?: string[];
    genre?: string[];
  };
  reviews?: Array<{
    author: string;
    text: string;
    rating?: number;
    source?: string;
  }>;
  featured?: boolean;
  releaseDate?: string;
}

// Sample publications data - in a real implementation, this would be fetched from an API
export const publicationsData: Publication[] = [
  {
    id: "1",
    slug: "el-archivo-de-los-olvidados",
    title: "El archivo de los olvidados",
    year: "2025",
    coverImage: "/assets/imgs/home-page-3/typical/Archivo.png",
    description: [
      "Una nave milenaria que ha olvidado su propósito. La carta de un padre a su hijo explicando cómo es el Cielo. El ocupante de una tumba sin nombre esperando a que alguien por fin llore por él.",
      "El archivo de los olvidados es una colección de relatos que quedaron atrapados en el tiempo, historias que alguna vez fueron escritas y luego relegadas a un cajón, esperando pacientemente ser leídas. En estas páginas, Mario Carballo rescata esas narraciones perdidas, ofreciéndonos un viaje a través de lo fantástico, lo melancólico y lo inesperado.",
      "Cada historia es un eco de algo que pudo haber sido olvidado para siempre… hasta ahora."
    ],
    buyingOptions: {
      amazon: "https://amzn.eu/d/jjMO8ho",
      webBuy: "#",
      paypalButtonId: "S65MU4KTNGB26", // Existing PayPal button ID
      isPhysical: true,
      isEbook: true,
      prices: {
        paperback: {
          amazon: 11.44,
          web: 10.90
        },
        hardcover: {
          amazon: 16.64,
          web: 14.90
        },
        ebook: {
          amazon: 4.91
        }
      }
    },
    details: {
      isbn: "979-8313172439",
      pages: 158,
      publisher: "Editorial Independiente",
      language: "Español",
      format: ["Tapa blanda", "Tapa dura", "Ebook"],
      genre: ["Ciencia Ficción", "Fantasía", "Relatos Cortos"]
    },
    reviews: [
    ],
    featured: true,
    releaseDate: "2025-03-06"
  },
  {
    id: "2",
    slug: "al-otro-lado-de-la-esfera",
    title: "Al otro lado de la esfera",
    year: "2020",
    coverImage: "/assets/imgs/home-page-3/typical/Esfera.jpg",
    description: [
      "2230 EG. Ciudad de Teno. Imoye se prepara en secreto para el primer viaje en el tiempo de la historia. El Centro de Defensa Espacial la eligió por su maestría en los combates de voluntad, y el futuro de la población de la Tierra está en sus manos. Debe recabar información del pasado para hacer frente al verdugo del mundo, que se acerca desde lo más profundo del cosmos. ¿Serán suficientes sus habilidades?",
      "2022 DC. Ciudad de Boston. El sueño de Mark siempre fue formar parte de Edén. Ellos son los defensores del libre pensamiento. La punta de lanza contra las grandes corporaciones. Su último intento ha dado resultado, y la organización se ha fijado en él para llevar a cabo su movimiento final. Ahora que ha conseguido entrar en Edén, ya no hay marcha atrás..."
    ],
    buyingOptions: {
      amazon: "https://www.amazon.es/otro-lado-esfera-Mario-Fern%C3%A1ndez/dp/B08B33M1WS",
      webBuy: "#",
      paypalButtonId: "7XGPJKVAT5HGN",
      isPhysical: true,
      isEbook: true,
      prices: {
        paperback: {
          amazon: 8.95,
          web: 7.90
        },
        ebook: {
          amazon: 2.76,
        }
      }
    },
    details: {
      isbn: "979-8648438453",
      pages: 182,
      publisher: "Editorial Independiente",
      language: "Español",
      format: ["Tapa blanda", "Ebook"],
      genre: ["Ciencia Ficción", "Fantasía"]
    },
    reviews: [
    ],
    featured: true,
    releaseDate: "2020-06-11"
  }
];

// Function to get all publications
export function getAllPublications(): Publication[] {
  return publicationsData;
}

// Function to get a publication by slug
export function getPublicationBySlug(slug: string): Publication | undefined {
  return publicationsData.find(pub => pub.slug === slug);
}

// Function to get featured publications
export function getFeaturedPublications(): Publication[] {
  return publicationsData.filter(pub => pub.featured);
}

// Function to get publications by genre
export function getPublicationsByGenre(genre: string): Publication[] {
  return publicationsData.filter(pub => 
    pub.details.genre && pub.details.genre.some(g => 
      g.toLowerCase() === genre.toLowerCase()
    )
  );
}

// Function to get latest publications (sorted by release date)
export function getLatestPublications(limit: number = 3): Publication[] {
  return [...publicationsData]
    .sort((a, b) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
}
