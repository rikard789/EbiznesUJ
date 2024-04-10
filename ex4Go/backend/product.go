package main

import (
    // "github.com/jinzhu/gorm"
    // _ "github.com/jinzhu/gorm/dialects/sqlite"
    "gorm.io/gorm"
)

type Product struct {
    gorm.Model
    Name  string         `json:"name"`
    Price float64        `json:"price"`
	CategoryID uint      `json:"category_id"`
    Category   Category  `json:"category" gorm:"foreignKey:id"` 
}