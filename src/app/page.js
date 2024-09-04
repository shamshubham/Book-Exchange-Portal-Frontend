// pages/index.js
"use client";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = () => {
  redirect("/login");
};

export default Home;
