
export function Nav() {
  return (
    <nav className="flex items-center justify-between w-full">
      <h1 className="text-4xl font-bold text-foreground font-[oswald]">
        HACKER<span className="text-primary">NEWS</span>.
      </h1>

      <div className="flex gap-2">
        {/* TODO add profile / login / logout */}
      </div>
    </nav>
  );
}
