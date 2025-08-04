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

  return (
      <Layout>
        {loading && (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )}

        {error && (
            <div className="text-center py-5">
                <p className="text-danger">{error}</p>
            </div>
        )}
        {post && !loading && !error &&
        <section id={`blog-post-${post.id}`} className="mc-blog-post custom-header pe-lg-5" style={{minHeight: 400, backgroundImage: `url(${post.image_url})`}}>
            <div className="container my-auto">
                <div className="row">
                    <div className="col-xl-8 col-md-12 mt-5 mx-auto">
                    </div>
                </div>
            </div>
        </section>
        }
        
        {post && !loading && !error && (
        <section id={`blog-post-desc-${post.id}`} className="custom-header pe-lg-5">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-md-12 mt-5 mx-auto">
                        <h1 className="mx-auto post-title">{post.title}</h1>
                        <time>{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</time>
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-4 d-flex gap-2 flex-wrap">
                                {post.tags.map((tag: string, index: number) => (
                                    <span 
                                        key={index}
                                        className="badge border"
                                    >
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div 
                            className="blog-content mt-5"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>
            </div>
        </section>
            
        )}
    </Layout>
  );
}

export default SecretPost;
