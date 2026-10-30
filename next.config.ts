import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statically typed links. With 12 routes and a nav/footer link graph, this is
  // what makes "no dead links" a compile-time guarantee rather than a manual
  // check — a <Link> to a route that doesn't exist fails the build.
  typedRoutes: true,

  // nodemailer (contact form transport) is not on Next's auto-opt-out list and
  // relies on Node built-ins. Requiring it natively rather than bundling it into
  // the Server Components graph avoids the transport being traced and rewritten.
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
