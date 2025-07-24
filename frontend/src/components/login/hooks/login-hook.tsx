"use client"

import { useAuthStore } from "@/app/storage/auth";
import { api } from "@/lib/api";
import { loginSchema, LoginSchemaDTO } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {jwtDecode} from "jwt-decode";
interface JwtPayload {
  userId: number;
  name:string

}
export default function UseLogin(){

    
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
const { setUser } = useAuthStore();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginSchemaDTO) => {
      const res = await api.post("/api/auth/login", data);
       const token = res.data.token;
      Cookies.set("token", token, {
          expires: 1,
      });
        const decoded = jwtDecode<JwtPayload>(token)
      
      setUser({
        id: decoded.userId,
        name:decoded.name
        
      });
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
        router.push("/dashboard");
    },
  });
  
  const onSubmit = handleSubmit(async (data: LoginSchemaDTO) => {
      await mutateAsync(data);
    });

    return{
        register,
        errors,
        isPending,
        onSubmit
    }
}