import { mount } from 'api/BackendApiApp';
import doMount from './MountUtil';

export default ({ appContext, onAppContextChanged }) => {
  return doMount(mount, { appContext, onAppContextChanged });
};
