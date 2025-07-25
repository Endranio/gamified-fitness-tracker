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
	progress := calculateProgress(xp)

	return xp, level, progress, nil
}


func calculateLevel(xp int) int {
    return (xp / 500) 
}




func calculateProgress(xp int) int {
    xpInCurrentLevel := xp % 500         
    progress := (xpInCurrentLevel * 100) / 500 

    if progress > 100 {
        return 100
    }
    return progress
}

