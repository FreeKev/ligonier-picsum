import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
  index("routes/gallery.tsx"),
  route("images/:imageId", "routes/image.tsx"),
] satisfies RouteConfig;
