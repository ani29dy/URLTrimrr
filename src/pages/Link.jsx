import React, { useEffect } from "react";
import { UrlState } from "../Context";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { deleteUrl, getUrl } from "../db/APIUrls";
import { getClicksForUrl } from "../db/APIClicks";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { BarLoader, BeatLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Location from "../components/ui/location-stats";
import Device from "../components/ui/device-stats";

const Link = () => {
  const DownloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-row gap-8 justify-between items-start w-full">
        <div className="flex flex-col items-start gap-8 sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://urltrimrr.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://urltrimrr.in/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex flex-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              className="h-12 w-16"
              onClick={() => {
                navigator.clipboard.writeText(`https://urltrimrr.in/${link}`);
              }}
            >
              <Copy />
            </Button>
            <Button
              className="h-12 w-16"
              varient="ghost"
              onClick={DownloadImage}
            >
              <Download />
            </Button>
            <Button
              className="h-12 w-16"
              varient="ghost"
              onClick={() => fnDelete()}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            className="h-32 object-contain ring ring-blue-500 self-start"
            src={url?.qr}
            alt="QR Code"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>
              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Data</CardTitle>
              <Device stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics Yet"
                : "Loading Statistics"}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
