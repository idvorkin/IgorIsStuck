/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
class BusinessLogic {
    body: HTMLElement;
    timerToken: number;
    choices = {
        "Habit":
            "Magic Trick; Juggle; Formal Meditate; Gap Meditate".split(";"),
        "Physical Activity":
            "Push Up;Bike Ride; Run".split(";"),
        "Consume":
            "Ted Talk; Talk From Nozbe;Read SCIFI; Watch Movie".split(";"),
        "Produce":
            "Blog Post;".split(";"),
        "Kids Activity":
            "Skating;Swimming;Library;Bus;Airport".split(";"),
    }

    constructor(body: any) {
        this.body = body;
    }



    createButtons() {
        for (var choice in this.choices) {
            var button = $("<button/>").text(choice).addClass("btn btn-default");
            button.click(this.choiceOnClickedFactory(choice));
            $(this.body).append(button);
        }

    }

    choiceOnClickedFactory(choice:string) {
            return () => {
                var div = $("<h2/>").text(BusinessLogic.randomElement(this.choices[choice]));
                $(this.body).append(div);
            };
    }
    static randomElement(items:[any])
    {
        return items[Math.floor(Math.random()*items.length)];
    }

}

window.onload = () => {
    // Create button per category on Key, on Click show activity for said button.
    var bl = new BusinessLogic($("body"));
    bl.createButtons();

};