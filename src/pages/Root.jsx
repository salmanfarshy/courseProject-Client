import React, { useContext, useEffect, useState } from "react";
import Header from "../components/root_page/Header";
import Carousel from "../components/root_page/Carousel";
import TopFivLarColl from "../components/root_page/TopFivLarColl";
import TopFivLatItm from "../components/root_page/TopFivLatItm";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getLatItms, getLarColl, getAllCollections } from "../apis/serverApis";
import isTokenExpired from "../assets/isTokenExpired";
import HorizonLoading from "../components/HorizonLoading";
import JiraPopup from "./JiraPopup";
import { JiraToggle } from "../context/JiraContext";

export async function loader() {
  const items = await getLatItms();
  const collections = await getLarColl();
  const allCollections = await getAllCollections("all");

  return { items, collections, allCollections };
}

function Root() {
  const { isJiraOpen, setIsJiraOpen } = useContext(JiraToggle);
  const user = JSON.parse(localStorage.getItem("User"));

  const { collections, items, allCollections } = useLoaderData();
  // console.log(collections.data, items.data, allCollections.data);
  const navigation = useNavigation();
  const token = localStorage.getItem("token");
  const [progress, setProgress] = useState(0);

  if (isTokenExpired(token)) {
    localStorage.removeItem("User");
    localStorage.removeItem("token");
  }

  useEffect(() => {
    if (navigation.state === "loading") {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return prevProgress;
          }
          return prevProgress + 10; // Increment progress
        });
      }, 100); // Update progress every 100ms

      return () => clearInterval(interval);
    }
  }, [navigation.state]);

  return (
    <div className="min-h-screen">
      {/* Loading  */}
      <HorizonLoading progress={progress} loading={navigation.state} />
      {/* JiraUI */}
      {isJiraOpen && <JiraPopup />}
      {/* Header */}
      <Header categories={allCollections.data} />
      {/* Carousel */}
      <Carousel imgs={collections.data} />
      {/* Top largest Collections */}
      <p className="lg:text-4xl md:text-3xl text-2xl tracking-wide ms-5 lg:mb-5 md:mb-4 mb-3 text-gray-700 font-medium">
        Top Five Largest Collections.
      </p>
      <TopFivLarColl collections={collections.data} />
      {/* Most largest Items */}
      <p className="lg:text-4xl md:text-3xl text-2xl tracking-wide md:ms-5 ms-12 lg:mb-5 md:mb-4 mb-3 text-gray-700 font-medium">
        Most Five Latest Items.
      </p>
      <TopFivLatItm items={items.data} />
      <div className="flex md:flex-row flex-col md:gap-5 gap-2 justify-center items-center py-3 md:mt-2 mt-1 bg-gray-200">
        <p className="md:text-base text-sm md:font-semibold font-medium">
          &copy;Copyright Salman Farshi
        </p>
        {user && (
          <button
            onClick={() => setIsJiraOpen(true)}
            type="button"
            className="px-5 py-2 md:text-base text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-700"
          >
            Create Support Ticket
          </button>
        )}
      </div>
    </div>
  );
}

export default Root;
