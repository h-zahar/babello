"use client";

import React from "react";
import {
  LanguageSupported,
  LanguageSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

function LanguageSelect() {
  const [language, setLanguage, getLanguage, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);

  const subscription = useSubscriptionStore((state) => state.subscription);

  const isPro = subscription?.role === "pro";

  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");

  //   const check = getLanguage(isPro).map((lang) => LanguageSupportedMap[lang]);

  //   console.log("ch", check);

  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguageSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] text-black dark:text-white">
            <SelectValue placeholder={LanguageSupportedMap[language]} />
          </SelectTrigger>
          <SelectContent>
            {subscription === undefined ? (
              <LoadingSpinner />
            ) : (
              <>
                {getLanguage(isPro).map((lang) => {
                  return (
                    <SelectItem key={lang} value={lang}>
                      {LanguageSupportedMap[lang]}
                    </SelectItem>
                  );
                })}
                {getNotSupportedLanguages(isPro).map((lang) => {
                  return (
                    <Link href={"/register"} key={lang} prefetch={false}>
                      <SelectItem
                        key={lang}
                        value={lang}
                        disabled
                        className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                      >
                        {LanguageSupportedMap[lang]} (PRO)
                      </SelectItem>
                    </Link>
                  );
                })}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
}

export default LanguageSelect;
