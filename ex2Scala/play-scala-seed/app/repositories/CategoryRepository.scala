package repositories

import models.Category
import scala.concurrent.Future
import com.google.inject.ImplementedBy

@ImplementedBy(classOf[CategoryRepositoryImpl])
trait CategoryRepository {
  def listAllCategories: Future[Seq[Category]]
  def findById(id: Long): Future[Option[Category]]
  def add(category: Category): Future[Long]
  def update(id: Long, category: Category): Future[Option[Category]]
  def delete(id: Long): Future[Long]
}