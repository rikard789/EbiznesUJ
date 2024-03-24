package repositories

import javax.inject.Singleton
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import models.Product

@Singleton
class ProductRepositoryImpl extends ProductRepository {

  private var products: Seq[Product] = Seq(
    Product(Some(1), "Product 1", 99.99),
    Product(Some(2), "Product 2", 199.99),
    Product(Some(3), "Product 3", 299.99),
    Product(Some(4), "Product 4", 399.99)
  )

  override def listAll: Future[Seq[Product]] = Future.successful(products)

  override def findById(id: Long): Future[Option[Product]] =
    Future.successful(products.find(_.id.contains(id)))

  override def add(product: Product): Future[Long] = Future.successful {
    val newId = products.map(_.id.get).max + 1
    val newProduct = product.copy(id = Some(newId))
    products = products :+ newProduct
    newId 
  }

  override def update(id: Long, product: Product): Future[Option[Product]] = Future.successful {
    products = products.map { p =>
      if(p.id.contains(id)) product.copy(id = Some(id)) else p
    }
    products.find(_.id.contains(id))
  }

  override def delete(id: Long): Future[Long] = Future.successful {
    products = products.filterNot(_.id.contains(id))
    id
  }
}
