/**
 * @jest-environment jsdom
 */

const { shoppingCart, isProductInCart, updateCart } = require("./index");

const html = `
<header class="header">
      <nav class="menu">
        <a href="#" class="link" id="open-cart">Cart</a>
        <span class="cart-total" id="productsInCart">0</span>
        <section class="cart-wrapper hide" id="cart">
          <h3>Tillagda produkter</h3>
          <ul id="products"></ul>
        </section>
      </nav>
    </header>
    <main>
      <section class="cards">
        <article class="card" data-product="Goodnight Moon">
          <h3 class="title">Goodnight Moon</h3>
          <p class="author">Av Margaret Wise Brown</p>
          <p class="about">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            unde ad modi amet deleniti explicabo debitis earum rem vel illum
            dolores, quidem quibusdam adipisci dolorem repellendus repellat
            mollitia! Voluptatem?
          </p>
          <button class="button" id="add-to-cart-button">Add to cart</button>
        </article>
        <article class="card" data-product="The Very Hungry Caterpillar">
          <h3 class="title">The Very Hungry Caterpillar</h3>
          <p class="author">Av Eric Carle</p>
          <p></p>
          <p class="about">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            unde ad modi amet deleniti explicabo debitis earum rem vel illum
            dolores, quidem quibusdam adipisci dolorem repellendus repellat
            mollitia! Voluptatem?
          </p>
          <button class="button">Add to cart</button>
        </article>
        <article class="card" data-product="A Wrinkle in Time">
          <h3 class="title">A Wrinkle in Time</h3>
          <p class="author">Av Madeleine L’Engle</p>
          <p></p>
          <p class="about">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            unde ad modi amet deleniti explicabo debitis earum rem vel illum
            dolores, quidem quibusdam adipisci dolorem repellendus repellat
            mollitia! Voluptatem?
          </p>
          <button class="button">Add to cart</button>
        </article>
        <article class="card" data-product="Where the Wild Things Are">
          <h3 class="title">Where the Wild Things Are</h3>
          <p class="author">Av Maurice Sendak</p>
          <p></p>
          <p class="about">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            unde ad modi amet deleniti explicabo debitis earum rem vel illum
            dolores, quidem quibusdam adipisci dolorem repellendus repellat
            mollitia! Voluptatem?
          </p>
          <button class="button">Add to cart</button>
        </article>
      </section>
    </main>
`;

describe("Shopping Cart Functionality", () => {
  beforeEach(() => {
    document.body.innerHTML = html;
    require("./index");
  });

  it("should add a product to the shopping cart", () => {
    // Arrange
    const addToCartButtons = document.querySelectorAll(".card .button");
    const cartTotalElement = document.getElementById("productsInCart");

    // Act
    addToCartButtons[0].click(); // Simulate adding the first product

    // Assert
    expect(shoppingCart).toContain("Goodnight Moon"); // The product should be in the shopping cart array
    expect(cartTotalElement.textContent).toBe("1"); // The cart total should now be 1
  });

  it("should not add a duplicate product to the shopping cart", () => {
    // Arrange
    const addToCartButtons = document.querySelectorAll(".card .button");
    window.alert = jest.fn(); // Mock the window.alert function

    // Act
    addToCartButtons[0].click(); // Add the first product
    addToCartButtons[0].click(); // Try to add the same product again

    // Assert
    expect(shoppingCart).toHaveLength(1); // There should still only be one product in the cart
    expect(window.alert).toHaveBeenCalledWith(
      "This book is already added tp the cart."
    ); // Alert should have been called with the correct message
  });

  it("should remove a product from the shopping cart", () => {
    // Arrange
    const addToCartButtons = document.querySelectorAll(".card .button");
    addToCartButtons[0].click(); // Add a product
    let removeButtons = document.querySelectorAll(".remove-button");

    // Act
    removeButtons[0].click(); // Remove the product

    // Assert
    expect(shoppingCart).not.toContain("Goodnight Moon"); // The product should no longer be in the shopping cart
    expect(document.getElementById("productsInCart").textContent).toBe("0"); // The cart total should be back to 0
  });
});
