import supabase from "./supabase";

export async function getClicksForUrls(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}
