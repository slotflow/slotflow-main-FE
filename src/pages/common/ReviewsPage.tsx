import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import {
  ApiPaginatedResponse,
  FetchFunctionParams,
} from "@/utils/interface/commonInterface";
import { Button } from "@/components/ui/button";
import { userDeleteReview } from "@/utils/apis/user.api";
import noProfile from "../../assets/defaultImages/avatar.png";
import DataFetchingError from "@/components/common/DataFetchingError";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Review } from "@/utils/interface/entityInterface/reviewInterface";
import { FetchReviewsResponse } from "@/utils/interface/api/commonApiInterface";

interface ReviewsPageProps {
  providerId?: string;
  isUser?: boolean;
  isProvider?: boolean;
  isAdmin?: boolean;
  fetchFun: (
    query: FetchFunctionParams
  ) => Promise<ApiPaginatedResponse<FetchReviewsResponse>>;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({
  providerId,
  isUser = false,
  isProvider = false,
  isAdmin = false,
  fetchFun,
}) => {
  const limit = 2;

  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<ApiPaginatedResponse<FetchReviewsResponse>>({
    queryKey: ["reviews"],
    queryFn: ({ pageParam = 1 }) =>
      fetchFun({
        id: providerId,
        pagination: { page: pageParam as number, limit },
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.currentPage || !lastPage.totalPages) return undefined;
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <DataFetchingError message="Data fetching error" />
    );
  }

  const handleDeleteReview = (
    e: React.MouseEvent<HTMLButtonElement>,
    reviewId: Review["_id"]
  ) => {
    e.preventDefault();

    if (!reviewId) {
      toast.error("Please try again later");
      return;
    }

    const confirm = () =>
      toast(
        ({ closeToast }) => (
          <div className="flex flex-col gap-2">
            <p>Are you sure you want to delete this review?</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="destructive"
                className="cursor-pointer"
                onClick={async () => {
                  try {
                    const res = await userDeleteReview(reviewId);
                    if (res.success) {
                      toast.success(res.message || "Review deleted successfully");
                      queryClient.invalidateQueries({ queryKey: ["reviews"] });
                    }
                  } catch {
                    toast.error("Review deleting failed");
                  }
                  closeToast?.();
                }}
              >
                Yes, Delete
              </Button>
              <Button size="sm" variant="ghost" className="cursor-pointer" onClick={closeToast}>
                Cancel
              </Button>
            </div>
          </div>
        ),
        { autoClose: false }
      );

    confirm();
  };

  const reviews = data?.pages.flatMap((page) => (page.data ? page.data : [])) || [];

  if (reviews.length === 0) {
    return (
      <DataFetchingError message="No data found in database" className="p-4"/>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card
            key={review._id}
            className="border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader className="flex flex-col gap-1 pb-2">
              <CardTitle className="text-lg font-semibold">
                ⭐ {review.rating}
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </CardHeader>

            <CardContent className="flex flex-col h-full pt-0">
              <p className="mb-4 text-sm leading-relaxed">
                {review.reviewText}
              </p>

              <div className="flex-grow" />

              {/* Provider Info */}
              {!isProvider && (
                <div className="flex items-center gap-3 border-t pt-3 mt-3">
                  <img
                    src={review.providerId.profileImage || noProfile}
                    alt="provider"
                    className="size-10 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium">Service Provider</p>
                    <p className="text-muted-foreground">
                      {review.providerId.username}
                    </p>
                  </div>
                </div>
              )}

              {/* User Info */}
              {!isUser &&  (
                <div className="flex items-center gap-3 border-t pt-3 mt-3">
                  <img
                    src={review.userId.profileImage || noProfile}
                    alt="user"
                    className="size-10 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium">User</p>
                    <p className="text-muted-foreground">
                      {review.userId.username}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                {isUser && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeleteReview(e, review._id)}
                  >
                    Delete
                  </Button>
                )}
                {isProvider && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() =>
                      console.log("Report review", review._id)
                    }
                  >
                    Report
                  </Button>
                )}
                {isAdmin && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() =>
                      console.log(
                        review.isBlocked
                          ? "Unblock review"
                          : "Block review",
                        review._id
                      )
                    }
                  >
                    {review.isBlocked ? "Unblock" : "Block"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="cursor-pointer"
            variant="outline"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
