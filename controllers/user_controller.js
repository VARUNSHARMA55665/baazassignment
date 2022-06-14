
const User = require("../models/user");

// get sign up data
module.exports.register = async function(req,res){

    if(req.body.password.length < 3 || req.body.password.length > 25){
        return res.json(200, {
            message: "Password length should be between 3 and 25"
        })
    }

    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signup'); return}

        if(!user){
            const user = await User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            return res.json(200, {
                message: "User created successfully"
            })
        }else{
            return res.json(200, {
                message: "User already present"
            })
        }
    });

}

// login and create session for the user
module.exports.login = function(req,res){
    return res.json(200, {
        message: "User logged In"
    })
}

module.exports.getUser = async function(req,res){
    const user = await User.findById(local.user.id);
    return res.json(200,{
        message: "Information fetched",
        UsersInfo: user
    })
    
}

module.exports.updateUser = async function(req,res){
    try{
        const user = User.findById(req.body.id);
        user.name = req.body.name;
        user.email = req.body.email;
        return res.json(200,{
            message: "User updated",
            updatedUser: user
        })
    }catch(err){
        console.log('Error in updating user: ', err);
        return res.json(500, {
            message: "Internal Server Error"
        })
    }
}

module.exports.logout = function(req,res){
    req.logout();
    return res.json(500, {
        message: "User logged out"
    });
}