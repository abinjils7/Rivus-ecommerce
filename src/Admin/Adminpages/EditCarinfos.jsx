import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { carApi } from '../../Api'

function EditCarinfos(carid) {

    const [product,setproduct]=useState();

 
  useEffect(()=>{
    axios.get(`${carApi}`)
    .then((res)=>setproduct(res.data))
    console.log(product)
  })
  




  return (
    <div>

      <form  className="flex flex-col gap-3 p-4 max-w-sm">
      <input type="text" name="name" placeholder="Car Name"  className="border p-2 rounded" required />
      <input type="text" name="brand" placeholder="Brand"  className="border p-2 rounded" required />
      <input type="text" name="type" placeholder="Type" className="border p-2 rounded" required />
      <input type="number" name="hp" placeholder="Horsepower"  className="border p-2 rounded" required />
      <input type="number" name="price" placeholder="Price"  className="border p-2 rounded" required />
      <input type="text" name="image" placeholder="Image URL"  className="border p-2 rounded" />
      
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </form>
      
    </div>
  )
}

export default EditCarinfos
