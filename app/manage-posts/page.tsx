'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import { useBlogPosts, useDeletePost } from '@/util/api';
import { withAuth } from '@/components/auth/withAuth';

function ManagePosts() {
    const router = useRouter();
    const { posts, loading, error, fetchPosts } = useBlogPosts();
    const { deletePost, loading: deleteLoading } = useDeletePost();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleEditPost = (id: number) => {
        router.push(`/edit-post/${id}`);
    };

    const handleDeletePost = async (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
            const success = await deletePost(id);
            if (success) {
                fetchPosts();
            }
        }
    };

    if (loading) {
        return (
            <Layout headerStyle={3} footerStyle={3}>
                <section className="section-home-3 bg-1000 pb-130 pt-96">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div>Loading...</div>
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
                                <div className="alert alert-danger">{error}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout headerStyle={3} footerStyle={3}>
            <section className="section-home-3 bg-1000 pb-130 pt-96">
                <div className="container">
                    <div className="card border border-secondary-3 bg-white p-lg-4 p-md-4 p-3">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="text-primary-3 mb-0">Manage Posts</h2>
                            <button
                                onClick={() => router.push('/create-post')}
                                className="btn btn-secondary-3"
                            >
                                Create New Post
                            </button>
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search posts by title or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Tags</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPosts.map((post) => (
                                        <tr key={post.id}>
                                            <td>{post.title}</td>
                                            <td>
                                                <div className="d-flex gap-1 flex-wrap">
                                                    {post.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="badge bg-secondary-3"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                {post.created_at
                                                    ? new Date(post.created_at).toLocaleDateString()
                                                    : 'N/A'}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        onClick={() => handleEditPost(post.id)}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="btn btn-danger btn-sm"
                                                        disabled={deleteLoading}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default withAuth(ManagePosts);
