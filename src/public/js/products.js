document.addEventListener("DOMContentLoaded", async () => {
    const buttons = document.querySelectorAll(".add-to-cart-btn");
  
    const userInfo = await fetch("/api/sessions/current", { method: "GET" })
      .then(res => res.json())
      .then(data => data.user);
  
    let cartId = userInfo.cart;
  
    async function createCartForUser() {
      const createCartRes = await fetch("/api/carts", { method: "POST" });
      const { cart } = await createCartRes.json();
      cartId = cart._id;
  
      // Asignar el carrito recién creado al usuario
      await fetch("/api/users/assign-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });
  
      return cartId;
    }
  
    buttons.forEach(button => {
      button.addEventListener("click", async () => {
        const productId = button.getAttribute("data-id");
  
        if (!cartId) {
          cartId = await createCartForUser();
        }
  
        const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: "POST",
        });
  
        if (res.ok) {
          alert("Producto agregado al carrito!");
        } else {
          alert("Error agregando producto.");
        }
      });
    });
  });
  