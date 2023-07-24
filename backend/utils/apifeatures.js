class apiFeatures{
    constructor(query,quertStr){
        this.query=query;
        this.quertStr=quertStr;
    }
    // for taking a word(name) from url checking it for case insensitive and then finding data on this(name keyword)
    search(){
    const keyword=this.quertStr.keyword
        ?{
            name:{
                $regex:this.quertStr.keyword,
                $options:"i",
            },
        }
        :{}    
        this.query=this.query.find({...keyword})
        return this
    }
    filter(){
        // when we try to filter search. so we will remove all below keywords
        const queryCopy=({...this.quertStr})
        const removeFileds=["keyword","page","limit"]
        removeFileds.forEach((key)=> delete queryCopy[key])

        // filter for rating and Price
        let quertStr=JSON.stringify(queryCopy)
        quertStr=quertStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
        this.query=this.query.find(JSON.parse(quertStr))

        return this
        
    }
    // for result per page 
    pagination(resultperpage){
        const currentPage=Number(this.query.page)
        const skip=resultperpage*(currentPage-1)
        this.query=this.query.limit(resultperpage).skip(skip)
        return this
    }
}
module.exports=apiFeatures