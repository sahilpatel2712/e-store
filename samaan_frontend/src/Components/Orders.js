import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Collapse,

} from "reactstrap";
import Down from "../aseets/icons/Down";
import Up from "../aseets/icons/Up";
import { useDispatch, useSelector } from "react-redux";
import Order, { getUserOrderData } from "../redux/reducers/order";
import axios from "axios";

const CancelledProgress = () => {
  return (
    <div class="stepper-wrapper">
      <div class={`stepper-item stepper-cancel-item`}>
        <div class="step-counter step-cancel-counter bg-danger ">1</div>
        <div class="step-name text-danger ">Cacncelled</div>
      </div>
      <div class={`stepper-item stepper-cancel-item`}>
        <div class="step-counter step-cancel-counter bg-danger ">2</div>
        <div class="step-name text-danger ">Cacncelled</div>
      </div>
      <div class={`stepper-item stepper-cancel-item`}>
        <div class="step-counter step-cancel-counter bg-danger ">3</div>
        <div class="step-name text-danger ">Cacncelled</div>
      </div>
    </div>
  );
};

const StepProgress = ({ step }) => {
  return (
    <div class="stepper-wrapper">
      <div
        class={`stepper-item ${
          step === "ORDERED" || step === "SHIPPED" || step === "DELIVERED"
            ? "completed"
            : ""
        }`}
      >
        <div class="step-counter">1</div>
        <div class="step-name">Ordered</div>
      </div>
      <div
        class={`stepper-item ${
          step === "ORDERED"
            ? "active"
            : step === "DELIVERED" || step === "SHIPPED"
            ? "completed"
            : ""
        }`}
      >
        <div class="step-counter">2</div>
        <div class="step-name">Shipped</div>
      </div>
      <div
        class={`stepper-item ${
          step === "SHIPPED"
            ? "active"
            : step === "DELIVERED"
            ? "completed"
            : ""
        }`}
      >
        <div class="step-counter">3</div>
        <div class="step-name">Delivered</div>
      </div>
    </div>
  );
};

const ProductInfo = ({ product }) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="w-100">
        <div className="ProductInfo">
          <h2>Product Information</h2>
          <div className="w-[100%] flex flex-col md:flex-row justify-start">
            <div className="w-[100%]">
              <div className="ProductTable">
                <div className="ProductTableRow">
                  <div className="ProductTableTd1">WEIGHT</div>
                  <div className="ProductTableTd2">{product.productWeight}</div>
                </div>
                <div className="ProductTableRow">
                  <div className="ProductTableTd1">FLAVOUR</div>
                  <div className="ProductTableTd2">
                    {product.productFlavour}
                  </div>
                </div>
                <div className="ProductTableRow">
                  <div className="ProductTableTd1">CATEGORY</div>
                  <div className="ProductTableTd2">{product.categoryName}</div>
                </div>
              </div>
            </div>
            <div style={{ width: "100px", height: "100px" }}>
              <img src={product.productImage} alt="product" className="w-100" />
            </div>
          </div>
        </div>

        <div className="DescHeader">
          <h3>Description</h3>
          <p className="three-line-elipsis">{product.productDescription}</p>
        </div>
      </div>
    </div>
  );
};

const OrderDetails = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);

  const handleCancel = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/orders/order/update/${order.orderId}`,
        {
          status: "CANCELLED",
        },
        { headers: { authorization: auth.token } }
      );
      dispatch(getUserOrderData(auth?.user?.userId));
    } catch (error) {
      console.error("Error Cancelling Order:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F5F6F8",
        borderRadius: 10,
        padding: "2%",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="d-flex justify-content-end">
        <p
          onClick={() => setIsOpen(!isOpen)}
          className="NavImageWrapper bg-yellow-300  rounded-2xl CartContent   w-[3rem] h-[3rem]  hover:shadow-md transition-all duration-500  ease-in-out  VCenter-flex"
        >
          {isOpen ? <Up /> : <Down />}
        </p>
      </div>
      <div class="card-body">
        <dl class="row">
          <dt class="col-sm-4">Name</dt>
          <dd class="col-sm-8">{order.name}</dd>

          <dt class="col-sm-4">Address</dt>
          <dd class="col-sm-8 text-breck">{order.orderAddress}</dd>
          <dt class="col-sm-4">Order Status</dt>
          <dd
            class="col-sm-8"
            style={{
              color: order.status === "CANCELLED" ? "#e04f5d" : "#ffc107",
              fontWeight: "bold",
            }}
          >
            {order.status}
          </dd>
          <dt class="col-sm-4">Total</dt>
          <dd
            class="col-sm-8"
            style={{ fontWeight: "bold", fontSize: "larger" }}
          >
            ₹ {order.total}
          </dd>
          <dt class="col-sm-4">Order Time</dt>
          <dd class="col-sm-8">{new Date(order.createdAt).toLocaleString()}</dd>
        </dl>
      </div>
      {order.status === "CANCELLED" ? (
        <CancelledProgress />
      ) : (
        <>
          <StepProgress step={order.status} />
          {order.status !== "DELIVERED" && (
            <div className="w-100 d-flex justify-content-end">
              <button
                className="px-2 rounded "
                style={{ color: "red", border: "1px solid red" }}
                onClick={handleCancel}
              >
                Cancel Order
              </button>
            </div>
          )}
        </>
      )}
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody className="px-5">
            {order.orderInfo.map((product) => {
              return <ProductInfo product={product} />;
            })}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

const Orders = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const orderData = useSelector((state) => state.order);
  

  React.useEffect(() => {
    dispatch(getUserOrderData(auth?.user?.userId));
  }, [auth?.user?.userId]);

  return (
    <>
      <div className="w-[100%] min-h-[100vh] mt-[10rem] d-flex flex-column px-5">
        <div className="CartHeader">
          <h1>Shopping Order :</h1>
        </div>
        <div className="d-flex flex-column gap-4">
          {orderData.orderData.length !== 0 ? (
            orderData.orderData.map((order, index) => (
              <OrderDetails
                key={index}
                order={{ ...order, name: auth.user.name }}
              />
            ))
          ) : (
            <div className="d-flex flex-grow-1 justify-content-center align-items-center ">
              <h1>No Orders Found</h1>
            </div>
          )}
        </div>
      </div>

     
    </>
  );
};

export default Orders;
