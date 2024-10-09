const { createSlice } = require("@reduxjs/toolkit");

// state- apple
// slices---- state
// slice 1-- > products related states

createSlice({
  name: "products",
  initialState: {
    loading: false,
  },
  reducers: {
    productRequest(state, action) {
      return {
        loading: true,
      };
    },
    productSuccess(state, action){

    }
  },
});
