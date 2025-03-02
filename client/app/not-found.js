"use client"; // ✅ Ensure it's a Client Component
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}> {/* ✅ Wrap in Suspense */}
      <NotFoundContent />
    </Suspense>
  );
}

function NotFoundContent() {
  const searchParams = useSearchParams(); // ✅ Now inside Suspense
  return <div>Page not found. Query: {searchParams.get("query")}</div>;
}
