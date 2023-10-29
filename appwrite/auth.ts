import { appwriteConfig, account, databases, avatars } from "./config";
import { NewUser } from "@/types";
import { ID, Query } from "appwrite";

/**
 * Create a new user account.
 * @param user - The user object containing email, password, and name.
 * @returns The newly created user data or null if there's an error.
 */
export async function createUserAccount(user: NewUser) {
  try {
    // Create a new Appwrite account
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Account creation failed");

    // Generate an avatar URL for the user
    const avatarUrl = avatars.getInitials(user.name);

    // Save user data to the database
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    return error;
  }
}

/**
 * Save user data to the database.
 * @param user - The user object to be saved in the database.
 * @returns The newly created user data or null if there's an error.
 */
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.DATABASE_ID!,
      appwriteConfig.USER_COLLECTION_ID!,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    return error;
  }
}

/**
 * Sign in with an Appwrite account.
 * @param user - The user object containing email and password.
 * @returns The Appwrite session or null if there's an error.
 */
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    return error;
  }
}

/**
 * Get the current Appwrite account.
 * @returns The current Appwrite account or null if there's an error.
 */
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    return error;
  }
}

/**
 * Get the current user's data.
 * @returns The current user's data or null if there's an error.
 */
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw new Error("Account not found");

    // Retrieve user data from the database based on the account ID
    const currentUser = await databases.listDocuments(
      appwriteConfig.DATABASE_ID!,
      appwriteConfig.USER_COLLECTION_ID!,
      //@ts-ignore
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("User data not found");

    return currentUser.documents[0];
  } catch (error) {
    return error;
  }
}

/**
 * Sign out from the Appwrite account.
 * @returns The result of the sign-out operation or null if there's an error.
 */
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    return error;
  }
}
