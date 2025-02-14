import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download, Trash } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { deleteUrl } from "../db/APIUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
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

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <div className="flex flex-col-2 md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        className="h-32 object-contain ring ring-blue-500 self-start"
        src={url?.qr}
        alt="QR Code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl font-bold hover:underline cursor-pointer text-blue-400">
          https://urltrimrr.in/
          {url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Button
          className="h-12 w-16"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://urltrimrr.in/${url?.short_url}`
            );
          }}
        >
          <Copy />
        </Button>
        <Button className="h-12 w-16" onClick={DownloadImage}>
          <Download />
        </Button>
        <Button
          className="h-12 w-16"
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
