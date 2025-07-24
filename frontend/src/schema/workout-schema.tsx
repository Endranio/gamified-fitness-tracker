import { z } from "zod";

export const workoutSchema = z.object({
  id:z.number().optional(),
  exercise_name: z.string().email(),
  duration: z.string().min(6),
  calories_burned: z.string().min(4),
  date:z.string()
});
 
export type WorkoutSchemaDTO = z.infer<typeof workoutSchema>;

