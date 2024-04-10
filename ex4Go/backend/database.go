package main

import (
    "os"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

var db *gorm.DB = nil
var err error

func initDB() {

    if _, err := os.Stat("./test.db"); err == nil {
		os.Remove("./test.db")
	}

    db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }
    
    db.AutoMigrate(&Product{}, &Category{}, &User{}, &Carts{})

    category := Category{Name: "Electronics"}
    db.FirstOrCreate(&category)

    sampleProduct := Product{Name: "Laptop", Price: 1500.0, CategoryID: category.ID, Category: category,}
    db.FirstOrCreate(&sampleProduct)
}