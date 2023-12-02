import { ID } from "appwrite";
import { appwriteConfig, databases } from "./config";

/**
 * Get the websites data.
 * @returns the websites data or null if there's an error.
 */
export async function getAllWebsites() {
  try {
    // Retrieve websites data from the database
    const list = await databases.listDocuments(
      appwriteConfig.DATABASE_ID!,
      appwriteConfig.WEBS_COLLECTION_ID!
    );

    if (!list) throw new Error("tasks data not found");

    return list.documents;
  } catch (error) {
    return error;
  }
}

/**
 * Save user data to the database.
 * @param user - The user object to be saved in the database.
 * @returns The newly created user data or null if there's an error.
 */
export async function createWebsite(payload: {
  user: string;
  website: string;
}) {
  try {
    const newTask = await databases.createDocument(
      appwriteConfig.DATABASE_ID!,
      appwriteConfig.WEBS_COLLECTION_ID!,
      ID.unique(),
      payload
    );

    return newTask;
  } catch (error) {
    return error;
  }
}

export async function deleteWebsite({ documentId }: { documentId: string }) {
  try {
    const deletedUser = await databases.deleteDocument(
      appwriteConfig.DATABASE_ID!,
      appwriteConfig.WEBS_COLLECTION_ID!,
      documentId
    );

    return deletedUser;
  } catch (error) {
    return error;
  }
}
