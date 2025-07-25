"use client";

import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PostWorkout from "./hooks/post-workout";
import Spinner from "../ui/spiner";
import { useEffect } from "react";

export default function CreateWorkout() {
  const { errors, isPending, onSubmit, register, watch, setValue } =
    PostWorkout();
 

  const durationValue = watch("duration");

  const caloriesBurned = durationValue * 5;

  useEffect(() => {
    setValue("calories_burned", caloriesBurned);
  }, [caloriesBurned, setValue]);

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center p-4">
      <div className="flex items-center gap-1 text-white">
        <Zap className="w-8 h-8" />
        <span className="text-4xl font-bold">{caloriesBurned || "Calories Burned"}</span>
      </div>
      <div className="shadow-2xl  dark:bg-gray-800 p-10 rounded-xl space-y-6">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="font-bold text-3xl">Log New Workout</h1>
          <p className="text-xl">Track your exercises</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="exercise_name" className="text-lg">
              Exercise Name
            </Label>
            <div className="relative">
              <Input
                id="exercise_name"
                type="text"
                placeholder="Push up"
                className=" h-12 !text-lg"
                {...register("exercise_name")}
              />
            </div>
            <p className="text-red-500 text-sm">
              {errors.exercise_name?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-lg">
              Duration
            </Label>
            <div className="relative">
              <Input
                id="duration"
                type="number"
                placeholder="Duration in minute"
                className=" h-12 !text-lg"
                {...register("duration", { valueAsNumber: true })}
              />
            </div>
            <p className="text-red-500 text-sm">{errors.duration?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-lg">
              Date
            </Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                placeholder="Create a password"
                className=" h-12 !text-lg"
                {...register("date")}
              />
            </div>
            <p className="text-red-500 text-sm">{errors.date?.message}</p>
          </div>
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? <Spinner /> : "Add Workout"}
          </Button>
        </form>
      </div>
    </div>
  );
}
