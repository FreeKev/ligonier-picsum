import {
  Link,
  useLocation,
  useNavigate,
  useViewTransitionState,
} from "react-router";
import type { PicsumImage } from "~/routes/gallery";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AuthorFeature } from "../AuthorFeature";

interface ImageCardProps {
  image: PicsumImage;
  index?: number;
  isDetailPage?: boolean;
  showInitialAnimation?: boolean;
}

export function ImageCard({
  image,
  index = 0,
  isDetailPage = false,
  showInitialAnimation = false,
}: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const previewRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const to = `/images/${image.id}`;
  const isTransitioning = useViewTransitionState(to);
  const thumbUrl = `https://picsum.photos/id/${image.id}/60/40?blur=6`;
  const previewImageUrl = `https://picsum.photos/id/${image.id}/600/400`;
  const detailImageUrl = `https://picsum.photos/id/${image.id}/1200/800`;

  function preloadDetailImage() {
    const img = new Image();
    img.src = detailImageUrl;

    if (img.decode) {
      img.decode().catch(() => {});
    }
  }

  useEffect(() => {
    if (previewRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      {isDetailPage ? (
        <div className="flex flex-col relative">
          {Boolean(from) && (
            <button
              className="px-4 py-2 text-sm flex cursor-pointer"
              style={{ viewTransitionName: "none" }}
              type="button"
              onClick={() => navigate(-1)}
            >
              ← Back to gallery
            </button>
          )}
          <motion.article className="shadow overflow-hidden rounded-lg">
            <img
              src={detailImageUrl}
              alt={`Photo by ${image.author}`}
              width={image.width}
              height={image.height}
              className="block w-full h-auto"
              style={{
                viewTransitionName: isTransitioning
                  ? `image-${image.id}`
                  : "none",
              }}
            />
          </motion.article>
          <AuthorFeature authorName={image.author} />
        </div>
      ) : (
        <motion.article
          initial={showInitialAnimation ? { y: 100, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative aspect-3/2 hover:scale-105 transition-transform duration-150 ease-in-out overflow-hidden rounded-lg"
        >
          <Link
            to={`/images/${image.id}`}
            state={{ from: "gallery" }}
            viewTransition
            prefetch="intent"
            onMouseEnter={preloadDetailImage}
            onFocus={preloadDetailImage}
            className="block h-full w-full"
          >
            <img
              src={thumbUrl}
              width={image.width}
              height={image.height}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover scale-105 blur-sm transition-opacity duration-300 ${
                isLoaded ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              ref={previewRef}
              src={previewImageUrl}
              alt={`Photo by ${image.author}`}
              width={image.width}
              height={image.height}
              onLoad={() => setIsLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                viewTransitionName: isTransitioning
                  ? `image-${image.id}`
                  : "none",
              }}
            />
          </Link>
        </motion.article>
      )}
    </>
  );
}
