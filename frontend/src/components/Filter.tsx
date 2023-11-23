import { FaFilter } from "react-icons/fa";
import { NumberInput, ToggleSwitch } from "../components/Input";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
interface Filter {
  showFilter: boolean;
  toggleFilter: () => void;
  listingFilter: any;
  handleToggleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFilter: () => void;
  applyFilter: () => void;
  activeFilterCount: number;
  closeFilter: () => void;
}

const Filter: React.FC<Filter> = ({
  listingFilter,
  handleToggleInputChange,
  handlePriceFilter,
  clearFilter,
  applyFilter,
  activeFilterCount,
}) => {
  return (
    <Popover>
      {activeFilterCount ? (
        <span className="absolute top-[-10px] right-[-10px] bg-white rounded-[50%] px-2 shadow-lg">
          {activeFilterCount}
        </span>
      ) : (
        <></>
      )}
      <PopoverTrigger
        asChild
        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2 shadow-md"
        // onClick={toggleFilter}
      >
        <div>
          <FaFilter />
          <button>Filter</button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <div>
          <div className="flex flex-wrap justify-between mt-4">
            <div className="flex justify-end">
              <ToggleSwitch
                id="sale"
                checked={listingFilter.sale}
                onChange={(e) => handleToggleInputChange(e)}
              />
            </div>
            <div className="flex justify-end">
              {" "}
              <ToggleSwitch
                id="rent"
                checked={listingFilter.rent}
                onChange={(e) => handleToggleInputChange(e)}
              />
            </div>
            <div className="flex justify-end">
              <ToggleSwitch
                id="offer"
                checked={listingFilter.offer}
                onChange={(e) => handleToggleInputChange(e)}
              />
            </div>
            <div className="flex justify-end">
              <ToggleSwitch
                id="parking"
                checked={listingFilter.parking}
                onChange={(e) => handleToggleInputChange(e)}
              />
            </div>
            <div className="flex justify-end">
              {" "}
              <ToggleSwitch
                id="furnished"
                checked={listingFilter.furnished}
                onChange={(e) => handleToggleInputChange(e)}
              />
            </div>
            {listingFilter.rent ? (
              <div className="flex justify-end">
                <ToggleSwitch
                  id="wifi"
                  checked={listingFilter.wifi}
                  onChange={(e) => handleToggleInputChange(e)}
                />
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <ToggleSwitch
                    id="gym"
                    checked={listingFilter.gym}
                    onChange={(e) => handleToggleInputChange(e)}
                  />
                </div>

                <div className="flex justify-end">
                  <ToggleSwitch
                    id="swimmingPool"
                    checked={listingFilter.swimmingPool}
                    onChange={(e) => handleToggleInputChange(e)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              {" "}
              <NumberInput
                id="bathroom"
                label="Bathroom"
                value={listingFilter.bathroom}
                type="number"
                min={0}
                max={10}
                onChange={(e) => handlePriceFilter(e)}
              />
            </div>
            <div className="w-full">
              {" "}
              <NumberInput
                id="bedroom"
                label="Bedroom"
                value={listingFilter.bedroom}
                type="number"
                min={0}
                max={10}
                onChange={(e) => handlePriceFilter(e)}
              />
            </div>
          </div>
          {listingFilter.offer ? (
            <div>
              <label
                htmlFor="discountPrice"
                className="block text-gray-600 font-medium"
              >
                Discount Price
              </label>
              <div className="relative">
                <input
                  type="range"
                  id="discountPrice"
                  name="discountPrice"
                  min="0"
                  max="1000000"
                  step="50"
                  value={listingFilter.discountPrice}
                  onChange={handlePriceFilter}
                  className="w-full bg-blue-100 h-2 rounded-full appearance-none cursor-pointer focus:outline-none"
                />
              </div>
              <p className="text-gray-600 mt-2">
                Discount Price: ${listingFilter.discountPrice}
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="regularPrice"
                className="block text-gray-600 font-medium"
              >
                Regular Price
              </label>
              <div className="relative">
                <input
                  type="range"
                  id="regularPrice"
                  name="regularPrice"
                  min="0"
                  max="1000000"
                  step="50"
                  value={listingFilter.regularPrice}
                  onChange={handlePriceFilter}
                  className="w-full bg-blue-100 h-2 rounded-full appearance-none cursor-pointer focus:outline-none"
                />
              </div>
              <p className="text-gray-600 mt-2">
                Regular Price: ${listingFilter.regularPrice}
              </p>
            </div>
          )}
          <div className="flex justify-between gap-2">
            <button
              type="button"
              disabled={false}
              onClick={clearFilter}
              className="border border-red-700 text-red-700 p-2 rounded-lg w-full bg-transparent hover:opacity-90"
            >
              Clear
            </button>
            <button
              type="button"
              disabled={false}
              onClick={applyFilter}
              className="bg-green-700 text-white p-2 rounded-lg w-full hover:opacity-90"
            >
              {" "}
              Apply
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Filter;
