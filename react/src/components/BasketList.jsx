import { BasketItem } from "./BasketItem";

export function BasketList({
 order,
 removeFromBasket,
 incrementalQuantity,
 decrementalQuantity,
}) {
    const calculateTotalPrice = () => {
    return order.reduce(
        (sum, item) => sum + item.price.finalPrice*item.quantity,
        0
    );
    };
    const totalPrice= calculateTotalPrice(); 

    return (
    <div className="basket-modal">
        <h2 className="collection-item active">Ваша корзина</h2>
        <ul className="cart-list">
        {order.length ? (
            order.map((item) => (
                <BasketItem 
                key={item.mainId}

                item={item}
                    
                decrementalQuantity={decrementalQuantity}
                    
                incrementalQuantity={incrementalQuantity}
                    
                removeFromBasket={removeFromBasket}
                />
            ))
        ):(
            <li className="collection-item">Корзина пуста</li>
        )}
        </ul>
        <div className="total-price">Итого:{totalPrice} V</div>
  
        
    </div>
    );
}