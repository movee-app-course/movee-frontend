// ============================================================
// Movee — Raw API response types (snake_case from the backend)
// These are the shapes returned directly by the server before
// being mapped to the camelCase domain types in index.ts.
// ============================================================

export interface RawMovie {
  id: number;
  tmdb_id: number;
  title: string;
  original_title: string | null;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string | null;
  genres: { id: number; name: string }[];
  vote_average: string | null; // stored as numeric string in DB
}

export interface RawMovieSearchResponse {
  results: RawMovie[];
}
