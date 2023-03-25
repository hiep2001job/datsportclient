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

import "./ModalAdd.css";

export default function ModalAdd({
  isOpenModalAdd,
  setIsOpenModalAdd,
  handleClose,
  getAll,
}) {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataBrands, setDataBrands] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [base64URL, setBase64URL] = useState("");
  const { handleSubmit, control } = useForm({
    defaultValues: {
      productName: "",
      productDescription: "",
      categoryId: "",
      brandId: "",
      productQuantity: "",
      productPrice: 1,
      productImage: "",
    },
  });
  const username = useSelector((state) => state.auth.data?.username);
  const [productSizes, setProductSizes] = useState({
    productSize1: "",
    productSize2: "",
    productSize3: "",
    productSize4: "",
    productSize5: "",
  });
  const [productColors, setProductColors] = useState({
    color1: "",
    color2: "",
    color3: "",
    color4: "",
    color5: "",
  });
  const handleChangeCheckboxSize = (e) => {
    const { value, checked, name } = e.target;
    if (checked) {
      setProductSizes((val) => ({
        ...val,
        [name]: value,
      }));
    } else {
      setProductSizes((val) => ({
        ...val,
        [name]: "",
      }));
    }
  };
  const handleChangeCheckboxColor = (e) => {
    const { value, checked, name } = e.target;
    if (checked) {
      setProductColors((val) => ({
        ...val,
        [name]: value,
      }));
    } else {
      setProductColors((val) => ({
        ...val,
        [name]: "",
      }));
    }
  };
  const handleSubmitForm = async (data) => {
    const currentDay = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const {
      brandId,
      categoryId,
      productDescription,
      productName,
      productPrice,
      productQuantity,
    } = data;
    const dataRs = {
      productImage: base64URL,
      ...productColors,
      ...productSizes,
      brandId,
      categoryId,
      productDescription,
      productPrice,
      productName,
      productQuantity,
      productCreateDate: currentDay,
      productCreateUser: username,
      productUpdateDate: currentDay,
      productUpdateUser: username,
      productStatus: 1,
    };
    try {
      setIsLoading(true);
      const rs = await productApi.createProduct(dataRs);
      return rs;
    } catch (error) {
      console.log("error", error);
    } finally {
      getAll();
      setIsOpenModalAdd(false);
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
        open={isOpenModalAdd}
        style={{ height: "100%" }}
        onClose={handleClose}
      >
        <DialogTitle className="font-semibold text-20 uppercase">
          Add product form
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
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ minWidth: "100%" }}>
                        <InputLabel id="select-category">Category</InputLabel>
                        <Select
                          labelId="select-category"
                          id="select-category"
                          label="Category"
                          name="categoryId"
                          onChange={onChange}
                          value={value}
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
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ minWidth: "100%" }} size="small">
                        <InputLabel id="demo-select-small">Brand</InputLabel>
                        <Select
                          labelId="select-brand"
                          id="select-brand"
                          label="Brand"
                          name="brandId"
                          defaultValue=""
                          onChange={onChange}
                          value={value}
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
                      // margin="dense"
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
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      autoFocus
                      margin="dense"
                      name="productDescription"
                      label="Product Desc"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      className="textField"
                    />
                  )}
                />
                <Controller
                  name="productQuantity"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      autoFocus
                      margin="dense"
                      id="name"
                      name="productQuantity"
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
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      autoFocus
                      margin="dense"
                      id="name"
                      name="productPrice"
                      label="Product Price"
                      type="number"
                      fullWidth
                      variant="standard"
                      size="small"
                      className="textField"
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="productSize1"
                        value="S"
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
                      />
                    }
                    label="XXL"
                  />
                </div>
                <div>
                  <label>Product Colors:</label>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="color1"
                        value="Blue"
                        onChange={handleChangeCheckboxColor}
                      />
                    }
                    label="Blue"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="color2"
                        value="Black"
                        onChange={handleChangeCheckboxColor}
                      />
                    }
                    label="Black"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="color3"
                        value="White"
                        onChange={handleChangeCheckboxColor}
                      />
                    }
                    label="White"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="color4"
                        value="Green"
                        onChange={handleChangeCheckboxColor}
                      />
                    }
                    label="Green"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="color5"
                        value="Red"
                        onChange={handleChangeCheckboxColor}
                      />
                    }
                    label="Red"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end ml-auto mt-8">
              <button
                onClick={() => setIsOpenModalAdd(false)}
                className="mr-2 border cursor-pointer hover:border-slate-800 border-slate-200 px-2 font-semibold py-2"
              >
                Cancel
              </button>
              <button
                className="hover:bg-yellow-200 bg-color_yellow px-4 py-2 font-semibold"
                type="button"
                onClick={handleSubmit(handleSubmitForm)}
              >
                Add
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {isLoading && <LoadingSpinner />}
    </>
  );
}
