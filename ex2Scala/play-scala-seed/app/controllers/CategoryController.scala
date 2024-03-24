package controllers

import scala.concurrent.Future
import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Category
import models.Category.categoryFormat
import services.CategoryService
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents, categoryService: CategoryService) extends BaseController {

  def getAllCategories: Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    categoryService.listAllCategories.map { categories =>
      Ok(Json.toJson(categories))
    }
  }

  def getCategory(id: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    categoryService.findCategoryById(id).map {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound(Json.obj("error" -> "Category not found"))
    }
  }

  def createCategory: Action[JsValue] = Action.async(parse.json) { implicit request: Request[JsValue] =>
    request.body.validate[Category].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("error" -> "Invalid JSON")))
      },
      category => {
        categoryService.addCategory(category).map { categoryId =>
          Created(Json.obj("message" -> "Category created", "id" -> categoryId))
        }
      }
    )
  }

  def updateCategory(id: Long): Action[JsValue] = Action.async(parse.json) { implicit request: Request[JsValue] =>
    request.body.validate[Category].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("error" -> "Invalid JSON")))
      },
      category => {
        categoryService.updateCategory(id, category).map {
          case Some(category) => Ok(Json.obj("message" -> "Category updated", "category" -> Json.toJson(category)))
          case None => NotFound(Json.obj("error" -> "Category not found"))
        }
      }
    )
  }

  def deleteCategory(id: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    categoryService.deleteCategory(id).map { _ =>
      Ok(Json.obj("message" -> "Category deleted"))
    }
  }
}
