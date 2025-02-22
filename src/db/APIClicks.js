import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_id);
  if (error) {
    console.error("Error Fetching Clicks: ", error.message);
    return null;
  }
  return data;
}

export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to Load Stats");
  }
  return data;
}

const parser = new UAParser();

export const StoreClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "Desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.log("Error recording Click:", error);
  }
};
