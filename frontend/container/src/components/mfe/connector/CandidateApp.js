import { mount } from 'candidate/CandidateApp';
import doMount from './MountUtil';

export default ({ appContext, onAppContextChanged }) => {
  return doMount(mount, { appContext, onAppContextChanged });
};
