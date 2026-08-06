import Image, { StaticImageData } from "next/image";

interface MyImgProps {
  src: string | StaticImageData;
  title: string;
  imgPublicSource: string;
  author?: string;
  className?: string;
  size?: "small" | "mid" | "large";
}

const SIZE_MAP = {
  small: { width: 300, height: 300 },
  mid: { width: 500, height: 500 },
  large: { width: 1000, height: 1000 },
};

export default function MyImg({
  src,
  title,
  imgPublicSource,
  author,
  size = "mid",
  className,
}: MyImgProps) {
  const { width, height } = SIZE_MAP[size];
  return (
    <Image
      src={src}
      width={width}
      height={height}
      className={className}
      alt={`${title} ${author ? " by " + author : ""} from ${imgPublicSource}`}
    />
  );
}
