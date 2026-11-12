import { useData } from './data';

export function useSocials() {
  const s = useData().site?.settings;
  const instagram = s?.instagram || 'https://instagram.com/edumotive.in';
  return {
    email: s?.contactEmail || 'edumotive4@gmail.com',
    instagram,
    igHandle: '@' + (instagram.replace(/\/$/, '').split('/').pop() || 'edumotive.in'),
    facebook: s?.facebook || 'https://facebook.com/search/top?q=EduMotive%20Trimonthly',
    x: s?.xLink || 'https://x.com/search?q=EduMotive%20Trimonthly',
    phones: s?.phones?.length ? s.phones : ['+91 82505 83682'],
  };
}
