import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../features/loginSlice';




// export const login = createAsyncThunk(
//     'login',
//     async (credentials) => {
//         try {
//             let res = await fetch("http://127.0.0.1:8000/api/user/login", {
//                 method: 'post',
//                 body: credentials
//             });
//             return await res.json();
//         } catch (error) {
//             console.log(error.response.data.message);
//         }
//     }
// );