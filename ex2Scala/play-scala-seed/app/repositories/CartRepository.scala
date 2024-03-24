package repositories

import models.Cart
import scala.concurrent.Future
import com.google.inject.ImplementedBy

@ImplementedBy(classOf[CartRepositoryImpl])
trait CartRepository {
  def listAllCarts: Future[Seq[Cart]]
  def findById(id: Long): Future[Option[Cart]]
  def addCart(cart: Cart): Future[Long]
  def updateCart(id: Long, cart: Cart): Future[Option[Cart]]
  def deleteCart(id: Long): Future[Long]
}