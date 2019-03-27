$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAV8FVULhrykmoZSxUm4HYWI1bHf-zdYEo",
    authDomain: "traintime-27883.firebaseapp.com",
    databaseURL: "https://traintime-27883.firebaseio.com",
    projectId: "traintime-27883",
    storageBucket: "",
    messagingSenderId: "345877805194"
  };
  firebase.initializeApp(config);

  var dataBase = firebase.database()
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";
  var moment = "";

  //button for adding train info
  $("#submit-button").on("click", function (event) {
    event.preventDefault();

    //grabs user input
    var trainName = $("#train-name").val().trim();
    console.log(trainName);
    var destination = $("#destination-name").val().trim();
    console.log(destination);
    var firstTrainTime = moment($("#firstTrainTime-name").val().trim(), "hh:mm").format("");
    console.log(firstTrainTime);
    var frequency = $("#frequency-name").val().trim();
    console.log(frequency);

    //uploads date into database
    dataBase.ref().push({
      train: trainName,
      dest: destination,
      firstTrain: firstTrainTime,
      freq: frequency
    });

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination-name").val("");
    $("#firstTrainTime-name").val("");
    $("#frequency-name").val("");
  });

  //when new data is added
  // dataBase.ref().on("child_added", function (childSnapshot, prevChildKey) {
  //   console.log(childSnapshot.val());
  // })

  //create firebase event for adding train info to the database and a row in the html when a user adds an entry
  dataBase.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    //store everythin into a variable
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    //train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    //convert first time
    var firstTrainTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTrainTime);
    // calculate the train minutes
    var frequency = moment().diff(moment(firstTrainTime, "X"), "minutes");
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

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });  
});