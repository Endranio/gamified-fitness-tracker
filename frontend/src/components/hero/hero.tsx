import { Dumbbell, Star, Target, TrendingUp, Trophy, Zap } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  const features = [
    {
      icon: Zap,
      title: "Earn XP",
      description: "Get rewarded for every workout with experience points",
    },
    {
      icon: Trophy,
      title: "Level Up",
      description: "Progress through levels as you build your fitness routine",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your fitness journey with detailed workout logs",
    },
    {
      icon: Target,
      title: "Stay Motivated",
      description: "Gamified fitness makes working out fun and engaging",
    },
  ];

  return (
    <div>
      <div className="container mx-auto px-4 py-16 text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-purple-gradient rounded-full shadow-glow animate-pulse-xp">
              <Dumbbell className="w-20 h-20 text-white" />
            </div>
          </div>
          <h1 className="text-8xl font-bold">
            Fit<span className="text-purple-600">XP</span>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            Level up your fitness journey! Track workouts, earn XP, and become
            the ultimate fitness warrior.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <Button
            asChild
            size="lg"
            className="flex-1 h-12 text-lg bg-green-400"
          >
            <Link href="/register">
              <Star className="w-5 h-5 mr-2" />
              Start Your Journey
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="flex-1 h-12 text-lg"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>

      <div className="mt-15">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold">Why Choose FitXP?</h1>
          <p className="text-2xl">
            Transform your workout routine into an engaging game where every rep
            counts towards your progress.
          </p>
        </div>
        <div className="flex gap-10 mx-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                className="text-center flex flex-col items-center gap-5 mt-15 border shadow-xl rounded-xl p-5 dark:bg-gray-800 hover:shadow-[0_0_20px_hsl(263_100%_68%_/_0.3)] transition-shadow duration-300"
                key={index}
              >
                <div className=" p-3 bg-purple-gradient rounded-full w-12">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold">{feature.title}</h1>
                <p className="text-xl">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pb-15 pt-15 mt-15 flex flex-col gap-10 items-center bg-purple-gradient">
        <h1 className="text-5xl font-bold bg:dark text-amber-50">
          Ready To Level Up?
        </h1>
        <p className="text-2xl bg:dark text-amber-50">
          Join thousands of fitness enthusiasts who are already earning XP and
          reaching their goals.
        </p>
        <Button className="text-lg px-8 py-8 w-[20%] bg-amber-500">
          <Trophy size={28} color="#ffffff" />
          <Link
            href="/register"
            className="flex items-center text-2xl bg:dark text-amber-50"
          >
            Begin Your Quest
          </Link>
        </Button>
      </div>
    </div>
  );
}
