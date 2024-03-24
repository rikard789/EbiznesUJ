package services

import javax.inject._
import models.Product
import repositories.ProductRepository
import scala.concurrent.{Future, ExecutionContext}

@Singleton
class ProductService @Inject()(productRepository: ProductRepository)(implicit ec: ExecutionContext) {
  def listAllProducts: Future[Seq[Product]] = productRepository.listAll
  def findProductById(id: Long): Future[Option[Product]] = productRepository.findById(id)
  def addProduct(product: Product): Future[Long] = productRepository.add(product)
  def updateProduct(id: Long, product: Product): Future[Option[Product]] = productRepository.update(id, product)
  def deleteProduct(id: Long): Future[Long] = productRepository.delete(id)
}