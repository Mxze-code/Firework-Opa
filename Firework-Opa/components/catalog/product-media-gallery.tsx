"use client";

import { useMemo, useState } from "react";
import { ProductImagePlaceholder } from "./product-image-placeholder";

type ProductMediaGalleryProps = {
  image: string | null;
  imageAlt: string;
  videoUrl?: string;
};

type MediaItem =
  | { type: "image"; src: string | null; alt: string }
  | { type: "video"; embedUrl: string };

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");

    const parseYouTubeStartSeconds = (raw: string | null): number | null => {
      if (!raw) return null;
      const v = raw.trim().toLowerCase();
      if (!v) return null;

      // Accept plain seconds: "90"
      if (/^\d+$/.test(v)) return Number(v);

      // Accept "1s", "2m", "1h2m3s", "1m30s"
      const re =
        /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i;
      const m = v.match(re);
      if (!m) return null;
      const h = m[1] ? Number(m[1]) : 0;
      const mnt = m[2] ? Number(m[2]) : 0;
      const s = m[3] ? Number(m[3]) : 0;
      const total = h * 3600 + mnt * 60 + s;
      return Number.isFinite(total) ? total : null;
    };

    const getStartFromParams = (): number | null => {
      // YouTube commonly uses `t=` or `start=`.
      const t = parsed.searchParams.get("t");
      const start = parsed.searchParams.get("start");
      return parseYouTubeStartSeconds(start ?? t);
    };

    const startSeconds = getStartFromParams();
    const startParam = startSeconds != null ? `?start=${startSeconds}` : "";

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}${startParam}` : null;
    }
    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}${startParam}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

export function ProductMediaGallery({
  image,
  imageAlt,
  videoUrl,
}: ProductMediaGalleryProps) {
  const media = useMemo<MediaItem[]>(() => {
    const items: MediaItem[] = [{ type: "image", src: image, alt: imageAlt }];
    if (videoUrl) {
      const embedUrl = getYouTubeEmbedUrl(videoUrl);
      if (embedUrl) items.push({ type: "video", embedUrl });
    }
    return items;
  }, [image, imageAlt, videoUrl]);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex];
  const hasMultipleMedia = media.length > 1;

  const showPrevious = () => setActiveIndex((prev) => (prev - 1 + media.length) % media.length);
  const showNext = () => setActiveIndex((prev) => (prev + 1) % media.length);

  return (
    <div className="rounded border border-[#2d3a4d] bg-[#1a2332] p-4 md:p-6">
      <div className="relative h-[22rem] w-full rounded border border-[#dbe3ec] bg-[#f8fafc] p-5 md:h-[28rem] md:p-8">
        {active.type === "image" ? (
          active.src ? (
            <img
              src={active.src}
              alt={active.alt}
              className="h-full w-full object-contain object-center"
            />
          ) : (
            <ProductImagePlaceholder
              className="h-full w-full rounded bg-[#f8fafc] text-[#94a3b8]"
              alt={active.alt}
            />
          )
        ) : (
          <iframe
            className="h-full w-full rounded"
            src={active.embedUrl}
            title={`Produktvideo ${imageAlt}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {hasMultipleMedia && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 border border-[#2d3a4d] bg-[#0f1419]/85 px-3 py-2 text-sm text-[#f0f4f8] transition hover:border-[#c9a227]/60 hover:text-[#c9a227]"
              aria-label="Vorheriges Medium"
            >
              ←
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 border border-[#2d3a4d] bg-[#0f1419]/85 px-3 py-2 text-sm text-[#f0f4f8] transition hover:border-[#c9a227]/60 hover:text-[#c9a227]"
              aria-label="Naechstes Medium"
            >
              →
            </button>
          </>
        )}
      </div>

      {hasMultipleMedia && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {media.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${item.type}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full border transition ${
                  isActive
                    ? "border-[#c9a227] bg-[#c9a227]"
                    : "border-[#64748b] bg-transparent hover:border-[#94a3b8]"
                }`}
                aria-label={item.type === "image" ? "Zum Produktbild wechseln" : "Zum Produktvideo wechseln"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
