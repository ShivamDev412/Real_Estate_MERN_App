import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteApiCall, getApiCall, putApiCall } from "../../utils/apiCalls";
import { API_TYPE } from "../../utils/endpoints";
import Toast from "../../utils/toastMessage";
import { RootState } from "../../redux/reducers";
import {
  setDropDownNotifications,
  setNotifications,
} from "../../redux/slice/notifications/notificationSlice";
export interface Notification {
  _id: string;
  message: string;
  title: string;
  listingId: string;
  profileImage: string;
  userName: string;
  isRead: string;
  userId: string;
  createdAt: string;
}
export const useNotifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, totalUnreadCount, pageNumber, totalCount } = useSelector(
    (state: RootState) => state.notifications
  );
  const { currentUser } = useSelector((state: RootState) => state.user);
  const fetchNotifications = async (pageNumber: number = 1) => {
    try {
      const userId = currentUser?.data?.user?.id;
      const response = await getApiCall(
        `${API_TYPE.USER}/notifications/${userId}?page=${pageNumber}`
      );
      const { success, notifications, page, totalCount, totalUnreadCount } =
        response;
      if (success) {
        if (pageNumber === 1) dispatch(setDropDownNotifications(notifications));
        dispatch(
          setNotifications({
            notifications,
            totalCount,
            pageNumber: page,
            totalUnreadCount,
          })
        );
      } else {
        Toast(response.message, "error");
      }
    } catch (error: any) {
      Toast(error.message, "error");
    }
  };
  const markAsRead = async (notificationId: string) => {
    try {
      const notifications = await putApiCall(
        `${API_TYPE.USER}/mark-notification_as-read`,
        { notificationId }
      );
      if (notifications.success) {
        fetchNotifications();
      } else {
        Toast(notifications.message, "error");
      }
    } catch (error: any) {
      console.log(error);
      Toast(error.message, "error");
    }
  };
  const markAllAsRead = async () => {
    try {
      const notifications = await putApiCall(
        `${API_TYPE.USER}/mark-notification_as-read`,
        { userId: currentUser.data.user.id }
      );
      if (notifications.success) {
        fetchNotifications();
      } else {
        Toast(notifications.message, "error");
      }
    } catch (error: any) {
      console.log(error);
      Toast(error.message, "error");
    }
  };
  const onPageChange = (page: number) => {
    dispatch(
      setNotifications({
        pageNumber: page,
      })
    );
    fetchNotifications(page);
  };
  const deleteNotification = async (notificationId: string) => {
    try {
      const notifications = await deleteApiCall(
        `${API_TYPE.USER}/delete-notification/${notificationId}`
      );
      if (notifications.success) {
        Toast(notifications.message, "success");
        fetchNotifications();
      } else {
        Toast(notifications.message, "error");
      }
    } catch (error: any) {
      console.log(error);
      Toast(error.message, "error");
    }
  };
  const deleteAllNotifications = async () => {
    try {
      const notifications = await deleteApiCall(
        `${API_TYPE.USER}/delete-notification?userId=${currentUser.data.user.id}`
      );
      if (notifications.success) {
        Toast(notifications.message, "success");
        fetchNotifications();
      } else {
        Toast(notifications.message, "error");
      }
    } catch (error: any) {
      console.log(error);
      Toast(error.message, "error");
    }
  };
  return {
    data,
    totalUnreadCount,
    totalCount,
    pageNumber,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    currentUser,
    setNotifications,
    navigate,
    onPageChange,
    deleteNotification,
    deleteAllNotifications,
  };
};
