package main

import (
	"gamified-fitness-tracker/config"

	"gamified-fitness-tracker/routes"
	"log"

	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)	




func main(){
	godotenv.Load()
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))


	app.Use(logger.New())
	
	routes.Routes(app)
	
	port := os.Getenv("PORT")
	config.CreateDB()
	log.Println("server running",port)
	log.Fatal(app.Listen(":" + port))
}