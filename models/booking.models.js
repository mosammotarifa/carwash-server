const getBookingCollection=(db)=>{
    return  db.collection("booking")
}
module.exports={getBookingCollection}