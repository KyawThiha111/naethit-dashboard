import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { Label } from "../ui/label";

interface ImageUploadProps {
  defaultImages?: {
    banner_img?: string;
    blog1_img?: string;
    blog2_img?: string;
  };
  onImageChange?: (images: {
    banner_img: File | null;
    blog1_img: File | null;
    blog2_img: File | null;
  }) => void;
}

const ServiceBannerImgsUpload: React.FC<ImageUploadProps> = ({
  defaultImages,
  onImageChange,
}) => {
  const [images, setImages] = useState({
    banner_img: null as File | null,
    blog1_img: null as File | null,
    blog2_img: null as File | null,
  });

  const [previews, setPreviews] = useState({
    banner_img: null as string | null,
    blog1_img: null as string | null,
    blog2_img: null as string | null,
  });

  const fileInputRefs = {
    banner_img: useRef<HTMLInputElement>(null),
    blog1_img: useRef<HTMLInputElement>(null),
    blog2_img: useRef<HTMLInputElement>(null),
  };

  // 👇 Initialize previews with default image URLs
  useEffect(() => {
    if (defaultImages) {
      setPreviews((prev) => ({
        ...prev,
        ...defaultImages,
      }));
    }
  }, [defaultImages]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof images
  ) => {
    const file = e.target.files?.[0] || null;

    setImages((prev) => ({ ...prev, [key]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }

    if (onImageChange) {
      onImageChange({ ...images, [key]: file });
    }
  };

  const handleChooseClick = (key: keyof typeof images) => {
    fileInputRefs[key].current?.click();
  };

  const handleDelete = (key: keyof typeof images) => {
    setImages((prev) => ({ ...prev, [key]: null }));
    setPreviews((prev) => ({ ...prev, [key]: null }));
    if (fileInputRefs[key].current) {
      fileInputRefs[key].current.value = "";
    }
    if (onImageChange) {
      onImageChange({ ...images, [key]: null });
    }
  };

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 pt-5">
      {(["banner_img", "blog1_img", "blog2_img"] as const).map((key) => (
        <div key={key} className="flex flex-col space-y-2">
          <Label className="font-semibold capitalize text-gray-600">
            {key.replace("_", " ")}
          </Label>

          <div
            onClick={() => handleChooseClick(key)}
            className=" group relative w-64 h-40 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:border-blue-500 transition"
          >
            {previews[key] ? (
              <>
                <img
                  src={previews[key] as string}
                  alt={key}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(key);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <span className="text-gray-500">Click to choose image</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRefs[key]}
            onChange={(e) => handleChange(e, key)}
            className="hidden"
          />
        </div>
      ))}
    </div>
  );
};

export default ServiceBannerImgsUpload;
