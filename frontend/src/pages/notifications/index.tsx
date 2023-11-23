import moment from "moment";
import { HiDotsVertical } from "react-icons/hi";

import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";
import NoData from "../../components/noData";
import { useNotifications } from "./controller";
import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/DropdownMenu";
const Notifications = () => {
  const {
    data,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    navigate,
    totalCount,
    pageNumber,
    onPageChange,
    totalUnreadCount,
    deleteNotification,
    deleteAllNotifications,
  } = useNotifications();
  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <section className="flex flex-col w-[90%] sm:w-[80%] mx-auto py-[50px]">
      <div className="flex sm:justify-between sm:items-center flex-col sm:flex-row mb-2 gap-2">
        <h2 className="text-[30px] font-semibold w-fit">
          Notifications
          <span className="italic text-[24px]"> ({totalUnreadCount})</span>
        </h2>
        <div className="flex gap-2 flex-wrap w-fit">
          {data?.length !== 0 && (
            <Button
              value={"Delete All Notifications"}
              className="bg-slate-600 w-fit capitalize font-semibold whitespace-nowrap px-2 xs:text-[14px] md:text-lg"
              onClick={deleteAllNotifications}
            />
          )}
          {totalUnreadCount !== 0 && (
            <Button
              value={"Mark All As Read"}
              className="bg-slate-600 w-fit capitalize font-semibold whitespace-nowrap px-2 xs:text-[14px] md:text-lg"
              onClick={markAllAsRead}
            />
          )}
        </div>
      </div>

      <section className="bg-white rounded-lg shadow p-4 mt-2">
        {data?.length !== 0 &&
          data?.map((notification, index: number) => {
            return (
              <section
                key={notification._id}
                className={`text-md hover:cursor-pointer w-full p-2 rounded-lg my-1 ${
                  notification?.isRead ? "bg-white" : "bg-gray-200"
                }`}
                onClick={() => {
                  !notification?.isRead && markAsRead(notification?._id);
                  navigate(`/listing-detail/${notification.listingId}`);
                }}
              >
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={notification?.profileImage}
                      alt={`${notification?.userName}_image`}
                    />
                    <AvatarFallback>
                      {notification?.userName.charAt(0).toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <section className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <h4 className="font-semibold text-lg text-ellipsis overflow-hidden whitespace-nowrap max-w-[90%]">
                        {notification?.title}
                      </h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          {" "}
                          <HiDotsVertical className="focus:outline-0" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit">
                          <DropdownMenuItem
                            className="hover:cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification?._id);
                            }}
                          >
                            Mark as Read
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification?._id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p>{notification?.message}</p>
                    <div className="flex justify-between items-center">
                      <p
                        className={`italic text-md ${
                          notification?.isRead
                            ? "text-zinc-400"
                            : "text-zinc-600"
                        }`}
                      >
                        {notification?.isRead ? "read" : "unread"}
                      </p>
                      <p className="text-sm text-right">
                        {moment(notification?.createdAt).fromNow()}
                      </p>
                    </div>
                  </section>
                </div>

                {notification?.isRead && index < data?.length - 1 && (
                  <div className="border-b-1 border border-zinc-100 mt-2" />
                )}
              </section>
            );
          })}
        {data?.length === 0 && <NoData title="notifications" styles="" />}
      </section>
      {totalCount > 9 ? (
        <div className="flex justify-end mt-[50px]">
          <Pagination
            pageNo={pageNumber}
            totalPageCount={Math.ceil(totalCount / 9)}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};
export default Notifications;
