<?php
// booking_php.php: add a new booking request to the database and return the result
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
    // Upon successful connection
    // Get data from the form
    $customer_name = pre_process_form_data($_POST['customer_name']);
    $contact_phone = pre_process_form_data($_POST['contact_phone']);
    $pick_up_unit_number = pre_process_form_data($_POST['pick_up_unit_number']);
    $pick_up_street_number = pre_process_form_data($_POST['pick_up_street_number']);
    $pick_up_street_name = pre_process_form_data($_POST['pick_up_street_name']);
    $pick_up_suburb = pre_process_form_data($_POST['pick_up_suburb']);
    $destination_suburb = pre_process_form_data($_POST['destination_suburb']);
    $pick_up_time = pre_process_form_data($_POST['pick_up_time']);
	
	// Generate a unique random booking reference number
	do{
		$booking_reference_number = rand(1000000, 9999999);
		$checkSQL = "select * from $sql_table where booking_reference_number = '$booking_reference_number'";
		$checkResult = @mysqli_query($conn, $checkSQL);
	} while(@mysqli_num_rows($checkResult) !== 0);
	
	// Get the current date time of the server
	$booking_time = date("Y-m-d H:i:s");
	// Each new booking request has a initial booking status of 'unassigned' 
	$booking_status = "unassigned";

    // Set up the SQL command to add the data into the table
    $insertSQL = "insert into $sql_table"
            . "(customer_name, contact_phone, pick_up_unit_number, pick_up_street_number, pick_up_street_name, pick_up_suburb, destination_suburb, pick_up_time, booking_reference_number, booking_time, booking_status)"
            . "values"
            . "('$customer_name','$contact_phone','$pick_up_unit_number', '$pick_up_street_number', '$pick_up_street_name', '$pick_up_suburb', '$destination_suburb', '$pick_up_time', '$booking_reference_number', '$booking_time', '$booking_status')";

    // executes the query
    $result = @mysqli_query($conn, $insertSQL);

    // checks if the execution was successful
    if (!$result) {
        echo "<p>Something is wrong with ", $insertSQL, ", please check the values again.</p>";
    } else {
        // Upon successfully inserting into the table, return the XML to the client
        echo (toXML($booking_reference_number, $customer_name, $contact_phone, $pick_up_suburb, $destination_suburb, $pick_up_time, $booking_time));
    }

    // close the database connection
    mysqli_close($conn);
}

// Validate and secure input data
function pre_process_form_data($data) {
    $data = trim($data);
    $data = stripcslashes($data);
    $data = htmlspecialchars($data);

    return $data;
}

// Construct a XML doc that is returned to the client
function toXML($bookingReferenceNumber, $customerName, $contactPhone, $pickUpSuburb, $destinationSuburb, $pickUpTime, $bookingTime) {
    $doc = new DomDocument('1.0');
    $bookings = $doc->createElement('bookings');
    $doc->appendChild($bookings);

    $booking = $doc->createElement('booking');
    $bookings->appendChild($booking);

    $booking_reference_number = $doc->createElement('booking_reference_number');
    $booking->appendChild($booking_reference_number);
    $value1 = $doc->createTextNode($bookingReferenceNumber);
    $booking_reference_number->appendChild($value1);

    $customer_name = $doc->createElement('customer_name');
    $booking->appendChild($customer_name);
    $value2 = $doc->createTextNode($customerName);
    $customer_name->appendChild($value2);

    $contact_phone = $doc->createElement('contact_phone');
    $booking->appendChild($contact_phone);
    $value3 = $doc->createTextNode($contactPhone);
    $contact_phone->appendChild($value3);

    $pick_up_suburb = $doc->createElement('pick_up_suburb');
    $booking->appendChild($pick_up_suburb);
    $value4 = $doc->createTextNode($pickUpSuburb);
    $pick_up_suburb->appendChild($value4);

    $destination_suburb = $doc->createElement('destination_suburb');
    $booking->appendChild($destination_suburb);
    $value5 = $doc->createTextNode($destinationSuburb);
    $destination_suburb->appendChild($value5);

    $pick_up_time = $doc->createElement('pick_up_time');
    $booking->appendChild($pick_up_time);
    $value6 = $doc->createTextNode($pickUpTime);
    $pick_up_time->appendChild($value6);
	
	$booking_time = $doc->createElement('booking_time');
    $booking->appendChild($booking_time);
    $value7 = $doc->createTextNode($bookingTime);
    $booking_time->appendChild($value7);

    $strXml = $doc->saveXML();

    return $strXml;
}
?>