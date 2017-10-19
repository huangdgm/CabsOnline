// This js file is used to send the xhr request and register the event listener for the onreadystatechange event
// student number: 15920066
// student name: Dong Huang
var xhr = createRequest();

function getData() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        var response = xhr.responseXML;
        var targetDiv = document.getElementById("targetDiv");

        if (response != null) {
            var header = response.getElementsByTagName("booking");
			// Clear the previous text before displaying new text
            targetDiv.innerHTML = "";

			// The index number 0, 5 represent the booking reference number and pickup date time respectively.
            for (var i = 0; i < header.length; i++) {
                if (window.ActiveXObject) {
						targetDiv.innerHTML += "Thank you! Your booking reference number is ";
						targetDiv.innerHTML += header[i].childNodes[0].text;
						targetDiv.innerHTML += ". You will be picked up in front of your provided address at ";
						// Get the time part
						targetDiv.innerHTML += header[i].childNodes[5].text.substr(11,5);
						targetDiv.innerHTML += "on ";
						// Get the date part
						targetDiv.innerHTML += header[i].childNodes[5].text.substr(0,10);
                } else {
                        targetDiv.innerHTML += "Thank you! Your booking reference number is ";
						targetDiv.innerHTML += header[i].childNodes[0].textContent;
						targetDiv.innerHTML += ". You will be picked up in front of your provided address at ";
						// Get the time part
						targetDiv.innerHTML += header[i].childNodes[5].textContent.substr(11,5);
						targetDiv.innerHTML += " on ";
						// Get the date part
						targetDiv.innerHTML += header[i].childNodes[5].textContent.substr(0,10);
                }
            }
        }
    }
}

// The call-back function that will be invoked based on the readyState of the xhr object
function sendRequest(dataSource) {
    var customer_name = document.getElementById("customer_name").value;
    var contact_phone = document.getElementById("contact_phone").value;
    var unit_number = document.getElementById("pick_up_unit_number").value;
    var street_number = document.getElementById("pick_up_street_number").value;
    var street_name = document.getElementById("pick_up_street_name").value;
    var suburb = document.getElementById("pick_up_suburb").value;
    var destination_suburb = document.getElementById("destination_suburb").value;
    var pick_up_time = document.getElementById("pick_up_time").value;

    // The parameter 'value' is used to generate a unique number for each request body
    var requestBody = "customer_name=" + encodeURIComponent(customer_name) + "&contact_phone=" + encodeURIComponent(contact_phone) + "&pick_up_unit_number=" + encodeURIComponent(unit_number) + "&pick_up_street_number=" + encodeURIComponent(street_number) + "&pick_up_street_name=" + encodeURIComponent(street_name) + "&pick_up_suburb=" + encodeURIComponent(suburb) + "&destination_suburb=" + encodeURIComponent(destination_suburb) + "&pick_up_time=" + encodeURIComponent(pick_up_time) + "&value=" + Number(new Date);

	if(xhr) {
		xhr.open("POST", dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = getData;
		xhr.send(requestBody);
	}
}