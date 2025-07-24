package controllers

import (
	"gamified-fitness-tracker/models"
	"gamified-fitness-tracker/services"
	"gamified-fitness-tracker/utils"

	"github.com/gofiber/fiber/v2"
)


type AuthController struct{
	AuthService services.AuthService
}


func (c*AuthController)Register(ctx*fiber.Ctx)error{
	var req models.RegisterDTO

	if err := ctx.BodyParser(&req);err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message":"Invalid",
		})
	}

	hashPassword,err := utils.HashPassword(req.Password)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Gagal melakukan hash pada password",
		})
	}


	user,err := c.AuthService.Register(req.Email,req.Name,hashPassword)
	if err != nil {
		
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Registrasi berhasil",
		"user_id": user.ID,
	})
}

func (c *AuthController) Login(ctx *fiber.Ctx) error {
	var req models.LoginDTO
	
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid",
		})
	}
	
	user, err := c.AuthService.Login(req.Identity)
	if err != nil {
		
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	
	
		if !utils.CheckPasswordHash(req.Password, user.PasswordHash) {
			return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Password wrong",
			})
		}

		token, err := utils.GenerateJWT(user.ID,user.Name)
if err != nil {
	return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"message": "Failed to generate token",
	})
}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Login berhasil",
		"token": token,

	})
}

