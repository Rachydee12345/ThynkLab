
export interface NavItem {
  label: string;
  path: string;
}

export interface DesignCycle {
  id: string;
  title: string;
  locked: boolean;
  description?: string;
}

export interface Unit {
  id: string;
  title: string;
  cycles: DesignCycle[];
}
