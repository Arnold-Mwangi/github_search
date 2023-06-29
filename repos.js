window.addEventListener('message', receiveRepos, false);
function receiveRepos(event){
    const details = event.data
    details.forEach(item =>{
        console.log(item)
        // return our elements
        const card = document.querySelector("#card")
             // create new elements
        const cardContent = document.createElement('div')
        const repoName = document.createElement('h1')
        const languages = document.createElement('p')
        const htmLink = document.createElement('p')
        repoName.textContent = item.name
        languages.textContent = item.language
        htmLink.textContent = item.html_url

        cardContent.appendChild(repoName)
        cardContent.appendChild(languages)
        cardContent.appendChild(htmLink)
        card.appendChild(cardContent)
       
    })
}