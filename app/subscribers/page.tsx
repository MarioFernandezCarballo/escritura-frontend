'use client';

import { useEffect } from 'react';
import NewsletterManager from './NewsletterManager';
import Layout from "@/components/layout/Layout";
import { useSubscribers } from '@/util/api';

export default function SubscribersPage() {
    const { 
        subscribers, 
        loading, 
        error,
        fetchSubscribers, 
        addSubscriber, 
        deleteSubscriber 
    } = useSubscribers();

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handleAddSubscriber = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const emailInput = form.elements.namedItem('email') as HTMLInputElement;
        
        try {
            await addSubscriber(emailInput.value, true);
            emailInput.value = '';
        } catch (error) {
            console.error('Error adding subscriber:', error);
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
                                <div>Error: {error}</div>
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
                    <div className="row">
                        <div className="col-12">
                            <NewsletterManager />
                            <div className="card border border-secondary-3 bg-white p-lg-4 p-md-4 p-3">
                                <h2 className="text-primary-3 mb-4">Manage Subscribers</h2>
                                
                                <form onSubmit={handleAddSubscriber} className="mb-4">
                                    <div className="d-flex gap-2">
                                        <input
                                            type="email"
                                            name="email"
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
                                                onClick={() => deleteSubscriber(subscriber.id)}
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
