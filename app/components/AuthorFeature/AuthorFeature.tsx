interface AuthorFeatureProps {
  authorName?: string;
}

export function AuthorFeature({ authorName }: AuthorFeatureProps) {
  if (authorName) {
    return (
      <section
        className="py-12 sm:py-16"
        style={{ viewTransitionName: "none" }}
      >
        <p className="text-sm uppercase tracking-wider">Photographer</p>
        <h2 className="font-serif text-5xl font-semibold tracking-tight">
          {authorName}
        </h2>
      </section>
    );
  }
}
