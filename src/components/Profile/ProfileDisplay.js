import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/GithubContext";
import './css/style.css'

function Profile() {
    const { Users, dispatch, Following, Followers, RepositoriesCount } = useContext(AppContext);

    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        setImageLoading(false); // Reset imageLoading to true when Users data changes
    }, [Users]);

    // if (!Users || RepositoriesCount === null) {
    //     // Handle loading state when either Users or RepositoriesCount is not available
    //     return <div>Loading...</div>;
    // }

    let login, avatar_url, bio, type, company, location, public_repos, public_gists, html_url, repos_url;
    let follower = 0;
    let followings = 0;
    let localRepositoriesCount = null;

    if (Array.isArray(Users) && Users.length > 0) {
        const firstUser = Users[0];
        login = firstUser.login;
        avatar_url = firstUser.avatar_url;
        bio = firstUser.bio;
        type = firstUser.type;
        company = firstUser.company;
        location = firstUser.location;
        html_url = firstUser.html_url;
        repos_url = firstUser.repos_url;

        // Check if followers and following data are available
        if (Followers) {
            follower = Followers.length;
        }

        if (Following) {
            followings = Following.length;
        }

        // Check if repositories data is available
        if (RepositoriesCount) {
            localRepositoriesCount = RepositoriesCount;
        }
    } else if (Users) {
        // Handle data when Users is not an array
        login = Users.login;
        avatar_url = Users.avatar_url;
        bio = Users.bio;
        type = Users.type;
        company = Users.company;
        location = Users.location;
        follower = Users.followers || 0;
        followings = Users.following || 0;
        localRepositoriesCount  = Users.public_repos || 0;
        public_gists = Users.public_gists;
        html_url = Users.html_url;
        repos_url = Users.repos_url;
    }

    // Function to render a loading div if data is not available
    const renderLoading = (value) => {
        return value ? value : <div>Loading...</div>;
    };

    return (
        
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
                    <p><strong>Followers:</strong> {renderLoading(follower.toString())}</p>
                    <p><strong>Following:</strong> {renderLoading(followings.toString())}</p>

                    {/* Display the repository count separately */}
                    <p><strong>Public Repositories:</strong> {renderLoading(localRepositoriesCount)}</p>

                    <p><strong>Public Gists:</strong> {renderLoading(public_gists || '0')}</p>
                    <a href={renderLoading(repos_url)}>View Account</a>
                </div>
            </div>
        </div>
        
    );
}

export default Profile;
