const accesscontrol=require('accesscontrol')
let grantsObject={
    admin:{
        profile:{
            'create:any':['*'],
            'update:any':['*'],
            'delete:any':['*'],
            'read:any':['*']
        },
        article:{
            'create:any':['*'],
            'update:any':['*'],
            'delete:any':['*'],
            'read:any':['*']
        }
    },
    user:{
        profile:{
            'update:own':['*'],
            'read:own':['*','!password','!_id']
        }
        //everyone can read articles no roles required
    }
}
const roles=new accesscontrol(grantsObject);
module.exports={roles}