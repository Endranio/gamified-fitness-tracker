package controllers

import (
	
	"fmt"
	
	"gamified-fitness-tracker/models"
	"gamified-fitness-tracker/services"
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type WorkoutController struct{
	WorkoutService services.WorkoutService
}

func (c*WorkoutController)PostWorkout(ctx*fiber.Ctx)error{
	var req models.WorkoutDTO

	if err := ctx.BodyParser(&req);err != nil {
		log.Println("BodyParser error:", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":"Invalid",
		})
	}

	userID := ctx.Locals("userId").(uint)
	fmt.Println("userId from token:", userID)


	_,err := c.WorkoutService.PostWorkout(req,userID)
	if err != nil {
		
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Workout added",
		
	})
}

func (c *WorkoutController) GetWorkouts(ctx *fiber.Ctx)error{
	userID := ctx.Locals("userId").(uint)
	workouts,err := c.WorkoutService.GetWorkout(userID)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to fetch workouts",
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(workouts)
}

func (c *WorkoutController) DeleteWorkout(ctx*fiber.Ctx)error{
	workoutIdParam := ctx.Params("id")

	workoutId,err := strconv.Atoi(workoutIdParam)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":"Invalid workout Id",
		})
	}

	

	err = c.WorkoutService.DeleteWorkout(uint(workoutId))
	if err != nil{
		return ctx.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"message":err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":"Workout deleted",
	})
}

func (c *WorkoutController) UpdateWorkout(ctx *fiber.Ctx)error{
	workoutIdParam := ctx.Params("id")
	workoutIdInt,err := strconv.Atoi(workoutIdParam)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid workout Id",
		})
	}

	workoutId := uint(workoutIdInt)

	userId := ctx.Locals("userId").(uint)

	var req models.WorkoutDTO
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	 _, err = c.WorkoutService.UpdateWorkout(workoutId, userId, req)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":"Update success",
	})
	

}