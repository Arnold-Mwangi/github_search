const accessToken = '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'
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = e.target.username.value

    fetch(`https://api.github.com/search/users?q=${user}`, {
        method: "GET",
        headers: {
            Authorization: `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`,
            Accept: 'Application/vnd.github.v3+json'
        }
    })
        .then((res) =>
            res.json()
        )
        .then(data => {
            const details = data.items
            // console.log(details)
            displayUsers(details)
        }

        )
})

function displayUsers(details) {
    const avatorDisplayer = document.querySelector('#avatorContainer')
    avatorDisplayer.innerHTML = "";
    const nameDisplayer = document.querySelector('#nameContainer')
    nameDisplayer.innerHTML = '';
    console.log(details)

    // LOOP THROUGH DETAILS
    details.forEach(item => {

        // create image element
        const avatorImage = document.createElement('img')
        avatorImage.src = item.avatar_url
        // console.log(avatorImage)

        // create element for name
        const name = document.createElement('h1')
        name.textContent = item.login

        //create element for repo link
        const repo_link = document.createElement('a');
        repo_link.addEventListener('click', (e) => {
            e.preventDefault();
            const link = e.target.href;


            fetch(repo_link, {
                method: "GET",
                headers: {
                    Authorization: `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`,
                    Accept: 'Application/vnd.github.v3+json'
                }
            })
                .then((res) =>
                    res.json()
                )
                .then(data => {
                    const details = data;
                    console.log(details);

                    // open a new tab to display repos
                    const newWindow = window.open("repos.html", "_blank")
                    newWindow.onload = function () {
                        newWindow.postMessage(details, "*");
                    }

                });
        });
        repo_link.textContent = "Repository>>"
        repo_link.href = item.repos_url
        repo_link.target = "_blank"

        const container = document.createElement('div')
        container.appendChild(avatorImage)
        container.appendChild(name)
        container.appendChild(repo_link)
        document.querySelector('.card').appendChild(container)


    });

}

// function to handle repo link click
function handleRepoClick() {

    console.log(repo_link)

}