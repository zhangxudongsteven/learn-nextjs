
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatBot',
};

export default function Page() {
  return <iframe
    className="w-full h-full min-h-[500px] border-0"
    src="http://dify.turingue.com/chatbot/tIbEWzZev1VTfLqc"
    allow="microphone">
  </iframe>
}
