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

    },
    updateId(id){
        const listaAdd = mySocialMedia.posts.filter((postAtual) => {
            postAtual.id === id;
            const inputAdd = document.querySelector("input[name=upost]");
            inputAdd.value = postAtual.content;
            
        })
        
        
        $form.insertAdjacentHTML('beforeend',
            `<button type='button' onclick=clearInput()>Clear</button>`
        );
    }
};


function clearInput(){
    const $inputPost = document.querySelector("input[name=upost]");
    $inputPost.value = "";

    const btnUp = document.querySelector("button[type=button]");
    btnUp.remove();
}



// ---------------------------- Function CREATE -----------------------

mySocialMedia.readPosts();
console.log(mySocialMedia.posts);


$form.addEventListener("submit", (infoForms) => {
    infoForms.preventDefault();
    const $campoCriaPost = document.querySelector('input[name="upost"]');
    if($campoCriaPost.value == ""){
        alert("Preencha o post antes de enviar");
        
    }else{
        
            //Colocar no html
            mySocialMedia.addPost({ username: "Joabe", content: $campoCriaPost.value });
            $campoCriaPost.value = "";
    }
})



//Pegar valores do forms
//Adicionar valor no front
//Salvar o valor na Array



// ---------------------------- Function UPDATE -----------------------

// Pegar informação via ID quando clicar
// trazer informações nos inputs de novo
// atualizar informações que estão no input com o mesmo id

const $table = document.querySelector("table");


$table.addEventListener("click", function(infoTableEdits){
    const btnUpdate = infoTableEdits.target.classList.contains("btn-update");
    if(btnUpdate){
        const trUpdate = infoTableEdits.target.closest('tr');
        const idUpdate = trUpdate.getAttribute('data-id');
        
        mySocialMedia.updateId(idUpdate);
        
        
    }
     
    
});




// ---------------------------- Function DELETE -----------------------

// Pegar informação via ID quando clicar
// trazer informações nos inputs de novo
// atualizar informações que estão no input com o mesmo id

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

