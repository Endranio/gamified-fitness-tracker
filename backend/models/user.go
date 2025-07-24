package models




type User struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	Name         string         `gorm:"type:varchar(100)" json:"name"`
	Email        string         `gorm:"type:varchar(100);unique" json:"email"`
	PasswordHash string         `gorm:"type:text" json:"-"`
	XP           int            `gorm:"default:0" json:"xp"`
	Workouts     []Workout      `gorm:"foreignKey:UserID" json:"workouts,omitempty"`
}

type RegisterDTO struct {
	Name string `json:"name"`
	Password string `json:"password"`
	Email string `json:"email"`
}

type LoginDTO struct {
	Identity string `json:"identity"`
	Password string `json:"password"`
	
}
