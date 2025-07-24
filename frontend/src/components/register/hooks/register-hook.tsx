"use client"

import { api } from "@/lib/api";
import { registerSchema, RegisterSchemaDTO } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


export default function UseRegister(){

    
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: RegisterSchemaDTO) => {
      const res = await api.post("/api/auth/register", data);

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
        router.push("/login");
    },
  });
  
  const onSubmit = handleSubmit(async (data: RegisterSchemaDTO) => {
      await mutateAsync(data);
    });

    return{
        register,
        errors,
        isPending,
        onSubmit
    }
}