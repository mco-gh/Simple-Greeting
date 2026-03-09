import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useHello() {
  return useQuery({
    queryKey: [api.hello.get.path],
    queryFn: async () => {
      const res = await fetch(api.hello.get.path, { credentials: "include" });
      if (!res.ok) {
        throw new Error("Failed to fetch hello message");
      }
      const data = await res.json();
      return api.hello.get.responses[200].parse(data);
    },
  });
}
