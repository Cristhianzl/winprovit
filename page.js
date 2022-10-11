 async function Letter(){
    let users = fetch('https://jsonplaceholder.typicode.com/users');
    let posts = fetch('https://jsonplaceholder.typicode.com/posts');

    return Promise.all([users, posts])
    .then(res => {
        return Promise.all(res.map(r => r.json()))
    })
    .then(values => {
        let arrPosts = [];
        values[0].forEach((element, index) => {
            element['posts'] = values[1].filter(m => m.userId == element.id);
            arrPosts.push(element);
        });
        return arrPosts;
    })
    .catch(err => {
        throw Error(err);
    })
 }

 async function mainApp(){

    const data = await Letter();

    console.log("data", data);

    const html = data
                .map(user => {
                    return `
                    <div class="user col-sm-12">
                    <p>Name: ${user.name}</p>
                    <p>ID: ${user.id}</p>
                    <p>Email: ${user.email}</p>
                    <p>Street: ${user.address.street}</p>
                    <p>Phone: ${user.phone}</p>
                    ${user.posts.map(posts => {
                        return `
                        <div class="post">
                            <p><b>Post:</b> ${posts.id}</p>
                            <p><b>Title:</b> ${posts.title}</p>
                            <p><b>Body:</b> ${posts.body}</p>
                        </div>
                        `
                    }).join("")}
                    </div>
                    `
                }).join("");
                document.querySelector('#app').insertAdjacentHTML("afterbegin", html);
 }

 function alertUser(){
    window.alert("Sorry, I've got no time to do more. But for sure I can do much more :)")
}

 

 mainApp();



 
 
