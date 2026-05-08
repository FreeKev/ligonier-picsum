import { GalleryShell, ImageCard, ImageGrid } from "~/components";
import type { Route } from "./+types/gallery";
import { useEffect } from "react";
import { useUiState } from "~/context/ui-state";

export interface PicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Picsum Gallery" },
    { name: "description", content: "Welcome to Ligonier's Picsum Gallery!" },
  ];
}

export async function loader() {
  const response = await fetch("https://picsum.photos/v2/list?page=1&limit=24");

  if (!response.ok) {
    throw new Response("Failed to load images", { status: response.status });
  }

  const images: PicsumImage[] = await response.json();
  return { images };
}

export default function Gallery({ loaderData }: Route.ComponentProps) {
  const { images } = loaderData;
  const { hasSeenGallery, markSeenGallery } = useUiState();
  const showInitialAnimation = !hasSeenGallery;

  useEffect(() => {
    if (!hasSeenGallery) {
      markSeenGallery();
    }
  }, [hasSeenGallery, markSeenGallery]);

  return (
    <GalleryShell>
      {images && (
        <ImageGrid>
          {images.map((image, index) => {
            return (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                showInitialAnimation={showInitialAnimation}
              />
            );
          })}
        </ImageGrid>
      )}
    </GalleryShell>
  );
}
