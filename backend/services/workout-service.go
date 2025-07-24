package services

import (
	"errors"
	"gamified-fitness-tracker/config"
	"gamified-fitness-tracker/models"
	"time"

	"gorm.io/gorm"
)

type WorkoutService struct{}

func(s *WorkoutService) PostWorkout(dto models.WorkoutDTO,userID uint )(*models.Workout,error){
	
	parsedDate, err := time.Parse("2006-01-02", dto.Date)
	if err != nil {
		return nil, err
	}

	Workout := models.Workout{
	UserID:userID ,
	ExerciseName:dto.ExerciseName,
	Duration:dto.Duration,
	CaloriesBurned:dto.CaloriesBurned,
	Date:parsedDate,

}

xpToAdd := Workout.Duration * 10
	if err := config.DB.Model(&models.User{}).
		Where("id = ?", userID).
		Update("xp", gorm.Expr("xp + ?", xpToAdd)).Error; err != nil {
		return nil, errors.New("Failed to update user XP")
	}
if err := config.DB.Create(&Workout).Error;err !=nil{
	return nil,errors.New("Failed create workout")
}
return &Workout,nil
}

func(s*WorkoutService) GetWorkout(userID uint) ([]models.Workout,error){
	var workouts []models.Workout
	if err := config.DB.Where("user_id = ?",userID).Find(&workouts).Error;err != nil {
		return nil,err
	}
	return workouts,nil
}

func(s*WorkoutService) DeleteWorkout(workoutId uint)error{
	var workout models.Workout

	err := config.DB.First(&workout,workoutId).Error
	if err != nil {
		return errors.New("Workout not found")
	}

	if err := config.DB.Delete(&workout).Error; err != nil{
		return errors.New("Failed to delete workout")

	}
	return nil
}

func(s *WorkoutService) UpdateWorkout(workoutId,userId uint,dto models.WorkoutDTO)(*models.Workout,error){
	var workout models.Workout

	if err := config.DB.First(&workout,"id=? AND user_id = ?",workoutId,userId).Error;err != nil {
		return nil,errors.New("Workout not found")
	}

	parsedDate,err := time.Parse("2006-01-02",dto.Date)
	if err != nil {
		return nil,err
	}

	workout.ExerciseName = dto.ExerciseName
	workout.Duration = dto.Duration
	workout.CaloriesBurned = dto.CaloriesBurned
	workout.Date = parsedDate
	

	if err := config.DB.Save(&workout).Error;err !=nil {
		return nil,errors.New("Update workout failed")
	}

	return & workout,nil

}
