'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useEditPost, useSinglePost } from '@/util/api';
import Layout from "@/components/layout/Layout";
import { withAuth } from '@/components/auth/withAuth';

function EditPost({ params }: { params: { id: string } }) {
  const { post, loading: postLoading, error: postError, fetchPost } = useSinglePost(params.id);
  const { editPost, error: editError, loading: editLoading } = useEditPost();

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const formik = useFormik({
    initialValues: {
      title: post?.title || '',
      content: post?.content || '',
      tags: post?.tags?.join(', ') || '',
      image_url: post?.image_url || '',
      is_secret: post?.is_secret || false
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      tags: Yup.string(),
      image_url: Yup.string().url('Must be a valid URL'),
      is_secret: Yup.boolean()
    }),
    onSubmit: (values) => {
      editPost(parseInt(params.id), {
        ...values,
        tags: values.tags.split(',').map(tag => tag.trim())
      });
    },
  });

  if (postLoading) {
    return (
      <Layout headerStyle={3} footerStyle={3}>
        <section className="section-home-3 bg-1000 pb-130 pt-96">
          <div className="container">
            <div>Loading...</div>
          </div>
        </section>
      </Layout>
    );
  }

  if (postError) {
    return (
      <Layout headerStyle={3} footerStyle={3}>
        <section className="section-home-3 bg-1000 pb-130 pt-96">
          <div className="container">
            <div className="alert alert-danger">{postError}</div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout headerStyle={3} footerStyle={3}>
      <section className="section-home-3 bg-1000 pb-130 pt-96">
        <div className="container">
          <div className="card border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mx-auto" style={{maxWidth: '800px'}}>
            <div className="card-body">
              <h1 className="text-primary-3 mb-4">Edit Post</h1>

              {editError && (
                <div className="alert alert-danger">
                  {editError}
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
                    id="content-editor"
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
                    value={formik.values.content}
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

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="is_secret"
                      name="is_secret"
                      onChange={formik.handleChange}
                      checked={formik.values.is_secret}
                      className="form-check-input"
                    />
                    <label htmlFor="is_secret" className="form-check-label">
                      <i className="ri-lock-line me-2"></i>
                      Post secreto (solo accesible por link directo)
                    </label>
                  </div>
                  <small className="text-muted">
                    Los posts secretos no aparecen en la lista pública del blog, pero son accesibles si alguien tiene el enlace directo.
                  </small>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-secondary-3"
                    disabled={editLoading}
                  >
                    {editLoading ? 'Saving...' : 'Save Changes'}
                    <i className="ri-arrow-right-line ms-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default withAuth(EditPost);
