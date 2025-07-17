export function Island({
  name,
  props,
}: {
  name: string;
  props?: Record<string, any>;
}) {
  return (
    <div
      data-island={name}
      data-props={encodeURIComponent(JSON.stringify(props))}
    ></div>
  );
}
