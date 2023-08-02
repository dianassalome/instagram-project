// ALERTS
const signUpLogValAlert = "Log out first before you create a new account.";
const logInLogValAlert = "You are already logged in.";
const emailTakenAlert = "Sorry, that email is already taken.";
const signUpSuccessAlert = "Thank you for your registration, welcome!";
const wrongPasswordAlert = "The password is incorrect.";
const noAccountAlert = "We don't have that account.";
const followErrorAlert = "That user does not exist."
const searchErrorAlert = "We have no results for that query."
const invalidEmailAlert = "Insert a valid email." 

// object that stores the input values from login page
let userData = {};

// object that stores the data from current visiting profile
let profileUser = {};


//EVENTS
let body = document.body;

const mainPage = document.createElement("section");
mainPage.classList.add("section__login");
body.appendChild(mainPage);

const mainBox = document.createElement("div");
mainBox.classList.add("login__container");
mainPage.appendChild(mainBox);

//STARTING PAGE
window.addEventListener("load", startingPage);

function startingPage() {
    mainBox.textContent = "";
    userData = {};

    //INPUT RADIO: LOGIN OR SIGN UP
    const logInModeBox = document.createElement("div");
    logInModeBox.classList.add("login__modeContainer");
    mainBox.appendChild(logInModeBox);
    
    const signUpLabel = document.createElement("label");
    signUpLabel.classList.add("mode__label");
    signUpLabel.textContent = "Sign up";
    signUpLabel.htmlFor = "signUp_mode"
    const signUpRadio = document.createElement("input");
    signUpRadio.type = "radio";
    signUpRadio.classList.add("mode__input");
    signUpRadio.id = "signUp_mode";
    signUpRadio.name = "entry_mode";
    signUpRadio.value = "signup";
    logInModeBox.appendChild(signUpLabel);
    logInModeBox.appendChild(signUpRadio);

    const logInLabel = document.createElement("label");
    logInLabel.classList.add("mode__label");
    logInLabel.textContent = "Log In";
    logInLabel.htmlFor = "login_mode"
    const logInRadio = document.createElement("input");
    logInRadio.type = "radio";
    logInRadio.classList.add("mode__input");
    logInRadio.id = "login_mode";
    logInRadio.name = "entry_mode";
    logInRadio.value = "login";
    logInRadio.checked = "checked";
    logInModeBox.appendChild(logInLabel);
    logInModeBox.appendChild(logInRadio);


    //LOGIN AND SIGN UP TEXT INPUTS
    const logInInputBox = document.createElement("div");
    logInInputBox.classList.add("login__inputContainer");
    mainBox.appendChild(logInInputBox);
    
    let emailBox = createTextForm("email_input", "Email");
    logInInputBox.appendChild(emailBox);

    let passwordBox = createTextForm("password_input", "Password");
    logInInputBox.appendChild(passwordBox);

    let nameBox = createTextForm("name_input", "Name");
    let idBox = createTextForm("id_input", "ID / username");
    
    let emailAlert = document.createElement("p");
    emailAlert.classList.add("red_alert");
            
    const formButton = document.createElement("button");
    formButton.classList.add("login__button");
    formButton.textContent = "Submit";
    mainBox.appendChild(formButton);
       
    // VARIABLES
    const emailInput = document.getElementById("email_input")
    const passwordInput = document.getElementById("password_input")
    
    const loginButton = document.querySelector(".login__button");
    const modeRadio = document.getElementsByClassName("mode__input");
    

    for (let i = 0; i < modeRadio.length; i++) {
        let radioValue = modeRadio[i];
         
        radioValue.addEventListener("input", getMode)
     
         function getMode(e) {
         let modeValue = e.target.value;
         clearAllInputs()

             if(modeValue === "login") {   
                let nameInput = document.querySelector("#name_input");
                let idInput = document.querySelector("#id_input");
                nameInput.value = ""
                idInput.value = ""
                logInInputBox.removeChild(nameBox);
                logInInputBox.removeChild(idBox);  
             } else if (modeValue === "signup") {
                logInInputBox.appendChild(nameBox);
                logInInputBox.appendChild(idBox);
             }
             getCurrentUserData()
         }
         
     }

    getCurrentUserData()
    
    loginButton.addEventListener("click", function() {

        if(logInRadio.checked) {  
            logIn();
        } else if (signUpRadio.checked) {
            signUp();
        }
    })
       
    function clearAllInputs() {
        emailInput.value = ""; 
        passwordInput.value = "";
        emailAlert.textContent = "";
    }
        
    function getCurrentUserData() {
        emailInput.addEventListener("input", function getEmail(e) {
            userData.email = e.target.value; 
        });
        passwordInput.addEventListener("input", function getPass(e) {
            userData.password = e.target.value; 
        });
        
        if (signUpRadio.checked) {
            const nameInput = document.querySelector("#name_input");
            nameInput.addEventListener("input", function getName(e) {
                userData.name = e.target.value; 
            });
        }
    }

    function logIn() {
        let userEmail = userData.email;
        userEmail = removeSpace(userEmail);
        let emailCheck = hasEmail(userEmail);
        
        if (emailCheck){
            let userPassword = userData.password;
            let passCheck = checkPassword(userEmail, userPassword);
            if (passCheck) {
                logInUser(userEmail);
                profileUser = getUser(userEmail);
                profilePage();
            } else {
                emailAlert.textContent = wrongPasswordAlert;
                passwordBox.appendChild(emailAlert);
            }
        } else {
            emailAlert.textContent = noAccountAlert;
            emailBox.appendChild(emailAlert);
        }        
    }
        
    function signUp() {          
        let userName = userData.name;
        let userEmail = userData.email;
        let userPassword = userData.password;
        userEmail = removeSpace(userEmail);

        let emailTaken = hasEmail(userEmail);
        let emailCheck = validEmail(userEmail);

        if (emailTaken) {
            emailAlert.textContent = emailTakenAlert;
            emailBox.appendChild(emailAlert);
        } else if (!emailCheck) {
            emailAlert.textContent = invalidEmailAlert;
            emailBox.appendChild(emailAlert);
        } else {
            createUser(userName, userEmail, userPassword);
            signUpSuccess();
        } 
    }

    function signUpSuccess() {

        mainBox.textContent = "";

        let successText = document.createElement("p");
        successText.textContent = signUpSuccessAlert;
        mainBox.appendChild(successText);
        
        const loginButton = document.createElement("button");
        loginButton.classList.add("log__button");
        loginButton.textContent = "Log In";
        mainBox.appendChild(loginButton);
    
        loginButton.addEventListener("click", startingPage);
    }
}


