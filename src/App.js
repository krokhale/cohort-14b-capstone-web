import logo from './logo.svg';
import 'antd/dist/antd.css'
import './App.css';
import {useEffect, useState} from 'react'
import {Modal, Collapse } from 'antd';
const { Panel } = Collapse;

function App() {

    const [categories, setCategories] = useState();
    const [showNewQuestion, setShowNewQuestion] = useState(false);
    const [newQuestionText, setNewQuestionText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState();
    const [questions, setQuestions] = useState();

    const fetchCategories = async () => {
        let res = await fetch('http://localhost:3000/api/v1/categories')
        let data = await res.json()
        console.log(data)
        setCategories(data)

    };

    useEffect(() => {
        fetchCategories()
    }, [])

    const createQuestion = async () => {
        console.log('create the question now, this is the question text', newQuestionText)
        // this is where we perform a fetch request and send information baack to the API
        let res = await fetch(`http://localhost:3000/api/v1/categories/${selectedCategory.id}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({questionTxt: newQuestionText})
        })
        let data = await res.json()
        console.log(data)
        setShowNewQuestion(false)
        // setCategories(data)

    };

    const switchCategory = async (cat) => {
        setSelectedCategory(cat)
        let res = await fetch(`http://localhost:3000/api/v1/categories/${cat.id}/questions`)
        let data = await res.json()
        console.log(data)
        setQuestions(data)

    };

  return (
    <>

      <div className={'grid grid-cols-12'}>
        <div className={'col-span-12 bg-gray-200 h-24'}>
            <h1 className={'text-center text-3xl mt-6 font-bold text-gray-800'}>Dashboard - App</h1>

        </div>

      </div>


    <div className={'grid grid-cols-12 border-b'}>
        <div className={'col-span-2 border-r'}>

            <ul>
                {categories && categories.map((category) => {
                    return <li key={category.id}
                               onClick={() => switchCategory(category)}
                               className={selectedCategory ? (category.id == selectedCategory.id ? 'p-8 border-b cursor-pointer bg-gray-600 text-white' : 'p-8 border-b cursor-pointer') : 'p-8 border-b cursor-pointer'}>{category.name}</li>
                })}
            </ul>

        </div>
        <div className={'col-span-10 h-96 p-10'}>

            <Modal title="New Question"
                   visible={showNewQuestion}
                   onOk={createQuestion}
                   onCancel={() => setShowNewQuestion(false)}
            >

                <textarea value={newQuestionText}
                          onChange={(event) => setNewQuestionText(event.currentTarget.value)}
                          className={'border w-full p-2'}
                          placeholder={'Type your question'}></textarea>


            </Modal>


            {selectedCategory && <button className={'py-4 px-3 bg-blue-500 rounded text-white'} onClick={() => setShowNewQuestion(true)}>New Question</button>}

            {selectedCategory && questions && <ul>
                {questions.map((question) => {
                    return <li>{question.questionTxt}</li>
                })}
            </ul>}

        </div>

    </div>



    </>
  );
}

export default App;
