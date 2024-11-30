import { mount } from 'recruiter/RecruiterApp';
import doMount from './MountUtil';

export default ({ appContext, onAppContextChanged }) => {
  return doMount(mount, { appContext, onAppContextChanged });
};
