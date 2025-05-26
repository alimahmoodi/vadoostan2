import { ExperienceListProvider } from './provider';
import { ExperienceList } from './list';
import LoginSigninInFooter from 'shared-components/src/molecules/loginSigninInFooter';

const Experiences = () => {
  return (
    <ExperienceListProvider>
      <ExperienceList footer={<LoginSigninInFooter />} />
    </ExperienceListProvider>
  );
};

export default Experiences;
