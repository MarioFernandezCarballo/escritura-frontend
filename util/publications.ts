// Define the Publication interface for standardized JSON structure
export interface Publication {
  id: string;
  slug: string;
  title: string;
  year: string;
  coverImage: string;
  description: string[];
  preview?: string;
  buyingOptions: {
    amazon?: string;
    webBuy?: string;
    paypalButtonId?: string; // PayPal hosted button ID for this publication
    preorderPaypalButtonId?: string; // PayPal hosted button ID for preorders
    isPhysical?: boolean;
    isEbook?: boolean;
    isPreorder?: boolean; // Flag to indicate if this is a preorder
    preorderReleaseDate?: string; // Expected release date for preorders
    prices?: {
      paperback?: {
        amazon?: number;
        web?: number;
        preorder?: number; 
      };
      hardcover?: {
        amazon?: number;
        web?: number;
        preorder?: number; 
      };
      ebook?: {
        amazon?: number;
        web?: number;
        preorder?: number;
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
  disponibility?: string[];
  featured?: boolean;
  releaseDate?: string;
}

export const publicationsData: Publication[] = [
  {
    id: "1",
    slug: "omnisciens",
    title: "Omnisciens",
    year: "2025",
    coverImage: "/assets/imgs/home-page-3/typical/omnisciens.webp",
    description: [
      "La ciudad de Concordia gime bajo el azote de un planeta que nunca la quiso allí.",
      "La zarandea hasta los cimientos, rompiéndola para llenarla con el aire letal de su atmósfera. Quizás por eso, la humanidad ha olvidado su cometido.",
      "Allí, una joven desea crear en un mundo donde las ideas están perseguidas, un contrabandista odia ver a su gente explotada por los poderosos y un agente lucha contra su monstruo interior. Los tres buscan un destino diferente al que tienen en un lugar que se resquebraja.",
      "Y antes de que Omnisciens despierte, cada uno deberá descubrir hasta dónde está dispuesto a traicionarse a sí mismo.",
      "Omnisciens es una novela de ciencia ficción oscura y poética, donde la tecnología, la fe y la identidad se superponen en una ciudad al borde del colapso. Una historia sobre la libertad de pensar en un mundo diseñado para no hacerlo, y sobre el precio que implica desafiar a los dioses que nosotros mismos hemos creado.",
      "Si disfrutas de los universos de Dune, Blade Runner o Amanecer Rojo, Adéntrate en Concordia y escucha la historia que reverbera entre sus muros."
    ],
    preview: '/blog/10',
    disponibility: [],
    buyingOptions: {
      amazon: "https://amzn.eu/d/hZ8tllQ",
      webBuy: "#",
      paypalButtonId: "72W6MC38YB6SS",
      isPhysical: true,
      isEbook: true,
      preorderReleaseDate: "2025-12-12",
      prices: {
        paperback: {
          amazon: 14.90,
          web: 14.90
        },
        hardcover: {
          amazon: 20.90,
          web: 20.90
        },
        ebook: {
          amazon: 4.91
        }
      }
    },
    details: {
      isbn: "979-8271629877",
      pages: 402,
      publisher: "Ediciones Mario Carballo",
      language: "Español",
      format: ["Tapa blanda", "Tapa dura", "Ebook"],
      genre: ["Ciencia Ficción", "Fantasía", "Distopía", "Cyberpunk"]
    },
    reviews: [
    ],
    featured: true,
    releaseDate: "2025-12-12"
  },
  {
    id: "2",
    slug: "huracan",
    title: "Huracán",
    year: "2025",
    coverImage: "/assets/imgs/home-page-3/typical/huracan.webp",
    description: [
      "Sven Huracán Falk es un fantasma.",
      "Uno que deambula entre islas de chatarra que sobrevuelan el núcleo de un planeta sin suelo. Al menos, es el título que le otorgaron después del motín. Atrás quedaron las grandes hazañas a bordo del Halcón, cuando mencionaban su verdadero nombre con respeto y temor, cuando navegaba los cielos.",
      "Ahora, el viejo capitán cambia historias por licor, fama hueca por comida y puñetazos por insultos en tabernas oxidadas. Pero cuando el equilibrio amenaza con desmoronarse y una reliquia ancestral despierta fuerzas que deberían haber permanecido dormidas, el destino le ofrece una última oportunidad.",
      "Entre asesinas letales, fanáticas brujas y mecánicos brillantes, Sven deberá enfrentarse a las decisiones que tomó cuando aún era una leyenda. Porque en un mundo donde las familias nobles luchan por el control del cielo, hay traiciones que el tiempo no borra, reliquias que despiertan peligros antiguos, y algunas tormentas que solo un huracán puede superar.",
      "«Un corsero pertenece a un galeón, y solo a uno» —Artículo VI de la sección II del Código Corsero del Panaéreo",
      "Para lectores que disfrutan de Joe Abercrombie, Brandon Sanderson y Terry Pratchett."
    ],
    preview: '/blog/6',
    disponibility: [
      "El formato electrónico está también disponible en preventa en Amazon.",
      "Fecha de lanzamiento, 20 de junio de 2025"
    ],
    buyingOptions: {
      amazon: "https://amzn.eu/d/hZ8tllQ",
      webBuy: "#",
      paypalButtonId: "DEE7Y8R8NFWGN",
      isPhysical: true,
      isEbook: true,
      preorderReleaseDate: "2025-06-20",
      prices: {
        paperback: {
          amazon: 13.90,
          web: 13.90,
          preorder: 12.90
        },
        hardcover: {
          amazon: 19.90,
          web: 19.90,
          preorder: 18.90
        },
        ebook: {
          amazon: 4.76
        }
      }
    },
    details: {
      isbn: "979-8286701612",
      pages: 332,
      publisher: "Ediciones Mario Carballo",
      language: "Español",
      format: ["Tapa blanda", "Tapa dura", "Ebook"],
      genre: ["Ciencia Ficción", "Fantasía", "Aventuras", "Steampunk"]
    },
    reviews: [
    ],
    featured: false,
    releaseDate: "2025-06-13"
  },
  {
    id: "3",
    slug: "el-archivo-de-los-olvidados",
    title: "El archivo de los olvidados",
    year: "2025",
    coverImage: "/assets/imgs/home-page-3/typical/Archivo.webp",
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
    id: "4",
    slug: "al-otro-lado-de-la-esfera",
    title: "Al otro lado de la esfera",
    year: "2020",
    coverImage: "/assets/imgs/home-page-3/typical/Esfera.webp",
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

// Function to get preorder publications
export function getPreorderPublications(): Publication[] {
  return publicationsData.filter(pub => pub.buyingOptions.isPreorder);
}

// Function to get available publications (not preorders)
export function getAvailablePublications(): Publication[] {
  return publicationsData.filter(pub => !pub.buyingOptions.isPreorder);
}

// Function to check if a publication is available for preorder
export function isPreorderAvailable(publication: Publication): boolean {
  return !!(publication.buyingOptions.isPreorder && publication.buyingOptions.preorderPaypalButtonId);
}

// Function to get preorder release date formatted
export function getPreorderReleaseDate(publication: Publication): string | null {
  if (!publication.buyingOptions.preorderReleaseDate) return null;
  
  const date = new Date(publication.buyingOptions.preorderReleaseDate);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
