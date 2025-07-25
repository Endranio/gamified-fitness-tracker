"use client"

import { api } from "@/lib/api";
import { workoutSchema, WorkoutSchemaDTO } from "@/schema/workout-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


export default function PostWorkout(){

    
    const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<WorkoutSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(workoutSchema),
  });

  const router = useRouter();
const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["post-workout"],
    mutationFn: async (data: WorkoutSchemaDTO) => {
      const res = await api.post("/api/workout", data);

     return res.data;
    },
    onError: (error) => {
        if (axios.isAxiosError(error)) {
        return toast.error(error.response?.data.message);
    }
    toast.error("something wrong");
    },
    onSuccess: async (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
            queryKey:['get-workout']
        })
        router.push("/dashboard");
    },
  });
  
  const onSubmit = handleSubmit(async (data: WorkoutSchemaDTO) => {
      await mutateAsync(data)
    });

    return{
        register,
        errors,
        isPending,
        onSubmit,
        watch,
        setValue
    }
}