import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios와 redux-thunk로 비동기 통신
export const getProductList = createAsyncThunk(
  'GET_PRODUCT',
  async (searchStuff) => {
    const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (searchStuff.match(checkKor)) {
      const response = await axios
        .get('https://static.pxl.ai/problem/data/products.json')
        .then((res) => {
          const filterData = [];
          res.data.forEach((info) => {
            if (info.name.includes(searchStuff)) {
              filterData.push({
                name: info.name,
                price: info.price,
                image_url: info.image_url,
              });
            }
          });
          return filterData;
        })
        .catch((err) => err);
      return response;
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    inputValue: '',
    productList: [],
    loading: false,
    error: '',
    currentPage: 1, // 현재 페이지
    postLimit: 28, // 페이지당 게시물 수
  },
  reducers: {
    inputChange(state, action) {
      state.inputValue = action.payload;
    },

    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    changePostLimit(state, action) {
      state.postLimit = action.payload;
    },
  },

  // thunk 통신 결과에 따른 전역변수 상태 변경
  extraReducers: {
    [getProductList.pending]: (state) => {
      if (state.loading === false) {
        state.loading = true;
        state.inputValue = '';
      }
    },
    [getProductList.fulfilled]: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.productList = action.payload;
        state.inputValue = '';
      }
    },
    [getProductList.rejected]: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.error = action.error;
        state.inputValue = '';
      }
    },
  },
});

export const { inputChange, changeCurrentPage, changePostLimit } =
  productSlice.actions;
export default productSlice.reducer;
