
import React from 'react';
import { DesignStage, ProjectState } from '../../../types';
import { getFeatures } from '../../../config/features';
import StubCoach from './StubCoach';

interface Props {
  stage: DesignStage;
  projectState: ProjectState;
  setProjectState: (state: ProjectState) => void;
  minimized?: boolean;
  onToggle?: () => void;
}

const AICoachWrapper: React.FC<Props> = (props) => {
  const features = getFeatures();

  // The wrapper now serves the secure version of the assistant
  return <StubCoach {...props} />;
};

export default AICoachWrapper;
