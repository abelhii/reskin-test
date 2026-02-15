import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Nav() {
  return (
    <nav className="flex flex-wrap gap-4 items-end justify-between w-full pt-8">
      <h1 className="text-4xl font-bold text-foreground font-[oswald]">
        HACKER<span className="text-primary">NEWS</span>.
      </h1>

      <Button
        asChild
        variant="link"
        size="content"
        className="text-md text-gray-800"
      >
        <a href="https://abelhii.com" target="_blank" className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/abelhii.png" alt="@abelhii" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          Abel Hii
        </a>
      </Button>
    </nav>
  );
}