//PROFILE PAGE
function profilePage() {
    displayNavBar();
    displayUserName();
    displayPosts();
}

function displayNavBar() {
    mainBox.classList.add("profile__container");
    mainBox.textContent = "";

    const navBar = document.createElement("div");
    navBar.classList.add("navbar__container"); 
    mainBox.appendChild(navBar);

    const searchBox = document.createElement("div");
    searchBox.classList.add("search__container"); 
    navBar.appendChild(searchBox);
    
    const searchInput = document.createElement("input");
    searchInput.id = "search_input";
    searchInput.type = "text";
    searchInput.classList.add("search__input"); 
    searchInput.placeholder = "Insert user's email";
    searchBox.appendChild(searchInput);

    const searchIcon = document.createElement("button");
    searchIcon.classList.add("icon-box");
    searchIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>';
    searchBox.appendChild(searchIcon);

    const menuBox = document.createElement("div");
    menuBox.classList.add("menu__container"); 
    navBar.appendChild(menuBox);

    const profileIcon = document.createElement("button");
    profileIcon.classList.add("icon-box");
    profileIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>';
    menuBox.appendChild(profileIcon);

    displayPublishingButton()

    const logoutIcon = document.createElement("button");
    logoutIcon.classList.add("icon-box");
    logoutIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>';
    menuBox.appendChild(logoutIcon);

    const searchAlert = document.createElement("p");
    searchAlert.classList.add("red_alert"); 
    searchBox.appendChild(searchAlert);

    let searchedInput

    searchInput.addEventListener("input", function(e) {
        searchedInput = e.target.value;
        if (searchedInput === ""){
            searchAlert.textContent = ""; 
        }       
    })

    searchIcon.addEventListener("click", function(){

        let searchedUser = removeSpace(searchedInput);

        let searchTest = hasEmail(searchedUser);

        if (searchTest) {
            profileUser = getUser(searchedUser);
            profilePage();
        
        } else {
            searchAlert.textContent = searchErrorAlert;
        }
    })

    profileIcon.addEventListener("click", function () {
        profileUser = getUser(whoIsLogged());
        profilePage();
    });

    logoutIcon.addEventListener("click", function(){
        mainBox.classList.toggle("profile__container");
        logOutUser();
        startingPage();
    });

    // post publishing form box
    const publishBox = document.createElement("div");
    publishBox.classList.add("publish__container");
    mainBox.appendChild(publishBox); 
}

