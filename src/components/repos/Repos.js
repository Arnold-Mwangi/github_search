import { useContext } from "react"
import { AppContext } from "../../context/GithubContext"
import './css/style.css'

function Repos() {

    const {Users} = useContext(AppContext);
    
    if(Array.isArray(Users)) {
        return (
            <div className="repos">
                {Users.map((repo) =>(
                    <div className="repo" key ={repo.id}>
                        <h2>{repo.name}</h2>
                        <p>{repo.description}</p>
                    </div>
                ))}
            </div>

        )
    }else{
        const{login, repos_url} = Users
        return <div><a href ={repos_url}>View {login}'s Repositories</a> </div>        
        
    }

    

}

export default Repos