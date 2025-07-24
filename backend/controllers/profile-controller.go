package controllers

import (
	"gamified-fitness-tracker/services"

	"github.com/gofiber/fiber/v2"
)

type ProfileController struct {
	ProfileService services.ProfileService
}


func (c *ProfileController) GetProfile(ctx *fiber.Ctx) error {
	userId := ctx.Locals("userId").(uint)

	xp, level, progress, err := c.ProfileService.GetProfile(userId)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get profile",
		})
	}

	return ctx.JSON(fiber.Map{
		"xp":      xp,
		"level":   level,
		"progress": progress,
	})
}
