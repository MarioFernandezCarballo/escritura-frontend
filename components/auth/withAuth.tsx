'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/util/api';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const { checkAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const verifyAuth = async () => {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push('/');
        }
      };

      verifyAuth();
    }, []);

    return <Component {...props} />;
  };
}
