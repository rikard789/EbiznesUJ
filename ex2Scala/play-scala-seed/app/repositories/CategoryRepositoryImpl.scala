package repositories

import javax.inject.Singleton
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import models.Category

@Singleton
class CategoryRepositoryImpl extends CategoryRepository {

  private var categories: Seq[Category] = Seq(
    Category(Some(1), "Category 1"),
    Category(Some(2), "Category 2"),
    Category(Some(3), "Category 3"),
    Category(Some(4), "Category 4")
  )

  override def listAllCategories: Future[Seq[Category]] = Future.successful(categories)

  override def findById(id: Long): Future[Option[Category]] =
    Future.successful(categories.find(_.id.contains(id)))

  override def add(category: Category): Future[Long] = Future.successful {
    val newId = categories.map(_.id.get).max + 1
    val newCategory = category.copy(id = Some(newId))
    categories = categories :+ newCategory
    newId 
  }

  override def update(id: Long, category: Category): Future[Option[Category]] = Future.successful {
    categories = categories.map { c =>
      if(c.id.contains(id)) category.copy(id = Some(id)) else c
    }
    categories.find(_.id.contains(id))
  }

  override def delete(id: Long): Future[Long] = Future.successful {
    categories = categories.filterNot(_.id.contains(id))
    id
  }
}
