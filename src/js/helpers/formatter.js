import { translateKeys as statusLabels } from '../constants/enums/status';

export const getProjectStatusPlain = value => (value in statusLabels ? statusLabels[value] : '');

export const getPageName = page => page.substring(0, page.indexOf('.'));
