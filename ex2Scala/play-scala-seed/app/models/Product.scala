package models

import play.api.libs.json.{Json, OFormat}


case class Product(id: Option[Long], name: String, price: BigDecimal)

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
}