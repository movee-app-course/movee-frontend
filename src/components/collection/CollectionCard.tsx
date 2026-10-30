"use client";
import Image from "next/image";
import Link from "next/link";
import { FilmIcon } from "lucide-react";
import { CollectionSummary } from "@/types";

interface CollectionSummaryProps {
  collection: CollectionSummary;
}

export function CollectionCard({ collection }: CollectionSummaryProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="bg-muted bg-card group-hover:border-primary/30 relative aspect-[3/2] w-full overflow-hidden rounded-xl border shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
        {collection.imageUrl && (
          <Image
            src={collection.imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <h3 className="line-clamp-2 text-center text-sm font-semibold text-white drop-shadow">
            {collection.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
