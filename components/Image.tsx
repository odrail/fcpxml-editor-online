import NextImage from "next/image";
import { ComponentProps } from "react";

type CustomLoaderProps = {
  src: string
}

const customLoader = ({ src }: CustomLoaderProps) => {
  return src
}

export default function Image(props: ComponentProps<any>) {
  return (
    <NextImage
      {...props}
      loader={customLoader}
    />
  );
}