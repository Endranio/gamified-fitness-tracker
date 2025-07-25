"use client";

import { api } from "@/lib/api";
import { WorkoutSchemaDTO } from "@/schema/workout-schema";

import { useQuery } from "@tanstack/react-query";

export default function GetWorkout() {
  const { data, isPending } = useQuery<WorkoutSchemaDTO[]>({
    queryKey: ["get-workout"],

    queryFn: async () => {
      const res = await api.get(`api/workout`);

      return res.data;
    },
  });

  return {
    data,
    isPending,
  };
}
