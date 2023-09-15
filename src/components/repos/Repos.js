import { useContext, useState} from "react"
import { AppContext } from "../../context/GithubContext"
import './css/style.css'


function Repos() {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const { Users, Repositories, searchType } = useContext(AppContext);
    console.log(searchType)

    const paginatedRepositories = Repositories.slice(startIndex, endIndex);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  if (Users.length > 0){
    return (
      <div>
        <div className="repos">
          {paginatedRepositories.map((repo) => (
            <div className="repo" key={repo.id}>
              <h1>Repository</h1>
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
            </div>
          ))}
        </div>
  
        <div className="pagination">
          {Array.from({ length: Math.ceil(Repositories.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  }
  
  export default Repos;
  

// function Repos() {

//     const {Users, Repositories} = useContext(AppContext);
//     console.log(Repositories)
    
//     if(Array.isArray(Users)) {
//         return (
//             <div className="repos">
//                 {Repositories.map((repo) =>(
//                     <div className="repo" key ={repo.id}>
//                         <h1>repos</h1>
//                         <h2>{repo.name}</h2>
//                         <p>{repo.description}</p>
//                     </div>
//                 ))}
//             </div>

//         )
//     }else{
//         const{login, repos_url} = Users
//         return <div><a href ={repos_url}>View {login}'s Repositories</a> </div>        
        
//     }

    

// }

// export default Repos