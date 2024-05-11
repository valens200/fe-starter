import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

export interface StatsCardProps {
  title: string;
  value: string;
  color: string;
  link?: {
    href: string;
    label: string;
  };
}

export default function StatsCard({
  color,
  title,
  value,
  link,
}: StatsCardProps) {
  return (
    <div className="shadow-md rounded-lg w-full bg-white ">
      <div className={clsx("w-full h-2 rounded-t-lg", color)} />
      <div className="p-4">
        <h2 className="text-gray-500">{title}</h2>
        <p className="text-gray-700 text-xl font-semibold">{value}</p>
        {link && (
          <Link to={link.href} className="text-sm text-cyan-700">
            {link.label} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
