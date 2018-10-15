$("#submitForm").on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  



  //create avariable to hold each ids 
//ex:
    let clientrating = parseInt(
      $("#stars li.selected")
        .last()
        .data("value"),
      10
    );
    let username = $("#userName").val().trim();
    let addr = $("#inputAddress").val().trim();
    let braiding = parseInt($("#inputBraiding option:selected").val());
    let hairlocs = parseInt($("#inputHairlocs option:selected").val());
    let id = parseInt($("#id").text())

  

  var newReviewVals = {
    clientrating: clientrating,
    username: username,
    addr: addr,
    braiding: braiding,
    hairlocs: hairlocs,
    id: id

  }

  console.log(newReviewVals);
  console.log(clientrating)

  //Send POST request
  $.ajax("/api/locSmith/:id", {
    type: "PUT",
    data: newReviewVals
  }).then(function() {
    console.log("created new review values");
    let href = $("#goback").attr("href")
    window.location.href = href
    //location.reload();
  });

  

});
