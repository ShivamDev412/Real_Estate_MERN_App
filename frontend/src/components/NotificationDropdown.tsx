import { BsFillBellFill } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/DropdownMenu";
import { API_TYPE } from "../utils/endpoints";
import { useEffect, useState } from "react";
import socket from "../utils/socketService";
import { getApiCall } from "../utils/apiCalls";
import Toast from "../utils/toastMessage";
import NoData from "./noData";
import moment from "moment";
interface Notification {
  _id: string;
  message: string;
  title: string;
  listingId: string;
  isRead: string;
  userId: string;
  createdAt: string;
}
const NotificationDropdown = ({
  currentUser,
  navigation,
}: {
  currentUser: any;
  navigation: any;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.on("newReview", (newNotification: Notification) => {
      Toast("You have new notification", "success");
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    });
    return () => {
      socket.off("newReview");
    };
  }, []);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = currentUser?.data?.user?.id;
        const response = await getApiCall(
          `${API_TYPE.USER}/notifications/${userId}`
        );
        if (response.success) {
          setNotifications(response.notifications);
        } else {
          Toast(response.message, "error");
        }
      } catch (error: any) {
        Toast(error.message, "error");
      }
    };
    fetchNotifications();
  }, [currentUser]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li>
          <BsFillBellFill className="fill-white h-5 w-5 hover:cursor-pointer" />
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-2 max-h-[400px] overflow-auto">
        <h3 className="font-semibold text-xl mb-2 italic">Notifications</h3>
        {notifications.length !== 0 &&
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification._id}
              className={`flex flex-col text-md hover:cursor-pointer my-1 ${
                notification.isRead ? "bg-white" : "bg-gray-200"
              }`}
              onClick={() =>
                navigation(`/listing-detail/${notification.listingId}`)
              }
            >
              <span> {notification.message}</span>
              <span className="text-[12px] w-full text-right">{moment(notification.createdAt).fromNow()}</span>
            </DropdownMenuItem>
          ))}
        {notifications.length === 0 && (
          <NoData title="notifications" styles="" />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NotificationDropdown;
