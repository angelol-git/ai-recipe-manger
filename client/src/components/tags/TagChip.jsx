function TagChip({
  as: Component = "div",
  color,
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex min-h-8 w-fit items-center gap-2 rounded-full border border-mantle bg-tag px-3 py-1 text-[15px] leading-none text-primary transition-colors ${className}`.trim()}
      {...props}
    >
      {color ? (
        <div
          className="h-3.5 w-3.5 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />
      ) : null}
      {children}
    </Component>
  );
}

export default TagChip;
