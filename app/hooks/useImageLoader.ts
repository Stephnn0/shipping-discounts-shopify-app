import { useEffect, useState } from "react";

export function useImageLoader({ source }: { source: string }) {
  const [loaded, setLoader] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.src = source;
    img.onload = () => {
      setLoader(true);
    };
  }, [source]);

  return { loaded };
}
