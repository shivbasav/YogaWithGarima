import { useSession } from '../contexts/SessionProvider';

/**
 * Convenience hook for accessing authentication state and methods
 * 
 * Usage:
 * const { user, isAuthenticated, isLoading, signIn, signOut } = useAuth();
 */
export function useAuth() {
  const { user, session, loading, signIn, signOut } = useSession();

  return {
    user,
    session,
    isAuthenticated: !!user,
    isLoading: loading,
    signIn,
    signOut,
  };
}
