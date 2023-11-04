function NoData({ title }: { title: string }) {
  return (
    <h3 className="text-2xl text-slate-600 text-center my-[3rem]">
      No {title} available.
    </h3>
  );
}

export default NoData;
