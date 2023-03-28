import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import brandApi from "../../../api/brand";
import categoryApi from "../../../api/category";
import productApi from "../../../api/product";
import LoadingSpinner from "../../../share/loading_spinner/LoadingSpinner";

import "./ModalEdit.css";

export default function ModalEdit({
  isOpenModalEdit,
  setIsOpenModalEdit,
  handleClose,
  product,
  getAll,
}) {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataBrands, setDataBrands] = useState([]);
  const [file, setFile] = useState(null);
  // const [dataProductId, setDataProductId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [base64URL, setBase64URL] = useState("");
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      productName: "",
      productDescription: "",
      categoryId: "",
      brandId: "",
      productQuantity: "",
      productPrice: 1,
      productImage: "",
      productSize1: "",
      productSize2: "",
      productSize3: "",
      productSize4: "",
      productSize5: "",
      color1: "",
      color2: "",
      color3: "",
      color4: "",
      color5: "",
      productStatus: "",
    },
  });
  const currentDay = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const handleChangeCheckboxSize = (e) => {
    const { value, checked, name } = e.target;
    if (checked) {
      setValue(name, value);
    } else {
      setValue(name, "");
    }
  };
  const handleChangeCheckboxColor = (e) => {
    const { value, checked, name } = e.target;
    if (checked) {
      setValue(name, value);
    } else {
      setValue(name, "");
    }
  };

  useEffect(() => {
    if (product.productId) {
      setValue("productName", product.productName);
      setValue("productDescription", product.productDescription);
      setValue("categoryId", product.categoryId);
      setValue("brandId", product.brandId);
      setValue("productQuantity", product.productQuantity);
      setValue("productPrice", product.productPrice);
      setValue("productImage", product.productImage);
      setValue("productSize1", product.productSize1);
      setValue("productSize2", product.productSize2);
      setValue("productSize3", product.productSize3);
      setValue("productSize4", product.productSize4);
      setValue("productSize5", product.productSize5);
      setValue("color1", product.color1);
      setValue("color2", product.color2);
      setValue("color3", product.color3);
      setValue("color4", product.color4);
      setValue("color5", product.color5);
      setValue("productCreateDate", product.productCreateDate);
      setValue("productCreateDate", product.productCreateDate);
      setValue("productUpdateUser", product.productUpdateUser);
      setValue("productCreateUser", product.productCreateUser);
      setValue("productStatus", product.productStatus);
      setValue("productUpdateDate", currentDay);
    }
  }, [product, setValue, currentDay]);

  const handleSubmitForm = async (data) => {
    try {
      setIsLoading(true);
      const rs = await productApi.updateProduct(data);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    } finally {
      getAll();
      setIsOpenModalEdit(false);
      setIsLoading(false);
    }
  };
  const getAllDataCategory = async () => {
    try {
      const rs = await categoryApi.getAll(1);
      setDataCategory(rs);
    } catch (error) {
      return error;
    }
  };
  const getAllDataBrand = async () => {
    try {
      const rs = await brandApi.getAll(1);
      setDataBrands(rs);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getAllDataCategory();
    getAllDataBrand();
  }, []);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    let fileR = file;

    fileR = e.target.files[0];

    getBase64(fileR)
      .then((result) => {
        fileR["base64"] = result;
        setFile(fileR);
        setBase64URL(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setFile(e.target.files[0]);
  };
  return (
    <>
      <Dialog
        open={isOpenModalEdit}
        style={{ height: "100%" }}
        onClose={handleClose}
      >
        <DialogTitle className="font-bold text-20 uppercase">
          Edit Product Form
        </DialogTitle>
        <DialogContent>
          <form className="w-full overflow-hidden">
            <div className="flex items-center justify-center">
              <div>
                <div className="mb-4">
                  <label
                    className="font-semibold block"
                    htmlFor="select-category"
                  >
                    Product Category:
                  </label>
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ minWidth: "100%" }}>
                        <InputLabel id="select-category">Category</InputLabel>
                        <Select
                          labelId="select-category"
                          id="select-category"
                          label="Category"
                          name="categoryId"
                          {...field}
                        >
                          {dataCategory.map((category) => (
                            <MenuItem
                              value={category.categoryId}
                              key={category.categoryId}
                            >
                              {category.categoryName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label className="font-semibold block" htmlFor="select-brand">
                    Product Brand:
                  </label>
                  <Controller
                    name={"brandId"}
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ minWidth: "100%" }} size="small">
                        <InputLabel id="demo-select-small">Brand</InputLabel>
                        <Select
                          labelId="select-brand"
                          id="select-brand"
                          label="Brand"
                          name="brandId"
                          {...field}
                        >
                          {dataBrands.map((brand) => (
                            <MenuItem
                              value={brand.brand_id}
                              key={brand.brand_id}
                            >
                              {brand.brand_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                <Controller
                  name={"productName"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      label="Product Name"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="productDescription"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      name="productDescription"
                      label="Product Desc"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      className="textField"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="productQuantity"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Product Quantity"
                      type="number"
                      fullWidth
                      variant="standard"
                      size="small"
                      className="textField"
                    />
                  )}
                />
                <Controller
                  name="productPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      name="productPrice"
                      label="Product Price"
                      type="number"
                      fullWidth
                      variant="standard"
                      size="small"
                      className="textField"
                      {...field}
                    />
                  )}
                />
                <div className="choose-file mt-4">
                  <label
                    htmlFor="raised-button-file"
                    className="mr-4 font-semibold"
                  >
                    Product Image:
                  </label>
                  {/* <img src={product.productImage} alt="" /> */}
                  <input
                    accept="image/*"
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleFileInputChange}
                  />
                  {/* selected size product
                   */}
                </div>
                <div>
                  <label>Product Sizes:</label>
                  <Controller
                    name="productSize1"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="productSize1"
                            value="S"
                            checked={!!value}
                            onChange={handleChangeCheckboxSize}
                          />
                        }
                        label="S"
                      />
                    )}
                  />
                  <Controller
                    name="productSize2"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="productSize2"
                            value="M"
                            checked={!!value}
                            onChange={handleChangeCheckboxSize}
                          />
                        }
                        label="M"
                      />
                    )}
                  />
                  <Controller
                    name="productSize3"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="productSize3"
                            value="L"
                            checked={!!value}
                            onChange={handleChangeCheckboxSize}
                          />
                        }
                        label="L"
                      />
                    )}
                  />
                  <Controller
                    name="productSize4"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="productSize4"
                            value="XL"
                            checked={!!value}
                            onChange={handleChangeCheckboxSize}
                          />
                        }
                        label="XL"
                      />
                    )}
                  />
                  <Controller
                    name="productSize5"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="productSize5"
                            value="XXL"
                            checked={!!value}
                            onChange={handleChangeCheckboxSize}
                          />
                        }
                        label="XXL"
                      />
                    )}
                  />
                </div>
                {/* product color  */}
                <div>
                  <label>Product Colors:</label>
                  <Controller
                    name="color1"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="color1"
                            value="Blue"
                            checked={!!value}
                            onChange={handleChangeCheckboxColor}
                          />
                        }
                        label="Blue"
                      />
                    )}
                  />
                  <Controller
                    name="color2"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="color2"
                            value="Black"
                            checked={!!value}
                            onChange={handleChangeCheckboxColor}
                          />
                        }
                        label="Black"
                      />
                    )}
                  />
                  <Controller
                    name="color3"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="color3"
                            value="White"
                            checked={!!value}
                            onChange={handleChangeCheckboxColor}
                          />
                        }
                        label="White"
                      />
                    )}
                  />
                  <Controller
                    name="color4"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="color4"
                            value="Green"
                            checked={!!value}
                            onChange={handleChangeCheckboxColor}
                          />
                        }
                        label="Green"
                      />
                    )}
                  />
                  <Controller
                    name="color5"
                    control={control}
                    render={({ field: { value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="color5"
                            value="Red"
                            checked={!!value}
                            onChange={handleChangeCheckboxColor}
                          />
                        }
                        label="Red"
                      />
                    )}
                  />
                </div>
                {/* product Status  */}
                <div>
                  <label>Product Status:</label>
                  <Controller
                    name="productStatus"
                    control={control}
                    render={({ field }) => (
                      <Select
                        id="select-status"
                        label="product Status"
                        {...field}
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end ml-auto mt-8">
              <button
                onClick={() => setIsOpenModalEdit(false)}
                className="mr-2 border cursor-pointer hover:border-slate-800 border-slate-200 px-2 font-semibold py-2"
              >
                Cancel
              </button>
              <button
                className="hover:bg-yellow-200 bg-color_yellow px-4 py-2 font-semibold"
                type="button"
                onClick={handleSubmit(handleSubmitForm)}
              >
                Edit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {isLoading && <LoadingSpinner />}
    </>
  );
}
