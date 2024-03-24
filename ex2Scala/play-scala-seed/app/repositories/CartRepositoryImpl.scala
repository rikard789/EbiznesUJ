package repositories

import javax.inject.Singleton
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import models.Cart
import models.CartItem
import models.Product

@Singleton
class CartRepositoryImpl extends CartRepository {

  private var cartItems1: Seq[CartItem] = Seq(
    CartItem(Product(Some(1), "Product 1", 99.99),2),
    CartItem(Product(Some(2), "Product 2", 199.99),1),
  )

  private var cartItems2: Seq[CartItem] = Seq(
    CartItem(Product(Some(4), "Product 2", 899.99),3),
    CartItem(Product(Some(5), "Product 3", 444.99),5)
  )

  private var cartItems3: Seq[CartItem] = Seq(
    CartItem(Product(Some(6), "Product 1", 399.99),1),
    CartItem(Product(Some(9), "Product 2", 299.99),1)
  )

  private var carts: Seq[Cart] = Seq(
    Cart(Some(1),cartItems1),
    Cart(Some(2),cartItems2),
    Cart(Some(3),cartItems3)
  )

  override def listAllCarts: Future[Seq[Cart]] = Future.successful(carts)

  override def findById(id: Long): Future[Option[Cart]] =
    Future.successful(carts.find(_.id.contains(id)))

  override def addCart(cart: Cart): Future[Long] = Future.successful {
    val newId = carts.map(_.id.get).max + 1
    val newCart = cart.copy(id = Some(newId))
    carts = carts :+ newCart
    newId 
  }

  override def updateCart(id: Long, cart: Cart): Future[Option[Cart]] = Future.successful {
    carts = carts.map { c =>
      if(c.id.contains(id)) cart.copy(id = Some(id)) else c
    }
    carts.find(_.id.contains(id))
  }

  override def deleteCart(id: Long): Future[Long] = Future.successful {
    carts = carts.filterNot(_.id.contains(id))
    id
  }
}

