const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const path = require('path')
const { Script } = require('vm')

//const password = 'paul123'
//const hashPasWord = bcrypt.hash(passWord, 10)

//async function hashPassword(){
   // try{ 
       //const hashedPassword = await bcrypt.hash(password, 10);
      // console.log(hashedPassword);
      // return hashedPassword;
   // } catch(error){
   // console.log(error)
  //  }
//}
//hashPassword()

//async function comparePassword(){
  //  const sentPassword = 'ighodaro';
    //const passwordToCompare = await hashPassword();
    //try {
      //   const isPassword = await bcrypt.compare(sentPassword, passwordToCompare)
        // console.log (isPassword);
    //} catch (error){
        //console.log(error)
    //}
//}
//comparePassword();

const  app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
let users =[];

app.post('/api/register', async (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email= req.body.email;
    const password = req.body.password 

    //const {firstName, lastName, email, password} = req;
    if (!firstName || !lastName || !email || !password){
        res.status(400).json({message:"all field are require"});

    }else{
        const existingUser = users.find(user => user.email===email);
            if(existingUser){
                                            //user.firstName ===firstName,
                                            // user.lastName ===lastName
        
               res.status(400).json({message:` user or ${email} aiready existed`})
    
             }else{
                try{
                    const hashedpassword=  await bcrypt.hash(password , 10)
                    const newUser  = {                       
                         firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hashedpassword
                    }
                    users.push(newUser);
                    console.log(`${users}`)

                    res.status(201).json({message: "we have created your account", user: newUser})


            } catch(error){
                res.status(500).json({message: "we are having an issues"})
            }
        }
    }
}
)

app.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, "public","home.html"))
    

});

  



// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Serve Registration Page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});



app.listen(8001, () => {
    console.log('Server is running at port 8001');
});