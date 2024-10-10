import { PropertyPost } from "@/types/propertyPost";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function obj2FormData(
  object: any,
  form?: FormData,
  namespace?: string
): FormData {
  const formData = form || new FormData();

  Object.keys(object).forEach((key) => {
    const formKey = namespace ? `${namespace}[${key}]` : key;
    if (typeof object[key] === "object" && !(object[key] instanceof File)) {
      obj2FormData(object[key], formData, formKey);
    } else {
      formData.append(formKey, object[key]);
    }
  });

  return formData;
}

export function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1]; // Strip out the metadata part
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}
