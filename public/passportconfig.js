const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const User = require('./schema')


exports.Initiolizepassport = (passport)=>{
    passport.use(new LocalStrategy(async(username,password,Done)=>{
        try{
            const user = await User.findOne({username})
            if(!user)
            {
                return Done(null,false,{message:'No User Found'})
            }
            else if(user.passport !== passport)
            {
                return Done(null,false,{message:'Wrong passwod'})
            }
            return Done(null,user)
        }
        catch(err)
        {
            return Done(err)
        }
    }))
    passport.serializerUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializer(async(id,done)=>{
        try{
            const user = await User.findById(id)
            done(null,user)
        }
        catch(err)
        {
            done(err)
        }
    })
}