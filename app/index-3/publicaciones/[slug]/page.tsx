'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Script from "next/script"
import Layout from "@/components/layout/Layout"
import { motion } from 'framer-motion'
import { Publication, getPublicationBySlug } from "@/util/publications"

// Add PayPal type declaration
declare global {
  interface Window {
    paypal: {
      HostedButtons: (config: { hostedButtonId: string }) => {
        render: (containerId: string) => void;
      };
    };
  }
}

export default function PublicacionDetalle() {
  const params = useParams();
  const slug = params?.slug as string;
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublication = async () => {
      setLoading(true);
      try {
        // Get publication data from our utility function
        const publicationData = getPublicationBySlug(slug);
        
        if (publicationData) {
          setPublication(publicationData);
        } else {
          setError('Publicación no encontrada');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la publicación');
        setLoading(false);
      }
    };

    if (slug) {
      fetchPublication();
    }
  }, [slug]);

  // Function to initialize PayPal button when modal is opened
  useEffect(() => {
    if (publication?.buyingOptions.paypalButtonId) {
      // Add event listener for modal opening
      const handleWebBuyClick = () => {
        // Small delay to ensure the modal is visible before trying to render PayPal button
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.paypal) {
            window.paypal.HostedButtons({
              hostedButtonId: publication.buyingOptions.paypalButtonId!
            }).render(`#paypal-container-${publication.buyingOptions.paypalButtonId}`);
          }
        }, 1000);
      };

      // Find the web buy button and attach the event listener
      const webBuyButtons = document.querySelectorAll('.btn-outline-primary');
      webBuyButtons.forEach(button => {
        button.addEventListener('click', handleWebBuyClick);
      });

      // Cleanup
      return () => {
        webBuyButtons.forEach(button => {
          button.removeEventListener('click', handleWebBuyClick);
        });
      };
    }
  }, [publication]);

  return (
    <Layout headerStyle={3} footerStyle={3}>
      <div className="container py-5">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-5">
            <p className="text-danger">{error}</p>
          </div>
        )}

        {publication && !loading && !error && (
          <div className="row">
            {/* Book Cover */}
            <motion.div 
              className="col-md-4 mb-4 mb-md-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <img 
                  src={publication.coverImage} 
                  alt={publication.title} 
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            </motion.div>

            {/* Book Details */}
            <motion.div 
              className="col-md-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="display-5 fw-bold mb-2">{publication.title}</h1>
              <p className="text-primary-3 fs-5 mb-4">{publication.year}</p>

              {/* Description */}
              <div className="mb-4">
                {publication.description.map((paragraph, index) => (
                  <p key={index} className="mb-3">{paragraph}</p>
                ))}
              </div>

              {/* Book Details */}
              <div className="card mb-4 border-light">
                <div className="card-header bg-light">
                  <h3 className="h5 mb-0">Detalles del libro</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    {publication.details.isbn && (
                      <div className="col-md-6 mb-2">
                        <strong>ISBN:</strong> {publication.details.isbn}
                      </div>
                    )}
                    {publication.details.pages && (
                      <div className="col-md-6 mb-2">
                        <strong>Páginas:</strong> {publication.details.pages}
                      </div>
                    )}
                    {publication.details.publisher && (
                      <div className="col-md-6 mb-2">
                        <strong>Editorial:</strong> {publication.details.publisher}
                      </div>
                    )}
                    {publication.details.language && (
                      <div className="col-md-6 mb-2">
                        <strong>Idioma:</strong> {publication.details.language}
                      </div>
                    )}
                    {publication.details.format && (
                      <div className="col-md-6 mb-2">
                        <strong>Formato:</strong> {publication.details.format.join(', ')}
                      </div>
                    )}
                    {publication.details.genre && (
                      <div className="col-md-6 mb-2">
                        <strong>Género:</strong> {publication.details.genre.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Prices */}
              <div className="card mb-4 border-light">
                <div className="card-header bg-light">
                  <h3 className="h5 mb-0">Precios por formato</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Formato</th>
                          <th>Amazon</th>
                          <th>Web</th>
                        </tr>
                      </thead>
                      <tbody>
                        {publication.buyingOptions.prices?.paperback && (
                          <tr>
                            <td>Tapa blanda</td>
                            <td>{publication.buyingOptions.prices.paperback.amazon ? `€${publication.buyingOptions.prices.paperback.amazon.toFixed(2)}` : 'No disponible'}</td>
                            <td>{publication.buyingOptions.prices.paperback.web ? `€${publication.buyingOptions.prices.paperback.web.toFixed(2)}` : 'No disponible'}</td>
                          </tr>
                        )}
                        {publication.buyingOptions.prices?.hardcover && (
                          <tr>
                            <td>Tapa dura</td>
                            <td>{publication.buyingOptions.prices.hardcover.amazon ? `€${publication.buyingOptions.prices.hardcover.amazon.toFixed(2)}` : 'No disponible'}</td>
                            <td>{publication.buyingOptions.prices.hardcover.web ? `€${publication.buyingOptions.prices.hardcover.web.toFixed(2)}` : 'No disponible'}</td>
                          </tr>
                        )}
                        {publication.buyingOptions.prices?.ebook && (
                          <tr>
                            <td>Ebook</td>
                            <td>{publication.buyingOptions.prices.ebook.amazon ? `€${publication.buyingOptions.prices.ebook.amazon.toFixed(2)}` : 'No disponible'}</td>
                            <td>{publication.buyingOptions.prices.ebook.web ? `€${publication.buyingOptions.prices.ebook.web.toFixed(2)}` : 'No disponible'}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Buying Options */}
              <div className="mb-4">
                <h3 className="h4 mb-3">Opciones de compra</h3>
                <div className="d-flex flex-wrap gap-3">
                  {publication.buyingOptions.amazon && (
                    <motion.a 
                      href={publication.buyingOptions.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{background: '#ff9900'}}
                      className="btn btn-lg d-flex align-items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className="ri-amazon-fill"></i>
                      <span>Comprar en Amazon</span>
                    </motion.a>
                  )}
                  
                  {publication.buyingOptions.webBuy && (
                    <motion.button 
                      onClick={() => {
                        // Open modal for purchase
                        document.getElementById('purchaseModal')?.classList.add('show');
                        document.getElementById('purchaseModal')?.setAttribute('style', 'display: block; padding-right: 17px;');
                        document.body.classList.add('modal-open');
                        document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
                      }}
                      style={{background: '#fcc6e2'}}
                      className="btn btn-lg btn-outline-primary d-flex align-items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className="ri-shopping-cart-line"></i>
                      <span>Comprar en Web</span>
                    </motion.button>
                  )}
                  
                  {publication.buyingOptions.otherStores?.map((store, index) => (
                    <motion.a 
                      key={index}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-lg btn-outline-secondary d-flex align-items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className={store.icon}></i>
                      <span>Comprar en {store.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Purchase Modal */}
              <div className="modal fade" id="purchaseModal" tabIndex={-1} aria-labelledby="purchaseModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="purchaseModalLabel">Comprar {publication.title}</h5>
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => {
                          document.getElementById('purchaseModal')?.classList.remove('show');
                          document.getElementById('purchaseModal')?.setAttribute('style', 'display: none;');
                          document.body.classList.remove('modal-open');
                          document.body.removeAttribute('style');
                        }}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">                                 
                      <div className="mt-4">
                        <h6>¿Cómo funciona?</h6>
                        <p>Usando esta vía harás un pago directamente a la cuenta de Paypal de Mario Carballo. Cuando el autor reciba los datos, pedirá copias a Amazon para que lleguen a tu casa.</p>
                        <h6>¿Qué son las copias de autor?</h6>
                        <p>Son ejemplares que Amazon proporciona al autor de la obra a precio de coste para que puedan venderse por otras vías. Hace, de alguna forma, las veces de imprenta.</p>
                        <p>Si no te importa esperar un par de días más para tener tu libro disponible, comprando de esta forma maximizarás las ganacias del autor de la obra.</p>
                        <p className="mb-4">Muchísimas gracias por tu interés.</p>
                        {publication.buyingOptions.paypalButtonId ? (
                          <div id={`paypal-container-${publication.buyingOptions.paypalButtonId}`} className="d-flex justify-content-center">
                            {/* PayPal button will be rendered here */}
                          </div>
                        ) : (
                          <div id="paypal-button-container" className="d-flex justify-content-center">
                            <p className="text-center text-muted">Método de pago no disponible temporalmente</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => {
                          document.getElementById('purchaseModal')?.classList.remove('show');
                          document.getElementById('purchaseModal')?.setAttribute('style', 'display: none;');
                          document.body.classList.remove('modal-open');
                          document.body.removeAttribute('style');
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              {publication.reviews && publication.reviews.length > 0 && (
                <div className="mt-5">
                  <h3 className="h4 mb-3">Reseñas</h3>
                  <div className="row">
                    {publication.reviews.map((review, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <div className="card h-100 border-light">
                          <div className="card-body">
                            <div className="mb-2">
                              {review.rating && (
                                <div className="mb-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <i 
                                      key={i} 
                                      className={`ri-star-${i < review.rating! ? 'fill' : 'line'} text-warning`}
                                    ></i>
                                  ))}
                                </div>
                              )}
                              <p className="card-text">{review.text}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <small className="text-muted">— {review.author}</small>
                              {review.source && (
                                <small className="text-muted">Fuente: {review.source}</small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* PayPal Scripts for publications with PayPal button ID */}
      {publication && publication.buyingOptions.paypalButtonId && (
        <>
          <Script
            src="https://www.paypal.com/sdk/js?client-id=BAAxigeIQ8ik464fhcM3wmkW5xyDFvdkI4UP9BG5YFhqSvgkkaHHv8zRrHJ4k7tJbTUj_3mWF4L7lzGOks&components=hosted-buttons&disable-funding=venmo&currency=EUR" 
            crossOrigin="anonymous"
            strategy="afterInteractive"
            onLoad={() => {
              console.log("PayPal script loaded");
              // Initialize PayPal button if modal is already open
              if (document.getElementById('purchaseModal')?.classList.contains('show')) {
                setTimeout(() => {
                  if (typeof window !== 'undefined' && window.paypal) {
                    window.paypal.HostedButtons({
                      hostedButtonId: publication.buyingOptions.paypalButtonId!
                    }).render(`#paypal-container-${publication.buyingOptions.paypalButtonId}`);
                  }
                }, 500);
              }
            }}
          />
        </>
      )}
    </Layout>
  );
}
