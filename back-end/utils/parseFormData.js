exports.parseFormData=function(body){
    const parseddata={...body};
    const jsonfields=['skills','workinghours'];
    jsonfields.forEach(field=>{
        if(body[field]){
            parseddata[field]=JSON.parse(body[field])
        }
    })
    return parseddata;
}