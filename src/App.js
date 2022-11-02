import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Result from './Pages/Result/Result';
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    //  console.log(data);
    setQuestions(data.results);
  };
  return (
    <BrowserRouter>
      <div className="app" style={{background: 'url(./ques1.png)'}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home setName={setName} name={name} fetchQuestions={fetchQuestions}/>} />
          <Route path="/result" element={<Result name={name} score={score} />} />
          <Route path="/quiz" element={<Quiz name={name} questions={questions} score={score} setScore={setScore} setQuestions={setQuestions} />} />
      </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
