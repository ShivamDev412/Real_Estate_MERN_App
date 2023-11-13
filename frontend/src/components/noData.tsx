import { twMerge } from "tailwind-merge";
function NoData({ title, styles = "" }: { title: string; styles: string }) {
  return (
    <h3
      className={twMerge(
        "text-2xl text-slate-600 text-center my-[3rem]",
        styles
      )}
    >
      No {title} found.
    </h3>
  );
}

export default NoData;
