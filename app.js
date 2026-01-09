const $form = document.querySelector("form#form-post");



const mySocialMedia = {
    user: [{
        name: "Joabe"
    }],
    posts: [{
        id: Date.now(),
        username: "joabe",
        content: "My first post"
    }],
    addPost(dados){
        mySocialMedia.posts.push({
            id: Date.now(),
            username: dados.username,
            content: dados.content
        });

    const $campoViewPost = document.querySelector(".viewContents");
    $campoViewPost.insertAdjacentHTML("afterbegin", 
        `<tr>
            <td>Joabe</td> 
            <td>${dados.content}</td>
            <td>
                <button type="submit" id="btn-update">
                    Editar
                </button>
                <button type="submit" id="btn-delete">
                    Deletar
                </button>
            </td>
        </tr>`);
    },
    
};

//CREATE


function createPost() {
    $form.addEventListener("submit", (infoForms) => {
        infoForms.preventDefault();
        const $campoCriaPost = document.querySelector('input[name="upost"]');

        //Colocar no html
        mySocialMedia.addPost({username:"Joabe", content: $campoCriaPost.value});
        $campoCriaPost.value = "";
    })

}

//Pegar valores do forms
//Adicionar valor no front
//Salvar o valor na Array
console.log(mySocialMedia.posts);

createPost();


//READ
