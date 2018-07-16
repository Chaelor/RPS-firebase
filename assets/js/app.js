$("document").ready(function () {
    var config = {
        apiKey: "AIzaSyCGhC1G0vJfzWVv8gYRluBUadKHtY54H3E",
        authDomain: "fir-rps-e9725.firebaseapp.com",
        databaseURL: "https://fir-rps-e9725.firebaseio.com",
        projectId: "fir-rps-e9725",
        storageBucket: "",
        messagingSenderId: "637628507830"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var connectionsRef = database.ref("/connections");
    var connectedRef = database.ref(".info/connected");

    //selector
    
    //Player 1 Variables
    var player1Connected = false;
    var player1Name = "";


    var player2Connected = false;
    var player2Name = "";

    $("body").on("click", ".btn-name-selector", function () {

        var nameSelector = $(".name-selector").val().trim();

        if(nameSelector === ""){
            console.log("No info added!");
            return false;
        }else if (player1Connected === false) {
            player1Name = nameSelector;
            $(".p1Name").text("");
            database.ref("/connections/player1").set({
                name: nameSelector
            });
            player1Connected = true;
            $(".name-selector").val("");
        } else {
            player2Name = nameSelector;
            database.ref("/connections/player2").set({
                name: nameSelector
            })
            player2Connected = true;
            $(".name-selector").val("");
        }
    });

    database.ref().on("value", function(snapshot){
        console.log(snapshot);
        console.log(snapshot.val().connections.player1.name);
        $(".p1Name").text(snapshot.val().connections.player1.name);
        $(".p2Name").text(snapshot.val().connections.player2.name);
    });
    console.log(connectionsRef);
});