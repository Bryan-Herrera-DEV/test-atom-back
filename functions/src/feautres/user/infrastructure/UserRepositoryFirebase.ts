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
      return null;
    }
    const data = snapshot.data();
    if (!data) {
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
    const docRef = await this.collection.add({
      email: user.getEmail(),
      name: user.getName,
      lastName: user.getLastName,
      createdAt: user.getCreatedAt(),
    });
    return new User({
      id: docRef.id,
      email: user.getEmail(),
      name: user.getName,
      lastName: user.getLastName,
      createdAt: user.getCreatedAt(),
    });
  }
}
