"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkoutSchemaDTO } from "@/schema/workout-schema";
import { ReactNode, useEffect } from "react";
import UseEditWorkout from "./edit-workout";
import Spinner from "@/components/ui/spiner";
import { Zap } from "lucide-react";

interface CreateProjectProps {
  trigger: ReactNode;
  workout: WorkoutSchemaDTO;
}

export function ModalEdit({ trigger, workout }: CreateProjectProps) {
  const {
    closeRef,
    errors,
    isPending,
    register,
    setValue,
    watch,
    handleSubmit,
    onSubmit,
  } = UseEditWorkout({ workout });

  const durationValue = watch("duration");

  const caloriesBurned = durationValue * 5;

  useEffect(() => {
    setValue("calories_burned", caloriesBurned);
  }, [caloriesBurned, setValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Workout</DialogTitle>
            <div className="flex items-center gap-1 text-white">
              <Zap className="w-8 h-8" />
              <span className="text-4xl font-bold">
                {caloriesBurned || "Calories Burned"}
              </span>
            </div>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
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
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              {isPending ? <Spinner /> : "Save"}
            </Button>
            <DialogClose asChild>
              <Button ref={closeRef} hidden />
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
