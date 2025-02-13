'use client';

import { useState, useEffect } from 'react';
import NewsletterManager from './NewsletterManager';
import Layout from "@/components/layout/Layout";

interface Subscriber {
    id: number;
    email: string;
    subscribed_at: string;
}

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://mariocarballo.pythonanywhere.com/mailing/subscribers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch subscribers');
            }
            const data = await response.json();
            setSubscribers(data);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://mariocarballo.pythonanywhere.com/mailing/subscribers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete subscriber');
            }
            setSubscribers(subscribers.filter(subscriber => subscriber.id !== id));
        } catch (error) {
            console.error('Error deleting subscriber:', error);
        }
    };

    const handleAddSubscriber = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://mariocarballo.pythonanywhere.com/mailing/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: newEmail }),
            });
            if (!response.ok) {
                throw new Error('Failed to add subscriber');
            }
            const data = await response.json();
            setSubscribers([...subscribers, data]);
            setNewEmail('');
        } catch (error) {
            console.error('Error adding subscriber:', error);
        }
    };

    return (
        <Layout headerStyle={3} footerStyle={3}>
            <section className="section-home-3 bg-1000 pb-130 pt-96">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <NewsletterManager />
                            <div className="card border border-secondary-3 bg-white p-lg-4 p-md-4 p-3">
                                <h2 className="text-primary-3 mb-4">Manage Subscribers</h2>
                                
                                <form onSubmit={handleAddSubscriber} className="mb-4">
                                    <div className="d-flex gap-2">
                                        <input
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            placeholder="Enter email address"
                                            className="form-control"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-secondary-3"
                                        >
                                            Add Subscriber
                                        </button>
                                    </div>
                                </form>

                                <div className="d-flex flex-column gap-3">
                                    {subscribers.map(subscriber => (
                                        <div key={subscriber.id} className="d-flex justify-content-between align-items-center p-3 border rounded">
                                            <div>
                                                <p className="text-dark mb-1">{subscriber.email}</p>
                                                <p className="text-300 fs-14 mb-0">
                                                    Subscribed on {new Date(subscriber.subscribed_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(subscriber.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
