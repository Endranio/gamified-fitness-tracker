package routes

import (
	"gamified-fitness-tracker/controllers"
	middleware "gamified-fitness-tracker/middlewares"

	"github.com/gofiber/fiber/v2"
)

func ProfileRoute(app fiber.Router){
	profileController := controllers.ProfileController{}

	profile :=app.Group("/profile",middleware.JWTMiddleware())
	
	profile.Get("/",profileController.GetProfile)
	
}