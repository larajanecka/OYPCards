package models
import anorm._
import anorm.SqlParser._
import play.api.db._
import play.api.Play.current

case class Card(id: Long, name: String, nickName: String, title: String, stat1: String, stat2: String, stat3: String, val1: String, val2: String, val3: String, message: String, email: String, allergies: String, gluten: Boolean, vegetarian: Boolean)

object Card {

    val card = {
      get[Long]("id") ~
      get[String]("name") ~
      get[String]("nickName") ~
      get[String]("title") ~
      get[String]("stat1") ~
      get[String]("stat2") ~
      get[String]("stat3") ~
      get[String]("val1") ~
      get[String]("val2") ~
      get[String]("val3") ~
      get[String]("message") ~
      get[String]("email") ~
      get[String]("allergies") ~
      get[Boolean]("gluten") ~
      get[Boolean]("vegetarian") map {
        case id~name~nickName~title~stat1~stat2~stat3~val1~val2~val3~message~email~allergies~gluten~vegetarian => Card(id, name, nickName, title, stat1, stat2, stat3, val1, val2, val3, message, email, allergies, gluten, vegetarian)
      }
    }


    def all(): List[Card] =  DB.withConnection { implicit c =>
        SQL("select * from card").as(card *)
    }

    def create(name: String, nickName: String, title: String, stat1: String, stat2: String, stat3: String, val1: String, val2: String, val3: String, message: String, email: String, allergies: String, gluten: Boolean, vegetarian: Boolean) {
      DB.withConnection { implicit c =>
        SQL("insert into card (name, nickName, title, stat1, stat2, stat3, val1, val2, val3, message, email, allergies, gluten, vegetarian) values ({name}, {nickName}, {title}, {stat1}, {stat2}, {stat3}, {val1}, {val2}, {val3}, {message}, {email}, {allergies}, {gluten}, {vegetarian})").on(
          'name -> name,
          'nickName -> nickName,
          'title -> title,
          'stat1 -> stat1,
          'stat2 -> stat2,
          'stat3 -> stat3,
          'val1 -> val1,
          'val2 -> val2,
          'val3 -> val3,
          'message -> message,
          'email -> email,
          'allergies -> allergies,
          'gluten -> gluten,
          'vegetarian -> vegetarian
        ).executeUpdate()
      }
    }

    def delete(id: Long) {
      DB.withConnection { implicit c =>
        SQL("delete from card where id = {id}").on(
          'id -> id
        ).executeUpdate()
      }
    }

}
