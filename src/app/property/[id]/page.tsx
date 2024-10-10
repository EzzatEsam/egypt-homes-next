"use server";
import { FetchPropertySingle, GetUser } from "@/app/actions";
import {
  CallButton,
  DeleteButton,
  EmailButton,
  FavoriteButton,
  WhatsAppButton,
} from "@/components/ContactButtons";
import CustomCarousel from "@/components/CustomCarousel";
import ExpandText from "@/components/ExpandableText";
import {
  IconAirConditioner,
  IconBedQueenOutline,
  IconBxsCarGarage,
  IconDimensions,
  IconHome,
  IconLocationOutline,
  IconPool,
  IconSunPlantWilt,
  IconToilet,
} from "@/components/Icons";
import { HasCredentials } from "@/lib/Session";
import {
  PropertyCategory,
  PropertyPost,
  PropertyType,
} from "@/types/propertyPost";
import { User } from "@/types/user";
import { notFound } from "next/navigation";

// const propertyDataTest: PropertyPost = {
//   id: 1,
//   title: "Luxury villa with 5 bedrooms",
//   createdAt: new Date(),
//   propertyType: PropertyType.Buy,
//   price: 20000,
//   location: {
//     city: "6 October City",
//     governorate: "Giza",
//     street: "Badya Palm Hills",
//     latitude: 30.032,
//     longitude: 31.209,
//   },
//   description: `
// Luxurious 5-Bedroom Villa with Private Pool and Scenic Views

// Nestled in the prestigious Badya Palm Hills community, this exquisite 5-bedroom villa offers the perfect blend of modern comfort and serene living. Spanning 400 sqm, this property boasts elegant interiors, a spacious outdoor area, and premium amenities that cater to a luxurious lifestyle.

// The villa features an expansive living room with floor-to-ceiling windows that invite an abundance of natural light, creating a warm and welcoming ambiance. The open-plan kitchen is fully equipped with high-end appliances and sleek cabinetry, perfect for culinary enthusiasts and entertaining guests.

// Upstairs, you’ll find five generously sized bedrooms, including a master suite with a private balcony overlooking the lush surroundings. Each bedroom has ample closet space, while the three modern bathrooms feature sophisticated finishes and walk-in showers.

// The outdoor space is designed for relaxation and entertainment. A private swimming pool sits at the heart of the backyard, surrounded by a beautifully landscaped garden. The villa also includes a spacious terrace, perfect for outdoor dining, hosting BBQs, or simply enjoying the tranquility of the area.

// Additional features include:
// - A private garage for two cars
// - Central air conditioning
// - A laundry room and ample storage space
// - Proximity to community amenities like parks, schools, and shopping centers

