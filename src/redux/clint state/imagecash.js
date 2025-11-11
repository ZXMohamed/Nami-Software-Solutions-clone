import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchImage = createAsyncThunk("imageCash/loadImage",
    async ({ url, section, id }, { fulfillWithValue, rejectWithValue, getState }) => {
        try {
            //*if there is an image in state return it 
            //*else download it and save it in state
            if (getState().loadImage?.[section]?.[id]) {
                return fulfillWithValue(getState().loadImage?.[section][id]);
            } else {
                const res = await fetch(url);
                const blob = await res.blob();
                const base64 = URL.createObjectURL(blob);
            
                return fulfillWithValue(base64);
            }
        } catch (e) {
            return rejectWithValue(null);
        }
    }
)

const imageCashSlice = createSlice({
    name: "loadImage",
    initialState: {},
    reducers: {
        reset: (state, action) => {console.log(action.payload);
            state[action.payload] = {};      
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImage.fulfilled, (state, action) => {
                if (!state[action.meta.arg.section]){
                    state[action.meta.arg.section] = {}; 
                }

                state[action.meta.arg.section][action.meta.arg.id] = action.payload;
            })
            .addCase(fetchImage.rejected, (state, action) => {
                if (!state[action.meta.arg.section]){
                    state[action.meta.arg.section] = {}; 
                }

                state[action.meta.arg.section][action.meta.arg.id] = action.payload;
            })
    }
})

export const { reset } = imageCashSlice.actions;
export default imageCashSlice;