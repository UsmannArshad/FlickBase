const sortArgshelper=(sort)=>{
    let sortArgs={sortby:"_id",order:"asc",limit:3,skip:0}
    for(keys in sort)
    {
        if(sort[keys])
        {
            sortArgs[keys]=sort[keys]
        }
    }
    return sortArgs
}
module.exports={sortArgshelper}