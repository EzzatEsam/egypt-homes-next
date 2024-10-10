"use client";
import React from "react";
import CustomCarousel from "./CustomCarousel";
import {
  IconBxsPhoneCall,
  IconEmail,
  IconWhatsappFill,
  IconHeartOutlined,
  IconLocationOutline,
  IconBedQueenOutline,
  IconToilet,
  IconDimensions,
  IconBxsCarGarage,
} from "./Icons";
import { PropertyPost, PropertyType } from "@/types/propertyPost";
import { FavoriteButton } from "./ContactButtons";

interface PropertyCardProps {
  property: PropertyPost;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Card click handler, navigating to the property page
  const handleCardClick = () => {
    location.href = `/property/${property.id}`;
  };

  return (
    <div
      className="card card-side  shadow-xl max-w-xl m-6 border-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col w-full rounded-inherit bg-base-200">
        {/* Top Section: Carousel and Property Info */}
        <div className="flex sm:flex-row flex-col border-b-2 mb-2 rounded-inherit bg-base-100">
          {/* Property images carousel */}
          <CustomCarousel
            images={property.images || ["/default-image.jpg"]}
            className="rounded-l-inherit rounded-r-inherit sm:rounded-r-none"
          />

          {/* Card Body: Property Details */}
          <div className="card-body p-4">
            <h2 className="text-lg">{property.category}</h2>
            <h2 className="card-title">
              {property.price.toLocaleString()} EGP{" "}
              {property.propertyType === PropertyType.Rent ? "/ month" : ""}
            </h2>
            <div> {property.title} </div>
            <div className="divider"></div>

            {/* Property Address */}
            <div className="flex items-center">
              <IconLocationOutline width={28} height={28} className="m-2" />
              <div className="text-sm justify-start">
                {property.location?.governorate},{property.location?.city},
                {property.location?.street}
              </div>
            </div>

            {/* Conditionally render property details (Bedrooms, Bathrooms, Area, Garage) */}
            <div className="flex flex-row items-center justify-center">
              {property.numberOfBedrooms && (
                <>
                  <IconBedQueenOutline height={24} width={24} />
                  <div className="p-2 text-sm text-center">
                    {property.numberOfBedrooms}
                  </div>
                  <div className="divider divider-horizontal mx-2"></div>
                </>
              )}

              {property.numberOfBathrooms && (
                <>
                  <IconToilet height={24} width={24} />
                  <div className="p-2 text-sm text-center">
                    {property.numberOfBathrooms}
                  </div>
                  <div className="divider divider-horizontal mx-2"></div>
                </>
              )}

              {property.area && (
                <>
                  <IconDimensions height={24} width={24} />
                  <div className="p-2 text-sm text-center">
                    {property.area} sqm
                  </div>
                  <div className="divider divider-horizontal mx-2"></div>
                </>
              )}

              {property.hasGarage && (
                <>
                  <IconBxsCarGarage height={24} width={24} />
                  <div className="p-2 text-sm text-center">Has Garage</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Action Buttons */}
        <div className="flex flex-row mb-2 ml-4 justify-between items-center">
          <div className="text-center ml-2 hidden sm:block">
            Listed 2 days ago {/* Make this dynamic if needed */}
          </div>
          <div className="flex flex-row space-x-2 mr-4 items-center">
            <a
              className="btn btn-outline"
              onClick={(e) => e.stopPropagation()}
              href={"tel:" + property.contactPhone}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBxsPhoneCall height={24} width={24} />
              Call
            </a>
            <a
              className="btn btn-outline"
              onClick={(e) => e.stopPropagation()}
              href={"mailto:" + property.contactEmail}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconEmail height={24} width={24} />
              Email
            </a>
            <a
              className="btn btn-outline"
              onClick={(e) => e.stopPropagation()}
              href={"https://wa.me/" + property.contactPhone}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsappFill height={24} width={24} />
              WhatsApp
            </a>
            <FavoriteButton
              pId={property.id}
              dim={24}
              text=""
              isFavourite={property.isFavorited}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
