import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors(
   
));

const MEDICENS=[
{
 id:1,
 Name:"calpol",
 Description:"Anti-pyretic",
 
},
{
    id:2,
    Name:"Sinarest",
    Description:"cold",
    

},
{
    id:3,
    name:"Azee 500",
    description:"anti-biotic",
    

},
{
    id:4,
    name:"Azithral",
    description:"anti-biotic",
    
},
{
    id:5,
    name:"Uritop",
    description:"diauretic",
   

}]


app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:'server is running'

    })
})

app.get("/medicens",(req,res)=>{
res.json({
    success:true,
    data:MEDICENS,
    message:"medicens fetch successfully"
})
})
app.post("/medicens",(req,res)=>{
    const {id,name,description} =req.body;
//VALIDATION

if(!id){
    return res.json({
        success:false,
        message:"id is required"
    })
}

if(!name){
    return req.json({
        success:false,
        message:"name is required"
    })
}

if(!description){
    return req.json({
        success:false,
        message:"name is required"
    })
}

const medicenswithid=MEDICENS.find((med)=>{
if (med.id ===id)
{
    return med;
}
})
if(medicenswithid){
    return res.json({
        success:false,
        message:"medicen with id already exists"
    })
}
    const medicen={
        id,
        name,
        description
    };

    MEDICENS.push(medicen)
    res.json({
        success:true,
        data:medicen,
        message:"medicen added successfully"
    })
})

app.delete("/medicens/:id",(req,res)=>{
 const {id} = req.params

 let medicenIndex =-1;

 MEDICENS.map((med,index)=>{
if (med.id==id)
{
    medicenIndex =index;
}
 })
 if (medicenIndex==-1){
    return res.json({
        success:false,
        message:"medicen not found"
    })
 }

 MEDICENS.splice(medicenIndex,1);
 res.json({
    success:true,
    message:"medicen daleted successfully",
 });
})

app.put("/medicens/:id",(req,res)=>{
    const {id} = req.params
   const {name,description} =req.body

    let medicenIndex =-1;
   
    MEDICENS.map((med,index)=>{
   if (med.id==id)
   {
       medicenIndex =index;
   }
    })
    if (medicenIndex==-1){
       return res.json({
           success:false,
           message:"medicen not found"
       })
    }

   const medicen={
    id,
     name,
     description
    }
 MEDICENS[medicenIndex] = medicen;
 res.json({
    success:true,
    data:medicen,
    message:"medicen updated successfully"
 })

})

app.patch("/medicens/name/:id",(req,res)=>{
    const {id} = req.params
   const {name} =req.body

    let medicenIndex =-1;
   
    MEDICENS.map((med,index)=>{
   if (med.id==id)
   {
       medicenIndex =index;
   }
    })
    if (medicenIndex==-1){
       return res.json({
           success:false,
           message:"medicen not found"
       })
    }

   const medicen= MEDICENS[medicenIndex];
   medicen.name=name;

 MEDICENS[medicenIndex] = medicen;
 res.json({
    success:true,
    data:medicen,
    message:"medicen name updated successfully"
 })

})

app.get("/medicens/:id",(req,res)=>{
    const {id} = req.params
   

    let medicenIndex =-1;
   
    MEDICENS.map((med,index)=>{
   if (med.id==id)
   {
       medicenIndex =index;
   }
    })
    if (medicenIndex==-1){
       return res.json({
           success:false,
           message:"medicen not found"
       })
    }

   const medicen = MEDICENS[medicenIndex]
 res.json({
    success:true,
    data:medicen,
    message:"medicen updated successfully"
 })

})

app.get("*",(req,res)=>{
 res.json({
    success:false,
    message:"API NOT FOUND"
 })
})

const PORT=5001;
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})