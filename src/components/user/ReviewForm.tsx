import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { userAddReview } from "@/utils/apis/user.api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { toggleReviewAddForm } from "@/utils/redux/slices/userSlice";
import { Review } from "@/utils/interface/entityInterface/reviewInterface";
import { useModalAnimation } from "@/utils/hooks/systemHooks/useModalAnimation";

type ReviewFormValues = Pick<Review, "reviewText" | "rating">;

const ReviewForm: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { selectedBookingId, selectedBookingProviderId } = useSelector((state: RootState) => state.user);

    const { closeModal, modalRef } = useModalAnimation(() => {
        dispatch(toggleReviewAddForm({ id: null, isOpen: false, providerId: null }));
    });

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        closeModal();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReviewFormValues>({
        defaultValues: {
            reviewText: "",
            rating: 0,
        },
    });

    const submitHandler = async ({ reviewText, rating }: ReviewFormValues) => {
        if (!selectedBookingId || !selectedBookingProviderId) {
            toast.error("Something went wrong, refresh the page");
            return;
        }

        try {
            const res = await userAddReview({
                bookingId: selectedBookingId,
                reviewText,
                rating,
                providerId: selectedBookingProviderId
            });

            if (res.success) {
                toast.success(res.message);
                dispatch(toggleReviewAddForm({ id: null, isOpen: false, providerId: null }));
            } else {
                toast.error(res.message || "Review adding failed");
            }
        } catch {
            toast.error("Review adding failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-[var(--background)] rounded-lg shadow-lg p-6 w-full max-w-md mx-2" ref={modalRef}>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 border p-4" >
                    <h4 className="text-xl">Review Form</h4>
                    <div className="space-y-1">
                        <Label htmlFor="reviewText" className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]"
                        >Review</Label>
                        <input
                            id="reviewText"
                            placeholder="Write your review..."
                            type="text"
                            className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-2 md:px-3 md:py-2.5 text-[var(--textOne)] outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 text-sm md:text-[16px] focus:outline-[var(--mainColor)]"
                            {...register("reviewText", {
                                required: "Review is required",
                                minLength: { value: 5, message: "Review must be at least 5 characters" },
                                maxLength: { value: 1000, message: "Review must not exceed 1000 characters" },
                            })}
                        />
                        {errors.reviewText && (
                            <span className="text-[var(--error-color)] text-xs px-2 line-clamp-4" >{errors.reviewText.message}</span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="rating" className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]"
                        >Rating</Label>
                        <input
                            id="rating"
                            placeholder="Enter rating (1-5)"
                            type="number"
                            className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-2 md:px-3 md:py-2.5 text-[var(--textOne)] outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 text-sm md:text-[16px] focus:outline-[var(--mainColor)]"
                            {...register("rating", {
                                required: "Rating is required",
                                min: { value: 1, message: "Rating must be at least 1" },
                                max: { value: 5, message: "Rating cannot exceed 5" },
                                valueAsNumber: true, // ensures react-hook-form stores it as number
                                validate: (val: number) => Number.isInteger(val) || "Rating must be an integer",
                            })}
                        />
                        {errors.rating && (
                            <span className="text-[var(--error-color)] text-xs px-2 line-clamp-4">{errors.rating.message}</span>
                        )}
                    </div>

                    <div className="flex gap-3 justify-end">
                        <Button type="button" variant="outline" className="cursor-pointer" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" className="cursor-pointer">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
