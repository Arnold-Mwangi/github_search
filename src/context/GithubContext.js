import { createContext, useReducer } from 'react'



export const AppContext = createContext([])

const githubReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, Users: action.payload };
        case 'SET_FOLLOWERS':
            return { ...state, Followers: action.payload };
        case 'SET_FOLLOWING':
            return { ...state, Following: action.payload };
        case 'SET_REPOS':
            return { ...state, Repositories: action.payload };
        case 'SET_REPOS_COUNT':
                return { ...state, RepositoriesCount: action.payload };
        default:
            return state;
    }
}

export default function GithubContext({ children }) {
    const [state, dispatch] = useReducer(githubReducer, {
        Users: [],
        Followers: [],
        Following: [],
        Repositories: [],
        RepositoriesCount: null,
    });



    return (
        <AppContext.Provider value={{ ...state, dispatch }}>

            {children}


        </AppContext.Provider>
    )
}
