import { signin, signout } from "@/utils/apis/auth.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserData } from "@/utils/interface/sliceInterface";
import { SigninResponse } from "@/utils/interface/api/authApiInterface";
import { UserUpdateUserInfoResponse } from "@/utils/interface/api/userApiInterface";
import { userUpdateUserInfo, userUpdateUserProfileImage } from "@/utils/apis/user.api";
import { ProviderUpdateProviderInfoResponse } from "@/utils/interface/api/providerApiInterface";
import { providerAddProviderAddress, providerAddProviderServiceAvailabilities, providerAddProviderServiceDetails, providerUpdateProviderInfo, providerUpdateProviderProfileImage } from "@/utils/apis/provider.api";

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
        },
        updateGoogleConnect: (state) => {
            if(state.authUser) {
                state.authUser.googleConnected = true;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, () => {})
            .addCase(signin.fulfilled, (state, action: PayloadAction<SigninResponse>) => {
                state.authUser = action.payload.authUser;
            })
            .addCase(signin.rejected, () => {});

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
            });

        builder
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
            });

        builder
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
            });

        builder
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
            });

        builder
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

        builder
            .addCase(providerUpdateProviderInfo.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(providerUpdateProviderInfo.fulfilled, (state, action: PayloadAction<ProviderUpdateProviderInfoResponse>) => {
                state.dataUpdating = false;
                if(state.authUser) {
                    state.authUser.username = action.payload.data.username;
                    state.authUser.phone = action.payload.data.phone;
                }
            })
            .addCase(providerUpdateProviderInfo.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(userUpdateUserInfo.pending, (state) => {
                state.dataUpdating = true;
            })
            .addCase(userUpdateUserInfo.fulfilled, (state, action: PayloadAction<UserUpdateUserInfoResponse>) => {
                state.dataUpdating = false;
                if(state.authUser) {
                    state.authUser.username = action.payload.data.username;
                    state.authUser.phone = action.payload.data.phone;
                }
            })
            .addCase(userUpdateUserInfo.rejected, (state) => {
                state.dataUpdating = false;
            });

        builder
            .addCase(signout.pending, () => {})
            .addCase(signout.fulfilled, (state) => {
                state.authUser = null;
                state.dataUpdating = false;
                state.profileImageUpdating = false;
            })
            .addCase(signout.rejected, () => {});
    },
});

export const { 
    setAuthUser, 
    setProfileImage,
    updateAuthUserName,
    updateProviderSubscription,
    updateGoogleConnect
} = authSlice.actions;

export default authSlice.reducer;
