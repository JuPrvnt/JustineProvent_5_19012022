// je récupère l'id dans l'URL et je la stock dans une variable 

let params = (new URL(document.location)).searchParams;
let id = params.get('id');

// je récupère l'endroit où je veux afficher mes produits

const idCanape = document.getElementsByClassName('item');
let colorSelected;
let quantitySelected;
let productAdded = [];

// je connecte le site à l'API : si j'ai un résultat correspondant, je retourne le résultat de l'API, sinon, message d'erreur

fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Impossible de joindre l'API !");
        }
    })
    .then(function (value) {
        // console.log(value);
        ficheCanape = `
                <article>
                <div class="item__img">
                <img src="${value.imageUrl}" alt="${value.altTxt}">
                </div>
                <div class="item__content">
    
                <div class="item__content__titlePrice">
                    <h1 id="title">${value.name}</h1>
                    <p>Prix : <span id="price">${value.price}</span>€</p>
                </div>
    
                <div class="item__content__description">
                    <p class="item__content__description__title">Description :</p>
                    <p id="description">${value.description}</p>
                </div>
    
                <div class="item__content__settings">
                    <div class="item__content__settings__color">
                    <label for="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors">
                        <option value="">--SVP, choisissez une couleur --</option>
                    </select>
                    </div>
    
                    <div class="item__content__settings__quantity">
                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                    <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                    </div>
                </div>
    
                <div class="item__content__addButton">
                    <button id="addToCart">Ajouter au panier</button>
                </div>
    
                </div>
                </article>
                `;
        ;
        idCanape[0].insertAdjacentHTML('afterbegin', ficheCanape);

        let colorsOptions = "";
        value.colors.forEach(element => {
            colorsOptions += `
            <option value="${element}">${element}</option>
            `
        });
        colorSelected = document.getElementById("colors");
        colorSelected.insertAdjacentHTML('beforeend', colorsOptions);

    })
    .then(function (canapeSelected) {
        const addToCart = document.getElementById("addToCart");
        const quantitySelected = document.getElementById('quantity');

        addToCart.addEventListener('click', (e) => {
            e.preventDefault();
            if (quantitySelected.value > 0 && quantitySelected.value < 100) {
                // console.log(quantitySelected);

                // let productAdded = {id, colorSelected, quantitySelected};
                // console.log(productAdded);

                let productAdded = {
                    _id: id,
                    colors: colorSelected.value, 
                    quantity: quantitySelected.value, 
                };

                let productInCart = JSON.stringify(productAdded);
                localStorage.setItem("canape", productInCart);

            } else {
                throw new Error("Veuillez sélectionner une quantité et une couleur.");
            }

            // console.log(addToCart);
        })
    })

    .catch((error) => {
        console.log(error)
    });