package controllers

import scala.concurrent.Future
import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Product
import models.Product.productFormat
import services.ProductService
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents, productService: ProductService) extends BaseController {

  def getAllProducts: Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    productService.listAllProducts.map { products =>
      Ok(Json.toJson(products))
    }
  }

  def getProduct(id: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    productService.findProductById(id).map {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("error" -> "Product not found"))
    }
  }

  def createProduct: Action[JsValue] = Action.async(parse.json) { implicit request: Request[JsValue] =>
    request.body.validate[Product].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("error" -> "Invalid JSON")))
      },
      product => {
        productService.addProduct(product).map { productId =>
          Created(Json.obj("message" -> "Product created", "id" -> productId))
        }
      }
    )
  }

  def updateProduct(id: Long): Action[JsValue] = Action.async(parse.json) { implicit request: Request[JsValue] =>
    request.body.validate[Product].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("error" -> "Invalid JSON")))
      },
      product => {
        productService.updateProduct(id, product).map {
          case Some(product) => Ok(Json.obj("message" -> "Product updated", "product" -> Json.toJson(product)))
          case None => NotFound(Json.obj("error" -> "Product not found"))
        }
      }
    )
  }

  def deleteProduct(id: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    productService.deleteProduct(id).map { _ =>
      Ok(Json.obj("message" -> "Product deleted"))
    }
  }
}
