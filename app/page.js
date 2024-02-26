'use client'

import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 9;

  useEffect(() => {
      axios.get('http://localhost:3030/products')
      .then(res => {
          setData(res.data)
      })
  }, [])

  
  const filteredData = data.filter(item => 
    item.product.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );
  

  const lIndex = currentPage * perPage;
  const fIndex = lIndex - perPage;
  const records = filteredData.slice(fIndex, lIndex);
  const npage = Math.ceil(filteredData.length / perPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== fIndex) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if (currentPage !== lIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
  const changeCurrentPage = (id) => {
    setCurrentPage(id)
  }
  const handleChange = (e) => {
    setCurrentPage(1)
    setSearch(e.target.value)
}
  return (
    <main className="p-3 h-screen bg-green-500">
      <div className="mt-10">
        <div>
          <input className="border border-gray-500 p-1 outline-none w-full mb-2 rounded-md" 
            type="search"
            value={search}
            onChange={handleChange}
            placeholder="Search It!"/>
        </div>
          <div className="overflow-auto rounded-md">
              <table className="table-auto min-w-full divide-y divide-gray-200">
                  <thead>
                      <tr>
                          <th className="text-green-500 px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="text-green-500 px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="text-green-500 px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      </tr>
                  </thead>
            
                  <tbody className="bg-white divide-y divide-gray-200">
                     { 
                      records.map((item,index) => (
                        <tr key={index}>
                          <td className="px-6 py-2 whitespace-no-wrap capitalize">
                              {item.product}
                          </td>
                          <td className="px-6 py-2 whitespace-no-wrap capitalize">
                              {item.price}
                          </td>
                          <td className="px-6 py-2 whitespace-no-wrap capitalize">
                              {item.type}
                          </td>
                      </tr> 
                      ))
                     }
                  </tbody>
          
              </table>
              <nav>
                 <ul className="flex flex-row mt-2 p-2 gap-2 bg-white w-full overflow-auto">
                     <li className="border p-2 bg-green-500 text-white">
                        <a href="#"
                        onClick={prePage}>Prev</a>
                     </li>
                     {
                      numbers.map((n,i) => (
                        <li className={`border p-2 bg-green-500 text-white ${currentPage === n ? 'opacity-75' : ''}`} key={i}>
                            <a href="#"
                            onClick={() => changeCurrentPage(n)}>{n}</a>
                        </li>
                      ))
                     }
                     <li className="border p-2 bg-green-500 text-white">
                        <a href="#"
                        onClick={nextPage}>Next</a>
                     </li>
                 </ul>
              </nav>
          </div>
      </div>
    </main>
  );
}

