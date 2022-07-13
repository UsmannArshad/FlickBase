const accesscontrol=require('accesscontrol')
let grantsObject={
    admin:{
        profile:{
            'create:any':['*'],
            'update:any':['*'],
            'delete:any':['*'],
            'read:any':['*']
        }
    },
    user:{
        profile:{
            'update:own':['*'],
            'read:own':['*']
        }
    }
}
const roles=new accesscontrol(grantsObject);
module.exports={roles}