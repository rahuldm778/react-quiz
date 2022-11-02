import { Button, MenuItem, TextField } from '@material-ui/core';
import  {React, useState} from 'react';
import './Home.css';
import Categories from '../../Data/Categories';
import { useNavigate  } from "react-router";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function Home({name, setName, fetchQuestions }) {

    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!category || !difficulty || !name) {
          setError(true);
          return;
        } else {
          setError(false);
          fetchQuestions(category, difficulty);
          navigate("/quiz");
        }
      };

  return (
    <div className='content'>
        <div className='settings'>
            <span style={{fontSize: 30}}> Quiz Setting</span>

            <div className='settings__select'>
            {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
                <TextField 
                 style={{marginBottom : 25}} 
                 label="Enter your Name" 
                 variant='outlined'
                 onChange={(e) => setName(e.target.value)}
                 />

                <TextField 
                    style={{marginBottom : 25}} 
                    select label='Select Category' 
                    className=''variant='outlined'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                {Categories.map( (cat) => (
                        <MenuItem key={cat.category} value={cat.value}> 
                            {cat.category}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField 
                    style={{marginBottom : 25}} 
                    select 
                    label='Select Difficulty' 
                    className=''
                    variant='outlined'
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                        <MenuItem key='Easy' value='easy'> 
                            Easy
                        </MenuItem>
                        <MenuItem key='Medium' value='medium'> 
                            Medium
                        </MenuItem>
                        <MenuItem key='hard' value='hard'> 
                            Hard
                        </MenuItem>
                </TextField>

                <Button 
                    variant='contained' 
                    color='primary' 
                    size='large'
                    onClick={handleSubmit}
                >
                    Start Quiz
                </Button>
            </div>
        </div>

        <img src='/quiz.svg' className='banner' alt='quiz img' />
    </div>
  )
}

export default Home;