import { Link } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsPhoneFill } from "react-icons/bs";
import FormWrapper from "../../wrappers/formWrapper";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { useSettingsController } from "./controller";
import ENDPOINTS from "../../utils/endpoints";
const SettingsList = ({
  link,
  title,
  icon,
  isVerified = false,
}: {
  link: string;
  title: string;
  icon?: any;
  isVerified?: boolean;
}) => {
  return (
    <li
      className={`border-b p-3 text-lg flex gap-2 items-center ${
        isVerified && "text-green-700"
      }`}
    >
      {!isVerified ? (
        <Link to={link} className="text-lg flex gap-2 items-center">
          {icon}
          {title}
        </Link>
      ) : (
        <>
          {" "}
          {icon}
          {title}
        </>
      )}
    </li>
  );
};
function Settings() {
  const { deleteAccount, setOpenModal, openModal, currentUser } =
    useSettingsController();
  return (
    <FormWrapper>
      <h1 className="text-3xl text-center font-semibold my-7">Settings</h1>
      <ul className="flex flex-col border rounded-lg">
        <SettingsList
          link={ENDPOINTS.VERIFY_EMAIL}
          title={
            currentUser.data.user.emailVerified
              ? "Email Verified"
              : "Verify Email"
          }
          isVerified={currentUser.data.user.emailVerified}
          icon={<BsPhoneFill className="h-6 w-6" />}
        />
        <SettingsList
          link={ENDPOINTS.VERIFY_PHONE_NUMBER}
          title="Verify Phone Number"
          isVerified={currentUser.data.user.phoneNoVerified}
          icon={<BsPhoneFill className="h-6 w-6" />}
        />
        <SettingsList
          link={ENDPOINTS.CHANGE_PASSWORD}
          title="Change Password"
          icon={<RiLockPasswordFill className="h-6 w-6" />}
        />
      </ul>
      <div className="my-3 w-fit">
        <Button
          value={"Delete Account"}
          disabled={false}
          onClick={() => setOpenModal(true)}
          className="w-full bg-red-700 p-2"
        />
      </div>

      {/* <section className="flex gap-4 flex-col">
        <Button
          value={"Change Password"}
          disabled={false}
          onClick={changePassword}
          className="w-full bg-green-700"
        />
       
      </section> */}
      <Modal modalIsOpen={openModal} closeModal={() => {}}>
        <div>
          <h1 className="text-3xl text-center font-semibold my-7">
            Delete Account!
          </h1>
          <p>Are you sure you want to delete your account?</p>
          <div className="flex items-center my-4 gap-6">
            <Button
              value={"Cancel"}
              disabled={false}
              onClick={() => setOpenModal(false)}
              className="bg-red-700"
            />
            <Button
              value={"Yes"}
              disabled={false}
              onClick={deleteAccount}
              className="bg-green-700"
            />
          </div>
        </div>
      </Modal>
    </FormWrapper>
  );
}

export default Settings;
