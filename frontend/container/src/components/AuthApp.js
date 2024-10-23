import { mount } from 'auth/AuthApp';
import doMount from './MountUtil';

export default ({ appContext, onAppContextChanged }) => {
  return doMount(mount, { appContext, onAppContextChanged });
};
