import Cover from "../sections/Cover";
import Header from "../sections/Header";
import Quotes from "../sections/Quotes";
import BrideBiography from "../sections/BrideBiography";
import BrideStory from "../sections/BrideStory";
import PhotoGallery from "../sections/PhotoGallery";
import LocationDetail from "../sections/LocationDetail";
import Countdown from "../sections/Countdown";
import Rsvp from "../sections/Rsvp";
import Donate from "../sections/Donate";
import PrayForm from "../sections/PrayForm";
import Footer from "../sections/Footer";
import { brideInfo } from "../helpers/data";
import ScrollLock from "../components/ScrollLock";
import AudioPlayer from "../components/AudioPlayer";
import guestList from "../helpers/guestList.json";
import { redirect } from "next/navigation";

export const metadata = {
  title: `Wedding of ${brideInfo.man.nickname} & ${brideInfo.woman.nickname}`,
};

type GuestProps = {
  params: {
    id: string;
  };
};

export default async function TemplatePage({ params }: GuestProps) {
  const { id } = await params;
  const guest = guestList.find((g) => g.id === id);

  if (!guest) {
    redirect("/");
  }

  return (
    <ScrollLock>
      <div className="font-base relative w-screen lg:w-2xl p-2 mx-auto">
        <AudioPlayer />
        <Cover guestName={guest?.name}>
          <div className="bg-rose-50">
            <Header />
            <Quotes />
            <BrideBiography />
            <BrideStory />
            <LocationDetail />
            <Countdown />
            <Donate />
            <Rsvp />
            <Footer />
          </div>
        </Cover>
      </div>
    </ScrollLock>
  );
}
