package main

import (
    "net/http"
    "github.com/labstack/echo/v4"
)

// var db *gorm.DB
var products = map[string]*Product{}

func main() {
    e := echo.New()
    initDB()

    e.GET("/products", GetAllProducts)
    e.GET("/products/:id", GetProduct)
    e.POST("/products", CreateProduct)
    e.PUT("/products/:id", UpdateProduct)
    e.DELETE("/products/:id", DeleteProduct)
    
    e.GET("/categories", GetAllCategories)
    e.GET("/categories/:id", GetCategory)
    e.POST("/categories", CreateCategory)
    e.PUT("/categories/:id", UpdateCategory)
    e.DELETE("/categories/:id", DeleteCategory)

    e.Logger.Fatal(e.Start(":1323"))
}

func GetAllProducts(c echo.Context) error {
    var products []Product
    db.Preload("Category").Find(&products)
    return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
    id := c.Param("id")
    var product Product
    if err := db.Preload("Category").First(&product, id).Error; err != nil {
        return c.NoContent(http.StatusNotFound)
    }
    return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
    product := new(Product)
    if err := c.Bind(product); err != nil {
        return err
    }
    db.Create(&product)
    return c.JSON(http.StatusCreated, product)
}

func UpdateProduct(c echo.Context) error {
    id := c.Param("id")
    var product Product
    if err := db.First(&product, id).Error; err != nil {
        return c.NoContent(http.StatusNotFound)
    }
    if err := c.Bind(&product); err != nil {
        return err
    }
    db.Save(&product)
    return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
    id := c.Param("id")
    var product Product
    if err := db.First(&product, id).Error; err != nil {
        return c.NoContent(http.StatusNotFound)
    }
    db.Delete(&product)
    return c.NoContent(http.StatusNoContent)
}

//categories ---------------------------------------------------

func CreateCategory(c echo.Context) error {
    category := new(Category)
    if err := c.Bind(category); err != nil {
        return err
    }
    db.Create(&category)
    return c.JSON(http.StatusCreated, category)
}

func GetAllCategories(c echo.Context) error {
    var categories []Category
    db.Find(&categories)
    return c.JSON(http.StatusOK, categories)
}

func GetCategory(c echo.Context) error {
    id := c.Param("id")
    var category Category
    if err := db.First(&category, id).Error; err != nil {
        return c.NoContent(http.StatusNotFound)
    }
    return c.JSON(http.StatusOK, category)
}

func UpdateCategory(c echo.Context) error {
    id := c.Param("id")
    var category Category
    if err := db.First(&category, id).Error; err != nil {
        return c.NoContent(http.StatusNotFound)
    }
    if err := c.Bind(&category); err != nil {
        return err
    }
    db.Save(&category)
    return c.JSON(http.StatusOK, category)
}

func DeleteCategory(c echo.Context) error {
    id := c.Param("id")
    var category Category
    if err := db.First(&category, id).Error; err != nil {
        return c.NoContent(http.StatusNotFound)
    }
    db.Delete(&category)
    return c.NoContent(http.StatusNoContent)
}
