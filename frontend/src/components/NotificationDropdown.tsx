import { BsFillBellFill } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/DropdownMenu";
import ENDPOINTS from "../utils/endpoints";

const NotificationDropdown = ({
  currentUser,
  navigation,
}: {
  currentUser: any;
  navigation: any;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li>
          <BsFillBellFill className="fill-white h-5 w-5 hover:cursor-pointer" />
        </li>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-2">
        <div></div>
        <h3 className="font-semibold text-xl mb-2 italic">Notifications</h3>
        <DropdownMenuItem
          className="flex items-center gap-2 hover:cursor-pointer text-lg"
          onClick={() => navigation(ENDPOINTS.USER_LISTINGS)}
        ></DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 hover:cursor-pointer text-lg"
          onClick={() => {
            navigation(ENDPOINTS.UPDATE_PROFILE);
          }}
        ></DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 hover:cursor-pointer text-lg"
          onClick={() => {
            navigation(ENDPOINTS.SETTINGS);
          }}
        ></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NotificationDropdown;
