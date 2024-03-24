package services

import javax.inject._
import models.Category
import repositories.CategoryRepository
import scala.concurrent.{Future, ExecutionContext}

@Singleton
class CategoryService @Inject()(categoryRepository: CategoryRepository)(implicit ec: ExecutionContext) {
  def listAllCategories: Future[Seq[Category]] = categoryRepository.listAllCategories
  def findCategoryById(id: Long): Future[Option[Category]] = categoryRepository.findById(id)
  def addCategory(category: Category): Future[Long] = categoryRepository.add(category)
  def updateCategory(id: Long, category: Category): Future[Option[Category]] = categoryRepository.update(id, category)
  def deleteCategory(id: Long): Future[Long] = categoryRepository.delete(id)
}