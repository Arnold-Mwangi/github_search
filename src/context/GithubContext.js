import { createContext, useReducer} from 'react'



export const AppContext = createContext([])

const githubReducer = (state, action) =>{
    switch (action.type){
        case 'SET_USERS':
            return {...state, Users: action.payload};
        default:
            return state
    }
}

export default function GithubContext({children}){
    const [state, dispatch] = useReducer(githubReducer, {Users: []});    

console.log(state.Users)
    
    return(
        <AppContext.Provider value = {{...state, dispatch}}>

            {children}


        </AppContext.Provider>
    )
}
