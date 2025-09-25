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
import { ShieldCheck, ShieldX, Trash } from "lucide-react";
import noProfile from "../../assets/defaultImages/avatar.png";
import { providerReportReview } from "@/utils/apis/provider.api";
import DataFetchingError from "@/components/common/DataFetchingError";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Review } from "@/utils/interface/entityInterface/reviewInterface";
import { adminChangeReviewBlockStatus } from "@/utils/apis/adminReview.api";
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
                    if (res === 204) {
                      toast.success("Review deleted successfully");
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

  const handleReportReview = async (
    e: React.MouseEvent<HTMLButtonElement>,
    reviewId: Review["_id"]
  ) => {
    e.preventDefault();
    if (!reviewId) {
      toast.error("Please try again later");
      return;
    }

    await providerReportReview(reviewId)
      .then((res) => {
        if (res === 204) {
          toast.success("Review report status changed");
          queryClient.invalidateQueries({ queryKey: ["reviews"] });
        }
      })
      .catch(() => {
        toast.error("Review reporting failed");
      })
  }

  const handleChangeReviewBlockStatus = async (
    e: React.MouseEvent<HTMLButtonElement>,
    reviewId: Review["_id"]
  ) => {

    e.preventDefault();

    if (!reviewId) {
      toast.error("Please try again later");
      return;
    }

    await adminChangeReviewBlockStatus(reviewId)
      .then((res) => {
        if (res === 204) {
          toast.success("Review block status updated");
          queryClient.invalidateQueries({ queryKey: ["reviews"] });
        }
      })
      .catch(() => {
        toast.error("Review block status updating failed");
      })
  }

  const reviews = data?.pages.flatMap((page) => (page.data ? page.data : [])) || [];

  if (reviews.length === 0) {
    return (
      <DataFetchingError message="No data found in database" className="p-4" />
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

              {!isUser && (
                <div className="flex items-center gap-3 border-t pt-3 mt-3">
                  <img
                    src={review.userId.profileImage || noProfile}
                    alt="user"
                    className="size-10 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium">Reviewer</p>
                    <p className="text-muted-foreground">
                      {review.userId.username}
                    </p>
                  </div>
                </div>
              )}

              {!isUser && (
                <div className="grid grid-cols-2 gap-4 mt-4 border-t pt-4">
                  <div className="flex items-center">
                    {review.reported ? (
                      <span className="flex items-center space-x-2">
                        <ShieldX className="w-4 h-4 text-red-500" />
                        <span>
                          Reported
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span>
                          Not reported
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center">
                    {review.isBlocked ? (
                      <span className="flex items-center space-x-2">
                        <ShieldX className="w-4 h-4 text-red-500" />
                        <span>
                          Blocked
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span>
                          Not Blocked
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                {isUser && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeleteReview(e, review._id)}
                  >
                    <Trash className="text-red-500" /> Delete
                  </Button>
                )}
                {isProvider && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleReportReview(e, review._id)}
                  >
                    {review.reported ? (
                      <span className="flex items-center space-x-2">
                        <ShieldCheck className="text-green-500" />
                        <span>
                          Unreport
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <ShieldX className="text-red-500" />
                        <span>
                          Report
                        </span>
                      </span>
                    )}
                  </Button>
                )}
                {isAdmin && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleChangeReviewBlockStatus(e, review._id)}
                  >
                    {review.isBlocked ? (
                      <span className="flex items-center space-x-2">
                        <ShieldCheck className="text-green-500" />
                        <span>
                          Unblock
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <ShieldX className="text-red-500" />
                        <span>
                          Block
                        </span>
                      </span>
                    )}
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
