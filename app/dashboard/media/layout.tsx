import React from "react";
import { MEDIAS } from "@/app/lib/pages";
import SubpageHeaderNav from "@/app/ui/common/SubpageHeaderNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-visible">
      <div className="sticky top-0 z-10 w-full">
        <SubpageHeaderNav tabs={MEDIAS} title="音视频生成"/>
      </div>
      <div className="flex-grow overflow-y-auto pt-6">{children}</div>
    </div>
  );
}
