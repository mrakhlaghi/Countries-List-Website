// import { useAuth, hasAuthParams } from "react-oidc-context";
import { Navigate, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./pages/NotFound.tsx";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout.tsx";
import CountriesPage from "./pages/CountriesPage.tsx";
import CountryPage from "./pages/CountryPage.tsx";
// import { useEffect } from "react";

function App() {
  const queryClient = new QueryClient();
  // const queryClient = new QueryClient({
  //   defaultOptions: { queries: { staleTime: Infinity } },
  // });

  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />

          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="countries" />} />
              <Route path="countries" element={<CountriesPage />} />
              <Route path="country" element={<CountryPage />} />
            </Route>
            <Route path="not-found" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
