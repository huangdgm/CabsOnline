// This js file is used to send the xhr request and register the event listener for the onreadystatechange event
// The booking_reference_number is validated as well.
// student number: 15920066
// student name: Dong Huang
var xhr = createRequest();
var isValid = true;

// Validate the booking reference number
function validate_booking_reference_number() {
	var booking_reference_number = document.getElementById("booking_reference_number").value;
	
	if(booking_reference_number == "") {
		document.getElementById("booking_reference_number_error").innerHTML = " empty booking reference number";
		isValid = false;
    } else if(!booking_reference_number.match(/^\d+$/)) {	// To make sure it only contains numbers
		document.getElementById("booking_reference_number_error").innerHTML = " only use numbers, eg. 3392565";
		isValid = false;
	} else {
		// If the booking reference number is valid, then remove the hint.
		document.getElementById("booking_reference_number_error").innerHTML = "";
		isValid = true;
	}
}

// The call-back function that will be invoked based on the readyState of the xhr object
function getData() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        var response = xhr.responseText;
        var targetDiv = document.getElementById("targetDiv");
		// Clear the previous text before displaying new text
		targetDiv.innerHTML = "";

        if (response != null) {
			if (response == "successful") {
				// If the update operation on the database is successful
				targetDiv.innerHTML += "The booking request ";
				targetDiv.innerHTML += document.getElementById("booking_reference_number").value;
				targetDiv.innerHTML += " has been properly assigned.";
			} else {
				// If the update operation on the database is falied
				targetDiv.innerHTML += "The booing reference nummber ";
				targetDiv.innerHTML += document.getElementById("booking_reference_number").value;
				targetDiv.innerHTML += " is not found in system or has already been assigned. Please verify before assignment.";
			}
        }
    }
}

// Send the XHR request to the server and register the event listener
function assignRequest(dataSource) {
	// Validate before sending the xhr request
	validate_booking_reference_number();
	
	// Retrieve the booking reference number entered by the end user
    var booking_reference_number = document.getElementById("booking_reference_number").value;

    // The parameter 'value' is used to generate a unique number for each request body
    var requestBody = "booking_reference_number=" + encodeURIComponent(booking_reference_number) + "&value=" + Number(new Date);

	if(xhr && isValid) {
		xhr.open("POST", dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = getData;
		xhr.send(requestBody);
	}
}