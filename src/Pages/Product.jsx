import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const getCurrantePageUrl = (value) =>{
  value = Number(value);
  if(typeof value === 'number' && value <= 0){
      value = 1;
  }
  if(!value){
    value = 1;
  }
  return value
}


const Product = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [data,setData] = useState([]);
  const [orderby,setOrderby] = useState("")
  const [count,setCount] = useState(0);
  const [page , setPage] = useState(
    getCurrantePageUrl(searchParams.get("page")) || 1
  );
  const sort = "price";
  const limit = 4;

  useEffect(()=>{
    let apiUrl;
    if(orderby){
         apiUrl = ` http://localhost:3000/products?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${orderby}`
    }
    else{
      apiUrl = `http://localhost:3000/products?_page=${page}&_limit=${limit}`
    }
    fetch(apiUrl)
    .then((res)  => {
      setCount(res.headers.get("X-Total-Count"));
         return res.json()
     } )
    .then(product =>{
       setData(product);
       console.log(product);
    })
    .catch((err) => {
      console.log(err);
    })
  },[page,orderby]);

  useEffect(()=>{
      let params = {page} 
      if(orderby){
        params.orderby = orderby
      }
      setSearchParams(params)
  },[page,orderby])
  return (
    <>
     <br />
      <button style={{borderRadius:"10px ",margin:"0px 20px "}} onClick={()=>{setOrderby("asc")}}>Order by price Ascending</button>
      <button style={{borderRadius:"10px ",margin:"0px 20px "}} onClick={()=>{setOrderby("desc")}}>order by price descending</button>
      <button style={{borderRadius:"10px ",margin:"0px 20px "}} onClick={()=>{setOrderby("")}}> Reset</button>
    <div className='products' style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)",margin:"20px 5px",}}>
     {
        data.map(product =>(
            <div className="cart" key={product.id} style={{cursor:"pointer"}} >
                 <div className="container " style={{marginBottom: "50px"}}>
                <div className="card" style={{width: "20rem"}}>
                <img src={product.imageurl} style={{height: "200px",width:"100%"}} className="card-img-top" alt="rajtilak"/>
                <div className="card-body">
                    <h1 className="card-title text-center">{product.brand}</h1>
                    <h5 className="card-title text-center">{product.desc}</h5>
                    <div className="btnFlex" style={{display: "flex",justifyContent:"space-around"}} >
                    <span >₹ {product.price}</span>
                    <button   className="btn btn-success"  style={{borderRadius:"8px",padding:"4px 20px"}}>ADD</button>
                    </div>
                </div>
                </div>
                </div> 
            </div>
        ))
     }

    </div>
     <button disabled={page===1}  onClick={()=>{setPage(page-1)}}>Prev</button>
     <button>{page}</button>
     <button disabled={page===Math.ceil(count/limit)} onClick={()=>{setPage(page+1)}}>Next</button>
      </>
  )
}

export default Product
