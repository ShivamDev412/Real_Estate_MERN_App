import React from "react";
import { useCreateListingController } from "./controller";
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
    listingId,
    goBack,
  
  } = useCreateListingController();
  return (
    <main className="px-3 py-7">
      <h1 className="text-3xl font-semibold text-center my-7">
        {listingId ? "Update Listing" : "Create A Listing"}
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
                checked={listing.sale}
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
                  min={1}
                  max={10}
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
                  min={1}
                  max={10}
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
              min={50}
              max={1000000}
              label={"Regular Price ($ / month)"}
              onChange={(e) => handleInputChange(e)}
            />
            {formError?.regularPrice && (
              <div className="text-red-500">{formError?.regularPrice}</div>
            )}
            {listing.offer && (
              <React.Fragment>
                <NumberInput
                  id="discountPrice"
                  value={listing.discountPrice}
                  type="number"
                  min={0}
                  max={1000000}
                  label={"Discounted Price ($ / month)"}
                  onChange={(e) => handleInputChange(e)}
                />
                {formError?.discountPrice && (
                  <div className="text-red-500">{formError?.discountPrice}</div>
                )}
              </React.Fragment>
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
        <div className="flex mx-auto gap-3 w-full sm:w-1/2 mt-[40px]">
          <Button
            value={"Cancel"}
            type="button"
            disabled={loading}
            onClick={goBack}
            className="bg-red-700"
          />
          <Button
            value={listingId ? "Update Listing" : "Create Listing"}
            type={"submit"}
            disabled={loading}
            className="bg-slate-700"
          />
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
