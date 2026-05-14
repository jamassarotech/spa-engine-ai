"use client";

import Image from "next/image";
import { formatDate } from "@/lib/utils/formatDate";
import { formatYouTubeScore } from "@/lib/utils/formatScore";
import { trackSourceClick } from "@/lib/utils/analytics";
import type { YouTubeSourceProps } from "@/types/components";

// Extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function YouTubeSource({ source }: YouTubeSourceProps) {
  const videoId = getYouTubeVideoId(source.url);
  const thumbnailUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : "/placeholder-youtube.jpg";

  const handleClick = () => {
    trackSourceClick("youtube", source.url);
  };

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group block bg-white border border-border rounded-xl overflow-hidden hover:border-accent hover:shadow-card-hover transition-all"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100">
        <Image
          src={thumbnailUrl}
          alt={source.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* YouTube Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-medium text-primary text-sm mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {source.title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-xs text-secondary">
          <span>{source.author}</span>
          <span className="text-border">•</span>
          <span>{formatYouTubeScore(source.score)}</span>
          <span className="text-border">•</span>
          <span>{formatDate(source.publishedAt)}</span>
        </div>
      </div>
    </a>
  );
}
