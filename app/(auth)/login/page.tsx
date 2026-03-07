import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in – Medium",
  description: "Sign in to your Medium account.",
};
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string; redirect?: string }>;
}) {
  const params = await searchParams;
  const showRegistered = params.registered === "1";
  const rawRedirect = params.redirect ?? "/";
  const redirectTo =
    typeof rawRedirect === "string" && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/";

  return (
    // ...
    <LoginForm redirectTo={redirectTo} />
  );
}
