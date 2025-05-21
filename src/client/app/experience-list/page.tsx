import { ExperienceListProvider } from './provider';
import { ExperienceList } from './list';
import LoginSigninInFooter from '../components/molecules/loginSigninInFooter';

const Experiences = () => {
  return (
    <ExperienceListProvider>
      <ExperienceList footer={<LoginSigninInFooter />} />
    </ExperienceListProvider>
  );
};

export default Experiences;
