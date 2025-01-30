import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "../index.css";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [searchParams] = useSearchParams();

  return (
    <div className="mt-28 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first"
          : "Login / Signup"}
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
