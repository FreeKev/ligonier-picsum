import { Children } from "react";

interface ImageGridProps {
  children?: React.ReactNode;
}

export function ImageGrid({ children }: ImageGridProps) {
  const count = Children.count(children);

  return (
    <>
      {count > 1 ? (
        <div className="container mx-auto px-4 py-8 pt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {children}
          </div>
        </div>
      ) : (
        <div className="min-w-fit flex justify-center center">{children}</div>
      )}
    </>
  );
}
