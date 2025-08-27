import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userUpdateUserProfileImage } from "@/utils/apis/user.api";
import { AuthState, UserData } from "@/utils/interface/sliceInterface";
import { providerAddProviderAddress, providerAddProviderServiceAvailabilities, providerAddProviderServiceDetails, providerUpdateProviderProfileImage } from "@/utils/apis/provider.api";

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
        },
        updateAuthUserName: (state, action: PayloadAction<string>) => {
            if(state.authUser) {
                state.authUser.username = action.payload;
            }
        },
        updateProviderSubscription: (state, action: PayloadAction<string>) => {
            if(state.authUser) {
                state.authUser.providerSubscription = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(providerUpdateProviderProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(providerUpdateProviderProfileImage.fulfilled, (state, action) => {
                state.profileImageUpdating = false;
                if(state.authUser){
                    state.authUser.profileImage = action.payload.data;
                }
            })
            .addCase(providerUpdateProviderProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            })
            .addCase(userUpdateUserProfileImage.pending, (state) => {
                state.profileImageUpdating = true;
            })
            .addCase(userUpdateUserProfileImage.fulfilled, (state, action) => {
                state.profileImageUpdating = false;
                if(state.authUser){
                    state.authUser.profileImage = action.payload.data;
                }
            })
            .addCase(userUpdateUserProfileImage.rejected, (state) => {
                state.profileImageUpdating = false;
            })
            .addCase(providerAddProviderAddress.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerAddProviderAddress.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if(state.authUser){
                    state.authUser.isAddressAdded = action.payload.success;
                }
            })
            .addCase(providerAddProviderAddress.rejected, (state) => {
                state.dataUpdating = false;
            })
            .addCase(providerAddProviderServiceDetails.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerAddProviderServiceDetails.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if(state.authUser){
                    state.authUser.isServiceDetailsAdded = action.payload.success;
                }
            })
            .addCase(providerAddProviderServiceDetails.rejected, (state) => {
                state.dataUpdating = false;
            })
            .addCase(providerAddProviderServiceAvailabilities.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerAddProviderServiceAvailabilities.fulfilled, (state, action) => {
                state.dataUpdating = false;
                if(state.authUser){
                    state.authUser.isServiceAvailabilityAdded = action.payload.success;
                }
            })
            .addCase(providerAddProviderServiceAvailabilities.rejected, (state) => {
                state.dataUpdating = false;
            });
    },
});

export const { 
    setAuthUser, 
    setProfileImage,
    updateAuthUserName,
    updateProviderSubscription,
} = authSlice.actions;

export default authSlice.reducer;
