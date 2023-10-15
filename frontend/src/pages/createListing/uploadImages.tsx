import React from "react";
import { Oval } from "react-loader-spinner";
interface ListingImageSection {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrorImageUrl: string;
  uploadFiles: () => void;
  disableUpload: boolean;
  listing: string[];
  loading: boolean;
  files: FileList | null;
  deleteImage: (image: string) => void;
}
const ListingImageSection: React.FC<ListingImageSection> = ({
  handleInputChange,
  formErrorImageUrl,
  uploadFiles,
  disableUpload,
  listing,
  loading,
  files,
  deleteImage,
}) => {
  return (
    <React.Fragment>
      <p className="font-semibold">
        Image:
        <span className="font-normal text-grey-700 ml-2">
          The first image will be the cover (max-7)
        </span>
      </p>
      <div className="flex items-center gap-4 justify-between">
        <label
          htmlFor="imageUrl"
          className={`cursor-pointer ${loading && "hover:cursor-not-allowed"}`}
        >
          <div className="p-3 border border-gray-300 rounded w-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {files && files.length > 0 && (
              <p className="text-center text-gray-500">
                {files.length} images selected
              </p>
            )}
            {files === null && (
              <p className="text-center text-gray-500">
                Click to select images
              </p>
            )}
          </div>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/*"
            multiple
            disabled={loading}
            className="hidden"
            onChange={handleInputChange}
          />
        </label>
        <button
          type="button"
          disabled={disableUpload || loading}
          className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:text-gray-300 disabled:border-gray-300 disabled:hover:cursor-not-allowed disabled:hover:shadow-none"
          onClick={uploadFiles}
        >
          Upload
        </button>
      </div>

      {loading && (
        <div className="flex flex-col justify-center h-[250px] items-center">
          <Oval
            height={80}
            width={80}
            color="rgba(0,0,0,0.4)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loading}
            ariaLabel="oval-loading"
            secondaryColor="rgba(0,0,0,0.2)"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          <p className="my-2">Uploading Images...</p>
        </div>
      )}
      {listing.length > 0 &&
        listing.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between p-3 border border-gray-300 rounded-lg"
          >
            <div>
              <img
                src={item}
                alt="listing-image"
                className="w-20 h-20 object-contain rounded-lg"
              />
            </div>
            <button
              className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 hover:cursor-pointer"
              onClick={() => deleteImage(item)}
            >
              Delete
            </button>
          </div>
        ))}
      {formErrorImageUrl && (
        <div className="text-red-500">{formErrorImageUrl}</div>
      )}
    </React.Fragment>
  );
};
export default React.memo(ListingImageSection);
