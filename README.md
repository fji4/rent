# passport_demo

This basic implementation of adding Passport to an existing project was used as a demonstration for CS498 RK1. This code is provided as-is for learning purposes, and is NOT meant to be a 'starter code' for students' final projects. You are free to use it as such if you would like, but you are responsible for installing whatever packages you may want, making sure there are no bugs, and modifying the code as necessary to fit into your projects. 

## Getting started

First, `npm install`. Then make sure you have two terminals open; in one, type `npm start` to run the backend, and in the other, type `npm run dev` to run the frontend. 

Make sure you put your own database URI into `config/index.json`.

## Start code
`sudo npm install cookie-session`

`sudo npm install cookie-parser`

`sudo npm install cookie-parser -g`
## how to setup branch
https://stackoverflow.com/questions/1519006/how-do-you-create-a-remote-git-branch

## google map api key
AIzaSyDeS_Giswu2KngF138sF4-5uX2Y8euZDKs



backend schemas:
users schema{
	location: {type:String,required: true},
    city: {type:String, required: true},
    price: {type:String,required: true},
    assignedOwner: String,
    gender: String,
    contactPhone: {type:String, default:""},
    contactEmail: {type: String, default:""},
    description: String,
    datePosted: {type: Date, default: Date.now()},
    dateStarted: {type: Date, required: true},
    dateEnd: {type: Date, required: true},
    completed:{type:Boolean, default: false},
    img : {type:[String], default: []}
}

apartment schema{
	email		: String,
    password	: String,
    name        : String,
    description : String,
    ownedApt   : {type:[String],default: []},
    wishList    : {type:[String],default: []},
    userPic     : String
}

query ��count  where sort select

get example:
if (!(this.state.logged_in)) {
    axios.get(`http://localhost:3000/api/users?where={"_id": "5a2dc92d7ad47271b6b7c307"}`)
        .then(function (resp) {
            this.setState({ cur_user: resp.data.data[0], logged_in: true })
        }.bind(this)
        )
}
if (this.state.cur_user)
    console.log(this.state.cur_user.name)

