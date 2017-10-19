// file xhr.js
// student number: 15920066
// student name: Dong Huang
function createRequest() {
    var xhr = false; 
	
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
	
    return xhr;
} // end function createRequest()