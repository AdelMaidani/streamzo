declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongoConnect: string;
      accessKeyID: string;
      secretAccessKey: string;
      recordingConfigurationArn: string;
    }
  }
}

export {};
