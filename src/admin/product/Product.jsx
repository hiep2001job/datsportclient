import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Modals from "./modal";

// redux
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../redux/productActions";

import { openModal, closeModal } from "../../redux/modalSlice";
import { selectTotalPages, selectLastPage } from "../../redux/productSlice";

import { useEffect, useState } from "react";

function Slide() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.dataAllProducts);
  const totalPages = useSelector(selectTotalPages);
  const lastPage = useSelector(selectLastPage);

  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("totalPages: ", totalPages);
    console.log("pageNumber: ", pageNumber);
  }, [pageNumber, search]);

  useEffect(() => {
    //Get active category

    const queryProduct = {
      pageNumber: pageNumber,
      pageSize: 2,
      keyword: search,
    };

    dispatch(productActions.getAll(queryProduct));
  }, [dispatch, search, pageNumber]);

  //   const toggle = () => setModal(!modal);
  const handleCreateNew = () => {
    const payload = { id: "", actionName: "create" };
    dispatch(openModal(payload));
  };

  const handleEdit = (id) => {
    const payload = { id: id, actionName: "edit" };
    dispatch(openModal(payload));
  };

  const handleRemove = () => {
    const payload = { id: 27, actionName: "delete" };
    dispatch(openModal(payload));
  };

  const statusProduct = ["Disnable", "Enabled"];

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Add, Edit & Remove</h4>
            </div>

            <div className="card-body">
              <div id="customerList">
                <div className="row g-4 mb-3">
                  <div className="col-sm-auto">
                    <div>
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        data-bs-toggle="modal"
                        id="create-btn"
                        data-bs-target="#showModal"
                        onClick={handleCreateNew}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                      </button>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="d-flex justify-content-sm-end">
                      <div className="search-box ms-2">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search..."
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive table-card mt-3 mb-1">
                  <table
                    className="table align-middle table-nowrap"
                    id="customerTable"
                  >
                    <thead className="table-light">
                      <tr>
                        <th>Product Name</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>product Hot</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {allProducts.map((product, index) => (
                        <tr key={index}>
                          <td className="id" style={{ display: "none" }}></td>
                          <td className="customer_name">
                            {product.productName}
                          </td>
                          <td className="customer_name">
                            <img src={product.productImage1} width="100px" />
                          </td>
                          <td className="category">
                            <span className="">
                              {product.category.categoryName}
                            </span>
                          </td>
                          <td className="brand">
                            <span className="">{product.brand.brandName}</span>
                          </td>
                          <td className="price">
                            <span className="">
                              {product.productPrice.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </span>
                          </td>
                          <td className="productQuantity">
                            <span className="">{product.productQuantity}</span>
                          </td>
                          <td className="productHot">
                            <span className="">
                              {product.productHot === true ? "Hot" : "Normal"}
                            </span>
                          </td>
                          <td className="status">
                            <span
                              className={`badge badge-soft-${
                                product.productStatus === 1
                                  ? "success"
                                  : "danger"
                              } text-uppercase`}
                            >
                              {statusProduct[product.productStatus]}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <div className="edit">
                                <button
                                  className="btn btn-sm btn-success edit-item-btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#showModal"
                                  onClick={() => handleEdit(product.productId)}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="remove">
                                <button
                                  className="btn btn-sm btn-danger remove-item-btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteRecordModal"
                                  onClick={handleRemove}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      {/* <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#121331,secondary:#08a88a"
                        style="width:75px;height:75px"
                      ></lord-icon> */}
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 150+ Orders We did not find any
                        orders for you search.
                      </p>
                    </div>
                  </div>
                </div>

                <Pagination>
                  <PaginationItem>
                    <PaginationLink
                      previous
                      onClick={() => setPageNumber(pageNumber - 1)}
                    />
                  </PaginationItem>
                  {Array(totalPages)
                    .fill()
                    .map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink onClick={() => setPageNumber(index)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                  {lastPage || (
                    <PaginationItem>
                      <PaginationLink
                        next
                        onClick={() => setPageNumber(pageNumber + 1)}
                      />
                    </PaginationItem>
                  )}
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add New Category</ModalHeader>
        <ModalBody>
          <div>
            <Label for="labelInput" className="form-label">
              Category Name
            </Label>
            <input className="form-control" id="labelInput" />
          </div>

          <FormGroup className="mt-2">
            <Label for="exampleSelect">Category Status</Label>
            <Input id="exampleSelect" name="select" type="select">
              <option value={0}>Off</option>
              <option value={1}>On</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}

      <Modals />
    </>
  );
}

export default Slide;
