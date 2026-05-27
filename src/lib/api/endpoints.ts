const BASE = process.env.NEXT_PUBLIC_API_URL;
// if (!BASE) throw new Error('NEXT_PUBLIC_API_URL is not defined');

/**
 * Centralized API endpoints — return full URLs ready for fetch() or apiClient.
 *
 * Usage:
 *   apiClient.get(endpoints.movies.byId(42))
 *   fetch(endpoints.movies.byId(42), { next: { revalidate: 30 } })
 */
export const endpoints = {
  auth: {
    login:    `${BASE}/auth/login`,
    register: `${BASE}/auth/register`,
    logout:   `${BASE}/auth/logout`,
    me:       `${BASE}/auth/me`,
  },

  movies: {
    search:    (q: string) => `${BASE}/movies/search?q=${encodeURIComponent(q)}`,
    byId:      (id: number) => `${BASE}/movies/${id}`,
    stats:     (id: number) => `${BASE}/movies/${id}/stats`,
    reviews:   (id: number) => `${BASE}/movies/${id}/reviews`,
    rate:      (id: number) => `${BASE}/movies/${id}/rate`,
    watchlist: (id: number) => `${BASE}/movies/${id}/watchlist`,
    watched:   (id: number) => `${BASE}/movies/${id}/watched`,
  },

  users: {
    byId:      (id: number) => `${BASE}/users/${id}`,
    reviews:   (id: number) => `${BASE}/users/${id}/reviews`,
    watchlist: (id: number) => `${BASE}/users/${id}/watchlist`,
    watched:   (id: number) => `${BASE}/users/${id}/watched`,
    followers: (id: number) => `${BASE}/users/${id}/followers`,
    following: (id: number) => `${BASE}/users/${id}/following`,
    follow:    (id: number) => `${BASE}/users/${id}/follow`,
  },

  feed: {
    general:  `${BASE}/feed`,
    personal: `${BASE}/feed/personal`,
    popular:  `${BASE}/feed/popular`,
  },
} as const;
