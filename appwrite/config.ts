import { Client, Account, Databases, Avatars } from "appwrite";

export const appwriteConfig = {
  APPWRITE_URL: process.env.NEXT_PUBLIC_APPWRITE_URL,
  PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  USER_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.APPWRITE_URL!);
client.setProject(appwriteConfig.PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
