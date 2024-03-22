import { Metadata } from 'next';
import VideoPlayer from "@/app/ui/common/VideoPlayer";

export const metadata: Metadata = {
  title: '成语解读',
};

export default function Page() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <VideoPlayer url="https://levi-1320843286.cos.ap-shanghai.myqcloud.com/demo%2Fdemo.mp4" type="video/mp4"/>
    </div>
  );
}
