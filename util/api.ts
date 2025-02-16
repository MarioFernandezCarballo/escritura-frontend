import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE_URL = 'https://mariocarballo.pythonanywhere.com';

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

// Auth Hooks
export const useAuth = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
            router.push('/create-post');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { login, error, loading };
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
            const response = await fetch(`${API_BASE_URL}/mailing/subscribers`, {
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

            const response = await fetch(`${API_BASE_URL}/mailing/subscribers`, {
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

            const response = await fetch(`${API_BASE_URL}/mailing/subscribers/${id}`, {
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

    return {
        subscribers,
        loading,
        error,
        fetchSubscribers,
        addSubscriber,
        deleteSubscriber
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
