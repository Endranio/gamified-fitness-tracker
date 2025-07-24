package routes

import (
	"gamified-fitness-tracker/controllers"

	"github.com/gofiber/fiber/v2"
)

func AuthRoute(app fiber.Router){
	authController := controllers.AuthController{}

	auth :=app.Group("/auth")
	auth.Post("/register",authController.Register)
	auth.Post("/login",authController.Login)
}