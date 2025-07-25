"use client";

import { useAuthStore } from "@/app/storage/auth";
import XpSection from "./xp-section";
import StatSection from "./stat-section";
import { Button } from "../ui/button";
import { WorkoutCard } from "./workout-card";
import GetWorkout from "./hooks/get-workout";
import { WorkoutSchemaDTO } from "@/schema/workout-schema";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data, isPending } = GetWorkout();
  if (!data) return;
  if (isPending) return;

  return (
    <div className="mx-5">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-5xl">Welcome Back {user.name}</h1>
        <p className="text-2xl">Ready to earn some XP today?</p>
      </div>

      <XpSection />

      <div className="flex mx-10 mt-15 justify-center gap-5">
        <Button className="w-70 h-15 text-xl"><Link href="/workout/create">+ Log Workout</Link></Button>
        <Button className="w-70 h-15 text-xl"><Link href="/workout">View All Workout</Link></Button>
      </div>
      <div>
        <h1 className="font-bold text-3xl mt-15">Recent Workout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-15 mt-10">
          {data.slice(0, 2).map((workout: WorkoutSchemaDTO) => (
            <div key={workout.id}>
              <WorkoutCard {...workout} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
