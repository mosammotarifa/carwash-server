const getServiceCollection= async(db)=>{
    return db.collection('services')
}
module.exports={getServiceCollection}