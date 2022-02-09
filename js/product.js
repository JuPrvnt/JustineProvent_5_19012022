// je récupère l'id dans l'URL et je la stock dans une variable 

const params = (new URL(document.location)).searchParams;
const id = params.get('id');

// je récupère l'endroit où je veux afficher mes produits

const article = document.querySelector("article");
const colorSelected = document.getElementById("colors");
const addToCart = document.getElementById("addToCart");
let quantitySelected;
let productAdded = [];

// je connecte le site à l'API : si j'ai un résultat correspondant, je retourne le résultat de l'API, sinon, message d'erreur

fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.statusText);
    })
    .then((value) => {
        const ficheCanape = `
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
                </div>
                `;
        ;
        article.insertAdjacentHTML('afterbegin', ficheCanape);

        let colorsOptions = "";
        value.colors.forEach((element) => {
            colorsOptions += `
            <option value="${element}">${element}</option>
            `
        });
        colorSelected.insertAdjacentHTML('beforeend', colorsOptions);

    })
    .then(() => {
        const quantitySelected = document.getElementById('quantity');

        addToCart.addEventListener('click', (event) => {
            event.preventDefault();
            if (colorSelected.value && quantitySelected.value > 0 && quantitySelected.value < 100) {
                // console.log(productAdded);
                let canapeLocalStorage = JSON.parse(localStorage.getItem("canape"));

                if (canapeLocalStorage) {
                    const res = canapeLocalStorage.findIndex((canapeStocke) => {
                        return canapeStocke._id === id && canapeStocke.colors === colorSelected.value;
                    });

                    if (res >= 0) {
                        canapeLocalStorage[res].quantity += parseInt(quantitySelected.value);
                        const canapeDouble = JSON.stringify(canapeLocalStorage);
                        localStorage.setItem("canape", canapeDouble);
                    } else { 
                        // si la je ne trouve pas le même canapé dans le localStorage, j'ajoute quand même ce nouveau canapé
                        // Récuperer la variable localstorage actuel et y ajouter le nouveau produit
                        // Ajouter un objet dans un array -> internet
                        let newProductAdded = {
                            _id: id,
                            colors: colorSelected.value,
                            quantity: parseInt(quantitySelected.value),
                        };
                        canapeLocalStorage.push(newProductAdded);
                        // Faire le set item avec le nouveau local storage
                        localStorage.setItem("canape", JSON.stringify(canapeLocalStorage));
                    }
                } else {
                    let productAdded = [{
                        _id: id,
                        colors: colorSelected.value,
                        quantity: parseInt(quantitySelected.value),
                    }];

                    let productInCart = JSON.stringify(productAdded);
                    localStorage.setItem("canape", productInCart);
                }
            } else {
                throw new Error("Veuillez sélectionner une quantité et une couleur.");
            }

            // console.log(addToCart);
        })
    })

    .catch((error) => {
        console.log(error)
    });