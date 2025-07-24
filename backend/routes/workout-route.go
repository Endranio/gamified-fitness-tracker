package routes

import (
	"gamified-fitness-tracker/controllers"
	middleware "gamified-fitness-tracker/middlewares"

	"github.com/gofiber/fiber/v2"
)

func WorkoutRoute(app fiber.Router){
	workoutController := controllers.WorkoutController{}

	workout :=app.Group("/workout",middleware.JWTMiddleware())
	workout.Post("/",workoutController.PostWorkout)
	workout.Get("/",workoutController.GetWorkouts)
	workout.Delete("/:id",workoutController.DeleteWorkout)
	workout.Put("/:id",workoutController.UpdateWorkout)
}