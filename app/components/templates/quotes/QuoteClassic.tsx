
export default function QuoteClassic({
  sectionClassName,
  children,
}: {
  sectionClassName?: string;
  classNameSpan?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={sectionClassName}>
      <div className="max-w-lg mx-auto space-y-12">
        <div className="space-y-6 text-center">{children}</div>
      </div>
    </section>
  );
}
