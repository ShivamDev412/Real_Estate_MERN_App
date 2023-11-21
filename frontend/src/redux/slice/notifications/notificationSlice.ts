import { createSlice } from "@reduxjs/toolkit";
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
export interface Notifications {
  dropDownNotifications: NotificationProps[];
  data: NotificationProps[];
  totalUnreadCount: number;
  pageNumber: number;
  totalCount: number;
}
const initialState: Notifications = {
  dropDownNotifications: [],
  data: [],
  totalUnreadCount: 0,
  pageNumber: 1,
  totalCount: 0,
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setDropDownNotifications: (state, action) => {
      state.dropDownNotifications = action.payload;
    },
    setNotifications: (state, action) => {
      state.data = action.payload.notifications;
      state.totalUnreadCount = action.payload.totalUnreadCount;
      state.pageNumber = action.payload.pageNumber;
      state.totalCount = action.payload.totalCount;
    },
  },
});

export const { setNotifications, setDropDownNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
