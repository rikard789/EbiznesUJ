package models

import play.api.libs.json.{Json, OFormat}

case class Cart(id: Option[Long], cartItems: Seq[CartItem])

object Cart {

  implicit val cartFormat: OFormat[Cart] = Json.format[Cart]
}