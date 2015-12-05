/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
var BusinessLogic = (function () {
    function BusinessLogic(body) {
        this.choices = {
            "Habit": "Magic Trick; Juggle; Formal Meditate; Gap Meditate".split(";"),
            "Physical Activity": "Push Up;Bike Ride; Run".split(";"),
            "Consume": "Ted Talk; Talk From Nozbe;Read SCIFI; Watch Movie".split(";"),
            "Produce": "Blog Post;".split(";"),
            "Kids Activity": "Skating;Swimming;Library;Bus;Airport".split(";"),
        };
        this.body = body;
    }
    BusinessLogic.prototype.createButtons = function () {
        for (var choice in this.choices) {
            var button = $("<button/>").text(choice).addClass("btn btn-default");
            button.click(this.choiceOnClickedFactory(choice));
            $(this.body).append(button);
        }
    };
    BusinessLogic.prototype.choiceOnClickedFactory = function (choice) {
        var _this = this;
        return function () {
            var div = $("<h2/>").text(BusinessLogic.randomElement(_this.choices[choice]));
            $(_this.body).append(div);
        };
    };
    BusinessLogic.randomElement = function (items) {
        return items[Math.floor(Math.random() * items.length)];
    };
    return BusinessLogic;
})();
window.onload = function () {
    var bl = new BusinessLogic($("body"));
    bl.createButtons();
};
