type Resource = {
  id: string;
  lessonId?: string;
  name: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
};

type Lesson = {
  id: string;
  courseId?: string;
  sectionId?: string;
  numberOrder: number;
  name: string;
  content?: string;
  videoName?: string;
  captionVideo: string;
  hours: string;
  isPreview?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  resource?: Resource[];
};

type Section = {
  id: string;
  courseId?: string;
  numberOrder: number;
  name: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lesson: Lesson[];
};

type Course = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  requirement: string[];
  learnWhat: string[];
  soldNumber: number;
  ratedNumber: number;
  videoNumber: number;
  totalHours: number;
  formalityPoint: number;
  contentPoint: number;
  presentationPoint: number;
  imageUrl: string;
  promoVidUrl: string;
  status: 'PENDING' | 'COMPLETED';
  isDeleted: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  instructorId: string;
  instructorName?: string;
  typeUploadVideoLesson: 1 | 2;
  section: Section[];
  category?: string;
};
