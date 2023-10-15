import { createListingController } from "./controller";
import Input, {
  NumberInput,
  Textarea,
  ToggleSwitch,
} from "../../components/Input";
import Button from "../../components/Button";
import ListingImageSection from "./uploadImages";

function CreateListing() {
  const {
    listing,
    uploadFiles,
    handleInputChange,
    createListing,
    formError,
    handleToggleInputChange,
    disableUpload,
    loading,
    files,
    deleteImage,
  } = createListingController();
  return (
    <main className="px-3 py-7">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create A Listing
      </h1>
      <form className="" onSubmit={createListing}>
        <div className="flex flex-col w-full md:flex-row lg:w-[80%] mx-auto justify-between my-4 gap-4">
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            <Input
              id="name"
              value={listing.name}
              type="text"
              onChange={(e) => handleInputChange(e)}
            />
            {formError?.name && (
              <div className="text-red-500">{formError?.name}</div>
            )}
            <Textarea
              id="description"
              value={listing.description}
              onChange={(e) => handleInputChange(e)}
            />
            {formError?.description && (
              <div className="text-red-500">{formError?.description}</div>
            )}
            <Textarea
              id="address"
              value={listing.address}
              onChange={(e) => handleInputChange(e)}
            />
            {formError?.address && (
              <div className="text-red-500">{formError?.address}</div>
            )}
            <div className="flex gap-2 flex-wrap">
              <ToggleSwitch
                id="sale"
                checked={listing.furnished}
                onChange={(e) => handleToggleInputChange(e)}
              />
              <ToggleSwitch
                id="offer"
                checked={listing.offer}
                onChange={(e) => handleToggleInputChange(e)}
              />
              <ToggleSwitch
                id="rent"
                checked={listing.rent}
                onChange={(e) => handleToggleInputChange(e)}
              />
              <ToggleSwitch
                id="furnished"
                checked={listing.furnished}
                onChange={(e) => handleToggleInputChange(e)}
              />
              <ToggleSwitch
                id="parking"
                checked={listing.parking}
                onChange={(e) => handleToggleInputChange(e)}
              />
            </div>
            <div className="flex gap-2 justify-between ">
              <div className="w-full">
                {" "}
                <NumberInput
                  id="bathroom"
                  label="Bathroom"
                  value={listing.bathroom}
                  type="number"
                  onChange={(e) => handleInputChange(e)}
                />
                {formError?.bathroom && (
                  <div className="text-red-500">{formError?.bathroom}</div>
                )}
              </div>
              <div className="w-full">
                {" "}
                <NumberInput
                  id="bedroom"
                  label="Bedroom"
                  value={listing.bedroom}
                  type="number"
                  onChange={(e) => handleInputChange(e)}
                />
                {formError?.bedroom && (
                  <div className="text-red-500">{formError?.bedroom}</div>
                )}
              </div>
            </div>
            <NumberInput
              id="regularPrice"
              value={listing.regularPrice}
              type="number"
              label={"Regular Price ($ / month)"}
              onChange={(e) => handleInputChange(e)}
            />
            {formError?.regularPrice && (
              <div className="text-red-500">{formError?.regularPrice}</div>
            )}
            <NumberInput
              id="discountedPrice"
              value={listing.discountedPrice}
              type="number"
              label={"Discounted Price ($ / month)"}
              onChange={(e) => handleInputChange(e)}
            />
            {formError?.discountedPrice && (
              <div className="text-red-500">{formError?.discountedPrice}</div>
            )}
          </div>
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            <ListingImageSection
              handleInputChange={handleInputChange}
              formErrorImageUrl={formError.imageUrl}
              uploadFiles={uploadFiles}
              disableUpload={disableUpload}
              listing={listing.imageUrl}
              loading={loading}
              files={files}
              deleteImage={deleteImage}
            />
          </div>
        </div>
        <div className="w-1/2 md:w-1/4 mx-auto">
          <Button
            value={"Create Listing"}
            type="submit"
            disabled={false}
            className="bg-slate-700"
          />
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
