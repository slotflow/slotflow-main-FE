import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserData } from "@/utils/interface/sliceInterface";
import { updateProviderProfileImage } from "@/utils/apis/provider.api";
import { updateUserProfileImage } from "@/utils/apis/user.api";

const initialState: AuthState = {
    authUser: null,
    profileImageUpdating: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<UserData | null>) => {
            state.authUser = action.payload;
        },
        setAddress: (state, action: PayloadAction<boolean>) => {
            if(state.authUser){
                state.authUser.address = action.payload;
            }
        },
        setServiceDetails: (state, action: PayloadAction<boolean>) => {
            if(state.authUser){
                state.authUser.serviceDetails = action.payload;
            }
        },
        setServiceAvailability: (state, action: PayloadAction<boolean>) => {
            if(state.authUser){
                state.authUser.serviceAvailability = action.payload;
            }
        },
        setProfileImage: (state, action: PayloadAction<string>) => {
            if(state.authUser){
                state.authUser.profileImage = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProviderProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(updateProviderProfileImage.fulfilled, (state, action) => {
                state.profileImageUpdating = false;
                if(state.authUser){
                    state.authUser.profileImage = action.payload.profileImage;
                }
            })
            .addCase(updateProviderProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            })
            .addCase(updateUserProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(updateUserProfileImage.fulfilled, (state, action) => {
                state.profileImageUpdating = false;
                if(state.authUser){
                    state.authUser.profileImage = action.payload.profileImage;
                }
            })
            .addCase(updateUserProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            });
    },
});

export const { 
    setAuthUser, 
    setAddress,
    setServiceDetails,
    setServiceAvailability,
    setProfileImage,
} = authSlice.actions;

export default authSlice.reducer;
