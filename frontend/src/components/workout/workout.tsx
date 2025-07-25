"use client";

import { WorkoutSchemaDTO } from "@/schema/workout-schema";
import GetWorkout from "../dashboard/hooks/get-workout";
import { WorkoutCard } from "../dashboard/workout-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function WorkoutPage() {
  const { data } = GetWorkout();

  return (
    <div className="mx-5">
      
        <Button variant={"ghost"} size={"lg"} className="">
          <Link href="/dashboard" className="flex items-center gap-3">
            <ArrowLeft />
            <span>Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-center font-bold text-5xl ">Workout History</h1>
          <p className="text-center text-2xl">Track your fitness journey</p>
        </div>
        
      
      <div className="border bg-gray-800 mt-15 p-5 rounded-2xl">
        <h1 className="font-bold text-4xl">All Workouts</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-15 mt-10">
          {data?.map((workout: WorkoutSchemaDTO) => (
            <div key={workout.id}>
              <WorkoutCard {...workout} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
