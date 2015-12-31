/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />

"use strict";
interface String
{
    SplitAndClean(split:string):String[];
}

String.prototype.SplitAndClean = (splitchar)=> {
    // I have no idea why this doesn't work maybe a JS guru can explain why "this" is getting set to a w
    return SplitAndClean(this.toString(), splitchar);
}
function SplitAndClean(str, splitchar){
    var split =  str.split(splitchar);
    var filtered = split.filter((v, i) => v ? true : false);
    var trimmed = filtered.map((s, i) => s.trim());
    return trimmed;
}

class BusinessLogic {
    body: HTMLElement;
    timerToken: number;
    choices = {
        "Habit": SplitAndClean(
            "Magic Trick; Juggle; Formal Meditate; Gap Meditate",";"),
        "Physical Activity": SplitAndClean(
            "Push Up;Bike Ride; Run",";"),
        "Consume": SplitAndClean(
            "Ted Talk; Talk From Nozbe;Read SCIFI; Watch Movie",";"),
        "Produce": SplitAndClean(
            "Blog Post;",";"),
        "Kids Activity": SplitAndClean(
            "Skating;Swimming;Library;Bus;Airport",";"),
        "Journal Prompts ": SplitAndClean(`
	What is my thought on rituals? 
	What is my thought on making things sacred? 
	What do I want to teach zach? 
	What does being a successful father mean to me? 
	What do I enjoy doing? 
	Why do I procrastinate? 
	What would Tori find most helpful? 
	When was I acting empathically
	What would 16 year old Igor say if he popped into time
	What would future Igor say if he popped into time.
	What are the wins, big and small, that I can celebrate?
	What was I doing when I was achieving my best results?
	What mistakes did I make over and over again?
	What are the experiences and achievements I would love to look back on this time next year?
    What is my ONE most important thing for 2016? (*This is what you will focus most of your efforts on in 2016)
        `,"\n")
    }

    constructor(body: any) {
        this.body = body;
        this.headerDiv = $("<div/>");
        this.contentDiv = $("<div/>");
        $(this.body).append(this.headerDiv);
        $(this.body).append(this.contentDiv);
    }


    clearText() {
        this.contentDiv.empty();
        console.log("Done");
    }

    createButtons() {
        var buttonRow = $("<div id='responsive'>").addClass("btn-group").css("width","100%");
        this.headerDiv.append(buttonRow);
        for (var choice in this.choices) {
            var button = $("<a/>").text(choice).addClass("btn btn-default btn-large btn-block");
            button.click(this.choiceOnClickedFactory(choice));
            $(buttonRow).append(button);
        }

    }

    choiceOnClickedFactory(choice:string) {
            return () => {
                this.clearText();
                var div = $("<h2/>").text(BusinessLogic.randomElement(this.choices[choice])).addClass("text-center");
                $(this.contentDiv).append(div);
            };
    }
    static randomElement(items:[any])
    {
        return items[Math.floor(Math.random()*items.length)];
    }

    headerDiv: JQuery;
    contentDiv: JQuery;

    createHeader() {
         throw new Error("Not implemented");
    }
}


window.onload = () => {
    // Create button per category on Key, on Click show activity for said button.
    var bl = new BusinessLogic($("body"));
    bl.createButtons();

};