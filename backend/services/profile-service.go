package services

import (
	"gamified-fitness-tracker/config"
	"gamified-fitness-tracker/models"
)

type ProfileService struct {}

func (s *ProfileService) GetProfile(userID uint) (int, int, int, error) {
	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		return 0, 0, 0, err
	}

	xp := user.XP
	level := calculateLevel(xp)
	progress := calculateProgress(xp, level)

	return xp, level, progress, nil
}


func calculateLevel(xp int) int {
	level := 1
	threshold := 500

	for xp >= threshold {
		level++
		threshold = nextThreshold(level)
	}
	return level
}

func nextThreshold(level int) int {
	if level == 1 {
		return 500
	}
	return (level - 1) * 1000
}

func calculateProgress(xp, level int) int {
	if level == 1 {
		return xp * 100 / 500
	}

	currLevelXP := nextThreshold(level - 1)
	nextLevelXP := nextThreshold(level)

	progress := (xp - currLevelXP) * 100 / (nextLevelXP - currLevelXP)
	if progress > 100 {
		return 100
	}
	return progress
}
