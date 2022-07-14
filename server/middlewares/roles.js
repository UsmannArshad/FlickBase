const {roles}=require('../config/roles')
exports.CheckPermission=function(action,resource){
    return async(req,res,next)=>
    {
        try{
            console.log(req.user.role)
            console.log(action)
            console.log(resource)
            const permission=roles.can(req.user.role)[action](resource)
            console.log(permission)
            if(!permission.granted)
            {
                return res.status(400).send('Permission not granted')
            }
            res.locals.permission=permission
            next()
        }
        catch(error){
            next(error)
        }
    }
}