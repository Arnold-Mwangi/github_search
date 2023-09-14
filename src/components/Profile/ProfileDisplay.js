import { useContext, useState, useEffect} from "react";
import { AppContext } from "../../context/GithubContext";
import './css/style.css'

function Profile() {
    const { Users, dispatch } = useContext(AppContext);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        setImageLoading(false); // Reset imageLoading to true when Users data changes
    }, [Users]);

    if (!Users) {
        return <div>Loading...</div>;
    }

    // Destructure user data
    const {
        login,
        avatar_url,
        bio,
        name,
        type,
        company,
        location,
        followers,
        following,
        public_repos,
        public_gists,
        html_url,
        organizations_url,
        repos_url,
    } = Users;

        // Function to render a loading div if data is not available
        const renderLoading = (value) => {
            return value ? value : <div>Loading...</div>;
        };

    return (
        <>
            <div className="profile">
                <div className="profile_items">
                    <div className="profile_pic">
                    {imageLoading && <div>Loading...</div>}
                        <img 
                        src={avatar_url}
                        alt={login}
                        onLoad={() => setImageLoading(false)} />
                    </div>
                    <div className="profile_details">
                        <a href={html_url}><h2>{login}</h2></a>
                        <p><strong>Bio:</strong> {renderLoading(bio || 'N/A')}</p>
                        <p><strong>Type:</strong> {type}</p>
                        <p><strong>Company:</strong> {renderLoading(company || 'N/A')}</p>
                        <p><strong>Location:</strong> {renderLoading(location || 'N/A')}</p>
                        <p><strong>Followers:</strong> {renderLoading(followers || '0')}</p>
                        <p><strong>Following:</strong> {renderLoading(following || '0')}</p>
                        <p><strong>Public Repositories:</strong> {renderLoading(public_repos || '0')}</p>
                        <p><strong>Public Gists:</strong> {renderLoading(public_gists || '0')}</p>
                        <a href={renderLoading(repos_url)}>View Account</a>
                    </div>
                </div>
            </div>



        </>

    )

}

export default Profile