import { AppSidebar } from "@/components/app-sidebar";
import { DecrypterCard } from "@/components/custom-ui/decrypter-page";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { EncrypterCard } from "@/components/custom-ui/encrypter-page";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// import data from "@/lib/data.json";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-row gap-5 mx-auto w-full max-w-screen-xl px-4 py-6 lg:px-6">
            {/* <div className="flex flex-row w-full mx-auto gap-4 py-4 md:gap-6 md:py-6"> */}
            {/* <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} /> */}
            {/* </div> */}
            <EncrypterCard />
            <DecrypterCard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
