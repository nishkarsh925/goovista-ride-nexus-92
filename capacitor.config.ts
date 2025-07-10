import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6f436175d18d4bf88573ff54ceecda9c',
  appName: 'goovista-ride-nexus-92',
  webDir: 'dist',
  server: {
    url: 'https://6f436175-d18d-4bf8-8573-ff54ceecda9c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#000000",
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      showSpinner: true,
      spinnerColor: "#999999"
    }
  }
};

export default config;