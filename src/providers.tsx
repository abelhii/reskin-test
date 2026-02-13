import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { queryClient } from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      </QueryClientProvider>
    </>
  );
}
