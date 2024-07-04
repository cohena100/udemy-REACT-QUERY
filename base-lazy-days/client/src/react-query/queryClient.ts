import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "@/components/app/toast";

function createTitle(errorMsg: string, actionType: "query" | "mutation") {
  return `could not ${actionType === "query" ? "fetch" : "update"} data: ${errorMsg ?? "error connecting to server"}`;
}

function errorHandler(title: string) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = "react-query-toast";

  if (!toast.isActive(id)) {
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      errorHandler(createTitle(error.message, "query"));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      errorHandler(createTitle(error.message, "mutation"));
    },
  }),
});
