
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProductById } from "../../api/products";

export const Detail = () => {



const {id} = useParams()
const [productSelected,setProductSelected] = useState({})


useEffect(()=>{

  const getData = async ()=> {

    let productData = await getProductById(id)
    setProductSelected(productData)
  }
  getData()

}, [id])


console.log(productSelected)



  return (
    <div>
        <h1>Titulo : {productSelected.title}</h1>
        <img
          src={productSelected.image}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />
        <h1>Price : {productSelected.price}</h1>
        <h1>Detalle : {productSelected.description}</h1>
       
    </div>
  )
}
