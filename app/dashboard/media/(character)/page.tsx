import { Metadata } from 'next';
import VideoPlayer from "@/app/ui/common/VideoPlayer";


export const metadata: Metadata = {
  title: 'Media',
};

export default function Page() {
  return <>
      <VideoPlayer url="https://levi-1320843286.cos.ap-shanghai.myqcloud.com/demo%2FOpenAI%20DevDay%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%A7%E4%BC%9A%E7%8E%B0%E5%9C%BA%E7%9B%B4%E6%92%AD%EF%BC%88%E4%B8%AD%E8%8B%B1%E6%96%87%E5%AD%97%E5%B9%95%EF%BC%89%20-%20001%20-%20OpenAI%20DevDay%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%A7%E4%BC%9A%E7%8E%B0%E5%9C%BA%E7%9B%B4%E6%92%AD%EF%BC%88%E4%B8%AD%E8%8B%B1%E6%96%87%E5%AD%97%E5%B9%95%EF%BC%89.mp4" type="video/mp4"/>
  </>
}
