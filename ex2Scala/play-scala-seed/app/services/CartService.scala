package services

import javax.inject._
import models.Cart
import repositories.CartRepositoryImpl
import scala.concurrent.{Future, ExecutionContext}

@Singleton
class CartService @Inject()(cartRepositoryImpl: CartRepositoryImpl)(implicit ec: ExecutionContext) {
  def listAllCarts: Future[Seq[Cart]] = cartRepositoryImpl.listAllCarts
  def findCartById(id: Long): Future[Option[Cart]] = cartRepositoryImpl.findById(id)
  def addCart(cart: Cart): Future[Long] = cartRepositoryImpl.addCart(cart)
  def updateCart(id: Long, cart: Cart): Future[Option[Cart]] = cartRepositoryImpl.updateCart(id, cart)
  def deleteCart(id: Long): Future[Long] = cartRepositoryImpl.deleteCart(id)
}