import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  image: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    githubLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
