import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { brandActions } from "../../../redux/brandActions";
import { categoryActions } from "../../../redux/categoryActions";
import { productActions } from "../../../redux/productActions";
import "./ModalAdd.css";
const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {});

export default function ModalAdd({ isOpenModalAdd, handleClose }) {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataBrands, setDataBrands] = useState([]);
  const [file, setFile] = useState(null);
  const [base64URL, setBase64URL] = useState("");
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.data?.username);

  const handleSubmitForm = async (data) => {
    const {
      brandId,
      categoryId,
      productDescription,
      productName,
      productPrice,
      productQuantity,
    } = data;
    const currentDay = moment(new Date()).format();

    const dataRs = {
      productImage: base64URL,
      // colors,
      // sizes,
      brandId,
      categoryId,
      productDescription,
      productPrice,
      productName,
      productQuantity,
      productCreateDate: currentDay,
      productCreateUser: username,
      productUpdateDate: "",
      productUpdateUser: username,
    };
    await dispatch(productActions.create(dataRs));
  };

  useEffect(() => {
    const getAllDataCategory = async () => {
      try {
        const rsData = await dispatch(categoryActions.getAll(1));
        setDataCategory(rsData.payload);
      } catch (error) {
        return error;
      }
    };

    const getAllDataBrand = async () => {
      try {
        const rsData = await dispatch(brandActions.getAll(1));
        setDataBrands(rsData.payload);
      } catch (error) {
        return error;
      }
    };

    getAllDataCategory();
    getAllDataBrand();
  }, [dispatch]);

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
    <Dialog
      maxWidth
      open={true}
      style={{ height: "100%" }}
      onClose={handleClose}
    >
      <DialogTitle fullWidth className="font-semibold text-20 uppercase">
        Add product form
      </DialogTitle>
      <DialogContent fullWidth>
        <form className="w-full overflow-hidden">
          <div className="flex items-center justify-center">
            {/*  */}
            <div className="w-50% mr-3">
              <div className="mb-4">
                <label
                  className="font-semibold block"
                  htmlFor="select-category"
                >
                  Product Category:
                </label>
                <Controller
                  name={"categoryId"}
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
                          <MenuItem value={brand.brand_id} key={brand.brand_id}>
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
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    autoFocus
                    margin="dense"
                    id="name"
                    name="productName"
                    label="Product Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    size="small"
                    className="textField"
                  />
                )}
              />
              <Controller
                name={"productDescription"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    autoFocus
                    margin="dense"
                    id="name"
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
                name={"productPrice"}
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
            </div>
            <div className="w-50% ml-3">
              {/* product size  */}
              <div className="flex flex-wrap">
                {/* size 1 */}
                <div className="flex w-50%">
                  <Controller
                    name="productSize1"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="productSize1">
                          Product Size 1
                        </InputLabel>
                        <Select
                          labelId="productSize1"
                          id="productSize1"
                          label="productSize1"
                          name="productSize1"
                          onChange={onChange}
                          value={value}
                          defaultValue="S"
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                          <MenuItem value="XXL">XXL</MenuItem>
                          <MenuItem value="XXXL">XXXL</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                {/*        Product Size 2  */}
                <div className="flex w-50%">
                  <Controller
                    name={"productSize2"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="productSize2">
                          Product Size 2
                        </InputLabel>
                        <Select
                          labelId="productSize2"
                          id="productSize2"
                          label="productSize2"
                          name="productSize2"
                          onChange={onChange}
                          value={value}
                          defaultValue="S"
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                          <MenuItem value="XXL">XXL</MenuItem>
                          <MenuItem value="XXXL">XXXL</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                {/* size 3 */}
                <div className="flex w-50%">
                  <Controller
                    name={"productSize3"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="productSize3">
                          Product Size 3
                        </InputLabel>
                        <Select
                          labelId="productSize3"
                          id="productSize3"
                          label="productSize3"
                          name="productSize3"
                          onChange={onChange}
                          value={value}
                          defaultValue="S"
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                          <MenuItem value="XXL">XXL</MenuItem>
                          <MenuItem value="XXXL">XXXL</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                {/* size 4*/}
                <div className="flex w-50%">
                  <Controller
                    name={"productSize4"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="productSize3">
                          Product Size 4
                        </InputLabel>
                        <Select
                          labelId="productSize4"
                          id="productSize4"
                          label="productSize4"
                          name="productSize4"
                          onChange={onChange}
                          value={value}
                          defaultValue="S"
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                          <MenuItem value="XXL">XXL</MenuItem>
                          <MenuItem value="XXXL">XXXL</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                {/* size 5 */}
                <div className="flex w-50%">
                  <Controller
                    name={"productSize5"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="productSize5">
                          Product Size 5
                        </InputLabel>
                        <Select
                          labelId="productSize5"
                          id="productSize5"
                          label="productSize5"
                          name="productSize5"
                          onChange={onChange}
                          value={value}
                          defaultValue="S"
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                          <MenuItem value="XXL">XXL</MenuItem>
                          <MenuItem value="XXXL">XXXL</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
              </div>

              <div className="border border-slate-900 mt-2 mb-2"></div>
              {/* selected color product
               */}
              <div className="flex flex-wrap">
                {/* color 1 */}
                <div className="flex w-50%">
                  <Controller
                    name={"color1"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="color1">Color 1</InputLabel>
                        <Select
                          labelId="color1"
                          id="color1"
                          label="color1"
                          name="color1"
                          onChange={onChange}
                          value={value}
                          defaultValue="Black"
                        >
                          <MenuItem value="Black">Black</MenuItem>
                          <MenuItem value="Green">Green</MenuItem>
                          <MenuItem value="Blue">Blue</MenuItem>
                          <MenuItem value="Red">Red</MenuItem>
                          <MenuItem value="White">White</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                {/* color 2  */}
                <div className="flex w-50%">
                  <Controller
                    name={"color2"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="color1">Color 2</InputLabel>
                        <Select
                          labelId="color2"
                          id="color2"
                          label="color2"
                          name="color2"
                          onChange={onChange}
                          value={value}
                          defaultValue="Black"
                        >
                          <MenuItem value="Black">Black</MenuItem>
                          <MenuItem value="Green">Green</MenuItem>
                          <MenuItem value="Blue">Blue</MenuItem>
                          <MenuItem value="Red">Red</MenuItem>
                          <MenuItem value="White">White</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                {/* color 3 */}
                <div className="flex w-50%">
                  <Controller
                    name={"color3"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="color3">Color 3</InputLabel>
                        <Select
                          labelId="color3"
                          id="color3"
                          label="color3"
                          name="color3"
                          onChange={onChange}
                          value={value}
                          defaultValue="Black"
                        >
                          <MenuItem value="Black">Black</MenuItem>
                          <MenuItem value="Green">Green</MenuItem>
                          <MenuItem value="Blue">Blue</MenuItem>
                          <MenuItem value="Red">Red</MenuItem>
                          <MenuItem value="White">White</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                {/* color 4 */}
                <div className="flex w-50%">
                  <Controller
                    name={"color4"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="color4">Color 4</InputLabel>
                        <Select
                          labelId="color4"
                          id="color4"
                          label="color4"
                          name="color4"
                          onChange={onChange}
                          value={value}
                          defaultValue="Black"
                        >
                          <MenuItem value="Black">Black</MenuItem>
                          <MenuItem value="Green">Green</MenuItem>
                          <MenuItem value="Blue">Blue</MenuItem>
                          <MenuItem value="Red">Red</MenuItem>
                          <MenuItem value="White">White</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                {/* color 5 */}
                <div className="flex w-50%">
                  <Controller
                    name={"color5"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
                        <InputLabel id="color5">Color5</InputLabel>
                        <Select
                          labelId="color5"
                          id="color5"
                          label="color5"
                          name="color5"
                          onChange={onChange}
                          value={value}
                          defaultValue="Black"
                        >
                          <MenuItem value="Black">Black</MenuItem>
                          <MenuItem value="Green">Green</MenuItem>
                          <MenuItem value="Blue">Blue</MenuItem>
                          <MenuItem value="Red">Red</MenuItem>
                          <MenuItem value="White">White</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end ml-auto mt-8">
            <button className="mr-2 border hover:border-slate-800 border-slate-200 px-2 font-semibold py-2">
              Cancel
            </button>
            <button
              className="hover:bg-yellow-200 bg-color_yellow px-4 py-2 font-semibold"
              type="submit"
              onClick={handleSubmit(handleSubmitForm)}
            >
              Add
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
