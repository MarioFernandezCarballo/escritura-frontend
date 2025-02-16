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

            {blogPost && !loading && !error && (
                <div className="container py-5">
                    <article className="row justify-content-center">
                        <div className="col-lg-10">
                            {blogPost.image_url && (
                                <img 
                                    src={blogPost.image_url} 
                                    alt={blogPost.title}
                                    className="img-fluid rounded mb-4"
                                    style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                                />
                            )}
                            <h1 className="display-4 fw-bold mb-4">{blogPost.title}</h1>
                            <div className="mb-4 text-muted">
                                <time>{blogPost.created_at ? new Date(blogPost.created_at).toLocaleDateString() : ''}</time>
                                {blogPost.tags && blogPost.tags.length > 0 && (
                                    <div className="mt-2 d-flex gap-2 flex-wrap">
                                        {blogPost.tags.map((tag: string, index: number) => (
                                            <span 
                                                key={index}
                                                className="badge bg-light text-dark"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div 
                                className="blog-content"
                                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                            />
                        </div>
                    </article>
                </div>
            )}
        </Layout>
    );
}
