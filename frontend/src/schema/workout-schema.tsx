import { z } from "zod";

export const workoutSchema = z.object({
  id:z.number().optional(),
  exercise_name: z.string(),
  duration: z.number(),
  calories_burned: z.number(),
  date:z.string()
});
 
export type WorkoutSchemaDTO = z.infer<typeof workoutSchema>;

