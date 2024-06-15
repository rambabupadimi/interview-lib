import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run user-portal:serve',
        production: 'nx run user-portal:preview',
      },
      ciWebServerCommand: 'nx run user-portal:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
