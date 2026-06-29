import React from "react";
import { useState } from "react";

import { motion } from "framer-motion";

import BranchMap from "./BranchMap";

import BranchCard from "./BranchCard";

import { branches }from "../data/branches";

export default function LocationsSection() {

  const [selectedBranch,
    setSelectedBranch] =
    useState(branches[0]);

  return (
    <section className="py-24 bg-[#111111] text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">

          Our Locations

        </h2>

        <p className="text-center text-gray-400 mt-5">

          Visit us or order from the nearest branch.

        </p>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">

          <div className="space-y-6">

            {branches.map(
              branch => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  onSelect={
                    setSelectedBranch
                  }
                />
              )
            )}

          </div>

          <motion.div

            key={selectedBranch.id}

            initial={{
              opacity: 0,
              height: 0,
            }}

            animate={{
              opacity: 1,
              height: "auto",
            }}

            transition={{
              duration: 0.5,
            }}

          >
            <BranchMap
              branch={
                selectedBranch
              }
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}