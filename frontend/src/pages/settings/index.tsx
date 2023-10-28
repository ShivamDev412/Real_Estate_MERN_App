import FormWrapper from "../../wrappers/formWrapper";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { useSettingsController } from "./controller";
function Settings() {
  const { deleteAccount, changePassword, setOpenModal, openModal } =
    useSettingsController();
  return (
    <FormWrapper>
      <h1 className="text-3xl text-center font-semibold my-7">Settings</h1>
      <section className="flex gap-4 flex-col">
        <Button
          value={"Change Password"}
          disabled={false}
          onClick={changePassword}
          className="w-full bg-green-700"
        />
        <Button
          value={"Delete Account"}
          disabled={false}
          onClick={() => setOpenModal(true)}
          className="w-full bg-red-700"
        />
      </section>
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
