package config

import (
	"gamified-fitness-tracker/models"
	"log"
	"os"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)



var DB *gorm.DB

func CreateDB() {
	dsn := os.Getenv("DB_URL") 
	db, err := gorm.Open(mysql.Open(dsn))
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	DB = db
	log.Println("✅ Connected to MySQL with GORM")

	db.AutoMigrate(&models.User{},&models.Workout{})
}
