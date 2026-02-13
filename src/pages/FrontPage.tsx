import { Nav } from "@/components/nav";
import { Stories } from "@/components/Stories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FrontPage() {
  return (
    <section className="flex flex-col px-8 sm:px-16 lg:px-24 items-center gap-12 py-8 max-w-5xl m-auto">
      <Nav />

      <Tabs defaultValue="top" className="w-full max-w-2xl">
        <TabsList variant="line" className="pb-4">
          <TabsTrigger value="top">Top</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent value="top">
          <Stories category="top" />
        </TabsContent>
        <TabsContent value="new">
          <Stories category="new" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
