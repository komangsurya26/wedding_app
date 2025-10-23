import clsx from "clsx";

export default function GreetingBali({
  sectionClassName,
  children,
}: {
  sectionClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={clsx("flex flex-col", sectionClassName)}>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
