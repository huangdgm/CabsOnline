<?php
// assign_php.php: update the booking status for a specific booking request and return the result that indicates the success or faliure.
// student number: 15920066
// student name: Dong Huang
header('Content-Type: text/xml');

// include the info that is required to connect to the database
require_once('sqlinfo.inc.php');

// The @ operator suppresses the display of any error messages
// mysqli_connect returns false if connection failed, otherwise a connection value
$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db);

// Retrieve the booking reference number that should be assigned.
$booking_reference_number = $_POST['booking_reference_number'];

// Checks if connection is successful
if (!$conn) {
    // Displays an error message
    echo "<p>Database connection failure</p>";
} else {
    // Set up the SQL command to update the booking status to 'assigned'.
	$sql = "UPDATE $sql_table SET booking_status = 'assigned' WHERE booking_reference_number = '$booking_reference_number'";
    // executes the query
    $result = @mysqli_query($conn, $sql);
	$number = mysqli_affected_rows($conn);
	
    // checks if the execution was successful
    if (!$result) {
        echo "fail to update";
    } else {
		// If there is a affected row, then the update operation is successful, otherwise, the update operation has no effect on the database.
		if($number != 0) {
			echo "successful";
		} else {
			echo "no record affected";
		}
    }

    // close the database connection
    mysqli_close($conn);
}
?>