import React, { useState } from "react";
import { Button, Card, CardBody, Collapse } from "reactstrap";
import Down from "../aseets/icons/Down";
import Up from "../aseets/icons/Up";

const Orders = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="w-[100%] min-h-[100vh] mt-[10rem] d-flex flex-column px-5">
      <div className="CartHeader">
        <h1>Shopping Order :</h1>
      </div>
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
            <dd class="col-sm-8">sahil patel</dd>

            <dt class="col-sm-4">Address</dt>
            <dd class="col-sm-8 text-breck">
              a-304 nilkanth avenue vstral,ahmedabad,382340
            </dd>
            <dt class="col-sm-4">Order Status</dt>
            <dd
              class="col-sm-8"
              style={{ color: "#ffc107", fontWeight: "bold" }}
            >
              SHIPPED
            </dd>
            <dt class="col-sm-4">Total</dt>
            <dd
              class="col-sm-8"
              style={{ fontWeight: "bold", fontSize: "larger" }}
            >
              ₹ 165
            </dd>
            <dt class="col-sm-4">Order Time</dt>
            <dd class="col-sm-8">
              Wed Mar 13 2024 14:18:57 GMT+0530 (India Standard Time)
            </dd>
          </dl>
        </div>
        <Collapse isOpen={isOpen}>
          <Card>
            <CardBody className="px-5">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="ProductInfo">
                    <h2>Product Information</h2>
                    <div className="w-[100%] flex flex-col md:flex-row justify-start">
                      <div className="w-[100%]">
                        <div className="ProductTable">
                          <div className="ProductTableRow">
                            <div className="ProductTableTd1">WEIGHT</div>
                            <div className="ProductTableTd2">
                              30g
                            </div>
                          </div>
                          <div className="ProductTableRow">
                            <div className="ProductTableTd1">FLAVOUR</div>
                            <div className="ProductTableTd2">
                            Chocolate
                            </div>
                          </div>
                          <div className="ProductTableRow">
                            <div className="ProductTableTd1">CATEGORY</div>
                            <div className="ProductTableTd2">
                              category
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="DescHeader">
                    <h3>Description</h3>
                    <p>loremkjdkjsdfkjh</p>
                  </div>
                </div>
                <div>productImage</div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </div>
  );
};

export default Orders;
