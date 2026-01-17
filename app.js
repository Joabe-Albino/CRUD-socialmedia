const $form = document.querySelector("form#form-post");
const $btnSubmit = document.querySelector("button#btnSubmit");





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
            //Percorro meu array e adiciono ele somente no HTML ao devinir o HTMLONLY como "TRUE"
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

        // Aqui eu crio no HTML
        const $campoViewPost = document.querySelector(".viewContents");
        $campoViewPost.insertAdjacentHTML("afterbegin",
            `<tr data-id="${idInterno}">
            <td class="border border-gray-500 p-2">Joabe</td> 
            <td class="border border-gray-500 p-2">${dados.content}</td>
            <td class="border border-gray-500 p-2">
                <button type="submit" class="btn-update bg-blue-400 rounded text-sm font-bold w-auto h-8 px-4 text-white hover:bg-blue-500 hover:transition delay-150 duration-300 ease-in-out hover:scale-105 cursor-pointer">
                    Editar
                </button>
                <button type="submit" class="btn-delete bg-red-400 rounded text-sm font-bold w-auto h-8 px-4 text-white hover:bg-red-500 hover:transition delay-150 duration-300 ease-in-out hover:scale-105 cursor-pointer">
                    Deletar
                </button>
            </td>
        </tr>`);
    },
    deletePost(id) {
        const listaAtualizada = mySocialMedia.posts.filter((postAtual) => {
            return postAtual.id !== Number(id); //Se o id for diferente ele add na nova, basicamente deletando
        });
        // Dou um retorno na lista atualizada sem o Excluido
        console.log(listaAtualizada);
        mySocialMedia.posts = listaAtualizada;

    },

    // Essa função foi criada para pegar e mostrar o conteúdo do array no Input e  atribuir o data-id no btn
    pegarConteudo(id) {
        const listaAdd = mySocialMedia.posts.filter((postAtual) => {
            if (postAtual.id === Number(id)) {
                const inputAdd = document.querySelector("input[name=upost]");
                const btnSubmit = document.querySelector("button");
                inputAdd.value = postAtual.content;
                // Atribuo o data-id para Update
                $btnSubmit.setAttribute("dataUp-id", postAtual.id);


            }

        })


        // Crio o nosso botão de Clear
        $form.insertAdjacentHTML('beforeend',
            `<button type='button' id='btnUp' onclick=clearInput()>Clear</button>`
        );
    },
    updatePost(id, novoConteudo) {
        // Filtro o nosso conteúdo pelo data-id que é inserido ao clicar no btn de Editar
        // Pego o novo conteúdo e atualizo
        const PostUp = mySocialMedia.posts.filter((postAtual) => {
            if (postAtual.id === Number(id)) {
                postAtual.content = novoConteudo;
                $btnSubmit.removeAttribute('dataUp-id');

                const btnUp = document.querySelector("button#btnUp");
                btnUp.remove();
            };
        });
    }
};

function clearInput() {
    const $inputPost = document.querySelector("input[name=upost]");
    $inputPost.value = "";

    const btnUp = document.querySelector("button#btnUp");
    btnUp.remove();
}




// ---------------------------- Function READ -----------------------
mySocialMedia.readPosts();
console.log(mySocialMedia.posts);


// ---------------------------- Function CREATE -----------------------
$form.addEventListener("submit", (infoForms) => {
    infoForms.preventDefault();
    const $campoCriaPost = document.querySelector('input[name="upost"]');
    if ($campoCriaPost.value == "") {
        alert("Preencha o post antes de enviar");

        // ↓Parámetro usado para criar e não atualizar↓
    } else if ($btnSubmit.getAttribute("dataUp-id") == null) {

        //Passa os dados para o addPost
        mySocialMedia.addPost({ username: "Joabe", content: $campoCriaPost.value });
        $campoCriaPost.value = "";
    }
})



// ---------------------------- Function UPDATE -----------------------

// Seleciono a tabela para conseguir acesso ao TR com o data-id
const $table = document.querySelector("table");


$table.addEventListener("click", function (infoTableEdits) {
    // Faço a verificação se o botão Editar foi clicado
    const btnUpdate = infoTableEdits.target.classList.contains("btn-update");
    if (btnUpdate) {
        // Pego e mando o id para mostrar o conteúdo da Array selecionado e add o data-id do Update
        const trUpdate = infoTableEdits.target.closest('tr');
        const idUpdate = trUpdate.getAttribute('data-id');
        mySocialMedia.pegarConteudo(idUpdate);


    };

    // Faço a verificação para poder atualizar o array selecionado
    const idPostUp = $btnSubmit.getAttribute("dataUp-id");
    if (idPostUp != null) {
        $form.addEventListener("submit", (infoForms) => {
            infoForms.preventDefault();
            const $campoUpPost = document.querySelector('input[name="upost"]');

            mySocialMedia.updatePost(idPostUp, $campoUpPost.value);
            $campoUpPost.value = "";

            // Percorro a table excluindo as TR para poder mandar denovo no readPosts
            const linhasTable = document.querySelectorAll("table tbody tr");
            linhasTable.forEach(tr => {
                tr.remove();
            });

            mySocialMedia.readPosts();
        })

    }


});




// ---------------------------- Function DELETE -----------------------

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

