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
    this.pictureName = ko.observable(data.pictureName);
    this.pictureURL = ko.observable(data.pictureURL);
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

    self.addCard = function() {
        self.cards.push(new CardViewModel({
            name: self.name(),
            nickName: self.nickName(),
            pictureName: self.pictureName(),
            pictureURL: self.pictureURL(),
            stat1: self.stat1(),
            stat1Val: self.stat1Val(),
            stat2: self.stat2(),
            stat2Val: self.stat2Val(),
            stat3: self.stat3(),
            stat3Val: self.stat3Val(),
            message: self.message(),
            email: self.email(),
            position: self.position(),
            gluten: self.gluten(),
            veg: self.veg(),
            allergies: self.allergies()
        }));

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

