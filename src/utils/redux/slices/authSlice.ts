import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserData } from "@/utils/interface/sliceInterface";
import { addProviderAddress, addProviderServiceAvailability, addProviderServiceDetails, updateProviderProfileImage } from "@/utils/apis/provider.api";
import { updateUserProfileImage } from "@/utils/apis/user.api";

const initialState: AuthState = {
    authUser: null,
    profileImageUpdating: false,
    dataUpdating: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<UserData | null>) => {
            state.authUser = action.payload;
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
            })
            .addCase(addProviderAddress.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(addProviderAddress.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if(state.authUser){
                    state.authUser.address = action.payload.success;
                }
            })
            .addCase(addProviderAddress.rejected, (state) => {
                state.dataUpdating = false;
            })
            .addCase(addProviderServiceDetails.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(addProviderServiceDetails.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if(state.authUser){
                    state.authUser.serviceDetails = action.payload.success;
                }
            })
            .addCase(addProviderServiceDetails.rejected, (state) => {
                state.dataUpdating = false;
            })
            .addCase(addProviderServiceAvailability.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(addProviderServiceAvailability.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if(state.authUser){
                    state.authUser.serviceAvailability = action.payload.success;
                }
            })
            .addCase(addProviderServiceAvailability.rejected, (state) => {
                state.dataUpdating = false;
            });
    },
});

export const { 
    setAuthUser, 
    setProfileImage,
} = authSlice.actions;

export default authSlice.reducer;
