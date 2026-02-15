import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { queryClient } from "./lib/queryClient";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const debugging = window.location.hash === "#debug" || import.meta.env.DEV;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        {debugging && <ReactQueryDevtools />}
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
