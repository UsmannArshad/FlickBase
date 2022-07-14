
=>Installation Required:

@** 1- Server install

npm install accesscontrol@2.2.1 bcrypt body-parser@1.19.0 dotenv@8.2.0 express@4.17.1 jsonwebtoken@8.5.1 mailgen@2.0.14 mongodb@3.6.3 mongoose mongoose-aggregate-paginate-v2@1.0.42 nodemailer@6.4.17 validator@13.5.2

@** 2- client install

npm install axios@0.21.0 bootstrap@4.5.3 draft-js@0.11.7 draft-js-export-html@1.4.1 formik@2.2.6 html-to-draftjs@1.5.0 moment@2.29.1 react-bootstrap@1.4.0 react-cookies@0.1.1 react-draft-wysiwyg@1.14.5 react-google-font-loader@1.1.0 
react-moment@1.1.1 react-redux@7.2.2 react-router-bootstrap@0.25.0 react-router-dom@5.2.0 react-toastify@6.2.0 redux@4.0.5 redux-thunk@2.3.0 yup@0.32.8


=>FlickBase:
    =>dotenv:
            npm install dotenv
            Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
            example when we deploy our application.The URI of mongoDB is viisible in server.js that contains our username and password.
            and more things that need to be secure.So do this we make a .env file define variable in it and use it 
            in files by writing:
            require('dotenv').config()
            process.env.USERNAME(we can't update it print it etc)

    =>nodemon.json:
            As we know nodemon restart the server at any change in the app.Even if we change client or anyother file
            It is useleess so we can write
            {
                "watch":["server(folder that contain server)"]
            }
            now it will restart only when something in server is changed
    
    =>Making routes:
            Now we'll create different files for route not write app.get('./users') etc
            in server file How to do it?
            If we make different files then we dont have access to App(Express)
            We ll use const router=Express.route then create a new route using
            router.route('/register').post().get()
            At the end we ll export this router
            Import it in server.js using require('path')
            like userRouter=require('./routes/userRoute')
            and then whenever we get a request for the user we will go this
            router.
            App.use('./api/user',userRouter)
            Test this route in postman

    =>Registering User:
            Before Registering we have to hash passwords and create webtokens
            We'll use async so that we dont have to w8 for the response of db.
            =>use bcrypt to hash password
            =>use jsonwebtoken to create token for the user

    =>Sign In:
           Comparing Email->Comparing Pwd->Generate Token->Send Cookies

    =>Validating Token:
            To check wheter token is valid or not.We will make a middleware that will run on each route.
            But if we have some token in the header of request then it will do further things.Otherwise
            just call next(for the things that dont need any authorization like before registering or signing in)
            But if we have token in header we'll use jwt.verify.It will return us email.
            Now we have the mail of the user.
            As we r sending token from header,there may be a possibility that user no longer exist on the db
            To validate that we'll make another middleware named CheckLoggedIn it will run before getting profiles.
            Now if the token is correct we get the data of the user but user is not on db then we'll not show him profiles.
    
    =>Creating and Testing roles:
            To make roles we can use "AccessControl" library.
            https://onury.io/accesscontrol/
            npm install accesscontrol --save
            //First we have to create Schema like(in config file or ..):
            const ac=require('accesscontrol')
            let obj={
                role(user):{
                        resource(profile):{
                                        actions('create:any/own'):[attributes('*',!password)]
                        }
                },
                //(admin)
            }
            const role=new ac(obj)
            //Then we can use it as a middleware to check wheter the current user/admin is eligible for certain puropse:
            middleware(in middleware/roles.js):
            const {role}=require 'config/role'
            Make a function:see from file
            We can get permission like:
            const permission=roles.can(req.user.role)[action](resource)
            if(permission.granted){
                res.locals.permission=permission
                next()
            }
            else
            {
                return res.status(401)
            }
            We will get response from a route only if the permission is granted like admin can read any profile 
            whereas user can see its own profile only.
            Attributes:
            ('*','!password') for example user want to see his own profile.But we dont want user to see its id and password
            we can simply write !password in the attribute as we r dealing in different files so we have to send permission 
            through either next or in locals(as in code) then we can simply use
            permission.filter(user._doc)
            ._doc to get plain object if there is only * it means everything.
            for example we dont want user to see earning from yt video but channel owner can see.
            In routes file:
            in route file we have to call middleware like:
            routes.route('/profile')
            .get(CheckPermission('admin','deleteOwn','profile'),(req,res)=>{
                //it will only called when permission is granted
            res.status(200).send(permission.filter(user._doc))
            })
=>Problems:
        1)__v:
                This field is generated whenever we insert docs through mongoose.
                The __v field is called the version key. It describes the internal revision of a document. This __v field is used to track the revisions of a document. By default, its value is zero. In real practice, the __v field increments by one only when an array is updated.
                To hide this we can use:(not recommended)
                mongoose.schema({attributes},{versionKey:false})

              