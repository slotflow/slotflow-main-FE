# 🎨 SlotFlow – Frontend

**SlotFlow** is a modern appointment booking application designed for users, providers, and administrators. This repository contains the frontend built using **React**, **TypeScript**, and modern UI and state management tools.

### Backend Github Repo
https://github.com/midhunkalarikkal/slotflow-BE
 
---

## 🚀 Tech Stack

- ⚛️ **React.js** – Core frontend framework
- 🟦 **TypeScript** – Type safety across the application
- 🎨 **Tailwind CSS** – Utility-first CSS framework
- 🧩 **shadcn/ui** – Styled, accessible components
- 🧿 **Aceternity UI** – Motion and interaction enhancements
- 📦 **Redux Toolkit** – Global state management
- 🔗 **TanStack Query** – Server state & data fetching
- 📡 **Axios** – API requests
- ⚡ **Vite** – Lightning-fast development server and bundler
- ♻️ **Reusable Components** – Custom UI & logic components
- 🧠 **Design Pattern-Based Structure** – Scalable architecture
- 🪞 **Skeletons & Shimmers** – For loading states (user experience)

---

## 📁 Project Structure

```
src
    |   App.tsx
    |   index.css
    |   main.tsx
    |   vite-env.d.ts
    |   
    +---assets
    +---components
    |   +---admin
    |   |       AdminProviderPayments.tsx
    |   |       AdminProviderSubscriptions.tsx
    |   |       CardOne.tsx
    |   |       
    |   +---common
    |   |   |   AddAddress.tsx
    |   |   |   CommonButton.tsx
    |   |   |   CommonPaymentSelection.tsx
    |   |   |   CommonTable.tsx
    |   |   |   DataFetchingError.tsx
    |   |   |   InfoDisplayComponent.tsx
    |   |   |   ProfileHorizontalTabs.tsx
    |   |   |   RoleButton.tsx
    |   |   |   SectionOne.tsx
    |   |   |   UserInfoAddingOrUpdating.tsx
    |   |   |   
    |   |   +---chart
    |   |   |       BarChartUi.tsx
    |   |   |       ChartHeader.tsx
    |   |   |       DateSelect.tsx
    |   |   |       SpreadChart.tsx
    |   |   |       
    |   |   \---profile
    |   |           ProfileHead.tsx
    |   |           ProviderServiceAvailability.tsx
    |   |           ProviderServiceDetails.tsx
    |   |           UserOrProviderAddressDetails.tsx
    |   |           UserOrProviderProfileDetails.tsx
    |   |           
    |   +---form
    |   |   |   FormSplits.tsx
    |   |   |   InputFieldWithLable.tsx
    |   |   |   phone-input.tsx
    |   |   |   SelectFiledWithLabel.tsx
    |   |   |   
    |   |   +---AdminForms
    |   |   |       planForm.tsx
    |   |   |       ServiceForm.tsx
    |   |   |       
    |   |   \---CommonForms
    |   |           EmailVerificationForm.tsx
    |   |           LoginForm.tsx
    |   |           OtpVerificatioForm.tsx
    |   |           ResetPasswordForm.tsx
    |   |           SignUpForm.tsx
    |   |           
    |   +---Navs
    |   |       FilterRightSideBar.tsx
    |   |       Footer.tsx
    |   |       Header.tsx
    |   |       Sidebar.tsx
    |   |       
    |   +---provider
    |   |       ProviderFreeSubscription.tsx
    |   |       ProviderPlanCard.tsx
    |   |       ProviderPlanList.tsx
    |   |       ProviderSubscriptionHistory.tsx
    |   |       RightSideBox.tsx
    |   |       
    |   +---shimmers
    |   |       ChatSidebarShimmer.tsx
    |   |       NoChatSelectedSShimmer.tsx
    |   |       ProfileDetailsShimmer.tsx
    |   |       ProviderAvailabilityShimmer.tsx
    |   |       ProviderPlanCardShimmer.tsx
    |   |       ServiceSelectShimmer.tsx
    |   |       TableShimmer.tsx
    |   |       
    |   +---svgs
    |   |       ChangePassword.tsx
    |   |       Error404.tsx
    |   |       FetchError.tsx
    |   |       FormFilling.tsx
    |   |       ManWorkingOnLaptop.tsx
    |   |       WomenLaptop.tsx
    |   |       
    |   +---table
    |   |   |   data-table.tsx
    |   |   |   DataTableColumnHeader.tsx
    |   |   |   
    |   |   +---adminTableOptions
    |   |   |       AddminProviderSubscriptionsTableOptions.tsx
    |   |   |       AdminPlansTableOptions.tsx
    |   |   |       AdminProviderTableOptions.tsx
    |   |   |       AdminSerivceTableOptions.tsx
    |   |   |       AdminUserTableOptions.tsx
    |   |   |       
    |   |   +---providerTableOptions
    |   |   |       providerSubscriptionsTableOptions.ts
    |   |   |       
    |   |   +---tableColumns
    |   |   |       adminTableColumns.tsx
    |   |   |       commonTableColumns.tsx
    |   |   |       providerTableColumns.tsx
    |   |   |       userTableColumns.tsx
    |   |   |       
    |   |   \---userTableOptions
    |   |           UserBookingTableOptions.tsx
    |   |           
    |   +---ui
    |   |       alert-dialog.tsx
    |   |       badge.tsx
    |   |       button.tsx
    |   |       calendar.tsx
    |   |       card.tsx
    |   |       chart.tsx
    |   |       checkbox.tsx
    |   |       command.tsx
    |   |       dialog.tsx
    |   |       dropdown-menu.tsx
    |   |       input.tsx
    |   |       popover.tsx
    |   |       radio-group.tsx
    |   |       scroll-area.tsx
    |   |       select.tsx
    |   |       SelectInput.tsx
    |   |       slider.tsx
    |   |       table.tsx
    |   |       TimePicker.tsx
    |   |       
    |   \---user
    |           UserPaymentSelection.tsx
    |           UserViewProviderCard.tsx
    |           
    +---lib
    |       axios.ts
    |       axiosInterceptor.ts
    |       queryClient.ts
    |       utils.ts
    |       
    +---pages
    |   +---admin
    |   |       AdminDashboardPage.tsx
    |   |       AdminMainPage.tsx
    |   |       AdminPaymentsPage.tsx
    |   |       AdminPlansPage.tsx
    |   |       AdminServiceProviderDetailPage.tsx
    |   |       AdminServiceProvidersPage.tsx
    |   |       AdminServicesPage.tsx
    |   |       AdminSubcriptionDetailedViewPage.tsx
    |   |       AdminSubscriptionsPage.tsx
    |   |       AdminUsersPage.tsx
    |   |       
    |   +---common
    |   |       AdminLoginPage.tsx
    |   |       ChatPage.tsx
    |   |       Error404Page.tsx
    |   |       LandingLayout.tsx
    |   |       LandingPage.tsx
    |   |       PasswordResetPage.tsx
    |   |       PaymentConfirmPage.tsx
    |   |       ProviderLoginPage.tsx
    |   |       UserLoginPage.tsx
    |   |       
    |   +---provider
    |   |       ProviderAddAddressPage.tsx
    |   |       ProviderAddressPage.tsx
    |   |       ProviderAddServiceAvailabilityPage.tsx
    |   |       ProviderAddServiceDetailsPage.tsx
    |   |       ProviderAppointmentsPage.tsx
    |   |       ProviderApprovalPendingPage.tsx
    |   |       ProviderAvailabilityPage.tsx
    |   |       ProviderChatPage.tsx
    |   |       ProviderDashboardPage.tsx
    |   |       ProviderMainPage.tsx
    |   |       ProviderNotificationsPage.tsx
    |   |       ProviderPaymentsPage.tsx
    |   |       ProviderProfilePage.tsx
    |   |       ProviderReviewsPage.tsx
    |   |       ProviderServicePage.tsx
    |   |       ProviderSubscriptionPage.tsx
    |   |       
    |   \---user
    |           UserAddressPage.tsx
    |           UserBookingsPage.tsx
    |           UserChatPage.tsx
    |           UserDashboardPage.tsx
    |           UserMainPage.tsx
    |           UserNotificationsPage.tsx
    |           UserPaymentsPage.tsx
    |           UserProfilePage.tsx
    |           UserServiceProviderDetailPage.tsx
    |           UserServiceSelectPage.tsx
    |           
    +---router
    |       appRouter.tsx
    |       protectedRoutes.tsx
    |       
    \---utils
        |   constants.ts
        |   helper.ts
        |   validator.ts
        |   
        +---apis
        |       adminPayment.api.ts
        |       adminPlan.api.ts
        |       adminProvider.api.ts
        |       adminService.api.ts
        |       adminSubscription.api.ts
        |       adminUser.api.ts
        |       auth.api.ts
        |       provider.api.ts
        |       user.api.ts
        |       
        +---helper
        |       dateFilter.ts
        |       priceFormatter.ts
        |       
        +---hooks
        |   +---adminHooks
        |   |       useAdminPlanActions.ts
        |   |       useAdminProviderActions.ts
        |   |       useAdminServiceActions.ts
        |   |       useAdminUserActions.ts
        |   |       
        |   \---userHooks
        |           useUserBookingActions.ts
        |           
        +---interface
        |   |   commonInterface.ts
        |   |   sliceInterface.ts
        |   |   
        |   +---api
        |   |       adminPlanApiInterface.ts
        |   |       adminProviderApiInterface.ts
        |   |       adminServiceApiInterface.ts
        |   |       adminSubscription.interface.ts
        |   |       adminUserApiInterface.ts
        |   |       authApiInterface.ts
        |   |       commonApiInterface.ts
        |   |       providerApiInterface.ts
        |   |       userApiInterface.ts
        |   |       
        |   +---componentInterface
        |   |       adminComponentInterface.ts
        |   |       commonComponentInterface.ts
        |   |       providerComponentInterface.ts
        |   |       shimmerInterface.ts
        |   |       
        |   \---entityInterface
        |           addressInterface.ts
        |           appServiceInterface.ts
        |           bookingInterface.ts
        |           paymentInterface.ts
        |           planInterface.ts
        |           providerInterface.ts
        |           providerServiceInterface.ts
        |           serviceAvailabilityInterface.ts
        |           subscriptionInterface.ts
        |           userInterface.ts
        |           
        \---redux
            |   appStore.ts
            |   
            \---slices
                    adminSlice.ts
                    authSlice.ts
                    providerSlice.ts
                    signFormSlice.ts
                    stateSlice.ts
                    userSlice.ts
```