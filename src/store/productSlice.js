/* eslint-disable no-alert */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getItemFrom from '../utils/getItemFromLocalStorage';
import setItemsTo from '../utils/setItemToLocalStorage';

// axios와 redux-thunk로 비동기 통신
export const getProductList = createAsyncThunk(
  'GET_PRODUCT',
  async (searchStuff) => {
    const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글이 포함되었는지 여부
    const checkOnlyNum = /^[0-9]*$/; // 숫자로만 구성되었는지 여부
    const makeKor = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g; // name에서 숫자제외하고 한글로만 만들기
    const checkUrl = /^(http(s)?:\/\/)/gi; // URL인지 확인

    // keyword 입력할 경우
    if (checkKor.test(searchStuff)) {
      if (getItemFrom(searchStuff)) {
        const resultData = getItemFrom(searchStuff);
        if (resultData !== null) {
          return resultData;
        }
      }

      const productList = await axios
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
        .catch((err) => {
          alert(err);
          useNavigate('/');
        });
      setItemsTo(searchStuff, { product: productList, leftside: [] });
      return { product: productList, leftside: [] };
    }

    // product_code 입력시
    if (checkOnlyNum.test(searchStuff)) {
      if (getItemFrom(searchStuff)) {
        const resultData = getItemFrom(searchStuff);
        return resultData;
      }

      let c1Info = ''; // c1 정보
      let productCode; // regions 검색 위한 product_code
      let imageUrl = '';

      const productList = await axios
        .get('https://static.pxl.ai/problem/data/products.json')
        .then((res) => {
          const filterData = [];
          res.data.forEach((info) => {
            if (info.product_code === Number(searchStuff)) {
              productCode = info.product_code;
              c1Info = info.category_names[0].slice(3);
              imageUrl = info.image_url;
              const productName = info.name.replace(makeKor, '');
              res.data.forEach((info) => {
                if (
                  info.name.includes(productName) &&
                  info.product_code !== productCode
                ) {
                  filterData.push({
                    name: info.name,
                    price: info.price,
                    image_url: info.image_url,
                  });
                }
              });
            }
          });
          return filterData;
        })
        .catch((err) => {
          alert(err);
          useNavigate('/');
        });

      const leftsideList = await axios
        .get('https://static.pxl.ai/problem/data/regions.json')
        .then((res) => {
          let filterData = [];
          res.data.forEach((info) => {
            if (info.product_code === productCode) {
              filterData = info.attributes;
            }
          });
          return filterData;
        })
        .catch((err) => {
          alert(err);
          useNavigate('/');
        });

      setItemsTo(searchStuff, {
        product: productList,
        leftside: { image: imageUrl, c1: c1Info, left: leftsideList },
      });

      return {
        product: productList,
        leftside: { image: imageUrl, c1: c1Info, left: leftsideList },
      };
    }

    // image_url 입력시
    if (checkUrl.test(searchStuff)) {
      if (getItemFrom(searchStuff)) {
        const resultData = getItemFrom(searchStuff);
        return resultData;
      }

      let c1Info = ''; // c1 정보
      let productCode; // regions 검색 위한 product_code
      let imageUrl = '';

      const productList = await axios
        .get('https://static.pxl.ai/problem/data/products.json')
        .then((res) => {
          const filterData = [];
          res.data.forEach((info) => {
            if (info.image_url === searchStuff) {
              productCode = info.product_code;
              c1Info = info.category_names[0].slice(3);
              imageUrl = info.image_url;
              const productName = info.name.replace(makeKor, '');
              res.data.forEach((info) => {
                if (info.name.includes(productName)) {
                  filterData.push({
                    name: info.name,
                    price: info.price,
                    image_url: info.image_url,
                  });
                }
              });
            }
          });
          return filterData;
        })
        .catch((err) => {
          alert(err);
          useNavigate('/');
        });

      const leftsideList = await axios
        .get('https://static.pxl.ai/problem/data/regions.json')
        .then((res) => {
          let filterData = [];
          res.data.forEach((info) => {
            if (info.product_code === productCode) {
              filterData = info.attributes;
            }
          });
          return filterData;
        })
        .catch((err) => {
          alert(err);
          useNavigate('/');
        });

      setItemsTo(searchStuff, {
        product: productList,
        leftside: { image: imageUrl, c1: c1Info, left: leftsideList },
      });

      return {
        product: productList,
        leftside: { image: imageUrl, c1: c1Info, left: leftsideList },
      };
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    inputValue: '', // 검색어
    productList: [], // 상품리스트
    leftsideList: [], // 좌측사이드 이미지 정보
    loading: false,
    error: '',
    pageNumbers: [],
    pageComponent: 'first', // first, mid, last
    currentPage: 1, // 현재 페이지
    postLimit: 28, // 페이지당 게시물 수
    totalPage: '',
    searchStuff: '', // keyword이면 true, 아니면 false
    isShowFirstDot: false, // 시작 ... 보여줄지 말지
    isShowEndDot: false, // 끝에 ... 보여줄지 말지
    isShowNumberOne: false, // 숫자 1을 보여줄지 말지
    isShowTotalPage: false, // totalPage 보여줄지 말지
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

    setSearchStuff(state, action) {
      state.searchStuff = action.payload;
    },
    setPostLimit(state, action) {
      state.searchStuff = action.payload;
    },
    setTotalPage(state, action) {
      state.totalPage = action.payload;
    },
    setPageNumbers(state, action) {
      state.pageNumbers = action.payload;
    },
    setPageComponent(state, action) {
      state.pageComponent = action.payload;
    },
    setIsShowFirstDot(state, action) {
      state.isShowFirstDot = action.payload;
    },
    setIsShowEndDot(state, action) {
      // firstArrayButton에서 EndDot
      state.isShowEndDot = action.payload;
    },
    setIsShowNumberOne(state, action) {
      state.isShowNumberOne = action.payload;
    },
    setIsShowTotalPage(state, action) {
      state.isShowTotalPage = action.payload;
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
      // leftsidebar가 없는 경우(keyword로 검색한 경우)
      if (state.loading === true && action.payload.leftside.length === 0) {
        if (window.screen.width >= 1463) {
          state.postLimit = 32;
        } else if (window.screen.width >= 1260) {
          state.postLimit = 28;
        } else if (window.screen.width >= 1056) {
          state.postLimit = 24;
        } else if (window.screen.width >= 852) {
          state.postLimit = 20;
        } else if (window.screen.width >= 685) {
          state.postLimit = 16;
        } else if (window.screen.width >= 500) {
          state.postLimit = 12;
        } else if (window.screen.width <= 499) {
          state.postLimit = 8;
        }
        // leftsidebar가 있는 경우(img_url or product_code로 검색한 경우)
      } else if (state.loading === true) {
        if (window.screen.width >= 1566) {
          state.postLimit = 28;
        } else if (window.screen.width >= 1345) {
          state.postLimit = 24;
        } else if (window.screen.width >= 1200) {
          state.postLimit = 20;
        } else if (window.screen.width >= 1038) {
          state.postLimit = 16;
        } else if (window.screen.width >= 866) {
          state.postLimit = 12;
        } else if (window.screen.width >= 790) {
          state.postLimit = 8;
        }
      }

      state.loading = false;
      state.productList = action.payload.product;
      state.leftsideList = action.payload.leftside;
      state.inputValue = '';
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

export const {
  inputChange,
  changeCurrentPage,
  changePostLimit,
  setSearchStuff,
  setPostLimit,
  setTotalPage,
  setPageNumbers,
  setPageComponent,
  setIsShowFirstDot,
  setIsShowEndDot,
  setIsShowNumberOne,
  setIsShowTotalPage,
} = productSlice.actions;
export default productSlice.reducer;
