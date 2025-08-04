'use client';

import { useEffect } from 'react';
import { useSecretPost } from '@/util/api';
import Layout from "@/components/layout/Layout";
import DOMPurify from 'isomorphic-dompurify';

function SecretPost({ params }: { params: { token: string } }) {
  const { post, loading, error, fetchSecretPost } = useSecretPost(params.token);

  useEffect(() => {
    fetchSecretPost();
  }, [params.token]);

  if (loading) {
    return (
      <Layout headerStyle={3} footerStyle={3}>
        <section className="section-home-3 bg-1000 pb-130 pt-96">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3">Cargando contenido exclusivo...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout headerStyle={3} footerStyle={3}>
        <section className="section-home-3 bg-1000 pb-130 pt-96">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger text-center">
                  <h4>Contenido no encontrado</h4>
                  <p>Este enlace no es válido o el contenido ya no está disponible.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <Layout headerStyle={3} footerStyle={3}>
      <section className="section-home-3 bg-1000 pb-130 pt-96">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-md-12 mx-auto">
              {/* Banner de contenido exclusivo */}
              <div className="alert alert-warning border-warning mb-4" style={{
                background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
                border: '2px solid #f39c12'
              }}>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <i className="ri-vip-crown-line" style={{ fontSize: '2rem', color: '#f39c12' }}></i>
                  </div>
                  <div>
                    <h5 className="alert-heading mb-2" style={{ color: '#856404' }}>
                      <i className="ri-lock-line me-2"></i>
                      Contenido Exclusivo
                    </h5>
                    <p className="mb-0" style={{ color: '#856404' }}>
                      Este relato es contenido exclusivo para <strong>miembros de nuestro canal de Telegram</strong> y <strong>suscriptores del newsletter</strong>. 
                      ¡Gracias por formar parte de nuestra comunidad!
                    </p>
                    <div className="mt-2">
                      <a 
                        href="https://t.me/tu_canal_telegram" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm me-2"
                        style={{ 
                          backgroundColor: '#0088cc', 
                          color: 'white',
                          border: 'none'
                        }}
                      >
                        <i className="ri-telegram-line me-1"></i>
                        Telegram
                      </a>
                      <a 
                        href="/newsletter" 
                        className="btn btn-sm"
                        style={{ 
                          backgroundColor: '#28a745', 
                          color: 'white',
                          border: 'none'
                        }}
                      >
                        <i className="ri-mail-line me-1"></i>
                        Newsletter
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido del post */}
              <article className="card border border-secondary-3 bg-white p-lg-4 p-md-4 p-3">
                {post.image_url && (
                  <div className="mb-4">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="img-fluid rounded"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                )}

                <header className="mb-4">
                  <h1 className="text-primary-3 mb-3">{post.title}</h1>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-secondary-3 me-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {post.created_at && (
                    <p className="text-muted mb-0">
                      <i className="ri-calendar-line me-2"></i>
                      {new Date(post.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </header>

                <div 
                  className="post-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content)
                  }}
                  style={{
                    lineHeight: '1.8',
                    fontSize: '1.1rem'
                  }}
                />
              </article>

              {/* Mensaje final de agradecimiento */}
              <div className="text-center mt-4">
                <div className="card border-0" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="card-body py-3">
                    <p className="mb-0 text-muted">
                      <i className="ri-heart-line me-2 text-danger"></i>
                      ¿Te ha gustado este relato? Compártelo con otros miembros de la comunidad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default SecretPost;
