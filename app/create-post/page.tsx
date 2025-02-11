'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tags: '',
      image_url: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      tags: Yup.string(),
      image_url: Yup.string().url('Must be a valid URL')
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/blog/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ...values,
            tags: values.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          }),
        });

        if (response.ok) {
          router.push('/blog');
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to create post');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    },
  });

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="card mx-auto p-4" style={{maxWidth: '800px'}}>
          <div className="card-body">
            <h1 className="h2 mb-4">Create New Post</h1>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className="form-control"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-danger small mt-1">{formik.errors.title}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
            <Editor
              apiKey="kn8cj1fmtrnhdjf1d67ma7pr220ohoy5l5u5nejlq2xxe82i"
              init={{
                height: 500,
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
              onEditorChange={(content) => {
                formik.setFieldValue('content', content);
              }}
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="text-danger small mt-1">{formik.errors.content}</div>
            ) : null}
          </div>

              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tags}
                  className="form-control"
                  placeholder="tech, news, tutorial"
                />
                {formik.touched.tags && formik.errors.tags ? (
                  <div className="text-danger small mt-1">{formik.errors.tags}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="image_url" className="form-label">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.image_url}
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                />
                {formik.touched.image_url && formik.errors.image_url ? (
                  <div className="text-danger small mt-1">{formik.errors.image_url}</div>
                ) : null}
              </div>

              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
