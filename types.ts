
import { BlueprintCycle } from './blueprint';

export enum DesignStage {
  MAKE_IT = 'MAKE IT',
  THYNK_IT = 'THYNK IT',
  TWEAK_IT = 'TWEAK IT',
  TEST_IT = 'TEST IT'
}

export interface InfractionLog {
  message: string;
  timestamp: string;
  stage: string;
  reason: string;
  schoolName: string;
  sessionId?: string; // Links the infraction to a specific classroom session
}

export interface ProjectState {
  quizScore: number;
  quizAnswers: Record<number, number>;
  selectedTweaks: string[];
  customTweak: string;
  testReflection: string;
  cameraImage?: string;
  aiSpend: number;
}

export const INITIAL_PROJECT_STATE: ProjectState = {
  quizScore: 0,
  quizAnswers: {},
  selectedTweaks: [],
  customTweak: "",
  testReflection: "",
  aiSpend: 0,
};
