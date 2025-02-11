'use client'
import Layout from "@/components/layout/Layout"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Post {
    id: number;
    title: string;
    content: string;
    tags: string | null;
    image_url: string | null;
    created_at: string;
}

export default function BlogDetails() {
    const Router = useParams();
    const [blogPost, setBlogPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const id = Router?.id;

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            
            try {
                const response = await fetch(`https://mariocarballo.pythonanywhere.com//blog/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setBlogPost(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

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
                                <time>{new Date(blogPost.created_at).toLocaleDateString()}</time>
                                {blogPost.tags && (
                                    <div className="mt-2 d-flex gap-2 flex-wrap">
                                        {blogPost.tags.split(',').map((tag: string, index: number) => (
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
