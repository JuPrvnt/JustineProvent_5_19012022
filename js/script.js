// je récupère l'endroit où je veux afficher mes produits

const produits = document.getElementById('items');

// je connecte le site à l'API : si j'ai un résultat correspondant, je retourne le résultat de l'API, sinon, message d'erreur

fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    } else {
        throw new Error("Impossible de joindre l'API !");
    }
  })
  .then(function(value) {
    console.log(value);
    let renduProduit = "";
    value.forEach(element => {
        renduProduit += `
        <a href="./html/product.html?id=42">
        <article>
          <img src="../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">Kanap name1</h3>
          <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada
            risus sapien gravida nulla nisl arcu.</p>
        </article>
      </a>
      `;
    });
    produits.insertAdjacentHTML('afterbegin', renduProduit);
});



