package services

import (
	"errors"
	"gamified-fitness-tracker/config"
	"gamified-fitness-tracker/models"
)

type AuthService struct{}

func (s *AuthService) Register(Email,Name,Password string) (*models.User,error){
 
User := models.User{
	Name:Name,
	Email:Email,
	PasswordHash:Password,

}

if err := config.DB.Create(&User).Error;err !=nil{
	return nil,errors.New("Register failed")
}
return &User,nil
}

func (s *AuthService) Login(Identity string) (*models.User, error) {
	var user models.User
	if err := config.DB.Where("Name = ? OR Email=?", Identity,Identity).First(&user).Error; err != nil {
		return nil, errors.New("Username not found")
	}

	return &user, nil
}
