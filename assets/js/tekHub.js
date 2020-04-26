var isLogined=sessionStorage.getItem('isLogined') || "0";
var studName;
var studId;
var studEmail;
var studPass;
var studGender;

var allCredentials=[];
var signInCredential={};
var stdProfile={};

var register=document.querySelector("#register");
var signInTab=document.querySelector(".signInTab");
var toogleProfile=document.querySelector(".toogleProfile");
var signOutTab=document.querySelector(".signOutTab");
var logOutTab=document.querySelector(".logOutTab");
var signIn=document.querySelector("#signInn");
var bookProduct=document.querySelectorAll(".buy-product");



if(signIn)
 	signIn.addEventListener("click", authenticateUser);

if(register)
	register.addEventListener("click", signUp);

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


bookProduct.forEach(function(button,i)
{
	button.addEventListener("click", function()
	{
		if(isLogined=="1")
		{
			if(document.querySelectorAll(".item-availability")[i].innerText=="Yes")
			{
				document.querySelectorAll(".item-availability")[i].textContent="No";
				alert("Congratulation Your Item is booked.\nPlease collect "+document.querySelectorAll(".card-title")[i].textContent+" next working day from college at 10:00 AM");
			}
			else
				alert(document.querySelectorAll(".card-title")[i].textContent+" Not Available");
		}
		else
		{
			alert("Please login/register before booking the product");
			window.location.href= "signIn.html";
		}

	});
});


if(isLogined=="1" && localStorage.getItem('currentUser')!="")
{
	signInTab.innerHTML="<a class='nav-link' href='signIn.html' >"+localStorage.getItem('currentUser') +" <span><i class='fas fa-user ml-1 mr-2'></i></span> </a>";
	signOutTab.innerHTML="<a class='nav-link' href='signUp.html' >"+"LOGOUT" +" <span><i class='fas fa-sign-out-alt ml-1 mr-2'></i></span> </a>";
}




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
		{
			if(signUpValidation(studId,studName,studEmail,studPass))
			{	
				isLogined="1";
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
				allCredentials=JSON.parse(localStorage.getItem('studentProfiles'));
				}

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
				signOutTab.innerHTML="<a class='nav-link' href='signUp.html' >"+"LOGOUT" +" <span><i class='fas fa-sign-out-alt ml-1 mr-2'></i></span> </a>";
				window.location.href = "index.html";

			}
		}
		else
		{
			alert("Please enter all information");
		}
	}	
	else
	{

		alert(sessionStorage.getItem('studId')+" Already Logined");
	}

}


function signUpValidation(studId,studName,studEmail,studPass)
{
	if(!(/^\d{7}$/).test(studId)){
		alert("enter correct studentId. Ex: 1895270")
		return false;
	}
	else if(studName.length>=8 || studName.length<=4){
		alert("Name should be between 4 to 8 character");
		return false;
	}
	else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(studEmail)))
	 {
	    alert("please enter correct your email. Ex: abc@gmail.com");
		return false;
	}
	else if(studPass.length>=10 || studPass.length<=4){
		alert("Password should be between 5 to 10 character");
		return false;
	}

	return true;
}


function authenticateUser()
{
	var credFound=false;
	var stdId=document.querySelector("#login input[type='text']").value;
	var stdPass=document.querySelector("#login input[type='password']").value;

	allCredentials=JSON.parse(localStorage.getItem('studentProfiles'));
	
	if(stdId=="")
		document.querySelector("#login input[type='text']").setAttribute("placeholder", "Please Enter ID or email *");
	else if(!(/^\d{7}$/).test(stdId))
		alert("enter correct studentId. Ex: 1895270")
	
	else if(stdPass=="")
		document.querySelector("#login input[type='password']").setAttribute("placeholder", "Please Enter Password *");
	else if(stdPass.length>=10 || stdPass.length<=4)
		alert("Password should be between 5 to 10 character");
	else 
	{
		for(var i=0; i<allCredentials.length; i++)
		{
			if(stdId==allCredentials[i].studId && stdPass==allCredentials[i].studPass)
			{
				credFound=true;
				console.log("correct");
				sessionStorage.setItem('studId', allCredentials[i].studId);
				sessionStorage.setItem('studName', allCredentials[i].studName);
				sessionStorage.setItem('studEmail', allCredentials[i].studEmail);
				sessionStorage.setItem('studPass', allCredentials[i].studPass);
				sessionStorage.setItem('studGender', allCredentials[i].studGender);

				isLogined="1";
				sessionStorage.setItem('isLogined', "1");
				localStorage.setItem('currentUser',allCredentials[i].studName) ;

				signInTab.innerHTML="<a class='nav-link' href='signIn.html' >"+sessionStorage.getItem("studName") +" <span><i class='fas fa-user ml-1 mr-2'></i></span> </a>"
				signOutTab.innerHTML="<a class='nav-link' href='signUp.html' >"+"LOGOUT" +" <span><i class='fas fa-sign-out-alt ml-1 mr-2'></i></span> </a>";
				window.location.href = "index.html";
				break;
			}
			else
				alert("Wrong Credentials");		
		}
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