// Located in 6 October City, Giza, this property is ideal for families seeking a peaceful yet connected lifestyle. With easy access to the city center, this villa combines the charm of suburban living with the convenience of urban amenities.
// `,
//   contactPhone: "+201234567890",
//   contactEmail: "info@example.com",
//   category: PropertyCategory.Villa,
//   numberOfBedrooms: 5,
//   numberOfBathrooms: 3,
//   images: [
//     "/5-1319p1.webp",
//     "/55949-1200.jpg",
//     "/the-destination-front-rendering_m.webp",
//     "/55949-1200.jpg",
//   ],
//   area: 400,
//   hasGarage: true,
// };

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  console.log(params);
  const id: number = Number(params.id);
  const propertyData = await FetchPropertySingle(id);
  let user: User | null = null;
  if (await HasCredentials()) {
    user = await GetUser();
  }

  if (!propertyData) {
    return notFound();
  } else {
    return (
      <div className="flex flex-col container mx-auto px-4 mb-8">
        <div className="breadcrumbs  my-6">
          <ul>
            <li>
              <a href="/">
                <IconHome />
              </a>
            </li>
            <li>
              <a
                href={`/search?propertyType=${propertyData.propertyType}&propertyCategory=${propertyData.category}`}
              >
                {propertyData.category}s for{" "}
                {propertyData.propertyType === "Buy" ? "Sale" : "Rent"}
              </a>
            </li>
            {propertyData.location.governorate && (
              <li>
                <a
                  href={`/search?governorate=${propertyData.location.governorate}&propertyType=${propertyData.propertyType}&propertyCategory=${propertyData.category}`}
                >
                  {propertyData.location.governorate}
                </a>
              </li>
            )}
            {propertyData.location.city && (
              <li>
                <a
                  href={`/search?city=${propertyData.location.city}&governorate=${propertyData.location.governorate}&propertyType=${propertyData.propertyType}&propertyCategory=${propertyData.category}`}
                >
                  {propertyData.location.city}
                </a>
              </li>
            )}
            {propertyData.location.street && (
              <li>
                <a
                  href={`/search?street=${propertyData.location.street}&city=${propertyData.location.city}&governorate=${propertyData.location.governorate}&propertyType=${propertyData.propertyType}&propertyCategory=${propertyData.category}`}
                >
                  {propertyData.location.street}
                </a>
              </li>
            )}
            <li>{propertyData.title}</li>
          </ul>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col min-w-96">
            <h2 className="text-5xl font-semibold ">
              {propertyData.price.toLocaleString()} EGP{" "}
              {propertyData.propertyType === PropertyType.Rent ? "/ month" : ""}
            </h2>
            <div className="grid grid-cols-4 gap-4 my-8 w-full items-center justify-center">
              {propertyData.numberOfBedrooms && (
                <div className="flex flex-col items-center">
                  <IconBedQueenOutline
                    height={24}
                    width={24}
                    className="mb-2"
                  />
                  <div className="text-sm text-center">
                    {propertyData.numberOfBedrooms}
                  </div>
                </div>
              )}

              {propertyData.numberOfBathrooms && (
                <div className="flex flex-col items-center">
                  <IconToilet height={24} width={24} className="mb-2" />
                  <div className="text-sm text-center">
                    {propertyData.numberOfBathrooms}
                  </div>
                </div>
              )}

              {propertyData.area && (
                <div className="flex flex-col items-center">
                  <IconDimensions height={24} width={24} className="mb-2" />
                  <div className="text-sm text-center">
                    {propertyData.area} sqm
                  </div>
                </div>
              )}

              {propertyData.hasGarden && (
                <div className="flex flex-col items-center">
                  <IconSunPlantWilt height={24} width={24} className="mb-2" />
                  <div className="text-sm text-center">Has Garden</div>
                </div>
              )}

              {propertyData.hasSwimmingPool && (
                <div className="flex flex-col items-center">
                  <IconPool height={24} width={24} className="mb-2" />
                  <div className="text-sm text-center">Has Swimming Pool</div>
                </div>
              )}

              {propertyData.hasAirConditioning && (
                <div className="flex flex-col items-center">
                  <IconAirConditioner height={24} width={24} className="mb-2" />
                  <div className="text-sm text-center">
                    Has Air Conditioning
                  </div>
                </div>
              )}

              {propertyData.hasGarage && (
                <div className="flex flex-col items-center">
                  <IconBxsCarGarage height={24} width={24} className="mb-2" />
                  <div className="text-sm text-center">Has Garage</div>
                </div>
              )}

              {/* Dividers between columns */}
              <div className="col-span-4 flex justify-center items-center w-full my-4">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-8  w-full ">
              {user?.id === propertyData.user.id ? (
                <DeleteButton pId={propertyData.id} />
              ) : (
                <>
                  <EmailButton contactEmail={propertyData.contactEmail} />
                  <CallButton contactPhone={propertyData.contactPhone} />
                  <WhatsAppButton contactPhone={propertyData.contactPhone} />
                  <FavoriteButton
                    pId={propertyData.id}
                    isFavourite={propertyData.isFavorited}
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex w-full justify-center items-center">
            <CustomCarousel
              images={propertyData.images!}
              className="max-w-xl rounded-md"
            />
          </div>
        </div>
        <div className="divider"></div>

        <h1 className="text-3xl mb-2">{propertyData.title}</h1>
        <div className="text-2xl flex items-center text-primary">
          <IconLocationOutline className="mr-2 h-6 w-6" /> {/* Icon size */}
          <span>
            {propertyData.location?.city}, {propertyData.location?.governorate},{" "}
            {propertyData.location?.street}
          </span>
        </div>

        <ExpandText text={propertyData.description} />

        <div className="divider"></div>

        <div className="text-2xl mb-4">Provided by</div>
        <div className="flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/100" // Replace this with the actual image URL
            alt="John Doe, Property Agent" // Descriptive alt text
            className="w-24 h-24 rounded-full"
          />
          <a
            href={"/user/" + propertyData.user.id} // Replace this with the actual profile link
            className="text-2xl font-bold hover:underline"
          >
            {propertyData.user.firstName} {propertyData.user.lastName}
          </a>
          <h2>{propertyData.user.phoneNumber}</h2>
          <h2>{propertyData.user.email}</h2>
        </div>
      </div>
    );
  }
}
