import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://reqres.in/api/users?per_page=50', {
    headers: {
      'x-api-key': 'reqres-free-v1',
    },
  });
  return response?.data?.data;
});


const userSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    view: 'table',
    status: 'idle',
  },
 reducers: {
  toggleView: (state, action) => {
    state.view = action.payload;
  },
  addUser: (state, action) => {
    state.items.unshift(action.payload);
  },
  editUser: (state, action) => {
    const index = state.items.findIndex((u) => u.id === action.payload.id);
    if (index !== -1) state.items[index] = action.payload;
  },
  deleteUser: (state, action) => {
    state.items = state.items.filter((u) => u.id !== action.payload);
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const { toggleView, addUser,editUser,deleteUser } = userSlice.actions;
export default userSlice.reducer;
