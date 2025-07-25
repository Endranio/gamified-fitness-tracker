import { api } from "@/lib/api";
import { workoutSchema, WorkoutSchemaDTO } from "@/schema/workout-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UseEditWorkout({ workout }: { workout: WorkoutSchemaDTO }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm<WorkoutSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(workoutSchema),
  });



  useEffect(() => {
    if (workout) {
    const formattedDate = new Date(workout.date).toISOString().split("T")[0];
    reset({
      exercise_name: workout.exercise_name,
      duration: workout.duration,
      date: formattedDate, 
    });
  }
  }, [workout, reset]);

  const queryClient = useQueryClient();
 

  const { mutateAsync, isPending } = useMutation<
    any,
    Error,
    WorkoutSchemaDTO
  >({
    mutationKey: ["edit-workout"],
    mutationFn: async (data: WorkoutSchemaDTO) => {
      const response = await api.put(`api/workout/${workout.id}`, data);
      return response.data;
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("something wrong");
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["task"],
      });
      toast.success(data.message);
      closeRef.current?.click();
    },
  });

  const onSubmit = async (data: WorkoutSchemaDTO) => {
    await mutateAsync(data);
  };

  return {
    register,
    onSubmit,
    errors,
    handleSubmit,
    isPending,
    closeRef,
    setValue,
    watch
  };
}
