import { mount } from 'marketing/MarketingApp';
import doMount from './MountUtil';

export default ({ appContext, onAppContextChanged }) => {
  return doMount(mount, { appContext, onAppContextChanged });
};
