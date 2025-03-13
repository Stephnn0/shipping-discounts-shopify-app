import { useImageLoader } from "app/hooks/useImageLoader";
import image from "app/assets/ban.jpg";
import Skeleton from "./skeleton";
import "./styles.css";

export default function Dashboardcomponent() {
  const { loaded: bannerLoader } = useImageLoader({ source: image });

  if (!bannerLoader) return <Skeleton />;

  return (
    <div className="banner">
      <img src={image} alt="Banner" className="bannerImage" />
      <div className="content">
        <h1 className="title">Shipping Discounts</h1>
        <p className="subtitle">
          {" "}
          Increase your store functionality with discoubnts for your shippoing
          rates.
        </p>
      </div>
    </div>
  );
}
