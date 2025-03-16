'use client'
import Layout from "@/components/layout/Layout"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useSinglePost } from "@/util/api"

export default function BlogDetails() {
    const Router = useParams();
    const id = Router?.id as string;
    const { post: blogPost, loading, error, fetchPost } = useSinglePost(id);

    useEffect(() => {
        fetchPost();
    }, [id]);

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
            {blogPost && !loading && !error &&
            <section id={`blog-post-${blogPost.id}`} className="mc-blog-post custom-header pe-lg-5" style={{minHeight: 400, backgroundImage: `url(${blogPost.image_url})`}}>
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-xl-8 col-md-12 mt-5 mx-auto">
                        </div>
                    </div>
                </div>
            </section>
            }
            
            {blogPost && !loading && !error && (
            <section id={`blog-post-desc-${blogPost.id}`} className="custom-header pe-lg-5">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-md-12 mt-5 mx-auto">
                            <h1 className="mx-auto post-title">{blogPost.title}</h1>
                            <time>{blogPost.created_at ? new Date(blogPost.created_at).toLocaleDateString() : ''}</time>
                            {blogPost.tags && blogPost.tags.length > 0 && (
                                <div className="mt-4 d-flex gap-2 flex-wrap">
                                    {blogPost.tags.map((tag: string, index: number) => (
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
                                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                            />
                        </div>
                    </div>
                </div>
            </section>
                
            )}
        </Layout>
    );
}
