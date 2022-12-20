
let userid = 1000;
let courseid = 1000;
let currentUser;
// Creaet user class and contructor


// Get all the element form html for manupulation purpose
let homeSection = document.getElementById("home") as HTMLDivElement;
let registraionSection = document.getElementById("registration") as HTMLDivElement;
let loginSection = document.getElementById("login") as HTMLDivElement;
let courseSection = document.getElementById("coursesection") as HTMLDivElement;
let selectCourse = document.getElementById("selectcourse") as HTMLDivElement;
let enrolledcourse = document.getElementById("enrolledcourse") as HTMLDivElement;
let showbtn = document.getElementById("logout") as HTMLDivElement;




class User
{
    userId: string;
    userName: string;
    userAge: number;
    userPhone: number;

    constructor(username: string,userage: number, userPhone: number)
    {
        userid++;
        this.userId = "MY"+userid.toString();
        this.userName = username;
        this.userAge = userage;
        this.userPhone = userPhone;
    }
}

// Create class for enrolled courses
class Enroll
{
    courseId: string;
    courseName: string;
    requiredDay: string;
    userId:string;

    constructor(coursename: string,requireday: string,userid: string)
    {
        courseid++;
        this.courseId = courseid.toString();
        this.courseName = coursename;
        this.requiredDay = requireday;
        this.userId = userid;
    }

}

// create array for user registraion        
let userRegister:Array<User> = new Array<User>();

// default user 
let defaultObject = new User("Yuvaraj",21,70101270);
userRegister.push(defaultObject);

// create array for Course enrollment
let userCourse:Array<Enroll> = new Array<Enroll>();

// come back to homepage
function homepage()
{
    homeSection.style.display = "block";
    registraionSection.style.display = "none";
    loginSection.style.display = "none";
    courseSection.style.display = "none";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "none";  
}
//show  register page
function Registerpage()
{
    homeSection.style.display = "none";
    registraionSection.style.display = "block";
    loginSection.style.display = "none";
    courseSection.style.display = "none";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "none";  
}
// show  loginpage
function LoginPage()
{
    homeSection.style.display = "none";
    registraionSection.style.display = "none";
    loginSection.style.display = "block";
    courseSection.style.display = "none";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "none"; 
}

// User Registrationa add user to array
function register()
{
    let enteredName = (document.getElementById("uname") as HTMLInputElement).value;
    let enteredAge = parseInt((document.getElementById("age") as HTMLInputElement).value);
    let enterdNumber = parseInt((document.getElementById("phone") as HTMLInputElement).value);

    let resp = confirm("Confirm Registration?");
    if(resp)
    {
        let userObject = new User(enteredName,enteredAge,enterdNumber);
        userRegister.push(userObject);
        let msg = `Registration Successfull!\nYour ID: ${userObject.userId}`;
        alert(msg);
        console.log(userObject.userId);
        console.log(userObject.userName);
        homepage();
    }
    else
    {
        alert("Registration cancelled!");
        homepage();
    }

}

// Check login userID
function validate()
{
    let count=0;
    let enteredUserId = (document.getElementById("userid") as HTMLInputElement).value;
    for(let i=0;i<userRegister.length;i++)
    {
        if(userRegister[i].userId == enteredUserId)
        {
            currentUser = userRegister[i].userId;
            ShowCourseSection();
            count=0;
            break;
        }
        else
        {
            count+=1;
        }
    }
    if(count>0)
    {
        alert("User ID not valid please try again!");
    }
}

// Show availabel course btn and enrolled course btn
function ShowCourseSection()
{
    logoutbtnshow();
    getName();
    homeSection.style.display = "none";
    registraionSection.style.display = "none";
    loginSection.style.display = "none";
    courseSection.style.display = "block";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "none"; 
}
// show available course for enroll
function Availablepage()
{
    logoutbtnshow();
    getName();
    homeSection.style.display = "none";
    registraionSection.style.display = "none";
    loginSection.style.display = "none";
    courseSection.style.display = "none";
    selectCourse.style.display = "block";
    enrolledcourse.style.display = "none"; 
}

//show enrolled page
function EnrolledPage()
{
    logoutbtnshow();
    getName();
    homeSection.style.display = "none";
    registraionSection.style.display = "none";
    loginSection.style.display = "none";
    courseSection.style.display = "none";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "block"; 

    let show = document.getElementById("showcourse") as HTMLElement;
    let day = document.getElementById("totalday") as HTMLElement;
    let count = 0;
    let out ="";
    let usercoursecount=0;
    for(let i=0;i<userCourse.length;i++)
    {
        if(userCourse[i].userId == currentUser)
        {
            if(userCourse[i].courseName!="")
            {
                let coursename = userCourse[i].courseName;
                let totalday = parseInt(userCourse[i].requiredDay);
                count+=totalday;
                let resp = ("<b>Course Name :</b> <span>"+coursename+"</span><br><b> Days for Course :</b><span>"+totalday+"</span><br>-----------<br>");
                out+= resp;
            }
            else
            {
                usercoursecount+=0
            }

        }
    }
    if(usercoursecount==0)
    {
        let resp = ("<b style='color:red'> No course are enrolled</b>");
        show.innerHTML = resp;
    }

    if(out!="")
    {
        show.innerHTML=out;
    }
    
    let countday = "<br><b>Total Number of days : </b><span>"+count+"</span>";
    day.innerHTML=countday;
} 

// Enroll course add userid,coursename,duration to course list
function Enrollcourse()
{
    logoutbtnshow();
    getName();
    let selectedoption = (document.getElementById("course") as HTMLSelectElement);
    let selectoptionval = selectedoption.value;
    let entereddays = (document.getElementById("days") as HTMLInputElement).value;

    let resp = confirm("Confirm to buy the course?");
    if(resp)
    {
        let buyCourse = new Enroll(selectoptionval,entereddays,currentUser);
        userCourse.push(buyCourse);
        alert("Course Enrollment Success!");
        ShowCourseSection();
        console.log(buyCourse.courseId);
        console.log(buyCourse.courseName);
        console.log(buyCourse.requiredDay);
        console.log(buyCourse.userId);
    }
    else
    {
        alert("Course Enroll Cancelled!");
    }
}

function getName()
{
    let userTitle = (document.getElementById("welcome") as HTMLElement);
    for(let i=0;i<userRegister.length;i++)
    {
        if(userRegister[i].userId == currentUser)
        {
            let welcomename = userRegister[i].userName;
            userTitle.innerHTML="Hi!<br> Mr/Miss:<yy>"+welcomename+"</yy>";
            break;
        }
        else
        {
            userTitle.innerHTML="";
        }
    }
    
}

function goback()
{
    ShowCourseSection();
}

function gobackhome()
{
    homepage();
}
function showlogoutbtn()
{
    if(currentUser>0)
    {
        showbtn.style.display = "block";
    }
}
function logout()
{
    showbtn.style.display = "none";
    currentUser = 0;
    document.getElementById("showcourse").innerHTML="";
    document.getElementById("totalday").innerHTML="";
    getName();
    homepage();
}
function logoutbtnshow()
{
    if(currentUser!=0)
    {
        showbtn.style.display = "block";
    }
}