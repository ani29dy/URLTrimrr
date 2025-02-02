import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "../index.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-28 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longLink ? "Hold up! Let's login first" : "Login / Signup"}
      </h1>
      <Tabs
        defaultValue="login"
        className="w-[400px]"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-2 bg-gray-800">
          <TabsTrigger
            value="login"
            className={`tabs-trigger ${
              activeTab === "login" ? "tabs-trigger-active" : ""
            }`}
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className={`tabs-trigger ${
              activeTab === "signup" ? "tabs-trigger-active" : ""
            }`}
          >
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
