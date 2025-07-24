"use client"
import { Trophy, Zap } from "lucide-react";
import { Progress } from "../ui/progress";
import GetXp from "./hooks/get-xp";

export default function XpSection() {
    const {data,isPending} = GetXp()

    if (isPending)return
    
if (!data)return
    

  return (
    <div className="bg-purple-gradient p-10 rounded-2xl mt-15">
      <div>
        <div className="flex justify-between ">
          <div className="flex gap-4">
            <div className="p-5 bg-amber-400 rounded-full">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-4xl text-white"> Level {data?.level}</h1>
              <p className="text-xl text-white"> level warior</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-white">
              <Zap className="w-8 h-8" />
              <span className="text-4xl font-bold">{data?.xp}</span>
            </div>
            <p className="text-white/80 text-xl">Total XP</p>
          </div>
        </div>
        <div className="mt-10">
            <div className="flex justify-between mb-5">
                <p className="text-xl text-white">Level to {data?.level+ 1}</p>
                <p className="text-xl text-white">{data?.xp % 1000}/1000 XP</p>
            </div>
            <Progress value={data?.progress}  className="h-3 [&>*]:bg-white"/>
        </div>
      </div>
    </div>
  );
}
