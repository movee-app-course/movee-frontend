import { notFound } from "next/navigation";
import { MoviePageClient } from "@/components/movie/MoviePageClient";
import { endpoints } from "@/lib/api/endpoints";
import type { Movie } from "@/types";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  const movieId = Number(id);
  if (isNaN(movieId)) notFound();

  let initialMovieData: Movie | null = null;
  try {
    const res = await fetch(endpoints.movies.byId(movieId), {
      next: { revalidate: 30 }, // Cache movie details for 30s
    });

    if (res.ok) {
      const rawMovie = await res.json();
      initialMovieData = {
        id: rawMovie.id,
        tmdbId: rawMovie.tmdb_id,
        title: rawMovie.title,
        originalTitle: rawMovie.original_title,
        overview: rawMovie.overview,
        posterPath: rawMovie.poster_path,
        backdropPath: rawMovie.backdrop_path,
        releaseDate: rawMovie.release_date,
        genres: rawMovie.genres || [],
        voteAverage: rawMovie.vote_average
          ? parseFloat(rawMovie.vote_average)
          : null,
      };
    }
  } catch (err) {
    console.error(`SSR pre-fetch failed for movie ${id}:`, err);
  }

  return (
    <MoviePageClient
      movieId={movieId}
      initialMovieData={initialMovieData}
    />
  );
}
