import { SignupForm } from "@/app/(auth)/signup/components/SignupForm";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawNext = (await searchParams).next;
  const nextUrl = Array.isArray(rawNext) ? rawNext[0] : rawNext ?? "/";
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm next={nextUrl} />
      </div>
    </div>
  );
}
