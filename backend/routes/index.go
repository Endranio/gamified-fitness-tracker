package routes

import "github.com/gofiber/fiber/v2"

func Routes(app *fiber.App){
	api := app.Group("/api")

	AuthRoute(api)
	WorkoutRoute(api)
	ProfileRoute(api)
}