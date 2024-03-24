package controllers

import scala.concurrent.Future
import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Cart
import models.Cart.cartFormat
import services.CartService
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents, cartService: CartService) extends BaseController {

  def getAllCarts: Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    cartService.listAllCarts.map { carts =>
      Ok(Json.toJson(carts))
    }
  }

  def getCart(id: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    cartService.findCartById(id).map {
      case Some(cart) => Ok(Json.toJson(cart))
      case None => NotFound(Json.obj("error" -> "Cart not found"))
    }
  }

  def createCart: Action[JsValue] = Action.async(parse.json) { implicit request: Request[JsValue] =>
    request.body.validate[Cart].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("error" -> "Invalid JSON")))
      },
      cart => {
        cartService.addCart(cart).map { cartId =>
          Created(Json.obj("message" -> "Cart created", "id" -> cartId))
        }
      }
    )
  }

  def updateCart(id: Long): Action[JsValue] = Action.async(parse.json) { implicit request: Request[JsValue] =>
    request.body.validate[Cart].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("error" -> "Invalid JSON")))
      },
      cart => {
        cartService.updateCart(id, cart).map {
          case Some(cart) => Ok(Json.obj("message" -> "Cart updated", "cart" -> Json.toJson(cart)))
          case None => NotFound(Json.obj("error" -> "Cart not found"))
        }
      }
    )
  }

  def deleteCart(id: Long): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    cartService.deleteCart(id).map { _ =>
      Ok(Json.obj("message" -> "Cart deleted"))
    }
  }
}
