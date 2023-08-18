import { useEffect } from "react";
import GetSiteInfo from "../API/GetSiteInfo";

export default function SiteInfo() {
  useEffect(() => {
    try {
      let breakInfiniteLoop = 0;
      const siteUpdate = async () => {
        const data = await GetSiteInfo();
      };
    } catch (error) {
      console.error("SiteInfo error", error);
    }
  }, []);
  return (
    <>
      <div className="home-buttons"></div>
    </>
  );
}
