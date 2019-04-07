// $(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAV8FVULhrykmoZSxUm4HYWI1bHf-zdYEo",
    authDomain: "traintime-27883.firebaseapp.com",
    databaseURL: "https://traintime-27883.firebaseio.com",
    projectId: "traintime-27883",
    storageBucket: "traintime2-7e6f7.appspot.com",
    messagingSenderId: "345877805194"
  };
  firebase.initializeApp(config);

  var dataBase = firebase.database()
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;
  var nextArrival = "";
  var minutesAway = "";
  // var moment = require('moment');
  // moment().format();
  

  //button for adding train info
  $("#submit-button").on("click", function (event) {
    event.preventDefault();

    //grabs user input
    var trainName = $("#train-name").val().trim();
    console.log(trainName);
    var destination = $("#destination-name").val().trim();
    console.log(destination);
    var timeConverted = $("#firstTrainTime-name").val().trim();
    var testMoment = moment();
    console.log(testMoment);
    var firstTrainTime = moment(timeConverted).format("hh:mm");
    console.log(timeConverted);
    var frequency = $("#frequency-name").val().trim();
    console.log(frequency);
  

    //uploads date into database
    dataBase.ref().push({
      train: trainName,
      dest: destination,
      firstTrain: firstTrainTime,
      freq: frequency,
      next: nextArrival,
      min:  minutesAway
    });

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination-name").val("");
    $("#firstTrainTime-name").val("");
    $("#frequency-name").val("");
    $("#nextArrival-name").val("");
    $("#minutesAway-name").val("");
  });

  //create firebase event for adding train info to the database and a row in the html when a user adds an entry
  dataBase.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    //store everything into a variable
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().dest;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().freq;
    var nextArrival = childSnapshot.val().next;
    var minutesAway = childSnapshot.val().min; 

    //train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    //convert first time
    var firstTrainTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTrainTime);
    // calculate the train minutes
    var frequency = moment().diff(moment(frequency, "X"), "minutes");
    console.log(frequency);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(firstTrainTime),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
    console.log(newRow);

    // Append the new row to the table
    $(".table").append(newRow);
  });
// });