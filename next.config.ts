import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statically typed links. With 12 routes and a nav/footer link graph, this is
  // what makes "no dead links" a compile-time guarantee rather than a manual
  // check — a <Link> to a route that doesn't exist fails the build.
  typedRoutes: true,
};

export default nextConfig;
