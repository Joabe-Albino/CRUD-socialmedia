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
    readPosts() {
        mySocialMedia.posts.forEach(({ id, username, content }) => {
            mySocialMedia.addPost({ id, username: username, content: content }, true);
        });
    },
    addPost(dados, htmlOnly = false) {
        const idInterno = Date.now();
        if (!htmlOnly) {
            //Cria os post no array
            mySocialMedia.posts.push({
                id: dados.id || idInterno,
                username: dados.username,
                content: dados.content
            });
        }

        const $campoViewPost = document.querySelector(".viewContents");
        $campoViewPost.insertAdjacentHTML("afterbegin",
            `<tr data-id="${idInterno}">
            <td hidden>${Date.now()}</td>
            <td>Joabe</td> 
            <td>${dados.content}</td>
            <td>
                <button type="submit" class="btn-update">
                    Editar
                </button>
                <button type="submit" class="btn-delete">
                    Deletar
                </button>
            </td>
        </tr>`);
    },
    deletePost(id) {
        const listaAtualizada = mySocialMedia.posts.filter((postAtual) => {
            return postAtual.id !== Number(id); //Se o id for diferente ele add na nova, basicamente deletando
        });
        console.log(listaAtualizada);
        mySocialMedia.posts = listaAtualizada;

    }
};



//CREATE in HTML

mySocialMedia.readPosts();
console.log(mySocialMedia.posts);


$form.addEventListener("submit", (infoForms) => {
    infoForms.preventDefault();
    const $campoCriaPost = document.querySelector('input[name="upost"]');

    //Colocar no html
    mySocialMedia.addPost({ username: "Joabe", content: $campoCriaPost.value });
    $campoCriaPost.value = "";
})



//Pegar valores do forms
//Adicionar valor no front
//Salvar o valor na Array





// ---------------------------- Function DELETE -----------------------

// Pegar informação via ID quando clicar
// trazer informações nos inputs de novo
// atualizar informações que estão no input com o mesmo id

const $table = document.querySelector("table");
$table.addEventListener("click", function (infoTable) {
    const elementoAtual = infoTable.target;
    const btnDelete = infoTable.target.classList.contains("btn-delete");
    if (btnDelete) {
        const tr = infoTable.target.closest('tr');
        const id = tr.getAttribute('data-id');
        mySocialMedia.deletePost(id);
        tr.remove();

        console.log(mySocialMedia.posts);




    }


});

