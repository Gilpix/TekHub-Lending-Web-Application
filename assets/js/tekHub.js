var isLogined=sessionStorage.getItem('isLogined') || "0";
var studName;
var studId;
var studEmail;
var studPass;
var studGender;
console.log(isLogined);

var allCredentials=[];
var signInCredential={};
var stdProfile={};

var register=document.querySelector("#register");
var signInTab=document.querySelector(".signInTab");
var toogleProfile=document.querySelector(".toogleProfile");
var signOutTab=document.querySelector(".signOutTab");
var logOutTab=document.querySelector(".logOutTab");
var signIn=document.querySelector("#signInn");


if(register)
register.addEventListener("click", signUp);
if(signIn)
signIn.addEventListener("click", signIn);
if(logOutTab)
logOutTab.addEventListener("click", logOut);


if(toogleProfile)
{
	if(isLogined=="1")
	{
		document.querySelector(".myProfile").style.display="block";
		profile();
		document.querySelector(".signInBlock").style.display="none";
	}
	else
	{
		document.querySelector(".signInBlock").style.display="block";
		document.querySelector(".myProfile").style.display="none";
	}
}




// Save data to sessionStorage

// Get saved data from sessionStorage
//let data = sessionStorage.getItem('key');

// Remove saved data from sessionStorage
//sessionStorage.removeItem('key');

// Remove all saved data from sessionStorage
//sessionStorage.clear();


if(isLogined=="1" && localStorage.getItem('currentUser')!="")
{
	// profile();
	signInTab.innerHTML="<a class='nav-link' href='signIn.html' >"+localStorage.getItem('currentUser') +" <span><i class='fas fa-user ml-1 mr-2'></i></span> </a>";
	signOutTab.innerHTML="<a class='nav-link' href='signUp.html' >"+"LOGOUT" +" <span><i class='fas fa-user-plus ml-1 mr-2'></i></span> </a>";
}
console.log(isLogined +" - - "+localStorage.getItem('currentUser')+" - - "+sessionStorage.getItem('studName'));




function signUp()
{
	console.log(isLogined);

	if(isLogined=="0")
	{
		studId=document.querySelector("#signUp input[type='text']").value;
		studName=document.querySelector("#signUp input[type='name']").value;
		studEmail=document.querySelector("#signUp input[type='email']").value;
		studPass=document.querySelector("#signUp input[type='password']").value;
		if(document.querySelector("#male").checked)
			studGender="Male";
		else
			studGender="Female";
		if(studName!="" && studEmail!="" && studPass!="" &&(document.querySelector("#male").checked)||document.querySelector("#female").checked )
		{	isLogined="1";
			localStorage.setItem('currentUser',studName) ;
			// Save data to sessionStorage
			sessionStorage.setItem('studId', studId);
			sessionStorage.setItem('studName', studName);
			sessionStorage.setItem('studEmail', studEmail);
			sessionStorage.setItem('studPass', studPass);
			sessionStorage.setItem('studGender', studGender);



			if(JSON.parse(localStorage.getItem('studentProfiles'))==null)
			{
			allCredentials=[];}
			else
			{
			allCredentials=JSON.parse(localStorage.getItem('studentProfiles'));}

			allCredentials.push({
				studId: studId,
				studName: studName,
				studEmail: studEmail,
				studPass: studPass,
				studGender: studGender

			});
			localStorage.setItem('studentProfiles', JSON.stringify(allCredentials));
			
			sessionStorage.setItem('isLogined', "1");
			studId=document.querySelector("#signUp input[type='text']").value="";
			studName=document.querySelector("#signUp input[type='name']").value="";
			studEmail=document.querySelector("#signUp input[type='email']").value="";
			studPass=document.querySelector("#signUp input[type='password']").value="";

			signInTab.innerHTML="<a class='nav-link' href='signIn.html' >"+sessionStorage.getItem("studName") +" <span><i class='fas fa-user ml-1 mr-2'></i></span> </a>"
			signOutTab.innerHTML="<a class='nav-link' href='signUp.html' >"+"LOGOUT" +" <span><i class='fas fa-user-plus ml-1 mr-2'></i></span> </a>";

			window.location.href = "index.html";
			




		}
		else
		{
			console.log("Please enter all information");
		}
	}	
	else
	{
		console.log(sessionStorage.getItem('studId')+" Already Logined");
	}

}



function signIn()
{
	var credFound=false;
	var stdId=document.querySelector("#login input[type='text']").value;
	var studPass=document.querySelector("#login input[type='password']").value;

	if(credFound)
	{
			sessionStorage.setItem('studPass', studPass);
			sessionStorage.setItem('studGender', studGender);

			localStorage.setItem('a',5);

	}

}



function logOut()
{
	clearSession();
	    localStorage.setItem('currentUser',"");
		signInTab.innerHTML="<a class='nav-link' href='signIn.html' >"+"SIGNIN" +" <span><i class='fas fa-user ml-1 mr-2'></i></span> </a>";
		signOutTab.innerHTML="<a class='nav-link nav-buttons signOutTab' href='signUp.html'>"+"SIGNUP"+"<span><i class='fas fa-user-plus ml-1 mr-2'></i></span></a>";
		
	
		
}

function profile()
{
	document.querySelector("#stdName").innerHTML=sessionStorage.getItem("studName");
	document.querySelector("#stdID").innerHTML=sessionStorage.getItem("studId");
	document.querySelector("#stdEmail").innerHTML=sessionStorage.getItem("studEmail");
	document.querySelector("#stdGender").innerHTML=sessionStorage.getItem("studGender");
}



function clearSession()
{
	isLogined="0";
	sessionStorage.setItem('isLogined', "0");
	localStorage.setItem('currentUser',"") ;
	// Save data to sessionStorage
	sessionStorage.setItem('studId', "");
	sessionStorage.setItem('studName', "");
	sessionStorage.setItem('studEmail', "");
	sessionStorage.setItem('studPass', "");
	sessionStorage.setItem('studGender', "");
}