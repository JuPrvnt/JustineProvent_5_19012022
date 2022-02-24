// Je récupère l'id dans l'URL et je la stock dans une variable
const params = new URL(document.location).searchParams;
const id = params.get("id");

// Je définis mes constantes et variables
const article = document.querySelector("article");
const colorSelected = document.getElementById("colors");
const addToCart = document.getElementById("addToCart");
let quantitySelected;
let productAdded = [];

// Je connecte le site à l'API : si j'ai un résultat correspondant,
// Je retourne le résultat de l'API, sinon, message d'erreur
fetch("http://localhost:3000/api/products/" + id)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  })

  // Ensuite, j'affiche mes produits disponibles sur l'API
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
    article.insertAdjacentHTML("afterbegin", ficheCanape);

    // J'affiche mes options de couleurs à sélectionner
    let colorsOptions = "";
    value.colors.forEach((element) => {
      colorsOptions += `
            <option value="${element}">${element}</option>
            `;
    });
    colorSelected.insertAdjacentHTML("beforeend", colorsOptions);
  })

  // Ensuite, lors de l'event "clic" pour ajouter au panier,
  .then(() => {
    const quantitySelected = document.getElementById("quantity");

    addToCart.addEventListener("click", (event) => {
      event.preventDefault();

      // Si une couleur est sélectionnée, et une quantité est entre 0 et 100,
      // J'ajoute le produit au localStorage
      if (
        colorSelected.value &&
        quantitySelected.value > 0 &&
        quantitySelected.value < 100
      ) {
        let canapeLocalStorage = JSON.parse(localStorage.getItem("canape"));

        // Si j'ai déjà le même produit avec la même couleur au localStorage,
        if (canapeLocalStorage) {
          const res = canapeLocalStorage.findIndex((canapeStocke) => {
            return (
              canapeStocke._id === id &&
              canapeStocke.colors === colorSelected.value
            );
          });

          // Et si ma quantité est entre 0 et 100, je l'ajoute à l'ancien
          if (res >= 0) {
            if (
              canapeLocalStorage[res].quantity +
                parseInt(quantitySelected.value) <=
              100
            ) {
              canapeLocalStorage[res].quantity += parseInt(
                quantitySelected.value
              );
              const canapeDouble = JSON.stringify(canapeLocalStorage);
              localStorage.setItem("canape", canapeDouble);
            }

            // Sinon, j'ajoute un nouveau produit au localStorage
          } else {
            let newProductAdded = {
              _id: id,
              colors: colorSelected.value,
              quantity: parseInt(quantitySelected.value),
            };
            canapeLocalStorage.push(newProductAdded);
            localStorage.setItem("canape", JSON.stringify(canapeLocalStorage));
          }

          // Sinon, j'ajoute le produit au localStorage
        } else {
          let productAdded = [
            {
              _id: id,
              colors: colorSelected.value,
              quantity: parseInt(quantitySelected.value),
            },
          ];

          let productInCart = JSON.stringify(productAdded);
          localStorage.setItem("canape", productInCart);
        }

        // Sinon, j'affiche une erreur pour ajouter une quantité et une couleur
      } else {
        throw new Error("Veuillez sélectionner une quantité et une couleur.");
      }
    });
  })

  .catch((error) => {
    console.log(error);
  });

productInCart = JSON.parse(localStorage.getItem("canape"));
