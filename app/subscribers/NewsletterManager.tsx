'use client';

import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNewsletters } from '@/util/api';

export default function NewsletterManager() {
    const [newNewsletter, setNewNewsletter] = useState({
        subject: '',
        content: '',
        scheduled_for: ''
    });

    const {
        newsletters,
        loading,
        error,
        fetchNewsletters,
        createNewsletter,
        sendNewsletter,
        deleteNewsletter
    } = useNewsletters();

    useEffect(() => {
        fetchNewsletters();
    }, []);

    const handleCreateNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();
        await createNewsletter(newNewsletter);
        setNewNewsletter({
            subject: '',
            content: '',
            scheduled_for: ''
        });
    };

    if (error) {
        console.error('Error:', error);
    }

    return (
        <div className="card border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mb-4">
            <h2 className="text-primary-3 mb-4">Newsletter Manager</h2>
            
            {/* Create Newsletter Form */}
            <div className="mb-4">
                <form onSubmit={handleCreateNewsletter} className="d-flex flex-column gap-3">
                    <div>
                        <label className="form-label">Subject</label>
                        <input
                            type="text"
                            value={newNewsletter.subject}
                            onChange={(e) => setNewNewsletter({...newNewsletter, subject: e.target.value})}
                            className="form-control"
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Content</label>
                        <Editor
                            apiKey="kn8cj1fmtrnhdjf1d67ma7pr220ohoy5l5u5nejlq2xxe82i"
                            init={{
                                height: 400,
                                menubar: true,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                            }}
                            value={newNewsletter.content}
                            onEditorChange={(content) => {
                                setNewNewsletter({...newNewsletter, content: content});
                            }}
                        />
                    </div>
                    <div>
                        <label className="form-label">Schedule For</label>
                        <input
                            type="datetime-local"
                            value={newNewsletter.scheduled_for}
                            onChange={(e) => setNewNewsletter({...newNewsletter, scheduled_for: e.target.value})}
                            className="form-control"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-secondary-3"
                        >
                            Create Newsletter
                        </button>
                    </div>
                </form>
            </div>

            {/* Newsletter List */}
            <div className="mt-4">
                <h3 className="text-primary-3 mb-4">Scheduled Newsletters</h3>
                <div className="d-flex flex-column gap-3">
                    {newsletters.map((newsletter) => (
                        <div key={newsletter.id} className="d-flex justify-content-between align-items-center p-3 border rounded">
                            <div>
                                <p className="text-dark mb-1">{newsletter.subject}</p>
                                <p className="text-300 fs-14 mb-0">
                                    Scheduled for: {new Date(newsletter.scheduled_for).toLocaleString()}
                                </p>
                                <p className="text-300 fs-14 mb-0">Status: {newsletter.status}</p>
                                {newsletter.sent_at && (
                                    <p className="text-300 fs-14 mb-0">
                                        Sent at: {new Date(newsletter.sent_at).toLocaleString()}
                                    </p>
                                )}
                            </div>
                            <div className="d-flex gap-2">
                                {newsletter.status === 'scheduled' && (
                                    <button
                                        onClick={() => sendNewsletter(newsletter.id)}
                                        className="btn btn-success btn-sm"
                                    >
                                        Send Now
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNewsletter(newsletter.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
