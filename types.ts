export type loaderDataType = {
  lcdName: string;
  lcdUrl: string;
  hcpcsModifiers: string;
  getCoverageGuidelines: string;
  documentationRequirements: string;
};

export type lcdDataType = {
  name: string;
  url: string;
};

export type actionDataType = {
  type: 'GENERAL_REQUIREMENTS' | 'COVERAGE_GUIDELINES';
  data: string;
};
