import { Calendar, Target, TrendingUp } from "lucide-react";

export default function StatSection() {
  const mockStats = [
    { label: "Total Workouts", value: "5", icon: Calendar },
    { label: "Total XP", value: "420", icon: TrendingUp },
    { label: "Current Streak", value: "7 days", icon: Target },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-15">
      {mockStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-card border rounded-2xl shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
