// import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App() {
  const [names, setNames] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const storedNames = localStorage.getItem('names')
    if (storedNames) {
      setNames(JSON.parse(storedNames))
    }
  }, [])

  // getting data from localStorage
  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(names))
  }, [names])

  // getting data from api i.e backend
  //  const [data, setData] = useState([])

  //  useEffect(() => {
  //    const fetchData = async () => {
  //      try {
  //        const response = await axios.get('127.0.0.1:3001/names')
  //        setData(response.data)
  //      } catch (error) {
  //        console.error(error)
  //      }
  //    }
  //    fetchData()
  //  }, [names])

  const handleAddNames = (event) => {
    event.preventDefault()
    const newNames = inputValue.split(',')
    const filteredNames = newNames.filter((name) => name.trim() !== '') // filter out empty names
    if (filteredNames.length > 0) {
      setNames((prevNames) => [...prevNames, ...filteredNames])
      setInputValue('')
    }
  }

  const handleDeleteName = (index) => {
    setNames((prevNames) => {
      const newNames = [...prevNames]
      newNames.splice(index, 1)
      return newNames
    })
  }

  const handleEditName = (index, newName) => {
    setNames((prevNames) => {
      const newNames = [...prevNames]
      newNames[index] = newName
      return newNames
    })
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className='flex flex-col h-screen items-center md:justify-center xs:justify-center  md:mx-auto xs:px-2 bg-gradient-to-r from-stone-800 to-gray-900 md:text-lg sm:text-base'>
      <h1 className='text-white text-3xl font-extrabold my-4'>
        Add list Names
      </h1>
      <form onSubmit={handleAddNames} className='my-4'>
        <div className='text-sm'>
          <label className='block mb-2 text-stone-300 font-bold md:text-xs'>
            Enter names:
            <input
              type='text'
              name='names'
              className='bg-stone-400 capitalize text-black px-2 py-1 focus:outline-none rounded ml-2'
              value={inputValue}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className='flex my-5 justify-center'>
          <button
            type='submit'
            className='rounded-full px-3 py-2 md:text-xs bg-stone-500 text-white'
          >
            Add Names
          </button>
        </div>
      </form>
      <div className='p-2 md:m-2 xs:m-4 md:container md:mx-auto justify-center xs:mx-10 rounded-2xl items-center ring-stone-500 '>
        {/* api */}
        {/* {data.map((item) => (
          <div
            key={item.index}
            className='ring-1 bg-gray-100 bg-blur items-center inline-block  rounded-full items-center px-2 mr-2 py-1 mb-2'
          >
            <span className='mr-2 md:text-sm capitalize xs:text-md'>
              {item.name}
            </span>

            <button
              onClick={() => {
                const newName = window.prompt('Enter new name:', item.name)
                if (newName) {
                  handleEditName(item.index, newName)
                }
              }}
              className='bg-yellow-500 text-white px-1 py-1 rounded-full ml-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-2 h-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>
            </button>
            <button
              onClick={() => handleDeleteName(item.index)}
              className='bg-red-500 text-white px-1 py-1 rounded-full ml-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.0'
                stroke='currentColor'
                class='w-2 h-2'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                />
              </svg>
            </button>
          </div>
        ))} */}
        {names.map((name, index) => (
          <div
            key={index}
            className='ring-1 bg-gray-100 bg-blur items-center inline-block  rounded-full items-center px-2 mr-2 py-1 mb-2'
          >
            <span className='mr-2 md:text-sm capitalize xs:text-md'>
              {name}
            </span>

            <button
              onClick={() => {
                const newName = window.prompt('Enter new name:', name)
                if (newName) {
                  handleEditName(index, newName)
                }
              }}
              className='bg-yellow-500 text-white px-1 py-1 rounded-full ml-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-2 h-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>
            </button>
            <button
              onClick={() => handleDeleteName(index)}
              className='bg-red-500 text-white px-1 py-1 rounded-full ml-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.0'
                stroke='currentColor'
                class='w-2 h-2'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
