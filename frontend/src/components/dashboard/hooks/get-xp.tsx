"use client";

import { Xp } from "@/dto/dto";
import { api } from "@/lib/api";

import { useQuery } from "@tanstack/react-query";

export default function GetXp() {
  const { data, isPending } = useQuery<Xp>({
    queryKey: ["xp"],
    queryFn: async () => {
      const res = await api.get(`api/profile`);

      return res.data;
    },
  });

  return {
    data,
    isPending,
  };
}
