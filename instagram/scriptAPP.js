const userProfiles = [
    {name: "nametest",
    email: "someemail@email.com",
    password: "1234",
    following: [],
    followers: [],
    posts: [],
    },
];
console.log(userProfiles)

let logVariable = "";

// REMOVES SPACES IN THE BEGINNING AND END

function removeSpace(string) {
    for (let i = 0; i < string.length; i++) {
        if (i === 0 && string[i] === " ") {
            string = string.slice(i+1);
            --i;
        }
    }

    for (let i = string.length-1; i > 0; i--) {
        if (i === string.length-1 && string[i] === " ") {
            string = string.slice(0, i);
            ++i;
        }
    }
    return string
}


// DB HAS EMAIL? => true: email exists; false: email does not exist

function hasEmail(email){

    email = removeSpace(email)

    for (let i = 0; i < userProfiles.length; i++) {
        let profileEmail = userProfiles[i].email
        if(email === profileEmail){
            return true
        }            
    }
    return false
} 

// WHICH USER IS LOGGED? 

function whoIsLogged () {
    if (logVariable !== "") {
        return logVariable
    }
    return false
}

// LOG USER - UPDATE VARIABLE

function logInUser(inputEmail) {
    inputEmail = removeSpace(inputEmail)

    logVariable = inputEmail;
}


// LOG OUT USER - UPDATE VARIABLE

function logOutUser() {
    logVariable = ""
}


function checkPassword(inputEmail, inputPassword) {
    inputEmail = removeSpace(inputEmail)

    let userData = getUser(inputEmail);

    if (userData.password === inputPassword){
        return true;
    } else {
        return false
    }
}

// CREATE USER

function createUser(uName, uEmail, uPassword) {
    let userData = {}
    userData.name = uName;
    userData.email = uEmail;
    userData.password = uPassword;
    userData.following = [];
    userData.followers = [];
    userData.posts = [];
    userProfiles.push(userData);
}


//GET ANY DATA FROM DB

function getUser (inputEmail) {
    for (let i = 0; i < userProfiles.length; i++) {
        if (userProfiles[i].email === inputEmail) {
            return userProfiles[i];
        }
    }
}

// IS EMAIL VALID

function validEmail (inputEmail) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    inputEmail = removeSpace(inputEmail)

    if (emailRegex.test(inputEmail)) {
        return true
    }
    return false
}

// ADD VALUE FOLLOWING USER

function followSomeUser (property, user) {
    let currentUserData = getUser(whoIsLogged());
    let profileUserData = user;

    let firstUser
    let secondUser
    
    if (property === "following") {
        firstUser = currentUserData.following;
        secondUser = profileUserData.email;
    } else if (property === "followers") {
        firstUser = profileUserData.followers;
        secondUser = currentUserData.email;
    }

    let userIndex = firstUser.indexOf(secondUser);

    if (firstUser.length === 0 || userIndex === -1) {
        firstUser.push(secondUser); 
    } else {
        let removeUser = firstUser.splice(userIndex, 1);
        firstUser = removeUser;
    }   
}

// NEW POST

function addPost(postObject) {
    for (let i = 0; i < userProfiles.length; i++) {
        let currentUser = whoIsLogged();
        if (currentUser === userProfiles[i].email) {
            let userPosts = userProfiles[i].posts;
            userPosts.push(postObject);
        }
    }
}
