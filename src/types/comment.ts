export interface Comment {
  id: string;
  festivalId: number;
  userId: string;
  userEmail: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
}
