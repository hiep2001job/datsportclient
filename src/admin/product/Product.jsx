import { Checkbox, FormControlLabel, Menu, MenuItem } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdOutlineMoreHoriz } from "react-icons/md";
import { useDispatch } from "react-redux";
import productApi from "../../api/product";
import Button from "../../share/button/Button";
import DeleteForm from "../../share/form_delete/FormDelete";
import LoadingSpinner from "../../share/loading_spinner/LoadingSpinner";
import TableGeneral from "../../share/table_general/TableGeneral";
import ModalAdd from "./modal_add/ModalAdd";

const Product = () => {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isDeleteForm, setIsDeleteForm] = useState(false);
  const [allDataProduct, setAllDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const handleClose = () => {
    setIsOpenModalAdd(false);
  };
  const handleCloseForm = () => {
    setIsDeleteForm(false);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickIconDelete = () => {
    setIsDeleteForm(true);
    setAnchorEl(null);
  };
  const handleClickDeleteProduct = async () => {
    const currentUpdateDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    try {
      setIsLoading(true);
      const rs = await productApi.updateProduct({
        ...product,
        productStatus: 0,
        productUpdateDate: currentUpdateDate,
      });
      return rs;
    } catch (error) {
      console.log("error", error);
    } finally {
      getAll();
      setAnchorEl(null);
      setIsDeleteForm(false);
      setIsLoading(false);
    }
  };
  const handleClickEditProduct = async () => {};
  const handleChangeCheckboxColor = () => {};
  const handleChangeCheckboxSize = () => {};

  const getAll = async () => {
    try {
      setIsLoading(true);
      const rs = await productApi.getAll(-1);
      setAllDataProduct(rs);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  const header = [
    "No",
    "Category",
    "Brand",
    "Image",
    "Colors",
    "Sizes",
    "Name",
    "Price",
    "Qty",
    "Date Create",
    "Date Update",
    "Status",
    "Actions",
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickIconActions = async (event, product) => {
    await setAnchorEl(event.currentTarget);
    await setProduct(product);
  };

  const renderBodyDataTable = () => {
    return allDataProduct.map((product, idx) => {
      return {
        id: <span className="font-bold">{idx + 1}</span>,
        // eslint-disable-next-line jsx-a11y/alt-text
        category: product.categoryId,
        brand: product.brandId,
        image: <img src={product.productImage} alt="" />,
        colors: (
          <div>
            <label
              style={{
                display: "block",
                textAlign: "start",
                fontWeight: "bold",
              }}
            >
              Product Colors:
            </label>
            <div
              style={{
                maxWidth: "450px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center",
                fontSize: "11px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="color1"
                    value={product.color1}
                    checked={!!product.color1}
                    onChange={handleChangeCheckboxColor}
                  />
                }
                label="Blue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="color2"
                    value={product.color2}
                    checked={!!product.color2}
                    onChange={handleChangeCheckboxColor}
                  />
                }
                label="Black"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="color3"
                    value={product.color3}
                    checked={!!product.color3}
                    onChange={handleChangeCheckboxColor}
                  />
                }
                label="White"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="color4"
                    value={product.color4}
                    checked={!!product.color4}
                    onChange={handleChangeCheckboxColor}
                  />
                }
                label="Green"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="color5"
                    value={product.color5}
                    checked={!!product.color5}
                    onChange={handleChangeCheckboxColor}
                  />
                }
                label="Red"
              />
            </div>
          </div>
        ),
        sizes: (
          <div>
            <label
              style={{
                display: "block",
                textAlign: "start",
                fontWeight: "bold",
              }}
            >
              Product Sizes:
            </label>
            <div
              style={{
                maxWidth: "450px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center",
                fontSize: "11px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="productSize1"
                    value="S"
                    checked={!!product.productSize1}
                    onChange={handleChangeCheckboxSize}
                  />
                }
                label="S"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="productSize2"
                    value="M"
                    checked={!!product.productSize2}
                    onChange={handleChangeCheckboxSize}
                  />
                }
                label="M"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="productSize3"
                    value="L"
                    onChange={handleChangeCheckboxSize}
                    checked={!!product.productSize3}
                  />
                }
                label="L"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="productSize4"
                    value="XL"
                    onChange={handleChangeCheckboxSize}
                    checked={!!product.productSize4}
                  />
                }
                label="XL"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="productSize5"
                    value="XXL"
                    onChange={handleChangeCheckboxSize}
                    checked={!!product.productSize5}
                  />
                }
                label="XXL"
              />
            </div>
          </div>
        ),
        name: product.productName,
        price: product.productPrice,
        Qty: product.productQuantity,
        dateCreate: product.productCreateDate,
        dateUpdate: product.productUpdateDate,
        status: product.productStatus,
        actions: (
          <div className="flex justify-center">
            <MdOutlineMoreHoriz
              onClick={(event) => handleClickIconActions(event, product)}
              size={25}
              className="hover:cursor-pointer hover:bg-gray-400 rounded-full"
            />
          </div>
        ),
      };
    });
  };

  return (
    <div className="w-full h-full">
      <header className="flex justify-between pt-3">
        <div className="ml-auto mr-2">
          <Button
            onClick={() => setIsOpenModalAdd(true)}
            text="add product"
            height="h-12"
            fontsize="text-15"
          />
        </div>
      </header>

      {/* content list product  */}
      <div className="w-full h-500">
        <TableGeneral headers={header} body={renderBodyDataTable()} />
      </div>
      <div>
        {isOpenModalAdd && (
          <ModalAdd
            isOpenModalAdd={isOpenModalAdd}
            setIsOpenModalAdd={setIsOpenModalAdd}
            handleClose={handleClose}
            getAll={getAll}
          />
        )}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClickEditProduct}>
          <MdEdit size={20} color="#ecec34" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClickIconDelete}>
          <MdDelete color="#e02a2a" size={20} />
          Delete
        </MenuItem>
      </Menu>
      <DeleteForm
        isOpen={isDeleteForm}
        handleClose={handleCloseForm}
        handleDeleteProduct={handleClickDeleteProduct}
      />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Product;
