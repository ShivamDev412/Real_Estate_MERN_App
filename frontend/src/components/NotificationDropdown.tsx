import { BsFillBellFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import NoData from "./noData";
import { useNotifications } from "../pages/notifications/controller";
import { useEffect } from "react";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "../utils/socketService";
import Toast from "../utils/toastMessage";
import { getApiCall } from "../utils/apiCalls";
import { API_TYPE } from "../utils/endpoints";
import { RootState } from "../redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  setNotifications,
  setDropDownNotifications,
} from "../redux/slice/notifications/notificationSlice";
import store from "../redux/store";
export interface NotificationProps {
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
const NotificationDropdown = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { navigate, markAsRead, markAllAsRead, currentUser } =
    useNotifications();
  const { dropDownNotifications, totalCount } = useSelector(
    (state: RootState) => state.notifications
  );
  const fetchNotifications = async (pageNumber: number = 1) => {
    try {
      const userId = currentUser?.data?.user?.id;
      const response = await getApiCall(
        `${API_TYPE.USER}/notifications/${userId}?page=${pageNumber}`
      );
      const { success, notifications, page, totalCount, totalUnreadCount } =
        response;
      if (success) {
        dispatch(setDropDownNotifications(notifications));
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

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);
  useEffect(() => {
    if (location.pathname !== "/notifications") fetchNotifications();
    const socket = getSocket();
    if (socket) {
      socket.on("newReview", (newNotification: NotificationProps) => {
        if (newNotification.userId === currentUser.data.user.id) {
          Toast(
            `You have new notification ${newNotification.title}`,
            "success"
          );
          const currentDropDownNotifications =
            store.getState().notifications.dropDownNotifications;
          dispatch(
            setDropDownNotifications([
              newNotification,
              ...currentDropDownNotifications.slice(0, 9),
            ])
          );
          dispatch(
            setNotifications({
              totalCount: totalCount + 1,
            })
          );
        }
      });
    }
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("newReview");
      }
    };
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li>
          <BsFillBellFill className="fill-white h-5 w-5 hover:cursor-pointer" />
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-2 max-h-[400px] min-h-[400px] overflow-auto flex flex-col justify-between">
        <div>
          <section className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-[22px] italic">Notifications</h3>
            {dropDownNotifications?.filter(
              (notification) => !notification.isRead
            ).length !== 0 && (
              <button
                className="hover:text-zinc-600 font-semibold"
                onClick={markAllAsRead}
              >
                Mark All Read
              </button>
            )}
          </section>

          {dropDownNotifications?.length !== 0 &&
            dropDownNotifications?.map((notification, index: number) => {
              if (index <= 9)
                return (
                  <DropdownMenuItem
                    key={notification?._id}
                    className={`flex gap-1 text-md hover:cursor-pointer my-1 items-center w-full ${
                      notification.isRead ? "bg-white" : "bg-gray-200"
                    }`}
                    onClick={() => {
                      !notification.isRead && markAsRead(notification?._id);
                      navigate(`/listing-detail/${notification.listingId}`);
                    }}
                  >
                    <Avatar>
                      <AvatarImage
                        src={notification.profileImage}
                        alt={`${notification.userName}_image`}
                      />
                      <AvatarFallback>
                        {notification.userName.charAt(0).toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <section className="flex flex-col w-full">
                      <h4 className="font-semibold text-lg text-ellipsis overflow-hidden whitespace-nowrap max-w-[90%]">
                        {notification.title}
                      </h4>
                      <p>{notification.message}</p>
                      <div className="flex justify-between items-center">
                        <p className="italic text-[12px]">
                          {notification.isRead ? "read" : "unread"}
                        </p>
                        <p className="text-[12px] text-right">
                          {moment(notification.createdAt).fromNow()}
                        </p>
                      </div>
                    </section>
                  </DropdownMenuItem>
                );
            })}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/notifications")}>
          <button className="flex justify-center w-full font-semibold hover:text-zinc-600">
            Show All Notifications.
          </button>
        </DropdownMenuItem>

        {dropDownNotifications?.length === 0 && (
          <NoData title="notifications" styles="" />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
