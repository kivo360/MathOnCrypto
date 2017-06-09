function round(n) {
    return Math.round(n * 100) / 100;
}

function doubledValueLabel(params) {
    var value = round(params.value);
    return "sliderValue = " + value +
        "; (2 * sliderValue) = " + (2 * value);
}

function suggestionsContainerStyle(suggestionsCount) {
    return {
        marginVertical: 1,
        marginHorizontal: 0,
        keyboardShouldPersistTaps: "always",
        height: Math.min(150, (56 * suggestionsCount)),
        backgroundColor: "white",
        borderRadius: 5,
        flexGrow: 1
    };
}
var suggestionSubContainerStyle = {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#0000001f"
};

var valueStyle = {
    marginTop: 9,
    fontSize: 14,
    fontFamily: "font",
    color: "#000000de"
};




status.defineSubscription(
    // the name of subscription and the name of the value in bot-db
    // associated with this subscription
    "doubledValue",
    // the map of values on which subscription depends: keys are arbitrary names
    // and values are db paths to another value
    {value: ["sliderValue"]},
    // the function which will be called as reaction on changes of values above,
    // should be pure. Returned result will be associated with subscription in bot-db
    doubledValueLabel
);

status.defineSubscription(
    "roundedValue",
    {value: ["sliderValue"]},
    function (params) {
        return round(params.value);
    }
);



function demoSuggestionss(params, context) {
    var balance = parseFloat(web3.fromWei(web3.eth.getBalance(context.from), "ether"));
    var defaultSliderValue = balance / 2;
    var view = ["view", {},
        // ["text", {}, "Balance " + balance + " ETH"],
        // ["text", {}, ["subscribe", ["doubledValue"]]],
        // ["slider", {
        //     maximumValue: ["subscribe", ["balance"]],
        //     value: defaultSliderValue,
        //     minimumValue: 0,
        //     onSlidingComplete: ["dispatch", ["set", "sliderValue"]],
        //     step: 0.05
        // }],
        
        ["text", {style: {color: "blue", textAlign:"center"}}, ["subscribe", ["example"]]],
        ["text", {style: {color: "red", textAlign:"center", width: '100%', backgroundColor: "gray", color: 'white'}}, ["subscribe", ["validationText"]]],
        ['touchable',
            {onPress: ['dispatch', [status.events.SET_VALUE, params.message + " " + 'Ethereum']]},
            ["view", {}, ["text", {marginTop:8}, "Ethereum"]]
        ],
        ['touchable',
            {onPress: ['dispatch', [status.events.SET_VALUE, params.message + " " + 'Golem']]},
            ["view", {}, ["text", {}, "Golem"]]
        ],
        ['touchable',
            {onPress: ['dispatch', [status.events.SET_VALUE, params.message + " " + 'Siacoin']]},
            ["view", {}, ["text", {}, "Siacoin"]]
        ],
    ];



    // status.setDefaultDb({
    //     sliderValue: defaultSliderValue,
    //     doubledValue: doubledValueLabel({value: defaultSliderValue})
    // });

    var exampleOp = "Example: Bitcoin + Ethereum";

    var validationText = "You're Clear";

    if (typeof params !== 'undefined') {
        // Check for 3 items
        var arrayInput = params.message.split(" ");
        if(arrayInput.length !== 3){
            
            validationText = "Put two coins and an operation in between " + arrayInput.length;
        }else if(arrayInput[2] === "" || arrayInput[2] === " "){
            validationText = "Put two coins and an operation in between"; // Still needs validation
        }
    }


    status.updateDb({
        balance: balance,
        validationText: validationText,
        example: exampleOp
    });

    return {markup: view};
};


status.addListener("on-message-input-change", demoSuggestionss);
status.addListener("init", demoSuggestionss);
status.addListener("on-message-send", function (params, context) {
    


    // var cnt = localStorage.getItem("cnt");
    // if(!cnt) {
    //     cnt = 0;
    // }

    // cnt++;

    // localStorage.setItem("cnt", cnt);
    // if (isNaN(params.message)) {
    //     return {"text-message": "Seems that you don't want to send money :(. cnt = " + cnt};
    // }

    // var balance = web3.eth.getBalance(context.from);
    // var value = parseFloat(params.message);
    // var weiValue = web3.toWei(value, "ether");
    // if (bn(weiValue).greaterThan(bn(balance))) {
    //     return {"text-message": "No way man, you don't have enough money! :)"};
    // }
    // web3.eth.sendTransaction({
    //     from: context.from,
    //     to: context.from,
    //     value: weiValue
    // }, function (error, hash) {
    //     if (error) {
    //         status.sendMessage("Something went wrong, try again :(");
    //         status.showSuggestions(demoSuggestionss(params, context).markup);
    //     } else {
    //         status.sendMessage("You are the hero, you sent " + value + " ETH to yourself!")
    //     }
    // });
});
