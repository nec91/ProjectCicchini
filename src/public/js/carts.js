document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");
  
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const productId = button.getAttribute("data-id");
        const cartId = button.getAttribute("data-cart-id");
  
        const confirmDelete = confirm("¿Seguro que deseas eliminar este producto del carrito?");
        if (!confirmDelete) return;
  
        try {
          const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "DELETE",
          });
  
          if (res.ok) {
            alert("Producto eliminado del carrito.");
            location.reload(); 
          } else {
            const err = await res.json();
            alert("Error al eliminar producto: " + (err.error || res.statusText));
          }
        } catch (error) {
          console.error("Error en la petición DELETE:", error);
          alert("Error eliminando producto.");
        }
      });
    });
  });
  