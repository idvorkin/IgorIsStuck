/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
"use strict";
var _this = this;
String.prototype.SplitAndClean = function (splitchar) {
    // I have no idea why this doesn't work maybe a JS guru can explain why "this" is getting set to a window.
    return SplitAndClean(_this.toString(), splitchar);
};
function SplitAndClean(str, splitchar) {
    var split = str.split(splitchar);
    var filtered = split.filter(function (v, i) { return v ? true : false; });
    var trimmed = filtered.map(function (s, i) { return s.trim(); });
    return trimmed;
}
var BusinessLogic = (function () {
    function BusinessLogic(body) {
        this.choices = {
            "Habit": SplitAndClean("Magic Trick; Juggle; Formal Meditate; Gap Meditate", ";"),
            "Physical Activity": SplitAndClean("Push Up;Bike Ride; Run", ";"),
            "Consume": SplitAndClean("Ted Talk; Talk From Nozbe;Read SCIFI; Watch Movie", ";"),
            "Produce": SplitAndClean("Blog Post ; ", ";"),
            "Kids Activity": SplitAndClean("Skating;Swimming;Library;Bus;Airport", ';'),
            "Journal Prompts ": SplitAndClean("\n\tWhat is my thought on rituals? \n\tWhat is my thought on making things sacred? \n\tWhat do I want to teach zach? \n\tWhat does being a successful father mean to me? \n\tWhat do I enjoy doing? \n\tWhy do I procrastinate? \n\tWhat would Tori find most helpful? \n\tWhen was I acting empathically\n\tWhat would 16 year old Igor say if he popped into time\n\tWhat would future Igor say if he popped into time.\n\tWhat are the wins, big and small, that I can celebrate?\n\tWhat was I doing when I was achieving my best results?\n\tWhat mistakes did I make over and over again?\n\tWhat are the experiences and achievements I would\u00A0love to look back on this time next year?\n    What is\u00A0my ONE most important thing for 2016? (*This is what you will focus most of your efforts on in 2016)\n        ", "\n")
        };
        this.body = body;
        this.headerDiv = $("<div/>");
        this.contentDiv = $("<div/>");
        $(this.body).append(this.headerDiv);
        $(this.body).append(this.contentDiv);
    }
    BusinessLogic.prototype.clearText = function () {
        this.contentDiv.empty();
        console.log("Done");
    };
    BusinessLogic.prototype.createButtons = function () {
        $(this.headerDiv).append($("<hr/>"));
        /*
        var resetButton = $("<button/>").text("Reset").addClass("btn btn-danger").css("width","100%");
        resetButton.click(()=>this.clearText());
        $(this.headerDiv).append(resetButton);
        $(this.headerDiv).append($("<hr/>"));
        */
        var buttonRow = $("<div>").addClass("btn-group btn-group-justified");
        this.headerDiv.append(buttonRow);
        for (var choice in this.choices) {
            var button = $("<a/>").text(choice).addClass("btn btn-default");
            button.click(this.choiceOnClickedFactory(choice));
            $(buttonRow).append(button);
        }
    };
    BusinessLogic.prototype.choiceOnClickedFactory = function (choice) {
        var _this = this;
        return function () {
            _this.clearText();
            var div = $("<h2/>").text(BusinessLogic.randomElement(_this.choices[choice])).addClass("text-center");
            $(_this.contentDiv).append(div);
        };
    };
    BusinessLogic.randomElement = function (items) {
        return items[Math.floor(Math.random() * items.length)];
    };
    BusinessLogic.prototype.createHeader = function () {
        throw new Error("Not implemented");
    };
    return BusinessLogic;
})();
window.onload = function () {
    // Create button per category on Key, on Click show activity for said button.
    var bl = new BusinessLogic($("body"));
    bl.createButtons();
};
//# sourceMappingURL=app.js.map