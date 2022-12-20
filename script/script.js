var userid = 1000;
var courseid = 1000;
var currentUser;
// Creaet user class and contructor
// Get all the element form html for manupulation purpose
var homeSection = document.getElementById("home");
var registraionSection = document.getElementById("registration");
var loginSection = document.getElementById("login");
var courseSection = document.getElementById("coursesection");
var selectCourse = document.getElementById("selectcourse");
var enrolledcourse = document.getElementById("enrolledcourse");
var showbtn = document.getElementById("logout");
var User = /** @class */ (function () {
    function User(username, userage, userPhone) {
        userid++;
        this.userId = "MY" + userid.toString();
        this.userName = username;
        this.userAge = userage;
        this.userPhone = userPhone;
    }
    return User;
}());
// Create class for enrolled courses
var Enroll = /** @class */ (function () {
    function Enroll(coursename, requireday, userid) {
        courseid++;
        this.courseId = courseid.toString();
        this.courseName = coursename;
        this.requiredDay = requireday;
        this.userId = userid;
    }
    return Enroll;
}());
// create array for user registraion
var userRegister = new Array();
// default user 
var defaultObject = new User("Yuvaraj", 21, 70101270);
userRegister.push(defaultObject);
// create array for Course enrollment
var userCourse = new Array();
// come back to homepage
function homepage() {
    homeSection.style.display = "block";
    registraionSection.style.display = "none";
    loginSection.style.display = "none";
    courseSection.style.display = "none";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "none";
}
//show  register page
function Registerpage() {
    homeSection.style.display = "none";
    registraionSection.style.display = "block";
    loginSection.style.display = "none";
    courseSection.style.display = "none";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "none";
}
// show  loginpage
function LoginPage() {
    homeSection.style.display = "none";
    registraionSection.style.display = "none";
    loginSection.style.display = "block";
    courseSection.style.display = "none";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "none";
}
// User Registrationa add user to array
function register() {
    var enteredName = document.getElementById("uname").value;
    var enteredAge = parseInt(document.getElementById("age").value);
    var enterdNumber = parseInt(document.getElementById("phone").value);
    var resp = confirm("Confirm Registration?");
    if (resp) {
        var userObject = new User(enteredName, enteredAge, enterdNumber);
        userRegister.push(userObject);
        var msg = "Registration Successfull!\nYour ID: ".concat(userObject.userId);
        alert(msg);
        console.log(userObject.userId);
        console.log(userObject.userName);
        homepage();
    }
    else {
        alert("Registration cancelled!");
        homepage();
    }
}
// Check login userID
function validate() {
    var count = 0;
    var enteredUserId = document.getElementById("userid").value;
    for (var i = 0; i < userRegister.length; i++) {
        if (userRegister[i].userId == enteredUserId) {
            currentUser = userRegister[i].userId;
            ShowCourseSection();
            count = 0;
            break;
        }
        else {
            count += 1;
        }
    }
    if (count > 0) {
        alert("User ID not valid please try again!");
    }
}
// Show availabel course btn and enrolled course btn
function ShowCourseSection() {
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
function Availablepage() {
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
function EnrolledPage() {
    logoutbtnshow();
    getName();
    homeSection.style.display = "none";
    registraionSection.style.display = "none";
    loginSection.style.display = "none";
    courseSection.style.display = "none";
    selectCourse.style.display = "none";
    enrolledcourse.style.display = "block";
    var show = document.getElementById("showcourse");
    var day = document.getElementById("totalday");
    var count = 0;
    var out = "";
    var usercoursecount = 0;
    for (var i = 0; i < userCourse.length; i++) {
        if (userCourse[i].userId == currentUser) {
            if (userCourse[i].courseName != "") {
                var coursename = userCourse[i].courseName;
                var totalday = parseInt(userCourse[i].requiredDay);
                count += totalday;
                var resp = ("<b>Course Name :</b> <span>" + coursename + "</span><br><b> Days for Course :</b><span>" + totalday + "</span><br>-----------<br>");
                out += resp;
            }
            else {
                usercoursecount += 0;
            }
        }
    }
    if (usercoursecount == 0) {
        var resp = ("<b style='color:red'> No course are enrolled</b>");
        show.innerHTML = resp;
    }
    if (out != "") {
        show.innerHTML = out;
    }
    var countday = "<br><b>Total Number of days : </b><span>" + count + "</span>";
    day.innerHTML = countday;
}
// Enroll course add userid,coursename,duration to course list
function Enrollcourse() {
    logoutbtnshow();
    getName();
    var selectedoption = document.getElementById("course");
    var selectoptionval = selectedoption.value;
    var entereddays = document.getElementById("days").value;
    var resp = confirm("Confirm to buy the course?");
    if (resp) {
        var buyCourse = new Enroll(selectoptionval, entereddays, currentUser);
        userCourse.push(buyCourse);
        alert("Course Enrollment Success!");
        ShowCourseSection();
        console.log(buyCourse.courseId);
        console.log(buyCourse.courseName);
        console.log(buyCourse.requiredDay);
        console.log(buyCourse.userId);
    }
    else {
        alert("Course Enroll Cancelled!");
    }
}
function getName() {
    var userTitle = document.getElementById("welcome");
    for (var i = 0; i < userRegister.length; i++) {
        if (userRegister[i].userId == currentUser) {
            var welcomename = userRegister[i].userName;
            userTitle.innerHTML = "Hi!<br> Mr/Miss:<yy>" + welcomename + "</yy>";
            break;
        }
        else {
            userTitle.innerHTML = "";
        }
    }
}
function goback() {
    ShowCourseSection();
}
function gobackhome() {
    homepage();
}
function showlogoutbtn() {
    if (currentUser > 0) {
        showbtn.style.display = "block";
    }
}
function logout() {
    showbtn.style.display = "none";
    currentUser = 0;
    document.getElementById("showcourse").innerHTML = "";
    document.getElementById("totalday").innerHTML = "";
    getName();
    homepage();
}
function logoutbtnshow() {
    if (currentUser != 0) {
        showbtn.style.display = "block";
    }
}
