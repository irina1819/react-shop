// import { useState, useEffect } from "react";
// import { Preloader } from "../components/Preloader";
// import { API_KEY, API_URL } from "../components/config";
// import { GoodsList } from "../components/GoodsList";
// import { BasketList } from "../components/BasketList";

// export function Shop() {
//   const [goods, setGoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [order, setOrder] = useState([]);
//   const [isBasketShow, setIsBasketShow] = useState(false);

//   useEffect(function getGoods() {
//     fetch(API_URL, {
//       headers: {
//         Authorization: API_KEY,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         data.featured && setGoods(data.featured);
//         setLoading(false);
//       });
//   }, []);

//   const addToBasket = (item) => {
//     const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
//     if (itemIndex < 0) {
//       const newItem = {
//         ...item,
//         quantity: 1,
//       };
//       setOrder([...order, newItem]);
//     } else {
//       const newOrder = order.map((orderItem, index) => {
//         if (index === itemIndex) {
//           return {
//             ...orderItem,
//             quantity: orderItem.quantity + 1,
//           };
//         } else {
//           return orderItem;
//         }
//       });
//       setOrder(newOrder);
//     }
//   };
//   const handleBasketShow = () => {
//     setIsBasketShow(!isBasketShow);
//   }

//   return(
//     <main className="container content">
//         <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
//         {loading ? (
//             <Preloader/>
//         ) : (
//          <GoodsList goods= {goods} addToBasket={addToBasket}/>
//         )}
//     </main>
//   ) 
// }



import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { GoodsList } from "../components/GoodsList";
import { BasketList } from "../components/BasketList";
import { Preloader } from "../components/Preloader";

export function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setIsBasketShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_URL, {
                headers: { Authorization: API_KEY },
            });
            const data = await response.json();
            setGoods(data.shop);
            setLoading(false);
        }
        fetchData();
    }, []);

    const addToBasket = (item) => {
        setOrder((prevOrder) => {
            const itemIndex = prevOrder.findIndex(
                (orderItem) => orderItem.mainId === item.mainId
            );

            if (itemIndex < 0) {
                return [...prevOrder, { ...item, quantity: 1 }];
            }

            return prevOrder.map((orderItem, index) =>
                index === itemIndex
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            );
        });
    };

    const removeFromBasket = (mainId) => {
        setOrder((prevOrder) => prevOrder.filter((item) => item.maiId !== mainId));
    };

    const incrementalQuantity = (mainId) => {
        setOrder((prevOrder) =>
            prevOrder.map((item) =>
                item.mainId === mainId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementalQuantity = (mainId) => {
        setOrder((prevOrder) =>
            prevOrder
                .map((item) => {
                    if (item.maiId === mainId) {
                        return item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : null;
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    const handleBasketShow = () => {
        setIsBasketShow((prev) => !prev);
    };

    const closeModal = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            setIsBasketShow(false);
        }
    };

    return (
        <main className="container content">
            <div className="cart-container">
                <div className="cart" onClick={handleBasketShow}>
                    <i className="material-icons">shopping_basket</i>
                    {order.length > 0 && (
                        <span className="cart-quantity">{order.length}</span>
                    )}
                </div>
            </div>

            {isBasketShow && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content">
                        <button
                            className="modal-close"
                            onClick={() => setIsBasketShow(false)}
                        >
                            &times;
                        </button>
                        <BasketList
                            order={order}
                            removeFromBasket={removeFromBasket}
                            incrementalQuantity={incrementalQuantity}
                            decrementalQuantity={decrementalQuantity}
                        />
                    </div>
                </div>
            )}

            {loading ? (
                <Preloader />
            ) : (
                <GoodsList goods={goods} addToBasket={addToBasket} />
            )}
        </main>
    );
}