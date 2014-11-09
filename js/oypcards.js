$(function() {
    $('.carousel').each(function(){
        $(this).carousel({
            interval: false
        });
    });
});


function CardViewModel() {
    this.name = ko.observable("Myamoto Musashi");
    this.nickName = ko.observable("Super Mega Awesome Guy");
    this.stat1 = ko.observable("Strategy");
    this.stat1Val = ko.observable("+9000");
    this.stat2 = ko.observable("Swordsmanship");
    this.stat2Val = ko.observable("infinite");
    this.stat3 = ko.observable("Secret Passion");
    this.stat3Val = ko.observable("Long walks on the beach");
    this.message = ko.observable("There is nothing outside of yourself that can ever enable you to get better, stronger, richer, quicker, or smarter. Everything is within. Everything exists. Seek nothing outside of yourself")
    this.fullName = ko.computed(function() {
        return this.name() + " (a.k.a " + this.nickName() + ")";
    }, this);
    this.Stat1 = ko.computed(function() {
        return "<strong>" + this.stat1() + ": </strong>"  + this.stat1Val();
    }, this);
    this.Stat2 = ko.computed(function() {
        return "<strong>" + this.stat2() + ": </strong>"  + this.stat2Val();
    }, this);
    this.Stat3 = ko.computed(function() {
        return "<strong>" + this.stat3() + ": </strong>"  + this.stat3Val();;
    }, this);
    this.Message = ko.computed(function() {
        return "<em>\"" + this.message() + "\"</em>"
    }, this);

    this.card = ko.computed(function() {
        return null;
    }, this);
}

ko.applyBindings(new CardViewModel());

/*var temp = function() {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var data =


    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
}*/
