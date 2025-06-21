import { useSidebar } from "@/components/ui/sidebar";

export default function SideBarHeading({ title }: { title: string }) {
  const { open, isMobile } = useSidebar();
  return (
    <div className=" flex items-center gap-1 px-1 py-1">
      <img src="/logo.png" alt="logo" className=" w-10" />
      {(open || isMobile) && (
        <h3 className=" text-lg font-bold text-nowrap text-secondary-blue overflow-hidden">
          {title}
        </h3>
      )}
    </div>
  );
}
