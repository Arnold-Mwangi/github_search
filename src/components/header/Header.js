import { useCallback, useEffect, useContext, useState } from 'react'
import { AppContext } from '../../context/GithubContext';
import axios from 'axios'
import logo from './logo.svg';
import './css/style.css';



function Header() {
    const { Users, dispatch } = useContext(AppContext)
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

    useEffect(() => {
        // Fetch additional data when Users is an array and there is a valid search query
        if (Array.isArray(Users) &&  Users.length > 0  && searchType === 'user') {
            const firstUser = Users[0];

            // Fetch Followers
            axios
                .get(firstUser.followers_url)
                .then((res) => {
                    const followersResponse = res.data;
                    // Set followersResponse in AppContext
                    dispatch({ type: 'SET_FOLLOWERS', payload: followersResponse });
                })
                .catch((error) => {
                    console.error('Error fetching followers', error);
                });

            // Fetch Following
            axios
                .get(firstUser.following_url.replace('{/other_user}', ''))
                .then((res) => {
                    const followingResponse = res.data;
                    // Set followingResponse in AppContext
                    dispatch({ type: 'SET_FOLLOWING', payload: followingResponse });
                })
                .catch((error) => {
                    console.error('Error fetching following', error);
                });

            // Fetch Repositories
            const fetchAllRepositories = async (url) => {
                const repositories = [];
                let page = 1;

                try {
                    while (true) {
                        const response = await axios.get(url, {
                            params: { page },
                            headers: {
                                Accept: 'application/vnd.github.v3+json',
                            },
                        });

                        repositories.push(...response.data);

                        const linkHeader = response.headers.link || '';
                        if (!/rel="next"/.test(linkHeader)) {
                            break; // Exit the loop when there are no more pages
                        }

                        // Increment the page number for the next request
                        page++;
                    }

                    const totalCount = repositories.length;
                    console.log('Total repositories:', totalCount);
                    dispatch({ type: 'SET_REPOS_COUNT', payload: totalCount });
                    dispatch({ type: 'SET_REPOS', payload: repositories });
                } catch (error) {
                    console.error('Error fetching repositories:', error);
                }
            };

            // Usage:
            fetchAllRepositories(firstUser.repos_url);


            // Usage:
            fetchAllRepositories(firstUser.repos_url)
                .then((repositories) => {
                    const totalCount = repositories.length;
                    console.log(totalCount)
                    console.log('Total repositories:', totalCount);
                    // Set the total count in AppContext
                    dispatch({ type: 'SET_REPOS_COUNT', payload: totalCount });
                    
                })
                .catch((error) => {
                    console.error('Error fetching repositories:', error);
                });


        }
    }, [Users, searchQuery, dispatch]);


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
