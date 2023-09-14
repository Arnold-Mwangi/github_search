import { createContext, useReducer, useCallback, useEffect, useContext, useState } from 'react'
import { AppContext } from '../../context/GithubContext';
import axios from 'axios'
import logo from './logo.svg';
import './header.css';



function Header() {
    const { dispatch } = useContext(AppContext)
    const [searchQuery, setsearchQuery] = useState('');
    const [searchType, setSearchType] = useState('user')


    const handleSearch = useCallback(() => {
        const endpoint = searchType === 'user' ? 'users' : 'repositories'
        axios
            .get(`https://api.github.com/search/${endpoint}?q=${searchQuery}`)
            .then((res) => {
                dispatch({ type: 'SET_USERS', payload: res.data.items })
            })
            .catch((error) => {
                console.error('Error', error)
            });
    }, [searchQuery, searchType, dispatch]);


    useEffect(() => {

        if (!searchQuery.trim()) {
            axios
                .get(`https://api.github.com/users/github`)
                .then((res) => {
                    dispatch({ type: 'SET_USERS', payload: res.data })
                })
                .catch((error) => {
                    console.error('Error', error)
                });

        }

    }, [dispatch])

    const handleSearchButtonClick = () => {
        handleSearch(); // Call the handleSearch function when the button is clicked
    };



    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <div>
                    <input
                        type='text'
                        placeholder='search...'
                        value={searchQuery}
                        onChange={(e) => setsearchQuery(e.target.value)}
                    />
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value='user'>User</option>
                        <option vaue='repo'>Repository</option>
                    </select>
                    <button onClick={handleSearchButtonClick}>search</button>
                </div>

            </header>
        </div>
    );
}

export default Header;
