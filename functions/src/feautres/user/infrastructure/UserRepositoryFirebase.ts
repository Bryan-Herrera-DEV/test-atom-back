import { firestore } from "../../../core/providers/firebaseProvider";
import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

const COLLECTION_NAME = "users";

export class UserRepositoryFirebase implements IUserRepository {
  private readonly collection = firestore.collection(COLLECTION_NAME);

  public async findByEmail(email: string): Promise<User | null> {
    const docRef = this.collection.doc(email);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      console.log("No such document!");
      return null;
    }
    const data = snapshot.data();
    if (!data) {
      console.log("No such document! b");
      return null;
    }

    return new User({
      id: snapshot.id,
      email: data.email,
      name: data.name,
      lastName: data.lastName,
      createdAt: data.createdAt.toDate(),
    });
  }

  public async create(user: User): Promise<User> {
    await this.collection.doc(user.getEmail()).set({
      email: user.getEmail(),
      name: user.getName,
      lastName: user.getLastName,
      createdAt: user.getCreatedAt(),
    });
    return new User({
      email: user.getEmail(),
      name: user.getName,
      lastName: user.getLastName,
      createdAt: user.getCreatedAt(),
    });
  }
}
