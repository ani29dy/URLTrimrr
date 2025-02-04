import React, { useState, useRef } from "react";
import { UrlState } from "../Context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import Error from "./Error";
import * as Yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "../hooks/useFetch";
import { createUrl } from "../db/APIUrls";
import { BeatLoader } from "react-spinners"

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    longUrl: Yup.string()
      .url("Must be valid URL")
      .required("Long URL is Required"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const ref = useRef();

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl { ...formValues, user_id: user.id });

  const createNewLink = () => {}

  return (
    <Dialog
      className="bg-black"
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button className="bg-white text-black">Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>

        {formValues?.longUrl && (
          <QRCode value={formValues?.longUrl} size={250} ref={ref} />
        )}

        <Input
          id="title"
          type="text"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
        />
        <Error message={"Some Error"} />
        <Input
          id="longUrl"
          type="text"
          placeholder="Enter you'r Loong URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        <Error message={"Some Error"} />
        <div className="flex items-center gap-2">
          <Card className="p-2">urltrimrr.in</Card>
          <Input
            id="customUrl"
            type="text"
            placeholder="Custom Link(Optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        <Error message={"Some Error"} />
        <DialogFooter>
          <Button className="bg-white text-black" onClick={createNewLink}>
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
