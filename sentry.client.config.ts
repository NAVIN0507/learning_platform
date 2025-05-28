import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://b9093c1586c60581ac741bfad03a0389@o4508449109049344.ingest.de.sentry.io/4508449110818896",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      isNameRequired: true,
      isEmailRequired: true,
    }),
  ],
});