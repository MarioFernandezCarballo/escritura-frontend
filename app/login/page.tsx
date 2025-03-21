'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/util/api';
import Layout from "@/components/layout/Layout";

export default function Login() {
  const { login, error, loading } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <Layout headerStyle={3} footerStyle={3}>
      <section className="section-home-3 bg-1000 pb-130 pt-96">
        <div className="container">
          <div className="card border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mx-auto" style={{maxWidth: '400px'}}>
            <div className="card-body">
              <h1 className="text-primary-3 mb-4 text-center">Admin Login</h1>
              
              <form onSubmit={formik.handleSubmit}>
                {error && (
                  <div className="alert alert-danger text-center">{error}</div>
                )}
                
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className="form-control"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-danger small mt-1">{formik.errors.username}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="form-control"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger small mt-1">{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-secondary-3 w-100">
                    Sign in
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
