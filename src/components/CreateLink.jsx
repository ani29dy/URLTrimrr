import React, { useState } from "react";
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

  return (
    <Dialog className="bg-black">
      <DialogTrigger>
        <Button className="bg-white text-black">Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
        />
        <Error message={"Some Error"} />
        <Input
          type="text"
          placeholder="Enter you'r Loong URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        <Error message={"Some Error"} />
        <div className="flex items-center gap-2">
          <Card className="p-2">urltrimrr.in</Card>
          <Input
            type="text"
            placeholder="Custom Link(Optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        <Error message={"Some Error"} />
        <DialogFooter>
          <Button className="bg-white text-black">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
