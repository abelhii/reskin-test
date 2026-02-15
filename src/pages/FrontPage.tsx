import { Stories } from "@/components/Stories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FrontPage() {
  return (
    <section className="flex flex-col items-center py-8">
      <Tabs defaultValue="top" className="w-full">
        <TabsList variant="line" className="pb-4">
          <TabsTrigger value="top">Top</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="show">Show</TabsTrigger>
        </TabsList>
        <TabsContent value="top">
          <Stories category="top" />
        </TabsContent>
        <TabsContent value="new">
          <Stories category="new" />
        </TabsContent>
        <TabsContent value="show">
          <Stories category="show" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
