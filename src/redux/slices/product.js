import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: null,
  totalSales: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: ''
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null
  }
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.product = null;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // GET PRODUCT
    getTotalSalesSuccess(state, action) {
      state.isLoading = false;
      state.totalSales = action.payload;
    },

    // DELETE PRODUCT
    deleteProduct(state, action) {
      state.products = reject(state.products, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((product) => product.price * product.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = filter(state.checkout.cart, (item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  deleteProduct,
  createBilling,
  applyShipping,
  applyDiscount,
  filterProducts,
  sortByProducts,
  increaseQuantity,
  decreaseQuantity
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/products');
      const response = await axios.get('/request');
      // console.log('res', response);
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getBlogList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/products');
      const response = await axios.get('/api/blog');
      console.log('response.data.data', response.data.data);
      if (response.responseCode !== 200) {
        response.data.data = [];
      }
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParentClassList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/products');
      const response = await axios.get('/api/clazz/manager');
      console.log('response.data.data', response.data.data);
      if (response.data.responseCode !== '200' && response.data.responseCode !== '00') {
        response.data.data = [];
      }
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAllParentClassList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/products');
      const response = await axios.get('/api/clazz');
      console.log('response.data.data', response.data.data);
      if (response.data.responseCode !== '200' && response.data.responseCode !== '00') {
        response.data.data = [];
      }
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParentsRequestList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/request/manager');
      console.log('response.data.data', response.data);
      if (response.data.responseCode !== '200' && response.data.responseCode !== '00') {
        response.data.data = [];
      }
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products/product', {
        params: { name }
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParentsRequest(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/request/${id}`;
      const response = await axios.get(url);
      console.log('getParentsRequest', response);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createBlog(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/blog/create`;
      const d = {
        "thumbnail": data.thumbnail,
        "category": data.category,
        "title": data.title,
        "content": data.content
      };
      const response = await axios.post(url, d);
      console.log('create blog ', response);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getBlog(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/blog/${id}`;
      // console.log('url ', url);
      const response = await axios.get(url);
      // console.log('create blog ', response.data.data);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteBlog(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/blog/delete/${id}`;
      // console.log('url ', url);
      const response = await axios.put(url);
      // console.log('create blog ', response.data.data);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createClazz(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/clazz/create?requestId=${data.id}`;
      const response = await axios.post(url);
      console.log('create class ', response);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParentsClazz(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/clazz/${id}`;
      const response = await axios.get(url);
      console.log('getParentsClazz', response);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setParentsRequest(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/request/updateStatus?requestId=${data.id}&status=${data.status}&rejectReason=${data.reject}`;
      const response = await axios.put(
        url
      );
      console.log('updated request', response);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getTutorVerificationList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`api/requestVerification/manager`);
      console.log('response.data.data', response.data);
      if (response.data.responseCode !== '200' && response.data.responseCode !== '00') {
        response.data.data = [];
      }
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getRequestVerification(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/requestVerification/${id}`;
      // console.log(url);
      const response = await axios.get(url);
      console.log('getRequestVerification', response.data.data);
      dispatch(slice.actions.getProductSuccess(response.data.data));
      // if(response.status !== 200){
      //   //tra ve kieu ..
      // }  
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateStatusRequestVerification(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/requestVerification/updateStatus`;
      const d = {
        "tutorId": data.tutorId,
        "status": data.status,
        "rejectReason": data.rejectReason,
      };
      // console.log(url);
      // console.log(data);
      const response = await axios.put(url, d);
      console.log('updateStatusRequestVerification', response);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log('updateStatusRequestVerification ', error);
    }
  };
}

// ----------------------------------------------------------------------

export function updateStatusParentsClass(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/clazz/updateStatus?clazzId=${data.id}&status=3`;
      const response = await axios.put(
        url
      );
      console.log('updateStatusParentsClass ', response);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createOrder(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/order/create`;
      const d = {
        "clazzId": data.id,
        "amount": data.tuition,
        "type": 2
      };
      const response = await axios.post(url, d);
      console.log('createOrder ', response);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createOrderPartly(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/order/createPartly`;
      const d = {
        "clazzId": data.id,
        "amount": data.tuition
      };
      const response = await axios.post(url, d);
      console.log('createOrderPartly ', response);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function putAutoAssign() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/api/task/auto-assign');
      dispatch(slice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAdminTaskList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/products');
      const response = await axios.get('/api/task/');
      console.log('tasks', response.data.data);
      if (response.data.responseCode !== '200' && response.data.responseCode !== '00') {
        response.data.data = [];
      }
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAdminVariableList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/products');
      const response = await axios.get('/api/systemVariable/');
      console.log('tasks', response.data.data);
      if (response.data.responseCode !== '200' && response.data.responseCode !== '00') {
        response.data.data = [];
      }
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAdminVariableDetail(key) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/systemVariable/${key}`
      // const response = await axios.get('/api/products');
      const response = await axios.get(url);
      console.log('tasks', response.data.data);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function postAdminVariableUpdate(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/systemVariable/update?key=${values.varKey}&value=${values.value}`
      // const response = await axios.get('/api/products');
      const response = await axios.post(url);
      console.log('tasks', response.data.data);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// export function getStatisticOngoingClass() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       // const response = await axios.get('/api/products');
//       const response = await axios.get('/api/admin/ongoingClazz');
//       // console.log('ongoing class', response.data.data);
//       dispatch(slice.actions.getProductSuccess(response.data.data));
//     } catch (error) {
//       // dispatch(slice.actions.hasError(error));
//     }
//   };
// }


// ----------------------------------------------------------------------

// export function getStatisticTotalSales() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       // const response = await axios.get('/api/products');
//       const response = await axios.get('/api/admin/totalSale');
//       console.log('total sales', response.data.data);
//       dispatch(slice.actions.getProductSuccess(response.data.data));
//     } catch (error) {
//       // dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------

// export function getStatisticYearlySales() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       // const response = await axios.get('/api/products');
//       const response = await axios.get('/api/admin/yearlySale');
//       console.log('yearly sales', response.data.data);
//       dispatch(slice.actions.getProductSuccess(response.data.data));
//     } catch (error) {
//       // dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------

export function getStatistic() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // ONGOING CLASS
      const response1 = await axios.get('/api/admin/ongoingClazz');
      // TOTAL SALES
      const response2 = await axios.get('/api/admin/totalSale');
      // YEARLY SALES
      const response3 = await axios.get('/api/admin/yearlySale');
      // console.log('response1', response1.data.data);
      // console.log('response2', response2.data.data);
      // console.log('response3', response3.data.data);

      const statistic = [
        response1.data.data,
        response2.data.data,
        response3.data.data
      ];
      console.log('statistic', statistic);
      dispatch(slice.actions.getProductSuccess(statistic));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getQuestionList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`api/question/`);
      console.log('question list', response.data.data);
      if (response.data.responseCode !== '200' && response.data.responseCode !== '00') {
        response.data.data = [];
      }
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getQuestionDetail(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/question/${id}`;
      // console.log(url);
      const response = await axios.get(url);
      console.log('getQuestionDetail', response.data.data);
      dispatch(slice.actions.getProductSuccess(response.data.data));
      // if(response.status !== 200){
      //   //tra ve kieu ..
      // }  
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function putUpdateQuestion(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/question/update`;
      const d = {
        "id": data.id,
        "subjectId": data.subjectId,
        "subjectName": data.subjectName,
        "subjectLevel": data.subjectLevel,
        "difficulty": data.difficulty,
        "content": data.content,
        "dateCreate": data.dateCreate,
        "answers": [
          {
            "id": data.answers[0].id,
            "questionId": data.answers[0].questionId,
            "content": data.option1,
            "correct": data.answers[0].correct
          },
          {
            "id": data.answers[1].id,
            "questionId": data.answers[1].questionId,
            "content": data.option2,
            "correct": data.answers[1].correct
          },
          {
            "id": data.answers[2].id,
            "questionId": data.answers[2].questionId,
            "content": data.option3,
            "correct": data.answers[2].correct
          },
          {
            "id": data.answers[3].id,
            "questionId": data.answers[3].questionId,
            "content": data.option4,
            "correct": data.answers[3].correct
          },
        ]
      }

      // console.log(url);
      const response = await axios.put(url, d);
      console.log('putUpdateQuestion', response);
      // dispatch(slice.actions.getProductSuccess(response.data.data));
      // if(response.status !== 200){
      //   //tra ve kieu ..
      // }  
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function delDeleletQuestion(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/api/question/delete/${id}`;
      // console.log(url);
      const response = await axios.delete(url);
      console.log('delDeleletQuestion', response.data.data);
      dispatch(slice.actions.getProductSuccess(response.data.data));
      // if(response.status !== 200){
      //   //tra ve kieu ..
      // }  
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function postNewQuestions(file) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const formData = new FormData();
      formData.append(
        'file',
        file
      );
      const response = await axios.post('/api/question/importV2', formData)
      console.log("postNewQuestions ", response);
      dispatch(slice.actions.getProductSuccess(response.data.data));
      // if(response.status !== 200){
      //   //tra ve kieu ..
      // }  
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}