// ============================================================
// Movee — Shared TypeScript Types
// Source of truth: docs/ARCHITECTURE.md → «Ключевые TypeScript типы»
// ============================================================

export interface User {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
}

export interface Movie {
  id: number;
  tmdbId: number;
  title: string;
  originalTitle: string | null;
  overview: string | null;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string | null;
  genres: { id: number; name: string }[];
  voteAverage: number | null;
}

export interface Rating {
  id: number;
  userId: number;
  movieId: number;
  score: number; // 1-10
  createdAt: string;
}

export interface Review {
  id: number;
  user: User;
  movie: Movie;
  score: number;
  text: string;
  hasSpoilers: boolean;
  createdAt: string;
}

export interface FeedItem {
  review: Review;
  /** For authenticated users: whether the current user follows the author */
  isFollowing?: boolean;
}

export interface MovieStats {
  totalRatings: number;
  averageScore: number | null;
  // For authenticated users:
  friendsWatched: number;
  friendsAverageScore: number | null;
  myRating: Rating | null;
  inWatchlist: boolean;
  isWatched: boolean;
}

// ============================================================
// API Response wrappers
// ============================================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CursorPaginatedResponse<T> {
  data: T[];
  nextCursor: number | null;
  hasMore: boolean;
}

// ============================================================
// Auth
// ============================================================

export interface AuthUser extends User {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  displayName: string;
  password: string;
}
