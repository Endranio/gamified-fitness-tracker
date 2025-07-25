import { Badge } from "@/components/ui/badge";
import { WorkoutSchemaDTO } from "@/schema/workout-schema";
import { Calendar, Clock, Settings, Trash2, Zap } from "lucide-react";
import AlertDelete from "../workout/hooks/delete-workout";
import { ModalEdit } from "../workout/hooks/modal-edit";

export const WorkoutCard = (workout: WorkoutSchemaDTO) => {
  if (!workout) return;

  return (
    <div className="bg-card shadow-card border p-5 rounded-2xl">
      <div className=" pb-3">
        <div className=" flex items-center justify-between">
          <div className="text-2xl mb-3 font-semibold">
            {workout.exercise_name}
          </div>
          <div className="">
            <Badge variant="secondary" className="text-xl">
              <Zap className="w-8 h-8 mr-1" />
              {workout.calories_burned} cal
            </Badge>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <p className="text-lg">
                {new Date(workout.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <p className="text-lg">{workout.duration}min</p>
            </div>
          </div>
          <div className="flex gap-3">
            <ModalEdit workout={workout} trigger={<Settings />}/>
            
            <AlertDelete
              url="workout"
              trigger={<Trash2 />}
              id={workout.id || 0}
              invalidate="get-workout"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
