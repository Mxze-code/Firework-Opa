/**
 * Native `<img>` für Dateien unter `public/` (Pfade aus `marcatisPhotos`).
 * `next/image` kann `src` in Edge-Cases (Static Export + basePath, Hydration) anders ausgeben;
 * hier bleibt die URL 1:1 wie im HTML-Export.
 */
/* eslint-disable @next/next/no-img-element -- bewusst kein next/image für öffentliche Asset-Strings */

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function PublicFillImage({ src, alt, className, sizes, priority }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        color: "transparent",
      }}
    />
  );
}
