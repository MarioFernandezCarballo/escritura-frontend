import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from './config';

export async function getBlogPost(id: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }
    return response.json();
}

interface Subscriber {
    id: number;
    email: string;
    subscribed_at: string;
}

interface BlogPost {
    id: number;
    title: string;
    content: string;
    image_url: string;
    tags: string[];
    created_at?: string;
}

interface Newsletter {
    id: number;
    subject: string;
    content: string;
    scheduled_for: string;
    status: string;
    sent_at: string | null;
}

interface LoginCredentials {
    username: string;
    password: string;
}

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Contact Hook
export const useContact = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const sendContactForm = async (formData: ContactFormData) => {
        setStatus('sending');
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al enviar el mensaje');
            }

            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
            return true;
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return false;
        }
    };

    return { sendContactForm, status };
};

// Blog Hooks
export const useBlogPosts = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/blog/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { posts, loading, error, fetchPosts };
};

export const useSinglePost = (id: string) => {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPost = async () => {
        if (!id) return;
        
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            const data = await response.json();
            setPost(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { post, loading, error, fetchPost };
};

export const useCreatePost = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const createPost = async (postData: Omit<BlogPost, 'id' | 'created_at'>) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/blog/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create post');
            }

            router.push('/blog');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { createPost, error, loading };
};

export const useEditPost = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const editPost = async (id: number, postData: Omit<BlogPost, 'id' | 'created_at'>) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update post');
            }

            router.push('/manage-posts');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { editPost, error, loading };
};

export const useDeletePost = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const deletePost = async (id: number) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Not authenticated');
            }

            const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deletePost, error, loading };
};

// Auth Hooks
export const useAuth = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`${API_BASE_URL}/auth/ping`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Not authenticated');
            }

            return true;
        } catch (err) {
            router.push('/login');
            return false;
        }
    };

    const login = async (credentials: LoginCredentials) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            router.push('/manage-posts');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { login, checkAuth, error, loading };
};

// Subscriber Hooks
export const useSubscribers = () => {
    const router = useRouter();
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/subscriber`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch subscribers');
            }
            const data = await response.json();
            setSubscribers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const addSubscriber = async (email: string, withAuth: boolean = false) => {
        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };
            
            if (withAuth) {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE_URL}/subscriber`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to add subscriber');
            }

            const data = await response.json();
            if (withAuth) {
                setSubscribers(prev => [...prev, data]);
            }
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        }
    };

    const deleteSubscriber = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/subscriber/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete subscriber');
            }

            setSubscribers(prev => prev.filter(subscriber => subscriber.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        }
    };

    const deleteSubscriberByEmail = async (email: string) => {
        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };
            const response = await fetch(`${API_BASE_URL}/subscriber/email/${email}`, {
                method: 'DELETE',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to delete subscriber');
            }
            alert("Te has dado de baja. Hasta pronto.")
        } catch (err) {
            alert("Ha ocurrido un error. Por favor, inténtalo más tarde. Si el problema persiste, ponte en contacto conmigo en mariofernandezcarballo@gmail.com.")
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        }
    };

    return {
        subscribers,
        loading,
        error,
        fetchSubscribers,
        addSubscriber,
        deleteSubscriber,
        deleteSubscriberByEmail
    };
};

// Newsletter Hooks
export const useNewsletters = () => {
    const router = useRouter();
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNewsletters = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/newsletters`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch newsletters');
            }

            const data = await response.json();
            setNewsletters(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const createNewsletter = async (newsletterData: Omit<Newsletter, 'id' | 'status' | 'sent_at'>) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/newsletters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newsletterData),
            });

            if (!response.ok) {
                throw new Error('Failed to create newsletter');
            }

            await fetchNewsletters();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const sendNewsletter = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/newsletters/${id}/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to send newsletter');
            }

            await fetchNewsletters();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const deleteNewsletter = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/newsletters/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete newsletter');
            }

            await fetchNewsletters();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    return {
        newsletters,
        loading,
        error,
        fetchNewsletters,
        createNewsletter,
        sendNewsletter,
        deleteNewsletter
    };
};
