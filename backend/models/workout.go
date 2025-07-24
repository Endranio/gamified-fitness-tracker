package models

import "time"

type Workout struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	UserID         uint      `json:"user_id"`
	ExerciseName   string    `gorm:"type:varchar(100)" json:"exercise_name"`
	Duration       int       `json:"duration"`         
	CaloriesBurned int       `json:"calories_burned"`
	Date           time.Time `json:"date"`
}


type WorkoutDTO struct {
		
		ExerciseName   string `json:"exercise_name"`
		Duration  	   int 	  `json:"duration"`
		CaloriesBurned int 	  `json:"calories_burned"`
		Date 		   string `json:"date"`
}
