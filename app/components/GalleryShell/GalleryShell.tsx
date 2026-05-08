import { Link } from "react-router";
import Logo from "./ligonier-logo";

interface GalleryShellProps {
  children?: React.ReactNode;
}

export function GalleryShell({ children }: GalleryShellProps) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header
        className="w-full p-8 sm:px-6 lg:px-8"
        style={{ viewTransitionName: "none" }}
      >
        <Link to="/" viewTransition className="flex items-center gap-3">
          <Logo />
          <div>
            <h1
              className="font-serif lg:text-6xl text-5xl font-semibold tracking-tight"
              style={{ viewTransitionName: "none" }}
            >
              Picsum Gallery
            </h1>
            <p className="uppercase tracking-widest">A minimalist gallery</p>
          </div>
        </Link>
      </header>
      <main className="px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
