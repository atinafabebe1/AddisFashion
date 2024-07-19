import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';

const intlMiddleware = createMiddleware({
  defaultLocale: 'en',
  localePrefix,
  locales,
});

export default intlMiddleware;