function displayPublishingButton() {
    const menuBox = document.querySelector(".menu__container");
    if(profileUser.email === whoIsLogged()) {
        const publishIcon = document.createElement("button");
        publishIcon.classList.add("icon-box");
        publishIcon.classList.add("icon__publish");
        publishIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>';
        menuBox.appendChild(publishIcon);

        publishIcon.addEventListener("click", function() {
            if (publishBox.hasChildNodes()) {
                publishBox.textContent="";
            } else {
                uploadPost()
            }
        });
    }
}

function displayUserName(){

    const userBox = document.createElement("div");
    userBox.classList.add("user__container"); 
    mainBox.appendChild(userBox);

    const userName = document.createElement("p");
    userName.classList.add("user__name");
    userName.textContent = `Name: ${profileUser.name}`; 
    userBox.appendChild(userName);

    const userFollowing = document.createElement("p");
    userFollowing.classList.add("user__following");
    const userFollowers = document.createElement("p");
    userFollowers.classList.add("user__followers");
    userBox.appendChild(userFollowing);
    userBox.appendChild(userFollowers);
    renderFollowersCountUpdate()

    const followButton = document.createElement("button");
    followButton.classList.add("follow__button");
    userBox.appendChild(followButton);
    followButtonChanger()
    
    follow();
}

function renderFollowersCountUpdate() {   
    const userFollowing = document.querySelector(".user__following");
    userFollowing.textContent = `Following: ${sumArray(profileUser.following)}`;
    const userFollowers = document.querySelector(".user__followers");
    userFollowers.textContent = `Followers: ${sumArray(profileUser.followers)}`;
}

function sumArray(array) {
    if (!array) {
        return 0
    } else {
        let sum = 0;

        for (let i = 0; i < array.length; i++) {
            sum += 1
        }

        return sum;
    }
}

function follow() {
    const followButton = document.querySelector(".follow__button");
   
    followButton.addEventListener("click", function(){
        followSomeUser("following", profileUser);
        followSomeUser("followers", profileUser);
        renderFollowersCountUpdate()
        followButtonChanger()
    })

}

function followButtonChanger(){
    const followButton = document.querySelector(".follow__button");

    let profileFollowers = profileUser.followers;
    let currentUser = whoIsLogged();

    if (profileFollowers.indexOf(currentUser) !== -1) {
        followButton.textContent = "Unfollow";
    } else {
        followButton.textContent = "Follow";
    }
}

function uploadPost() {
    let publishBox = document.querySelector(".publish__container")

    const urlBox = createTextForm("input_url", "Picture URL");
    publishBox.appendChild(urlBox);
    const descriptionBox = createTextForm("input_description", "Description");
    publishBox.appendChild(descriptionBox);

    const publishButton = document.createElement("button");
    publishButton.classList.add("log__button");
    publishButton.textContent = "Publish";
    publishBox.appendChild(publishButton);

    let postData = {};

    urlBox.addEventListener("input", function(e) {
        let inputData = e.target.value;
        postData.url = inputData;
    })

    descriptionBox.addEventListener("input", function(e) {
        let inputData = e.target.value;
        postData.description = inputData;
    })

    publishButton.addEventListener("click", function() {
        addPost(postData);
        post(postData.url, postData.description)
        publishBox.textContent="";
    });
}

function displayPosts() {
    const postsBox = document.createElement("div");
    postsBox.classList.add("posts__container"); 
    mainBox.appendChild(postsBox);

    const userPosts = profileUser.posts;

    if (userPosts.length > 0) {
        for (let i = 0; i < userPosts.length; i++) {
    
            let currentPost = userPosts[i]
    
            let image = currentPost.url;
            let text = currentPost.description;
    
            post(image, text)
        }
    }
}

function post(image, text) {
    const postsBox = document.querySelector(".posts__container");

    const postBox = document.createElement("div");
    postBox.classList.add("post__container"); 
    postsBox.appendChild(postBox);

    const postImage = document.createElement("img");
    postImage.classList.add("post__image"); 
    postImage.src=image
    postBox.appendChild(postImage);

    const postText = document.createElement("p");
    postText.classList.add("post__text"); 
    postText.textContent = text;
    postBox.appendChild(postText);
}

//login forms and post publishing form 
function createTextForm(id, content){
    const newDiv = document.createElement("div");
    newDiv.classList.add("form__container")

    const formLabel = document.createElement("label");
    formLabel.htmlFor = id;
    formLabel.classList.add("input__label");
    formLabel.textContent = content;
        
    const formInput = document.createElement("input");
    formInput.id = id;
    formInput.type = "text";
    formInput.classList.add("input__box"); 
    formInput.placeholder = content;
    
    newDiv.appendChild(formLabel);
    newDiv.appendChild(formInput);
    
    return newDiv
}

