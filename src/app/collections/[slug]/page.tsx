// "use client";

import { MovieCard } from "@/components/movie/MovieCard";
import { endpoints } from "@/lib/api/endpoints";
import { CollectionDetail } from "@/types";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;

  let collection: CollectionDetail | null = null;
  try {
    const res = await fetch(endpoints.collections.slug(slug));

    if (res.ok) {
      const rawMovie = await res.json();
      collection = rawMovie;
    }
  } catch (err) {
    console.error(`SSR pre-fetch failed for movie ${slug}:`, err);
  }

  return {
    title: `${collection?.title}`,
    description: collection?.description,
    openGraph: {
      title: collection?.title,
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  console.log(slug);

  let collection: CollectionDetail | null = null;
  try {
    const res = await fetch(endpoints.collections.slug(slug), {
      next: { revalidate: 30 }, // Cache movie details for 30s
    });

    if (res.ok) {
      const rawMovie = await res.json();
      collection = rawMovie;
    }
  } catch (err) {
    console.error(`SSR pre-fetch failed for movie ${slug}:`, err);
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/search"
        className="group inline-flex items-center gap-2 text-sm text-blue-600 transition-colors hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Все подборки
      </Link>
      <h1 className="mb-2 text-3xl font-bold">{collection?.title}</h1>
      <p className="text-muted-foreground mb-6">{collection?.description}</p>
      <div className="animate-in-up grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {collection?.movies.map((movie) => (
          <MovieCard key={movie.tmdb_id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
