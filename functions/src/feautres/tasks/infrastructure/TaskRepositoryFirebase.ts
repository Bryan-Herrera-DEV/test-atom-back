import { ITaskRepository } from "../domain/ITaskRepository";
import { Task } from "../domain/Task";
import { firestore } from "../../../core/providers/firebaseProvider";

const COLLECTION_NAME = "tasks";

export class TaskRepositoryFirebase implements ITaskRepository {
  private readonly collection = firestore.collection(COLLECTION_NAME);

  public async getAllTasksByUser(userEmail: string): Promise<Task[]> {
    const snapshot = await this.collection
      .where("userEmail", "==", userEmail)
      .get();
    const tasks: Task[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      tasks.push(
        new Task({
          id: doc.id,
          title: data.title,
          description: data.description,
          type: data.type,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          userEmail: data.userEmail,
        })
      );
    });
    return tasks;
  }

  public async getTaskById(id: string): Promise<Task | null> {
    const docRef = await this.collection.doc(id).get();
    if (!docRef.exists) {
      return null;
    }

    const data = docRef.data()!;
    return new Task({
      id: docRef.id,
      title: data.title,
      description: data.description,
      type: data.type,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      userEmail: data.userEmail,
    });
  }

  public async createTask(task: Task): Promise<Task> {
    // Firestore usará un ID autogenerado
    const toSave = {
      title: task.getTitle(),
      description: task.getDescription(),
      type: task.getType(),
      createdAt: task.getCreatedAt(),
      updatedAt: task.getUpdatedAt(),
      userEmail: task.getUserEmail(),
    };
    const docRef = await this.collection.add(toSave);

    // Retornamos el Task con el ID que generó Firestore
    return new Task({
      ...toSave,
      id: docRef.id,
    });
  }

  public async updateTask(task: Task): Promise<Task> {
    const id = task.getId();
    if (!id) {
      throw new Error("Task sin ID. No se puede actualizar.");
    }

    const toUpdate = {
      title: task.getTitle(),
      description: task.getDescription(),
      type: task.getType(),
      updatedAt: task.getUpdatedAt(),
    };

    await this.collection.doc(id).update(toUpdate);

    // Leemos el doc actualizado
    const updatedDoc = await this.collection.doc(id).get();
    const data = updatedDoc.data()!;
    return new Task({
      id: updatedDoc.id,
      title: data.title,
      description: data.description,
      type: data.type,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      userEmail: data.userEmail,
    });
  }

  public async deleteTask(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
