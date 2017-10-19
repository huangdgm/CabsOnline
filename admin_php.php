<?php
// admin_php.php: select all the qulified booking requests and return the result as XML document
// student number: 15920066
// student name: Dong Huang
header('Content-Type: text/xml');

// include the info that is required to connect to the database
require_once('sqlinfo.inc.php');

// The @ operator suppresses the display of any error messages
// mysqli_connect returns false if connection failed, otherwise a connection value
$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db);

// Checks if connection is successful
if (!$conn) {
    // Displays an error message
    echo "<p>Database connection failure</p>";
} else {
    // Set up the SQL command to select all the qualified rows
    $sql = "SELECT * FROM $sql_table WHERE pick_up_time > NOW() AND pick_up_time < NOW() + INTERVAL 2 HOUR AND booking_status = 'unassigned'";

    // executes the query
    $resultSet = @mysqli_query($conn, $sql);

    // checks if the execution was successful
    if (!$resultSet) {
        echo "<p>Something is wrong with ", $sql, ", please check the values again.</p>";
    } else {
		// Upon successfully selecting rows from the table, return the XML to the client
        echo (toXML($resultSet));
    }

    // close the database connection
    mysqli_close($conn);
}

// Construct a XML doc that is returned to the client
function toXML($resultSet) {
    $doc = new DomDocument('1.0');
    $bookings = $doc->createElement('bookings');
    $doc->appendChild($bookings);

	$row = mysqli_fetch_assoc($resultSet);
	
	// Iterate each row in the result set and construct the XML using the values in the row.
	// If $row is not beyond the last row in the result set, then execute the statements in the while loop.
	while ($row) {
		$booking = $doc->createElement('booking');
		$bookings->appendChild($booking);
		
		$booking_reference_number = $doc->createElement('booking_reference_number');
		$booking->appendChild($booking_reference_number);
		$value1 = $doc->createTextNode($row["booking_reference_number"]);
		$booking_reference_number->appendChild($value1);
	
		$customer_name = $doc->createElement('customer_name');
		$booking->appendChild($customer_name);
		$value2 = $doc->createTextNode($row["customer_name"]);
		$customer_name->appendChild($value2);
	
		$contact_phone = $doc->createElement('contact_phone');
		$booking->appendChild($contact_phone);
		$value3 = $doc->createTextNode($row["contact_phone"]);
		$contact_phone->appendChild($value3);
	
		$pick_up_suburb = $doc->createElement('pick_up_suburb');
		$booking->appendChild($pick_up_suburb);
		$value4 = $doc->createTextNode($row["pick_up_suburb"]);
		$pick_up_suburb->appendChild($value4);
	
		$destination_suburb = $doc->createElement('destination_suburb');
		$booking->appendChild($destination_suburb);
		$value5 = $doc->createTextNode($row["destination_suburb"]);
		$destination_suburb->appendChild($value5);
	
		$pick_up_time = $doc->createElement('pick_up_time');
		$booking->appendChild($pick_up_time);
		$value6 = $doc->createTextNode($row["pick_up_time"]);
		$pick_up_time->appendChild($value6);
		
		// Move the row pointer to the next row
		$row = mysqli_fetch_assoc($resultSet);
	}

    $strXml = $doc->saveXML();

    return $strXml;
}
?>