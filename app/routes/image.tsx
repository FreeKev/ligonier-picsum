import { GalleryShell, ImageCard, ImageGrid } from "~/components";
import type { Route } from "./+types/image";
import type { PicsumImage } from "./gallery";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Picsum Gallery Image" },
    { name: "description", content: "Featured Image from the Picsum Gallery!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const imageId = params.imageId;
  const response = await fetch(`https://picsum.photos/id/${imageId}/info`);

  if (!response.ok) {
    throw new Response("Failed to load image", { status: response.status });
  }

  const image: PicsumImage = await response.json();
  return { image };
}

export default function Image({ loaderData }: Route.ComponentProps) {
  const { image } = loaderData;

  return (
    <GalleryShell>
      {image?.id && (
        <ImageGrid>
          <ImageCard key={image.id} image={image} isDetailPage={true} />
        </ImageGrid>
      )}
    </GalleryShell>
  );
}
