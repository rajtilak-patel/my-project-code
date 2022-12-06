import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const links = [
    {
     path:"/",
     title:"Home"
   },
    {
     path:"/about",
     title:"About"
   },
    {
     path:"/contact",
     title:"Contact"
   },
    {
     path:"/product",
     title:"Product"
   },
  //   {
  //    path:"/product/:product_id",
  //    title:"SingleProduct"
  //  },
    {
     path:"/login",
     title:"LogIn"
   },
  //   {
  //    path:"*",
  //    title:"NotFound"
  //  },
]
  return (
    <div style={{
      width:"80%",
      margin:"auto",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-around",
      backgroundColor:"black",
    }}>
      {
        links.map(link=>
           <Link style={{color:"white",textDecoration:"none"}} key={link.path} to={link.path}>
            {link.title}
            </Link>
          )
      }

    </div>
  )
}

export default Navbar
