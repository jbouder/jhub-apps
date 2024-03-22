export const APP_TITLE = 'JupyterHub';
export const APP_BASE_URL = process.env.APP_BASE_URL || '/';
export const API_BASE_URL = process.env.API_BASE_URL || '/';
export const REQUIRED_FIELD_MESSAGE = 'This field is required.';

export const REQUIRED_FORM_FIELDS_RULES = {
  required: REQUIRED_FIELD_MESSAGE,
};

export const DEFAULT_APP_THUMBNAIL =
  'data:image/png;base64,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';

// TODO: Add default services with service card updates: 'JupyterLab', 'VSCode', 'Environments'
export const DEFAULT_PINNED_SERVICES: string[] = [];
