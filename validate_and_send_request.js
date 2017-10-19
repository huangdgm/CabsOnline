// This js file is used to validate the user input as well as call the sendRequest function which is sending the xhr request
// student number: 15920066
// student name: Dong Huang
var isValid = true;

function validate_customer_name() {
	var customer_name = document.getElementById("customer_name").value;
	
	if(customer_name == "") {
		document.getElementById("customer_name_error").innerHTML = " empty customer name";
		isValid = false;
    } else {
		document.getElementById("customer_name_error").innerHTML = " ok";
		isValid = true;
	}
}

function validate_contact_phone() {
	var contact_phone = document.getElementById("contact_phone").value;
	
	if(contact_phone == "") {
		document.getElementById("contact_phone_error").innerHTML = " empty contact phone";
		isValid = false;
    } else if(!contact_phone.match(/^\d+$/)){
		document.getElementById("contact_phone_error").innerHTML = " only use numbers";
		isValid = false;
	} else {
		document.getElementById("contact_phone_error").innerHTML = " ok";
		isValid = true;
	}
}

// Since it is valid to leave the unit number blank, there is no need to set the isValid flag.
function validate_pick_up_unit_number() {
	var pick_up_unit_number = document.getElementById("pick_up_unit_number").value;
	
	if(pick_up_unit_number == "") {
		document.getElementById("pick_up_unit_number_error").innerHTML = " empty! But is ok";
	} else {
		document.getElementById("pick_up_unit_number_error").innerHTML = " ok";
	}
}

// Street number can include letters in some countries.
function validate_pick_up_street_number() {
	var pick_up_street_number = document.getElementById("pick_up_street_number").value;
	
	if(pick_up_street_number == "") {
		document.getElementById("street_number_error").innerHTML = " empty street number";
		isValid = false;
    } else {
		document.getElementById("street_number_error").innerHTML = " ok";
		isValid = true;
	}
}

function validate_pick_up_street_name() {
	var pick_up_street_name = document.getElementById("pick_up_street_name").value;
	
	if(pick_up_street_name == "") {
		document.getElementById("street_name_error").innerHTML = " empty street name";
		isValid = false;
    } else {
		document.getElementById("street_name_error").innerHTML = " ok";
		isValid = true;
	}
}

function validate_pick_up_suburb() {
	var pick_up_suburb = document.getElementById("pick_up_suburb").value;
	
	if(pick_up_suburb == "") {
		document.getElementById("suburb_error").innerHTML = " empty suburb";
		isValid = false;
    } else {
		document.getElementById("suburb_error").innerHTML = " ok";
		isValid = true;
	}
}

function validate_destination_suburb() {
	var destination_suburb = document.getElementById("destination_suburb").value;
	
	if(destination_suburb == "") {
		document.getElementById("destination_suburb_error").innerHTML = " empty destination suburb";
		isValid = false;
    } else {
		document.getElementById("destination_suburb_error").innerHTML = " ok";
		isValid = true;
	}
}

function validate_pick_up_time() {
	var pick_up_time = document.getElementById("pick_up_time").value;
	
	var pick_up_time_object = new Date(pick_up_time);
	var current_time_object = new Date();
	
	if(pick_up_time == "") {
		document.getElementById("pick_up_time_error").innerHTML = " incomplete date and time";
		isValid = false;
    } else if(pick_up_time_object < current_time_object) {
		document.getElementById("pick_up_time_error").innerHTML = " please choose one that is no earlier than the current time";
		isValid = false;
	} else {
		document.getElementById("pick_up_time_error").innerHTML = " ok";
		isValid = true;
	}
}

function validate_and_send_request() {
	// Validate all the fields before sending the xhr request
	validate_customer_name();
	validate_contact_phone();
	validate_pick_up_street_number();
	validate_pick_up_street_name();
	validate_pick_up_suburb();
	validate_destination_suburb();
	validate_pick_up_time();
	
	// Only if all the fileds are valid, then the request can be sent
	if(isValid) {
		sendRequest('booking_php.php');

		// After sending the booking request, reset the form
		document.getElementById("booking_form").reset();
		// After sending the booking request, clear all the hint messages
		document.getElementById("customer_name_error").innerHTML = "";
		document.getElementById("contact_phone_error").innerHTML = "";
		document.getElementById("pick_up_unit_number_error").innerHTML = "";
		document.getElementById("street_number_error").innerHTML = "";
		document.getElementById("street_name_error").innerHTML = "";
		document.getElementById("suburb_error").innerHTML = "";
		document.getElementById("destination_suburb_error").innerHTML = "";
		document.getElementById("pick_up_time_error").innerHTML = "";
	}
}