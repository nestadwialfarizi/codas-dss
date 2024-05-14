import type { DocsThemeConfig } from 'nextra-theme-docs';

const themeConfig: DocsThemeConfig = {
  useNextSeoProps: () => ({
    titleTemplate: 'Docs: %s | Sistem Pendukung Keputusan CODAS',
  }),
  logo: <span>Panduan Sistem Pendukung Keputusan CODAS</span>,
  project: {
    link: 'https://github.com/nestadwialfarizi/codas-dss',
  },
  footer: {
    text: (
      <span>
        {new Date().getFullYear()}{' '}
        <a href='https://nextra.site' target='_blank'>
          Nesta D. Alfarizi
        </a>
        .
      </span>
    ),
  },
};

export default themeConfig;
