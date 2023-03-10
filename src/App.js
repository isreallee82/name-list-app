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

  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(names))
  }, [names])

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
    <div className='flex flex-col items-center justify-center container mx-auto text-base'>
      <form onSubmit={handleAddNames} className='my-4'>
        <div className='text-sm'>
          <label className='block mb-2'>
            Enter names:
            <input
              type='text'
              name='names'
              className='border border-gray-400 rounded ml-2'
              value={inputValue}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className='flex justify-center'>
          <button
            type='submit'
            className='rounded-full px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
          >
            Add Names
          </button>
        </div>
      </form>
      <div className='my-4'>
        {names.map((name, index) => (
          <div
            key={index}
            className='ring-1 bg-gray-100 bg-blur pb-2 inline-block  rounded-full items-center px-2  mr-2 py-1 mb-2'
          >
            <span className='mr-2 text-xs'>{name}</span>
            <button
              onClick={() => handleDeleteName(index)}
              className='bg-red-500 text-white px-2 py-1 rounded'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
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
            <button
              onClick={() => {
                const newName = window.prompt('Enter new name:', name)
                if (newName) {
                  handleEditName(index, newName)
                }
              }}
              className='bg-yellow-500 text-white px-1 py-1 rounded ml-2'
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
