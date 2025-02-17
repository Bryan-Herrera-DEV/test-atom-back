import { firestore } from "../../../core/providers/firebaseProvider";
import { ITaskRepository } from "../domain/ITaskRepository";
import { Task } from "../domain/Task";

const COLLECTION_NAME = "tasks";

export class TaskRepositoryFirebase implements ITaskRepository {
  private readonly collection = firestore.collection(COLLECTION_NAME);

  public async getAllTasks(): Promise<Task[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        type: data.type,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Task;
    });
  }

  public async createTask(task: Omit<Task, "id">): Promise<Task> {
    const now = new Date();
    const docRef = await this.collection.add({
      ...task,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: docRef.id,
      ...task,
      createdAt: now,
      updatedAt: now,
    };
  }

  public async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const now = new Date();
    await this.collection.doc(id).update({
      ...taskData,
      updatedAt: now,
    });

    const updatedDoc = await this.collection.doc(id).get();
    if (!updatedDoc.exists) {
      throw new Error("Task not found");
    }
    const data = updatedDoc.data()!;
    return {
      id: updatedDoc.id,
      title: data.title,
      description: data.description,
      type: data.type,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  }

  public async deleteTask(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  public async getTaskById(id: string): Promise<Task | null> {
    const docRef = await this.collection.doc(id).get();
    if (!docRef.exists) {
      return null;
    }
    const data = docRef.data()!;
    return {
      id: docRef.id,
      title: data.title,
      description: data.description,
      type: data.type,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  }
}
