export const locations = [
  { id: 'tashkent', name_ru: 'Ташкент', name_en: 'Tashkent' },
  { id: 'samarkand', name_ru: 'Самарканд', name_en: 'Samarkand' },
  { id: 'bukhara', name_ru: 'Бухара', name_en: 'Bukhara' },
  { id: 'khiva', name_ru: 'Хива', name_en: 'Khiva' },
  { id: 'urgench', name_ru: 'Ургенч', name_en: 'Urgench' },
  { id: 'tashkent_airport', name_ru: 'Аэропорт Ташкент (TAS)', name_en: 'Tashkent Airport (TAS)' },
  { id: 'samarkand_airport', name_ru: 'Аэропорт Самарканд (SKD)', name_en: 'Samarkand Airport (SKD)' },
  { id: 'bukhara_airport', name_ru: 'Аэропорт Бухара (BHK)', name_en: 'Bukhara Airport (BHK)' },
  { id: 'urgench_airport', name_ru: 'Аэропорт Ургенч (UGC)', name_en: 'Urgench Airport (UGC)' },
].sort((a, b) => a.name_ru.localeCompare(b.name_ru));

export const serviceTypesMap = {
  intercity: {
    ru: 'Межгород',
    en: 'Intercity',
  },
  meet_and_greet: {
    ru: 'Встреча/проводы (аэропорт/вокзал)',
    en: 'Meet & Greet (Airport/Station)',
  },
  excursion: {
    ru: 'Экскурсия',
    en: 'Excursion',
  },
};

export type ServiceType = keyof typeof serviceTypesMap;

export const getLocationName = (id: string, locale: 'ru' | 'en') => {
    const location = locations.find(loc => loc.id === id);
    return location ? location[`name_${locale}`] : id;
}
