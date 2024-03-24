package repositories

import models.Product
import scala.concurrent.Future
import com.google.inject.ImplementedBy

@ImplementedBy(classOf[ProductRepositoryImpl])
trait ProductRepository {
  def listAll: Future[Seq[Product]]
  def findById(id: Long): Future[Option[Product]]
  def add(product: Product): Future[Long]
  def update(id: Long, product: Product): Future[Option[Product]]
  def delete(id: Long): Future[Long]
}