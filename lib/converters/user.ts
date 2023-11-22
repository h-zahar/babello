import { db } from "@/firebase";
import { LanguageSupported } from "@/store/store";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  query,
  where,
} from "firebase/firestore";
import { User } from "next-auth";

const userConverter: FirestoreDataConverter<User> = {
  toFirestore: function (customer: User): DocumentData {
    return {
      email: customer.email,
      image: customer.image,
      name: customer.name,
    };
  },
  fromFirestore: function (
    snapShot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapShot.data(options);

    return {
      id: snapShot.id,
      email: data.email,
      image: data.image,
      name: data.name,
    };
  },
};

export const getUserByEmailRef = (email: string) =>
  query(collection(db, "users"), where("email", "==", email)).withConverter(
    userConverter
  );
