import React, { useEffect, useState } from "react";
import CartCard from "../../Components/CartCard";

import { SkeletonCart } from "../../Components/Skeletons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrUpdateUserCart,
  getUserCartData,
} from "../../redux/reducers/cart";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { userUpdate } from "../../redux/reducers/auth";
import { addOrder } from "../../redux/reducers/order";

const Cart = () => {
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { productsData } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [FetchState, setFetchState] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [address, setAddress] = useState("");
  const { categoriesData } = useSelector((state) => state.categories);
  const [isEdit, setEdit] = useState(false);

  const handleChangeQuantity = (quantity, productId) => {
    dispatch(
      addOrUpdateUserCart({
        userId: user.userId,
        productId: productId,
        quantity: quantity,
      })
    );
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const filterCartData = () => {
    const productsInCart = cartData
      .map((cartItem) => {
        const product = productsData.find(
          (product) => product.productId === cartItem.productId
        );
        if (product) {
          return {
            cartId: cartItem.cartId,
            quantity: cartItem.quantity,
            userId: cartItem.userId,
            productId: cartItem.productId,
            productName: product.productName,
            productPrice: product.productPrice,
            productImage: product.productImage,
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);
    setData(productsInCart);
    setFetchState(true);
  };
  const getCategoryName = (categoryId) => {
    const category = categoriesData.find(
      (category) => category.categoryId === categoryId
    );
    return category ? category.categoryName : "";
  };

  const handleBuy = () => {
    const productIdsInCart = cartData.map((cartItem) => cartItem.productId);
    let productsInCart = productsData.filter((product) =>
      productIdsInCart.includes(product.productId)
    );
    productsInCart = productsInCart.map((product) => {
      const cartItem = cartData.find(
        (item) => item.productId === product.productId
      );
      return {
        ...product,
        quantity: cartItem.quantity,
      };
    });
    productsInCart = productsInCart.map((product) => ({
      ...product,
      categoryName: getCategoryName(product.categoryId),
    }));

    let orderObject = {
      userId: user.userId,
      orderAddress: user.address,
      total: total,
      orderInfo: productsInCart,
      status: "ORDERED",
    };

    dispatch(addOrder(orderObject))
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (user) {
        dispatch(getUserCartData(user.userId));
      }
      setAddress(user?.address);
    }
  }, [user]);
  useEffect(() => {
    filterCartData();
  }, [cartData]);
  useEffect(() => {
    const totalPrice = data.reduce((total, cartItem) => {
      return total + cartItem.productPrice * cartItem.quantity;
    }, 0);
    setTotal(totalPrice);
  }, [data, cartData]);

  return (
    <div className="w-[100%] min-h-[100vh] mt-[8rem]">
      <div className="responsive w-[100%] h-[100%] max-w-screen-2xl mx-auto flex flex-row justify-start  min-h-fit  ">
        <div className="CartOuter">
          <div className="CartHeader">
            <h1>Shopping Cart</h1>
          </div>
          <hr />
          <div className="CartWrapper">
            {FetchState ? (
              data && data.length !== 0 ? (
                data.map((item) => {
                  return (
                    <CartCard
                      productId={item.productId}
                      name={item.productName}
                      price={item.productPrice}
                      imagSrc={item.productImage}
                      Quantity={item.quantity}
                      handleChangeQuantity={handleChangeQuantity}
                    />
                  );
                })
              ) : (
                <h1 style={{ fontSize: "xx-large" }}>No Items Added</h1>
              )
            ) : (
              [1, 1, 1, 1, 1].map((item) => {
                return <SkeletonCart />;
              })
            )}
          </div>
        </div>
        <div className="SubtotalOuter">
          <div className="SubtotalCard">
            <div className="SubtotalHeader">
              <p>
                Subtotal : <span>{total}</span>
              </p>
            </div>
            <button onClick={handleBuy}>Proceed To Buy</button>
          </div>
        </div>
      </div>
      <FormGroup className="mx-5" style={{ width: "50%", marginTop: 60 }}>
        <Label
          for="exampleText"
          className="ms-4"
          style={{ fontSize: "x-large", fontWeight: 700 }}
        >
          Address
        </Label>
        <div className="d-flex gap-3" style={{ alignItems: "center" }}>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            value={address}
            style={{ padding: "3%", alignItems: "center" }}
            disabled={!isEdit}
            onChange={handleChangeAddress}
          />
          <Button
            style={{ height: "fit-content", minWidth: 80 }}
            onClick={() => {
              if (isEdit) {
                dispatch(userUpdate({ ...user, address: address }));
              }
              setEdit((prev) => !prev);
            }}
          >
            {isEdit ? "Update" : "Edit"}
          </Button>
        </div>
      </FormGroup>
    </div>
  );
};

export default Cart;
