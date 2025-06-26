type EachAdmin = {
    _id:string,
    adminname:string,
    email:string,
    position:string,
}

type AdminData = {
    success:boolean,
    data:EachAdmin[]
}