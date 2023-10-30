import { RxCross2 } from "react-icons/rx";
import FormWrapper from "../../wrappers/formWrapper";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { useSettingsController } from "./controller";
import { BsCheckLg } from "react-icons/bs";
const VerifiedButton = () => {
  return (
    <button className="flex items-center gap-1 border border-green-700 rounded-2xl px-2 py-1 bg-green-900/10 text-green-700 font-medium justify-between w-fit">
      <BsCheckLg style={{ strokeWidth: 1 }} /> Verified
    </button>
  );
};
const UnverifiedButton = ({
  type,
  verifyData,
}: {
  type: string;
  verifyData: (type: string) => void;
}) => {
  return (
    <button
      className="flex items-center gap-1 border border-red-700 rounded-2xl px-2 py-1 bg-red-900/10 text-red-700 font-medium justify-between w-fit"
      onClick={() => verifyData(type)}
    >
      <RxCross2 style={{ strokeWidth: 1 }} /> Unverified
    </button>
  );
};
const Detail = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="my-4 text-lg">
      <p className="flex xs:flex-col lg:flex-row gap-1">
        <span className="font-bold"> {title}</span>
        <span> {value}</span>
      </p>
    </div>
  );
};
function Settings() {
  const {
    deleteAccount,
    setOpenModal,
    openModal,
    currentUser,
    verifyData,
    changePassword,
  } = useSettingsController();
  return (
    <FormWrapper>
      <h1 className="text-3xl text-center font-semibold my-7">Settings</h1>
      <section className="my-6">
        <h3 className="text-xl font-bold">Personal Information</h3>
        <Detail
          title="Name:"
          value={`  ${currentUser.data.user.firstName} ${currentUser.data.user.lastName}`}
        />
        <Detail title="Username:" value={currentUser.data.user.username} />

        <div className="my-6 flex justify-between items-center">
          <p className="text-lg xs:flex-col lg:flex-row flex gap-1">
            <span className="font-bold"> Email:</span>{" "}
            <span> {currentUser.data.user.email}</span>
          </p>

          {currentUser.data.user.emailVerified ? (
            <VerifiedButton />
          ) : (
            <UnverifiedButton type="email" verifyData={verifyData} />
          )}
        </div>
        <div className="my-6 flex justify-between items-center">
          <p className="text-lg xs:flex-col lg:flex-row flex gap-1">
            <span className="font-bold"> Phone Number:</span>{" "}
            <span>{currentUser.data.user.phoneNo}</span>
          </p>
          {currentUser.data.user.phoneNoVerified ? (
            <VerifiedButton />
          ) : (
            <UnverifiedButton type="phoneNo" verifyData={verifyData} />
          )}
        </div>
      </section>
      <section className="my-6">
        <h3 className="text-xl font-bold">Security</h3>
        <div className="my-6">
          <button className="font-bold" onClick={changePassword}>
            Change Password
          </button>
        </div>
      </section>
      <section className="my-4">
        <button
          className="bg-red-700 text-white rounded-lg px-2 py-1 font-semibold"
          onClick={() => setOpenModal(true)}
        >
          Delete Account
        </button>
      </section>
      <Modal modalIsOpen={openModal} closeModal={() => {}}>
        <div>
          <h1 className="text-3xl text-center font-semibold my-7">
            Delete Account!
          </h1>
          <p>Are you sure you want to delete your account?</p>
          <div className="flex items-center my-4 gap-6 justify-center">
            <Button
              value={"Cancel"}
              disabled={false}
              onClick={() => setOpenModal(false)}
              className="bg-red-700 p-2 w-1/4"
            />
            <Button
              value={"Yes"}
              disabled={false}
              onClick={deleteAccount}
              className="bg-green-700 p-2 w-1/4"
            />
          </div>
        </div>
      </Modal>
    </FormWrapper>
  );
}

export default Settings;
