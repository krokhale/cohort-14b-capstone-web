import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'

function App() {

    const [categories, setCategories] = useState();

    const fetchCategories = async () => {
        let res = await fetch('http://localhost:3000/api/v1/categories')
        let data = await res.json()
        console.log(data)
        setCategories(data)

    };

    useEffect(() => {
        fetchCategories()
    }, [])

  return (
    <>

      <div className={'grid grid-cols-12'}>
        <div className={'col-span-12 bg-gray-200 h-24'}>
            <h1 className={'text-center text-3xl mt-6 font-bold text-gray-800'}>Dashboard - App</h1>

        </div>

      </div>


    <div className={'grid grid-cols-12'}>
        <div className={'col-span-2 bg-gray-300 h-96'}>

            <ul>
                {categories && categories.map((category) => {
                    return <li key={category.id}>{category.name}</li>
                })}
            </ul>

        </div>
        <div className={'col-span-10 bg-gray-400 h-96'}>
            <p>Box 2</p>
        </div>

    </div>



    </>
  );
}

export default App;
