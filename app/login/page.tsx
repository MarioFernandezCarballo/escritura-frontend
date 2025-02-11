'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access_token);
          router.push('/create-post');
        } else {
          setError('Invalid credentials');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    },
  });

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="card mx-auto p-4" style={{maxWidth: '400px'}}>
          <div className="card-body">
            <h1 className="h2 mb-4 text-center">Admin Login</h1>
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
              <button type="submit" className="btn btn-primary w-100">
                Sign in
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
