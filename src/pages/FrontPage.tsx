import { Nav } from "@/components/Nav";
import { Stories } from "@/components/Stories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FrontPage() {
  return (
    <section className="flex flex-col px-4 sm:px-8 lg:px-16 items-center gap-12 py-8 max-w-6xl m-auto">
      <Nav />

      <Tabs defaultValue="top" className="w-full">
        <TabsList variant="line" className="pb-4">
          <TabsTrigger value="top">Top</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="ask">Ask</TabsTrigger>
        </TabsList>
        <TabsContent value="top">
          <Stories category="top" />
        </TabsContent>
        <TabsContent value="new">
          <Stories category="new" />
        </TabsContent>
        <TabsContent value="ask">
          <Stories category="ask" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
