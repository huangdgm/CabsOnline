// This js file is used to send the xhr request and register the event listener for the onreadystatechange event
// student number: 15920066
// student name: Dong Huang
var xhr = createRequest();
var tBody = document.createElement("TBODY");

// The call-back function
function makeTable() {
	if ((xhr.readyState == 4) && (xhr.status == 200)) {
		// Treat the response as the XML document
        var responseXML = xhr.responseXML;
		
		if(responseXML != null) {
			var theTable = document.getElementById("tbl");
			var bookings = responseXML.getElementsByTagName("booking");
	
			//IE requires rows to be added to a tBody element
			//IE automatically creates a tBody element - delete it and then manually create
			if (theTable.firstChild != null){
				var badIEBody = theTable.childNodes[0];  
				theTable.removeChild(badIEBody);
			}
			
			theTable.appendChild(tBody);
			// Clear the original content of the table before refreshing the table
			tBody.innerHTML = "";
			
			// Constructing the head row of the table
			var tableHeadRow = document.createElement("tr");
			
			var h1 = document.createElement("th");
			h1.appendChild(document.createTextNode("Booking reference number"));
			tableHeadRow.appendChild(h1);
			
			var h2 = document.createElement("th");
			h2.appendChild(document.createTextNode("Customer name"));
			tableHeadRow.appendChild(h2);
			
			var h3 = document.createElement("th");
			h3.appendChild(document.createTextNode("Contact phone"));
			tableHeadRow.appendChild(h3);
			
			var h4 = document.createElement("th");
			h4.appendChild(document.createTextNode("Pickup suburb"));
			tableHeadRow.appendChild(h4);
			
			var h5 = document.createElement("th");
			h5.appendChild(document.createTextNode("Destination suburb"));
			tableHeadRow.appendChild(h5);
			
			var h6 = document.createElement("th");
			h6.appendChild(document.createTextNode("Pickup time"));
			tableHeadRow.appendChild(h6);
			
			tBody.appendChild(tableHeadRow);
			
			// Constructing the content rows of the table, based on the response XML
			for(var i = 0; i < bookings.length; i++) {
				var newRow = document.createElement("tr");
				
				if (window.ActiveXObject) {
					for(var j = 0; j < bookings[i].childNodes.length; j++) {
						var c = document.createElement("td");
						var v = document.createTextNode(bookings[i].childNodes[j].text);
						c.appendChild(v);
						newRow.appendChild(c);
					}
                } else {
                    for(var j = 0; j < bookings[i].childNodes.length; j++) {
						var c = document.createElement("td");
						var v = document.createTextNode(bookings[i].childNodes[j].textContent);
						c.appendChild(v);
						newRow.appendChild(c);
					}
                }
				
				tBody.appendChild(newRow);
			}
		}
    }
}

// Send the XHR request to the server and register the event listener
function showRequest(dataSource) {
    xhr.open("GET", dataSource, true);
	xhr.onreadystatechange = makeTable;
    xhr.send(null);
}
