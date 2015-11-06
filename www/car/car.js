// Javascript function interface between Lua & Web
// by SM.Ching http://ediy.com.my

var cmd;
var keynum=0;
var previous_keynum=0;
var strURL="/cgi-bin/control";

function keyDown(e) {
	if(window.event) { // IE
		keynum = e.keyCode
	} else if(e.which) { // Netscape/Firefox/Opera
		keynum = e.which
	}
	
	//prevent repeated keystrokes
	if (previous_keynum==keynum) {
		return;
	}
	previous_keynum=keynum;

	/*
	7(cam)   	8(forward) 	9(headlight)
	4(left)  	5(stop) 	6(right)
	1(horn)  	2(backward) 	3(Mic)
	*/

	switch (keynum ) {
		case 81: //pressKey=Q
			mySlider.setValue(40); 
			changeSpeed(40); //lowest speed
			break;
		case 87: //pressKey=W
			mySlider.setValue(60); 
			changeSpeed(60); //low speed
			break;
		case 69: //pressKey=E
			mySlider.setValue(80); //high speed
			changeSpeed(60);
			break;
		case 82: //pressKey=R
			mySlider.setValue(100); 
			changeSpeed(60); //full speed
			break;

		///////////////////Num lock On
		case 97: //pressKey=1
			horn(); //horn
			break;
		case 98: //pressKey=2
			runCmd(2); //down
			break;
		case 99: //pressKey=3
			mic(); //mic
			break;
		case 100: //pressKey=4
			runCmd(4); //left
			break;
		case 101: //pressKey=5
			runCmd(5); //stop
			break;
		case 102: //pressKey=6
			runCmd(6); //right
			break;
		case 103: //pressKey=7
			camera(); //camera
			break;
		case 104: //pressKey=8
			runCmd(8); //up
			break;
		case 105: //pressKey=9
			headLight(); //headlight
			break;

		///////////////////Num lock OFF
		case 25: //pressKey=End
			horn(); //horn
			break;
		case 40: //pressKey=Down arrow
			runCmd(2); //down
			break;
		case 34: //pressKey=PgDn
			mic(); //mic
			break;
		case 37: //pressKey=Left arrow
			runCmd(4); //left
			break;
		case 12: //pressKey=5
			runCmd(5); //stop
			break;
		case 32: //pressKey=space
			runCmd(5); //stop
			break;
		case 39: //pressKey=Right arrow
			runCmd(6); //right
			break;
		case 36: //pressKey=Home
			camera(); //camera
			break;
		case 38: //pressKey=Up arrow
			runCmd(8); //up
			break;
		case 33: //pressKey=PgUp
			headLight(); //headlight
			break;
	}
};

function keyUp(e) {
	if(window.event) { // IE
		keynum = e.keyCode
	} else if(e.which) { // Netscape/Firefox/Opera
		keynum = e.which
	}

	//Num lock off: 2=30, 4-37, 6=39, 8=38
	if (keynum==40 || keynum==37 || keynum==39 || keynum==38) runCmd(5); //stop

	//Num lock on: down=98, left=100, right=102, up=104
	if (keynum==98 || keynum==100 || keynum==102 || keynum==104) runCmd(5); //stop
	previous_keynum=0;
};

/////////////////////////////////////// call by image onClick & keypress (see main.html)
function runCmd(command) {
	command="RUN=" + command;
	updatePage(cmd);
	xmlhttpPost(command);
};

function camera() {
	command = "CAM";
	xmlhttpPost(command);
	sleep(100);
	location.reload(); //refresh a page
	updatePage(cmd);
};

function headLight() {
	command  = "LED=20" //use router gpio 20
	updatePage(cmd);
	xmlhttpPost(command); 
};

function changeSpeed(value) {
	command="SPD=" + value;
	//updatePage(cmd);
	xmlhttpPost(command);
   	document.getElementById("result").innerHTML = command;
};

function horn() {
	command  = "SPK"
	xmlhttpPost(command); 
};

function mic() {
	command  = "MIC"
	updatePage(cmd);
	xmlhttpPost(command); 
};

function pantilt(value) {
	command  = "PAN"+ value;
	xmlhttpPost(command); 
};

/////////////////////////////////////// Ajax
function xmlhttpPost(command) {
    	var xmlHttpReq = false;
    	var self = this;
    
    	// Mozilla/Safari
    	if (window.XMLHttpRequest) {
        	self.xmlHttpReq = new XMLHttpRequest();
    	}
    	// IE
    	else if (window.ActiveXObject) {
        	self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    	}
	
   	//complete message sent to url --> /cgi-bin/control?RUN=8
	cmd= strURL + "?" + command;

    	self.xmlHttpReq.open('POST', cmd, true);
    	self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    	self.xmlHttpReq.onreadystatechange = function() {
       		//if (self.xmlHttpReq.readyState == 4) {
            		//serialMessage = self.xmlHttpReq.responseText;
            		//updatePage(serialMessage);
        	//}
    	}
    	self.xmlHttpReq.send();
};


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};


/////////////////////////////////////// update status bar
function updatePage(str){
	var pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
	pageName=pageName .toUpperCase(); //convert to upper case
	if (pageName!="PANTILT.HTML") {
		document.getElementById("result").innerHTML = str;
	}
};


