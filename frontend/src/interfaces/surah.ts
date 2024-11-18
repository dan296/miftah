// Interface for an individual Ayah
export interface Ayah {
    number: number; // The ayah number
    text: string; // The text of the ayah
    numberInSurah: number; // The ayah number within the surah
    juz: number; // The juz number
    manzil: number; // The manzil number
    page: number; // The page number in the Quran
    ruku: number; // The ruku number
    hizbQuarter: number; // The hizb quarter number
    sajda: boolean; // Indicates if there is a sajda (prostration) in this ayah
    arab_text: string; // The Arabic text of the ayah
}

// Interface for a Surah
export interface Surah {
    number: number; // The surah number
    name: string; // The name of the surah in Arabic
    englishName: string; // The English name of the surah
    englishNameTranslation: string; // The English translation of the surah's name
    revelationType: string; // The type of revelation (e.g., Meccan or Medinan)
    ayahs: Ayah[]; // Array of ayahs in the surah
    iconName: string; // The name of the icon representing the surah
    iconType: any; // The type of the icon (could be a specific type if you know it)
}