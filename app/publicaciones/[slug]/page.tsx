'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Script from "next/script"
import Layout from "@/components/layout/Layout"
import { motion } from 'framer-motion'
import { Publication, getPublicationBySlug, isPreorderAvailable, getPreorderReleaseDate } from "@/util/publications"

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
  const [paypalLoading, setPaypalLoading] = useState<boolean>(true);

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

  // Function to initialize PayPal buttons when modals are opened
  useEffect(() => {
    const handleWebBuyClick = () => {
      if (publication?.buyingOptions.paypalButtonId) {
        setPaypalLoading(true);
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.paypal) {
            try {
              window.paypal.HostedButtons({
                hostedButtonId: publication.buyingOptions.paypalButtonId!
              }).render(`#paypal-container-${publication.buyingOptions.paypalButtonId}`);
              setTimeout(() => setPaypalLoading(false), 500);
            } catch (error) {
              console.error("Error rendering PayPal button:", error);
              setPaypalLoading(false);
            }
          } else {
            console.warn("PayPal SDK not available");
            setPaypalLoading(false);
          }
        }, 1000);
      }
    };

    const handlePreorderClick = () => {
      if (publication?.buyingOptions.preorderPaypalButtonId) {
        setPaypalLoading(true);
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.paypal) {
            try {
              window.paypal.HostedButtons({
                hostedButtonId: publication.buyingOptions.preorderPaypalButtonId!
              }).render(`#paypal-container-preorder-${publication.buyingOptions.preorderPaypalButtonId}`);
              setTimeout(() => setPaypalLoading(false), 500);
            } catch (error) {
              console.error("Error rendering PayPal preorder button:", error);
              setPaypalLoading(false);
            }
          } else {
            console.warn("PayPal SDK not available");
            setPaypalLoading(false);
          }
        }, 1000);
      }
    };

    // Attach event listeners
    const webBuyButtons = document.querySelectorAll('.btn-outline-primary');
    const preorderButtons = document.querySelectorAll('.btn-warning');
    
    webBuyButtons.forEach(button => {
      button.addEventListener('click', handleWebBuyClick);
    });
    
    preorderButtons.forEach(button => {
      button.addEventListener('click', handlePreorderClick);
    });

    // Cleanup
    return () => {
      webBuyButtons.forEach(button => {
        button.removeEventListener('click', handleWebBuyClick);
      });
      preorderButtons.forEach(button => {
        button.removeEventListener('click', handlePreorderClick);
      });
    };
  }, [publication]);

  return (
    <Layout headerStyle={3} footerStyle={3}>
      <section id={publication?.id} className="product">
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
                  <source srcSet={publication.coverImage?.replace(".jpg", "/webp")} type="image/webp"></source>
                  <img 
                    src={publication.coverImage} 
                    alt={publication.title} 
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '500px' }}
                  />
                  {/* Buying Options */}
                  <div className="mt-6 mb-4">
                    <div className="d-flex flex-column gap-3 mx-auto buylinks">
                      {publication.buyingOptions.amazon && (
                        <motion.a 
                          id={`amazon-${publication.slug}`}
                          href={publication.buyingOptions.amazon}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{background: '#ff990080', minWidth: '300px'}}
                          className="btn btn-lg d-flex align-items-center gap-2"
                          whileHover={{ scale: 1.02, background: '#ff9900' }}
                          transition={{ duration: 0.1 }}
                        >
                          <i className="ri-amazon-fill"></i>
                          {<span>Comprar en Amazon</span>}
                        </motion.a>
                      )}
                      
                      {publication.buyingOptions.webBuy && !publication.buyingOptions.isPreorder && (
                        <motion.button 
                          id={`web-${publication.slug}`}
                          onClick={() => {                        
                            // Open modal for purchase
                            document.getElementById('purchaseModal')?.classList.add('show');
                            document.getElementById('purchaseModal')?.setAttribute('style', 'display: block; padding-right: 17px;');
                            document.body.classList.add('modal-open');
                            document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
                          }}
                          style={{background: '#627fc280', minWidth: '300px'}}
                          className="btn btn-lg btn-outline-primary d-flex align-items-center gap-2"
                          whileHover={{ scale: 1.02, background: '#627fc2'}}
                          transition={{ duration: 0.1 }}
                        >
                          <i className="ri-shopping-cart-line"></i>
                          <span>Comprar en Web</span>
                        </motion.button>
                      )}

                      {isPreorderAvailable(publication) && (
                        <motion.button 
                          id={`preorder-${publication.slug}`}
                          onClick={() => {                        
                            // Open modal for preorder
                            document.getElementById('preorderModal')?.classList.add('show');
                            document.getElementById('preorderModal')?.setAttribute('style', 'display: block; padding-right: 17px;');
                            document.body.classList.add('modal-open');
                            document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
                          }}
                          style={{background: '#33cc3380', minWidth: '300px'}}
                          className="btn btn-lg btn-warning d-flex align-items-center gap-2"
                          whileHover={{ scale: 1.02, background: '#00cc00'}}
                          transition={{ duration: 0.1 }}
                        >
                          <i className="ri-time-line"></i>
                          <span>Comprar por adelantado</span>
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
                </div>
                
              </motion.div>

              {/* Book Details */}
              <motion.div 
                className="col-md-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  <h1 className="display-5 fw-bold mb-0">{publication.title}</h1>
                  {publication.buyingOptions.isPreorder && (
                    <span className="badge px-3 py-2 d-flex align-items-center" style={{backgroundColor: '#00cc0080'}}>
                      <i className="ri-time-line me-1"></i>
                      Preventa
                    </span>
                  )}
                </div>
                <p className="fs-5 mb-2">{publication.year}</p>
                {publication.buyingOptions.isPreorder && publication.buyingOptions.preorderReleaseDate && (
                  <p className="text-muted mb-4">
                    <i className="ri-calendar-line me-1"></i>
                    Fecha de lanzamiento: {getPreorderReleaseDate(publication)}
                  </p>
                )}

                {/* Description */}
                <div className="mb-4">
                  {publication.description.map((paragraph, index) => (
                    <p key={index} className="mb-3">{paragraph}</p>
                  ))}
                </div>

                {/*Preview */}
                {publication.preview && 
                <div className="mb-4">
                  <p>Puedes leer un adelanto <a href={publication.preview}>aquí</a></p>
                </div>}

                {/* Book Details */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h3 className="mb-0">Detalles del libro</h3>
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
                {/* Disponibilidad */}
               {publication.disponibility && <div className="mb-4">
                  {publication.disponibility.map((paragraph, index) => (
                    <p key={index} className="mb-3">{paragraph}</p>
                  ))}
                </div>}
                {/* Prices */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h3 className="mb-0">Precios por formato</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Formato</th>
                            {publication.buyingOptions.amazon && <th>Amazon</th>}
                            {publication.buyingOptions.webBuy && <th>Web</th>}
                            {publication.buyingOptions.isPreorder && <th>Preventa Web</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {publication.buyingOptions.prices?.paperback && (
                            <tr>
                              <td>Tapa blanda</td>
                              {publication.buyingOptions.amazon && <td>{publication.buyingOptions.prices.paperback.amazon ? `€${publication.buyingOptions.prices.paperback.amazon.toFixed(2)}` : publication.buyingOptions.isPreorder ? getPreorderReleaseDate(publication) : 'No disponible'}</td>}
                              {publication.buyingOptions.webBuy && <td>{publication.buyingOptions.prices.paperback.web ? `€${publication.buyingOptions.prices.paperback.web.toFixed(2)}` : 'No disponible'}</td>}
                              {publication.buyingOptions.isPreorder && <td>{publication.buyingOptions.prices.paperback.preorder ? `€${publication.buyingOptions.prices.paperback.preorder.toFixed(2)}` : 'No disponible'}</td>}
                            </tr>
                          )}
                          {publication.buyingOptions.prices?.hardcover && (
                            <tr>
                              <td>Tapa dura</td>
                              {publication.buyingOptions.amazon && <td>{publication.buyingOptions.prices.hardcover.amazon ? `€${publication.buyingOptions.prices.hardcover.amazon.toFixed(2)}` : publication.buyingOptions.isPreorder ? getPreorderReleaseDate(publication) : 'No disponible'}</td>}
                              {publication.buyingOptions.webBuy && <td>{publication.buyingOptions.prices.hardcover.web ? `€${publication.buyingOptions.prices.hardcover.web.toFixed(2)}` : 'No disponible'}</td>}
                              {publication.buyingOptions.isPreorder && <td>{publication.buyingOptions.prices.hardcover.preorder ? `€${publication.buyingOptions.prices.hardcover.preorder.toFixed(2)}` : 'No disponible'}</td>}
                            </tr>
                          )}
                          {publication.buyingOptions.prices?.ebook && (
                            <tr>
                              <td>Ebook</td>
                              {publication.buyingOptions.amazon && <td>{publication.buyingOptions.prices.ebook.amazon ? `€${publication.buyingOptions.prices.ebook.amazon.toFixed(2)}` : 'No disponible'}</td>}
                              {publication.buyingOptions.webBuy && <td>{publication.buyingOptions.prices.ebook.web ? `€${publication.buyingOptions.prices.ebook.web.toFixed(2)}` : 'No disponible'}</td>}
                              {publication.buyingOptions.isPreorder && <td>{publication.buyingOptions.prices.ebook.preorder ? `€${publication.buyingOptions.prices.ebook.preorder.toFixed(2)}` : 'No disponible'}</td>}
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
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
                          <p>Son ejemplares que Amazon proporciona al autor de la obra a precio de coste para que puedan venderse por otras vías. Amazon hace, de alguna forma, las veces de imprenta.</p>
                          <p>Si no te importa esperar un par de días más para tener tu libro disponible, comprando de esta forma maximizarás las ganacias del autor de la obra. Siempre puedes esperar a que el libro salga a la venta en Amazon y comprarlo directamente allí.</p>
                          <p className="mb-4">Muchísimas gracias por tu interés.</p>
                          {publication.buyingOptions.paypalButtonId ? (
                            <div className="container-fluid p-0">
                              {paypalLoading && (
                                <div className="text-center mb-3">
                                  <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Cargando PayPal...</span>
                                  </div>
                                  <p className="mt-2 text-muted">Cargando opciones de pago...</p>
                                </div>
                              )}
                              <div 
                                id={`paypal-container-${publication.buyingOptions.paypalButtonId}`} 
                                className="w-100"
                                style={{ 
                                  display: paypalLoading ? 'none' : 'block',
                                  maxWidth: '100%',
                                  margin: '0 auto'
                                }}
                              >
                                {/* PayPal button will be rendered here */}
                              </div>
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

                {/* Preorder Modal */}
                <div className="modal fade" id="preorderModal" tabIndex={-1} aria-labelledby="preorderModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="preorderModalLabel">
                          <i className="ri-time-line me-2"></i>
                          Preventa: {publication.title}
                        </h5>
                        <button 
                          type="button" 
                          className="btn-close" 
                          onClick={() => {
                            document.getElementById('preorderModal')?.classList.remove('show');
                            document.getElementById('preorderModal')?.setAttribute('style', 'display: none;');
                            document.body.classList.remove('modal-open');
                            document.body.removeAttribute('style');
                          }}
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {publication.buyingOptions.preorderReleaseDate && (
                          <div className="alert alert-warning mb-4">
                            <i className="ri-calendar-line me-2"></i>
                            Fecha prevista de lanzamiento: {getPreorderReleaseDate(publication)}
                          </div>
                        )}
                        
                        <div className="mt-4">
                          <h6>¿Qué es una preventa?</h6>
                          <p>Al hacer una preventa, reservas tu copia del libro antes de su lanzamiento oficial. Recibirás el libro tan pronto como esté disponible.</p>
                          
                          <h6>¿Cómo funciona?</h6>
                          <p>Realizarás un pago directamente a la cuenta de PayPal de Mario Carballo. Una vez que el libro esté listo para su distribución, el autor gestionará el envío de tu copia.</p>
                          
                          <h6>Ventajas:</h6>
                          <ul>
                            <li>Precio especial de preventa (más económico que el precio final)</li>
                            <li>Garantizas tu copia desde el primer día</li>
                            <li>Apoyas directamente al autor</li>
                            <li>Recibes el libro tan pronto como esté disponible</li>
                          </ul>
                          
                          <p className="mb-4">Muchísimas gracias por tu apoyo y confianza.</p>
                          
                          {publication.buyingOptions.preorderPaypalButtonId ? (
                            <div className="container-fluid p-0">
                              {paypalLoading && (
                                <div className="text-center mb-3">
                                  <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Cargando PayPal...</span>
                                  </div>
                                  <p className="mt-2 text-muted">Cargando opciones de pago...</p>
                                </div>
                              )}
                              <div 
                                id={`paypal-container-preorder-${publication.buyingOptions.preorderPaypalButtonId}`} 
                                className="w-100"
                                style={{ 
                                  display: paypalLoading ? 'none' : 'block',
                                  maxWidth: '100%',
                                  margin: '0 auto'
                                }}
                              >
                                {/* PayPal preorder button will be rendered here */}
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-center">
                              <p className="text-center text-muted">Preventa no disponible temporalmente</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button 
                          type="button" 
                          className="btn btn-secondary" 
                          onClick={() => {
                            document.getElementById('preorderModal')?.classList.remove('show');
                            document.getElementById('preorderModal')?.setAttribute('style', 'display: none;');
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

      </section>
      

      {/* PayPal Scripts for publications with PayPal button ID or preorder button ID */}
      {publication && (publication.buyingOptions.paypalButtonId || publication.buyingOptions.preorderPaypalButtonId) && (
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
                    try {
                      window.paypal.HostedButtons({
                        hostedButtonId: publication.buyingOptions.paypalButtonId!
                      }).render(`#paypal-container-${publication.buyingOptions.paypalButtonId}`);
                      
                      // Set loading to false after a short delay to ensure button is visible
                      setTimeout(() => {
                        setPaypalLoading(false);
                      }, 500);
                    } catch (error) {
                      console.error("Error rendering PayPal button:", error);
                      setPaypalLoading(false);
                    }
                  } else {
                    console.warn("PayPal SDK not available");
                    setPaypalLoading(false);
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
