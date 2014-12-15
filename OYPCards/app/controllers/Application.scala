package controllers

import play.api._
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import models.Card

case class CardClass(name: String, nickName: String, title: String, stat1: String, stat2: String, stat3: String, val1: String, val2: String, val3: String, message: String, email: String, allergies: String, gluten: Boolean, vegetarian: Boolean)

object Application extends Controller {

    val cardForm = Form(
        mapping(
          "name" -> text,
          "nickName" -> text,
          "title" -> text,
          "stat1" -> text,
          "stat2" -> text,
          "stat3" -> text,
          "val1" -> text,
          "val2" -> text,
          "val3" -> text,
          "message" -> text,
          "email" -> text,
          "allergies" -> text,
          "gluten" -> boolean,
          "vegetarian" -> boolean
        )(CardClass.apply)(CardClass.unapply)
    )

    def index = Action {
        Ok(views.html.index(cardForm))
    }
    def manage = Action {
        Ok(views.html.management(Card.all()))
    }

    def gallery = Action {
      Ok(views.html.gallery(Card.all()))
    }

    def addCard = Action { implicit request =>
      cardForm.bindFromRequest.fold(
        errors => BadRequest(views.html.index(errors)),
        card => {
          Card.create(card.name, card.nickName, card.title, card.stat1, card.stat2, card.stat3, card.val1, card.val2, card.val3, card.message, card.email, card.allergies, card.gluten, card.vegetarian)
          Redirect(routes.Application.index)
        }
      )
    }

    def deleteCard(id: Long) = Action {
      Card.delete(id)
      Redirect(routes.Application.index)
    }

}
