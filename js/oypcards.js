$(function() {
    $('.carousel').each(function(){
        $(this).carousel({
            interval: false
        });
    });
});


function CardViewModel(data) {
    this.name = ko.observable(data.name);
    this.nickName = ko.observable(data.nickName);
    this.stat1 = ko.observable(data.stat1);
    this.stat1Val = ko.observable(data.stat1Val);
    this.stat2 = ko.observable(data.stat2);
    this.stat2Val = ko.observable(data.stat2Val);
    this.stat3 = ko.observable(data.stat3);
    this.stat3Val = ko.observable(data.stat3Val);
    this.message = ko.observable(data.message);
    this.email = ko.observable(data.email);
    this.position = ko.observable(data.position);
    this.gluten = ko.observable(data.gluten);
    this.veg = ko.observable(data.veg);
    this.allergies = ko.observable(data.allergies);

}


function CardDeck() {
    var self = this;
    self.cards = ko.observableArray([]);

    self.newName = ko.observable("Myamoto Musashi");
    self.newNickName = ko.observable("Super Mega Awesome Guy");
    self.newStat1 = ko.observable("Strategy");
    self.newStat1Val = ko.observable("+9000");
    self.newStat2 = ko.observable("Swordsmanship");
    self.newStat2Val = ko.observable("infinite");
    self.newStat3 = ko.observable("Secret Passion");
    self.newStat3Val = ko.observable("Long walks on the beach");
    self.newMessage = ko.observable("There is nothing outside of yourself that can ever enable you to get better, stronger, richer, quicker, or smarter. Everything is within. Everything exists. Seek nothing outside of yourself");
    self.newEmail = ko.observable("myamoto.musashi@oyp.on.ca");
    self.newPosition = ko.observable("Honorable Member from Japan");
    self.newGluten = ko.observable(true);
    self.newVeg = ko.observable(true);
    self.newAllergies = ko.observable("The undead");

    self.newCard = ko.computed(function() {
        var gluten = (self.newGluten()) ? '<img src="./images/gluten.png">' : "";
        var veg = (self.newVeg()) ? '<img src="./images/veg.png">' : "";
        return '<h2>' + self.newName() + '(a.k.a ' + self.newNickName() + ')</h2>' +
              '<h5>' + self.newPosition() + '</h5>' +
            '<img src="http://placehold.it/200x200">' +
            '<div class="caption">' +
              '<p class="stat"><strong>' + self.newStat1() + '</strong>: ' + self.newStat1Val() + '</p>' +
              '<p class="stat"><strong>' + self.newStat2() + '</strong>: ' + self.newStat2Val() + '</p>' +
              '<p class="stat"><strong>' + self.newStat3() + '</strong>: ' + self.newStat3Val() + '</p>' +
              '<p class="message"><em>' + self.newMessage() + '</em></p>' +
              '<p class="email">' + self.newEmail() + '</p>' +
               '<div class="foods"><div class="foodImages">' + gluten + veg + '</div>' +
              '<p class="allergies"><strong>Allergies: </strong>' + self.newAllergies() + '</p>' +
              '</div>' +
           '</div>'
    }, this);

    self.addCard = function() {
        self.cards.push(new CardViewModel({
            name: self.newName(),
            nickName: self.newNickName(),
            stat1: self.newStat1(),
            stat1Val: self.newStat1Val(),
            stat2: self.newStat2(),
            stat2Val: self.newStat2Val(),
            stat3: self.newStat3(),
            stat3Val: self.newStat3Val(),
            message: self.newMessage(),
            email: self.newEmail(),
            position: self.newPosition(),
            gluten: self.newGluten(),
            veg: self.newVeg(),
            allergies: self.newAllergies()
        }));

        self.newName("");
        self.newNickName("");
        self.newStat1("");
        self.newStat1Val("");
        self.newStat2("");
        self.newStat2Val("");
        self.newStat3("");
        self.newStat3Val("");
        self.newMessage("");
        self.newEmail("");
        self.newPosition("");
        self.newGluten("");
        self.newVeg("");
        self.newAllergies("");


        $.ajax("/cards", {
            data: ko.toJSON({cards: self.cards}),
            type: "post", contentType: "application/json",
            success: function(result) {console.log("result");}
        })
    };

    self.deleteCard = function(card) {
        self.cards.destroy(card);
    }

    self.getCards = function() {
        return $.getJSON("/cards", function(cards) {
            var mappedCards = $.map(cards, function(item) { return new CardViewModel(item) });
            self.cards(mappedCards);
        });
    }

}

ko.applyBindings(new CardDeck());

