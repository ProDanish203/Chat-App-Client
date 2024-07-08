"use client";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { requestData } from "@/utils/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

interface Props {
  title: string;
  isPending?: boolean;
}

interface RequestCardProps {
  username: string;
  image: string;
  isPending?: boolean;
}

const RequestCard = ({ username, image, isPending }: RequestCardProps) => {
  return (
    <div className="w-[300px] py-3 px-3 rounded-lg bg-neutral-100">
      <div className="flex items-center gap-x-3 mb-5">
        <Image
          src={image || "/images/dummy-user.webp"}
          alt="user-profile"
          width={100}
          height={100}
          className="size-12 rounded-full overflow-hidden object-cover cursor-pointer"
        />
        <p className="font-medium">{username}</p>
      </div>

      <div className="flex items-center justify-between w-ful gap-x-2">
        {!isPending ? (
          <>
            <Button className="w-full bg-primaryCol hover:bg-primaryCol/80 active:scale-95 transition-all duration-100">
              Accept
            </Button>
            <Button className="w-full bg-secondaryCol hover:bg-secondaryCol/80 active:scale-95 transition-all duration-100">
              Reject
            </Button>
          </>
        ) : (
          <Button className="w-full bg-secondaryCol hover:bg-secondaryCol/80 active:scale-95 transition-all duration-100">
            Withdraw Request
          </Button>
        )}
      </div>
    </div>
  );
};

export const RequestSlider = ({ title, isPending }: Props) => {
  const swiperRef = useRef<SwiperType>();

  const sliderOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      950: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };

  return (
    <div className="relative mt-3 overflow-y-auto max-h-[41vh] h-full w-full bg-white py-5 px-5 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      <Swiper
        {...sliderOptions}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className=""
      >
        {requestData.length > 0 ? (
          requestData.map((request, index) => (
            <SwiperSlide key={index} className="">
              {!isPending ? (
                <RequestCard
                  username={request.username}
                  image={request.image}
                />
              ) : (
                <RequestCard
                  username={request.username}
                  image={request.image}
                  isPending
                />
              )}
            </SwiperSlide>
          ))
        ) : (
          <p></p>
        )}
      </Swiper>
      <div className="center gap-x-3 mt-5">
        <button
          className="size-12 text-primaryCol center bg-white border border-primaryCol hover:bg-primaryCol hover:text-textDark rounded-full transition-all duration-100 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowBigLeft className="size-5" />
        </button>
        <button
          className="size-12 text-primaryCol center bg-white border border-primaryCol hover:bg-primaryCol hover:text-textDark rounded-full transition-all duration-100 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowBigRight className="size-5" />
        </button>
      </div>
    </div>
  );
};
